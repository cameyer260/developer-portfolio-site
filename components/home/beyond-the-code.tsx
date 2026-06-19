import { profile } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function BeyondTheCode() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
      <SectionHeading command="cat ~/.beyond" title="Beyond the Code" />

      <Reveal className="mt-8">
        <div className="flex flex-wrap gap-3">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text/90"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {interest}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
