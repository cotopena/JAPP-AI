# AI Portfolio (Next.js + Convex + Tailwind + OpenAI)

Interactive AI portfolio app inspired by chat-first portfolio experiences.

## Stack

- Next.js (App Router) + TypeScript
- React + Tailwind CSS (v4)
- Convex (data + chat persistence)
- AI SDK + OpenAI provider (streaming responses + tools)

## What is implemented

- Chat interface with quick prompts
- Streaming AI replies from `src/app/api/chat/route.ts`
- Tool-based answers for:
  - Profile
  - Projects
  - Skills
  - Contact
- Convex persistence for conversations and messages
- Seedable portfolio data in Convex (`convex/portfolio.ts`)

## 1) Install

```bash
npm install
```

## 2) Environment

Copy `.env.example` to `.env.local` and set:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, default: `gpt-4.1-mini`)

Convex values in `.env.local` are managed by `npx convex dev`.

## 3) Run Convex

```bash
npm run convex:dev
```

Keep this running in one terminal.

## 4) Run Next.js

In a second terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## One-command local run

```bash
npm run dev:all
```

This starts both Convex and Next.js in one terminal.

## Useful commands

```bash
npm run convex:codegen
npm run dev:all
npm run lint
npm run build
```

## Key files

- Convex schema: `convex/schema.ts`
- Portfolio content + seed: `convex/portfolio.ts`
- Chat persistence: `convex/chat.ts`
- AI route: `src/app/api/chat/route.ts`
- UI page: `src/app/page.tsx`

## Experience Update Source of Truth

When updating portfolio experience content, use this precedence:

1. `/Users/coto/Documents/Job Application AI/Augusto_Pena_CV.md`
2. `/Users/coto/Documents/Job Application AI/Augusto_Pena_Resume.md`
3. `/Users/coto/Documents/Job Application AI/experience_bank.md`
4. `/Users/coto/Documents/Job Application AI/applications/**` (supporting context only)

Required flow for content updates:

1. Create/update `.documents/research/TICKET-<id>-content-source-map-YYYY-MM-DD.md`.
2. Map each portfolio statement to a source file + line.
3. Update `convex/portfolio.ts`.
4. Verify with:
   - `npx convex run portfolio:previewDefaults '{"slug":"main"}'`
   - `npm run lint`
   - `npm run build`
