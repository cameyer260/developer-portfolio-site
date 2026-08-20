export type Project = {
  name: string;
  tagline: string;
  date: string;
  tech: readonly string[];
  links: {
    live?: string;
    code: string;
  };
  bullets: readonly string[];
  /** The identity-bridging flagship rendered as the large bento card. */
  featured?: boolean;
};

/** Featured Work — three flagship projects, matched to the resume. */
export const projects: readonly Project[] = [
  {
    name: "Site Builder",
    tagline: "CLI tool that builds and deploys prototype sites",
    date: "Jun 2026",
    tech: ["TypeScript", "Bun", "Claude", "Astro", "Cloudflare Pages", "Playwright"],
    links: {
      code: "https://github.com/cameyer260/site-builder",
    },
    bullets: [
      "CLI tool that builds and deploys prototype sites for prospective clients.",
      "Takes a prospective client’s URL, documents, or notes and returns a working, deployed prototype website in under 20 minutes.",
      "Gates on site quality through an agentic review/fix pass, plus passing accessibility and Lighthouse score metrics.",
      "Returns a live URL on Cloudflare Pages, making client outreach seamless.",
    ],
    featured: true,
  },
  {
    name: "StafferAI",
    tagline: "Multi-Tenant RAG Application",
    date: "Mar 2026",
    tech: ["Next.js", "OpenAI", "Supabase", "pgvector", "Stripe"],
    links: {
      live: "https://stafferai.app",
      code: "https://github.com/cameyer260/stafferai-public",
    },
    bullets: [
      "Production, multi-tenant AI knowledge platform enabling teams to query internal documents with source-grounded responses and citations.",
      "Org-scoped pgvector retrieval over Supabase Auth, RLS and RBAC.",
      "Ingestion pipeline, Stripe subscriptions and per-tenant rate limiting.",
    ],
  },
  {
    name: "PlaySkillSphere",
    tagline: "Real-Time Multiplayer Platform",
    date: "Jul 2025",
    tech: ["React", "Next.js", "WebSockets", "Supabase", "VPS"],
    links: {
      live: "https://playskillsphere.com",
      code: "https://github.com/cameyer260/skillsphere",
    },
    bullets: [
      "Real-time multiplayer games platform with live lobbies over WebSockets.",
      "Responsive Next.js frontend with a Supabase backend and auth.",
    ],
  },
] as const;
