import { NextResponse } from "next/server";
import { getLinkDestination } from "@/features/links/data";
import { createLinkSchema } from "@/features/links/schemas";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;
  const headers = { "Cache-Control": "no-store" };

  if (!/^[A-Za-z0-9_-]{3,64}$/.test(shortcode)) {
    return NextResponse.json({ error: "Link not found." }, { status: 404, headers });
  }

  const destination = await getLinkDestination(shortcode);
  if (destination === undefined) {
    return NextResponse.json({ error: "Link not found." }, { status: 404, headers });
  }

  return NextResponse.redirect(
    createLinkSchema.shape.originalUrl.parse(destination),
    { status: 307, headers },
  );
}
