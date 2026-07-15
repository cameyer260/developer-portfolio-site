import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FreelanceHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-6 sm:pt-24 sm:pb-14">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5" /> back to portfolio
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <Badge className="mt-6">
            <span className="size-1.5 rounded-full bg-accent" />
            Freelance · Edwardsville &amp; St. Louis
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Fast, modern websites for local businesses.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-muted">
            I design, build, and deploy custom websites and software for local
            businesses around Edwardsville and the St. Louis area — end-to-end,
            built to load fast and bring in customers.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#freelance-contact">
                Get a quote <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#pricing">See pricing</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
