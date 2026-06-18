# Implementation Plan — Dev Portfolio Rebuild

Temporary build guidance for the current effort. See `CONTEXT.md` for project
language and `docs/adr/` for the decisions behind this plan
([0001](docs/adr/0001-builder-first-split-route-architecture.md),
[0002](docs/adr/0002-warm-dark-terminal-soul-visual-identity.md)). Once the site
ships, fold any durable guidance into proper docs and shrink/remove this file.

## 1. Goal

Rebuild Christopher Meyer's portfolio: same core content as the old site, updated to
match the current resume, with a revamped **warm-dark, terminal-soul** look. Leads
with the engineer/AI-builder identity (Recruiters), with a clean secondary track for
freelance Clients.

## 2. Stack & Tooling

- **Next.js (App Router) + TypeScript** — fresh build in this directory.
- **Tailwind CSS v4** (`@theme` tokens in `globals.css`).
- **Framer Motion** for animation.
- **next/font/google** for IBM Plex Mono + IBM Plex Sans.
- **lucide-react** for icons (already proven on old site).
- **@vercel/analytics** + `@next/third-parties` (port).
- **web3forms** for the contact form.
- Deploy: **Vercel** → christophermeyer.dev.

## 3. Design System

### Color tokens (warm-dark + amber)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#17130E` | page base (warm charcoal, NOT black) |
| `--surface` | `#1F1A12` | cards / raised surfaces |
| `--surface-2` | `#262019` | nested surfaces, inputs |
| `--text` | `#F5EFE6` | primary text (warm off-white) |
| `--muted` | `#8A7E6E` | secondary text, labels |
| `--accent` | `#F59E0B` | amber signature (links, CTAs, prompt) |
| `--accent-2` | `#E8703A` | burnt orange (sparingly: highlights) |
| `--border` | `rgba(245,239,230,0.08)` | hairline borders |

Single signature accent (amber). Burnt orange used rarely. No rainbow of per-card
accent colors like the old site.

### Typography
- **IBM Plex Mono** — display headings, section labels, prompts, tags, nav.
- **IBM Plex Sans** — body copy, descriptions.
- Mono is flavor on structure; body stays sans for readability.

### Motion (purposeful + signature moments)
- `Reveal` — staggered fade/translate-up on scroll (IntersectionObserver / Framer `whileInView`).
- `Typewriter` — types the hero `whoami` line; reusable.
- `Cursor` — blinking block cursor.
- Hover-lit buttons / cards (amber glow on hover), magnetic CTA optional.
- **Respect `prefers-reduced-motion`**: reveals become instant, typewriter prints full text.

## 4. File Structure

```
app/
  layout.tsx              # fonts, metadata, analytics, <Nav/> <Footer/>
  page.tsx                # homepage: composes section components
  globals.css             # @theme tokens + base styles
  freelance/page.tsx      # /freelance
  robots.ts
  sitemap.ts
components/
  layout/      nav.tsx (sticky terminal top bar), footer.tsx
  ui/          spotlight-card.tsx (ported + restyled), button.tsx, badge.tsx,
               terminal-window.tsx (window chrome), tag.tsx
  motion/      reveal.tsx, typewriter.tsx, cursor.tsx
  home/        hero.tsx, about.tsx, featured-work.tsx, experience.tsx,
               skills.tsx, education-resume.tsx, beyond-the-code.tsx, contact.tsx
  freelance/   freelance-hero.tsx, pricing.tsx
lib/
  utils.ts                # cn() etc. (ported)
  content/                # config-driven content (typed)
    profile.ts            # name, tagline, location, contact, socials
    projects.ts           # Featured Work
    experience.ts
    skills.ts
    education.ts
    pricing.ts            # freelance tiers + maintenance
public/
  christopher-meyer.webp           # compress < 300KB
  christopher-meyer-resume.pdf     # copy LATEST from resume dir (see Assets)
  favicon.ico, og-image.png        # regenerate for warm identity (reuse short-term)
```

Content is config-driven in `lib/content/*` (per old `AGENTS.md` preference), so copy
edits don't require touching components.

## 5. Routes

- `/` — engineer portfolio (indexable).
- `/freelance` — Services & Pricing; future home of the rebuilt examples gallery (indexable, targets Edwardsville / St. Louis local terms).
- `/robots.txt`, `/sitemap.xml` — both routes indexable. No `/examples` noindex logic (gallery is gone for now).

## 6. Content

### Profile / Hero
- **Name:** Christopher Meyer · **Location:** Edwardsville, IL / St. Louis area.
- **`whoami` line (typed):** "Software engineer building AI agents & full-stack products."
- **Status:** Currently SWE Intern @ Zipper · open to Summer 2027 SWE internships & freelance.
- **Two doors:** `[ hiring? ]` → Featured Work / resume · `[ need a website? ]` → `/freelance`.

### About (with photo)
- Short bio in terminal voice (`> cat about.md`): CS student at SIUE building AI agents and full-stack products; freelance for local businesses. Photo (`christopher-meyer.webp`) lives here, not the hero.

### Featured Work (3 — match resume)
1. **Site Builder** — Autonomous Agent CLI · Jun 2026 · *TypeScript, Bun, Claude, Astro, Cloudflare Pages, Playwright* · Code: github.com/cameyer260/site-builder · **GitHub-linked only (no live URL).** Large bento card (identity-bridging flagship). Bullets: single-command URL→deployed prototype outreach engine; six-stage agent pipeline (init→ingest→synthesize→generate→audit→deploy); axe-core + Lighthouse gating, Cloudflare Pages deploy.
2. **StafferAI** — Multi-Tenant AI Knowledge Platform · Mar 2026 · *Next.js, OpenAI, Supabase, pgvector, Stripe* · Live: stafferai.app · Code: github.com/cameyer260/stafferai-public. Bullets: production multi-tenant RAG with citations; org-scoped pgvector retrieval + Supabase Auth/RLS/RBAC; ingestion pipeline + Stripe subscriptions + per-tenant rate limiting.
3. **PlaySkillSphere** · Jul 2025 · *React, Next.js, WebSockets, Supabase, VPS* · Live: playskillsphere.com · Code: github.com/cameyer260/skillsphere. Bullets: real-time multiplayer with live lobbies over WebSockets; responsive Next.js + Supabase backend/auth.

### Experience (2 — Dewey's dropped)
1. **Zipper** — Software Engineer Intern · Mar 2026–Present · Remote. Bullets: shipped 50+ features/fixes across an AI OS for fitness centers (CRM, Stripe, scheduling, staff mgmt); extended an autonomous agentic pipeline drafting end-to-end code changes verified against live dev servers; owned QA/code review of agent-generated PRs through CI/CD to staging/prod.
2. **Freelance Software Developer** — Self-Employed · 2025–Present · Remote. Bullets: designed/built/deployed custom sites for local businesses end-to-end (5-star reviews); sourced/onboarded clients; expanding toward custom AI operating systems + marketing automation.

### Skills (resume's fuller list — mono tags, no emoji)
- **Languages:** TypeScript, Python, Java, C++, Rust, PHP, SQL, HTML/CSS
- **Frameworks/Tech:** React/Next.js, Node, Express, NestJS, Supabase, Stripe, MongoDB
- **Tools:** Claude Code, Neovim, Git, GitHub, Docker, Cloudflare, AWS, SSH, Unix

### Education + Resume (slim)
- SIUE · B.S. Computer Science, Minor in Mathematics · Aug 2024 – Fall 2027 · Edwardsville, IL
- GPA 3.57/4 · Scholarships: Cougar Pride, Johnetta Haley
- Coursework: Algorithms & Data Structures, Operating Systems, Database & Web System Development, Programming Languages, Computer Organization & Architecture, Linear Algebra
- Buttons: **Download PDF** / **Open PDF** (`/christopher-meyer-resume.pdf`).

### Beyond the Code
- Golfing · Music (rock, rap, R&B).

### Contact (terminal form — `contact.sh`)
- Email: cameyer06@gmail.com · Phone: **(314) 529-1949** (Google Voice — intentional; see memory/ADR 0001) · GitHub: github.com/cameyer260 · LinkedIn: linkedin.com/in/cameyer06.
- Port the web3forms `contact.sh` form; move the access key to an env var (`NEXT_PUBLIC_WEB3FORMS_KEY`) instead of hardcoding.

### /freelance
- Short freelance hero/intro (local businesses, Edwardsville/St. Louis).
- **Pricing tiers** (port from old site): Business Website ($750+), Growth Website ($1,500+, "Most Popular"), Custom Software / Advanced Website (Custom quote); plus **Maintenance & Hosting** ($99/mo) as a support add-on below the three. Restyle warm. CTA → contact.

## 7. Build Phases

- **Phase 0 — Scaffold:** init Next.js + TS + Tailwind v4 here; install deps; wire IBM Plex via `next/font`; `globals.css` tokens; base `layout.tsx`. Run `npm install` (container uses its own `node_modules`).
- **Phase 1 — Design system:** color/type tokens, motion primitives (`Reveal`, `Typewriter`, `Cursor`), port + restyle `SpotlightCard`, `button`, `tag`, `terminal-window`; sticky terminal `Nav` + `Footer`.
- **Phase 2 — Content data + Hero + About:** populate `lib/content/*`; build Hero (typewriter whoami, two doors) and About (bio + photo).
- **Phase 3 — Featured Work + Experience.**
- **Phase 4 — Skills + Education/Resume + Beyond the Code + Contact** (port form, env key).
- **Phase 5 — /freelance** (hero + pricing).
- **Phase 6 — Motion + responsive pass:** signature moments, staggered reveals, hover states; mobile layouts; `prefers-reduced-motion`.
- **Phase 7 — SEO/metadata:** per-route metadata, OG image (regenerate warm), favicon, `sitemap.ts`, `robots.ts`, analytics.
- **Phase 8 — Verify:** `npm run build` + `lint`; Playwright screenshots desktop + mobile; check both routes; Lighthouse sanity.
- **Phase 9 — Deploy:** Vercel; point christophermeyer.dev at the new deployment.

## 8. Assets

- **Resume PDF:** copy the LATEST from `~/Documents/important-files/resume/RESUME.pdf` → `public/christopher-meyer-resume.pdf` (the old repo's copy may be stale). NB: `RESUME.md` in that dir is actually LaTeX source, not the artifact.
- **Photo:** copy `christopher-meyer.webp` from old repo `public/`; **recompress** (1.4 MB → target < 300 KB).
- **favicon.ico / og-image.png:** reuse old short-term; regenerate to match the warm identity before launch.

## 9. Deferred to Build (not blockers)

- Per-section layout (bento vs. stacked) and exact motion choreography.
- OG image + favicon redesign.
- Whether `/freelance` gets its own inline contact or links back to the homepage form.

## 10. Out of Scope (this rebuild)

- Examples gallery (`/examples`, `lib/examples`, `components/templates`) — returns later under `/freelance`.
- DocuQuery, Dewey's Pizza, campus involvement (CAOS/SigEp) — removed.
