export type PricingTier = {
  title: string;
  price: string;
  description: string;
  includes: readonly string[];
  cta: string;
  /** Highlighted tier — "Most Popular". */
  popular?: boolean;
};

/** Freelance pricing tiers — ported from the old site, restyled warm. */
export const pricingTiers: readonly PricingTier[] = [
  {
    title: "Business Website",
    price: "Starting at $750",
    description:
      "For simple, professional small-business sites that make it easy for people to find you and get in touch.",
    includes: [
      "3–5 page website",
      "Mobile-friendly design",
      "Contact form for calls and emails",
      "Google Maps and business information",
      "Clean, modern layout built for easy browsing",
    ],
    cta: "Get a Quote",
  },
  {
    title: "Growth Website",
    price: "Starting at $1,500",
    description:
      "For businesses that want a more custom design and stronger lead-generation structure.",
    includes: [
      "Everything in Business Website",
      "Custom design tailored to your business",
      "Conversion-focused layout",
      "Basic SEO setup",
      "Testimonials or reviews section",
      "Clear calls to action throughout the site",
    ],
    cta: "Get a Quote",
    popular: true,
  },
  {
    title: "Custom Software / Advanced Website",
    price: "Custom quote",
    description:
      "For businesses that need more than a standard website, with a more advanced or involved build.",
    includes: [
      "Advanced websites with custom scope",
      "Booking systems, forms, and connected tools",
      "Dashboards and internal tools",
      "Integrations and custom workflows",
      "Tracking or content guidance when the project calls for it",
    ],
    cta: "Request Custom Quote",
  },
] as const;

/** Support add-on shown below the three tiers. */
export const maintenanceTier = {
  title: "Maintenance & Hosting",
  price: "Starting at $99/month",
  description:
    "Ongoing hosting, updates, and support to keep your website running smoothly after launch.",
  includes: [
    "Hosting and routine website upkeep",
    "Software and security updates",
    "Text, photo, and small content edits",
    "Form checks and help when something needs attention",
  ],
  cta: "Ask About Maintenance",
} as const;
