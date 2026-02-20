"use client";

import { useChat } from "@ai-sdk/react";
import { isTextUIPart, type UIMessage } from "ai";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import type { PortfolioPayload } from "../../convex/portfolio";

const MAIN_SLUG = "main";
const STORAGE_KEY = "ai-portfolio-session-id";

function extractMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => isTextUIPart(part))
    .map((part) => part.text.trim())
    .filter((text) => text.length > 0)
    .join("\n\n");
}

function isBusy(status: string): boolean {
  return status === "submitted" || status === "streaming";
}

function LoadingScreen({ label }: { label: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
      <div className="rounded-3xl border border-line bg-paper/90 px-8 py-6 text-sm text-muted shadow-lg">
        {label}
      </div>
    </main>
  );
}

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      window.localStorage.getItem(STORAGE_KEY) ?? window.crypto.randomUUID();
    window.localStorage.setItem(STORAGE_KEY, stored);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialize client-only session after hydration to avoid SSR mismatch.
    setSessionId(stored);
  }, []);

  if (!sessionId) {
    return <LoadingScreen label="Preparing your AI portfolio..." />;
  }

  return <PortfolioExperience sessionId={sessionId} />;
}

function PortfolioExperience({ sessionId }: { sessionId: string }) {
  const portfolio = useQuery(api.portfolio.getPublicPortfolio, { slug: MAIN_SLUG });
  const history = useQuery(api.chat.getMessagesBySession, { sessionId });
  const seedDefaultPortfolio = useMutation(api.portfolio.seedDefaultPortfolio);

  const seedingRef = useRef(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (portfolio !== null || seedingRef.current) {
      return;
    }

    seedingRef.current = true;
    void seedDefaultPortfolio({ slug: MAIN_SLUG }).finally(() => {
      seedingRef.current = false;
    });
  }, [portfolio, seedDefaultPortfolio]);

  if (portfolio === undefined || history === undefined || portfolio === null) {
    return <LoadingScreen label="Loading portfolio data..." />;
  }

  return (
    <ChatShell
      initialMessages={history}
      portfolio={portfolio}
      sessionId={sessionId}
      input={input}
      setInput={setInput}
    />
  );
}

function ChatShell({
  initialMessages,
  portfolio,
  sessionId,
  input,
  setInput,
}: {
  initialMessages: UIMessage[];
  portfolio: PortfolioPayload;
  sessionId: string;
  input: string;
  setInput: (value: string) => void;
}) {
  const { messages, sendMessage, status, error } = useChat({
    id: sessionId,
    messages: initialMessages,
  });

  const featuredProjects = useMemo(
    () => portfolio.projects.filter((project) => project.featured).slice(0, 3),
    [portfolio.projects],
  );

  const submitting = isBusy(status);
  const [failedPrompt, setFailedPrompt] = useState<string | null>(null);
  const [footerError, setFooterError] = useState<string | null>(null);
  const latestSubmittedPromptRef = useRef<string | null>(null);
  const previousStatusRef = useRef(status);
  const statusLabel = submitting ? "Thinking" : footerError ? "Retry available" : "Ready";

  useEffect(() => {
    const previousStatus = previousStatusRef.current;
    const completedSuccessfully =
      status === "ready" && previousStatus !== "ready" && previousStatus !== "error";

    if (status === "error") {
      if (latestSubmittedPromptRef.current) {
        setFailedPrompt(latestSubmittedPromptRef.current);
      }
      setFooterError(error?.message || "Something went wrong while generating.");
    }

    if (completedSuccessfully) {
      setFailedPrompt(null);
      setFooterError(null);
      latestSubmittedPromptRef.current = null;
    }

    previousStatusRef.current = status;
  }, [error, status]);

  const submitPrompt = (prompt: string, options?: { clearInput?: boolean }) => {
    const trimmed = prompt.trim();
    if (!trimmed || submitting) {
      return false;
    }

    if (options?.clearInput) {
      setInput("");
    }
    setFooterError(null);
    latestSubmittedPromptRef.current = trimmed;
    void sendMessage({ text: trimmed });
    return true;
  };

  const handleSend = () => {
    submitPrompt(input, { clearInput: true });
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-line bg-paper/90 p-6 shadow-[0_20px_70px_-45px_rgba(30,26,20,0.35)] backdrop-blur-sm">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
            AI Portfolio
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground">
            {portfolio.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {portfolio.role} • {portfolio.location}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-foreground/90">
            {portfolio.intro}
          </p>

          <div className="mt-6 rounded-2xl border border-brand/25 bg-brand-soft/65 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">
              Why this assistant
            </p>
            <p className="mt-2 text-sm text-foreground/90">{portfolio.valueProp}</p>
          </div>

          <div className="mt-6 space-y-2">
            {portfolio.highlightBullets.map((item) => (
              <div key={item} className="flex gap-2 text-sm text-foreground/85">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Featured Work
            </p>
            <div className="mt-3 space-y-3">
              {featuredProjects.map((project) => (
                <article
                  key={project.slug}
                  className="rounded-2xl border border-line bg-white/80 p-3"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {project.category} • {project.year}
                  </p>
                  <h2 className="mt-1 text-sm font-semibold">{project.title}</h2>
                  <p className="mt-1 text-sm text-muted">{project.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex min-h-[82vh] flex-col overflow-hidden rounded-3xl border border-line bg-white/85 shadow-[0_25px_80px_-45px_rgba(30,26,20,0.35)] backdrop-blur-sm">
          <header className="border-b border-line px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                  Conversation
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  Ask anything about {portfolio.name}
                </h2>
              </div>
              <span className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {statusLabel}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {portfolio.quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    submitPrompt(prompt);
                  }}
                  className="min-h-9 rounded-full border border-line bg-paper px-3.5 py-2 text-[11px] font-medium leading-tight text-foreground transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
                  disabled={submitting}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-paper p-5 text-sm leading-relaxed text-muted">
                Use a recruiter-style prompt: role fit, measurable outcomes,
                leadership examples, or direct contact details.
              </div>
            ) : null}

            {messages.map((message) => {
              const text = extractMessageText(message);
              if (!text) {
                return null;
              }
              const isUser = message.role === "user";
              return (
                <article
                  key={message.id}
                  className={`max-w-[96%] rounded-2xl px-4 py-3.5 shadow-sm sm:max-w-[82%] ${
                    isUser
                      ? "ml-auto border border-brand/40 bg-brand-soft text-foreground"
                      : "mr-auto border border-line bg-paper"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {isUser ? "You" : `${portfolio.name.split(" ")[0]} AI`}
                  </p>
                  <div className="mt-2 space-y-2.5 text-[15px] leading-7 text-foreground/95 [overflow-wrap:anywhere] sm:text-sm sm:leading-relaxed">
                    {text.split("\n\n").map((block, blockIndex) => (
                      <p key={`${message.id}-${blockIndex}`}>{block}</p>
                    ))}
                  </div>
                </article>
              );
            })}

            {submitting ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                <span>Generating response...</span>
              </div>
            ) : null}
          </div>

          <footer className="border-t border-line px-5 py-4 sm:px-6">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
            >
              <label className="sr-only" htmlFor="chat-input">
                Ask a question
              </label>
              <textarea
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a recruiter-style question about fit, measurable impact, leadership, or contact details..."
                rows={2}
                className="min-h-24 w-full flex-1 resize-none rounded-2xl border border-line bg-paper px-4 py-3 text-[15px] leading-6 outline-none transition focus:border-brand sm:min-h-20 sm:text-sm"
                disabled={submitting}
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
                disabled={submitting || input.trim().length === 0}
              >
                Send
              </button>
            </form>
            {footerError ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2">
                <p className="min-w-[220px] flex-1 text-xs leading-relaxed text-red-800">
                  {footerError}
                </p>
                {failedPrompt ? (
                  <button
                    type="button"
                    onClick={() => {
                      submitPrompt(failedPrompt);
                    }}
                    className="min-h-9 rounded-xl border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-65"
                    disabled={submitting}
                  >
                    Retry
                  </button>
                ) : null}
              </div>
            ) : null}
          </footer>
        </section>
      </div>
    </main>
  );
}
