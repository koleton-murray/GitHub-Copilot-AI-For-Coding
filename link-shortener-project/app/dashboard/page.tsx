import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowUpRight, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserLinks } from "@/data/links";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const links = await getUserLinks();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            All your links, in one place.
          </p>
        </div>
        <Badge variant="secondary">
          {links.length} {links.length === 1 ? "link" : "links"}
        </Badge>
      </div>

      {links.length === 0 ? (
        <Card className="mt-8 text-center">
          <CardHeader className="justify-items-center py-8">
            <Link2 aria-hidden="true" className="mb-3 size-8 text-muted-foreground" />
            <CardTitle>No links yet</CardTitle>
            <CardDescription>
              Your saved links will appear here once you create your first one.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ul aria-label="Your links" className="mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.id} className="min-w-0">
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
                <CardFooter className="text-xs text-muted-foreground">
                  <span>
                    Created{" "}
                    <time dateTime={link.createdAt.toISOString()}>
                      {dateFormatter.format(link.createdAt)}
                    </time>
                  </span>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
