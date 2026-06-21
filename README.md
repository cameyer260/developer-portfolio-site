# Christopher Meyer — Dev Portfolio

Personal developer portfolio for Christopher Meyer, built with Next.js. It serves
two audiences from one site, leading with the software-engineer identity:

- **`/`** — the recruiter-facing homepage (hero, featured work, experience, skills,
  contact). Clean and impressive; never shows pricing.
- **`/freelance`** — the client-facing page for local businesses (services &
  pricing), reached from the hero's "need a website?" door.

The visual identity is a **warm-dark, terminal-soul** aesthetic — a modern site
with terminal *flavor* (typewriter `whoami`, blinking cursor, amber prompt accents),
not a literal terminal UI.

> For the "why" behind these decisions, see [`CONTEXT.md`](./CONTEXT.md) (project
> glossary / ubiquitous language) and the [Architecture Decision Records](./docs/adr).

## Tech stack

| Area        | Choice                                                       |
| ----------- | ------------------------------------------------------------ |
| Framework   | [Next.js 16](https://nextjs.org) (App Router), React 19      |
| Language    | TypeScript 5 (strict)                                        |
| Styling     | Tailwind CSS v4 (CSS-first `@theme` config in `globals.css`) |
| Motion      | framer-motion                                                |
| Icons       | lucide-react                                                 |
| UI plumbing | Radix Slot, class-variance-authority, clsx, tailwind-merge   |
| Fonts       | IBM Plex Mono + IBM Plex Sans (via `next/font`)              |
| Analytics   | Vercel Analytics + Google Analytics                          |
| Hosting     | Vercel                                                       |

## Getting started

Requires Node `>=20.9.0`.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
```

### Scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the local dev server            |
| `npm run build` | Production build                      |
| `npm run start` | Serve a production build              |
| `npm run lint`  | Run ESLint (`eslint-config-next`)     |

### Environment variables

| Variable                    | Required               | Purpose                                                                 |
| --------------------------- | ---------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes (for contact form) | Web3Forms access key. Injected as the form's `access_key`; submissions fail without it. |
| `NEXT_PUBLIC_GA_ID`         | No                     | Google Analytics measurement ID. Omit in dev — GA only loads when set.  |

## Project structure

```
app/                     # Next.js App Router
  layout.tsx             # Root layout: fonts, metadata, JSON-LD, nav/footer, analytics
  page.tsx               # Homepage (/) — composes home sections
  freelance/page.tsx     # Freelance page (/freelance)
  sitemap.ts, robots.ts  # SEO route handlers
  globals.css            # Tailwind import + warm-dark design tokens (@theme)

components/
  home/                  # Homepage sections (hero, about, featured-work, …)
  freelance/             # Freelance sections (hero, pricing)
  layout/                # Nav, footer
  motion/                # Client-side motion (typewriter, cursor, reveal)
  ui/                    # Reusable primitives (button, badge, card, …)

lib/
  content/               # All site copy/data as typed TS modules (the content layer)
  utils.ts               # cn() — clsx + tailwind-merge helper

docs/adr/                # Architecture Decision Records
public/                  # Static assets (resume PDF, images, favicons, OG image)
CONTEXT.md               # Glossary / ubiquitous language for the project
```

## How content works

The site is **content-driven**: copy and data live in typed modules under
`lib/content/` (`profile`, `projects`, `experience`, `education`, `skills`,
`pricing`), and components render that data. To update text, projects, or pricing,
edit the relevant content module — not the components.

## SEO

Metadata, Open Graph, and Twitter cards are configured in `app/layout.tsx` (with a
per-page override on `/freelance`). Structured data is emitted as JSON-LD
(`Person` + `ProfessionalService`), and `sitemap.ts` / `robots.ts` produce
`/sitemap.xml` and `/robots.txt`.

## Deployment

Deployed on Vercel. Pushes to `main` deploy to production at
[christophermeyer.dev](https://www.christophermeyer.dev).

## For AI agents / contributors

Conventions, architecture details, and gotchas are documented in
[`AGENTS.md`](./AGENTS.md). Read it before making changes.
