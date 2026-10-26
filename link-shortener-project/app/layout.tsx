import type { Metadata } from "next";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener | Less link. More possibility.",
  description:
    "A simpler way to share. Discover a clean, focused home for shorter links and your next big idea.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full scroll-smooth motion-reduce:scroll-auto antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <header className="sticky top-0 z-40 border-b border-white/8 bg-[#101211]">
            <div className="mx-auto flex h-20 max-w-6xl items-center gap-1 px-4 sm:gap-3 sm:px-8">
              <Button
                variant="ghost"
                nativeButton={false}
                role="link"
                render={<Link href="/" />}
                className="mr-auto h-auto gap-2 p-0 text-xs font-semibold tracking-tight hover:bg-transparent sm:gap-2.5 sm:text-base"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-200 text-[#102419]">
                  <Link2 className="size-4" aria-hidden="true" />
                </span>
                Link Shortener
              </Button>
              <Suspense fallback={<span className="text-sm text-muted-foreground" role="status">Loading account...</span>}>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="px-2 text-xs sm:px-2.5 sm:text-sm">Sign in</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="h-9 rounded-lg bg-emerald-200 px-3 text-xs text-[#102419] hover:bg-emerald-100 sm:px-4 sm:text-sm">Sign up</Button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </Suspense>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
