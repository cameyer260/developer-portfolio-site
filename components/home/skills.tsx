import { skills } from "@/lib/content/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading command="cat skills.json" title="Skills" />

      <div className="mt-10 divide-y divide-border">
        {skills.map((group, i) => (
          <Reveal
            key={group.label}
            delay={i * 0.06}
            className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[180px_1fr] sm:gap-6"
          >
            <p className="font-mono text-sm text-muted">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item} className="px-2.5 py-1 text-sm text-text/90">
                  {item}
                </Tag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
