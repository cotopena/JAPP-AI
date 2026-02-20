---
id: TICKET-1001
title: Publish Real Profile and Project Content
type: Chore
priority: P1
risk_level: medium
status: current
owner: unassigned
created: 2026-02-20
plan_blockers: []
plan_path: .documents/.plans/current_plan/PLAN-1001-publish-real-profile-project-content-2026-02-20.md
labels: [area/content, component/portfolio-seed, breaking-change:no]
---

# Summary
Replace seeded placeholder portfolio copy with production-ready profile, achievements, and project content so recruiters get accurate, grounded answers across UI cards and chat tools.

## Plan Reference
- `.documents/.plans/current_plan/PLAN-1001-publish-real-profile-project-content-2026-02-20.md`

## Problem / Goal
- Recruiters and hiring managers evaluating fit quickly
- Happens in seed data and recruiter-facing chat/UI surfaces
- Placeholder copy weakens credibility before public launch

## Scope (In)
- Replace default profile fields in `convex/portfolio.ts`
- Replace highlights and skill groups with approved achievements
- Replace seeded projects with real case-study content and links
- Update quick prompt labels for recruiter hiring flows
- Update recruiter-facing helper copy in chat panel and input
- Verify chat tool responses reflect updated portfolio content
- Create source-traceability mapping from CV/resume/experience corpus before seed edits

## Out of Scope
- Schema or index changes in Convex
- New chat reliability/error-state work
- Abuse prevention or rate-limiting changes
- Admin/CMS content editing workflows

## Context Pointers
- `.documents/tasks-ai-portfolio.md:22-23` — first milestone item and sequence
- `.documents/tasks-ai-portfolio.md:59-70` — Day 1 content/voice deliverables
- `../Augusto_Pena_CV.md` — canonical CV source content
- `../Augusto_Pena_Resume.md` — base resume source content
- `../experience_bank.md` — full achievement/experience inventory
- `convex/portfolio.ts:35-147` — seeded defaults to replace
- `convex/portfolio.ts:182-201` — mutation that writes defaults into `portfolio`
- `src/app/page.tsx:105-108` — featured project selection logic
- `src/app/page.tsx:145-171` — highlights and featured work rendering
- `src/app/page.tsx:191-207` — quick prompt buttons and send behavior
- `src/app/page.tsx:211-215` — empty-state recruiter guidance copy
- `src/app/page.tsx:268` — chat input placeholder copy
- `src/app/api/chat/route.ts:56-79` — assistant system prompt from portfolio data

## Acceptance Criteria (testable)
- **Scenario:** Seeded portfolio uses real profile content
  - **Verification:** Automated
  - **Given** no existing `portfolio` row for slug `main`
  - **When** default portfolio seed runs for `main`
  - **Then** name, role, intro, value proposition, contact links, and highlights are real approved content with no placeholder phrasing
- **Scenario:** Recruiter panel copy reflects updated messaging
  - **Verification:** Manual
  - **Given** the app loads the `main` portfolio
  - **When** a visitor opens the identity panel
  - **Then** intro, value proposition, and highlights show updated production copy
- **Scenario:** Quick prompts are hiring-flow specific
  - **Verification:** Manual
  - **Given** quick prompt chips are visible
  - **When** each prompt is clicked once
  - **Then** submitted message text matches the chip label and targets fit/impact/leadership/contact topics
- **Scenario:** Featured work cards stay deterministic
  - **Verification:** Manual
  - **Given** at least three projects are marked `featured: true`
  - **When** the page renders featured work
  - **Then** exactly three cards show title/category/year/summary from the updated project set
- **Scenario:** AI responses stay grounded to updated records
  - **Verification:** Manual
  - **Given** a user asks about projects and contact details
  - **When** `/api/chat` produces a response using portfolio tools
  - **Then** returned details reflect updated seeded data and avoid invented claims

## Deliverables
- [x] Code updated in `convex/portfolio.ts` and `src/app/page.tsx`
- [x] JavaScript interaction/data logic updated (if applicable)
- [x] Source mapping doc created (`.documents/research/TICKET-1001-content-source-map-2026-02-20.md`)
- [x] Docs updated (`.documents/CHANGELOG.md`)
- [ ] Telemetry/metrics/alerts defined (not added; out of scope for this ticket)

## Verification Commands
- [x] bash workflow/scripts/lint-prompts.sh (if docs/prompts changed)
- [x] npm run lint
- [x] npm run build
- [x] npx convex run portfolio:previewDefaults '{"slug":"main"}'
- [x] npm run dev:all, then manually verify profile panel, prompts, and chat answers

## Non-Functional Requirements
- Performance/SLO: no additional client/server round-trips introduced
- Security/Privacy constraints: expose only approved public contact fields
- Backward compatibility / migration: keep schema/contracts unchanged; no migration

## Access Semantics (permissions/integrations tickets only)
- Unauthenticated behavior: unchanged public portfolio/chat access
- Authenticated but unauthorized behavior: not applicable (no auth roles in scope)
- Not-found behavior (404) only when explicitly intended: unchanged; `main` slug still seeds if missing

## Dependencies & Impact
- Services/flags/env vars affected: Convex `portfolio` seed data and Next.js rendering only
- Include integration requirements, routing/navigation dependencies, and provisioning details when applicable: `src/app/page.tsx` and `src/app/api/chat/route.ts` must remain aligned with `PortfolioPayload`
- Data model/tables touched: `portfolio` rows only; no schema/index changes
- Detail impact bullets are allowed here for accuracy: copy updates affect recruiter-facing UI text, quick prompt labels, and tool-grounded responses
- Rollout/rollback considerations: rollout by deploying content change and reseeding `main`; rollback by reverting commit and reseeding

## Decisions (resolved)
- Keep `convex/portfolio.ts` as Day 1 single source of seeded content truth
- Preserve existing `PortfolioPayload` and tool interfaces
- Continue using `featured: true` flags for featured card curation

## Open Questions (keep ≤ 4)
- None.

## Assumptions (keep ≤ 4)
- Canonical source content is available in `Augusto_Pena_CV.md`, `Augusto_Pena_Resume.md`, and `experience_bank.md`
- Public email/social links are validated by the owner
- At least three projects remain flagged `featured: true`
- Existing Convex deployment can run seed mutation without migration

## Definition of Done
- Seeded `main` portfolio content is replaced with approved real profile/project data
- UI prompt labels and helper text match recruiter-focused Day 1 outcomes
- Manual and command-based checks in this ticket complete without regressions

## Implementation Notes (2026-02-20)
- Added `.documents/research/TICKET-1001-content-source-map-2026-02-20.md` with target-field to source-line traceability for every seeded profile, skills, prompts, and project claim.
- Replaced default payload content in `convex/portfolio.ts` using mapped source statements; kept `PortfolioPayload` and seed/query contracts unchanged.
- Preserved deterministic featured behavior by setting exactly three projects with `featured: true`, compatible with `filter(...).slice(0, 3)` rendering in `src/app/page.tsx`.
- Updated recruiter-facing helper text and input placeholder in `src/app/page.tsx` and tightened grounded-response rules in `src/app/api/chat/route.ts`.
- Fixed assistant-turn persistence in `src/app/api/chat/route.ts` by persisting assistant text via `streamText` `onFinish`.

## Validation Evidence (2026-02-20)
- `rg -n "target field|source file|final wording" .documents/research/TICKET-1001-content-source-map-2026-02-20.md` -> PASS (mapping column header confirmed).
- `bash workflow/scripts/lint-prompts.sh` -> PASS.
- `npx convex run portfolio:previewDefaults '{"slug":"main"}'` -> PASS (returns updated mapped content; no placeholder copy).
- `npm run lint` -> PASS.
- `npm run build` -> PASS.
- `npm run dev:all` -> PASS.
- End-to-end persistence regression check -> PASS: POST `/api/chat` with session `5a3eed4c-1874-4cbe-beaa-07a36d605060`, then `npx convex run chat:getMessagesBySession '{"sessionId":"5a3eed4c-1874-4cbe-beaa-07a36d605060"}'` returned both `user` and `assistant` turns.
