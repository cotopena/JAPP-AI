---
date: 2026-02-20
branch: gus/1001-publish-real-expercience
base: main
status: draft
---

## Linked Ticket / Plan
- Ticket: `.documents/.tickets/done/TICKET-1001-publish-real-profile-project-content-2026-02-20.md`
- Plan: `.documents/.plans/completed_plan/PLAN-1001-publish-real-profile-project-content-2026-02-20.md`
- Research Map: `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`

## What problem(s) was I solving?
The AI portfolio shipped with placeholder profile/project data, which reduced recruiter trust and produced weak chat responses. The update needed to publish only source-backed claims from the canonical CV/resume/experience corpus while preserving schema contracts and deterministic featured-project behavior. During verification, assistant-turn chat persistence was also failing after reload and needed a targeted fix.

## What user-facing changes did I ship?
- Replaced placeholder profile data, highlights, skills, prompts, and projects with mapped production content.
- Updated recruiter-facing helper copy and input placeholder copy in chat.
- Preserved deterministic featured work rendering with three `featured: true` projects.
- Kept contact outputs constrained to approved public fields (email, phone, availability context).
- Fixed chat rehydration behavior so both user and assistant turns persist and reload correctly.

## How I implemented it
- Added a full source-traceability artifact mapping each published field to exact source lines:
  - `.documents/research/TICKET-1001-content-source-map-2026-02-20.md`
- Updated seed defaults in `convex/portfolio.ts` using only mapped claims from:
  - `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
  - `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
  - `/Users/coto/Documents/Job Application AI/experience_bank.md`
- Aligned recruiter copy in `src/app/page.tsx` and grounding rules in `src/app/api/chat/route.ts`.
- Fixed assistant persistence by storing assistant output from `streamText` `onFinish` (final text + assistant message id fallback) instead of relying on `toUIMessageStreamResponse` finish callback.
- Completed workflow hygiene by moving artifacts to completed/done folders and updating ticket metadata pointers.

Key commits:
- `f843fb4` feat(portfolio): publish mapped profile content and fix assistant-turn persistence
- `744c078` docs(ticket-1001): record verification outcomes and release notes
- `c03f695` plan and ticket moved to completed folders

## How to verify it

### Automated
- [x] `bash workflow/scripts/lint-prompts.sh`
- [x] `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
- [x] `npm run lint`
- [x] `npm run build`

### Manual Testing
- [x] Reseed and load profile: identity panel, highlights, featured cards, helper copy, and placeholder reflect updated mapped content.
- [x] Quick prompts: each chip submits exact label text.
- [x] Grounding check: project/contact responses match seeded claims; unsupported history query returns explicit missing-data response.
- [x] Mobile check (390x844): recruiter flow remains readable and complete.
- [x] Contact safety: responses expose only approved public fields.
- [x] Persistence regression: after reload, `chat:getMessagesBySession` contains both `user` and `assistant` turns for the same session.

## Risks / Notes
- No schema changes or migrations.
- No new runtime data ingestion from external files.
- Remaining out-of-scope item from ticket: telemetry/metrics/alerts were not introduced.

## Description for the changelog
Publish source-mapped real profile/project content for TICKET-1001, align recruiter-facing chat copy, and fix assistant-turn persistence so conversation history rehydrates correctly after reload.
