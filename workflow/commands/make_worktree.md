# Create Worktrees for Current Plans

Create a git worktree (with its own branch) for every plan file under `.documents/.plans/current_plan/`. Mirrors `make_branch.md` naming but provisions isolated worktrees so plans can be worked in parallel.

## Inputs
- Optional: plans directory (default `.documents/.plans/current_plan`).
- Optional: branch type (default `feat`; allowed: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`).
- Optional: base branch (default `main`).

## Naming Rules
- **Plan stem**: filename without directory or `.md`, e.g., `PLAN-2001-refresh-hero-and-project-flow-2026-02-19`.
- **Branch**: `gus/<type>/<plan-stem>` (preserve the plan casing and date).
- **Worktree dir**: `.worktrees/<stem-without-date-lowercased>`.
  - `stem-without-date` strips a trailing `-YYYY-MM-DD` if present.
  - Example: stem `PLAN-2001-refresh-hero-and-project-flow-2026-02-19` → worktree `.worktrees/plan-2001-refresh-hero-and-project-flow`.

## Steps
1) **Prep**  
   - `cd <active-project-root>` where active root is either `/Users/coto/Documents/Job Application AI/career-portfolio` or `/Users/coto/Documents/Job Application AI/ai-portfolio`  
   - Verify the plans directory exists; if missing or empty, ask the user before continuing.
   - `git fetch --all --prune`
   - `git worktree prune`
   - `mkdir -p .worktrees`
2) **Discover plans**  
   - List targets: `find .documents/.plans/current_plan -maxdepth 1 -type f -name 'PLAN-*.md' | sort`
   - If none found, stop and ask for guidance.
3) **For each plan file**  
   - Derive `plan_stem=$(basename "$plan" .md)`.
   - Derive `stem_without_date` by stripping the final `-YYYY-MM-DD` if present.
   - `branch_name="gus/<type>/$plan_stem"` (default type `feat`).
   - `worktree_dir=".worktrees/${stem_without_date,,}"` (lowercased).
   - Collision checks:
     - If `git branch --list "$branch_name"` exists, ask whether to reuse it or choose a new suffix.
     - If `git worktree list` already shows `worktree_dir`, ask before proceeding.
   - Create the worktree from the base branch (default `main`):  
     `git worktree add "$worktree_dir" -b "$branch_name" "$base_branch"`
4) **Verify**  
   - `git worktree list`  
   - Report the created worktrees and any that were skipped due to collisions.

## Guardrails
- Do not delete existing worktrees or branches.
- Do not modify repo files; only create branches/worktrees.
- Respect uncommitted changes in the main working tree; do not clean or stash without explicit approval.
- Quote paths; the repo path contains spaces.

## Example Codex CLI Prompt
`Use workflow/commands/make_worktree.md (type=feat, base=main) to create worktrees for every plan in .documents/.plans/current_plan/.`
