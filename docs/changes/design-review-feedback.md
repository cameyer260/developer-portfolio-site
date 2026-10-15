# Change: Design review refinements

Status: Planned

> This file is temporary scaffolding. Implement the tasks in order. Update this
> file as you go (check off tasks, adjust the design if reality differs, record
> surprises). When the code works: fold everything lasting from this file
> (design, decisions and their reasons, behavior, gotchas) into the permanent
> docs (PRD, ARCHITECTURE, README, and any new topic docs the change requires).
> Remove every `[Planned]` marker for this change entirely, rewrite any planned
> wording as plain present tense, remove obsolete "Currently / Planned"
> comparisons, so the docs read as normal docs with no trace of the change being
> a change, then **delete this file** (and `docs/changes/` if it is now empty).
> The change is not done until the code works, the docs describe it as built,
> and this file is gone. Git history is the record of the change.

The owner confirmed the recorded design feedback as the agreed alignment for this
plan. All six changes below are in scope; none is implemented by this document.

## Why

The static-site review found an overlong career timeline, a degraded-looking
portrait, clipped decorative years and an oversized Skills section. The homepage
project selection should emphasize current client work, while the freelance hero
should communicate software development beyond websites. Improve scanability and
visual quality for recruiters and business owners without replacing the approved
warm-dark, terminal-soul identity or static architecture.

## What changes

| Area | Currently | [Planned] After implementation |
| --- | --- | --- |
| Experience | 14 individual milestones, including large role cards and a separate Now entry | Exactly five brief first-person yearly entries, 2022–2026, covering the [approved annual highlights](../PRD.md#planned-yearly-timeline) without nested role cards or long paragraphs |
| Portrait | Homepage image in `#about`; owner reports degraded quality | Sharp rendering in the same homepage location and in the new freelance hero portrait, verified at actual display sizes and high DPR |
| Homepage Featured Work | Site Builder, StafferAI, PlaySkillSphere, then a full-width Procks WIP card | Three cards: Site Builder remains featured; StafferAI and one Procks WIP card share the next row on suitable wider screens |
| Decorative year | Owner reports numerals clipped at top/bottom | Fully painted, balanced numerals at rest and throughout year changes, including reduced motion |
| Education and Skills | Recommendations → Skills → Education & Resume → Beyond the Code → Contact; spacious numbered skill panes | Recommendations → Education & Resume → compact Skills → Beyond the Code → Contact; all skill copy and anchors preserved |
| Freelance hero | Website-focused heading/copy; no portrait | “Freelance software development”, photo to the heading’s right on desktop, suitable phone stacking, broader capabilities and an honest project-fit invitation |

PlaySkillSphere will remain in the timeline and the freelance personal-project
section with GitHub links. Its homepage card alone will be removed. Procks will
remain WIP and subject to the existing confidentiality restrictions.

## Out of scope

- Moving the homepage portrait from About into the homepage hero, or redesigning
  that hero or the site’s palette, typography and terminal motifs.
- Removing skill names, renaming categories, shortening their copy or putting
  skills behind a disclosure, carousel or other interaction.
- Reworking education/resume content, pricing, recommendations, reviews or the
  freelance sections below the hero, except necessary shared-card regression fixes.
- New Procks client information, screenshots, links, launch claims or case studies.
- Actually building Site Builder’s outreach expansion or delivering an
  internal-tooling expansion. Both must be described as future direction/interest,
  not completed functionality or established client work.
- Timeline illustrations/3D, new routes, frameworks, generators, runtime
  dependencies, backend/API changes or contact-provider changes.
- Real test emails without new approval, deployment (including previews), cloud
  configuration, DNS changes, commits or pushes.

## Design approach

### Five yearly entries and the year marker

Edit `site/index.html`’s existing `#experience` list, not education/resume. Use the
[planned yearly content in PRD](../PRD.md#planned-yearly-timeline) as the coverage
checklist. The years must be exactly `2022`, `2023`, `2024`, `2025`, `2026`, in that
order, with matching `data-year` values; there will be no separate Now entry.

Keep each year concise, particularly 2026. Do not preserve the old length through
nested role cards, exhaustive accomplishment lists or extra milestones. Retain the
freelance practice’s `2025 – Present` wording compactly in 2025, not as another
role card. Keep useful existing links compact, including PlaySkillSphere’s GitHub;
do not restore its dead live site or invent a FastGPT repository. Final titles and
first-person copy are **TBD (decide during implementation)** within these constraints.
Site Builder’s broader outreach-to-demo-site expansion must read as a future aim.

Reuse the ordered list, rail, reveal behavior and desktop sticky aside. Keep the
year `aria-hidden` and preserve visible year labels in the entries. `timeline.js`
already observes `[data-year]` through an idempotent, root-inclusive `init(root)`;
change it only if diagnosis or five-entry/history tests require it. Do not confuse
this hook with the footer’s `data-current-year`.

Inspect `.timeline__year`’s font metrics, `line-height: 0.9`, gradient text paint
bounds and ancestors before selecting a fix. The existing year-change animation
moves the text by `0.12em`; include its intermediate frames, not just its final
state. Prefer a local geometry/paint-bound correction over changing fonts, hiding
the year or adding motion. The exact clipping cause/fix is **TBD (decide during
implementation)**, not established by the screenshot alone.

Owner reference: [timeline year clipping](./assets/timeline-year-clipping.png).
This asset stays outside `site/` and must not become public site content.

### Portrait diagnosis before asset changes

Verified during planning:

- `/christopher-meyer.webp` is 1200×801, about 37KB, and byte-identical to the
  previous site’s tracked portrait. It has not itself been recompressed by the
  static rewrite.
- `/images/christopher-meyer-720.webp` is 720×481, about 11KB.
- The homepage advertises both via `srcset`/`sizes`. CSS stacks the landscape
  image below 64rem and uses a 4:5 `object-fit: cover` frame with a viewport-based
  maximum height on desktop.

These facts do not establish the cause of perceived blur. In a browser, compare
source images and the rendered face; inspect `currentSrc`, intrinsic dimensions,
actual CSS dimensions, `sizes`, crop and DPR. Account for the effective source
pixels remaining after cover-cropping, not just the file’s full width.

Preserve `/christopher-meyer.webp` as a working public URL. Reuse the approved
portrait on both pages, with page-appropriate display dimensions and `sizes`;
add/regenerate responsive assets only when diagnosis supports it. Do not upscale
an insufficient source and claim restored detail. If a sharper source is needed
and unavailable, request it from the owner and report the blocker. Exact variants,
quality settings, crops and sizes are **TBD (decide during implementation)**.

Reserve image space, provide useful alt text and avoid lazy-loading the freelance
hero portrait. Preserve appropriate homepage fetch priority. Do not sacrifice
visible quality to keep the old byte count or Lighthouse score.

### Homepage projects without freelance regressions

Move/reuse `shared:procks` in PlaySkillSphere’s homepage position and remove the
old homepage PlaySkillSphere card; do not add a second Procks card. Keep Site
Builder and StafferAI copy, links and hierarchy. Update the section description
so it accurately describes three projects, including a client app in progress.

`sections.css` currently makes every `.project--wip` span the work grid from
48rem and gives its body a two-column layout from 64rem. Use homepage-scoped CSS
for Procks’ new compact position/body so StafferAI and Procks can share a row;
retain the existing full-width freelance WIP presentation. Keep `shared:procks`
byte-identical across both pages, with `index.html` as source. Do not create fake
links or empty action buttons to balance the cards. Check the nine Procks tags
for wrapping and column balance at tablet and desktop widths.

### Education order and compact Skills

Move the complete `#education` block before `#skills` in DOM order, not just with
CSS ordering. Preserve all education content and both PDF opt-outs. Update the
displayed section indices to Education `04`, Skills `05`; later indices stay in
sequence. Preserve `#education`, `#skills` and all other anchor targets.

Condense Skills through section/header spacing, pane padding, list gaps and/or
wrapping layout, scoped to this section rather than shrinking every section.
Preserve all three category labels and all 24 skill names (8 Languages, 7
Frameworks & Tech, 9 Tools), their copy and accessible grouping. Keep everything
visible without JS. Exact compact layout and spacing are **TBD (decide during
implementation)**; do not make text illegible to achieve density.

### Freelance hero

In `site/freelance.html`, replace the H1 text with exactly **“Freelance software
development”**. Add the portrait to the heading’s right on desktop, with a compact,
logical stacked reading order on phones. Scope new layout rules under
`.hero--freelance` so the homepage hero stays unchanged. Retain the back link,
local-service badge, Get a quote and See pricing targets. Keep the hero
content-height, with label-width mobile CTAs and no oversized whitespace.

The introduction beneath the heading must cover:

- Websites, web applications, mobile applications, APIs and more.
- Interest in building internal software tooling for local businesses: replacing
  or improving disconnected tools and connecting fragmented workflows. Do not
  imply this expansion is an established client track record.
- An invitation even when the visitor is unsure about project fit, with a promise
  to review it and give an honest assessment. Link “reach out” to
  `#freelance-contact`, not the homepage contact section.

Copy direction, **not final approved wording**:

> I can build websites, web applications, mobile apps, APIs, and more. I’m also
> looking to build internal tools for local businesses—to replace disconnected
> software, improve workflows, and connect the systems they already use.
>
> Not sure whether I can take on your project? Reach out, and I’ll take a look and
> let you know what I think!

Final introductory wording, phone stacking order and desktop proportions are
**TBD (decide during implementation)**. Review the page metadata and shared
ProfessionalService description for consistency; make only necessary descriptive
edits, preserving local SEO, public URLs and shared-block parity. No OG image
redesign or unrelated content rewrite is included.

## Impact

- Static HTML/CSS/assets will change; `timeline.js` may need a targeted fix.
  No data/API migration, build step or route changes are needed.
- Annual summaries intentionally replace the long milestone/role copy. Existing
  wording protections do not require keeping that detail, but internship
  availability, December 2027 graduation and freelance start-year facts remain.
- The homepage-only project replacement supersedes older guidance to retain
  PlaySkillSphere in both project sections; its story, freelance card and source
  link remain. Procks confidentiality is unchanged.
- Shared CSS, cropped high-DPI imagery and shorter timeline observer ranges are
  the main regression risks. Test direct loads, boosted loads and history restores.
- Existing staged/unstaged rewrite work and untracked tooling are not cleanup
  targets. Inspect status first; preserve work outside this plan.

## Docs affected

- `docs/PRD.md`: planned image-quality requirement, project lineup, annual timeline
  content, section order/Skills density and freelance hero behavior. Preserve
  current descriptions while planning; replace them with the verified result at
  completion.
- `docs/ARCHITECTURE.md`: planned scoped layout, portrait diagnosis, year-marker
  handling and reasons. Finalize actual asset sizes/crops, CSS/JS decisions and
  fresh verification results without presenting old test results as new coverage.
- `AGENTS.md`: label this as the active plan and make the approved exceptions to
  old timeline/project instructions explicit. At completion, reconcile those
  rules and remove this file’s docs-map entry.
- `README.md`: no planning-time change needed. Recheck its editing/verification
  instructions at completion; update only if the implemented result changes them.
- This file and its reference screenshot: temporary; remove after verification
  and permanent-doc reconciliation, deleting directories only when empty.

## Open questions / unverified assumptions

- **Unverified:** the precise source of portrait blur and availability of a
  higher-resolution original. Current source integrity is verified; browser
  sampling/crop quality is not. Diagnose early and ask for a better source if needed.
- **Unverified:** the year-clipping root cause and whether JS must change. Inspect
  rest/animation paint bounds and loaded fonts before fixing it.
- **TBD (decide during implementation):** final yearly titles/copy, hero prose,
  compact Skills layout, breakpoints/proportions and image variants. These are
  bounded refinements, not unresolved scope decisions.
- Current docs describe passing Chromium/WebKit checks, unverified Firefox and
  unverified real email delivery. These are historical results, not verification
  of this change. Report browser/service blockers honestly; do not repeat real
  submissions or deploy to close gaps.

## Tasks

- [ ] Inspect status, docs and affected code; preserve existing work. Check for an
      existing local server before starting Wrangler. Capture baseline screenshots
      at 375/768/1280px and save Skills category/text arrays in `.pi/tmp/`; verify
      the baseline has 14 timeline entries, four homepage projects and 24 skills.
- [ ] Diagnose portrait quality on phone and desktop at DPR 1 and 2, including
      actual-size visual comparisons, selected source and effective crop density.
      Record the cause and chosen remedy here; request a sharper source if needed.
- [ ] Reproduce the year clipping against the owner screenshot at multiple desktop
      widths, with loaded fonts and during the existing animation. Record the
      cause and a verified local fix approach before changing broader styles.
- [ ] Restore portrait quality in the homepage markup/assets/CSS as diagnosed.
      Verify sharp rendering at actual display size/DPR 2, accurate `sizes`,
      reserved dimensions, fetch behavior and the unchanged public portrait URL.
- [ ] Rewrite `#experience` into exactly five yearly entries using the PRD coverage
      checklist. Verify every approved highlight, brevity, first-person voice,
      `2025 – Present`, future-only Site Builder expansion, correct `data-year`
      values and retained PlaySkillSphere GitHub link; no nested role cards.
- [ ] Fix the decorative year’s paint bounds in `sections.css` and, only if needed,
      `timeline.js`. Verify all five years at rest and mid-transition at 1024,
      1280 and 1440px, scrolling both directions and after history restore; check
      reduced motion and the compact mobile fallback.
- [ ] Replace the homepage PlaySkillSphere card with the existing shared Procks
      card; update description/count and homepage-scoped WIP layout. Verify three
      cards, one Procks, balanced StafferAI/Procks columns, shared-block parity and
      unchanged freelance Procks/PlaySkillSphere cards and confidentiality limits.
- [ ] Move Education before Skills in `site/index.html` and renumber them. Verify
      DOM/reading order, unchanged copy/anchors, later numbering and PDF opt-outs.
- [ ] Condense Skills using scoped spacing/layout changes. Compare category/text
      arrays to baseline exactly; inspect 375/768/1280px screenshots for reduced
      visual weight without hidden content, cramped text or awkward wrapping.
- [ ] Revise the freelance hero heading, introduction and responsive portrait
      layout. Verify the exact H1, all three copy requirements, local “reach out”
      anchor, existing CTA targets, desktop photo-right/phone stacking, portrait
      sharpness and no homepage-hero regression. Review metadata consistency.
- [ ] Run static integrity checks from README: shared blocks (including the 404),
      unique IDs, local links/anchors, assets/sprite references and parseable,
      matching JSON-LD. Verify no dead PlaySkillSphere live links or new private
      Procks information were introduced.
- [ ] Critically inspect fresh full-page and section screenshots on both pages
      at 375/768/1280px, plus DPR 2 portrait crops and desktop year-animation frames.
      Check whitespace, wrapping, orphaned brackets, button widths, card footers,
      column balance, overflow, keyboard focus and enlarged text. Exercise Chromium
      and WebKit where available; explicitly report untested/blocked engines.
- [ ] Exercise boosted navigation both ways, same/cross-page anchors (including
      moved sections and `#freelance-contact`), back/forward, merged head/focus,
      mobile menu, PDF opt-outs and deep-path 404. Recheck reduced motion, no-JS
      and script-failure visibility. Mock contact regression requests only; no
      real emails are needed for this change.
- [ ] Run mobile Lighthouse on both content pages (95+ target in all four
      categories), relevant route/header checks, `git diff --check` and
      `git diff --cached --check`. Investigate regressions without degrading image
      quality; record actual results/blockers and clean up this pass’s scratch files.
- [ ] **Reconcile docs and delete this file**: fold verified behavior, image and
      layout details, decisions/reasons, gotchas and test results into permanent
      docs; remove every related `[Planned]` marker and obsolete current/planned
      comparison. Reconcile AGENTS content rules and remove its plan reference,
      delete this file and the obsolete reference screenshot, then remove their
      directories only if empty. Verify docs links and whitespace again. Do not
      leave the plan behind pending deployment.
