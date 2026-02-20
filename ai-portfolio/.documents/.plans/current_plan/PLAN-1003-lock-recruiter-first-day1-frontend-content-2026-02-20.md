# Lock Recruiter-First Day 1 Frontend Content Implementation Plan

## Overview
Lock Day 1 recruiter-facing content so first-time visitors can identify role fit, measurable impact, and contact path in seconds, while keeping AI answers grounded in verified source-of-truth statements.

## Current State Analysis
- `convex/portfolio.ts:35-153` centralizes seeded recruiter-facing content (`intro`, `valueProp`, `quickPrompts`, `highlightBullets`, and project summaries/impact statements).
- `convex/portfolio.ts:176-207` exposes and seeds the portfolio document used by the frontend.
- `src/app/page.tsx:105-107` already applies deterministic featured-project behavior with `filter(...).slice(0, 3)`.
- `src/app/page.tsx:128-172` renders identity panel copy directly from seeded `portfolio` fields (name/role/intro/value/highlights/featured work).
- `src/app/page.tsx:191-207` renders quick prompt chips from `portfolio.quickPrompts`.
- `src/app/page.tsx:212-217` and `src/app/page.tsx:269` provide recruiter guidance copy in empty-state and textarea placeholder.
- `.documents/tasks-ai-portfolio.md:59-70` defines Day 1 as content lock for `convex/portfolio.ts` plus recruiter copy pass in `src/app/page.tsx`.
- `.documents/design-ux-ui.md:5-11`, `.documents/design-ux-ui.md:21-25`, and `.documents/design-ux-ui.md:101-107` define recruiter-first outcomes (who/value/contact in 10 seconds).
- `README.md:82-99` defines source-of-truth precedence and required content verification flow.

## Desired End State
- `.documents/research/TICKET-1003-content-source-map-2026-02-20.md` exists and maps every Day 1 published statement to a source file + line.
- `convex/portfolio.ts` Day 1 content fields are updated only from mapped/verified source lines.
- `src/app/page.tsx` recruiter-facing labels/copy are aligned to Day 1 positioning and contact path expectations.
- Quick prompts cover fit, impact, leadership, and contact flows without unsupported claims.
- Required verification commands pass and handoff docs (`ticket` + `changelog`) are updated.

### Key Discoveries
- Day 1 recruiter language is data-driven in `convex/portfolio.ts` and rendered directly in the UI (`src/app/page.tsx:128-172`, `src/app/page.tsx:191-207`), so seed content and surface copy must be aligned together.
- Existing recruiter guidance copy already exists in message-empty state and input placeholder (`src/app/page.tsx:212-217`, `src/app/page.tsx:269`) and should be intentionally tuned, not replaced ad hoc.
- Featured project determinism is already implemented (`src/app/page.tsx:105-107`) and must remain unchanged.
- Prior source-map format is established in `.documents/research/TICKET-1001-content-source-map-2026-02-20.md:1-68` and should be reused for TICKET-1003.

## What We're NOT Doing
- No schema/index/table changes in `convex/schema.ts`.
- No route behavior changes in `src/app/api/chat/route.ts`.
- No Day 2 chat reliability/mobile behavior work.
- No net-new claims, metrics, dates, role titles, employers, or certifications.
- No new analytics/citations/CMS flows.

## Implementation Approach
Execute a four-phase, evidence-first content lock: build a ticket-scoped source map, update seeded portfolio defaults from mapped statements, align recruiter-facing UI copy to the same statements, then run the full verification stack and finalize documentation. This keeps data grounding and frontend messaging synchronized while preserving existing contracts and deterministic featured-project behavior.

## Phase 1 – Build the TICKET-1003 Content Source Map
### Goal
Create the mandatory source-of-truth mapping artifact before any Day 1 publish changes.

### Implementation Steps
1. Create `.documents/research/TICKET-1003-content-source-map-2026-02-20.md` using the same table structure used in `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`.
2. Map each in-scope Day 1 statement (intro, value prop, highlights, quick prompts, recruiter-visible project summary/impact statements) to source references from:
   - `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
   - `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
   - `/Users/coto/Documents/Job Application AI/experience_bank.md`
   - `/Users/coto/Documents/Job Application AI/applications/**` (supporting only)
3. Normalize final wording in the map so each field has publish-ready text and at least one source line reference.
4. Apply conflict-resolution order (CV > Resume > experience bank > applications) and pause only if role title/date/employer/metric conflicts remain unresolved.

### Acceptance Criteria
#### Automated
- [ ] `bash workflow/scripts/lint-prompts.sh` (docs/prompts changed)

#### Manual
- [ ] Every published Day 1 statement has a source file + line in the map.
- [ ] No mapped statement introduces unsupported claims or metrics.
- [ ] Conflict-resolution order is respected for any overlapping source text.

### Assets/Docs
- `.documents/research/TICKET-1003-content-source-map-2026-02-20.md`
- `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`
- `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
- `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
- `/Users/coto/Documents/Job Application AI/experience_bank.md`

## Phase 2 – Align Seeded Portfolio Content in Convex
### Goal
Update seeded recruiter-facing defaults in `convex/portfolio.ts` using only mapped statements from Phase 1.

### Implementation Steps
1. Update Day 1 portfolio fields in `buildDefaultPortfolio` (`convex/portfolio.ts:35-153`) for:
   - `intro`
   - `valueProp`
   - `highlightBullets`
   - `quickPrompts`
   - Recruiter-visible project `summary`/`impact` fields where Day 1 scope requires wording lock.
2. Keep schema contracts unchanged (`convex/schema.ts`) and preserve query/mutation interfaces (`convex/portfolio.ts:176-215`).
3. Ensure quick prompt taxonomy explicitly covers fit, impact, leadership, and contact.
4. Preserve existing featured-project flags and ordering assumptions in seeded projects.

### Acceptance Criteria
#### Automated
- [ ] `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
- [ ] `npm run lint`
- [ ] `npm run build`

#### Manual
- [ ] `previewDefaults` output for `intro`, `valueProp`, `highlightBullets`, and `quickPrompts` matches mapped wording.
- [ ] Seeded content contains no unsupported claims relative to the source map.
- [ ] Featured project behavior remains compatible with `filter(...).slice(0, 3)` in the UI.

### Assets/Docs
- `convex/portfolio.ts`
- `convex/schema.ts`
- `.documents/research/TICKET-1003-content-source-map-2026-02-20.md`

## Phase 3 – Align Recruiter-Facing Copy in `src/app/page.tsx`
### Goal
Synchronize visible Day 1 recruiter labels and guidance copy with the updated seeded content and UX intent.

### Implementation Steps
1. Update recruiter-facing static labels/copy in the identity and conversation surfaces (`src/app/page.tsx:124-208`) where wording needs Day 1 lock alignment.
2. Keep dynamic bindings from `portfolio` intact for intro/value/highlights/prompts (`src/app/page.tsx:128-152`, `src/app/page.tsx:191-207`).
3. Update recruiter guidance copy in empty state and input placeholder (`src/app/page.tsx:212-217`, `src/app/page.tsx:269`) to reflect fit/impact/leadership/contact intent.
4. Preserve interaction behavior (prompt chip send flow, submit disabled states, status badges) and keep featured-project selector unchanged (`src/app/page.tsx:105-107`).

### Acceptance Criteria
#### Automated
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run dev:all` starts Next.js + Convex without new runtime errors

#### Manual
- [ ] 10-second recruiter scan can identify who Augusto is, measurable value, and contact path without typing.
- [ ] Quick prompt labels cover fit, impact, leadership evidence, and contact details.
- [ ] Empty-state/input guidance remains recruiter-specific and consistent with seeded content.
- [ ] Desktop and mobile layouts remain readable with no copy clipping regressions.

### Assets/Docs
- `src/app/page.tsx`
- `.documents/design-ux-ui.md`

## Phase 4 – Verification, Ticket Linking, and Changelog Handoff
### Goal
Close the ticket with reproducible verification evidence and complete planning/documentation traceability.

### Implementation Steps
1. Run and record required checks:
   - `bash workflow/scripts/lint-prompts.sh` (docs/prompts changed)
   - `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
   - `npm run lint`
   - `npm run build`
   - `npm run dev:all`
2. Execute manual recruiter validation pass (desktop + mobile) for 10-second positioning and contact retrieval prompt flow.
3. Update `.documents/CHANGELOG.md` with TICKET-1003 content-lock summary and verification evidence.
4. Add plan linkage in ticket frontmatter/body:
   - `plan_path: .documents/.plans/current_plan/PLAN-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md`
   - `## Plan Reference` section with matching path.

### Acceptance Criteria
#### Automated
- [ ] All required verification commands exit successfully.

#### Manual
- [ ] Ticket acceptance criteria can be traced to verification evidence.
- [ ] Changelog entry captures scope and command validation.
- [ ] Ticket references the current plan path for implementation handoff.

### Assets/Docs
- `.documents/CHANGELOG.md`
- `.documents/.tickets/current/TICKET-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md`
- `.documents/.plans/current_plan/PLAN-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md`

## Testing Strategy
- File-level focus:
  - `convex/portfolio.ts`
  - `src/app/page.tsx`
  - `.documents/research/TICKET-1003-content-source-map-2026-02-20.md`
  - `.documents/.tickets/current/TICKET-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md`
  - `.documents/CHANGELOG.md`
- Interaction sequence:
  1. Run `npx convex run portfolio:previewDefaults '{"slug":"main"}'` and verify seeded fields against source map.
  2. Launch `npm run dev:all`, load homepage, and run 10-second recruiter scan.
  3. Validate quick prompts are visible and match fit/impact/leadership/contact taxonomy.
  4. Trigger contact-oriented prompt and confirm direct contact path remains accessible.
  5. Re-check desktop and mobile layouts for copy consistency.
- Manual checklist:
  - Source map completeness per field
  - Seeded content and UI copy parity
  - Featured-project determinism preserved
  - Contact path discoverability without typing

## Performance / Security / Migration Notes
- Performance: content-only/frontend-copy updates should not alter render architecture or streaming model behavior.
- Security/privacy: keep contact outputs limited to owner-approved public fields already present in source docs.
- Migration: no schema/migration/index changes; `convex/schema.ts` remains unchanged.
- Rollback: revert the content-lock commit to restore prior seeded/UI wording.

## References
- `.documents/.tickets/current/TICKET-1003-lock-recruiter-first-day1-frontend-content-2026-02-20.md`
- `.documents/tasks-ai-portfolio.md`
- `.documents/design-ux-ui.md`
- `README.md`
- `convex/portfolio.ts`
- `src/app/page.tsx`
- `convex/schema.ts`
- `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`
- `workflow/commands/create_plan.md`
