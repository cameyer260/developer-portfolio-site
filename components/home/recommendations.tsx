import { ArrowUpRight } from "lucide-react";
import {
  recommendations,
  type Recommendation,
} from "@/lib/content/recommendations";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** "Kerry Ritter" -> "KR". Falls back to the first character. */
function initialsFrom(name: string) {
  return (
    name
      .split(/\s+/)
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || name.slice(0, 1).toUpperCase()
  );
}

function RecommendationCard({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const {
    quote,
    title,
    name,
    role,
    company,
    relationship,
    date,
    url,
    fullQuote,
  } = recommendation;

  return (
    <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
      <p className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
        {title}
      </p>

      <figure className="mt-4 flex flex-1 flex-col">
        <blockquote className="text-lg leading-relaxed text-text sm:text-xl">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <figcaption className="mt-6 flex items-center gap-3.5">
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/15 font-mono text-sm font-bold text-accent"
          >
            {initialsFrom(name)}
          </span>
          <span className="flex flex-col">
            <span className="font-semibold text-text">{name}</span>
            <span className="font-mono text-xs text-muted sm:text-sm">
              {role}, {company}
            </span>
            <span className="mt-0.5 font-mono text-xs text-muted">
              {relationship} · {date}
            </span>
          </span>
        </figcaption>
      </figure>

      <details className="group mt-6 border-t border-border pt-4">
        <summary className="cursor-pointer list-none font-mono text-sm font-medium text-accent transition-colors hover:text-accent/80 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="font-bold transition-transform group-open:rotate-90"
            >
              ▸
            </span>
            Read full recommendation
          </span>
        </summary>
        <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-text/90 sm:text-base">
          {fullQuote}
        </p>
      </details>

      <div className="mt-5 font-mono text-sm">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent/80 hover:underline"
        >
          View on LinkedIn
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </SpotlightCard>
  );
}

export function Recommendations() {
  const single = recommendations.length === 1;

  return (
    <section
      id="recommendations"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading
        command="cat recommendations.md"
        title="Recommendations"
        description="Feedback from people I've worked with."
      />

      <div
        className={cn(
          "mt-10 grid gap-5",
          single ? "max-w-2xl" : "md:grid-cols-2",
        )}
      >
        {recommendations.map((recommendation, i) => (
          <Reveal
            key={recommendation.name}
            delay={i * 0.06}
            className="h-full"
          >
            <RecommendationCard recommendation={recommendation} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
