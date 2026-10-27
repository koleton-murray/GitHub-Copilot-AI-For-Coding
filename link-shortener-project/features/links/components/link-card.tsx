import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { getUserLinks } from "../data";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { LinkFormDialog } from "./link-form-dialog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export function LinkCard({
  link,
}: {
  link: Awaited<ReturnType<typeof getUserLinks>>[number];
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Short code</CardDescription>
        <CardTitle className="break-all font-mono">
          {link.shortCode}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="break-all text-sm text-muted-foreground">
          {link.originalUrl}
        </p>
        {/^https?:\/\//i.test(link.originalUrl) && (
          <Button
            variant="link"
            className="mt-2 h-auto p-0"
            render={
              <a
                href={link.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
          >
            Open destination
            <ArrowUpRight aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
        <span>
          Created{" "}
          <time dateTime={link.createdAt.toISOString()}>
            {dateFormatter.format(link.createdAt)}
          </time>
        </span>
        <div className="flex flex-wrap gap-2">
          <LinkFormDialog link={link} />
          <DeleteLinkDialog id={link.id} shortCode={link.shortCode} />
        </div>
      </CardFooter>
    </Card>
  );
}
