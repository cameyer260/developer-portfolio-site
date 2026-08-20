export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: readonly string[];
};

export const experience: readonly Role[] = [
  {
    company: "Zipper",
    title: "Software Engineer Intern",
    period: "Mar 2026 – Aug 2026",
    location: "Remote",
    bullets: [
      "Shipped 50+ features and bug fixes across a studio management platform for boutique fitness studios, spanning a full-stack TypeScript codebase covering CRM, Stripe payments, scheduling, and staff management.",
      "Extended an autonomous, agentic AI pipeline that drafts end-to-end code changes, advancing draft tickets to a runnable state and verifying them against live dev servers and the running web app.",
      "Owned delivery of agent-assisted changes from incomplete tickets to production: investigated the application and codebase, designed implementation approaches, directed and iterated on fixes for security, architecture, functionality, code quality, and UI/UX, and validated releases through CI/CD.",
    ],
  },
  {
    company: "Self-Employed",
    title: "Freelance Software Developer",
    period: "2025 – Present",
    location: "Remote",
    bullets: [
      "Designed, built, and deployed custom websites for local business owners end-to-end, earning 5-star client reviews.",
      "Sourced and onboarded clients directly, delivering tailored full-stack sites; expanding the practice toward custom software systems that integrate or replace fragmented business tools and extend marketing automation.",
    ],
  },
] as const;
