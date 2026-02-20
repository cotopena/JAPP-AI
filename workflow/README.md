# 12-Factor Prompts - Portfolio Workspace

This folder standardizes how Codex runs commands and how agents use tools for both portfolio projects:

- `career-portfolio` (static HTML/CSS/JS site)
- `ai-portfolio` (Next.js + Convex + AI app)

`workflow/` is shared at workspace root and linked into both projects.  
`.documents/` is project-local and must remain separate inside each project.

## Active Project Rule

Always treat the current working directory as the **active project root**.  
Valid active project roots:

- `/Users/coto/Documents/Job Application AI/career-portfolio`
- `/Users/coto/Documents/Job Application AI/ai-portfolio`

All repository-relative paths in prompts should resolve from that active root.

## Before You Run

1. Inspect `workflow/tooling.config.json` for project contexts and tool fallbacks.
2. Confirm active-project `.documents/` exists and includes (`.tickets`, `.plans`, `prs`, `research`, `thoughts`).
3. Identify which project you are modifying (`career-portfolio` or `ai-portfolio`) and load matching context files.
4. Prefer local docs and code evidence before external web lookup.

## Shared Paths

- Workflow root: `workflow/`
- Config map: `workflow/tooling.config.json`

## Project-Local Paths

- Documents root: `.documents/`
- Tickets: `.documents/.tickets/`
- Plans: `.documents/.plans/`
- PR docs: `.documents/prs/`
- Changelog: `.documents/CHANGELOG.md`

## Project Context Files

For `career-portfolio`:

- `README.md`
- `task-board.md`
- `plan.md`
- `techstack-decisions.md`
- Core files: `index.html`, `styles.css`, `script.js`

For `ai-portfolio`:

- `README.md`
- `tasks-ai-portfolio.md`
- `design-ux-ui.md`
- Core dirs/files: `src/`, `convex/`, `src/app/api/chat/route.ts`

## Tools & Defaults

- Search: IDE (`builtin:Search`, `builtin:CodeSearch`) or CLI (`rg`, `grep`)
- Glob/list: IDE (`builtin:ListFiles`, `builtin:List`) or CLI (`rg --files`, `find`, `ls`)
- Read: IDE (`builtin:Read`) then CLI fallbacks (`sed -n`, `cat`)
- Web: use only when needed and allowed

## Workflow (Order)

1. Review active-project context docs and create a ticket with `workflow/commands/create_ticket.md`.
2. Generate a plan with `workflow/commands/create_plan.md` and save it to `.documents/.plans/pending/`.
3. Move approved plans to `.documents/.plans/current_plan/` and implement with `workflow/commands/implement_plan.md`.
4. Run `workflow/commands/manual_verification.md` in a no-code-change session.
5. Move completed artifacts to `.documents/.plans/completed_plan/` and `.documents/.tickets/done/`.
6. Run `workflow/commands/commit.md`, then draft PR notes via `workflow/commands/describe_pr.md`.

Optional: use `workflow/commands/make_branch.md` or `workflow/commands/make_worktree.md` before implementation. Branches should use the `gus/` prefix.

## Prompt Linting

- `bash workflow/scripts/lint-prompts.sh`
- `bash workflow/scripts/lint-ticket.sh <ticket-path>`

## Conventions

- Use project-relative paths in prompts.
- Keep tickets small and specific: `TICKET-####-short-slug-YYYY-MM-DD.md`.
- Keep plans phased and verifiable.
- Use project-appropriate checks:
  - `career-portfolio`: browser/manual static checks.
  - `ai-portfolio`: `npm run lint`, `npm run build`, and Convex checks as needed.

If a tool is unavailable (for example, no `rg`), use the next fallback in `workflow/tooling.config.json`.
