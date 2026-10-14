# Change: Static-site rewrite and redesign

Status: Planned

> This file is temporary scaffolding. Implement the tasks in order. Update this file as you go (check off tasks, adjust the design if reality differs, record surprises). When the code works: fold everything lasting from this file (design, decisions and their reasons, behavior, gotchas) into the permanent docs (PRD, ARCHITECTURE, README, and any new topic docs the change requires). Remove every `[Planned]` marker for this change entirely, rewrite any planned wording as plain present tense, remove obsolete "Currently / Planned" comparisons, so the docs read as normal docs with no trace of the change being a change, then **delete this file** (and `docs/changes/` if it is now empty). The change is not done until the code works, the docs describe it as built, and this file is gone. Git history is the record of the change.

## Why

- The site works but doesn't look as good as it should. The owner wants a much
  better-looking site that keeps its identity.
- Next.js, React, Tailwind and Vercel are far more stack than a two-page portfolio
  with no dynamic behavior needs. The owner wants a simpler stack they fully own and
  understand: hand-written HTML, plain CSS, plain JS, and htmx for page transitions.
  (Rust was considered and dropped, because nothing on the site is dynamic.)
- Content is out of date: there's no career story, no Procks, and no work section on
  `/freelance`.

The audiences don't change. Recruiters use `/` (Summer and Fall 2027 SWE internships;
**not** Winter/Spring 2027, see [Availability wording](#availability-wording)), and small-business owners use `/freelance`.

## What changes

| Area | Before | After |
| --- | --- | --- |
| Stack | Next.js 16, React 19, Tailwind v4, framer-motion, lucide-react | Hand-written static HTML, plain CSS, plain JS (ES modules), and a pinned, vendored copy of htmx 2 (`hx-boost` + `head-support` only). No build step, no framework, no Tailwind, no hyperscript. |
| Hosting | Vercel (Git-connected) | Cloudflare Pages (Git-connected): no build command, output dir `site/`. The owner sets this up and deploys; implementation is local only. |
| Analytics | Vercel Analytics, plus GA when `NEXT_PUBLIC_GA_ID` is set | Cloudflare Web Analytics only. |
| Navigation | Next.js client routing | Real links, enhanced by `hx-boost` into smooth page swaps. Everything works without JS. |
| Look | Warm-dark, terminal-soul | **Same identity** (palette, amber accents, terminal touches such as the typewriter `whoami` and the cursor), with a big jump in quality: typography, spacing, layout variety, section design and motion polish. earendil.com is one of several inspirations, not the model. A new font pairing is allowed. |
| Home: Experience section | Two role cards (Zipper, Freelance) | Replaced by a **vertical career timeline** from 2022 to now, with scroll-reveal entries (see [Timeline content](#timeline-content)). The layout leaves room for illustrations later. |
| Home: Featured Work | Three projects | The three projects plus a **Procks WIP card**. |
| `/freelance` | Hero, Testimonials, Pricing, FAQ, Contact | Adds a **Work section**: Miles to Go (client site), then the Procks WIP card, then personal projects (Site Builder, StafferAI, PlaySkillSphere) as proof of skill. |
| 404 | Next.js default | A custom 404 page in the site's design, with `noindex`. |
| Content | Typed TS modules in `lib/content/`, rendered by components | The copy lives directly in the HTML. Every existing piece of copy carries over unchanged unless this file says otherwise. |

Everything else carries over (redesigned, same content): Hero, About, Recommendations,
Skills, Education & Resume (kept **separate** from the timeline), Beyond the Code,
Contact, Testimonials, Pricing, FAQ, nav and footer.

### Procks WIP card

- Name **Procks** (the owner confirmed it can be shown before launch). Label it WIP
  or coming soon. Copy along the lines of "Building a social networking app for a
  client."
- Tech tags: Flutter, Dart, Firebase (Auth, Firestore, Storage, Cloud Messaging),
  Cloud Functions (Node.js), Python, OpenCV. A cross-platform iOS and Android app with
  a location-aware backend and a Python photo-matching worker. Keep it at this level:
  no Firebase project IDs or internal tooling details.
- **Do not show:** the client's name, screenshots, store links or a case study.
  Those wait until launch and the client's OK.
- It appears on both the homepage (Featured Work) and `/freelance` (Work).

### Timeline content

Agreed milestones, oldest first. Write tight, positive, recruiter- and client-friendly
copy from these. Link live sites where they exist.

| When | Milestone |
| --- | --- |
| 2022–23 | Junior at Edwardsville High School. First programming class, in Java. |
| 2023–24 | Senior year. AP programming courses that earned college credit. Built a strong OOP foundation in Java. |
| Summer 2024 | Started learning React. Built a first real app, a Twitter-style social network (never deployed). |
| Aug 2024 | Started at SIUE: B.S. Computer Science, minor in Mathematics. |
| Aug 2024 | **FastGPT**, a Chrome extension for moving through ChatGPT conversations with the arrow keys (private repo, no link). Moving from React into Next.js and the wider web stack. |
| Jul 2025 | **PlaySkillSphere** ([live](https://playskillsphere.com), [code](https://github.com/cameyer260/skillsphere)). The first thing he put on the internet: self-hosted on a VPS, real-time over WebSockets, written mostly by hand while learning fundamentals. The "magic moment": sending a friend a link and playing tic-tac-toe against each other in real time. |
| Dec 2025 | **DocuQuery** ([code](https://github.com/cameyer260/docuquery)), a RAG app for students and anyone working with lots of documents: upload a document and chat with it. Next.js and Supabase (Postgres vector search), hosted on a VPS. |
| Dec 2025 | Started the freelance practice and began putting himself out there. |
| Mar 2026 | **StafferAI** ([stafferai.app](https://stafferai.app)): multi-tenant RAG for small businesses with orgs, role-based access, Stripe billing and rate limiting. The first app built to production standards for real users. |
| Mar–Aug 2026 | Software Engineer Intern at **Zipper**. Present it as a normal internship and reuse the existing `experience.ts` bullets. |
| Spring 2026 | First paid freelance client: website updates for a local plumbing company. The focus moves from learning to building a business. |
| Apr 2026 | **Miles to Go** ([milestogohelps.org](https://www.milestogohelps.org/)): a nonprofit website built from scratch, with a 5-star review. |
| Jun 2026 | **Site Builder** ([code](https://github.com/cameyer260/site-builder)), a CLI that builds and deploys prototype client sites in under 20 minutes. |
| Fall 2026 (now) | Junior at SIUE. Building Procks for a client. Since about 15 he has worked typical part-time minimum-wage jobs (restaurants, retail). He now supports himself as a freelance software developer, doing the work his career is headed toward. Applying and interviewing for Summer and Fall 2027 internships. |

### Availability wording

The owner is open to **Summer and Fall 2027** SWE internships only, **not
Winter/Spring 2027**. The current site's copy is out of date: it still says
"Winter/Spring, Summer & Fall 2027" in three places. **Do not port that wording.**

| Source in the old site | Old wording | Port as |
| --- | --- | --- |
| `lib/content/profile.ts` → `status.openTo` (hero badge) | "Winter/Spring, Summer & Fall 2027 SWE internships & freelance" | "Summer & Fall 2027 SWE internships & freelance" |
| `components/home/about.tsx` (About paragraph) | "…internships in Winter/Spring, Summer, and Fall of 2027…" | "…internships in Summer and Fall of 2027…" |
| `app/layout.tsx` → `DESCRIPTION` (meta, OG, Twitter description) | "…open to Winter/Spring, Summer & Fall 2027 internships…" | "…open to Summer & Fall 2027 internships…" |

Before finishing, grep `site/` for `Winter` and `Spring 2027`. There should be no
matches. The only exception is the timeline's "Spring 2026" entry, which is correct.

**Keep out of public copy:** that he didn't believe in StafferAI or that it would never
sell, any knock on WordPress, why he left Zipper, and the names of specific part-time
employers. The site's existing `experience.ts` (freelance "2025 – Present") and the
resume stay as they are. Don't "fix" them to match the timeline.

## Out of scope

- The Procks case study, screenshots, store links and the client's review. They come
  after launch and approval.
- Animated or 3D characters (Blender) and an illustrated timeline.
- Any server, Rust, VPS or build step.
- Editing the resume PDF or the freelance start date in existing copy.
- Changing the phone number. The site intentionally uses the 314 Google Voice number.

## Design approach

### File layout

`site/` is the Cloudflare Pages output directory and is deployed exactly as-is.
Everything outside it (docs, README, AGENTS) is never served.

```
site/
  index.html                  # /
  freelance/index.html        # /freelance (Pages serves clean URLs)
  404.html                    # Pages serves this, with a 404 status, for unmatched paths
  robots.txt, sitemap.xml     # hand-written
  _headers                    # Cloudflare Pages headers (caching, security)
  css/                        # split by concern, see below
  js/                         # ES modules, see below
  vendor/                     # htmx + head-support, version in the filename
  fonts/                      # self-hosted woff2
  images/                     # photos, screenshots, icon sprite
  christopher-meyer-resume.pdf, og-image.png, freelance-og-image.png,
  favicon.svg, favicon.ico, christopher-meyer.webp   # moved from public/, same URLs
```

- **Keep every existing public URL** (`/christopher-meyer-resume.pdf`, `/og-image.png`,
  etc.). They're linked from elsewhere, such as LinkedIn and OG caches.
- Use **root-absolute paths** (`/css/...`) everywhere, because `404.html` is served at
  arbitrary depths.

### Shared markup (no build step)

The `<head>` boilerplate, nav, footer and contact form are duplicated across
`index.html`, `freelance/index.html` and `404.html`. Wrap each duplicated block in
matching comment markers (for example `<!-- shared:nav -->` … `<!-- /shared:nav -->`)
so a shared edit is easy to find and repeat. List the shared blocks in
ARCHITECTURE.md. Reconsider a build step if the site grows past about 4 pages.

### CSS

- Plain CSS with **cascade layers**, declared once in the first stylesheet:
  `@layer reset, tokens, base, layout, components, sections, utilities;`
- Several `<link>` tags in a fixed order. Don't use `@import`, because it loads
  serially.
- **Tokens** as custom properties on `:root`:
  - Keep the current palette (`--color-bg #14110d`, `surface #201a14`,
    `surface-2 #2b231b`, `text #faf5ee`, `muted #b5a898`, `accent #f59e0b`,
    `accent-2 #ea7a3e`, `border rgba(245,239,230,.12)`). Warm-dark, never pure black,
    no cool greys.
  - Add tokens for the spacing scale, a fluid type scale (`clamp()`), radii and
    motion durations/easings.
- Class naming: component classes with BEM-style elements and modifiers (`.card`,
  `.card__title`, `.card--featured`). No utility-class soup. Native CSS nesting is
  fine.
- Exact file split: TBD (decide during implementation). One file per layer, plus
  per-section files if `sections` gets big.

### JS

- ES modules (`<script type="module">`), loaded in `<head>` after htmx. Use the same
  script tags on every page, so `head-support` never re-runs or drops them.
- Each feature module exports `init(root)`, and `js/main.js` calls them all from
  `htmx.onLoad(root => …)`. That covers both the first page load and every boosted
  swap. Inits must be idempotent (mark initialized elements, for example with a
  `data-` attribute).
- Planned modules:
  - reveal on scroll (IntersectionObserver)
  - typewriter
  - spotlight glow on cards (pointer only, skipped on touch)
  - contact form
  - timeline animation, if it needs more than the reveal pattern
- **Reduced motion:** every motion feature checks
  `matchMedia('(prefers-reduced-motion: reduce)')` or the CSS media query, and falls
  back to the final state with no movement. This includes page-swap transitions.

### htmx

- Pin a specific htmx 2.x release and the `head-support` extension, vendored into
  `site/vendor/` with the version in the filename.
- Put `hx-boost="true"` and `hx-ext="head-support"` on `<body>`. Swap target and
  transition style (`hx-select`/`hx-target` on a page wrapper vs the whole body; a
  timed swap vs `transition:true` View Transitions): TBD (decide during the spike).
- **Must opt out of boosting** (`hx-boost="false"`):
  - The resume PDF link (same origin, not HTML).
  - **The contact forms.** A boosted form would AJAX-post to Web3Forms and swap the
    JSON response into the page.
- To verify in the spike:
  - cross-page hash links (`/#work` from `/freelance`)
  - same-page anchor links
  - back/forward and scroll position
  - focus after a swap
  - a fallback to a full navigation if a boosted request fails

### Contact form

- The same Web3Forms form on `/` and `/freelance` (shared markup), in plain JS.
- Keep the current UX:
  - required name, email and message fields
  - "Sending…" state
  - success panel with "Send another"
  - error line pointing to direct email
- The Web3Forms `access_key` is public by design. Inline it as a hidden input, taking
  the value from `NEXT_PUBLIC_WEB3FORMS_KEY` in the local `.env.local`, and don't
  commit `.env.local`. Restricting the key to the domain in the Web3Forms dashboard is
  optional hardening.
- Without JS, the form still posts natively to `https://api.web3forms.com/submit`.

### Fonts and icons

- Self-host the fonts as woff2: IBM Plex Sans and Mono, or the new pairing if the
  redesign changes it (it must allow web use, for example OFL). Use a latin subset,
  only the weights actually used, `font-display: swap`, and preload the critical
  faces.
- lucide-react icons become inline SVGs, or one SVG sprite (`images/icons.svg`) used
  via `<use>`. Lucide is ISC-licensed.

### SEO

Carry over from `app/layout.tsx` and `app/freelance/page.tsx`:

- Per-page `<title>`, description, canonical, Open Graph and Twitter tags.
- JSON-LD `Person` + `ProfessionalService` on `/` and `/freelance`.
- `robots.txt` and `sitemap.xml` with the same content as now, as static files. Omit
  `lastmod` or update it by hand.
- The canonical host stays `https://www.christophermeyer.dev`.

### Headers and caching (`site/_headers`)

- With no build step there's no content hashing, so **don't put long cache lifetimes
  on CSS, JS or HTML**. Leave Pages' default revalidation in place.
- Only versioned files (`/vendor/*`) and `/fonts/*` get
  `Cache-Control: public, max-age=31536000, immutable`.
- Basic security headers (`X-Content-Type-Options`, `Referrer-Policy`). A CSP is
  optional and TBD. If added, it must allow `api.web3forms.com` and Cloudflare
  Insights.

### Local development only, no deploys

**All implementation work happens locally.** The implementing agent must never deploy
anything:

- No `wrangler pages deploy` or `wrangler deploy`.
- No creating or configuring the Cloudflare Pages project.
- No DNS changes.
- No pushing to GitHub unless the owner asks.

The owner runs the site locally, reviews it, gives feedback, and handles the whole
deployment themselves at the end.

- **Local dev:** serve `site/` with `npx wrangler pages dev site`. It runs a local
  server that emulates Pages (clean URLs, `_headers`, `404.html`) and deploys nothing.
  htmx needs HTTP, not `file://`.
- **Analytics:** add nothing to the code. The owner turns on Cloudflare Web Analytics
  in the Pages dashboard when deploying.

### Owner's deployment notes (not agent tasks)

For reference when the owner deploys:

- **Pages project:** connect this GitHub repo, production branch `main`, empty build
  command, output directory `site`.
- **DNS:** `christophermeyer.dev` is **already on Cloudflare**. The records currently
  point at Vercel, and Vercel 308-redirects the apex to `www`. After cutover, `www`
  becomes a Pages custom domain and the apex redirects to `www` through a Cloudflare
  redirect rule (or the apex is attached and redirected).
- **Vercel after merge:** once `main` merges, Vercel's Git integration will try to
  build a repo that no longer has Next.js. That build fails, but the previous
  deployment stays live until the DNS moves. Disconnect and delete the Vercel project
  after cutover.
- **Things to check after deploying:**
  - The apex redirects to `https://www.christophermeyer.dev/`.
  - Both pages, the 404 and the resume load.
  - `_headers` are applied (`curl -I`).
  - Cloudflare Web Analytics counts `hx-boost` (pushState) navigations as page views.
    This can't be tested locally.

### Design process

- Use the existing site as the baseline. Gather a few references (earendil.com plus
  others), then upgrade the system first: type scale, spacing rhythm, layout variety,
  section headers, hero, card and motion language.
- **Checkpoint with the owner** on the local dev server after the design system, nav,
  hero and one content section exist, before rolling the design out to every section.

### Decisions and why (fold into ARCHITECTURE.md on completion)

- **Static, no server, no Rust:** nothing on the site is dynamic. Rust was wanted for
  its own sake but adds nothing here.
- **Cloudflare Pages over a VPS:** the same result without running TLS, patching and
  uptime. It's free, and the DNS is already on Cloudflare.
- **Pages over Workers static assets:** Cloudflare recommends Workers for new
  projects, but Pages needs no config file for a plain static folder and isn't being
  retired. Revisit only if a Workers-only feature is needed.
- **No build step, so markup is duplicated:** there are only 2–3 pages, and
  simplicity is the point. Reconsider past about 4 pages.
- **htmx only for `hx-boost`:** smooth earendil-style transitions while keeping real
  links, so there's no SEO or no-JS penalty.
- **No GitHub Action:** there's nothing to build, and the Pages Git integration
  deploys directly.
- **Cloudflare Web Analytics only:** free, cookieless, no consent banner, and enough
  for a portfolio. Vercel Analytics doesn't work off Vercel.
- **Keep the identity, raise the quality:** it's distinctive. Since the whole stack
  is also changing, this limits how many things change at once.
- **Same repo:** keeps history. Vercel stays live until a clean DNS cutover.

## Impact

- **Removed:** `app/`, `components/`, `lib/`, `next.config.ts`, `next-env.d.ts`,
  `tsconfig.json`, `tsconfig.tsbuildinfo`, `eslint.config.mjs`, `postcss.config.mjs`,
  `package.json`, `package-lock.json`, `node_modules/`, `.next/`.
- **Moved:** `public/*` to `site/`, at the same URLs.
- **`.gitignore`:** drop the Next, TypeScript and Vercel entries and add `.wrangler/`.
- **Env vars:**
  - `NEXT_PUBLIC_WEB3FORMS_KEY` is no longer read at runtime. Its value gets inlined.
  - `NEXT_PUBLIC_GA_ID` goes away.
  - `.env.local` is no longer needed after inlining.
- **No more `npm run lint` / `npm run build`.** Verification happens against the
  local dev server: browser checks (Playwright screenshots at phone, tablet and
  desktop widths, plus a reduced-motion emulation), Lighthouse, and a link check.
- **Risks:**
  - `hx-boost` edge cases (anchors, forms, the PDF, script re-init).
  - Deployment-side risks (analytics with boosted navigations, DNS cutover, Vercel
    after merge) belong to the owner. See
    [Owner's deployment notes](#owners-deployment-notes-not-agent-tasks).

## Docs affected

- `docs/PRD.md` (new in this planning pass): planned behavior is marked `[Planned]`.
- `docs/ARCHITECTURE.md` (new in this planning pass): planned structure and decisions
  are marked `[Planned]`. It absorbs the old ADR 0001 and 0002 decisions.
- `AGENTS.md`:
  - Already updated with the documentation rules, a docs map, the removed ADR
    reference, and a pointer to this change.
  - **On completion:** rewrite the tech stack, commands, conventions (content layer,
    components, Tailwind), styling and gotchas (Web3Forms and GA env vars) for the new
    stack.
- `README.md`:
  - Already has a docs pointer.
  - **On completion:** rewrite the tech stack, getting started, scripts, env vars,
    project structure, "how content works" and deployment.

## Open questions / unverified assumptions

- **Unverified:**
  - htmx 2 `hx-boost` handles cross-page hash links (`/#work`) and scroll-to-top the
    way we want.
  - `htmx.onLoad` fires for the initial page load when registered from a deferred
    module.
  - `npx wrangler pages dev` serves `404.html` with a 404 status, clean URLs and
    `_headers`, just like production.
- **TBD (decide during implementation):**
  - CSS file split.
  - The swap target and transition style.
  - The final font pairing.
  - Nav labels and anchor ids (keep `#experience` for the timeline unless there's a
    reason not to).
  - Order of sections on `/freelance`. Suggested: Hero, Work, Testimonials, Pricing,
    FAQ, Contact.
  - Whether a CSP is added.

## Tasks

- [ ] **Branch.** Create `feat/static-site-rewrite` off `main`. Commit only when the
      owner asks.
- [ ] **Spike the risky parts first.** Scaffold `site/` with stub `index.html`,
      `freelance/index.html` and `404.html`, vendored htmx and `head-support`, and
      `js/main.js` with an `htmx.onLoad` test init. Run `npx wrangler pages dev site`.
      Verify, and record the results in this file:
      - Boosted nav in both directions.
      - The title and meta update on swap.
      - `/#work` from `/freelance` lands on the section.
      - Same-page anchors.
      - Back/forward and scroll.
      - The resume link and forms are not boosted.
      - The init re-runs after a swap without double-binding.
      - Swap transitions are disabled under reduced motion.
      - `404.html` is served with status 404.
      - Everything works with JS disabled.
- [ ] **Static assets.** Move `public/*` into `site/` at the same URLs. Self-host the
      fonts and preload the critical ones. Build the icon sprite from the lucide icons
      in use. Verify each moved URL returns 200 locally.
- [ ] **Design system CSS.** Layers, tokens (current palette plus spacing, type,
      radii and motion), reset/base, layout primitives, and core components (button,
      badge, tag, card, section heading, terminal window). Verify on a scratch page at
      375, 768 and 1280px.
- [ ] **Shared chrome.** `<head>` (with per-page metadata slots), nav and footer, with
      `shared:` markers. Verify keyboard focus states and a sticky nav without layout
      shift.
- [ ] **Hero and About.** Port the copy from `lib/content/profile.ts` and
      `components/home/hero.tsx` / `about.tsx`: the typewriter `whoami`, the cursor,
      and the two-doors CTAs. Use the corrected availability wording (Summer & Fall
      2027 only; see [Availability wording](#availability-wording)), not the old
      "Winter/Spring" copy. Verify the typewriter re-runs after a boosted navigation
      and is static under reduced motion.
- [ ] **Design checkpoint.** Ask the owner to review the site on the local dev server
      and sign off on the design direction before continuing. Adjust the tokens and components from the
      feedback.
- [ ] **Featured Work and the Procks WIP card.** Port `lib/content/projects.ts`, add
      the Procks card (no client name, screenshots or store links), and update the
      section description (no longer "three"). Verify the spotlight glow works on
      pointer only and that the live/code links open in a new tab.
- [ ] **Timeline.** Replace Experience with the vertical timeline from
      [Timeline content](#timeline-content): scroll-reveal entries, links to live
      sites, and room for future illustrations. Verify on mobile, under reduced
      motion, and after a boosted navigation.
- [ ] **Remaining home sections.** Recommendations, Skills, Education & Resume
      (separate from the timeline), and Beyond the Code. Port the copy from
      `lib/content/*`. Verify it against the live site so no copy is lost.
- [ ] **Contact form.** Shared Web3Forms form in plain JS with the key inlined and
      `hx-boost="false"`. Verify the sending, success and error states, by blocking
      the request to force the error. Do one real test submission from the local dev
      server, with the owner's OK.
- [ ] **`/freelance`.** Hero, the new Work section (Miles to Go with a Playwright
      screenshot of milestogohelps.org and a live-site link,
      the Procks WIP card, then the personal projects), Testimonials, Pricing, FAQ and
      Contact. Port the copy from `lib/content/{testimonials,pricing,faq}.ts` and the
      freelance components. Verify against the live `/freelance` so no copy is lost.
- [ ] **404 page.** In the site's design with terminal flavor, links back to `/` and
      `/freelance`, and `noindex`. Verify a deep unknown path renders styled (because
      of the root-absolute assets) with status 404.
- [ ] **SEO.** Per-page metadata, canonical, OG and Twitter tags, JSON-LD,
      `robots.txt` and `sitemap.xml`. Verify by viewing the page source on both pages,
      and validate the JSON-LD (for example with Google's Rich Results Test).
- [ ] **`_headers`.** Caching and basic security headers, as specified above. Verify
      the response headers on the local dev server with `curl -I`.
- [ ] **QA pass.** Playwright screenshots at 375, 768 and 1280px on all pages, a
      reduced-motion emulation, a keyboard-only pass, a link check, and Lighthouse
      (target 95+ on Performance, Accessibility, Best Practices and SEO on mobile).
      Fix the findings.
- [ ] **Remove Next.js.** Delete the files listed under Impact and update
      `.gitignore`. Verify `git ls-files` shows no Next, React or Tailwind leftovers
      and the local dev server still serves every page and asset.
- [ ] **Reconcile docs and delete this file.**
  - Rewrite `README.md` and `AGENTS.md` for the new stack.
  - Make `docs/PRD.md` and `docs/ARCHITECTURE.md` describe the built site, folding in
    the decisions, shared-block markers, hx-boost gotchas and verification steps from
    this file.
  - Remove every `[Planned]` marker and "Currently / Planned" comparison.
  - Delete this file and `docs/changes/`.
