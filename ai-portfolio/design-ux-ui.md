# Design UX/UI

## Purpose

This portfolio is a recruiter-facing product. The UI must quickly answer three questions:

1. Who is Augusto?
2. What measurable value does he bring?
3. How do I contact him now?

The interface is intentionally chat-first so visitors can ask role-specific questions without navigating multiple pages.

## Target End Users

- Recruiters doing a fast first-pass screen.
- Hiring managers evaluating business impact and leadership fit.
- Potential collaborators who need quick context and direct contact details.

## UX Principles

- Speed to value: the first screen should communicate positioning in under 10 seconds.
- Low cognitive load: keep navigation minimal and content grouped by hiring decisions.
- Guided exploration: quick prompts reduce friction for visitors who do not know what to ask.
- Trust and credibility: answers must be grounded in real portfolio data and avoid vague claims.
- Clear conversion: contact information should always be easy to request and easy to copy.

## Visual Direction

- Tone: premium, warm, human, and confident.
- Layout: two-column desktop experience.
- Left column: identity, positioning, highlights, featured work.
- Right column: live conversation and prompt-driven Q&A.
- Mobile: stacked layout with profile context first, then full chat.

## Visual System (Current)

- Primary background: warm paper gradient to avoid sterile SaaS look.
- Brand accent: orange (`--brand`) for action and emphasis.
- Supporting accent: teal (`--accent`) for subtle confidence markers.
- Surface style: rounded cards, soft borders, and restrained shadows.
- Typography:
  - Headline/body: Space Grotesk
  - Utility/meta labels: IBM Plex Mono

This visual language supports readability, personality, and professionalism without looking generic.

## Information Architecture

- Global frame:
  - Identity panel (static context)
  - Conversation panel (interactive evaluation)
- Identity panel content order:
  - Name and role
  - Short intro
  - Value proposition
  - Highlight bullets
  - Featured work snapshot
- Conversation panel content order:
  - Conversation title and status
  - Quick prompts
  - Message stream
  - Input and submit action

This structure supports both skim behavior and deeper questioning.

## Conversation UX

- Quick prompts are designed as recruiter shortcuts.
- Messages are visually separated for user vs assistant to reduce scan friction.
- Assistant responses should default to concise, structured answers.
- Long responses should be broken into short paragraphs or bullets.
- Loading state is visible and lightweight (“Generating response…”).
- Error state is explicit and local to the chat input area.

## End-User Trust Design

- AI responses should reference concrete project/skill data from Convex tools.
- Avoid inflated language and unverified metrics.
- Keep tone professional and direct.
- Ensure contact response includes email and relevant social links.

## Accessibility and Readability

- High contrast between text and background surfaces.
- Clear focus states on inputs and buttons.
- Click targets sized for mouse and touch usage.
- Semantic labels for form controls.
- Content should remain understandable at mobile widths.

## Conversion Goals

Primary conversion:

- Visitor requests or captures direct contact details.

Secondary conversions:

- Visitor identifies role fit from projects and skills.
- Visitor spends meaningful time in conversation.

## UX/UI Acceptance Criteria

- A first-time visitor understands positioning within 10 seconds.
- A recruiter can access highlights and top projects without typing.
- Contact info is retrievable in one prompt.
- Mobile experience remains usable and visually consistent.
- Chat responses stay relevant, concise, and role-focused.

## Phase 2 Design Enhancements (Post-Launch)

- Add “copy contact” and “download resume” micro-actions.
- Add recruiter-oriented prompt presets by role (sales leader, RevOps, account executive).
- Add lightweight response citations to increase trust.
- Add analytics-informed prompt ordering based on real usage.
- Add subtle motion for message entry and card reveal while preserving performance.

## Summary

This UI is designed to function as an interactive professional interview preview: fast to read, easy to question, and optimized to convert recruiter interest into direct contact.
