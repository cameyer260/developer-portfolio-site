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
   internship experience, freelance capabilities and contact link.
   **[Planned]** [Design review refinements](./changes/design-review-feedback.md)
   will restore sharp portrait rendering at actual phone/high-DPI desktop sizes;
   the homepage portrait will remain in About, not move into the hero.
3. **Featured Work (`#work`):** Site Builder as the flagship; StafferAI and
   PlaySkillSphere beside each other on wider screens; Procks as a dashed WIP
   card. Live/code links are supplied where available. PlaySkillSphere has Code
   only; the project and its story remain even though the live deployment is down.
   **[Planned]** [Design review refinements](./changes/design-review-feedback.md)
   will reduce this to three cards: Site Builder, then StafferAI and a single
   Procks WIP card beside each other on wider screens. Procks will replace the
   homepage PlaySkillSphere card, not appear twice; the description/count will
   match the new lineup. PlaySkillSphere's timeline story and freelance card will
   remain, and Procks' public-information restrictions will not change.
4. **Experience (`#experience`):** a 14-entry vertical career timeline, oldest
   first, with scroll reveals and distinct role cards. Desktop has a sticky
   heading/year aside and a progressively filled rail where supported; phones use
   a compact single column. The year is decorative, not repeated screen-reader
   content. Future illustrations have room in the aside but are not included.
   **[Planned]** [Design review refinements](./changes/design-review-feedback.md)
   will replace the milestones/role cards with five brief yearly entries, 2022–2026,
   and fix the clipped decorative year at rest and during transitions. The
   timeline will stay separate from education/resume; see the annual coverage below.
5. **Recommendations (`#recommendations`):** Kerry Ritter, Zipper co-founder;
   excerpt, attribution, LinkedIn link and native “Read full recommendation” details.
6. **Skills (`#skills`):** Languages, Frameworks & Tech, Tools in numbered panes.
7. **Education & Resume (`#education`):** SIUE B.S. Computer Science, Mathematics
   minor, GPA, scholarships, coursework, download and open-PDF links. Separate
   from the timeline.
8. **Beyond the Code (`#beyond`):** activities, travel and interests.
9. **Contact (`#contact`):** email, intentional Google Voice phone, GitHub,
   LinkedIn and the contact form.

**[Planned]** [Design review refinements](./changes/design-review-feedback.md) will
move Education & Resume before Skills in DOM/reading order, yielding
Recommendations → Education & Resume → Skills → Beyond the Code → Contact.
Displayed section indices will become Education `04`, Skills `05`. Skills will
use a smaller, less spacious presentation while preserving all existing copy,
24 skill names and the three categories, with no hidden/disclosed content.
Existing section anchors and education/resume content will remain unchanged.

### Timeline milestones

| When | Story |
| --- | --- |
| 2022–23 | First Java programming class, junior year at Edwardsville High School |
| 2023–24 | AP programming, college credit and an object-oriented Java foundation |
| Summer 2024 | Learning React; first real app, a never-deployed social network |
| Aug 2024 | Starting at SIUE, B.S. CS with a Mathematics minor |
| Aug 2024 | FastGPT Chrome extension; arrow-key ChatGPT navigation, moving into Next.js; no public repository link |
| Jul 2025 | PlaySkillSphere: first public app, VPS/WebSockets, playing remotely with a friend; GitHub link only |
| Dec 2025 | DocuQuery: document chat/RAG, Next.js and Supabase vector search; GitHub link |
| Dec 2025 | Starting the freelance practice; role retains `2025 – Present · Remote` and its existing accomplishments |
| Mar 2026 | StafferAI: production multi-tenant RAG, roles, billing and rate limiting; live link |
| Mar–Aug 2026 | Zipper Software Engineer Intern, Remote; existing three accomplishments and company link |
| Spring 2026 | First paid client, website updates for a local plumbing company |
| Apr 2026 | Miles to Go nonprofit website and 5-star review; live link |
| Jun 2026 | Site Builder CLI, prototype client sites in under 20 minutes; GitHub link |
| Fall 2026 · now | SIUE junior, building Procks, supporting himself through freelance development, applying/interviewing for Summer and Fall 2027 internships |

### [Planned] Yearly timeline

The [design review plan](./changes/design-review-feedback.md) will replace the
current milestones above with exactly one entry per year below. This table is a
coverage checklist, not final website prose: use concise first-person copy, not
long paragraphs or nested role cards. Final titles/wording are TBD (decide during
implementation). Preserve the freelance practice's `2025 – Present` wording
compactly, along with relevant project links; PlaySkillSphere keeps its GitHub
link, never its dead live site.

| Year | Required highlights |
| --- | --- |
| 2022 | Started introductory Java programming courses at Edwardsville High School. |
| 2023 | Continued Java programming through senior year; began AP programming courses that earned college credit and built a strong object-oriented foundation. |
| 2024 | Graduated high school; started a B.S. in Computer Science with a Mathematics minor at Southern Illinois University Edwardsville; began learning React and web application development over the summer; built a first app, a Twitter-style social media clone; explored Chrome extensions, including FastGPT for ChatGPT. |
| 2025 | Expanded web development learning from React into Next.js and related ecosystems; built PlaySkillSphere with real-time WebSocket lobbies/games, self-hosted on a VPS; built DocuQuery, a document-chat/RAG app using Next.js and Supabase vector search; began putting himself out there for freelance development near the end of the year. |
| 2026 | Built StafferAI, a production multi-tenant RAG/knowledge platform with organization access controls, billing and rate limiting; began gaining website clients; is now building Procks, a client mobile social networking app; landed the first software engineering internship at Zipper; built Site Builder, the CLI for generating and deploying prototype client sites. Its broader outreach-to-demo-site tool for freelance web developers is a **future direction**, not already-built functionality. |

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

### [Planned] Freelance hero

The [design review plan](./changes/design-review-feedback.md) will replace the
current hero heading with **“Freelance software development”** and add Christopher's
portrait to its right on desktop, with a suitable compact stack on phones. The
portrait must be sharp at actual rendered/high-DPI sizes. The hero will remain
content-height, with label-width mobile CTAs, its back link/local-service badge
and existing Get a quote/See pricing targets.

Introductory copy beneath the heading will describe websites, web applications,
mobile applications, APIs and more. It will express interest in internal tools
for local businesses—replacing or improving disconnected software and connecting
fragmented workflows—without claiming an established internal-tooling client
track record. It will invite uncertain-fit projects, promise an honest review and
assessment, and link “reach out” to `#freelance-contact`. Final wording and phone
stacking order are TBD (decide during implementation). The rest of the freelance
page structure and pricing will remain unchanged; any necessary metadata edits
will retain local SEO and existing public URLs.

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
  the project, narrative and GitHub links. **[Planned]** The
  [design review plan](./changes/design-review-feedback.md) will remove only its
  homepage Featured Work card; its yearly timeline story, freelance personal-project
  card and GitHub links will remain.

## Out of scope

A server or backend, an illustrated/3D timeline, and Procks launch materials before
approval. The site has no accounts, database or dynamic content service.
