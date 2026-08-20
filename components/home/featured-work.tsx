import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/content/projects";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: Project }) {
  const { name, tagline, date, tech, links, bullets, featured } = project;
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <SpotlightCard className="flex h-full flex-col p-0">
      {/* Terminal Window Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-surface-2/80 px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2.5 shrink-0 rounded-full bg-accent-2/80" aria-hidden />
          <span className="size-2.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
          <span className="size-2.5 shrink-0 rounded-full bg-muted/40" aria-hidden />
          <span className="ml-1.5 truncate font-mono text-xs text-muted">
            ~/projects/{slug}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-xs text-muted">{date}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
            {tagline}
          </p>
          <h3
            className={cn(
              "mt-2 font-bold tracking-tight text-text",
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {name}
          </h3>
        </div>

        <ul
          className={cn(
            "mt-6 grid gap-3 text-[15px] leading-relaxed text-text/90 sm:text-base",
            featured && "sm:grid-cols-2 sm:gap-x-10",
          )}
        >
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5">
              <span aria-hidden className="mt-1 font-bold text-accent">
                ▸
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {links.live ? (
              <Button asChild size="sm" variant="primary">
                <a href={links.live} target="_blank" rel="noreferrer">
                  <ArrowUpRight className="size-4" /> Live Site
                </a>
              </Button>
            ) : null}
            <Button asChild size="sm" variant="outline">
              <a href={links.code} target="_blank" rel="noreferrer">
                <Github className="size-4" /> Code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading
        command="ls ~/featured-work"
        title="Featured Work"
        description="Three flagship projects — autonomous agents, production RAG, and real-time apps."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={i * 0.06}
            className={cn("h-full", project.featured && "md:col-span-2")}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
