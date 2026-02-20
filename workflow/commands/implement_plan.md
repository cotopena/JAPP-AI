---
description: Execute validated plans with continuous verification and communication
model: codex-high
---

# Implement Plan

You translate validated plans into working code for the active portfolio project (`career-portfolio` static site or `ai-portfolio` Next.js app). Follow the approved plan step-by-step, communicate progress, and keep artifacts tidy.

## Before You Run
- Re-read `workflow/README.md` so you follow the documented workflow from plan recap → manual verification → commit and know where supporting assets live.
- Inspect `workflow/tooling.config.json` to confirm the validated plan directory (`.documents/.plans/current_plan/`), ticket roots, and the tool priority (e.g., `rg` before `grep`).
- Example Codex CLI prompt: `Run workflow/commands/implement_plan.md to implement .documents/.plans/current_plan/PLAN-2001-refresh-hero-and-project-flow-2026-02-19.md.`

## Initial Response

When invoked:
1. Confirm you have the validated plan path (`.documents/.plans/current_plan/PLAN-####-slug.md`) and linked ticket.
2. Reply with:
```
I'll implement PLAN-####-slug.md. Let me restate the scope and checks before coding.
```

---

## Step 1 – Reconfirm Scope & Refresh Research

1. Read the plan and ticket fully.
2. Re-open any referenced files (`index.html`, `styles.css`, `script.js`) so you know their current state.
3. Re-run targeted research tasks if anything is unfamiliar (e.g., use `codebase-locator` to rediscover section flow or interaction handlers).
4. Summarize to the user:
```
Plan: PLAN-2001-refresh-hero-and-project-flow.md
Phases:
- Phase 1 – update structure/content in `index.html`
- Phase 2 – update styling behavior in `styles.css`
- Phase 3 – update interaction logic in `script.js`
Acceptance criteria: project checks + manual browser flow.
Questions: [...]
```
Resolve open questions before editing files.

---

## Step 2 – Execute Phase by Phase

For each plan phase:
1. **Restate the phase goal** and files to touch.
2. **Implement work in small commits** (if allowed) keeping edits scoped to `index.html`, `styles.css`, `script.js`, or docs.
3. **Run required commands early/often**, e.g.:
   - `bash workflow/scripts/lint-prompts.sh` (if workflow docs changed)
   - `python3 -m http.server 8080` (for local browser verification)
4. **Document decisions**: if you deviate from the plan (for example, a different interaction approach), update the plan file or ticket with rationale.
5. **Share interim summaries** (diff highlights, new questions) before moving to the next phase.
6. **Always run automated verifications** listed in the plan unless impossible; provision throwaway resources as needed and clean them up.

---

## Step 3 – Automated Verification Before Manual Checks

1. Run every automated check from the plan’s acceptance criteria (lint, build, any required scripts).
2. Share status with the user:
```
Phase 1 – Complete ✅ (structure/content updates)
Phase 2 – Complete ✅ (style/interaction updates)
Checks: prompt lint ✅ | local server ✅ | manual flow ✅
```
3. Update the plan file checkboxes for each **automated** criterion with PASS/FAIL/BLOCKED and a brief reason.

Manual verification is handled in a separate session via `manual_verification.md`.

---

## Step 4 – Handoff & Documentation

1. Follow `workflow/commands/commit.md` to package work (explicit commit plan + changelog) **after** manual verification passes.
2. Update the plan file:
   - Mark phase checkboxes complete.
   - Add notes about deviations or follow-ups.
   - Ensure automated verification results are recorded (PASS/FAIL/BLOCKED with a short summary) next to each checklist item.
3. Update the ticket with:
   - Commit hashes / PR links (once available).
   - Validation evidence (commands run).
   - Outstanding items (if any).

---

## Guardrails & Best Practices

- Keep changes tightly scoped; large refactors need a new plan.
- Never modify production credentials or third-party integration settings without explicit instruction.
- Document any new permissions, external dependencies, or browser requirements.
- Log content/data migrations so they can be reproduced.
- Ask for guidance as soon as you hit unexpected files or discrepancies versus the plan.
- Leave breadcrumbs (inline comments or docs) when touching non-obvious flows.
