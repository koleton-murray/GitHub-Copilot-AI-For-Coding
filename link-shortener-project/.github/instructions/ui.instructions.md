---
description: Read this before implementing or modifying UI components in the project.
---

# UI Standards

- **Use shadcn/ui for UI primitives. Do not create hand-built replacements.**
- Reuse existing components from `@/components/ui`. Extract meaningful compositions such as the site header and link card without duplicating primitives. Keep app-wide components in `components/` and feature-specific components in `features/<feature>/components/`.
- If a required shadcn/ui component is missing, add it with the shadcn CLI using the project's existing `components.json` configuration. Do not manually create or edit generated components.
- Use the existing shadcn/ui variants and Tailwind utilities for styling. Do not add another UI library or styling system.
- The app is always dark, regardless of system preferences. Keep the `dark` class on the root `<html>` element and `color-scheme: dark` in the global `.dark` styles so routes, native controls, and Clerk's shadcn theme share dark mode from the first render.
- If shadcn/ui cannot meet a requirement, ask for guidance rather than creating a custom component.
