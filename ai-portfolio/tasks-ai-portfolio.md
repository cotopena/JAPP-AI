# AI Portfolio Roadmap (Fast-Track 4 Days)

## Current Baseline (from repo)

- Working stack is already in place: Next.js + TypeScript + Tailwind v4 + Convex + AI SDK + OpenAI.
- Chat UI, quick prompts, and streaming `/api/chat` route are implemented.
- Convex schema and persistence are implemented for `portfolio`, `conversations`, and `messages`.
- Seeded portfolio content exists in `convex/portfolio.ts`.
- Build and lint pass; no explicit TODO markers found.

## Scope Strategy

- Ship a reliable public launch in 4 days by prioritizing real content quality.
- Prioritize core reliability and front-end clarity for recruiter evaluation.
- Prioritize deployment readiness and launch checks.
- Defer non-critical platform work to Phase 2.

## Milestones

### Milestone 1: Production-Ready MVP (Days 1-4)

- Replace placeholder content with your real profile and projects.
- Harden chat flow and failure states.
- Deploy with working environment config and basic guardrails.
- Launch and run immediate post-launch fixes.

### Milestone 2: Post-Launch Expansion (Phase 2)

- Admin editing interface/CMS workflow
- Advanced analytics dashboard
- Stronger abuse prevention and observability
- Broader automated testing suite

## Dependencies

- Finalized resume/project content and links.
- Valid `OPENAI_API_KEY` and Convex deployment configuration.
- Hosting target (Vercel or equivalent) + domain readiness.
- 1 focused QA window for desktop/mobile before launch.

## Risks and Mitigations

- Risk: weak or generic AI answers after launch.
- Mitigation: tighten system prompt and add targeted regression prompts before deploy.

- Risk: token/cost spikes from long conversations.
- Mitigation: cap context length and enforce simple response brevity defaults.

- Risk: public endpoint abuse.
- Mitigation: apply baseline throttling and request validation before launch.

- Risk: inconsistent portfolio claims.
- Mitigation: single source-of-truth content pass and final consistency review.

## Day-by-Day Plan

| Day | Goal | Deliverables | Dependencies and Risks |
|---|---|---|---|
| Day 1 | Content and voice lock | Replace seeded data in `convex/portfolio.ts` with real resume/projects, finalize assistant tone, update quick prompts, update recruiter-facing copy in `src/app/page.tsx` | Dependency: finalized personal content. Risk: rushed copy introduces inconsistencies. |
| Day 2 | Reliability hardening | Improve empty/error/retry behavior in chat flow, validate message persistence/session behavior, polish mobile spacing/typography in `src/app/page.tsx`, run manual mobile pass | Dependency: stable baseline from Day 1. Risk: edge-case regressions under quick fixes. |
| Day 3 | Deployment and guardrails | Configure prod env, deploy app, add basic throttling/validation for `/api/chat`, verify production visual consistency (desktop/mobile), run smoke tests on production URL | Dependency: hosting and API keys ready. Risk: env mismatch between local and prod. |
| Day 4 | Launch and stabilize | Final UI QA checklist, launch, monitor errors/latency, ship first post-launch UX fixes, create Phase 2 backlog | Dependency: monitoring visibility. Risk: first-day defects without rapid triage. |

## Frontend Deliverables (Required)

### Day 1 Deliverables

- Recruiter-focused copy pass in `src/app/page.tsx` (headline, value proposition, highlights, prompt labels).
- Portfolio content alignment with real achievements in `convex/portfolio.ts`.
- Quick prompt set tuned for hiring flows (fit, impact, leadership, contact).

### Day 2 Deliverables

- Chat UX reliability updates in `src/app/page.tsx`:
  - loading, empty, and error state polish
  - message readability improvements for long responses
  - mobile spacing and tap-target validation
- Visual QA pass for typography contrast and hierarchy.

### Day 3 Deliverables

- Production visual parity check (local vs deployed) for:
  - color tokens from `src/app/globals.css`
  - typography and spacing from `src/app/layout.tsx` and `src/app/page.tsx`
- Cross-device smoke screenshots captured for desktop and mobile.

### Day 4 Deliverables

- Launch UI checklist completion:
  - zero blocking visual defects
  - contact journey works end-to-end
  - quick prompts and chat input interaction validated
- Post-launch front-end fix list documented and prioritized.

## Deferred Backlog (Phase 2)

- Internal content editor UI
- Rich analytics and funnel events
- Advanced observability/alerting
- Expanded tool routing and retrieval quality
- End-to-end automated test coverage

## Definition of Done (Fast-Track)

- Public users can ask questions and get grounded portfolio answers.
- Contact and project responses are accurate and consistent.
- App is deployed with required env vars and basic abuse controls.
- A concrete Phase 2 backlog is documented after launch.
