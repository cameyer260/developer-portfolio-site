export type Offering = {
  title: string;
  price: string;
  description: string;
  includes: readonly string[];
  /** Short scaling caption shown under the includes list. */
  note?: string;
  cta: string;
};

/** The two channels of freelance work — website vs. custom software. */
export const offerings: readonly Offering[] = [
  {
    title: "Website",
    price: "Starting at $499",
    description:
      "A fast, professional website that makes it easy for people to find you and get in touch.",
    includes: [
      "Custom homepage + the core pages you need",
      "Strong SEO so you show up on Google",
      "Email contact form that reaches you directly",
      "Embedded Google Map and business info",
      "Mobile-friendly, fast-loading design",
    ],
    note: "Need more — booking, a blog, custom design? I can add it, with cost scaling to match.",
    cta: "Get a Quote",
  },
  {
    title: "Custom Software",
    price: "Custom quote",
    description:
      "For projects that go beyond a standard website. Scope varies a lot, so every build starts with a conversation.",
    includes: [
      "Web apps and customer portals",
      "Booking, scheduling, and payment flows",
      "Dashboards and internal tools",
      "Integrations with the tools you already use",
      "Custom workflows scoped to your business",
    ],
    cta: "Request a Quote",
  },
] as const;

export type SupportTier = {
  title: string;
  price: string;
  description: string;
  includes: readonly string[];
  cta: string;
  /** Highlighted tier — "Recommended". */
  popular?: boolean;
};

/** Post-launch support tiers, shown below the offerings. */
export const supportTiers: readonly SupportTier[] = [
  {
    title: "Hosting",
    price: "$25/month",
    description:
      "Reliable hosting to keep your site online, secure, and up to date.",
    includes: [
      "Fast, secure hosting with SSL",
      "Software and security updates",
      "Bug fixes included",
    ],
    cta: "Ask About Hosting",
  },
  {
    title: "Hosting & Maintenance",
    price: "$100/month",
    description:
      "Hosting plus ongoing small edits, so your site stays current without you touching code.",
    includes: [
      "Everything in Hosting",
      "Small content changes — swap an image or text, add a button, remove something",
      "Larger changes quoted separately",
    ],
    cta: "Ask About Maintenance",
    popular: true,
  },
] as const;
