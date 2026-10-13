<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Link Shortener — Agent Instructions

A URL shortener built with Next.js (App Router), React, TypeScript, Clerk, Drizzle ORM on Neon Postgres, shadcn/ui and Tailwind CSS v4.

This file is the entry point. Detailed standards live in [`/docs`](./docs).

## Mandatory first step: read the relevant instructions

**ALWAYS read the relevant individual instruction files in [`/docs`](./docs) before planning, writing, or changing code. This is a non-negotiable prerequisite, not an optional reference.**

- Inspect [`/docs`](./docs) for instructions that apply to the task; the index below is a starting point, not an exhaustive list.
- Read each relevant file in full. Reading this index, relying on summaries, or assuming you remember the rules does **not** satisfy this requirement.
- Follow all applicable instructions. If a doc conflicts with your general knowledge, the doc wins.
- If the task expands to another area, read that area's instructions **before** making changes there.
- If a required instruction file is missing or unreadable, report the blocker and ask for guidance instead of proceeding by assumption.

## Docs index

- [`docs/auth.md`](./docs/auth.md) — Authentication (Clerk only), route protection, homepage redirect, modal sign in/up.
- [`docs/ui.md`](./docs/ui.md) — UI standards: always use shadcn/ui components; never create custom UI components.

## Commands

```bash
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build — also type-checks
npm run lint     # ESLint (eslint-config-next)
npx tsc --noEmit # type-check only
npx drizzle-kit generate   # generate a migration from db/schema.ts
npx drizzle-kit migrate    # apply migrations
```

Before declaring a task done, run `npm run lint` and `npx tsc --noEmit` and fix everything you introduced. There is no test runner configured yet; if you add one, document it here.

## Project layout

```
app/          Routes, layouts, pages, route handlers, colocated actions.ts
components/   Shared React components; components/ui/ is shadcn-generated
db/           Drizzle client (index.ts) and schema (schema.ts)
data/         Server-only query helpers (one file per entity) — see docs/data.md
lib/          Framework-agnostic utilities (cn, validation schemas, etc.)
proxy.ts      Clerk middleware (Next.js 16 `proxy`, replaces `middleware.ts`)
drizzle/      Generated migrations — never hand-edit
docs/         Agent standards (this index's targets)
```

Import with the `@/` alias (maps to the repo root), e.g. `@/db`, `@/components/ui/button`.

## Non-negotiable rules

1. **Verify Next.js APIs against `node_modules/next/dist/docs/`** before using them. Do not rely on memory.
2. **Never trust the client.** Every Server Action and route handler that touches user data must authenticate and authorize on the server and validate its input.
3. **Scope all user data by the Clerk `userId`.** No query for user-owned rows may omit the owner filter.
4. **Secrets stay on the server.** Never read `CLERK_SECRET_KEY` or `DATABASE_URL` in client code, never log them, and never commit `.env*` files.
5. **Use the existing stack.** Do not add a new UI library, ORM, auth provider, or styling system. Add a dependency only when the task requires it, and mention it in your summary.
6. **Keep changes surgical.** Don't refactor, reformat, or rename unrelated code. Don't edit generated files (`components/ui/*` via the shadcn CLI only, `drizzle/*`, `.next/`, `next-env.d.ts`).
7. **Don't add comments** unless the code genuinely needs clarification; explain *why*, never *what*.
