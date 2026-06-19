import { Download, ExternalLink } from "lucide-react";
import { education } from "@/lib/content/education";
import { profile } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function EducationResume() {
  return (
    <section
      id="education"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading command="cat education.md" title="Education" />

      <Reveal className="mt-10">
        <SpotlightCard className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div>
              <h3 className="text-lg font-semibold">{education.school}</h3>
              <p className="mt-1 font-mono text-sm text-accent">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted">
                {education.location} · GPA {education.gpa}
              </p>
            </div>
            <span className="font-mono text-xs text-muted">
              {education.period}
            </span>
          </div>

          <div className="mt-6">
            <p className="font-mono text-xs text-muted">scholarships</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {education.scholarships.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="font-mono text-xs text-muted">relevant coursework</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href={profile.resume} download>
                <Download /> Download résumé
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={profile.resume} target="_blank" rel="noreferrer">
                <ExternalLink /> Open PDF
              </a>
            </Button>
          </div>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}
