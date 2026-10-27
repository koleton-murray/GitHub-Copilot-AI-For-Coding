import "server-only";

import { randomBytes } from "node:crypto";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";
import type { CreateLinkInput, UpdateLinkInput } from "./schemas";

function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  if ("code" in error && error.code === "23505") return true;
  return "cause" in error && isUniqueViolation(error.cause);
}

export async function updateUserLink({ id, originalUrl, customSlug }: UpdateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to edit a link.");
  }

  try {
    const [link] = await db
      .update(links)
      .set({ originalUrl, shortCode: customSlug })
      .where(and(eq(links.id, id), eq(links.userId, userId)))
      .returning({ id: links.id });

    return link ? { success: true as const } : { error: "not_found" as const };
  } catch (error) {
    if (isUniqueViolation(error)) return { error: "slug_taken" as const };
    throw error;
  }
}

export async function deleteUserLink(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to delete a link.");
  }

  const [link] = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning({ id: links.id });

  return link;
}

export async function createUserLink({ originalUrl, customSlug }: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to create a link.");
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const [link] = await db
      .insert(links)
      .values({
        originalUrl,
        shortCode: customSlug || randomBytes(6).toString("base64url"),
        userId,
      })
      .onConflictDoNothing({ target: links.shortCode })
      .returning({ id: links.id });

    if (link) return link;
    if (customSlug) return null;
  }

  throw new Error("Could not generate a unique short code.");
}

export async function getUserLinks() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to view your links.");
  }

  return db
    .select({
      id: links.id,
      originalUrl: links.originalUrl,
      shortCode: links.shortCode,
      createdAt: links.createdAt,
    })
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt), desc(links.id));
}
