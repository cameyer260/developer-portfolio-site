import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";

const channels = [
  { icon: Mail, label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  {
    icon: Github,
    label: "github",
    value: "github.com/cameyer260",
    href: profile.socials.github,
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: "in/cameyer06",
    href: profile.socials.linkedin,
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading
        command="./contact.sh"
        title="Get in touch"
        description={`Open to ${profile.status.openTo}. Drop a line.`}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center gap-3.5 font-mono text-sm"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                    {label}
                  </span>
                  <span className="block truncate font-mono text-sm font-medium text-text transition-colors group-hover:text-accent sm:text-base">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <TerminalWindow title="contact.sh">
            <ContactForm />
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
