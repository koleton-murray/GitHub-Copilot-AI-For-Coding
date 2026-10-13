# Authentication

All authentication in this app is handled by **Clerk**. No other auth method may be used — no custom sessions, JWTs, cookies, NextAuth/Auth.js, passwords, or hand-rolled login forms.

## Rules

1. Use `@clerk/nextjs` for everything auth-related (UI components, hooks, server helpers).
2. Get the current user on the server with `auth()` from `@clerk/nextjs/server`. Use the returned `userId` to scope all data access.
3. Never trust client-provided user IDs. Always derive identity from Clerk on the server.
4. Route protection is enforced in `proxy.ts` via `clerkMiddleware` (Next.js 16 `proxy`, not `middleware.ts`). Do not rely on client-side checks alone.

## Route access

| Route | Rule |
| --- | --- |
| `/dashboard` (and sub-routes) | **Protected.** Requires a signed-in user; unauthenticated users must not see it. |
| `/` (homepage) | Public, but a signed-in user must be **redirected to `/dashboard`**. |

Implement both in `proxy.ts` with `clerkMiddleware`, e.g. `createRouteMatcher(['/dashboard(.*)'])` plus `auth.protect()` for protected routes, and a redirect to `/dashboard` when `userId` is present on `/`. Verify the exact API against the installed Clerk version and `node_modules/next/dist/docs/` before writing it.

## Sign in / sign up

- Sign in and sign up **must always open as a modal**. Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`.
- Do not create dedicated `/sign-in` or `/sign-up` pages, and do not redirect users to Clerk's hosted pages.
- Use Clerk's `<SignedIn>`, `<SignedOut>`, and `<UserButton>` for conditional UI and account management.
- Keep `<ClerkProvider>` in the root layout.
