# AGENTS.md

Guidance for AI agents and contributors working in this repo. Read this before
making changes. For human-oriented setup, see [`README.md`](./README.md); for the
project's vocabulary and the reasoning behind structural choices, see
[`CONTEXT.md`](./CONTEXT.md) and [`docs/adr/`](./docs/adr).

## What this is

Christopher Meyer's personal developer portfolio — a Next.js 16 (App Router) site
on React 19, TypeScript (strict), and Tailwind CSS v4. It serves two audiences from
one site:

- **`/`** — recruiter-facing homepage. Leads with the engineer identity. **Never
  shows pricing.**
- **`/freelance`** — client-facing page for local businesses (services & pricing).

This split is deliberate (ADR 0001). Keep commercial/freelance content off the
homepage.

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

- **Containerized agents and `.next` / `node_modules`.** This repo is often worked
  on from a Linux container while the host is macOS. Running the Next.js dev server
  or build inside the container writes platform-specific artifacts. The repo
  isolates these via `.next.claudey/` and `node_modules.claudey/` (both gitignored)
  so the host's `.next` / `node_modules` aren't clobbered. If the host build ever
  breaks with chunk/platform errors, delete `.next` **and** `node_modules` on the
  Mac and reinstall.
- **`npm run build`'s type-check can walk `node_modules.claudey`.** The container's
  Linux dependency tree isn't excluded from TypeScript's `**/*.ts` include glob by
  default, so a build run from inside the container can fail on dependency source.
  `tsconfig.json`'s `exclude` list covers `node_modules.claudey` and `.next.claudey`
  explicitly — if a new container-only artifact dir shows up, add it there too.
- **`NEXT_PUBLIC_WEB3FORMS_KEY`** is required for the contact form — it's injected
  as the Web3Forms `access_key` in the shared `components/contact/contact-form.tsx`
  (used by both the homepage `Contact` and `/freelance`'s `FreelanceContact`). Unlike
  GA there's no guard, so if it's unset the form renders `access_key=undefined` and
  submissions silently fail (the form drops into its error state). Add it to
  `.env.local`.
- **`NEXT_PUBLIC_GA_ID`** is optional — Google Analytics only mounts when it's set,
  so its absence in dev is expected, not a bug.

## Documenting decisions

This project keeps lightweight docs in sync with the code:

- **`CONTEXT.md`** — the glossary / ubiquitous language. If you introduce or rename
  a domain concept, update it.
- **`docs/adr/`** — Architecture Decision Records (numbered). For a structural or
  identity-level decision, add a new ADR rather than burying the rationale in code.

## Workflow expectations

- Match the surrounding code style: typed, concise, comments only where they earn
  their place (the existing files are a good reference).
- Don't commit or push unless asked. If asked and on `main`, branch first.
- Before finishing a change, run `npm run lint` and `npm run build`.
