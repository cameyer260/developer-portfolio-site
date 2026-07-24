"use client";

import { FormEvent, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { profile } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";

type Web3FormsResponse = { success: boolean };

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const inputClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/70 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

interface ContactFormProps {
  /** Placeholder text for the message textarea. */
  messagePlaceholder?: string;
}

/** Shared web3forms contact form — used on the home and freelance pages. */
export function ContactForm({
  messagePlaceholder = "Let's build something.",
}: ContactFormProps) {
  const formId = useId();
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

  if (submitted) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/10 p-6 text-center">
        <p className="font-mono text-sm text-accent">✓ message sent</p>
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
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor={`${formId}-name`}
          className="mb-1.5 block font-mono text-xs text-muted"
        >
          name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Ada Lovelace"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor={`${formId}-email`}
          className="mb-1.5 block font-mono text-xs text-muted"
        >
          email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor={`${formId}-message`}
          className="mb-1.5 block font-mono text-xs text-muted"
        >
          message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          placeholder={messagePlaceholder}
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
        <p
          role="alert"
          className="font-mono text-sm text-accent-2 sm:col-span-2"
        >
          ✗ something went wrong — try again or email directly.
        </p>
      ) : null}
    </form>
  );
}
