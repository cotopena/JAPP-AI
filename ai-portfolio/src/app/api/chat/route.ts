import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  isTextUIPart,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import type { PortfolioPayload } from "../../../../convex/portfolio";

export const runtime = "nodejs";

const MAIN_SLUG = "main";
const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

type ChatBody = {
  id?: string;
  messages?: UIMessage[];
};

function messageText(message: UIMessage | undefined): string {
  if (!message) {
    return "";
  }

  return message.parts
    .filter((part) => isTextUIPart(part))
    .map((part) => part.text.trim())
    .filter((text) => text.length > 0)
    .join("\n\n");
}

function getAssistantResponseMessageId(responseMessages: unknown[]): string {
  const assistantMessage = responseMessages.find((message) => {
    if (typeof message !== "object" || message === null) {
      return false;
    }

    const candidate = message as { id?: unknown; role?: unknown };
    return candidate.role === "assistant" && typeof candidate.id === "string";
  }) as { id?: string } | undefined;

  return assistantMessage?.id ?? crypto.randomUUID();
}

async function ensurePortfolio(): Promise<PortfolioPayload> {
  const existing = await fetchQuery(api.portfolio.getPublicPortfolio, {
    slug: MAIN_SLUG,
  });
  if (existing) {
    return existing;
  }

  await fetchMutation(api.portfolio.seedDefaultPortfolio, { slug: MAIN_SLUG });
  const seeded = await fetchQuery(api.portfolio.getPublicPortfolio, {
    slug: MAIN_SLUG,
  });
  if (!seeded) {
    throw new Error("Portfolio content could not be initialized.");
  }

  return seeded;
}

function createSystemPrompt(portfolio: PortfolioPayload): string {
  return `
You are the AI portfolio assistant for ${portfolio.name}.

Goal:
- Answer clearly and confidently as a professional representative of ${portfolio.name}.
- Focus on real outcomes, strengths, and relevant details for hiring managers.
- Keep every factual statement grounded in the portfolio data available in this session.

Style:
- Keep responses concise by default.
- Use bullets when listing skills, projects, or achievements.
- Never invent metrics or experiences that are not in portfolio data.

Behavior:
- Use tools to retrieve portfolio details before answering factual questions.
- If a question asks for contact details, provide the direct email and social links.
- When asked broad questions, synthesize into an easy-to-scan summary.
- If details are missing from portfolio data, say so directly instead of inferring.

Identity context:
- Role: ${portfolio.role}
- Location: ${portfolio.location}
- Availability: ${portfolio.availability}
- Intro: ${portfolio.intro}
`.trim();
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      "Missing OPENAI_API_KEY. Add it to .env.local before using the chat route.",
      { status: 500 },
    );
  }

  const body = (await request.json()) as ChatBody;
  const messages = body.messages ?? [];
  const sessionId = body.id ?? crypto.randomUUID();

  if (messages.length === 0) {
    return new Response("No messages were provided.", { status: 400 });
  }

  const portfolio = await ensurePortfolio();

  const latestUserMessage = [...messages].reverse().find((msg) => msg.role === "user");
  if (latestUserMessage) {
    const text = messageText(latestUserMessage);
    if (text) {
      await fetchMutation(api.chat.saveMessage, {
        sessionId,
        messageId: latestUserMessage.id,
        role: "user",
        text,
      });
    }
  }

  const result = streamText({
    model: openai(DEFAULT_MODEL),
    system: createSystemPrompt(portfolio),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    onFinish: async ({ text, response }) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      try {
        await fetchMutation(api.chat.saveMessage, {
          sessionId,
          messageId: getAssistantResponseMessageId(response.messages),
          role: "assistant",
          text: trimmed,
        });
      } catch (error) {
        console.error("Failed to persist assistant message", error);
      }
    },
    tools: {
      getProfile: tool({
        description: "Get profile, background, and positioning details.",
        inputSchema: z.object({}),
        execute: async () => ({
          name: portfolio.name,
          role: portfolio.role,
          location: portfolio.location,
          intro: portfolio.intro,
          longBio: portfolio.longBio,
          highlights: portfolio.highlightBullets,
          availability: portfolio.availability,
        }),
      }),
      getProjects: tool({
        description: "Get projects and impact details.",
        inputSchema: z.object({
          topic: z
            .string()
            .optional()
            .describe("Optional keyword to filter projects by stack, title, or category."),
        }),
        execute: async ({ topic }) => {
          const token = topic?.toLowerCase().trim();
          const projects = token
            ? portfolio.projects.filter((project) => {
                const haystack = [
                  project.title,
                  project.category,
                  project.summary,
                  project.impact,
                  project.stack.join(" "),
                ]
                  .join(" ")
                  .toLowerCase();
                return haystack.includes(token);
              })
            : portfolio.projects;

          return projects.map((project) => ({
            title: project.title,
            category: project.category,
            year: project.year,
            summary: project.summary,
            impact: project.impact,
            stack: project.stack,
            link: project.link ?? null,
          }));
        },
      }),
      getSkills: tool({
        description: "Get skills grouped by category.",
        inputSchema: z.object({
          category: z
            .string()
            .optional()
            .describe("Optional skill category to return a focused list."),
        }),
        execute: async ({ category }) => {
          const token = category?.toLowerCase().trim();
          const groups = token
            ? portfolio.skillGroups.filter((group) =>
                group.category.toLowerCase().includes(token),
              )
            : portfolio.skillGroups;
          return groups;
        },
      }),
      getContact: tool({
        description: "Get direct contact and social links.",
        inputSchema: z.object({}),
        execute: async () => ({
          email: portfolio.email,
          socials: portfolio.socials,
          availability: portfolio.availability,
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
  });
}
