# Architecture

How christophermeyer.dev is built and deployed. For behavior, see [PRD.md](./PRD.md).

> A full rewrite is planned. Items marked `[Planned]` are agreed but not built. See
> [changes/static-site-rewrite.md](./changes/static-site-rewrite.md) for the full
> design.

## Current: Next.js on Vercel

- **Framework:** Next.js 16 (App Router), React 19, TypeScript (strict). Server
  Components by default. `"use client"` only for motion, the spotlight card and the
  contact form.
- **Pages:** `app/page.tsx` (`/`) and `app/freelance/page.tsx` (`/freelance`) compose
  section components from `components/home/` and `components/freelance/`.
  `app/layout.tsx` holds fonts, global metadata, JSON-LD, nav, footer and analytics.
- **Content layer:** all copy lives in typed `as const` modules under `lib/content/`.
  Components only handle presentation.
- **Styling:** Tailwind v4 with CSS-first tokens in the `@theme` block of
  `app/globals.css`. UI primitives in `components/ui/` use CVA and `cn()`.
- **Motion:** framer-motion (`components/motion/`), gated on
  `prefers-reduced-motion`.
- **SEO:** metadata, OG, Twitter and JSON-LD (`Person` + `ProfessionalService`) in
  `app/layout.tsx`, overridden per page in `/freelance`. `app/sitemap.ts` and
  `app/robots.ts` generate the sitemap and robots files.
- **Contact:** browser-side POST to Web3Forms using `NEXT_PUBLIC_WEB3FORMS_KEY`.
- **Hosting:** Vercel, Git-connected. The apex 308-redirects to `www`. DNS for the
  domain is on Cloudflare.

## [Planned] Static site on Cloudflare Pages

- **No build step and no framework:** hand-written HTML in `site/` (`index.html`,
  `freelance/index.html`, `404.html`), deployed as-is.
- **CSS:** plain CSS in cascade layers
  (`reset, tokens, base, layout, components, sections, utilities`), loaded through
  ordered `<link>` tags. Design tokens are custom properties. Classes are BEM-style
  components.
- **JS:** ES modules. Each feature exports `init(root)`, and `js/main.js` runs them
  from `htmx.onLoad`, which covers the first load and every page swap. Every motion
  feature respects `prefers-reduced-motion`.
- **htmx:** vendored and version-pinned, used only for `hx-boost` + `head-support`
  (smooth page swaps over real links). The resume PDF link and contact forms opt out
  of boosting.
- **Shared markup:** `<head>`, nav, footer and the contact form are duplicated per
  page, wrapped in `<!-- shared:name -->` markers.
- **Hosting:** Cloudflare Pages, Git-connected (production branch `main`, output dir
  `site`, no build command). `_headers` sets caching and security headers. The owner
  handles deployment; development is local only.
- **Analytics:** Cloudflare Web Analytics.
- **Local dev:** `npx wrangler pages dev site`.

## Decisions and why

- **Two routes for two audiences.** The homepage leads with the engineer identity for
  recruiters. All commercial freelance content (services, pricing) lives on
  `/freelance`, which can also target local-business SEO.
  - Rejected: a freelance-first single page (undersold the engineering), a
    recruiter/client toggle (more to build, a muddier message), and one long page
    (recruiters would scroll past pricing).
- **Warm-dark, terminal-soul identity.** A warm-dark base, warm off-white text, an
  amber signature and a burnt-orange accent. IBM Plex Mono for display and labels,
  IBM Plex Sans for body. Purposeful motion with a few signature terminal moments.
  - Rejected: cool AI-tech slate/indigo (common), light paper-terminal (riskier), a
    full terminal/IDE metaphor (gimmicky, hard to skim) and maximalist motion
    (distracting).
  - Terminal is flavor, never a navigable terminal. The design system is built
    around this palette, so changing it later is non-trivial.
- **[Planned] Static, no server.** Nothing on the site is dynamic. A Rust server or
  VPS was considered and rejected as unnecessary.
- **[Planned] Cloudflare Pages.** Free, and the DNS is already there. No servers to
  maintain. It's simpler than Workers static assets for a plain folder, and Pages
  isn't being retired.
- **[Planned] No build step, so markup is duplicated.** The site has 2–3 pages, and
  simplicity is the point. Revisit past about 4 pages.
- **[Planned] htmx only for `hx-boost`.** Smooth transitions while keeping real links,
  with no SEO or no-JS penalty.
- **[Planned] Keep the identity, raise the quality.** Limits how much changes at once
  while the stack is also being replaced.
- **[Planned] Cloudflare Web Analytics only.** Cookieless and enough for a portfolio.
  Vercel Analytics only works on Vercel.
