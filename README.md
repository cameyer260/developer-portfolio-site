# Christopher Meyer — Dev Portfolio

Personal portfolio for Summer and Fall 2027 software engineering internships and
freelance software development. Recruiters start at `/`; local businesses use
`/freelance`.

Hand-written HTML, plain CSS and JavaScript, with htmx-enhanced navigation. The
warm-dark, terminal-soul design pairs Newsreader headings with IBM Plex Sans body
text and IBM Plex Mono labels.

## Run locally

Use a current Node.js release supported by Wrangler (Node 22+ recommended) and npm
for `npx`. Node runs the local Wrangler tool, not the site. There are no project
dependencies to install and no build step. `npx` can use npm's external cache;
do not run `npm install` or create a root package manifest for local serving.

```bash
npx wrangler pages dev site --port 8788 --ip 127.0.0.1 --compatibility-date=2026-06-01
```

Open [http://127.0.0.1:8788/](http://127.0.0.1:8788/) and
[http://127.0.0.1:8788/freelance](http://127.0.0.1:8788/freelance).
This command runs locally; it does not deploy. The compatibility date avoids a
Wrangler/bundled-runtime date mismatch. Serve over HTTP, not `file://`.

Wrangler emulates Pages' clean URLs, custom 404 and `_headers`. Restart it if you
create `_headers` after startup. A generic static server is not equivalent for
route/header verification.

### Configuration

No site environment variables are required. Both forms contain the public
Web3Forms access key in a hidden input; it is not a secret or a runtime env lookup.
Keep the two copies synchronized. Never put private credentials under `site/`.
An existing ignored `.env.local` is unnecessary for this site and can be removed
by the owner; Wrangler may load it into its unused local Worker environment.

The repository includes no analytics snippet. The owner enables Cloudflare Web
Analytics at deployment; there is no Google or Vercel Analytics integration.

## Files and content

```text
site/                         # served as-is; nothing outside this directory is served
  index.html                  # /
  freelance.html              # /freelance (not a directory/index.html)
  404.html                    # unmatched paths, HTTP 404
  css/                        # base → layout → components → sections → utilities
  js/                         # ES modules, initialized on htmx loads/restores
  vendor/                     # htmx 2.0.11 + head-support 2.0.5
  fonts/                      # self-hosted WOFF2 and OFL licenses
  images/                     # responsive images and Lucide SVG sprite
  _headers                    # Pages security and caching rules
  robots.txt, sitemap.xml
  christopher-meyer-resume.pdf # original public URL retained
  …                           # portrait, favicons and Open Graph images
```

Copy lives directly in the HTML. Edit the relevant page, not a generated file.
Repeated blocks have `<!-- shared:NAME -->` markers; `site/index.html` is their
source of truth. Synchronize all copies when editing shared content. See the
[shared-block map](./docs/ARCHITECTURE.md#shared-markup) and
[content constraints](./docs/PRD.md#content-constraints).

## Verify changes

There are no npm lint/build scripts or committed automated test suite. Against the
local server:

- Review screenshots at phone, tablet and desktop widths (375, 768, 1280px), not
  just overflow measurements. Check wrapping, whitespace and CTA/card alignment.
- Exercise navigation in both directions, anchors, back/forward, metadata/focus
  after swaps, mobile menu, resume download and a deep-path 404.
- Test keyboard access, reduced motion and JavaScript-disabled navigation.
- Mock Web3Forms to test sending, success, errors, reset and native no-JS POST.
  **Do not send real test emails without approval.** Real delivery is still
  unverified; see [verification status](./docs/ARCHITECTURE.md#verification-status).
- Check links, shared-block parity, JSON-LD, all assets and response headers. Run
  mobile Lighthouse on both content pages; target 95+ in all four categories.

```bash
curl -I http://127.0.0.1:8788/
curl -I http://127.0.0.1:8788/freelance
curl -I http://127.0.0.1:8788/a/b/c/missing
curl -I http://127.0.0.1:8788/vendor/htmx-2.0.11.min.js
git diff --check
git diff --cached --check
```

Expected: content routes return 200, the unknown path returns 404 with `no-store`,
and only fonts/versioned vendor files have one-year immutable caching.

## Hosting and deployment

The source targets Cloudflare Pages: Git-connected `main`, no build command,
output directory `site`. The canonical host is
[www.christophermeyer.dev](https://www.christophermeyer.dev).

**Deployment and production cutover are owner-only and have not been verified
locally.** Agents must never deploy, configure cloud projects or change DNS.
The [owner checklist](./docs/ARCHITECTURE.md#owner-only-deployment-and-cutover)
covers domains, analytics, production checks and retiring the Vercel integration.

## Documentation

- [AGENTS.md](./AGENTS.md): contributor rules and gotchas; read before editing.
- [Product](./docs/PRD.md): audiences, sections and behavior.
- [Architecture](./docs/ARCHITECTURE.md): structure, decisions, maintenance,
  verification gaps and deployment checklist.
