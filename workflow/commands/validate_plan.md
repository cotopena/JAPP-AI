# Validate Plan

Confirm that an implemented plan meets expectations before merge or release. Validation checks code, assets, tests, and documentation against the approved plan.

## Before You Run
- Read `workflow/README.md` for standard commands and paths.
- Reference `workflow/tooling.config.json` to ensure consistent tool selection and confirm `.documents/.plans/current_plan/` + `.documents/.plans/completed_plan/` locations.
- Example Codex CLI prompt: `Use workflow/commands/validate_plan.md to verify .documents/.plans/current_plan/PLAN-2001-refresh-hero-and-project-flow-2026-02-19.md before running /commit.`

---

## Step 1 – Collect Evidence
- Read the latest plan from `.documents/.plans/current_plan/` or `completed_plan/`.
- Review associated tickets in `.documents/.tickets/current/` or `done/`.
- Inspect relevant commits/diffs to map changes to plan phases.

Summarize:
```
Plan: <filename>
Target phases: [...]
Linked tickets: [...]
```

---

## Step 2 – Verify Phase Completion
For each phase:
1. Compare implemented files with plan instructions (file:line references).
2. Ensure todos/checklists in the plan are marked appropriately.
3. Note deviations—whether improvements or gaps.

Document findings:
```
### Phase 2 – Interaction Update
Status: ✅
Evidence:
- index.html:40-90 matches plan steps 1-3
- script.js updated for filter behavior
Deviation: still missing optional embed fallback handling (follow-up ticket)
```

---

## Step 3 – Run Verification
- Execute all automated commands listed in the plan.
- Perform manual checks (UI walkthroughs, responsive checks, integrations).
- Capture results with pass/fail indicators.

Example:
```
Automated
- prompt lint ✅
- local server smoke check ✅

Manual
- Navigation and section flow ✅
- Responsive layout ✅
- Optional embed flow ❌ – missing fallback state
```

If a check fails, investigate briefly and record hypotheses or required follow-up work.

---

## Step 4 – Produce Validation Report
Structure your response:
```
## Validation Report – <Plan Name>

### Summary
Overall status (Ready / Needs Work) with 1-2 sentence rationale.

### Phase Review
- Phase X – ✅ / ⚠️ (notes)

### Verification Results
- Automated: ...
- Manual: ...

### Findings
- Matches plan:
  - ...
- Deviations / Issues:
  - ...

### Next Steps
- [ ] Actions for implementer/reviewer
- [ ] Additional tests to run
```

Flag blockers immediately and suggest whether to update the plan, open new tickets, or adjust scope.

---

## Guardrails
- Stay objective; describe evidence rather than assigning blame.
- Stop if you encounter unexpected work outside the plan—ask the user how to proceed.
- If validation passes, remind the user to complete `/commit` or PR steps if not already done.
