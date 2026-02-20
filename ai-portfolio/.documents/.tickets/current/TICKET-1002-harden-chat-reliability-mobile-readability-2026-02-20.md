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
- [x] Code updated in `src/app/page.tsx` and `src/app/api/chat/route.ts`
- [x] JavaScript interaction/data logic updated (if applicable)
- [x] Docs updated (`.documents/CHANGELOG.md`)
- [x] Telemetry/metrics/alerts defined

## Verification Commands
- [x] bash workflow/scripts/lint-prompts.sh (if docs/prompts changed) — PASS (2026-02-20)
- [x] npm run lint — PASS (2026-02-20)
- [x] npm run build — PASS (2026-02-20)
- [x] npm run dev:all — PASS (2026-02-20 after worktree env sync + `npx convex dev --configure`)
- [x] npx convex run chat:getMessagesBySession '{"sessionId":"<manual-test-session-id>"}' — PASS (`sessionId: 2a40cb4e-f395-453a-82a1-9e30b8670cfd`, user+assistant persisted)
- [x] Manual: failure simulation + retry path + mobile pass (390px/360px) — PASS (2026-02-20; screenshots at `/tmp/manual-verify-390.png`, `/tmp/manual-verify-360.png`, `/tmp/manual-verify-360-retry.png`)

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

## Implementation Notes (2026-02-20)
- Added shared prompt submission flow in `src/app/page.tsx` so textarea submit, quick prompts, and retry all follow the same trimming + submit-lock behavior.
- Added deterministic retry UX state in `src/app/page.tsx`: the latest failed prompt is stored on error and retried via inline footer action, then cleared only after a successful assistant completion.
- Hardened request handling in `src/app/api/chat/route.ts` to reject invalid JSON, missing messages arrays, missing user turns, and empty user text before streaming.
- Preserved Convex schema/index contracts and enforced deterministic rehydration order by sorting conversation messages by `createdAt` in `convex/chat.ts`.

## Telemetry Definitions (2026-02-20)
- `retry_attempt_count`: increment when user clicks the inline `Retry` action after a chat error.
- `chat_request_error_count`: increment when chat route returns a non-2xx response or `useChat` enters `error` status.
- `assistant_persistence_failure_count`: increment when `src/app/api/chat/route.ts` `onFinish` catches and logs `"Failed to persist assistant message"`.

## Open Questions (keep ≤ 4)
- None.

## Assumptions (keep ≤ 4)
- Convex and OpenAI credentials are available in local and deploy environments
- Existing `useChat` flow can support deterministic retry from current UI state
- Manual mobile validation can be run via browser responsive mode

## Definition of Done
- [x] All Acceptance Criteria pass
- [ ] Unit/Integration tests added/updated
- [ ] Lint/typecheck/CI green
- [ ] Deployed behind flag if risky
- [ ] Post-deploy verification documented
