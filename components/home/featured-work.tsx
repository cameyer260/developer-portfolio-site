import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/content/projects";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: Project }) {
  const { name, tagline, date, tech, links, bullets, featured } = project;

  return (
    <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs text-accent">{tagline}</p>
            {featured ? <Badge variant="muted">flagship</Badge> : null}
          </div>
          <h3
            className={cn(
              "mt-1.5 font-semibold tracking-tight",
              featured ? "text-2xl" : "text-xl",
            )}
          >
            {name}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted">{date}</span>
      </div>

      <ul
        className={cn(
          "mt-5 grid gap-2 text-sm text-text/85",
          featured && "sm:grid-cols-2 sm:gap-x-10",
        )}
      >
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5">
            <span aria-hidden className="mt-1 text-accent">
              ▸
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-5 font-mono text-sm">
          {links.live ? (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-accent transition-colors hover:text-accent/80"
            >
              live <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
          <a
            href={links.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <Github className="size-3.5" /> code
          </a>
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
      <div className="mt-10 grid gap-5 md:grid-cols-2">
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
