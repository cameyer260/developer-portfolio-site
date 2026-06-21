import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function BeyondTheCode() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
      <SectionHeading command="cat ~/.beyond" title="Beyond the Code" />

      <Reveal delay={0.08}>
        <div className="mt-8 max-w-2xl">
          <p className="font-mono text-sm text-accent">&gt; cat beyond.md</p>
          <div className="mt-4 space-y-4 text-text/90">
            <p>
              Outside of work I like to hang out with friends and stay active.
              I go to the gym regularly, bike, and run. I also really enjoy 
              traveling, especially to outdoorsy places like national parks. 
              When I&apos;m staying in, I like to read, watch movies, and listen
              to music.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
