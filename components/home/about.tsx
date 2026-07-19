import Image from "next/image";
import { profile } from "@/lib/content/profile";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/christopher-meyer.webp"
              alt="Christopher Meyer"
              width={1200}
              height={801}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover"
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
            <div className="mt-4 space-y-4 text-text/90">
              <p>
                I&apos;m a Computer Science student at SIUE who enjoys building
                practical, full-stack products. Right now, I&apos;m a software
                engineering intern at{" "}
                {profile.status.current.replace("SWE Intern @ ", "")}, where I
                ship features for an all-in-one platform that helps Pilates
                studios manage clients, staff, classes, events, bookings, and
                payments.
              </p>
              <p>
                On the side, I freelance for local businesses around Edwardsville
                and the St. Louis area—designing, building, and deploying websites
                and custom software from start to finish. I care about solving real
                problems, owning my work end to end, and shipping software people
                actually use.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
