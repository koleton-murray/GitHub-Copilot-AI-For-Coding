<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Link Shortener — Agent Instructions

A URL shortener built with Next.js (App Router), React, TypeScript, Clerk, Drizzle ORM on Neon Postgres, shadcn/ui and Tailwind CSS v4.

This file is the entry point. Copilot natively loads applicable standards from `.github/instructions/`.

## Commands

```bash
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build — also type-checks
npm run lint     # ESLint (eslint-config-next)
npm test         # Node.js tests via the existing tsx dependency
npx tsc --noEmit # type-check only
npx drizzle-kit generate   # generate a migration from db/schema.ts
npx drizzle-kit migrate    # apply migrations
```

Before declaring a task done, run `npm test`, `npm run lint`, and `npx tsc --noEmit` and fix everything you introduced. Tests use Node.js's built-in test runner with tsx.

## Project layout

```
app/          Routes, layouts, pages, route handlers, colocated actions.ts
components/   Shared React components; components/ui/ is shadcn-generated
db/           Drizzle client (index.ts) and schema (schema.ts)
data/         Server-only query helpers (one file per entity)
lib/          Framework-agnostic utilities (cn, validation schemas, etc.)
proxy.ts      Clerk middleware (Next.js 16 `proxy`, replaces `middleware.ts`)
drizzle/      Generated migrations — never hand-edit
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
