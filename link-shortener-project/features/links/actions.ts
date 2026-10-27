"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUserLink, deleteUserLink, updateUserLink } from "./data";
import {
  createLinkSchema,
  linkIdSchema,
  updateLinkSchema,
  type CreateLinkInput,
  type UpdateLinkInput,
} from "./schemas";

export async function updateLink(
  input: UpdateLinkInput,
): Promise<{ success: true } | { error: string; field?: keyof CreateLinkInput }> {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const result = updateLinkSchema.safeParse(input);
  if (!result.success) {
    const issue = result.error.issues[0];
    return {
      error: issue.message,
      field: issue.path[0] === "customSlug"
        ? "customSlug"
        : issue.path[0] === "originalUrl" ? "originalUrl" : undefined,
    };
  }

  try {
    const updated = await updateUserLink(result.data);
    if ("error" in updated) {
      return updated.error === "slug_taken"
        ? { error: "This slug is already in use. Please choose another.", field: "customSlug" }
        : { error: "This link no longer exists or you do not have permission to edit it." };
    }
  } catch (error) {
    console.error("Failed to update a link.", error);
    return { error: "Your link could not be updated. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteLink(
  id: string,
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const result = linkIdSchema.safeParse(id);
  if (!result.success) return { error: result.error.issues[0].message };

  try {
    const deleted = await deleteUserLink(result.data);
    if (!deleted) {
      return { error: "This link no longer exists or you do not have permission to delete it." };
    }
  } catch (error) {
    console.error("Failed to delete a link.", error);
    return { error: "Your link could not be deleted. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function createLink(
  input: CreateLinkInput,
): Promise<
  | { success: true }
  | { error: string; field?: keyof CreateLinkInput }
> {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const result = createLinkSchema.safeParse(input);
  if (!result.success) {
    const issue = result.error.issues[0];
    return {
      error: issue.message,
      field: issue.path[0] === "customSlug" ? "customSlug" : "originalUrl",
    };
  }

  try {
    const link = await createUserLink(result.data);
    if (!link) {
      return {
        error: "This slug is already in use. Please choose another.",
        field: "customSlug",
      };
    }
  } catch (error) {
    console.error("Failed to create a link.", error);
    return { error: "Your link could not be saved. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
