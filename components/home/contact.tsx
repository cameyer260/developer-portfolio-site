"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type Web3FormsResponse = { success: boolean };

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

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

const inputClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/70 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data: Web3FormsResponse = await response.json();
      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading
        command="./contact.sh"
        title="Get in touch"
        description="Open to Summer 2027 SWE internships and freelance work. Drop a line."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-border bg-surface p-6 sm:p-7">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
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
            {submitted ? (
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-6 text-center">
                <p className="font-mono text-sm text-accent">
                  ✓ message sent
                </p>
                <p className="mt-2 text-sm text-muted">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5"
                  onClick={() => setSubmitted(false)}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted">
                    name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted">
                    email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-mono text-xs text-muted">
                    message
                  </label>
                  <textarea
                    name="message"
                    required
                    placeholder="Let's build something."
                    className={`${inputClass} min-h-[130px] resize-y`}
                  />
                </div>

                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />

                <div className="flex items-center justify-between gap-4 sm:col-span-2">
                  <p className="text-xs text-muted">
                    or email{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-accent hover:underline"
                    >
                      directly
                    </a>
                  </p>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending…" : "Send"} <ArrowRight />
                  </Button>
                </div>

                {error ? (
                  <p className="font-mono text-sm text-accent-2 sm:col-span-2">
                    ✗ something went wrong — try again or email directly.
                  </p>
                ) : null}
              </form>
            )}
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
