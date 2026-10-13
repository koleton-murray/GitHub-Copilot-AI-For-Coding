# UI Standards

- **Always use shadcn/ui components for all UI elements. Do not create custom UI components.**
- Reuse existing components from `@/components/ui`. Compose shadcn/ui components directly in pages and layouts; do not introduce custom component wrappers or hand-built replacements.
- If a required shadcn/ui component is missing, add it with the shadcn CLI using the project's existing `components.json` configuration. Do not manually create or edit generated components.
- Use the existing shadcn/ui variants and Tailwind utilities for styling. Do not add another UI library or styling system.
- If shadcn/ui cannot meet a requirement, ask for guidance rather than creating a custom component.
