---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines

## 1. Use Server Components for Data Fetching

In Next.js ALWAYS use Server Components for data fetching. NEVER use Client Components to fetch data.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the feature's `data.ts` module to fetch data. NEVER execute database queries directly inside your components.

ALL data helper modules should use Drizzle ORM for database interactions and import `"server-only"`.

User-owned data helpers must derive the current `userId` from Clerk's server-side `auth()`, reject unauthenticated access, and filter queries by that owner. `features/links/data.ts` provides `getUserLinks()` for the dashboard, ordered newest first.