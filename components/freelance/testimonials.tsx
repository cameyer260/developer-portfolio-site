import { ArrowUpRight, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content/testimonials";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** "Melissa Meske" -> "MM". Falls back to the first character. */
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

/** "https://www.milestogohelps.org/" -> "milestogohelps.org". */
function displayHost(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i < rating ? "fill-accent text-accent" : "fill-none text-border",
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, role, company, companyUrl, projectSummary, rating } =
    testimonial;

  return (
    <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
      <StarRating rating={rating} />

      <figure className="mt-5 flex flex-1 flex-col">
        <blockquote className="text-lg leading-relaxed text-text/95">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <figcaption className="mt-6 flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-sm font-medium text-accent"
          >
            {initialsFrom(name)}
          </span>
          <span className="flex flex-col">
            <span className="font-medium text-text">{name}</span>
            <span className="font-mono text-xs text-muted">
              {role} · {company}
            </span>
          </span>
        </figcaption>
      </figure>

      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-4 font-mono text-sm">
        <span className="text-muted">Built a {projectSummary} ·</span>
        {companyUrl ? (
          <a
            href={companyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent transition-colors hover:text-accent/80"
          >
            {displayHost(companyUrl)}
            <ArrowUpRight className="size-3.5" />
          </a>
        ) : null}
      </div>
    </SpotlightCard>
  );
}

export function Testimonials() {
  const single = testimonials.length === 1;

  return (
    <section
      id="reviews"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16"
    >
      <SectionHeading
        command="cat testimonials.md"
        title="Client Reviews"
        description="Feedback from the businesses I build for."
      />

      <div
        className={cn(
          "mt-10 grid gap-5",
          single ? "max-w-2xl" : "md:grid-cols-2",
        )}
      >
        {testimonials.map((testimonial, i) => (
          <Reveal key={testimonial.name} delay={i * 0.06} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
