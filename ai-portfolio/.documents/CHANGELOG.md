# Changelog

All notable changes to this AI portfolio project will be documented here.
Entries follow Keep a Changelog conventions.
Dates are in YYYY-MM-DD, newest entries go on top.

## Portfolio Release 0.4 — 2026-02-20

### Content
- Replaced seeded placeholder profile, highlights, skill groups, quick prompts, and project cards in `convex/portfolio.ts` with mapped claims from CV/resume/experience source-of-truth files, including three deterministic featured projects (Ticket: TICKET-1001-publish-real-profile-project-content-2026-02-20, Plan: PLAN-1001-publish-real-profile-project-content-2026-02-20 | direct request).
- Added source-traceability artifact `.documents/research/TICKET-1001-content-source-map-2026-02-20.md` with field-level source line references and normalized publish wording for every seeded claim (Ticket: TICKET-1001-publish-real-profile-project-content-2026-02-20, Plan: PLAN-1001-publish-real-profile-project-content-2026-02-20 | direct request).
- Updated recruiter-facing helper and input copy in `src/app/page.tsx` and strengthened grounding instructions in `src/app/api/chat/route.ts` so chat responses explicitly avoid inference beyond seeded data (Ticket: TICKET-1001-publish-real-profile-project-content-2026-02-20, Plan: PLAN-1001-publish-real-profile-project-content-2026-02-20 | direct request).
- Fixed assistant-turn message persistence by saving completed assistant text from `streamText` `onFinish`, restoring chat rehydration for both user and assistant roles after reload (Ticket: TICKET-1001-publish-real-profile-project-content-2026-02-20, Plan: PLAN-1001-publish-real-profile-project-content-2026-02-20 | direct request).

### Docs
- Documented repository-level source-of-truth and publish-gate rules so portfolio content updates are grounded in CV/resume/experience artifacts (Ticket: TICKET-1001-publish-real-profile-project-content-2026-02-20, Plan: PLAN-1001-publish-real-profile-project-content-2026-02-20 | direct request).

### Tickets
- Promoted the validated TICKET-1001 implementation plan to `current_plan` and linked the active plan path in the ticket for implementation handoff clarity (Ticket: TICKET-1001-publish-real-profile-project-content-2026-02-20, Plan: PLAN-1001-publish-real-profile-project-content-2026-02-20 | direct request).

#### Commit details
- `43dd25b` — **docs(ticket-1001): promote validated plan and sync ticket references**  
  *Files*: `ai-portfolio/.documents/.plans/current_plan/PLAN-1001-publish-real-profile-project-content-2026-02-20.md`, `ai-portfolio/.documents/.tickets/.counter`, `ai-portfolio/.documents/.tickets/.latest`, `ai-portfolio/.documents/.tickets/current/TICKET-1001-publish-real-profile-project-content-2026-02-20.md`  
  *Notes*: Captured and activated the execution plan, then aligned ticket scope/context with the approved source-mapping workflow.
- `aba98d8` — **docs(content): codify experience source-of-truth update rules**  
  *Files*: `ai-portfolio/AGENTS.md`, `ai-portfolio/README.md`, `ai-portfolio/.gitignore`  
  *Notes*: Added durable guidance for source precedence, verification gates, and swap-file hygiene to prevent ungrounded profile edits.

## Portfolio Release 0.3 — 2026-02-20

### Fixed
- Scoped Tailwind source discovery to `src/` to prevent Turbopack panics caused by traversing external symlinks during CSS processing (direct request).
- Deferred client session ID initialization until after hydration to keep initial server/client render output aligned and eliminate hydration mismatch overlays (direct request).

#### Commit details
- `b37004b` — **fix(ai-portfolio): stabilize Turbopack CSS scanning and initial hydration**
  *Files*: `ai-portfolio/src/app/globals.css`, `ai-portfolio/src/app/page.tsx`
  *Notes*: Fixed two runtime blockers in local development by constraining CSS source scanning and making the first client render deterministic.

## Portfolio Release 0.2 — 2026-02-20

### Tooling
- Added `npm run dev:all` so Convex and Next.js can run in one terminal.
- Added a dedicated Codex environment action (`AI-Run`) to launch `ai-portfolio` with `dev:all`.

#### Commit details
- `19ff82f` — **build(ai-portfolio): add dev:all command for one-terminal local run**
  *Files*: `ai-portfolio/package.json`, `ai-portfolio/package-lock.json`, `ai-portfolio/README.md`
  *Notes*: Reduced local run friction by replacing the two-terminal workflow with a single command option.
- `9c407ed` — **chore(codex): add separate run actions for career and ai portfolio**
  *Files*: `.codex/environments/environment.toml`
  *Notes*: Added explicit launch actions for each project to prevent cross-project command confusion.

## AI Portfolio Beta 0.1 — 2026-02-20

### Setup
- Initialized project-local `.documents` workspace for tickets, plans, PR notes, research, and thoughts.
- Separated AI portfolio planning artifacts from `career-portfolio` so each project has independent workflow records.
