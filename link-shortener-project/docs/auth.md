# Authentication

All authentication in this app is handled by **Clerk**. No other auth method may be used — no custom sessions, JWTs, cookies, NextAuth/Auth.js, passwords, or hand-rolled login forms.

## Rules

1. Use `@clerk/nextjs` for everything auth-related (UI components, hooks, server helpers).
2. Get the current user on the server with `auth()` from `@clerk/nextjs/server`. Use the returned `userId` to scope all data access.
3. Never trust client-provided user IDs. Always derive identity from Clerk on the server.
4. Route protection is enforced on the server at each protected resource (page, route handler, server action) with `const { userId } = await auth()` from `@clerk/nextjs/server`, redirecting to `/` when there is no `userId`. Do not use `auth.protect()` (it redirects to Clerk's hosted sign-in page, which violates the modal-only rule) or `createRouteMatcher` (deprecated by Clerk), and do not rely on client-side checks alone. `proxy.ts` (Next.js 16 `proxy`, not `middleware.ts`) keeps `clerkMiddleware()` for Clerk to work, plus non-auth logic such as redirects.

## Route access

| Route | Rule |
| --- | --- |
| `/dashboard` (and sub-routes) | **Protected.** Requires a signed-in user; unauthenticated users must not see it. |
| `/` (homepage) | Public, but a signed-in user must be **redirected to `/dashboard`**. |

Protect `/dashboard` by checking `userId` from `auth()` at the top of its page/layout and redirecting to `/` when absent (the homepage offers the sign in/up modals). Redirect signed-in users from `/` to `/dashboard` in `proxy.ts` (`clerkMiddleware` handler: `auth()` → `userId` → `NextResponse.redirect`). Verify the exact API against the installed Clerk version and `node_modules/next/dist/docs/` before writing it.

## Sign in / sign up

- Sign in and sign up **must always open as a modal**. Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`.
- Do not create dedicated `/sign-in` or `/sign-up` pages, and do not redirect users to Clerk's hosted pages.
- Use Clerk's `<SignedIn>`, `<SignedOut>`, and `<UserButton>` for conditional UI and account management.
- Keep `<ClerkProvider>` in the root layout.
