import type { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const MAIN_PORTFOLIO_SLUG = "main";

export type PortfolioPayload = {
  slug: string;
  name: string;
  role: string;
  location: string;
  intro: string;
  longBio: string;
  valueProp: string;
  availability: string;
  email: string;
  socials: Array<{ label: string; url: string }>;
  quickPrompts: string[];
  highlightBullets: string[];
  skillGroups: Array<{ category: string; items: string[] }>;
  projects: Array<{
    slug: string;
    title: string;
    category: string;
    summary: string;
    impact: string;
    stack: string[];
    year: number;
    featured: boolean;
    link?: string;
  }>;
  updatedAt: number;
};

function buildDefaultPortfolio(slug = MAIN_PORTFOLIO_SLUG): PortfolioPayload {
  return {
    slug,
    name: "Augusto Pena",
    role: "Senior Sales & Revenue Operations Leader",
    location: "Miami, Florida",
    intro:
      "I design scalable sales systems, lead high-performing teams, and turn complex go-to-market goals into repeatable revenue.",
    longBio:
      "I combine enterprise sales strategy with operational discipline. My focus is pipeline velocity, conversion quality, and measurable growth across B2B and consumer-facing organizations.",
    valueProp:
      "If you ask this assistant about my work, it will answer with concrete outcomes, leadership examples, and execution details.",
    availability:
      "Open to senior sales, strategic accounts, and revenue operations leadership roles.",
    email: "augusto.pena@email.com",
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/augustopena" },
      { label: "GitHub", url: "https://github.com/" },
    ],
    quickPrompts: [
      "Tell me about Augusto in 60 seconds.",
      "Which achievements best prove revenue impact?",
      "Show me his strongest projects and initiatives.",
      "What are his top skills for a senior sales role?",
      "How can I contact him?",
    ],
    highlightBullets: [
      "Built sales processes that improved forecast confidence and close predictability.",
      "Led cross-functional collaboration between sales, marketing, and operations teams.",
      "Created practical systems that reduced friction from lead intake to deal execution.",
      "Known for balancing strategic planning with hands-on execution.",
    ],
    skillGroups: [
      {
        category: "Revenue Leadership",
        items: [
          "Strategic Sales Planning",
          "Enterprise Account Growth",
          "Pipeline Management",
          "Forecasting",
        ],
      },
      {
        category: "Operations",
        items: [
          "CRM Architecture",
          "Sales Process Design",
          "Performance Dashboards",
          "Cross-functional Enablement",
        ],
      },
      {
        category: "Execution",
        items: [
          "Negotiation",
          "Stakeholder Communication",
          "Coaching",
          "Change Management",
        ],
      },
    ],
    projects: [
      {
        slug: "pipeline-modernization",
        title: "Pipeline Modernization Program",
        category: "Revenue Operations",
        summary:
          "Rebuilt qualification stages and reporting standards to improve funnel clarity.",
        impact:
          "Improved deal visibility and reduced late-stage surprises for leadership reviews.",
        stack: ["CRM", "RevOps", "Analytics"],
        year: 2024,
        featured: true,
      },
      {
        slug: "enterprise-expansion-playbook",
        title: "Enterprise Expansion Playbook",
        category: "Sales Strategy",
        summary:
          "Designed account growth motions for high-value clients and strategic renewals.",
        impact:
          "Increased expansion opportunities through better account mapping and executive alignment.",
        stack: ["Account Planning", "Negotiation", "Executive Selling"],
        year: 2023,
        featured: true,
      },
      {
        slug: "inside-sales-coaching-system",
        title: "Inside Sales Coaching System",
        category: "Enablement",
        summary:
          "Implemented repeatable coaching cycles using scorecards and call-review frameworks.",
        impact:
          "Improved rep consistency and created a stronger onboarding-to-performance path.",
        stack: ["Enablement", "Coaching", "KPIs"],
        year: 2022,
        featured: false,
      },
      {
        slug: "market-entry-program",
        title: "New Market Entry Program",
        category: "Go-To-Market",
        summary:
          "Helped define territory priorities, messaging, and outbound targeting for expansion.",
        impact:
          "Accelerated early pipeline generation in new segments with more focused outreach.",
        stack: ["GTM", "Segmentation", "Outbound"],
        year: 2021,
        featured: false,
      },
    ],
    updatedAt: Date.now(),
  };
}

function toPayload(portfolio: Doc<"portfolio">): PortfolioPayload {
  return {
    slug: portfolio.slug,
    name: portfolio.name,
    role: portfolio.role,
    location: portfolio.location,
    intro: portfolio.intro,
    longBio: portfolio.longBio,
    valueProp: portfolio.valueProp,
    availability: portfolio.availability,
    email: portfolio.email,
    socials: portfolio.socials,
    quickPrompts: portfolio.quickPrompts,
    highlightBullets: portfolio.highlightBullets,
    skillGroups: portfolio.skillGroups,
    projects: portfolio.projects,
    updatedAt: portfolio.updatedAt,
  };
}

export const getPublicPortfolio = query({
  args: { slug: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const slug = args.slug ?? MAIN_PORTFOLIO_SLUG;
    const portfolio = await ctx.db
      .query("portfolio")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    return portfolio ? toPayload(portfolio) : null;
  },
});

export const seedDefaultPortfolio = mutation({
  args: { slug: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const slug = args.slug ?? MAIN_PORTFOLIO_SLUG;
    const defaults = buildDefaultPortfolio(slug);
    const existing = await ctx.db
      .query("portfolio")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...defaults,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("portfolio", defaults);
  },
});

export const previewDefaults = query({
  args: { slug: v.optional(v.string()) },
  handler: async (_ctx, args) => {
    return buildDefaultPortfolio(args.slug ?? MAIN_PORTFOLIO_SLUG);
  },
});
