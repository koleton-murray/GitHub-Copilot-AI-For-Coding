This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Clerk authentication

This project uses Clerk for authentication and is linked to application
`app_3KcL0cLVmjsziEYaiuPY8qwrwhc`. To configure a new local checkout:

```bash
npm install
npm install -g clerk
clerk auth login
clerk init --app app_3KcL0cLVmjsziEYaiuPY8qwrwhc
clerk doctor
```

The CLI writes local authentication configuration to `.env.local`. Keep this
file uncommitted and never expose `CLERK_SECRET_KEY` to client code.

The header provides **Sign in** and **Sign up** controls when signed out, and a
profile menu when signed in. Both controls open Clerk's built-in authentication
modals without leaving the current page. There are no dedicated `/sign-in` or
`/sign-up` pages. Clerk components use the shadcn theme.

### Homepage

The public homepage is a responsive, dark landing page with mint accents,
feature highlights, and account-creation calls to action that open Clerk's
sign-up modal. The link makeover is a static, labeled example, not a working
shortening form or a live short link. Signed-in visitors continue to be
redirected to `/dashboard`.

### Dashboard

The protected `/dashboard` page loads the signed-in user's links on the server
through `data/links.ts`. The helper authenticates with Clerk and uses Drizzle
to filter by the current user's ID, returning links newest first.

Each link displays its short code, destination URL, and creation date (UTC).
HTTP and HTTPS destinations can be opened in a new tab. Users without links
see an empty state. Short-link redirects and link creation are not implemented.
Configure `DATABASE_URL` in `.env.local` with the `links` schema applied before
loading the dashboard.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
