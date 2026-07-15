import { Mail, Phone } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";

const channels = [
  {
    icon: Mail,
    label: "email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "phone",
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
  },
] as const;

export function FreelanceContact() {
  return (
    <section
      id="freelance-contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16"
    >
      <SectionHeading
        command="./contact.sh"
        title="Let's build something"
        description="Tell me about your business and what you need — I'll follow up with next steps and a quote."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-border bg-surface p-6 sm:p-7">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-3 font-mono text-sm"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-surface-2 text-muted transition-colors group-hover:text-accent">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block truncate text-text transition-colors group-hover:text-accent">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <TerminalWindow title="contact.sh">
            <ContactForm messagePlaceholder="Tell me about your business and what you're looking for." />
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
