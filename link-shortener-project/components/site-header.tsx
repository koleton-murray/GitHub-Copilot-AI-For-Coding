import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#101211]">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-1 px-4 sm:gap-3 sm:px-8">
        <Button
          variant="ghost"
          nativeButton={false}
          role="link"
          render={<Link href="/" />}
          className="mr-auto h-auto gap-2 p-0 text-xs font-semibold tracking-tight hover:bg-transparent sm:gap-2.5 sm:text-base"
        >
          <Image
            src="/icon.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0"
          />
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
  );
}
