---
id: TICKET-1003
title: Lock Recruiter-First Day 1 Frontend Content
type: Feature
priority: P1
risk_level: medium
status: current
owner: unassigned
created: 2026-02-20
plan_blockers: []
plan_path: .documents/.plans/current_plan/PLAN-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md
labels: [area/frontend-content, component/chat-shell, breaking-change:no]
---

# Summary
Finalize recruiter-facing Day 1 content so first-time visitors can understand fit, impact, and contact path in seconds, with AI responses grounded in verified portfolio data.

## Plan Reference
- `.documents/.plans/current_plan/PLAN-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md`

## Problem / Goal
- Recruiters and hiring managers evaluating Augusto in first-pass screens
- Happens in seeded portfolio content and chat landing copy
- This matters now because weak copy lowers trust and conversion

## Scope (In)
- Create content-source map for all Day 1 published statements
- Align `convex/portfolio.ts` intro, value prop, highlights, and prompts
- Tune quick prompts for fit, impact, leadership, and contact flows
- Update recruiter-facing labels/copy text in `src/app/page.tsx`
- Preserve existing featured project behavior and schema contracts
- Run required verification commands for content updates

## Out of Scope
- Day 2 reliability changes (retry/error/mobile behavior)
- Schema or index changes in `convex/schema.ts`
- API route behavior changes in `src/app/api/chat/route.ts`
- New analytics, citations, or CMS/admin editing workflows
- Net-new claims, metrics, dates, roles, or certifications

## Context Pointers
- `.documents/tasks-ai-portfolio.md:59-70` — Day 1 deliverables definition
- `.documents/design-ux-ui.md:5-11` — core recruiter questions to answer first
- `.documents/design-ux-ui.md:21-25` — speed, trust, and conversion principles
- `.documents/design-ux-ui.md:101-107` — UX acceptance criteria targets
- `README.md:82-99` — source-of-truth precedence and required validation flow
- `convex/portfolio.ts:35-62` — intro/value proposition/highlights/quick prompts
- `convex/portfolio.ts:92-151` — featured project summary and impact statements
- `src/app/page.tsx:124-143` — identity panel headline and value proposition surface
- `src/app/page.tsx:145-208` — highlight bullets and quick prompt labels
- `src/app/page.tsx:211-270` — empty-state and chat input recruiter guidance

## Acceptance Criteria (testable)
- **Scenario:** Source map exists before content publish
  - **Verification:** Manual
  - **Given** Day 1 content statements are being prepared
  - **When** the ticket deliverables are reviewed
  - **Then** `.documents/research/TICKET-1003-content-source-map-2026-02-20.md` exists with source file + line for each published statement
- **Scenario:** Portfolio seed content is recruiter-relevant and grounded
  - **Verification:** Manual
  - **Given** updated defaults in `convex/portfolio.ts`
  - **When** running `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
  - **Then** returned `intro`, `valueProp`, `highlightBullets`, and `quickPrompts` reflect fit, impact, leadership, and contact with no unsupported claims
- **Scenario:** UI copy aligns to Day 1 recruiter intent
  - **Verification:** Manual
  - **Given** the landing page loads with the seeded portfolio
  - **When** a recruiter scans the screen for 10 seconds
  - **Then** they can identify who Augusto is, measurable value, and a direct contact path without typing
- **Scenario:** Quick prompts cover required hiring flows
  - **Verification:** Manual
  - **Given** quick prompts render in chat header
  - **When** reading all prompt labels
  - **Then** at least one prompt each targets role fit, measurable impact, leadership evidence, and contact details
- **Scenario:** Build and lint remain healthy after content updates
  - **Verification:** Automated
  - **Given** Day 1 changes are complete
  - **When** running lint and build checks
  - **Then** both commands exit successfully with no new errors

## Deliverables
- [ ] Code updated in `convex/portfolio.ts` and `src/app/page.tsx`
- [ ] JavaScript interaction/data logic updated (if applicable)
- [ ] Docs updated (`.documents/research/TICKET-1003-content-source-map-2026-02-20.md`, `.documents/CHANGELOG.md`)
- [ ] Telemetry/metrics/alerts defined

## Verification Commands
- [ ] bash workflow/scripts/lint-prompts.sh (if docs/prompts changed)
- [ ] npx convex run portfolio:previewDefaults '{"slug":"main"}'
- [ ] npm run lint
- [ ] npm run build
- [ ] npm run dev:all
- [ ] Manual: desktop + mobile scan validates 10-second positioning and contact retrieval prompt

## Non-Functional Requirements
- Performance/SLO: no visible regression to initial page render behavior
- Security/Privacy constraints: only approved public contact channels in portfolio data
- Backward compatibility / migration: no schema or migration changes

## Access Semantics (permissions/integrations tickets only)
- Unauthenticated behavior: public portfolio chat remains accessible
- Authenticated but unauthorized behavior: not applicable
- Not-found behavior (404) only when explicitly intended: unchanged

## Dependencies & Impact
- Services/flags/env vars affected: `OPENAI_API_KEY`, `OPENAI_MODEL`, Convex dev/prod config
- Integration requirements: seeded content and UI copy must remain consistent for chat grounding
- Routing/navigation dependencies: none; single-page chat shell flow remains
- Data model/tables touched: `portfolio` document content only; no schema contract changes
- Rollout/rollback considerations: deploy content update as one unit; rollback via revert

## Decisions (resolved)
- Day 1 scope is content and recruiter copy only
- Source-of-truth mapping is mandatory before publishing statements
- Quick prompt taxonomy is fixed to fit/impact/leadership/contact
- Featured project logic remains `filter(...).slice(0, 3)`

## Open Questions (keep ≤ 4)
- None.

## Assumptions (keep ≤ 4)
- Source documents contain sufficient evidence for all Day 1 statements
- Existing UI layout already matches two-column IA requirements
- Contact channels in source docs are already owner-approved public fields

## Definition of Done
- [ ] All Acceptance Criteria pass
- [ ] Unit/Integration tests added/updated
- [ ] Lint/typecheck/CI green
- [ ] Deployed behind flag if risky
- [ ] Post-deploy verification documented
