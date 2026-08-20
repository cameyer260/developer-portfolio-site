import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-stretch md:gap-12">
        <Reveal className="md:h-full">
          <figure className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/christopher-meyer.webp"
              alt="Christopher Meyer"
              width={1200}
              height={801}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="min-h-0 w-full flex-1 object-cover"
              priority
            />
            <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
              ~/christopher-meyer.webp
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <p className="font-mono text-sm text-accent">&gt; cat about.md</p>
            <div className="mt-4 space-y-5 text-lg text-text/90">
              <p>
                Hello all! I&apos;m Christopher Meyer, a computer science student
                at SIUE expected to graduate in Winter of 2027. I am open to Software
                Engineering internships in Winter/Spring, Summer, and Fall of 2027
                as well as freelance software development opportunities.
              </p>
              <p>
                This past summer, I worked as a Software Engineering Intern at{" "}
                <a
                  href="https://www.joinzipper.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  Zipper
                </a>
                , a studio management platform for boutique
                fitness studios. In addition to that, within the past year I&apos;ve
                worked with multiple clients of local businesses to develop, host,
                and maintain websites, and I am open to working with more! I can
                build websites, applications, internal software tooling, APIs, etc.
                If you are
                someone looking for a developer—be that for a website or to help
                replace an internal software tool or system that you are frustrated
                with—feel free to reach out! Working with me, you get a tool
                built to do exactly what you want. No signing up, managing, and
                wrangling a generic product—I build it, host it, and maintain it
                for you, so all you have to do is use it.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
