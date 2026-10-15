# AGENTS.md

Guidance for agents and contributors. Read this before changing the repository.
For setup, see [README.md](./README.md).

## What this is

Christopher Meyer's personal developer portfolio. `/` targets recruiters for
**Summer and Fall 2027** software engineering internships; `/freelance` targets
small-business owners seeking websites and custom software. Pricing stays off the
homepage.

The site is hand-written static HTML, plain CSS and JavaScript, served as-is from
`site/`. htmx 2.0.11 and head-support 2.0.5 enhance real links into page swaps.
There is no framework, package manifest, compilation or build step. Cloudflare
Pages is the hosting target; deployment/cutover belongs entirely to the owner.

## Docs map

| Doc | What it covers |
| --- | --- |
| [README.md](./README.md) | Local setup, editing and verification |
| [docs/PRD.md](./docs/PRD.md) | Audiences, sections, behavior and content constraints |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Structure, shared markup, htmx gotchas, decisions, verification gaps and owner deployment checklist |
| [docs/changes/design-review-feedback.md](./docs/changes/design-review-feedback.md) | **[Planned]** implementation plan for the aligned timeline, portrait, projects, skills and freelance hero refinements |

## Local commands

```bash
npx wrangler pages dev site --port 8788 --ip 127.0.0.1 --compatibility-date=2026-06-01
# http://127.0.0.1:8788/ and /freelance

git diff --check
git diff --cached --check
```

Check for an existing local server before starting another. The compatibility date
avoids an installed Wrangler/runtime mismatch. Restart if `_headers` is created
after startup. Use HTTP, not `file://`; use Wrangler for Pages route/header checks.

**There are no `npm run lint` / `npm run build` commands. Do not restore a package
manifest or install the removed framework to satisfy stale instructions.**

## Editing conventions

- Copy lives directly in `site/index.html` and `site/freelance.html`; no content
  modules or generators. Preserve wording unless the requested change alters it.
- Keep `/freelance` backed by **`freelance.html`**, not `freelance/index.html`.
  Pages' directory routing would change the canonical URL to `/freelance/`.
- Use root-absolute asset paths so the 404 works at arbitrary depths. Preserve
  existing public URLs, especially the resume, portrait, OG images and favicons.
- Repeated HTML uses matching `<!-- shared:NAME -->` markers. `index.html` is the
  source; keep each matching block byte-identical in every page that contains it.
  The [block map](./docs/ARCHITECTURE.md#shared-markup) lists all seven names.
  Page-specific metadata belongs inside `page:meta`, not `shared:head`.
- CSS link order is `base.css`, `layout.css`, `components.css`, `sections.css`,
  `utilities.css`. The layer order declaration must remain first in `base.css`.
  Use semantic custom properties and BEM-style component classes, not utility soup.
- Preserve the approved **warm-dark, terminal-soul** identity: warm charcoal, amber,
  subtle grain; Newsreader display, IBM Plex Sans body, IBM Plex Mono labels. No
  pure-black/cool-grey redesign or literal navigable terminal UI.
- Every motion feature must respect `prefers-reduced-motion`, including page
  transitions. CSS motion uses a **media query**, not a motion feature inside
  `@supports`. Keep the no-JS/script-failure visibility fallbacks.
- JavaScript is ES modules. Features expose idempotent `init(root)` called from
  `htmx.onLoad`. Include `root` itself when selecting nodes (`dom.js`'s `select`).
  Bind with `WeakSet` guards, not persistent `data-` flags: history snapshots keep
  attributes but lose event listeners. Reset transient UI before history saves.
- Keep identical script tags in the shared head. Don't remove the `hx-boost="false"`
  opt-outs on forms and resume links. Review `boost.js` before changing navigation.
- Only fonts and versioned vendor files are immutable-cached. Never overwrite an
  existing font URL; use a new filename. Don't long-cache unversioned HTML/CSS/JS,
  images or the resume.
- Add new public content routes to `site/sitemap.xml` and supply page metadata.
  Canonical host: `https://www.christophermeyer.dev`.

## Content and integration gotchas

- Internship availability is **Summer and Fall 2027 only**, never Winter/Spring.
  The About graduation sentence says **December 2027**. The current timeline's
  Spring 2026 date is intentional. **[Planned]** The
  [design review plan](./docs/changes/design-review-feedback.md) will supersede
  individual milestone dates/role cards with yearly summaries; preserve the
  freelance practice's `2025 – Present` wording compactly within 2025.
- The **314 Google Voice number is intentional**. Do not substitute the personal
  number in the resume, or edit the resume PDF to reconcile dates.
- Procks can be named on both pages with the existing high-level stack. No client
  name, screenshots, store links, review, case study, Firebase project IDs or
  internal tooling details before launch and approval.
- Currently PlaySkillSphere appears in both project sections and the timeline.
  **[Planned]** The [design review plan](./docs/changes/design-review-feedback.md)
  will replace only its homepage card with Procks; keep its yearly timeline story,
  freelance personal-project card and GitHub links. Its dead live-site links were
  removed by owner decision; do not re-add them.
- Keep the experience timeline separate from education/resume. Future timeline
  illustrations belong in the desktop aside; they are not implemented.
- Footer year uses **`data-current-year`**; `data-year` belongs to timeline entries.
  A generic year selector previously wiped timeline content.
- The public Web3Forms key is inlined in both forms; there is no runtime env
  requirement. Do not copy it into docs or expose other `.env.local` values.
- One real email test was approved and attempted, but failed to verify delivery.
  Mock tests pass; upstream diagnostics do not prove the key is wrong. Start with
  non-submitting checks; do not repeat deliveries, bypass challenges, add a proxy
  or change vendors just to satisfy automation. Hand back an owner-assisted normal
  browser/recipient check. See the [verification record](./docs/ARCHITECTURE.md#verification-status).
- No analytics snippet is needed in source. The owner enables Cloudflare Web
  Analytics at deployment and checks page views across boosted navigation.

## Verification expectations

Before finishing, run whitespace checks and the relevant static-site checks in
[README.md](./README.md#verify-changes). There is no committed test suite.

**Actively inspect browser screenshots at phone and desktop widths.** Check
whitespace, wrapping, orphaned brackets, stretched buttons and unbalanced columns,
not only console errors and horizontal overflow. Preserve the content-height hero
and label-width mobile CTAs; don't reintroduce a viewport-height/bottom-aligned
hero or full-width mobile doors. Include 768px in broader layout reviews.

Exercise boosted navigation, anchors, history, merged head/focus, resume opt-outs,
mobile menu, deep-path 404, reduced motion and no-JS behavior when relevant. Mock
contact requests; distinguish mocked success from real email delivery. Report
blocked browser engines or external services honestly. Deployment-only checks
remain owner tasks, never agent execution tasks.

## Workflow and safety

- Inspect status and staged/unstaged changes before editing. Preserve existing
  work, including untracked implementation files. Never reset/clean it away.
- Match the surrounding concise code style; comments only where useful.
- Do not commit or push unless asked. If asked while on `main`, branch first.
- **Never deploy**, including previews. No `wrangler deploy` or
  `wrangler pages deploy`, cloud project creation/configuration, or DNS changes.
- Put new scratch scripts, dependencies and screenshots in gitignored `.pi/tmp/`;
  clean up your scratch files when done. Never put test files in the served site.

## Documentation rules

A task is done only when the code works, verification passes (or blockers are
explicitly handed back), and permanent docs accurately describe the built result.
Built features carry no planned markers or obsolete current/planned comparisons.

Docs are the primary way humans understand the project. Update them with the code:
`PRD.md` describes behavior; `ARCHITECTURE.md` describes structure and records
**decisions and their reasons**. Prefer editing existing docs over duplication or
new ADR files. Add genuinely needed new docs to this map. Fix stale docs when found.
Fold lasting context out of temporary change plans/handoffs, then delete those
files and their references; remove their directory only when empty. Deployment is
not a prerequisite for that cleanup.
