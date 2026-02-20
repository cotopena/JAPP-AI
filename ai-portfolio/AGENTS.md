# Repository Guidelines

## Experience Content Source of Truth

When updating recruiter-facing profile, skills, highlights, or project content for `ai-portfolio`, use these files first:

1. `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
2. `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
3. `/Users/coto/Documents/Job Application AI/experience_bank.md`
4. `/Users/coto/Documents/Job Application AI/applications/**` (supporting examples only)

## Required Update Flow for Content Changes

1. Build/refresh a mapping doc:
   - `.documents/research/TICKET-<id>-content-source-map-YYYY-MM-DD.md`
2. For each final portfolio statement, include:
   - Target field in `convex/portfolio.ts` (example: `projects[pipeline-modernization].impact`)
   - Exact source file and line reference from the source-of-truth docs
   - Final normalized wording that will be published
3. Update seeded data in `convex/portfolio.ts` only after mapping exists.
4. Verify with:
   - `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
   - `npm run lint`
   - `npm run build`

## Guardrails

- Do not invent claims, metrics, or roles not grounded in source docs.
- Keep `convex/schema.ts` contracts unchanged unless a separate schema ticket exists.
- Preserve deterministic featured-project behavior in `src/app/page.tsx` (`filter(...).slice(0, 3)`).

## Conflict Resolution Rules

When source documents disagree, resolve in this order:

1. `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
2. `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
3. `/Users/coto/Documents/Job Application AI/experience_bank.md`
4. `/Users/coto/Documents/Job Application AI/applications/**`

If role title, dates, employer, or measurable outcomes conflict between higher-priority sources, pause and ask for explicit user confirmation before publishing.

## Hard Publish Gates

- Every published portfolio claim must include at least one source file + line reference in the ticket source-map doc.
- If a statement has no source line reference, do not publish it.
- Do not introduce new metrics, date ranges, company names, certifications, or role titles that are not present in the source-of-truth docs.
- Keep contact channels limited to owner-approved public fields.

## Content Update Definition of Done

A content update is complete only when all items are done:

1. Source map exists and is complete:
   - `.documents/research/TICKET-<id>-content-source-map-YYYY-MM-DD.md`
2. `convex/portfolio.ts` is updated from mapped source content.
3. Verification commands pass.
4. Ticket is updated with current plan reference and any scope changes.
5. `.documents/CHANGELOG.md` includes the content update entry.

## Mandatory Verification Commands

Run these for all portfolio content changes:

1. `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
2. `npm run lint`
3. `npm run build`
4. `npm run dev:all` (manual UI/chat validation pass)

## Repository Hygiene

- Do not commit editor swap or temp files.
- Ensure `.gitignore` includes: `*.swp`, `*.swo`, and `*~`.
- Remove accidental local swap files before commit.
