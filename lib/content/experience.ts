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
    period: "Mar 2026 – Present",
    location: "Remote",
    bullets: [
      "Shipped 50+ features and fixes across an AI OS for fitness centers — CRM, Stripe, scheduling and staff management.",
      "Extended an autonomous agentic pipeline that drafts end-to-end code changes, verified against live dev servers.",
      "Owned QA and code review of agent-generated PRs through CI/CD to staging and production.",
    ],
  },
  {
    company: "Self-Employed",
    title: "Freelance Software Developer",
    period: "2025 – Present",
    location: "Remote",
    bullets: [
      "Designed, built and deployed custom sites for local businesses end-to-end, earning 5-star reviews.",
      "Sourced and onboarded clients directly.",
      "Expanding toward custom AI operating systems and marketing automation.",
    ],
  },
] as const;
