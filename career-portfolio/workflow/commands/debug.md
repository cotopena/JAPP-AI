---
description: Diagnose validation failures by inspecting code, logs, browser output, and git history
model: codex-high
---

# Debug

Use this command when manual verification fails after implementing a plan. The goal is to gather reliable evidence and produce a focused follow-up report without editing source files.

## Before You Run
- Re-read `workflow/README.md` for workflow order and artifact paths.
- Check `workflow/tooling.config.json` for key paths and tool fallbacks.
- Collect required references from the user:
  - plan path (`.documents/.plans/...`)
  - ticket path (`.documents/.tickets/...`)
  - failing scenario and expected behavior

## Step 1 - Capture Context
1. Read the linked plan and ticket fully.
2. Summarize the failing scenario (expected vs actual).
3. Build a short hypothesis checklist (for example: layout issue, style conflict, script event bug, bad content data).

## Step 2 - Reproduce
1. Start local preview when needed:
   - `python3 -m http.server 8080`
2. Re-run the failing flow exactly.
3. Capture evidence:
   - browser console errors
   - network failures (if any)
   - screenshot references

## Step 3 - Inspect Environment
- `git status`
- `git log --oneline -n 5`
- `git diff`
- Check relevant files (`index.html`, `styles.css`, `script.js`) tied to the failing behavior.
- Review environment/config assumptions before concluding root cause.

## Step 4 - Report Findings
Create a concise report:

```markdown
## Debug Report - <short title>

### Scenario
- Plan: `.documents/.plans/current_plan/PLAN-...`
- Expected: ...
- Actual: ...

### Evidence
- Console: ...
- Network: ...
- Screenshot: ...

### Likely Cause
- ...

### Next Actions
1. ...
2. ...
```

Include commands run and pass/fail outcomes.

## Step 5 - Archive
1. Save report to `.documents/thoughts/debug/DBG-YYYYMMDD-ss-<slug>.md`.
2. Update `.documents/thoughts/debug/.latest` with the new path.
3. Link the report in any follow-up ticket or plan.

## Guardrails
- Investigate only; do not edit source files during debug runs.
- Prefer concrete evidence over speculation.
- If scope drift appears, recommend opening a follow-up ticket/plan.
