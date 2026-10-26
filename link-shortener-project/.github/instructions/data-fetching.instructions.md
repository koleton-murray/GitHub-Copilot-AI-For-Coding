---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines

## 1. Use Server Components for Data Fetching

In Next.js ALWAYS use Server Components for data fetching. NEVER use Client Components to fetch data.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly inside your components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.

User-owned data helpers must derive the current `userId` from Clerk's server-side `auth()`, reject unauthenticated access, and filter queries by that owner. `data/links.ts` provides `getUserLinks()` for the dashboard, ordered newest first.