# Publish Real Profile and Project Content Implementation Plan

## Overview
Replace seeded placeholder portfolio content with production-ready profile/project data sourced from your current experience corpus in `/Users/coto/Documents/Job Application AI`, then align recruiter-facing UI/chat copy to that canonical source.

## Current State Analysis
- `convex/portfolio.ts:35` hardcodes default profile, highlights, skills, quick prompts, and projects in `buildDefaultPortfolio`.
- `convex/portfolio.ts:182` upserts that default payload into the `portfolio` table via `seedDefaultPortfolio`.
- `convex/schema.ts:27` enforces the portfolio payload contract; schema updates are not required for this ticket.
- `src/app/page.tsx:54` loads seeded portfolio content from Convex and renders it directly.
- `src/app/page.tsx:105` determines featured cards with `filter(featured).slice(0, 3)`.
- `src/app/page.tsx:191` renders quick prompt chips from `portfolio.quickPrompts` and submits chip text directly through `sendMessage`.
- `src/app/page.tsx:211` and `src/app/page.tsx:268` contain static recruiter helper copy and input placeholder copy.
- `src/app/api/chat/route.ts:56` composes the assistant system prompt from portfolio fields.
- `src/app/api/chat/route.ts:118` exposes tool outputs (`getProfile`, `getProjects`, `getSkills`, `getContact`) from the same portfolio record.

## Desired End State
- Portfolio seed content is grounded in current resume/experience artifacts from `/Users/coto/Documents/Job Application AI`.
- Each seeded claim (profile, highlights, skills, projects, links) has a traceable source reference.
- Recruiter-facing quick prompts and helper copy reflect hiring-flow language tied to real experience.
- Featured work remains deterministic (exactly three cards when three+ projects are marked featured).
- Chat system prompt and tools stay aligned with updated seeded data so responses avoid invented claims.

### Key Discoveries
- The app currently uses Convex seed data as the single source of truth for both UI and AI responses (`convex/portfolio.ts:35`, `src/app/page.tsx:54`, `src/app/api/chat/route.ts:98`).
- Current experience corpus already exists outside the app repo at:
  - `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
  - `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
  - `/Users/coto/Documents/Job Application AI/experience_bank.md`
  - `/Users/coto/Documents/Job Application AI/applications/**/Augusto_Pena_*_Resume.md`
  - `/Users/coto/Documents/Job Application AI/applications/**/Application_Notes_*.md`
- Quick prompt chip submission already uses exact label text, so prompt intent changes are content-only (`src/app/page.tsx:196`).
- Featured project determinism already exists and should be preserved (`src/app/page.tsx:105`).

## What We're NOT Doing
- No Convex schema/index/table changes.
- No runtime file ingestion from `/Users/coto/Documents/Job Application AI` in production code.
- No chat reliability/error-state feature work.
- No abuse prevention/rate-limiting work.
- No admin/CMS authoring workflow.

## Implementation Approach
Add a source-traceability phase first: inventory your current experience files, map approved facts to portfolio fields, then update `convex/portfolio.ts` using that mapping. After seeding content is updated, align recruiter-facing UI/chat wording and verify grounding with manual and command checks.

## Execution Status (2026-02-20)
- Phase 1 - Complete
- Phase 2 - Complete
- Phase 3 - Complete
- Phase 4 - Complete

## Phase 1 – Experience Source Audit and Mapping
### Goal
Establish a verified content map from your current experience corpus to every portfolio field that will be published.

### Implementation Steps
1. Source inventory - Read canonical files:
   - `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
   - `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
   - `/Users/coto/Documents/Job Application AI/experience_bank.md`
   - Relevant tailored resumes/notes under `/Users/coto/Documents/Job Application AI/applications/`
2. Create a source map document at `.documents/research/TICKET-1001-content-source-map-2026-02-20.md` with rows:
   - target field (`intro`, `highlightBullets[0]`, `projects[slug].impact`, etc.)
   - exact source file + line reference
   - normalized final wording
3. Apply precedence rules in the map:
   - CV, base resume, and experience bank are primary.
   - Tailored application files can enrich wording/examples when consistent with primary sources.
4. Resolve any conflicts/duplication in wording before seed edits begin.

### Acceptance Criteria
#### Automated
- [x] `rg -n "target field|source file|final wording" .documents/research/TICKET-1001-content-source-map-2026-02-20.md` confirms required mapping columns exist. PASS (header present at line 5).
#### Manual
- [x] Every seeded profile/project claim planned for publication has at least one source reference in the map. - Passed: `.documents/research/TICKET-1001-content-source-map-2026-02-20.md` includes source-backed rows for all seeded profile fields and all four published project slugs.
- [x] No mapped claim depends solely on unverified placeholder text. - Passed: source-map references point to CV/resume/experience-bank files and `rg -n "placeholder" .documents/research/TICKET-1001-content-source-map-2026-02-20.md` returned no matches.
- [x] At least three projects are marked as candidates for `featured: true`. - Passed: source-map `projects[...].featured` rows mark `quotenclose-algorithmic-pricing-engine`, `safeguard-unified-revops-systems`, and `reehash-virtual-sales-automation` as `true`.

### Assets/Docs
- `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
- `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
- `/Users/coto/Documents/Job Application AI/experience_bank.md`
- `/Users/coto/Documents/Job Application AI/applications/`
- `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`

## Phase 2 – Update Canonical Convex Seed Content
### Goal
Publish mapped, approved experience content in the Convex default payload without changing data contracts.

### Implementation Steps
1. `convex/portfolio.ts` - Update identity fields (`name`, `role`, `location`, `intro`, `longBio`, `valueProp`, `availability`, `email`, `socials`) from the source map.
2. `convex/portfolio.ts` - Replace `highlightBullets`, `skillGroups`, and `quickPrompts` with mapped recruiter-focused language.
3. `convex/portfolio.ts` - Replace `projects` with mapped real case studies and links; keep required schema keys unchanged and set at least three `featured: true`.
4. `convex/portfolio.ts` - Keep `PortfolioPayload`, `toPayload`, `getPublicPortfolio`, `seedDefaultPortfolio`, and `previewDefaults` contracts unchanged.

### Acceptance Criteria
#### Automated
- [x] `npx convex run portfolio:previewDefaults '{"slug":"main"}'` returns updated content with no placeholder phrasing. PASS (updated profile/highlights/projects rendered from seed defaults).
- [x] `npm run lint` passes. PASS.
- [x] `npm run build` passes. PASS.
#### Manual
- [x] Seed preview output matches mapped source facts for profile, highlights, skills, and projects. - Passed: `npx convex run portfolio:previewDefaults '{"slug":"main"}'` returned mapped wording for intro/highlights/skills and the four mapped projects.
- [x] Seeded payload preserves schema compatibility (`convex/schema.ts` validators unchanged). - Passed: `git diff -- convex/schema.ts` returned no changes (validators unchanged).
- [x] Three deterministic featured projects are present in updated seed content. - Passed: `npx convex run portfolio:previewDefaults '{"slug":"main"}' | node -e '...projects.filter((p)=>p.featured).length...'` returned `3`, and UI featured panel rendered three cards after reseed.

### Assets/Docs
- `convex/portfolio.ts`
- `convex/schema.ts`
- `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`

## Phase 3 – Align Recruiter-Facing UI and Chat Grounding
### Goal
Ensure recruiter-facing page/chat copy reflects mapped experience content and that assistant responses remain grounded.

### Implementation Steps
1. `src/app/page.tsx` - Update static empty-state helper copy (`messages.length === 0`) to recruiter-focused language aligned with mapped content.
2. `src/app/page.tsx` - Update static textarea placeholder copy to match approved recruiter prompt framing.
3. `src/app/page.tsx` - Validate quick prompt chips (from seeded `quickPrompts`) still submit exact chip label text and cover fit/impact/leadership/contact intents.
4. `src/app/api/chat/route.ts` - Adjust `createSystemPrompt` wording if needed to reflect updated profile voice while keeping grounded-response rules.
5. `src/app/api/chat/route.ts` - Validate tool outputs remain direct projections of updated portfolio data.

### Acceptance Criteria
#### Automated
- [x] `npm run lint` passes after UI/chat copy edits. PASS.
- [x] `npm run build` passes. PASS.
#### Manual
- [x] Profile panel displays updated intro, value proposition, highlights, and featured project summaries. - Passed: after `npx convex run portfolio:seedDefaultPortfolio '{"slug":"main"}'` and reload, snapshot showed updated intro/value prop/highlights plus three featured summaries.
- [x] Each quick prompt chip sends the exact chip label text. - Passed: clicking all five quick-prompt chips produced user-turn text that exactly matched each chip label.
- [x] Empty-state helper copy and input placeholder show updated recruiter guidance. - Passed: empty-state text showed recruiter guidance before first message, and `document.getElementById('chat-input').getAttribute('placeholder')` returned recruiter-style placeholder copy.
- [x] Chat answers about projects/contact reflect mapped seed content with no invented claims. - Passed: project/contact replies matched seeded facts (99.99% pricing accuracy, 300% referrals, email/phone), and unsupported Google-employment query returned explicit missing-data response.

### Assets/Docs
- `src/app/page.tsx`
- `src/app/api/chat/route.ts`
- `.documents/design-ux-ui.md`

## Phase 4 – Verification, Reseed, and Release Notes
### Goal
Finalize delivery by validating seeded behavior end-to-end and documenting shipped content changes.

### Implementation Steps
1. Run and verify:
   - `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
   - `npm run lint`
   - `npm run build`
   - `npm run dev:all`
2. Manual scenario pass for ticket acceptance criteria:
   - profile panel, prompts, featured cards, and chat grounding.
3. `.documents/CHANGELOG.md` - Add dated release entry describing real-profile/project publication and recruiter-copy alignment.
4. Ticket update - Record plan execution status and note that telemetry is not newly implemented in this scope.

### Acceptance Criteria
#### Automated
- [x] All verification commands in ticket run successfully. - Passed: `npx convex run portfolio:previewDefaults '{"slug":"main"}'`, `npm run lint`, `npm run build`, and `npm run dev:all` all ran successfully in this session.
- [x] `bash workflow/scripts/lint-prompts.sh` runs if prompt docs were modified. PASS.
#### Manual
- [x] Recruiter-focused scenarios from the ticket pass on local run. - Passed: desktop and mobile checks validated updated profile panel, quick prompts, featured cards, and grounded recruiter-facing responses.
- [x] Message persistence remains intact for user and assistant turns. - Passed (re-verified 2026-02-20 via MCP DevTools): sent a fresh-session prompt, reloaded `http://localhost:3000`, UI rehydrated both `YOU` and `AUGUSTO AI` turns, and `npx convex run chat:getMessagesBySession '{"sessionId":"500afafe-1eb6-4041-9696-b22e1d67e527"}'` returned both `role: "user"` and `role: "assistant"` entries.
- [x] Contact outputs expose only approved public fields. - Passed: contact response exposed email and phone (plus availability), with no extra private fields.

### Assets/Docs
- `.documents/CHANGELOG.md`
- `.documents/.tickets/current/TICKET-1001-publish-real-profile-project-content-2026-02-20.md`

## Testing Strategy
- Source traceability:
  - Validate every seeded claim against `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`.
- File-level coverage:
  - `convex/portfolio.ts`
  - `src/app/page.tsx`
  - `src/app/api/chat/route.ts`
  - `.documents/CHANGELOG.md`
- Interaction sequence:
  - Seed/preview defaults.
  - Load portfolio page and confirm identity/highlights/featured cards.
  - Trigger each quick prompt + one custom prompt.
  - Ask project/contact questions and validate grounded responses.
  - Refresh to confirm chat history persistence.
- Manual checklist:
  - Desktop and mobile recruiter flow validation.
  - Deterministic featured-card count and ordering behavior.
  - Helper copy, placeholder copy, and contact outputs match approved messaging.

## Performance / Security / Migration Notes
- Performance: no new request paths; existing Convex query/mutation + AI tool flow preserved.
- Security/privacy: only approved public contact fields remain exposed.
- Migration: no schema/index migration; data contract unchanged.
- Rollback: revert commit, redeploy, reseed `main`.

## Implementation Notes (2026-02-20)
- Created `.documents/research/TICKET-1001-content-source-map-2026-02-20.md` with field-level references from CV, base resume, and experience bank.
- Updated `convex/portfolio.ts` seeded defaults with mapped profile, recruiter prompts, highlights, skills, and four real projects (three marked `featured: true` to preserve deterministic featured slicing).
- Updated recruiter-facing empty-state and textarea placeholder copy in `src/app/page.tsx`.
- Updated `createSystemPrompt` grounding rules in `src/app/api/chat/route.ts` to require data-backed responses and explicit missing-data handling.
- Fixed assistant-turn persistence by saving assistant output from `streamText` `onFinish` in `src/app/api/chat/route.ts` (instead of relying on `toUIMessageStreamResponse` finish callback).
- Kept schema and portfolio contracts unchanged; no migration required.

## References
- `.documents/.tickets/current/TICKET-1001-publish-real-profile-project-content-2026-02-20.md`
- `.documents/tasks-ai-portfolio.md`
- `.documents/design-ux-ui.md`
- `convex/portfolio.ts`
- `convex/schema.ts`
- `src/app/page.tsx`
- `src/app/api/chat/route.ts`
- `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
- `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
- `/Users/coto/Documents/Job Application AI/experience_bank.md`
