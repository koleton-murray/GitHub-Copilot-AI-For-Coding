"use client";

import { useId, useState, useTransition, type FormEvent } from "react";
import { SquarePen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateLinkInput } from "../schemas";
import { createLink, updateLink } from "../actions";

export function LinkFormDialog({
  link,
}: {
  link?: { id: string; originalUrl: string; shortCode: string };
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<{
    message: string;
    field?: keyof CreateLinkInput;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const urlId = useId();
  const slugId = useId();
  const slugHelpId = useId();
  const errorId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const originalUrl = String(formData.get("originalUrl") ?? "");
    const customSlug = String(formData.get("customSlug") ?? "");
    setError(null);

    startTransition(async () => {
      try {
        const result = link
          ? await updateLink({ id: link.id, originalUrl, customSlug })
          : await createLink({ originalUrl, customSlug });
        if ("error" in result) {
          setError({ message: result.error, field: result.field });
          return;
        }

        form.reset();
        setOpen(false);
      } catch {
        setError({ message: "Unable to reach the server. Please try again." });
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending) return;
        setError(null);
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger render={<Button variant={link ? "outline" : "default"} size={link ? "icon-sm" : "default"} />}>
        {link ? <SquarePen aria-hidden="true" /> : <Plus aria-hidden="true" />}
        {link ? <span className="sr-only">Edit link</span> : "Create link"}
      </DialogTrigger>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>{link ? "Edit link" : "Create link"}</DialogTitle>
          <DialogDescription>
            {link
              ? "Update the destination URL or short code for this link."
              : "Save a destination URL with a custom slug or an automatically generated short code."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4" aria-busy={isPending}>
          <div className="grid gap-2">
            <Label htmlFor={urlId}>Destination URL</Label>
            <Input
              id={urlId}
              name="originalUrl"
              type="url"
              defaultValue={link?.originalUrl}
              placeholder="https://example.com/your-long-link"
              required
              disabled={isPending}
              aria-invalid={error?.field === "originalUrl"}
              aria-describedby={error?.field === "originalUrl" ? errorId : undefined}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={slugId}>{link ? "Short code" : "Custom slug (optional)"}</Label>
            <Input
              id={slugId}
              name="customSlug"
              defaultValue={link?.shortCode}
              required={!!link}
              placeholder="my-custom-link"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              disabled={isPending}
              aria-invalid={error?.field === "customSlug"}
              aria-describedby={
                error?.field === "customSlug" ? `${slugHelpId} ${errorId}` : slugHelpId
              }
            />
            <p id={slugHelpId} className="text-xs text-muted-foreground">
              {link ? "Use 3-64 letters," : "Leave blank to generate a code. Otherwise, use 3-64 letters,"}{" "}
              numbers, hyphens, or underscores. Slugs are case-sensitive.
            </p>
          </div>
          {error && (
            <p id={errorId} role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}
          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline" disabled={isPending} />}
            >
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {link
                ? (isPending ? "Saving..." : "Save changes")
                : (isPending ? "Creating..." : "Create link")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
