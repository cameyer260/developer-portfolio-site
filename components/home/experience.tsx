import { experience } from "@/lib/content/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading command="cat experience.log" title="Experience" />

      <ol className="mt-10 space-y-10 border-l border-border pl-6 sm:pl-8">
        {experience.map((role, i) => (
          <Reveal as="li" key={role.company} delay={i * 0.06} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[1.6rem] size-3 rounded-full bg-accent ring-4 ring-bg sm:-left-[2.15rem]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-bold text-text">
                {role.title}{" "}
                <span className="font-semibold text-accent">@ {role.company}</span>
              </h3>
              <span className="font-mono text-xs text-muted sm:text-sm">{role.period}</span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted sm:text-sm">{role.location}</p>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-text/90 sm:text-base">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-1 font-bold text-accent">
                    ▸
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
