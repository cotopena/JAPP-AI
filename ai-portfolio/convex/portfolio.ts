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
    role: "Technology Consultant and Product Operator",
    location: "Ft. Lauderdale, FL (Greater Miami Area)",
    intro:
      "Technology consultant and product operator with 10+ years of experience across software delivery, operations, and revenue-focused execution.",
    longBio:
      "I build practical systems that connect business goals to technical outcomes in fragmented environments, with a track record in algorithmic pricing, consulting-led platform implementation, referral-led growth, and operational efficiency gains.",
    valueProp:
      "Ask this assistant about my work to review concrete outcomes in pricing accuracy, revenue growth, and cross-functional execution.",
    availability: "US work authorized (no sponsorship required).",
    email: "cotopena@gmail.com",
    socials: [{ label: "Phone", url: "tel:+13057446406" }],
    quickPrompts: [
      "What is Augusto's fit for a technology consultant or product-operator role?",
      "Which outcomes best prove revenue and operational impact?",
      "How did he lead cross-functional execution across QuoteNclose and SafeGuard Impact?",
      "Which projects are most relevant for SaaS, CPQ, and RevOps environments?",
      "How can I contact Augusto directly?",
    ],
    highlightBullets: [
      "Replaced fixed-size windows and doors pricebooks with an algorithmic pricing model under 100 parameters and achieved 99.99% pricing accuracy in production quote workflows.",
      "Improved quote and contract data quality for sales, operations, and finance, reducing ordering, permitting, and delivery timelines by up to 3 weeks.",
      "Delivered three core systems at SafeGuard Impact (source-of-truth database, CPQ workflow, referral app) that increased referrals by 300% and supported 20% monthly sales growth.",
      "Implemented AI-assisted internal workflows that increased operational efficiency by 50% across cross-department handoffs.",
    ],
    skillGroups: [
      {
        category: "Consulting and Leadership",
        items: [
          "Business-to-Technical Requirements Translation",
          "Stakeholder Discovery and Executive Communication",
          "Cross-Functional Facilitation",
          "Agile and Waterfall Delivery Planning",
        ],
      },
      {
        category: "Revenue and Operations Systems",
        items: [
          "Source-of-Truth Data System Design",
          "CPQ Architecture and Sales-to-Operations Handoffs",
          "CRM Interoperability (Salesforce, HubSpot, Trello)",
          "Process Optimization and Change Management",
        ],
      },
      {
        category: "Product and Technical Execution",
        items: [
          "Next.js, React, TypeScript, Node.js, Python, FastAPI",
          "SQL, Postgres, Supabase, Convex",
          "RBAC, Tokenized Access, and Webhook Integrations",
          "Analytics and Performance Instrumentation",
        ],
      },
    ],
    projects: [
      {
        slug: "quotenclose-algorithmic-pricing-engine",
        title: "QuoteNclose Algorithmic Pricing Engine",
        category: "Full-Stack Product Engineering",
        summary:
          "Built and deployed a multi-tenant quoting and contract platform, replacing fixed-size pricebooks with an algorithmic pricing model for high-variation windows and doors.",
        impact:
          "Reached 99.99% pricing accuracy with fewer than 100 parameters, improved cross-team planning data, and reduced downstream ordering, permitting, and delivery timelines by up to 3 weeks.",
        stack: ["Next.js", "TypeScript", "Convex", "Algorithmic Pricing"],
        year: 2026,
        featured: true,
      },
      {
        slug: "safeguard-unified-revops-systems",
        title: "SafeGuard Unified RevOps Systems",
        category: "Technology Consulting",
        summary:
          "Delivered three consulting systems: a unified source-of-truth database, a CPQ workflow, and a referral partner application.",
        impact:
          "Increased referrals by 300%, supported 20% monthly sales growth during rollout, and improved operational efficiency by 50% through AI-assisted workflows.",
        stack: ["Source-of-Truth Data", "CPQ", "Referral Growth", "AI Workflows"],
        year: 2025,
        featured: true,
      },
      {
        slug: "reehash-virtual-sales-automation",
        title: "Reehash Virtual Sales Automation Platform",
        category: "Revenue Operations",
        summary:
          "Spearheaded a virtual sales platform for residential contractors with CRM-integrated automations and analytics dashboards for call performance, conversion, cashflow, and ROI.",
        impact:
          "Used insights from 3,000+ daily call records across 10+ contractor accounts to improve workflows, increasing contractor-client sales by 25% while reducing overhead by 50%.",
        stack: [
          "CRM Integrations",
          "Workflow Automation",
          "Analytics Dashboards",
          "AI Sales Support",
        ],
        year: 2020,
        featured: true,
      },
      {
        slug: "roof1303-sales-scale-system",
        title: "Roof1303 Digital Sales Scale-Up",
        category: "Sales Leadership",
        summary:
          "Closed the first 83 online roof sales, then organized and migrated pipeline operations from Trello to Salesforce while building a four-rep sales team.",
        impact:
          "Team achieved a 40% close rate versus an approximately 20% benchmark, supported by structured forecasting and process optimization.",
        stack: [
          "Salesforce",
          "Pipeline Management",
          "Team Coaching",
          "Sales Forecasting",
        ],
        year: 2023,
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
