export type FaqItem = {
  question: string;
  answer: string;
};

/** Freelance page FAQ — pre-answers objections before the contact form. */
export const faq: readonly FaqItem[] = [
  {
    question: "What's included in the starting price?",
    answer:
      "A custom homepage, the core pages your business needs, a contact form, an embedded Google Map, and SEO basics so people can find you — all mobile-friendly and fast. Add-ons like booking, a blog, or custom design scale the price from there.",
  },
  {
    question: "How does billing work for maintenance changes?",
    answer:
      "Small, reasonable changes — swapping a photo, updating text, adding or removing a button — are included in the Hosting & Maintenance plan. Larger changes, like new pages or features, are quoted separately before I start.",
  },
  {
    question: "Do I own my website?",
    answer:
      "Yes. The site, its content, and its domain are yours. Hosting and maintenance plans keep things running smoothly, but you're never locked in.",
  },
  {
    question: "How long does a typical build take?",
    answer:
      "Most websites take 2–4 weeks from kickoff to launch, depending on scope and how quickly I get content and feedback from you. Custom software timelines vary and get scoped up front.",
  },
  {
    question: "What if I'm not sure which option I need?",
    answer:
      "That's normal — reach out with a quick description of your business and what you're trying to accomplish, and I'll help you figure out the right starting point.",
  },
] as const;
