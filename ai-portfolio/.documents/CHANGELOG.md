# Changelog

All notable changes to this AI portfolio project will be documented here.
Entries follow Keep a Changelog conventions.
Dates are in YYYY-MM-DD, newest entries go on top.

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
