# Harden Chat Reliability and Mobile Readability Implementation Plan

## Overview
Harden the recruiter-facing chat flow so failed responses are recoverable, session context survives refreshes, and long responses remain readable and tappable on small mobile viewports. Keep existing Convex schema/contracts intact while improving reliability behaviors in UI and chat route handling.

## Current State Analysis
- `src/app/page.tsx:35-44` creates/reuses `ai-portfolio-session-id` in `localStorage` and uses it as the chat identity key.
- `src/app/page.tsx:53-55` hydrates session history with `api.chat.getMessagesBySession` before rendering `ChatShell`.
- `src/app/page.tsx:100-119` wires `useChat` state and blocks sends while `status` is `submitted|streaming`.
- `src/app/page.tsx:211-217` shows empty conversation guidance copy when no messages are present.
- `src/app/page.tsx:246-251` renders the inline `"Generating response..."` loading indicator during streaming.
- `src/app/page.tsx:254-287` contains the footer form and inline error message region where retry controls must live.
- `src/app/api/chat/route.ts:105-111` parses request payloads and rejects empty message arrays.
- `src/app/api/chat/route.ts:115-125` persists the latest user message before streaming.
- `src/app/api/chat/route.ts:133-149` persists assistant text in `onFinish` and logs persistence failures.
- `convex/chat.ts:29-59` trims input, deduplicates by `messageId`, and inserts role-scoped messages.
- `convex/chat.ts:62-84` returns session message history for UI rehydration.
- `.documents/tasks-ai-portfolio.md:60` and `.documents/tasks-ai-portfolio.md:74-78` set Day 2 reliability + mobile readability as required scope.
- `.documents/design-ux-ui.md:66-74` defines expected conversation loading/error/readability behavior.

## Desired End State
- Chat send flow blocks empty/duplicate submits and always provides a deterministic retry path after recoverable failures.
- Same-browser refresh preserves `sessionId` and rehydrates user + assistant turns in order from Convex.
- Long assistant messages remain readable at 390px and 360px widths with reliable quick-prompt/input taps.
- Footer error region provides explicit recovery action without adding new backend schema/contracts.

### Key Discoveries
- Session continuity is already keyed by `localStorage` and can be strengthened without contract changes (`src/app/page.tsx:11`, `src/app/page.tsx:35-44`).
- Existing `useChat` status gating (`src/app/page.tsx:21-23`, `src/app/page.tsx:110-119`) provides a baseline for retry-safe UI state transitions.
- Assistant persistence already happens in route `onFinish` (`src/app/api/chat/route.ts:133-149`) and Convex dedupe protects against duplicate inserts (`convex/chat.ts:42-49`).
- Mobile layout already uses responsive wraps/padding (`src/app/page.tsx:121-123`, `src/app/page.tsx:176-192`, `src/app/page.tsx:254-277`), so this ticket is primarily a readability/tap-target polish pass.

## What We're NOT Doing
- No Convex schema/index/table changes.
- No public endpoint abuse prevention or rate limiting changes.
- No portfolio prompt/content strategy rewrite unrelated to reliability.
- No admin/CMS workflows or analytics instrumentation build-out.

## Implementation Approach
Use an incremental UI-first reliability pass in `src/app/page.tsx` to add deterministic retry behavior, explicit recovery affordances, and mobile readability polish while preserving existing design language. Keep `/api/chat` and `convex/chat.ts` contracts aligned and idempotent, then validate the full conversation lifecycle (send, fail, retry, refresh, rehydrate) with command-driven and manual QA.

## Phase 1 – Client Reliability State and Retry UX
### Goal
Guarantee predictable send behavior and explicit inline retry recovery in the chat footer without introducing duplicate submissions.

### Implementation Steps
1. `src/app/page.tsx` – Centralize message submission into a single helper used by both textarea submit and quick-prompt buttons so retry and disable semantics stay consistent.
2. `src/app/page.tsx` – Track the most recent failed user prompt in component state/ref and clear it only after a successful assistant completion.
3. `src/app/page.tsx` – Add an explicit `Retry` control in the existing footer error region (`src/app/page.tsx:282-286`) that resubmits the stored failed prompt once.
4. `src/app/page.tsx` – Preserve and verify current empty-input guard and `submitting` lock so no request is sent for blank/whitespace-only input.
5. `src/app/page.tsx` – Keep loading/disabled feedback synchronized across prompt chips, textarea, send button, and status badge.

### Acceptance Criteria
#### Automated
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run dev:all` starts both Convex + Next.js cleanly
- [ ] `bash workflow/scripts/lint-prompts.sh` (only if prompt/docs files are changed)

#### Manual
- [ ] Blank/whitespace send attempts do not create a request or append a message.
- [ ] While a response is pending, send controls are visibly disabled and duplicate sends are blocked.
- [ ] Failed request surfaces inline footer error with explicit retry action.
- [ ] Retry action re-submits the failed prompt once and clears error state on success.

### Assets/Docs
- `.documents/.tickets/current/TICKET-1002-harden-chat-reliability-mobile-readability-2026-02-20.md`
- `.documents/design-ux-ui.md`

## Phase 2 – API/Convex Persistence Alignment
### Goal
Ensure server persistence behavior remains deterministic for user and assistant roles across normal sends and retries.

### Implementation Steps
1. `src/app/api/chat/route.ts` – Confirm robust request parsing/guards for invalid or empty payloads and preserve stable `sessionId` usage from request body.
2. `src/app/api/chat/route.ts` – Keep latest user-message extraction/persistence deterministic so retry requests persist the intended user turn.
3. `src/app/api/chat/route.ts` – Preserve assistant save behavior in `onFinish`, including graceful error handling when persistence fails.
4. `convex/chat.ts` – Verify no schema/index changes are required and retain `messageId`-based dedupe for duplicate retry protection.
5. `convex/chat.ts` – Verify session history query still returns both roles as UI-compatible `UIMessage` objects.

### Acceptance Criteria
#### Automated
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npx convex run chat:getMessagesBySession '{"sessionId":"<manual-test-session-id>"}'` returns non-empty `user` and `assistant` messages after one successful turn

#### Manual
- [ ] Same-browser refresh reuses `ai-portfolio-session-id` and rehydrates prior turns in order.
- [ ] One successful prompt/response cycle persists both roles for the active session.
- [ ] Retry path does not create duplicate inserts for a single user recovery action.

### Assets/Docs
- `src/app/api/chat/route.ts`
- `convex/chat.ts`

## Phase 3 – Mobile Readability and Tap-Target Polish
### Goal
Improve readability and interaction clarity for long chat responses and controls at 390px and 360px widths.

### Implementation Steps
1. `src/app/page.tsx` – Adjust message bubble typography/line-height/spacing as needed for long assistant responses to avoid dense blocks.
2. `src/app/page.tsx` – Tune quick-prompt and footer form spacing so controls do not clip or crowd on narrow screens.
3. `src/app/page.tsx` – Ensure retry/error UI remains visible and actionable without pushing critical controls off-screen.
4. `src/app/globals.css` and/or `src/app/page.tsx` classes – Apply minimal responsive refinements while preserving existing visual direction.

### Acceptance Criteria
#### Automated
- [ ] `npm run lint`
- [ ] `npm run build`

#### Manual
- [ ] At 390px and 360px viewports, long assistant replies remain readable without clipped text.
- [ ] Quick prompts, send button, and retry control remain fully tappable and visually distinct.
- [ ] Conversation panel maintains clear hierarchy (status, prompts, messages, input) on mobile.

### Assets/Docs
- `src/app/page.tsx`
- `src/app/globals.css`
- `.documents/design-ux-ui.md`

## Phase 4 – Verification, Telemetry Definition, and Release Notes
### Goal
Close the ticket with reproducible verification evidence, documented reliability signals, and changelog traceability.

### Implementation Steps
1. Run full verification command set from the ticket:
   - `npm run lint`
   - `npm run build`
   - `npm run dev:all`
   - `npx convex run chat:getMessagesBySession '{"sessionId":"<manual-test-session-id>"}'`
2. Execute manual scenario pass:
   - empty send guard
   - loading/disabled state
   - forced error + retry recovery
   - same-session refresh rehydration
   - mobile checks at 390px and 360px
3. Define telemetry/metrics/alerts for this scope in ticket notes or release notes:
   - retry attempt count
   - chat request error count
   - assistant persistence failure count
4. Update `.documents/CHANGELOG.md` with ticket summary, behavior changes, and verification evidence references.

### Acceptance Criteria
#### Automated
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] `npx convex run chat:getMessagesBySession '{"sessionId":"<manual-test-session-id>"}'` evidence captured

#### Manual
- [ ] All ticket acceptance scenarios pass end-to-end.
- [ ] Manual QA notes include mobile viewport screenshots/checkpoints for 390px and 360px.
- [ ] Release notes/changelog entry captures reliability + readability scope and telemetry definitions.

### Assets/Docs
- `.documents/CHANGELOG.md`
- `.documents/.tickets/current/TICKET-1002-harden-chat-reliability-mobile-readability-2026-02-20.md`

## Testing Strategy
- File-level focus:
  - `src/app/page.tsx`
  - `src/app/api/chat/route.ts`
  - `convex/chat.ts`
  - `src/app/globals.css` (if readability classes are adjusted)
  - `.documents/CHANGELOG.md`
- Interaction sequence:
  1. Load app and confirm session bootstrap.
  2. Send valid prompt and observe loading/disabled state.
  3. Force network/API failure and validate inline retry.
  4. Retry and confirm successful recovery.
  5. Refresh page and verify same-session history rehydrates.
  6. Re-run flows at 390px and 360px widths.
- Manual checklist:
  - Empty-send guard
  - Duplicate-send prevention
  - Error + retry clarity
  - User/assistant persistence verification
  - Mobile readability/tap-target validation

## Performance / Security / Migration Notes
- Performance: preserve existing streaming path and avoid extra client/server round-trips beyond explicit retry action.
- Security/privacy: no new persisted PII; continue using existing `sessionId`, `role`, and `text` fields only.
- Migration: no schema/index changes; Convex contracts in `convex/schema.ts` remain unchanged.
- Rollback: revert implementation commit and redeploy to restore prior chat shell behavior.

## References
- `.documents/.tickets/current/TICKET-1002-harden-chat-reliability-mobile-readability-2026-02-20.md`
- `.documents/tasks-ai-portfolio.md`
- `.documents/design-ux-ui.md`
- `src/app/page.tsx`
- `src/app/api/chat/route.ts`
- `convex/chat.ts`
- `src/app/globals.css`
- `workflow/commands/create_plan.md`
