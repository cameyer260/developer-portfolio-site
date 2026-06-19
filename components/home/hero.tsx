import Link from "next/link";
import { ArrowRight, Briefcase, Globe } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Typewriter } from "@/components/motion/typewriter";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* faint amber glow flourish */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
        <Reveal>
          <Badge>
            <span className="size-1.5 rounded-full bg-accent" />
            open to {profile.status.openTo}
          </Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
        </Reveal>

        <div className="mt-6 font-mono text-lg sm:text-2xl">
          <span className="text-muted">$ whoami</span>
          <div className="mt-2 flex">
            <span className="mr-2 text-accent">→</span>
            <Typewriter text={profile.whoami} className="text-text" />
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-muted">
            Currently {profile.status.current}, based in {profile.location}.
          </p>
        </Reveal>

        {/* Two doors — split the two audiences. See ADR 0001. */}
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="#work">
                <Briefcase /> [ hiring? ] <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/freelance">
                <Globe /> [ need a website? ]
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
