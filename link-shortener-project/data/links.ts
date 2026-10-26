import "server-only";

import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";

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
