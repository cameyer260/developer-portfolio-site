# Builder-first, two-path architecture with split routes

The portfolio serves two audiences — Recruiters (primary) and freelance Clients
(secondary). We lead with the engineer / AI-builder identity on a clean homepage
(`/`) and move all freelance commercial content (Services & Pricing) to a dedicated
`/freelance` route. The hero presents "two doors" that route each audience to its
track. This replaces the old site's freelance-first single page, which buried the
engineering story a recruiter cares about.

## Considered Options

- **Freelance-first single page (the old site)** — undersold the engineering depth to recruiters.
- **Strict recruiter/client toggle** — more to build and a muddier single message.
- **One long page with everything** — recruiters would scroll past pricing tiers to reach the work.

## Consequences

- The homepage stays recruiter-focused and never shows pricing.
- `/freelance` can target local-business (Edwardsville / St. Louis) SEO on its own.
- The examples gallery (`/examples` on the old site) is removed for this rebuild and has a clear future home under `/freelance`.
- Contact uses a Google Voice number (314) on the site to limit spam, while the personal number lives on the resume PDF — the mismatch is intentional, not a typo.
