---
date: 2026-02-20
branch: gususe-implementplan-workflow-1002
pr_number: 2
pr_url: https://github.com/cotopena/JAPP-AI/pull/2
status: ready-for-review
---

## Linked Ticket / Plan
- Ticket: `.documents/.tickets/current/TICKET-1002-harden-chat-reliability-mobile-readability-2026-02-20.md`
- Plan: `.documents/.plans/current_plan/PLAN-1002-harden-chat-reliability-mobile-readability-2026-02-20.md`

## What problem(s) was I solving?
Recruiters could hit dead ends in chat when a request failed, and long mobile responses were dense enough to reduce readability and tap reliability. This PR hardens retry and persistence behavior while keeping the current Convex schema/contracts unchanged.

## What user-facing changes did I ship?
- Added deterministic retry UX in the footer error region: failed prompt is retained and can be retried with one tap.
- Unified submit behavior across textarea submit, quick prompts, and retry path so blank/duplicate sends are blocked consistently.
- Kept loading/disabled feedback synchronized (`THINKING`/`RETRY AVAILABLE`) across prompt chips, textarea, and send button.
- Improved mobile readability and tappability at 390px/360px with message wrapping, larger tap targets, and mobile-first footer layout.
- Preserved same-browser session continuity and chat rehydration behavior after refresh.

## How I implemented it
- `src/app/page.tsx`
  - Introduced shared `submitPrompt` flow used by quick prompts, textarea submit, and retry.
  - Added retry state (`failedPrompt`, `footerError`) keyed to `useChat` status transitions.
  - Added explicit inline `Retry` control and synchronized status badge behavior.
  - Tuned mobile typography/spacing for chat bubbles, prompt chips, textarea, and send button.
- `src/app/api/chat/route.ts`
  - Hardened request parsing and guards for invalid JSON, invalid message payloads, missing user turns, and empty latest user text.
  - Preserved assistant persistence in `onFinish` and idempotent user save semantics.
- `convex/chat.ts`
  - Kept schema/index contracts intact and sorted fetched messages by `createdAt` before returning to ensure deterministic rehydration order.
- Docs/evidence updates
  - Updated plan + ticket checklists with manual verification outcomes.
  - Updated `.documents/CHANGELOG.md` release 0.5 verification details to reflect final pass state.

## How to verify it

### Automated
- [x] `bash workflow/scripts/lint-prompts.sh`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run dev:all`
- [x] `npx convex run chat:getMessagesBySession '{"sessionId":"2a40cb4e-f395-453a-82a1-9e30b8670cfd"}'`

### Manual Testing
- [x] Blank/whitespace send guard: whitespace input keeps `Send` disabled and no request is dispatched.
- [x] Pending state lock: while `THINKING`, prompt chips + textarea + send button are disabled and duplicate send is blocked.
- [x] Forced error path: offline network triggers inline footer error with explicit `Retry` action.
- [x] Retry recovery: restoring network and tapping `Retry` submits once and clears error on success.
- [x] Session continuity: `ai-portfolio-session-id` remains stable across reload and prior turns rehydrate in order.
- [x] Persistence check: `chat:getMessagesBySession` returns non-empty interleaved `user` and `assistant` messages for active session.
- [x] Mobile readability/tap targets: validated at 390px and 360px with long assistant responses and actionable controls.

Manual evidence:
- Screenshots: `/tmp/manual-verify-390.png`, `/tmp/manual-verify-360.png`, `/tmp/manual-verify-360-retry.png`
- Network/console: one intentional offline request (`net::ERR_INTERNET_DISCONNECTED`) followed by successful retry.

## Description for the changelog
Hardened recruiter chat reliability with deterministic retry/recovery, stricter chat route payload guards, and ordered session rehydration, while improving long-response readability and tap targets on 390px/360px mobile viewports.
