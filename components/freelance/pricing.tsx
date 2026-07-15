import Link from "next/link";
import { Check } from "lucide-react";
import {
  offerings,
  supportTiers,
  type Offering,
  type SupportTier,
} from "@/lib/content/pricing";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const CONTACT_HREF = "#freelance-contact";

function IncludesList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5 text-sm text-text/85">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function OfferingCard({ offering }: { offering: Offering }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
      <h3 className="text-lg font-semibold">{offering.title}</h3>
      <p className="mt-3 font-mono text-xl text-accent">{offering.price}</p>
      <p className="mt-3 text-sm text-muted">{offering.description}</p>

      <div className="mt-6 flex-1">
        <IncludesList items={offering.includes} />
      </div>

      {offering.note ? (
        <p className="mt-5 text-xs text-muted italic">{offering.note}</p>
      ) : null}

      <Button asChild className="mt-7 w-full">
        <Link href={CONTACT_HREF}>{offering.cta}</Link>
      </Button>
    </SpotlightCard>
  );
}

function SupportTierCard({ tier }: { tier: SupportTier }) {
  return (
    <SpotlightCard
      className={cn(
        "flex h-full flex-col p-6 sm:p-7",
        tier.popular && "border-accent/40",
      )}
      surfaceClassName={cn(
        "bg-surface border border-border",
        tier.popular && "bg-surface border-accent/40",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{tier.title}</h3>
        {tier.popular ? <Badge>Recommended</Badge> : null}
      </div>
      <p className="mt-3 font-mono text-xl text-accent">{tier.price}</p>
      <p className="mt-3 text-sm text-muted">{tier.description}</p>

      <div className="mt-6 flex-1">
        <IncludesList items={tier.includes} />
      </div>

      <Button
        asChild
        variant={tier.popular ? "primary" : "outline"}
        className="mt-7 w-full"
      >
        <Link href={CONTACT_HREF}>{tier.cta}</Link>
      </Button>
    </SpotlightCard>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16"
    >
      <SectionHeading
        command="cat pricing.md"
        title="Services & Pricing"
        description="Two ways to work together — a website built to convert, or custom software for what a website can't do."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {offerings.map((offering, i) => (
          <Reveal key={offering.title} delay={i * 0.06} className="h-full">
            <OfferingCard offering={offering} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 max-w-2xl">
        <p className="font-mono text-sm text-accent">
          <span className="text-muted">$</span> cat support.md
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          After launch
        </h3>
        <p className="mt-2 text-sm text-muted">
          Every site needs upkeep. Pick the level of hands-on support that
          fits.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {supportTiers.map((tier, i) => (
          <Reveal key={tier.title} delay={i * 0.06} className="h-full">
            <SupportTierCard tier={tier} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
