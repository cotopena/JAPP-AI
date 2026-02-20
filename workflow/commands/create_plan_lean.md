---
description: Create a lean implementation plan for small, low-risk changes
model: codex-high
---

# Implementation Plan (Lean)

Use this prompt when the work is small, low-risk, or isolated (for example UI copy tweaks, a single interaction update in `script.js`, or a small layout adjustment in `index.html`). The goal is a clear, executable plan with minimal context consumption.

## When to Use
- Frontend-only changes.
- No new data model changes.
- The ticket provides clear file pointers or an obvious entry point.

If the task spans multiple systems or has unclear scope, stop and recommend switching to `workflow/commands/create_plan.md`, briefly stating why.

## Initial Response
1. If a ticket/plan path is provided, read the ticket in full and start Step 1.
2. If no parameters are provided, request:
```
Share:
1. Ticket path or description
2. Constraints (if any)
3. Any known file pointers
```

## Step 1 - Minimal Context Pass
- Read the ticket and only the files explicitly referenced there.
- If no file pointers exist, find the smallest entry point (1-3 files) using a quick search.
- Do not read broad research docs or run multi-agent discovery tasks.
- Capture only the minimum current-state facts needed for implementation.

## Step 2 - Clarify (Only If Needed)
- Ask up to 3 short questions to resolve missing requirements.
- If answers are not required to proceed, state assumptions and continue.

## Step 3 - Draft the Plan
- Write the plan to:
  `.documents/.plans/pending/PLAN-####-short-slug-YYYY-MM-DD.md`
- Keep the plan concise and avoid large templates.
- Cite file:line references only for files you actually read.
- Do not inline code.
- Propose concrete automated and manual verification steps based on available scripts (for example `bash workflow/scripts/lint-prompts.sh`, `python3 -m http.server 8080`).

### Lean Template
````markdown
# [Feature/Task Name] Implementation Plan (Lean)

## Overview
[1-2 sentences]

## Current State (Key References)
- `path:line` - [what exists today]

## Desired End State
- [what should be true after]

## Scope
### In
- [...]
### Out
- [...]

## Implementation Steps
1. `path` - [change]
2. `path` - [change]

## Testing
- Automated: [specific command(s) or test file(s)]
- Manual: [short scenario with expected outcome]

## Risks / Notes
- [any risk, assumption, or follow-up]

## References
- Ticket path
- Any key files
````

## Guidelines
- Keep plans under ~1 page.
- Skip "options" and "phase" sections unless the ticket truly needs it.
- Favor precise steps over comprehensive coverage.
- Always include at least one automated and one manual verification step; note assumptions if scripts are unclear.
