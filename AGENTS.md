# AGENTS.md

Guidance for AI agents and contributors working in this repo. Read this before
making changes. For human-oriented setup, see [`README.md`](./README.md).

## What this is

My personal developer portfolio, showcasing myself as a full-stack software engineer, 
including my skills, experience, and projects. The site includes a two-way funnel to 
the two opportunities I am currently interested in: a Winter/Spring, Summer, or Fall 
of 2027 software engineering internship and freelance software development work. So 
the two primary viewers for this site will recruiters and small business owners/managers. 
Hence the reason for having my general home page and a seperate `/freelance` page. It is
a simple static Next.js site that is hosted on Vercel.

The visual identity is a **warm-dark, terminal-soul** aesthetic — a modern site
with terminal *flavor* (typewriter `whoami`, blinking cursor, amber prompt accents),
not a literal terminal UI.

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

## Commands

```bash
npm install        # install deps (Node >=20.9.0)
npm run dev        # dev server on :3000
npm run build      # production build — run this to verify a change compiles
npm run lint       # ESLint (eslint-config-next). Keep it clean.
```

There is no test suite. Verify changes with `npm run build` and `npm run lint`, and
visually where it matters.

## Architecture & conventions

### Content layer — edit data, not markup

The site is **content-driven**. All copy and data live in typed modules under
`lib/content/` (`profile`, `projects`, `experience`, `education`, `skills`,
`pricing`, `faq`, `testimonials`). Components consume that data and own
presentation only.

- To change text, projects, pricing, etc. → **edit the content module**, not the
  component.
- Content arrays/objects are typed and `as const`. Preserve the existing types when
  adding entries.

### Components

Organized by purpose under `components/`:

- `home/` — homepage sections (composed in `app/page.tsx`)
- `freelance/` — freelance sections (composed in `app/freelance/page.tsx`)
- `layout/` — `Nav`, `Footer` (mounted in `app/layout.tsx`)
- `motion/` — client-side motion (`typewriter`, `cursor`, `reveal`)
- `ui/` — reusable primitives (`button`, `badge`, `card`, `tag`, …) built with CVA
  + the `cn()` helper

Conventions:

- **Server Components by default.** Add `"use client"` only when a component needs
  hooks/interactivity (the `motion/` components do; most sections don't).
- Use the **`@/`** path alias (maps to repo root) for imports.
- Compose class names with **`cn()`** from `lib/utils.ts` (clsx + tailwind-merge).
  Don't hand-concatenate Tailwind strings.
- Reuse `ui/` primitives instead of re-implementing buttons/badges/cards.

### Styling & design system

- Tailwind CSS v4 with **CSS-first config**: design tokens live in the `@theme`
  block of `app/globals.css`, **not** a `tailwind.config.js`.
- Use the semantic color tokens (`bg`, `surface`, `text`, `muted`, `accent`,
  `accent-2`, `border`) rather than raw hex. The palette is warm-dark, **not
  black** — don't introduce cool greys or pure `#000`.
- Visual identity is "terminal *soul*", not a literal terminal (ADR 0002). Terminal
  is flavor (mono type, prompt motifs, amber accents, signature motion) — don't
  build a navigable terminal UI.
- Respect `prefers-reduced-motion`: motion components already gate on it (see
  `motion/typewriter.tsx`). Any new motion must do the same.

### SEO

- Global metadata, Open Graph, Twitter, and JSON-LD (`Person` +
  `ProfessionalService`) live in `app/layout.tsx`. `/freelance` overrides metadata
  in its own `page.tsx`.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
  **Add new routes to `sitemap.ts`.**
- The canonical site URL is `https://www.christophermeyer.dev`.

## Gotchas — read these

- **`NEXT_PUBLIC_WEB3FORMS_KEY`** is required for the contact form — it's injected
  as the Web3Forms `access_key` in the shared `components/contact/contact-form.tsx`
  (used by both the homepage `Contact` and `/freelance`'s `FreelanceContact`). Unlike
  GA there's no guard, so if it's unset the form renders `access_key=undefined` and
  submissions silently fail (the form drops into its error state). Add it to
  `.env.local`.
- **`NEXT_PUBLIC_GA_ID`** is optional — Google Analytics only mounts when it's set,
  so its absence in dev is expected, not a bug.

## Workflow expectations

- Match the surrounding code style: typed, concise, comments only where they earn
  their place (the existing files are a good reference).
- Don't commit or push unless asked. If asked and on `main`, branch first.
- Before finishing a change, run `npm run lint` and `npm run build`.
