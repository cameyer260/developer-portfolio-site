# Product

What christophermeyer.dev does and for whom. For structure, see
[ARCHITECTURE.md](./ARCHITECTURE.md).

> A full rewrite and redesign is planned. Items marked `[Planned]` are agreed but not
> built. See [changes/static-site-rewrite.md](./changes/static-site-rewrite.md).

## Audiences

- **Recruiters (primary).** They come for Summer and Fall 2027 SWE internships
  (**not** Winter/Spring 2027). Served by `/`, which is recruiter-focused and never shows pricing.
- **Small-business owners (secondary).** They come for freelance websites and custom
  software in the Edwardsville and St. Louis area. Served by `/freelance`.

The homepage hero offers "two doors" that send each audience to its track.

## Visual identity

Warm-dark with a terminal soul: a modern site with terminal *flavor* (typewriter
`$ whoami`, a blinking cursor, amber prompt accents, mono labels), not a literal
terminal UI. The palette is warm charcoal, never black, with an amber signature and a
burnt-orange accent used sparingly.

`[Planned]` The same identity, with a big jump in quality: typography, spacing,
layout variety, section design and motion polish. Page-to-page navigation becomes a
smooth swap instead of a full reload.

## `/` (home)

In order:

1. **Hero:** name, typed `whoami`, status ("open to …"), location, and the two-doors
   CTAs (`[ hiring? ]` goes to Featured Work, `[ freelance software development ]`
   goes to `/freelance`).
2. **About.**
3. **Featured Work:** Site Builder (flagship), StafferAI and PlaySkillSphere, with
   live and code links.
   - `[Planned]` Adds a **Procks WIP card** ("building a social networking app for a
     client") with no client name, screenshots or store links until launch.
4. **Experience:** currently two role cards, Zipper (SWE intern) and freelance.
   - `[Planned]` Replaced by a **vertical career timeline** running from the first
     high-school programming class (2022–23) to now, with entries that reveal on
     scroll.
5. **Recommendations:** LinkedIn recommendation from Zipper's co-founder.
6. **Skills.**
7. **Education & Resume:** SIUE, B.S. CS, minor in Math, with the resume download.
   It stays separate from the timeline.
8. **Beyond the Code.**
9. **Contact:** a contact form, plus direct email.

## `/freelance`

In order:

1. **Hero.**
2. **Testimonials:** client reviews (currently Miles to Go).
3. **Pricing:** Website (from $399), Custom Software (quote), Hosting ($25/mo),
   Hosting & Maintenance ($100/mo).
4. **FAQ.**
5. **Contact:** the same contact form as home.

`[Planned]` Adds a **Work section**: Miles to Go (client site), then the Procks WIP
card, then personal projects (Site Builder, StafferAI, PlaySkillSphere) as proof of
skill. The final section order is TBD (decide during implementation).

## Contact form

Both pages use the same form:

- Fields: name, email and message, all required.
- Submissions go to Web3Forms, which emails the owner.
- States: "Sending…", a success panel with "Send another", and an error line pointing
  to direct email.

`[Planned]` The behavior stays the same. The form is rewritten in plain JS and still
works without JS (a native POST).

## 404

Currently the Next.js default page.

`[Planned]` A custom 404 page in the site's design with terminal flavor, linking back
to `/` and `/freelance`. It isn't indexed.

## Analytics

Currently Vercel Analytics, plus Google Analytics when configured.

`[Planned]` Cloudflare Web Analytics only (cookieless, no consent banner).

## Out of scope (for now)

- A Procks case study, screenshots, store links and the client's review. These come
  after the app launches and the client approves.
- Animated or 3D illustrations in the timeline.
