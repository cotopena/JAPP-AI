---
id: TICKET-1002
title: Harden Chat Reliability and Mobile Readability
type: Chore
priority: P1
risk_level: medium
status: current
owner: unassigned
created: 2026-02-20
plan_blockers: []
plan_path: .documents/.plans/current_plan/PLAN-1002-harden-chat-reliability-mobile-readability-2026-02-20.md
labels: [area/chat-reliability, component/chat-shell, breaking-change:no]
---

# Summary
Improve chat reliability and mobile readability so recruiters can complete question-and-answer flows without dead ends, lost session context, or unclear recovery steps.

## Plan Reference
- `.documents/.plans/current_plan/PLAN-1002-harden-chat-reliability-mobile-readability-2026-02-20.md`

## Problem / Goal
- Recruiters and hiring managers using the public chat experience
- Happens in chat UI state handling and `/api/chat` persistence flow
- Reliability gaps can block conversion during first-pass evaluation

## Scope (In)
- Improve empty, loading, error, and retry behavior in chat UI
- Add explicit retry action for failed assistant responses
- Validate session continuity across refresh in the current browser
- Confirm user and assistant messages persist for the same session
- Improve long-response readability and mobile spacing/tap targets
- Run manual mobile QA pass for layout and interaction clarity

## Out of Scope
- New schema, index, or table changes in Convex
- Abuse prevention/rate-limiting work for public endpoints
- Prompt/content strategy rewrites unrelated to reliability
- Admin/CMS editing workflows and analytics instrumentation

## Context Pointers
- `.documents/tasks-ai-portfolio.md:60` — Day 2 reliability hardening target
- `.documents/tasks-ai-portfolio.md:74-78` — required chat UX reliability deliverables
- `.documents/design-ux-ui.md:66-74` — conversation loading/error/readability expectations
- `src/app/page.tsx:100-119` — `useChat` state wiring and send behavior
- `src/app/page.tsx:211-217` — empty conversation state copy
- `src/app/page.tsx:246-251` — loading indicator while response streams
- `src/app/page.tsx:254-287` — input/footer and inline error rendering
- `src/app/api/chat/route.ts:105-125` — request parsing and user-message persistence
- `src/app/api/chat/route.ts:133-149` — assistant-message persistence on stream finish
- `convex/chat.ts:29-84` — idempotent message save and session history retrieval

## Acceptance Criteria (testable)
- **Scenario:** Empty send guard
  - **Verification:** Manual
  - **Given** the chat input is blank or whitespace-only
  - **When** the user presses `Send`
  - **Then** no network request is made and no message is appended
- **Scenario:** Loading and disabled input state
  - **Verification:** Manual
  - **Given** a valid user question is submitted
  - **When** the assistant response is pending
  - **Then** loading UI is visible and duplicate sends are blocked until completion
- **Scenario:** Error recovery with retry
  - **Verification:** Manual
  - **Given** the chat request fails with an API/network error
  - **When** the user activates the retry control
  - **Then** the failed prompt is re-submitted once and error state clears on success
- **Scenario:** Session continuity across refresh
  - **Verification:** Manual
  - **Given** at least one successful conversation turn exists in a browser session
  - **When** the page is refreshed in the same browser
  - **Then** the same `sessionId` is reused and prior messages rehydrate in order
- **Scenario:** Persistence of both chat roles
  - **Verification:** Automated
  - **Given** one successful user prompt/assistant response cycle
  - **When** querying `chat:getMessagesBySession` for that `sessionId`
  - **Then** stored results include both `user` and `assistant` roles with non-empty text
- **Scenario:** Mobile readability and tap targets
  - **Verification:** Manual
  - **Given** viewport widths of 390px and 360px
  - **When** viewing long assistant responses and interacting with quick prompts/input
  - **Then** text remains readable, controls are not clipped, and taps are reliable

## Deliverables
- [ ] Code updated in `src/app/page.tsx` and `src/app/api/chat/route.ts`
- [ ] JavaScript interaction/data logic updated (if applicable)
- [ ] Docs updated (`.documents/CHANGELOG.md`)
- [ ] Telemetry/metrics/alerts defined

## Verification Commands
- [ ] bash workflow/scripts/lint-prompts.sh (if docs/prompts changed)
- [ ] npm run lint
- [ ] npm run build
- [ ] npm run dev:all
- [ ] npx convex run chat:getMessagesBySession '{"sessionId":"<manual-test-session-id>"}'
- [ ] Manual: failure simulation + retry path + mobile pass (390px/360px)

## Non-Functional Requirements
- Performance/SLO: no duplicate message inserts for a single retry action
- Security/Privacy constraints: no new persisted PII beyond existing chat/session fields
- Backward compatibility / migration: preserve existing Convex schema and indexes

## Access Semantics (permissions/integrations tickets only)
- Unauthenticated behavior: public chat access remains unchanged
- Authenticated but unauthorized behavior: not applicable (no role model in scope)
- Not-found behavior (404) only when explicitly intended: unchanged

## Dependencies & Impact
- Services/flags/env vars affected: `OPENAI_API_KEY`, `OPENAI_MODEL`, Convex deployment
- Integration requirements: `useChat` client state and `/api/chat` persistence must stay aligned
- Routing/navigation dependencies: none; single-page chat flow only
- Data model/tables touched: `conversations` and `messages` records only
- Rollout/rollback considerations: deploy incrementally; rollback via commit revert

## Decisions (resolved)
- Retry control will be inline with the existing footer error region
- Session identity continues using `ai-portfolio-session-id` local storage key
- No schema or API contract changes in `convex/schema.ts`
- Reliability and mobile polish are completed together in this ticket

## Open Questions (keep ≤ 4)
- None.

## Assumptions (keep ≤ 4)
- Convex and OpenAI credentials are available in local and deploy environments
- Existing `useChat` flow can support deterministic retry from current UI state
- Manual mobile validation can be run via browser responsive mode

## Definition of Done
- [ ] All Acceptance Criteria pass
- [ ] Unit/Integration tests added/updated
- [ ] Lint/typecheck/CI green
- [ ] Deployed behind flag if risky
- [ ] Post-deploy verification documented
