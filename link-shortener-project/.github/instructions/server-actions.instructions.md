---
description: Apply when implementing or modifying app data mutations, Server Actions, or Client Components that call them.
---

# Server Actions

- ALL app data mutations MUST use Server Actions, called from Client Components.
- Server Action files MUST be named `actions.ts`, include `"use server"`, and be colocated in the directory of the component that calls them.
- Give every input an explicit, appropriate TypeScript type. NEVER use `FormData` as an input type.
- Server Actions MUST NOT throw errors. Return an object with an `error` property on failure or a `success` property on success.
- Every Server Action MUST first check for a logged-in user with `const { userId } = await auth()` from `@clerk/nextjs/server`, before any database operations. Redirect to `/` when no `userId` exists. NEVER trust client-provided user IDs.
- Validate ALL input inside the Server Action with Zod before using it or calling database helpers. TypeScript types do not replace runtime validation.
- Perform ALL database operations through helper functions in `/data` that wrap Drizzle queries. NEVER execute Drizzle queries directly inside Server Actions.
- User-owned data helpers MUST independently derive the current `userId` via Clerk server `auth()`, reject unauthenticated access, and scope every query by that owner. Set ownership from the authenticated identity on creation; filter reads, updates, and deletes by owner as well as any requested record ID.
