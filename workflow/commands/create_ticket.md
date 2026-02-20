# create_ticket.md

You generate concise, engineer-ready tickets for the active portfolio repo (`career-portfolio` or `ai-portfolio`). Optimize for signal over volume with **clarity first**: tight scope, testable acceptance criteria, and minimal but useful links to code.

---

## **Objectives**

* Produce a **short, specific, testable** ticket that a senior engineer can pick up.  
* **Minimize context size**: point to code by `path:line[-line]` instead of pasting large snippets.  
* Maximize **clarity** so decisions, scope, and risks are easy to understand.  
* Prioritize **accuracy and execution readiness** over aggressive compression.  
* Save the ticket under `.documents/.tickets/` using the **exact naming logic** below.  
* Keep tickets aligned with the product context (`task-board.md`, `plan.md`, `.documents/business-model.md`, `techstack-decisions.md`).

---

## Before You Run
- Read `workflow/README.md` to align on tool priorities and repo paths.
- Consult `workflow/tooling.config.json` for Search/Read/Glob fallbacks and the `.documents/.tickets/` directory map.
- Example Codex CLI prompt: `Follow workflow/commands/create_ticket.md to draft a ticket for improving project-card filtering and save it to .documents/.tickets/current/.`

---

## **Input Sources (read minimally)**

1. The user’s request in this conversation.
2. `task-board.md` for the next priority items.
3. `plan.md` for the project north star and scope alignment.
4. `.documents/business-model.md` for business constraints (context only).
5. `techstack-decisions.md` for stack constraints.
6. Any filenames the user explicitly mentions.
7. (Optional) `.documents/research/` notes — use only to discover **paths** to relevant modules; do **not** inline their content.

If `.documents/business-model.md` is missing, proceed without it (do not block ticket creation).

**Hard budget:** keep the final ticket ≤ **2000 tokens**. No code block > **15 lines**.

---

## **File Naming & ID Logic (must follow exactly)**

* **Ticket ID:** `TICKET-####`  
  * Read/initialize `.documents/.tickets/.counter` (text file with the last used integer).  
  * If present, **new_id = last + 1**. If missing, **start at 1001**. Write back the new value.  
* **Slug:** kebab-case from the ticket title, ≤ **7 words**, only `[a-z0-9-]`, drop stopwords when possible.  
* **Filename:** `TICKET-####-slug-YYYY-MM-DD.md` (e.g., `TICKET-1452-improve-project-filtering-2026-02-19.md`)  
* **Directory:**  
  * Default: `.documents/.tickets/current/` (ready for planning)  
  * Drafts: `.documents/.tickets/new/` (use when the user says it’s not ready)  
* After saving, **also** write/update `.documents/.tickets/.latest` with the **repository-relative path** to the created file (one line).

This ensures `create_plan.md` can reference the active ticket quickly.

---

## **Process**

1. **Classify & compress**  
   * Classify as **Feature | Bug | Chore | Spike**.  
   * Draft a title that states outcome, not implementation (≤ 10 words).  
2. **Gather minimal context**  
   * Identify **where** in the system (`index.html`, `styles.css`, `script.js`, and any integration points).  
   * Record up to **10** `path:line[-line]` pointers. No large quotes.  
3. **Draft the ticket using the template below**  
   * Prefer concise bullets; use ≤ 12 words as a guideline, not a hard cap.  
   * Acceptance Criteria in **Given/When/Then**. 3–7 scenarios max.  
4. **Validate constraints**  
   * Scope is tight; out-of-scope listed.  
   * Acceptance Criteria are **deterministic** and **verifiable**.  
   * Set `risk_level` (`low|medium|high`) based on blast radius and complexity.  
   * Set `plan_blockers` to `[]` when none; otherwise list unresolved blockers.  
   * Keep all approved technical detail; restructure for compliance without deleting substance.  
5. **Save with naming logic** to the correct folder and update `.latest` (repo-relative). If saved in `current/`, set `status: current`.  
6. **Return** a one-line confirmation first:  
   * `Created: .documents/.tickets/<status>/TICKET-####-slug-YYYY-MM-DD.md`
7. **If `Open Questions` is not `None`**, immediately provide an **Open-Question Decision Brief** in plain language:
   * Include **all** open questions from the ticket.
   * For each question, explain in layman's terms:
     * What the question means.
     * Why it matters.
     * **3 to 4 options**.
     * Pros and cons for each option.
     * Recommended option and why.
   * Avoid jargon; if technical terms are necessary, define them simply.

---

## **Complexity Mode**

Use the simplest mode that preserves accuracy:

* **Simple mode:** low-risk, small-scope changes. Keep sections concise and minimal.  
* **Complex/Integration mode:** use expanded detail in `Decisions`, `Dependencies & Impact`, and acceptance criteria signals. Never compress away security, integration, migration, or rollout specifics.

---

## **Plan Handoff Readiness (required)**

Before finalizing the ticket, confirm all of the following:

* `Open Questions` is resolved, or each question has an owner + unblock criteria.  
* Context pointers include all touched surfaces (as applicable): `index.html`, `styles.css`, `script.js`, docs.  
* `Dependencies & Impact` clearly states integrations, route/navigation impacts, and data/content impacts when in scope.  
* Rollout and rollback notes are concrete enough for execution.  
* `plan_blockers` is empty before moving to planning; if non-empty, planning must fail fast.  
* Ticket contains enough decisions/constraints that `create_plan.md` can proceed without guesswork.

---

## **Open-Question Decision Brief Format (required when open questions exist)**

Use this exact structure in plain language:

`Question: <open question from ticket>`  
`What this means (simple): <plain-language explanation>`  
`Why this matters: <business/risk impact in simple terms>`  
`Option 1: <name>`  
`Pros: ...`  
`Cons: ...`  
`Option 2: <name>`  
`Pros: ...`  
`Cons: ...`  
`Option 3: <name>`  
`Pros: ...`  
`Cons: ...`  
`Option 4: <name> (optional)`  
`Pros: ...`  
`Cons: ...`  
`Recommendation: <option>`  
`Why this recommendation: <plain-language reason>`

---

## **Ticket Template (use exactly this structure)**

`---`  
`id: TICKET-####            # replace with assigned id`  
`title: <Short outcome-based title>`  
`type: Feature|Bug|Chore|Spike`  
`priority: P0|P1|P2|P3`  
`risk_level: low|medium|high`  
`status: draft|current|done`  
`owner: unassigned`  
`created: YYYY-MM-DD`  
`plan_blockers: []`  
`labels: [area/..., component/..., breaking-change:no]`  
`---`

`# Summary`  
`1–2 sentences explaining the goal and who benefits (≤ 280 chars).`

`## Problem / Goal`  
`- Who is impacted`  
`- Where it happens (module/service)`  
`- Why this matters now`

`## Scope (In)`  
`- Concrete items to deliver (3–7 bullets)`

`## Out of Scope`  
`- Items explicitly excluded (2–6 bullets)`

`## Context Pointers`  
``- `path/to/file.ext:123-160` — reason/behavior to change``  
``- `path/to/other.ts:45` — related validator``  
``- `script.js:20-44` — data model reference``  
`<!-- max 10 pointers; do not inline code -->`

`## Acceptance Criteria (testable)`  
`- **Scenario:** brief name`  
  `- **Verification:** Automated|Manual`  
  `- **Given** current state`  
  `- **When** action occurs`  
  `- **Then** observable outcome (status/data/UI + concrete signal)`  
`- **Scenario:** error/edge case`  
  `- **Verification:** Automated|Manual`  
  `- **Given** …`  
  `- **When** …`  
  `- **Then** …`

`## Deliverables`  
`- [ ] Code updated in <module(s)>`  
`- [ ] JavaScript interaction/data logic updated (if applicable)`  
`- [ ] Docs updated (<doc path>)`  
`- [ ] Telemetry/metrics/alerts defined`

`## Verification Commands`  
`- [ ] bash workflow/scripts/lint-prompts.sh (if docs/prompts changed)`  
`- [ ] python3 -m http.server 8080`  
`- [ ] <scope-specific command(s)>`  
`- [ ] <manual verification note(s)>`

`## Non-Functional Requirements`  
`- Performance/SLO: e.g., p95 < 300ms`  
`- Security/Privacy constraints`  
`- Backward compatibility / migration`

`## Access Semantics (permissions/integrations tickets only)`  
`- Unauthenticated behavior (e.g., redirect to sign-in or 401)`  
`- Authenticated but unauthorized behavior (normally 403)`  
`- Not-found behavior (404) only when explicitly intended`

`## Dependencies & Impact`  
`- Services/flags/env vars affected`  
`- Detail dependency bullets are allowed here for accuracy`  
`- Include integration requirements, routing/navigation dependencies, and provisioning details when applicable`  
`- Data model/tables touched`  
`- Detail impact bullets are allowed here for accuracy`  
`- Rollout/rollback considerations`

`## Decisions (resolved)`  
`- Approved decisions that constrain implementation (keep concise, specific)`  

`## Open Questions (keep ≤ 4)`  
`- Short, decision-seeking questions only`

`## Assumptions (keep ≤ 4)`  
`- Preconditions believed true that affect scope`

`## Definition of Done`  
`- [ ] All Acceptance Criteria pass`  
`- [ ] Unit/Integration tests added/updated`  
`- [ ] Lint/typecheck/CI green`  
`- [ ] Deployed behind flag if risky`  
`- [ ] Post-deploy verification documented`

---

## **Style & Brevity Rules**

* Prefer **bullets**; avoid paragraphs longer than 3 lines.  
* Replace prose with **checklists** where possible.  
* **No** screenshots, stack traces, or logs; link a file pointer instead.  
* Use **precise nouns** and **observable outcomes** (status codes, field names).  
* Avoid “should/may”; use **MUST** outcomes in Acceptance Criteria.
* Prioritize clarity: a non-expert reader should understand the decision path.
* Accuracy beats brevity when they conflict.  
* Do not remove approved detail while reformatting to template.  

---

## **Example (abbreviated)**

Title: “Improve project filtering and timeline navigation”

* **Type:** Feature, **Priority:** P1  
* **Context Pointers:**  
  * `index.html:10-64` — project cards and filter controls  
  * `script.js:1-120` — filter + timeline interaction logic  
* **Acceptance Criteria:**  
  * Given a user on the projects section, when selecting a filter, then only matching cards remain visible.  
  * Given a user clears filters, when the page updates, then all project cards return in original order.

Saved as: `.documents/.tickets/current/TICKET-1452-improve-project-filtering-2026-02-03.md`

---

## **Example (complex integration ticket, abbreviated)**

Title: “Add embedded contact form with validation guardrails”

* **Type:** Feature, **Priority:** P1  
* **Dependencies & Impact:**  
  * External provider requirements, rate limits, and fallback behavior  
  * Data touched: form payload fields + consent flags  
* **Access Semantics:**  
  * Missing consent: block submission with inline error  
  * Provider unavailable: show retry message and fallback link  
* **Open Questions:**  
  * Should form submissions use email-only or an embedded provider from day one?  
  * What fallback should appear if the embedded provider is unavailable?

Saved as: `.documents/.tickets/current/TICKET-1453-embed-contact-form-validation-2026-02-03.md`

---

## **Handoff to Planning**

`workflow/commands/create_plan.md` will read the ticket in `.documents/.tickets/current/`. Ensure:

* The **frontmatter** contains `id: TICKET-####`.  
* Acceptance Criteria are complete and unambiguous.  
* Scope and Out-of-Scope prevent creep.
* `Decisions` and `Dependencies & Impact` provide enough constraints that plan generation requires no guessing.
* `risk_level` is set and `plan_blockers` is empty before planning starts.

---

## **Final Self-Check (must pass)**

Before finishing, verify:

* Template sections are present and in order.
* Scope and Out-of-Scope are tight and non-overlapping.
* Acceptance Criteria are observable and testable (with verification type).
* `Decisions` and `Open Questions` are consistent (no contradictions).
* `Dependencies & Impact` includes concrete, in-scope operational details.
* `Verification Commands` are practical and relevant.
* File naming/id logic and `.latest` update are correct.
* Ticket lints cleanly with `bash workflow/scripts/lint-ticket.sh <ticket-path>` (or default `.latest`).
* If open questions remain, Open-Question Decision Brief is provided in layman's terms with 3–4 options each.
* `risk_level` and `plan_blockers` are present and valid.
