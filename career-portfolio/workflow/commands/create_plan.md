---
description: Create detailed implementation plans through interactive research and iteration
model: codex-high
---

# Implementation Plan

You produce high-fidelity implementation plans for the Career Portfolio system (static HTML + CSS + JavaScript). Plans must be research-driven, collaborative, and specific enough for execution agents to follow without guessing.

## Before You Run
- Review `workflow/README.md` for the workspace layout, CLI vs IDE guidance, and the end-to-end ticket → plan → implementation workflow.
- Open `workflow/tooling.config.json` to confirm the `.documents/.tickets/` and `.documents/.plans/pending/` roots plus the search/read fallbacks available in your environment.
- Example Codex CLI prompt: `Use workflow/commands/create_plan.md with .documents/.tickets/current/TICKET-2001-refresh-hero-and-project-flow-2026-02-19.md and save the plan to .documents/.plans/pending/.`

## Initial Response

When invoked:

1. **Check for parameters** (ticket/plan path). If provided, immediately read the referenced file(s) in full and start Step 1.
2. **If no parameters**, respond with:
```
I'll help you create a detailed implementation plan. Please share:
1. The ticket description or `.documents/.tickets/...` path
2. Relevant context or constraints
3. Links to research/previous plans (if any)
```
Then wait for input.

---

## Step 1 – Context Gathering & Initial Analysis

1. **Read every mentioned file completely** (no partial reads):
   - Tickets in `.documents/.tickets/current/`
   - Supporting docs (`task-board.md`, `plan.md`, `.documents/business-model.md`, `techstack-decisions.md`)
   - If `.documents/business-model.md` is missing, proceed without it (do not block planning)
   - Any config or support files cited in the ticket (integration config, environment notes, etc.)
2. **Extract ticket frontmatter controls**:
   - Read `risk_level` (`low|medium|high`) from the ticket. If missing, treat as `medium` and note the assumption.
   - Read `plan_blockers`. If non-empty, fail fast and stop planning.
   - Fail-fast response format:
```
Planning blocked by ticket plan_blockers:
- <blocker 1>
- <blocker 2>
Resolve blockers in the ticket before running create_plan.md.
```
3. **Spawn initial research tasks** (before asking questions):
   - Spawn the child agent `workflow/agents/codebase-locator.md` to map relevant files under `index.html`, `styles.css`, and `script.js`.
   - Spawn the child agent `workflow/agents/codebase-analyzer.md` to describe current structure, interaction flows, and content/data handling touchpoints.
   - Spawn the child agent `workflow/agents/codebase-pattern-finder.md` to surface similar implementations (e.g., existing section reveals, timeline cards, filter patterns).
   - If child agents are unavailable, stop and report: `child agents unavailable`.
4. **Read the files those agents cite** in full so you personally understand the current behavior.
5. **Create a TodoWrite list** summarizing research tasks (e.g., “Trace section layout in index.html”, “Review interaction handlers in script.js”). Update statuses as you complete each read.
6. **Synthesize understanding & questions** to the user:
```
Based on ticket <ID> and current research, we need to …
Findings:
- index.html:line … (explain)
- script.js:line … (explain)
Questions:
- …
```
Only ask about items you cannot resolve via code inspection.

---

## Step 2 – Deeper Research & Option Framing

1. When the user answers clarifications, **verify** by re-reading cited files or spawning additional locator/analyzer tasks.
2. **Expand TodoWrite** with any new research threads and keep it updated.
3. **Spawn focused sub-tasks** as needed (examples):
   - “Find all project filtering logic” (locator/analyzer).
   - “Locate navigation and section state handling.”
   - “Find integration points (forms, embeds, analytics) if present.”
4. **Wait for all tasks to finish** before synthesizing.
5. Present the current-state summary + design options:
```
Current State:
- …
- …

Design Options:
1. Option A – description
   Pros: …
   Cons: …
2. Option B – description
   Pros: …
   Cons: …

Recommendation: …
Open Questions: …
```
Confirm the chosen approach with the user before drafting the plan.

---

## Step 3 – Plan Structure Alignment

1. Propose a structure:
```
## Overview
<1–2 sentences>

## Phases
1. Phase name – outcome
2. Phase name – outcome
3. …
```
2. Get approval/edits (order, grouping, scope) before writing details.

---

## Step 4 – Write the Detailed Plan

1. **Filename & location**: `.documents/.plans/pending/PLAN-####-short-slug-YYYY-MM-DD.md` (use ticket ID number when available).
2. **Depth by ticket risk level**:
   - `low`: 1–2 focused phases, minimal rollout complexity.
   - `medium`: 2–4 phases with explicit integration and verification coverage.
   - `high`: include dedicated risk-mitigation/rollback planning and expanded security/migration validation.
3. **Template** (fill every section):

````markdown
# [Feature/Task Name] Implementation Plan

## Overview
[Brief purpose + value]

## Current State Analysis
- index.html:line – existing behavior
- styles.css – current layout, spacing, typography, and responsive behavior
- script.js – current interaction and data-flow logic

## Desired End State
- Functional outcome
- Data/content expectations
- Integration expectations (contact forms, embeds, analytics, etc.)

### Key Discoveries
- [Finding + file:line]
- …

## What We're NOT Doing
- Explicitly list anything deferred/out-of-scope

## Implementation Approach
- High-level strategy tied to chosen option

## Phase 1 – [Name]
### Goal
[Why this phase exists]
### Implementation Steps
1. `index.html` – description
2. `styles.css` – description
3. `script.js` – description
### Acceptance Criteria
#### Automated
- [ ] `bash workflow/scripts/lint-prompts.sh` (if prompt docs changed)
- [ ] Any project-specific automated check (if available)
- [ ] `python3 -m http.server 8080` starts cleanly
#### Manual
- [ ] Verify core page flows (hero, timeline, filters, navigation)
- [ ] Verify responsive behavior at desktop/tablet/mobile sizes
- [ ] Verify any integrations (contact links, embeds) in scope
### Assets/Docs
- `.documents/...` references, external templates, etc.

## Phase 2 – …
[repeat structure]

## Testing Strategy
- File-level: which files are touched (`index.html`, `styles.css`, `script.js`)
- Interaction sequence: load ➜ navigate ➜ interact ➜ validate
- Manual checklist

## Performance / Security / Migration Notes
- Accessibility, performance, and browser compatibility notes
- Any content migration or external dependency changes

## References
- Ticket path, related research docs, similar code examples.
````

4. Include TodoWrite references or checklists when useful (“TodoWrite Task X tracks backfill steps”).
5. Make sure no open questions remain and no unresolved `plan_blockers` exist; otherwise pause and get answers.

---

## Step 5 – Review & Hand-off

1. Share the plan path and highlight anything needing approval.
2. Once approved, move the file to `.documents/.plans/current_plan/` (per your workflow) and update the ticket with the plan location.
3. Keep TodoWrite list updated or close it out when planning finishes.

---

## Ongoing Guidelines

- **Be skeptical**: verify assumptions against actual HTML structure, CSS behavior, and JavaScript logic.
- **Be interactive**: pause for user feedback after summaries, options, and structure proposals.
- **Be thorough**: cite file:line references for every claim; tie acceptance criteria to real commands.
- **Be practical**: focus on incremental phases, roll-forward migrations, and clear rollback/guardrails.
- **Track progress**: TodoWrite is mandatory for research; keep statuses accurate.
- **Fail fast on blockers**: do not draft a plan while ticket `plan_blockers` is non-empty.
- **No unresolved questions** in the final plan—plans are execution-ready documents.
