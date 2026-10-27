"use client";

import { useRef, useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
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
import { deleteLink } from "../actions";

export function DeleteLinkDialog({ id, shortCode }: { id: string; shortCode: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function handleDelete() {
    if (isPending) return;
    setError(null);
    startTransition(async () => {
      try {
        const result = await deleteLink(id);
        if ("error" in result) {
          setError(result.error);
          return;
        }
        setOpen(false);
      } catch {
        setError("Unable to reach the server. Please try again.");
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
      <DialogTrigger render={<Button variant="outline" size="icon-sm" className="text-destructive hover:text-destructive" />}>
        <Trash2 aria-hidden="true" />
        <span className="sr-only">Delete link</span>
      </DialogTrigger>
      <DialogContent showCloseButton={!isPending} initialFocus={cancelRef}>
        <DialogHeader>
          <DialogTitle>Delete link?</DialogTitle>
          <DialogDescription className="break-words">
            Permanently delete <span className="font-mono">{shortCode}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <DialogFooter aria-busy={isPending}>
          <DialogClose render={<Button ref={cancelRef} variant="outline" disabled={isPending} />}>
            Cancel
          </DialogClose>
          <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
            {isPending ? "Deleting..." : "Delete link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
