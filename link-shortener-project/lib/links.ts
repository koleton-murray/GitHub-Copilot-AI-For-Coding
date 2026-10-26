import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .pipe(
      z.url({
        protocol: /^https?$/,
        error: "Enter a valid HTTP or HTTPS URL.",
      }),
    ),
  customSlug: z
    .string()
    .trim()
    .refine(
      (slug) => slug === "" || /^[A-Za-z0-9_-]{3,64}$/.test(slug),
      "Use 3-64 letters, numbers, hyphens, or underscores.",
    )
    .refine(
      (slug) => !["dashboard", "api", "_next"].includes(slug.toLowerCase()),
      "This slug is reserved. Please choose another.",
    )
    .optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export const linkIdSchema = z.uuid("Invalid link ID.");

export const updateLinkSchema = createLinkSchema.extend({
  id: linkIdSchema,
  customSlug: createLinkSchema.shape.customSlug
    .unwrap()
    .refine((slug) => slug.length > 0, "Enter a short code."),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
