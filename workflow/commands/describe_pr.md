---
description: Generate repository-ready PR descriptions with local archives
model: codex-high
---

# Describe Pull Request

You craft thorough pull request descriptions for the active portfolio repo (`career-portfolio` or `ai-portfolio`), store them under `.documents/prs/`, and (optionally) sync them to GitHub. Every PR write-up should explain intent, highlight user-facing impact, document verification, and point to the ticket/plan that drove the change.

## Before You Run
- Read `workflow/README.md` to confirm workspace layout, `.documents` conventions, and required guardrails (plan → manual verification → commit → PR).
- Consult `workflow/tooling.config.json` for the `.documents/prs/` root plus search/read fallbacks—use IDE tools first, fall back to CLI (`rg`, `sed -n`, `cat`) inside Codex CLI.
- Example Codex CLI prompt: `Use workflow/commands/describe_pr.md to summarize PR #123 improving hero copy and project filtering; save it to .documents/prs/PR-0123-hero-copy-project-filters.md and update the GitHub PR body.`

---

## Step 1 – Review the Template & Inputs

1. Use this template (feel free to add “Linked Ticket/Plan” near the top):
   ```md
   ## Linked Ticket / Plan
   - Ticket: `.documents/.tickets/...`
   - Plan: `.documents/.plans/current_plan/...`

   ## What problem(s) was I solving?

   ## What user-facing changes did I ship?

   ## How I implemented it

   ## How to verify it

   ### Automated
   - [ ] `bash workflow/scripts/lint-prompts.sh` (if workflow docs changed)
   - [ ] `python3 -m http.server 8080` (local smoke check)
   - [ ] (add/remove commands per plan)

   ### Manual Testing
   - [ ] Describe each manual scenario from the plan (layout, responsiveness, interaction flow, integrations)

   ## Description for the changelog
   ```
2. Read the ticket (`.documents/.tickets/...`), validated plan, and any research docs referenced in the plan so the PR narrative matches earlier artifacts.
3. Open `.documents/CHANGELOG.md` to align wording with the release notes; PR descriptions can be richer, but keep terminology consistent.

---

## Step 2 – Collect Git & PR Metadata

1. Confirm you’re on the feature branch: `git status` should show no unexpected changes; if dirty, note that in the PR.
2. Summarize commits: `git log --oneline -n 5` to highlight major commits for the “How I implemented it” section.
3. If GitHub CLI is configured, gather PR info:
   - `gh pr view --json number,title,body,url,headRefName,baseRefName,commits`
   - `gh pr diff` for the full patch (or use `git diff main...HEAD` if PR isn’t open yet).
   - If no PR exists yet, plan for the desired PR number/slug and mention “draft” in the file.

---

## Step 3 – Analyze the Changes

1. Read the diff and any supporting files to understand:
   - User-facing changes (UI flows, responsive behavior, interactions).
   - Internal implementations (`index.html`, `styles.css`, `script.js`, related docs).
   - Risk areas or migrations.
2. Cross-check against the plan phases to ensure each phase’s acceptance criteria is addressed.
3. Note any deviations, follow-ups, or TODOs that deserve call-outs in the PR.

---

## Step 4 – Document Verification Evidence

1. Run the relevant commands (at minimum):
   - `python3 -m http.server 8080` (or other commands referenced in the plan)
   - Any explicit lint/test command listed in the active plan
2. Mark each checklist item as `[x]` when it passes; leave unchecked with a short explanation if not run or failing.
3. Capture manual test evidence (screenshots, console logs, curl commands) if helpful; reference file paths or notes rather than embedding huge blobs.

---

## Step 5 – Write & Save the Description

1. Populate every section of the template, keeping paragraphs tight and scannable.
2. Emphasize:
   - The “why” (problem statement, business impact).
   - The “what” (user-visible adjustments).
   - The “how” (architecture, files touched, migrations).
   - Verification (automated + manual).
   - The changelog blurb (one or two sentences).
3. Save the result to `.documents/prs/PR-<ticket>-<sequence>-slug.md`:
   - `<ticket>` = 4-digit ticket ID from the linked ticket/plan (e.g., `1001`).
   - `<sequence>` = two-digit counter (`01`, `02`, …) showing which PR iteration this work represents for that ticket.
   - `slug` = kebab-case from the PR title, ≤ 7 words.
   - Example filename: `.documents/prs/PR-1001-02-hero-copy-project-filters.md`.
4. Add a front-matter block if useful (date, branch, status).
5. Update `.documents/prs/.latest` with the repository-relative path so other commands can find the most recent description quickly.

---

## Step 6 – Sync with GitHub & Docs

1. Optional but recommended: `gh pr edit <number> --body-file .documents/prs/PR-0123-hero-copy-project-filters.md`.
2. If `gh` isn’t configured, copy/paste the markdown into the GitHub PR body manually.
3. Ensure `.documents/CHANGELOG.md` already reflects the “Description for the changelog” section; PR descriptions can link to that entry.
4. Mention any unchecked verification steps in the PR body so reviewers know what remains.

---

## Guardrails

- Do not duplicate entire PR bodies inside `.documents/CHANGELOG.md`; keep changelog entries concise.
- Keep PR descriptions under version control so future debugging can reference them.
- Skip Web tools automatically when `network_access` is restricted—use local diffs and docs.
- If you discover scope drift or missing plan steps, pause and open/adjust a plan or ticket before finalizing the PR summary.
