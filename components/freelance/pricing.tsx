import Link from "next/link";
import { Check } from "lucide-react";
import {
  pricingTiers,
  maintenanceTier,
  type PricingTier,
} from "@/lib/content/pricing";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

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

function TierCard({ tier }: { tier: PricingTier }) {
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
        {tier.popular ? <Badge>Most Popular</Badge> : null}
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
        <Link href="/#contact">{tier.cta}</Link>
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
        description="Simple starting points for small-business websites, custom builds, and ongoing support."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => (
          <Reveal
            key={tier.title}
            delay={i * 0.06}
            className={cn("h-full", tier.popular && "lg:-translate-y-2")}
          >
            <TierCard tier={tier} />
          </Reveal>
        ))}
      </div>

      {/* Maintenance & Hosting — support add-on below the three tiers. */}
      <Reveal className="mt-5">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold">{maintenanceTier.title}</h3>
              <span className="font-mono text-sm text-accent">
                {maintenanceTier.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              {maintenanceTier.description}
            </p>
            <div className="mt-4">
              <IncludesList items={maintenanceTier.includes} />
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/#contact">{maintenanceTier.cta}</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
