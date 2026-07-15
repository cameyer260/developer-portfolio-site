import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/content/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16"
    >
      <SectionHeading
        command="cat faq.md"
        title="Frequently Asked Questions"
        description="Common questions before reaching out."
      />

      <div className="mt-10 max-w-3xl space-y-3">
        {faq.map((item, i) => (
          <Reveal key={item.question} delay={i * 0.05}>
            <details className="group rounded-xl border border-border bg-surface p-5 open:border-accent/30 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-text marker:content-none">
                {item.question}
                <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-accent" />
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
