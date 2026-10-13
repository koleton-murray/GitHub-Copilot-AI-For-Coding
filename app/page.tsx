import { SignUpButton } from "@clerk/nextjs";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CornerDownRight,
  Link2,
  LockKeyhole,
  Send,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Link2,
    number: "01",
    title: "Less clutter. More clarity.",
    description:
      "Give long, unwieldy URLs a cleaner look. Put the focus on what you're sharing, not a wall of characters.",
    detail: "Small enough to fit anywhere",
  },
  {
    icon: Send,
    number: "02",
    title: "Made to be shared.",
    description:
      "From a quick message to your next big idea. Short links feel right in emails, social bios, and everything in between.",
    detail: "One link. Endless possibilities.",
  },
  {
    icon: LockKeyhole,
    number: "03",
    title: "A space of your own.",
    description:
      "Start with a secure account and your own dashboard. A simple, focused home for your link-shortening journey.",
    detail: "Your account. Your workspace.",
  },
];

export default function Home() {
  return (
    <div className="relative isolate flex-1 overflow-hidden bg-[#101211] text-zinc-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(ellipse_at_50%_20%,#a3e6bd12,transparent_65%)]"
      />
      <main>
        <section
          aria-labelledby="hero-heading"
          className="mx-auto max-w-6xl px-6 pb-20 pt-20 text-center sm:px-8 sm:pt-24 lg:pb-24"
        >
          <Badge
            variant="outline"
            className="h-auto gap-2 border-emerald-200/15 bg-emerald-200/5 px-3.5 py-1.5 font-normal text-emerald-200"
          >
            <Sparkles aria-hidden="true" />
            Small links. Big possibilities.
          </Badge>
          <h1
            id="hero-heading"
            className="mt-7 scroll-mt-24 text-5xl font-medium leading-[1.06] tracking-[-0.065em] sm:text-7xl lg:text-[92px]"
          >
            Less link.
            <br />
            <span className="text-emerald-200">More possibility.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-7 text-zinc-400 sm:text-lg">
            Your next great idea deserves a better link.
            <br className="hidden sm:block" /> Keep it short, make it clear, and
            share it anywhere.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="h-12 w-full gap-3 rounded-xl bg-emerald-200 px-6 text-[#102419] hover:bg-emerald-100 sm:w-auto"
              >
                Get started
                <ArrowUpRight aria-hidden="true" />
              </Button>
            </SignUpButton>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              role="link"
              render={<a href="#features" />}
              className="h-12 w-full gap-3 px-6 text-zinc-300 hover:bg-white/5 sm:w-auto"
            >
              Explore the features
              <ArrowDown className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Less noise. No complicated setup.
          </p>

          <div className="relative mx-auto mt-14 max-w-3xl text-left sm:mt-16">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-full bg-emerald-200/5 blur-3xl"
            />
            <Card className="gap-0 rounded-2xl bg-[#171a18] py-0 shadow-2xl shadow-black/30 ring-white/10">
              <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <Link2 className="size-4 text-emerald-200" aria-hidden="true" />
                  A little link makeover
                </div>
                <Badge
                  variant="outline"
                  className="border-white/10 text-[10px] font-normal text-zinc-400"
                >
                  Example preview
                </Badge>
              </CardHeader>
              <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
                <p className="mb-3 text-[10px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                  From a long story
                </p>
                <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-black/15 px-4 py-3.5">
                  <Link2 className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                  <span className="truncate font-mono text-xs text-zinc-400 sm:text-sm">
                    https://example.com/your-next-big-idea?utm_source=everywhere
                  </span>
                </div>
                <div className="flex items-center gap-2 py-4 pl-4 text-xs text-zinc-500">
                  <CornerDownRight className="size-4" aria-hidden="true" />
                  to something worth sharing
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200/20 bg-emerald-200/5 px-4 py-4">
                  <span className="font-mono text-lg font-medium tracking-tight text-emerald-200 sm:text-xl">
                    short.link/your-idea
                  </span>
                  <Badge className="h-6 gap-1.5 bg-emerald-200/10 text-emerald-200">
                    <Check aria-hidden="true" />
                    Short &amp; sweet
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <p className="mt-4 text-center text-xs text-zinc-500">
              A shorter link. A cleaner first impression.
            </p>
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="features-heading"
          className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-20 sm:px-8 lg:pb-24"
        >
          <Separator className="mb-14 bg-white/8" />
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-emerald-200 uppercase">
                Keep it simple
              </p>
              <h2
                id="features-heading"
                className="mt-3 text-3xl font-medium tracking-[-0.045em] sm:text-4xl"
              >
                Everything you need.
                <br />
                <span className="text-zinc-500">Nothing in your way.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-zinc-400">
              For the things you create, the ideas you love, and the places you
              want to take people.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, number, title, description, detail }) => (
              <Card
                key={number}
                className="gap-8 rounded-xl bg-[#171a18] py-6 ring-white/8 transition-colors hover:bg-[#1b201c]"
              >
                <CardHeader className="gap-6 px-6">
                  <div className="flex items-center justify-between">
                    <Badge className="size-11 rounded-xl bg-emerald-200/8 text-emerald-200 [&>svg]:size-5!">
                      <Icon aria-hidden="true" />
                    </Badge>
                    <span className="font-mono text-xs text-zinc-500">{number}</span>
                  </div>
                  <div>
                    <CardTitle>
                      <h3 className="text-lg font-medium tracking-tight">{title}</h3>
                    </CardTitle>
                    <CardDescription className="mt-3 leading-6 text-zinc-400">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto px-6">
                  <p className="flex items-center gap-2 text-xs text-zinc-500">
                    <ArrowDownRight className="size-3.5 text-emerald-200/60" aria-hidden="true" />
                    {detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="cta-heading" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
          <Card className="relative gap-0 rounded-2xl bg-emerald-200/[0.04] py-0 ring-emerald-200/15">
            <CardContent className="flex flex-col items-start justify-between gap-8 p-8 sm:p-12 md:flex-row md:items-center">
              <div>
                <p className="mb-3 text-xs font-medium tracking-[0.16em] text-emerald-200 uppercase">
                  Good things come in short links
                </p>
                <h2 id="cta-heading" className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                  Make room for what matters.
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  A simpler way to share starts here.
                </p>
              </div>
              <SignUpButton mode="modal">
                <Button className="h-12 w-full gap-3 rounded-xl bg-emerald-200 px-6 text-[#102419] hover:bg-emerald-100 md:w-auto">
                  Create your account
                  <ArrowRight aria-hidden="true" />
                </Button>
              </SignUpButton>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-7 text-xs text-zinc-500 sm:flex-row sm:px-8">
          <p className="flex items-center gap-2 font-medium text-zinc-400">
            <Link2 className="size-4 text-emerald-200" aria-hidden="true" />
            Link Shortener
          </p>
          <p>Less link. More possibility.</p>
          <Button
            variant="link"
            nativeButton={false}
            role="link"
            render={<a href="#hero-heading" />}
            className="h-auto p-0 text-xs text-zinc-400"
          >
            Back to top <ArrowRight className="-rotate-90" aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
