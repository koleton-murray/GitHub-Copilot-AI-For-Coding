import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserLinks } from "@/features/links/data";
import { LinkFormDialog } from "@/features/links/components/link-form-dialog";
import { LinkCard } from "@/features/links/components/link-card";

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
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            {links.length} {links.length === 1 ? "link" : "links"}
          </Badge>
          <LinkFormDialog />
        </div>
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
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
