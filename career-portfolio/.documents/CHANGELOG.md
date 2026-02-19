# Changelog

All notable changes to this project will be documented here.
Entries follow Keep a Changelog conventions and the Career Portfolio MVP version style.
Dates are in YYYY-MM-DD, newest entries go on top.

## Career Portfolio Beta 1.0 — 2026-02-19

### Docs
- Added an adapted workflow system under `career-portfolio/workflow` for ticket, plan, implementation, validation, commit, and PR documentation flows.
- Added project workflow context docs: `task-board.md`, `plan.md`, and `techstack-decisions.md`.
- Initialized a clean `.documents` workspace and rewrote `business-model.md` for this portfolio website context.

#### Commit details
- `1c84488` — **docs(portfolio): add adapted workflow commands and agents**
  *Files*: `career-portfolio/workflow/*`, `career-portfolio/README.md`, `career-portfolio/task-board.md`, `career-portfolio/plan.md`, `career-portfolio/techstack-decisions.md`
  *Notes*: Imported and adapted command/agent workflow from another project to fit this static portfolio repo.
- `f2dea98` — **docs(portfolio): initialize documents workspace**
  *Files*: `career-portfolio/.documents/.plans/*`, `career-portfolio/.documents/.tickets/*`, `career-portfolio/.documents/CHANGELOG.md`, `career-portfolio/.documents/business-model.md`
  *Notes*: Started the local documentation workspace with empty plans/tickets and a portfolio-specific business model.
