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
    tagline: "Autonomous Agent CLI",
    date: "Jun 2026",
    tech: ["TypeScript", "Bun", "Claude", "Astro", "Cloudflare Pages", "Playwright"],
    links: {
      code: "https://github.com/cameyer260/site-builder",
    },
    bullets: [
      "Single command turns a URL into a deployed prototype for outreach.",
      "Six-stage agent pipeline: init → ingest → synthesize → generate → audit → deploy.",
      "axe-core + Lighthouse quality gating, shipped to Cloudflare Pages.",
    ],
    featured: true,
  },
  {
    name: "StafferAI",
    tagline: "Multi-Tenant AI Knowledge Platform",
    date: "Mar 2026",
    tech: ["Next.js", "OpenAI", "Supabase", "pgvector", "Stripe"],
    links: {
      live: "https://stafferai.app",
      code: "https://github.com/cameyer260/stafferai-public",
    },
    bullets: [
      "Production multi-tenant RAG with grounded citations.",
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
      "Real-time multiplayer with live lobbies over WebSockets.",
      "Responsive Next.js frontend with a Supabase backend and auth.",
    ],
  },
] as const;
