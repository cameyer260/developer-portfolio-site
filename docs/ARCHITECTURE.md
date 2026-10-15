# Architecture

How christophermeyer.dev is built and maintained. For audiences and behavior, see
[PRD.md](./PRD.md); for the local command, see [README.md](../README.md#run-locally).

## Static delivery

`site/` is the complete deployable artifact: hand-written HTML, plain CSS,
JavaScript ES modules and static assets. There is no build step, package manifest,
framework, server, database, Pages Function or GitHub Action. Files outside `site/`
are not served.

| Source | Public route |
| --- | --- |
| `site/index.html` | `/` |
| `site/freelance.html` | `/freelance` |
| `site/404.html` | unmatched paths at any depth, HTTP 404 |
| `site/robots.txt`, `site/sitemap.xml` | corresponding root URLs |

**Use `freelance.html`, not `freelance/index.html`.** Pages serves the former
directly at `/freelance` and redirects `/freelance/` and `/freelance.html` to it.
The directory layout redirects the canonical route to `/freelance/` instead.
All asset references are root-absolute so deep-path 404s remain styled.

Original public URLs remain intact: `/christopher-meyer-resume.pdf`,
`/christopher-meyer.webp`, `/og-image.png`, `/freelance-og-image.png`, `/favicon.svg`
and `/favicon.ico`. The apple-touch icon is a separate 180px PNG.

Cloudflare Pages is the delivery target: Git-connected `main`, empty build
command, output directory `site`. The owner handles deployment and production
cutover; local verification is not evidence that this checkout is live.

## Shared markup

There is intentional duplication, not a template engine. `site/index.html` is the
source for every matching `<!-- shared:NAME -->` … `<!-- /shared:NAME -->` block.
Keep the full block byte-identical in every page that contains it.

| Block | Pages | Contents |
| --- | --- | --- |
| `head` | all three | Charset, viewport, dark theme, htmx config, icons, preloads, ordered stylesheets, identical scripts |
| `header` | all three | Skip link, logo, native popover nav, GitHub and resume |
| `footer` | all three | Copyright/year and social/contact links |
| `jsonld` | home, freelance | Person + ProfessionalService graph |
| `procks` | home, freelance | High-level shared WIP card |
| `contact-form` | home, freelance | Form opening and name/email fields, through message label |
| `contact-form-end` | home, freelance | Hidden key/honeypot, submit/error and success/reset UI |

The message textarea lies **between** the form markers because its placeholder is
page-specific. Per-page title, description, canonical, OG, Twitter and robots tags
belong inside `<!-- page:meta -->` markers outside `shared:head`. JSON-LD is shared
within that page-specific region. The 404 has only its title and `noindex`, not a
canonical or JSON-LD.

After a shared edit, compare all marked copies, including the 404. Don't rely on
an uncommitted scratch synchronizer existing on another machine. Reconsider
static templating if the site grows past about four pages, not for these three.

## CSS and design system

Stylesheets load through five ordered `<link>` tags, never serial `@import`s:

1. `base.css`: first declares
   `@layer reset, tokens, base, layout, components, sections, utilities;`, then
   self-hosted fonts, reset, semantic tokens and base typography/accessibility.
2. `layout.css`: container, section, stack, cluster, grid and split primitives.
3. `components.css`: icons, labels, prompts, cursor, links, buttons, badges, tags,
   cards/spotlight, terminal chrome, section headings, lists, fields and reveals.
4. `sections.css`: shared header/footer and individual page sections.
5. `utilities.css`: a small set of helpers such as `sr-only`, `mono` and `accent`.

Use BEM-style component classes and custom properties for spacing, fluid type,
radii and motion. The warm palette is background `#14110d`, surfaces `#201a14` /
`#2b231b`, text `#faf5ee`, muted `#b5a898`, amber `#f59e0b` and orange `#ea7a3e`.
Soft text, faint labels, border and glow tokens extend it. Do not replace it with
black or cool greys. Grain is an opaque SVG turbulence tile averaging to the
background color, not a lightening fixed overlay.

The hero has content-height/fluid padding and label-width doors. Home's whoami
and intro split from 72rem. About stacks below 64rem; above it the portrait is
cropped 4:5 and sticky to balance the longer copy. Project cards align their
footers; pricing uses CSS subgrid to align headings, prices, lists and CTAs in
pairs, with hidden empty note rows when stacked. The timeline's desktop aside is
the reserved space for future illustrations.

Localized refinements keep these primitives and the visual identity:

- Homepage-scoped WIP rules put Procks beside StafferAI while Site Builder keeps
  its featured span and the shared Procks markup stays byte-identical. The base
  `.project--wip` full-width treatment is retained for the freelance page only.
- Education precedes Skills in HTML, not just visual order. Skills uses scoped
  section/header spacing and a label-plus-wrapping-list layout; global section
  spacing is untouched.
- `.hero--freelance` holds a heading-left/portrait-right desktop layout with
  compact phone stacking. The homepage hero is unaffected: content-height
  spacing, logical DOM order and label-width mobile CTAs.

The mobile menu uses native `<nav popover>` / `popovertarget`, inline from 48rem.
Browsers without the API get wrapping links. The sticky header is solid by default;
a supported CSS scroll-driven animation fades it in over the first 5rem, only
inside `@media (prefers-reduced-motion: no-preference)`. A media feature inside
`@supports` is not a substitute for that media query.

### Fonts and images

- **Newsreader 400 normal/italic**: display and quotes; static optical-size 48
  instances keep downloads small while working at quote and hero sizes.
- **IBM Plex Sans variable 400–600**: body and UI.
- **IBM Plex Mono 400/500**: labels/terminal; separate unicode-range symbol subsets
  supply arrows and check marks. Triangle bullets are drawn in CSS.
- Latin WOFF2 subsets total about 108KB, use `font-display: swap` and no synthetic
  bold/italic. Newsreader normal and Plex Sans are preloaded. OFL licenses live
  in `site/fonts/OFL-*.txt`.
- `site/images/icons.svg` is a Lucide 0.539.0 symbol sprite with its ISC notice.
  Use `<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#name"/></svg>`.
  Symbols omit paint attributes; CSS owns strokes/fills (`icon--filled` for stars).
- The portrait keeps its original URL at 1200×801 and is served directly, capped
  so displays never upscale it: the prior 720×481 variant was selecting at DPR 1
  and stretching to a taller 4:5 crop, which caused the reported blur. Both
  portraits keep their landscape composition with reserved dimensions; neither is
  lazy-loaded, and both carry high fetch priority. The About image can be LCP,
  the freelance hero image is LCP-adjacent.
- The Miles to Go screenshot has 720/960/1280px WebP variants in
  `images/work/`, from a 1440×720 capture at a 1440px viewport. To refresh, capture
  the same area and overwrite the three responsive images. They are revalidated,
  not immutable-cached. The screenshot link is excluded from tab/screen-reader
  navigation because the adjacent Live Site button provides the same action.

## JavaScript lifecycle

`vendor/htmx-2.0.11.min.js` and `vendor/head-support-2.0.5.min.js` are pinned,
vendored minified npm distributions. Deferred head scripts precede
`<script type="module" src="/js/main.js">`. All pages carry identical tags so
head-support preserves those nodes rather than dropping/re-executing scripts.

`main.js` sets `html[data-js]`, calls `boost.setup()` once, and initializes each
feature through `htmx.onLoad(root => …)`. This covers first load, swaps and history
restores. On first load `root` is body; after swaps/restores it can be any new
top-level element, not necessarily main or body.

- Use `dom.js`'s `select(root, selector)` to include the root itself and descendants.
- Keep `init(root)` idempotent. Listener/observer binding guards use **WeakSet**,
  not `data-initialized`: history restores recreate nodes from HTML snapshots,
  preserving data attributes but losing listeners.
- Reset transient state on `htmx:beforeHistorySave` so back/forward does not freeze
  an open/glowing/pending UI. Don't assume an HTML snapshot preserves live behavior.

| Module | Responsibility |
| --- | --- |
| `boost.js` | Setup-only page transition, history, focus and navigation glue |
| `chrome.js` | Close the menu after a link, update `[data-current-year]` |
| `contact.js` | Fetch submission, sending/error/success/reset UI, reset pending state before snapshots |
| `notfound.js` | Fill the requested path in the decorative 404 command using text content |
| `reveal.js` | IntersectionObserver, reading-order stagger, `.is-revealed` |
| `spotlight.js` | Mouse-only card glow; no touch/pen or reduced motion; clear before snapshot |
| `timeline.js` | Decorative sticky year follows the entry crossing mid-viewport |
| `typewriter.js` | Layout-stable whoami typing, full screen-reader label, finish before snapshot |
| `dom.js` | Root-inclusive selection and shared reduced-motion media query |

**Footer hook is `data-current-year`.** Timeline entries use `data-year`; a generic
year updater would overwrite their entire contents.

The timeline holds five `.tl__item` elements with `data-year="2022"` through
`"2026"`, keeping the ordered list, rail, reveals and sticky aside with
root-inclusive, idempotent initialization. `.timeline__year` uses a 1.2 line
height with `0.1em` block padding so the gradient-clipped glyphs paint fully at
rest and mid-animation; no JS change was needed. The marker stays decorative and
reduced-motion year updates stay static.

Typewriter replays on fresh loads/swaps, not history restores. The untyped
remainder reserves space. Reveal/typewriter hiding applies only when scripting is
enabled and motion allowed; a 2.5s failsafe exposes content if scripts don't load.
Reduced motion disables time-based CSS animation/transitions, smooth scroll,
spotlight, rail fill, cursor blink and JS animation; the year text can still update.

## htmx navigation and edge cases

Body carries `hx-boost="true" hx-ext="head-support"`. Boost uses the default body
`innerHTML` swap, including header and footer; head-support merges title, metadata,
canonical, JSON-LD and robots. Pages remain real independently navigable documents.

The shared config is:

```json
{"includeIndicatorStyles":false,"refreshOnHistoryMiss":true}
```

This avoids injected indicator styles that head-support would remove, and uses a
full load when an entry is missing from htmx's history cache.

`boost.js` preserves these behaviors:

- Same-page links expressed as `/#work` are intercepted at `htmx:confirm` and sent
  through native fragment navigation, avoiding a refetch/body swap.
- Back from a same-page anchor to an htmx entry for the page already shown cancels
  that cache swap, allowing native scroll restoration.
- `data-swapping` temporarily disables CSS smooth scrolling during swaps, history
  restores **and popstate**; otherwise browser history scrolls can animate for
  seconds. Ordinary anchor clicks can scroll smoothly when motion is allowed.
- Boosted HTTP/network errors fall back to a full navigation, including a missing
  route's styled 404. Leaving the 404 restores indexable robots/JSON-LD.
- After a boosted swap, focus goes to the cross-page anchor or `main`, using
  `tabindex="-1"` and no extra scroll.
- View Transitions follow reduced-motion changes live. CSS also disables their
  animations under reduce. The header has its own transition name to hold still.
  Unsupported engines swap instantly; no artificial timed swap delay is added.

**Forms and every resume PDF link must keep `hx-boost="false"`.** htmx otherwise
boosts even cross-origin forms and same-origin `download` links: JSON or PDF is not
page HTML. External links, mailto/tel and target-blank links are not boosted.

WebKit's native same-page history scroll restoration is about 66px off the tested
anchor position even without JS. Regression checks account for this engine behavior
rather than adding a site-specific workaround.

## Contact integration and configuration

Both forms post directly to `https://api.web3forms.com/submit`; JS uses FormData
and `Accept: application/json`. Native required/email validation runs first. The
public hidden access key and botcheck honeypot are shared. No proxy or backend is
involved. Without JS the browser makes the POST and displays the vendor response.

The API's success flag controls the inline success panel; network, parse or API
errors keep the message and display an alert. Success gets focus; Send another
restores the cleared form and focuses name. The reset layer enforces
`[hidden] { display: none !important }` so component display rules cannot reveal
hidden panels/forms. See [PRD](./PRD.md#contact-form) for the visible behavior.

There are no site env vars. The public key is already in HTML; don't copy it into
docs. Ignored `.env.local` is redundant, although Wrangler may load it into its
unused Worker environment. Domain restriction in the Web3Forms dashboard is
optional owner hardening and must be tested if enabled.

## SEO, caching and security

The canonical host is `https://www.christophermeyer.dev`. Metadata is hand-written
per page. Person + ProfessionalService JSON-LD is identical on both content pages;
the service includes its name/address and references the person. Keep contact
identity in markup, structured data and both pages consistent. The 404 has noindex
and is omitted from the static sitemap. `lastmod` is omitted rather than stale.

`site/_headers` applies to all routes:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Only `/vendor/*` and `/fonts/*` have
`Cache-Control: public, max-age=31536000, immutable`. Vendor versions are in their
filenames; font files must never be overwritten at an existing URL. HTML, CSS,
JS, images and the resume retain Pages' `max-age=0, must-revalidate`. Missing pages
return `no-store`. HSTS belongs to the Cloudflare zone, not this file.

No CSP is configured. This is a deliberate trade-off, not a claim that static
sites cannot benefit from CSP: no user-generated HTML is rendered, and edge-injected
analytics cannot be validated locally. Framing is denied separately. Any later CSP
must account for the Web3Forms fetch/native form action, Cloudflare Insights script
and connections, and the grain's data-URI image, then be tested in production by
the owner.

## Verification status

Local checks on **2026-10-15**, after the design-review refinements (five yearly
timeline entries, homepage Procks card, unclipped year, compact Skills,
freelance hero) landed on top of the earlier dead-link removal:

- Chromium and WebKit: full boost regression suites pass (navigation, merged
  head, focus, same/cross-page anchors, history, restored-form rebinding with a
  mock, PDF opt-out, 404 fallback and head recovery). All five year glyphs and
  mid-animation frames are unclipped at 1024/1280/1440px in both scroll
  directions, after history restore and under reduced motion.
- Fresh screenshots at **375/768/1280px** on both content pages and a deep 404;
  no horizontal overflow or unexpected page/resource errors, including at 200%
  text size. Skills copy is byte-identical (24 names, three categories) at
  roughly half the previous section height. Portraits verify at DPR 2 with no
  upscaling on either page.
- Keyboard pass, mobile menu, skip link, reduced-motion visibility/transitions,
  native no-JS content/menu/anchors/mocked-POST and script-failure visibility
  fallbacks pass. Mocked contact tests pass sending/disabled state, success and
  focus, Send another/reset and network/API errors with the message preserved.
  **Mocks are not evidence of email delivery.**
- Mobile Lighthouse 12: **96 Performance / 100 Accessibility / 100 Best
  Practices / 100 SEO on home, 97 / 100 / 100 / 100 on freelance**; LCP about
  2.5s, CLS 0, TBT 0. A real HTTP 404 cannot be audited by Lighthouse;
  browser checks cover it instead.
- Shared blocks match; JSON-LD parses and matches; local links/anchors/sprite IDs
  and assets resolve, including removal of the orphaned 720px portrait variant.
  Routes/redirects and response headers match the rules above.

Earlier baseline checks on **2026-10-15**, after removing all three dead
PlaySkillSphere live links (GitHub and narrative retained):

- Chromium and WebKit: **9/9 real-page boost regression checks each** (navigation,
  merged head, focus, anchors, history, restored-form binding with a mock, PDF
  opt-out, 404 fallback and removal of noindex when leaving it).
- Fresh screenshots at **375/768/1280px** on both content pages and a deep 404;
  no horizontal overflow or unexpected page/resource errors. Phone/desktop heroes,
  PlaySkillSphere cards and timeline links were visually inspected: no stretched
  replacement buttons or broken card/footer alignment after removal.
- Keyboard pass: **38 home / 37 freelance tab stops**, visible focus/in-view and
  clear of the sticky header. Mobile menu, skip link, reduced-motion visibility/
  transitions and native no-JS mobile navigation/anchors pass. Keyboard assertions
  wait for the focus paint before measuring the skip link.
- Mocked contact tests pass required validation, sending/disabled state, success
  and focus, Send another/reset, network/API errors with message preserved, and
  native no-JS POST. The freelance form also passes after history restoration.
  **Mocks are not evidence of email delivery.**
- Mobile Lighthouse 12: **98 Performance / 100 Accessibility / 100 Best Practices /
  100 SEO on both content pages**; LCP about 2.3s, CLS 0–0.001, TBT 0. A real HTTP
  404 cannot be audited by Lighthouse; browser/keyboard checks cover it instead.
- Shared blocks match; JSON-LD parses and matches; local links/anchors/sprite IDs
  and assets resolve. External links resolve except LinkedIn's expected bot-only
  999. The link check's request to its deliberately unknown test route returns the
  expected 404, not a broken site resource.
- Local routes/redirects and response headers match the rules above. Earlier copy
  verification against the original site found only approved availability,
  graduation, added content, date formatting and typographic differences.

### Open verification gaps

- **Real email delivery remains unverified.** The owner approved one test, which
  was attempted from localhost and showed the error UI without a captured API
  response or confirmed email. Earlier non-delivering probes returned 403,
  `cf-mitigated: challenge` and challenge HTML. A fresh non-submitting curl GET
  returned 403 JSON (“method is not allowed”); a browser GET failed to fetch.
  These different GET/probe responses do not establish whether a valid browser
  POST or the inlined key works. No further real submission was made in this pass.
  The prior one-test approval is not permission for repeated sends. **Owner action:**
  test from a normal browser and confirm receipt, coordinating any new test first.
  Do not bypass challenges, add a proxy, switch vendors or churn the form to make
  automation pass.
- **Firefox is unverified:** a fresh headless launch timed out with sandbox/framebuffer
  errors. Chromium/WebKit results must not be presented as Firefox coverage. A
  normal Firefox browser check remains necessary.
- Production routing/headers, apex redirect, Google's remote structured-data test
  and Cloudflare analytics require owner checks after deployment below. No deploy,
  DNS/project configuration, commit or push is part of local verification.

## Owner-only deployment and cutover

These are reference instructions for the owner, **never agent execution tasks**.

1. Review locally, including the open email/Firefox checks. In Pages, connect this
   repo with production branch `main`, no build command and output directory
   `site`. There are no build-time env vars or configuration file to add.
2. The domain's DNS is already on Cloudflare and points to Vercel until cutover.
   Attach `www` as the Pages custom domain; arrange the apex redirect to
   `https://www.christophermeyer.dev/` through a Cloudflare redirect rule (or an
   attached/redirected apex). Verify path/query preservation and canonical URLs.
3. Check `/`, `/freelance`, clean-URL redirects, a deep unknown route's actual 404,
   resume download, portrait, icons, fonts and both OG images. Use `curl -I` to
   verify `_headers`, cache rules and 404 `no-store` on the deployed host.
4. Check contact submission from a normal browser and verify recipient delivery.
   If domain restriction is enabled, ensure the production host is allowed.
5. Run Google's Rich Results Test on both live content URLs. Parsing JSON locally
   does not replace Google's remote test; localhost is not reachable by it.
6. Enable Cloudflare Web Analytics and verify exactly one page view for direct
   loads **and boosted/pushState navigation**. No snippet is in source today.
   Automatic injection into body may rerun a beacon on every htmx body swap and
   double-count. If views duplicate or boosted views are missing, disable automatic
   injection and put the manual deferred Cloudflare beacon snippet with the owner's
   token in `shared:head` on all three pages. head-support preserves identical head
   scripts between swaps; verify resulting page views rather than assuming them.
7. After merging to `main`, Vercel's old Git integration may attempt a framework
   build with no package manifest and fail; its previous deployment stays live
   until DNS moves. Keep that fallback until cutover is verified, then disconnect
   and delete the Vercel project. The source includes no Google/Vercel analytics.

## Decisions and why

- **Two routes, two audiences:** the homepage presents engineering credentials;
  `/freelance` contains commercial services/pricing and local-business SEO. A
  freelance-first page, audience toggle or one long mixed page weakens that focus.
- **Static/no build/no server:** all content is static and the only form posts to
  an existing vendor. React/Next.js, Tailwind, Rust and a VPS add maintenance without
  useful behavior here. Duplicating three small pages is an intentional cost of
  avoiding tooling, reconsidered only if page count grows.
- **Cloudflare Pages:** a folder deploy with no project config/server maintenance,
  using the existing Cloudflare DNS. Workers static assets are not required;
  reconsider if a Workers-only feature is actually needed. Git integration needs
  no separate build Action. Keeping the repo preserves history and a controlled
  owner-run Vercel cutover.
- **htmx only for boost/head-support:** smooth progressive enhancement over real
  links, with independently indexable/no-JS pages. Body swaps simplify lifecycle;
  head merging preserves metadata/scripts. View Transitions avoid a timed swap's
  added latency and fall back cleanly.
- **Keep warm-dark/terminal-soul, add editorial type:** the approved identity stays
  distinctive without becoming an IDE/terminal gimmick. Newsreader adds warmth;
  Plex body/labels preserve continuity. Cool slate/indigo, light-paper terminal
  styling and maximal motion were rejected. Self-hosted subsets avoid font-host
  dependencies and control payload.
- **Cloudflare Web Analytics only:** cookieless and sufficient for a portfolio,
  without a consent banner or host-specific Vercel analytics. Edge injection and
  htmx behavior require production verification, not speculative local changes.
- **No CSP yet:** preserve the untested edge analytics integration while retaining
  basic security headers; revisit with the owner after production validation.
- **Code-only PlaySkillSphere links:** the live deployment is unavailable; the
  owner chose removal over sending visitors to a dead domain. The project still
  demonstrates the engineering story and has accessible source.
- **Annual timeline, not role cards:** five brief yearly summaries improve
  scanability while retaining the approved career/project highlights.
  Education/resume stays separate so the timeline does not become a second
  resume. Site Builder's outreach expansion is explicitly aspirational rather
  than inflating built capability.
- **Reuse Procks with page-scoped layout:** the homepage PlaySkillSphere card is
  replaced with current client work while its timeline and freelance presence
  remain. Scoped CSS, not divergent shared-card copies, preserves byte-identical
  markup and avoids an unintended freelance redesign.
- **Image quality before payload savings:** the portrait correction was driven by
  rendered/high-DPI inspection, not an assumed compression cause or score
  chasing. The unchanged original looked worse through source selection and
  upscaling; serving it directly at capped display sizes restores quality with
  stable layout.
- **Broader freelance capabilities, honest positioning:** the hero revision
  communicates more than websites without changing the commercial page structure.
  Internal-tooling interest and the project-fit invitation broaden the message
  without inventing an established client track record.
