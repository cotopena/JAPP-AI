# 12-Factor Prompts - Career Portfolio

This folder standardizes how Codex runs commands and how agents use tools for `career-portfolio`.
All commands and agents assume the current working directory is `/Users/coto/Documents/Job Application AI/career-portfolio`.

## Before You Run
1. Inspect `workflow/tooling.config.json` for workspace paths, docs roots, and tool fallbacks.
2. Confirm `.documents/` exists with the expected structure (`.tickets`, `.plans`, `prs`, `research`, `thoughts`).
3. Note your environment: Codex CLI should prefer `rg`, `sed -n`, and `ls`; IDE agents should prefer built-in tools first.
4. Skip web lookup when local docs already answer the question.

## Paths
- Workspace root: `./`
- Documents root: `.documents/`
- Tickets: `.documents/.tickets/`
- Plans: `.documents/.plans/`
- PR docs: `.documents/prs/`
- Task board: `task-board.md`
- Project plan: `plan.md`
- Tech stack notes: `techstack-decisions.md`
- Main files: `index.html`, `styles.css`, `script.js`
- Config map: `workflow/tooling.config.json`

## Tools & Defaults
- Search: IDE (`builtin:Search`, `builtin:CodeSearch`) or CLI (`rg`, `grep`)
- Glob/list: IDE (`builtin:ListFiles`, `builtin:List`) or CLI (`rg --files`, `find`, `ls`)
- Read: IDE (`builtin:Read`) then CLI fallbacks (`sed -n`, `cat`)
- Web: use only when needed and allowed

## Workflow (Order)
1. Review `task-board.md` + context docs, then create a ticket with `workflow/commands/create_ticket.md`.
2. Generate a plan with `workflow/commands/create_plan.md` and save it to `.documents/.plans/pending/`.
3. Move approved plans to `.documents/.plans/current_plan/` and implement with `workflow/commands/implement_plan.md`.
4. Run `workflow/commands/manual_verification.md` in a no-code-change session.
5. Move completed artifacts to `.documents/.plans/completed_plan/` and `.documents/.tickets/done/`.
6. Run `workflow/commands/commit.md`, then draft PR notes via `workflow/commands/describe_pr.md`.

Optional: use `workflow/commands/make_branch.md` before implementation. Branches should use the `gus/` prefix.

## Prompt Linting
- `bash workflow/scripts/lint-prompts.sh`
- `bash workflow/scripts/lint-ticket.sh <ticket-path>`

## Conventions
- Use repo-relative paths in prompts.
- Keep tickets small and specific: `TICKET-####-short-slug-YYYY-MM-DD.md`.
- Keep plans phased and verifiable.
- For this static project, prefer browser checks and local server runs (for example `python3 -m http.server 8080`) over framework-specific build assumptions.

If a tool is unavailable (for example, no `rg`), use the next fallback in `workflow/tooling.config.json`.
