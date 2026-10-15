# Product

What christophermeyer.dev does and for whom. For implementation, see
[ARCHITECTURE.md](./ARCHITECTURE.md).

## Audiences

- **Recruiters (primary):** Summer and Fall 2027 software engineering internships,
  not Winter/Spring 2027. `/` leads with the engineer, career story and projects;
  it never shows pricing.
- **Small-business owners (secondary):** freelance websites and custom software in
  Edwardsville, the Metro East and St. Louis. `/freelance` provides work, client
  proof, services, pricing and a quote form.

The home hero offers two doors: `[ hiring? ]` goes to `#work`, and
`[ freelance software development ]` goes to `/freelance`.

## Visual identity and navigation

Warm-dark, terminal-soul: warm charcoal, off-white text, amber signature accents,
sparse burnt orange and subtle grain. Newsreader serif headings and quotes provide
editorial warmth; IBM Plex Sans handles body/UI, and Plex Mono handles labels and
terminal touches. The typed `$ whoami`, cursor, project title bars and prompt
motifs are flavor, not a navigable terminal.

- A sticky header links to home work, experience, skills and contact, plus GitHub
  and the resume. Phones use a native menu popover; unsupported browsers get a
  wrapping link row. The footer links to GitHub, LinkedIn and email.
- Real links work without JavaScript. With JS, page-to-page navigation swaps the
  content, updates metadata and moves focus to main content or the requested
  anchor. Supported browsers cross-fade pages; others swap instantly.
- Same-page anchors avoid refetching. Back/forward restores page content and scroll.
- Keyboard users get a skip link and visible focus rings. The menu closes on Esc
  and light-dismiss; JS also closes it after choosing a link.
- Reduced motion makes the typewriter, cursor, reveals, header/rail animations,
  spotlight and page transitions static. Content remains visible without JS or
  when scripts fail; JS failure has a 2.5-second visibility failsafe.
- Heroes are content-height, not full-viewport. Mobile hero CTAs hug their labels,
  and bracketed labels do not leave an orphaned bracket.

## `/` — home

In order:

1. **Hero (`#top`):** name, typed full-stack role, Summer & Fall 2027 availability,
   SIUE/location intro and the two doors.
2. **About (`#about`):** portrait and introduction, December 2027 graduation,
   internship experience, freelance capabilities and contact link. The portrait
   keeps its original landscape composition at its native 1200×801 size, capped
   so high-DPI displays never upscale it; it stays in About, not the hero.
3. **Featured Work (`#work`):** three cards — Site Builder as the flagship, then
   StafferAI and a single Procks dashed WIP card beside each other on wider
   screens. Procks appears once; its timeline story, freelance card and
   public-information restrictions are unchanged.
4. **Experience (`#experience`):** five brief first-person yearly entries,
   2022–2026, oldest first, with scroll reveals. Desktop has a sticky
   heading/year aside and a progressively filled rail where supported; phones use
   a compact single column. The year is decorative, fully painted at rest and
   during transitions, and not repeated screen-reader content. Future
   illustrations have room in the aside but are not included. The timeline stays
   separate from education/resume; see the yearly coverage below.
5. **Recommendations (`#recommendations`):** Kerry Ritter, Zipper co-founder;
   excerpt, attribution, LinkedIn link and native “Read full recommendation” details.
6. **Skills (`#skills`):** Languages, Frameworks & Tech, Tools in numbered panes.
7. **Education & Resume (`#education`):** SIUE B.S. Computer Science, Mathematics
   minor, GPA, scholarships, coursework, download and open-PDF links. Separate
   from the timeline.
8. **Beyond the Code (`#beyond`):** activities, travel and interests.
9. **Contact (`#contact`):** email, intentional Google Voice phone, GitHub,
   LinkedIn and the contact form.

Education & Resume precedes Skills in DOM/reading order, yielding
Recommendations → Education & Resume → Skills → Beyond the Code → Contact.
Displayed section indices are Education `04`, Skills `05`. Skills uses a compact
label-plus-wrapping-list presentation covering all 24 skill names and three
categories, with nothing hidden behind an interaction. Existing section anchors
and education/resume content are unchanged.

### Yearly timeline

Exactly one concise first-person entry per year. The 2025 entry carries the
freelance practice's `2025 – Present` wording; project links stay inline.
PlaySkillSphere keeps its GitHub link, never its dead live site.

| Year | Story |
| --- | --- |
| 2022 | First lines of Java: introductory programming courses at Edwardsville High School. |
| 2023 | Continued Java through senior year; AP courses earning college credit and an object-oriented foundation. |
| 2024 | Graduated high school; summer React learning and a first Twitter-style app; started the SIUE B.S./Mathematics minor; explored Chrome extensions including FastGPT. |
| 2025 | Expanded into Next.js; built PlaySkillSphere (WebSocket lobbies/games, self-hosted VPS) and DocuQuery (document-chat/RAG, Next.js + Supabase vector search); began freelancing near year end. |
| 2026 | Built StafferAI (production multi-tenant RAG with access controls, billing, rate limiting); gained website clients; landed the Zipper software engineering internship; now building client mobile app Procks. Also built the Site Builder CLI; expanding it into an outreach-to-demo-site tool is a future direction, not built functionality. |

## `/freelance`

In order:

1. **Hero (`#top`):** back to portfolio, local-service badge, “Fast, modern websites
   for local businesses.”, introduction, Get a quote and See pricing.
2. **Work (`#freelance-work`):** Miles to Go client website with a responsive
   screenshot and live link; the shared Procks WIP card; compact personal-project
   cards for Site Builder, StafferAI and PlaySkillSphere. The last has Code only.
3. **Client Reviews (`#reviews`):** Miles to Go's 5-star review, Melissa Meske's
   attribution, live-site link and full review in native details.
4. **Services & Pricing (`#pricing`):** Website (from $399), Custom Software (custom
   quote), then After launch: Hosting ($25/month) and recommended Hosting &
   Maintenance ($100/month). Included features and scope notes remain visible.
   All pricing CTAs go to `#freelance-contact`.
5. **FAQ (`#faq`):** native details covering starting-price inclusions, maintenance
   billing, ownership, timelines and choosing an option. Multiple answers can open.
6. **Contact (`#freelance-contact`):** email, phone and the same form as home, with
   a business-specific message placeholder.

### Freelance hero

The hero heading is **“Freelance software development”**, with Christopher's
portrait to its right on desktop and a compact stack on phones. The hero stays
content-height, with label-width mobile CTAs, its back link/local-service badge
and existing Get a quote/See pricing targets.

The introduction covers websites, web applications, mobile apps, APIs and more,
expresses interest in internal tools for local businesses—replacing or improving
disconnected software and connecting fragmented workflows—without claiming an
established internal-tooling client track record, and invites uncertain-fit
projects with a promised honest assessment. “Reach out” links to
`#freelance-contact`. Page metadata and the shared ProfessionalService
description match this broader positioning while retaining local SEO and
existing public URLs.

## Contact form

Both pages submit name, email and message directly to Web3Forms. All three fields
are required; email uses native email validation. A hidden honeypot discourages bots.
The Web3Forms public access key is in the HTML, not a runtime environment variable.

With JavaScript:

- The submit button disables and reads “Sending…”.
- A successful API response clears/hides the form and shows a focused status panel:
  “message sent”, a reply promise and “Send another”.
- “Send another” restores the empty form and focuses the name field.
- A network/JSON/API failure preserves the message and shows an alert pointing to
  retry or direct email. The button returns to Send.

Without JS, the form does a normal browser POST to Web3Forms, so the vendor controls
its response page; the inline JS success/error panels are not involved. Forms are
explicitly excluded from htmx boosting. Delivery depends on the external service;
[real delivery remains unverified](./ARCHITECTURE.md#verification-status), despite
passing mocked UI/native-POST tests. Direct email/phone remain available.

## 404 and discoverability

Unknown paths return a styled HTTP 404 at any depth, with the requested path shown
as a decorative `cd` command, and links to `/` and `/freelance`. It has `noindex`,
no canonical and no JSON-LD. The content pages have individual title/description,
canonical, OG and Twitter tags, plus the same Person/ProfessionalService graph.
Only the two content routes appear in the sitemap.

## Analytics

Cloudflare Web Analytics is the sole analytics choice: cookieless, without a consent
banner. The source contains no beacon; the owner enables collection at deployment
and verifies boosted navigation and duplicate-page-view behavior. Production
analytics is not verified locally.

## Content constraints

- Preserve existing project, pricing, recommendation and review wording unless an
  approved change calls for edits. Do not rewrite quotes for grammar.
- Availability is Summer and Fall 2027 only. About says December 2027 graduation;
  the education period and resume retain their existing wording.
- The 314 Google Voice phone is intentional; do not replace it with the resume's
  personal number or change the resume PDF to reconcile dates.
- **Procks is public at a high level only:** a client social-networking iOS/Android
  app with a location-aware backend and Python photo matching. Tags: Flutter,
  Dart, Firebase Auth, Firestore, Firebase Storage, Cloud Messaging, Cloud Functions
  (Node.js), Python and OpenCV. No client name, screenshots, store links, review,
  case study, Firebase project IDs or internal tooling details before launch and
  client approval.
- Keep private: doubts about StafferAI's viability, criticism of WordPress, reasons
  for leaving Zipper and names of specific part-time employers.
- PlaySkillSphere's dead live-site links stay removed by owner decision; retain
  the project, narrative and GitHub links. Only its homepage Featured Work card
  is removed; its 2025 timeline story, freelance personal-project card and
  GitHub links remain.

## Out of scope

A server or backend, an illustrated/3D timeline, and Procks launch materials before
approval. The site has no accounts, database or dynamic content service.
