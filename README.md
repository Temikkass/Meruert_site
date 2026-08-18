# Premium Personal Brand Site — Architecture Phase

This repository is the **foundation only** — folder structure, config layer,
types, theme tokens, providers, utilities, root layout, and SEO plumbing. No
pages or visual components have been built yet, by design (see "What's
deliberately not here" below). Everything here is what a senior engineer
would want in place *before* the first `<Hero>` gets written, so that
building pages afterward is assembly, not architecture.

## Install

```bash
npm install
npm run dev
```

**Version note:** `next`, `react`, and `react-dom` are pinned to
`15.5.20` / `19.2.7` deliberately, not just "whatever's newest." Next.js
15.0–15.5.6 and React 19.0–19.2.2 carry a critical (CVSS 10.0) React
Server Components RCE, CVE-2025-66478 (nextjs.org/blog/CVE-2025-66478).
When you eventually move off 15.x onto Next 16, use the same source to
confirm the target version is past that advisory before pinning it.

`npm run typecheck` and `npm run lint` are wired up and should both pass
against everything in this repo as-is.

**On shadcn/ui:** `components.json` is configured (below) so the CLI works
if you want it, but every primitive currently in `components/ui/` was
hand-built directly on Radix UI + `class-variance-authority` in the
design-system phase, styled to this project's own tokens rather than
shadcn's defaults — see **DESIGN_SYSTEM.md** for the full inventory. Use
`npx shadcn@latest add <component>` only for something not already in that
list, and expect to restyle its default classes to match.

---

## Why this structure

```
src/
  app/            Next.js App Router — routing, layout, metadata files only
  components/
    animations/    Reusable motion wrappers (e.g. <Reveal>, <Parallax>)
    layout/        Header, Footer, page shell
    navigation/    Nav bar, mobile menu, project switcher
    sections/      Page-level sections (Hero, About, ProjectPreview, ...)
    shared/        Small reusable pieces, grouped by kind:
      cards/ buttons/ forms/ gallery/ faq/ timeline/ stats/
    ui/            shadcn/ui primitives live here, untouched by hand-edits
  hooks/           Cross-cutting React hooks (media query, active section...)
  lib/             Framework-agnostic logic: utils, metadata, animations
  providers/       App-wide context providers, composed once in layout.tsx
  types/           All TypeScript interfaces, barrel-exported from index.ts
  config/          Every piece of editable content and design token
public/
  images/{profile,gallery,projects,backgrounds,testimonials,articles}
  icons/  fonts/
```

**Feature-based, not type-based, at the top level.** `components/sections`
and `components/shared` separate *page-level composition* from *reusable
pieces*, which is the split that actually matters as a codebase grows — a
new section is free to import from `shared/` and `ui/`, but `shared/` never
imports from `sections/`. That one-way dependency rule is what keeps a
"just add a section" change from turning into a refactor.

**`config/` is the only place client content lives.** Every string, image
path, phone number, and color a client might need to change lives in
`config/*.ts` as a typed, commented object — never inline in a component.
This is the direct answer to the brief's "client should never edit
components" requirement: it's not a convention engineers have to remember,
it's the only place the data exists.

**`types/` has zero React imports.** Every interface is pure data shape.
This is what makes the config layer swappable for a real CMS later (see
"Future CMS Integration" below) without touching a single type.

---

## Config layer — one file per concern, not per page

| File | Holds | Why separate |
|---|---|---|
| `person.ts` | Owner's name, bio, photo, credentials | Read once, on the homepage intro |
| `financial.ts` / `travel.ts` | Each project's name, tagline, offerings, hero image | Both satisfy the same `Project` interface — same components render either |
| `contacts.ts` | WhatsApp / Telegram / Instagram / Email **per project** | The single most-edited file; isolated so a phone-number change is always a one-line diff |
| `social.ts` | Flat icon-row links | **Derived from `contacts.ts`**, not hand-duplicated — see the file's header comment for why |
| `gallery.ts` / `faq.ts` / `reviews.ts` / `statistics.ts` / `articles.ts` | Tagged content arrays (`project: "financial" \| "travel" \| "shared"`) | One array each, filtered by consuming components — easier for a non-technical editor to scan than parallel per-project files |
| `navigation.ts` / `footer.ts` | Site-wide nav and footer structure | Generated from `financial.ts`/`travel.ts` project data where possible, so a renamed project updates its nav label automatically |
| `theme.ts` | Every design token, typed | Mirrored (by hand) into `app/globals.css`'s `@theme` block — see that file's header comment |
| `seo.ts` | Site defaults + per-path metadata | Feeds both `lib/metadata.ts` and `app/sitemap.ts` |

## Why two projects share one `Project` type instead of two interfaces

`FinancialProject` and `TravelProject` would be identical shapes with
different names — that duplication is exactly what causes two nearly-same
types to quietly drift apart over time. One `Project` interface (in
`types/project.ts`) means one `<ProjectHero>`, one `<ProjectPage>` template
in the next build phase, and a genuinely trivial path to a third project
later: a new config file, zero new components.

## Theming: neutral system + two restrained per-project accents

The brief specifies a neutral (white/gray/black) palette with a single
purple/lavender accent — implemented in `config/theme.ts` and mirrored in
`globals.css`. The one deliberate extension beyond the brief: **each
project gets its own accent tint within that same restrained violet
family** — Financial Literacy leans deep indigo-violet, Tours/Courses leans
warmer plum-mauve — toggled via a `data-project="financial" | "travel"`
attribute on each project page's `<main>` (see the `[data-project]`
utilities at the bottom of `globals.css`). The homepage intro, which
belongs to neither project, stays on the fully neutral shared accent. This
is the one place the system takes a visual risk; everything else is
disciplined on purpose — see the note in `config/theme.ts`'s header comment.

**Why OKLCH instead of hex:** lightness and chroma can be tuned
independently of hue, which is what makes "the same accent, but readable on
a dark background" a one-number change instead of a re-guess.

**Why tokens are defined in both `config/theme.ts` and `globals.css`:**
Tailwind v4 configuration is CSS-native (`@theme`, not a JS
`tailwind.config.js`) — there's no build step to auto-generate one from the
other without writing a bespoke codegen script, which is more machinery
than a token set this size justifies. `config/theme.ts` is what TypeScript
code (Framer Motion transitions, per-project accent lookups) reads;
`globals.css` is what Tailwind reads to generate utility classes. Keep them
in sync by hand — both files say so in their header comments.

## Typography: three faces, each with one job

- **Plus Jakarta Sans** (`--font-display`) — headlines. Enough character to
  feel handcrafted at large sizes without turning into a display serif that
  would fight the brief's "modern, minimalistic" direction.
- **Inter** (`--font-body`) — paragraphs. Chosen because it disappears;
  body copy's job is to be read, not to have a personality.
- **Manrope** (`--font-data`) — statistics, captions, nav labels. Its
  numerals read cleanly as data at small sizes.

All three are self-hosted via `next/font/google` (see `lib/fonts.ts`) —
zero runtime request to Google Fonts, zero layout shift from a
late-loading `@font-face`. Latin + Cyrillic subsets are both loaded,
since `types/common.ts#Locale` includes Russian and Kazakh content.

## Motion foundation

`lib/animations/variants.ts` holds every reusable Framer Motion preset
(fade in four directions, scale, blur, text reveal, image reveal, page and
section transitions) as plain `Variants` objects — components spread one in
rather than hand-writing animation config per section. `transitions.ts`
converts `config/theme.ts`'s duration/easing tokens into the shape Framer
expects, so a single token change (e.g. slowing down `duration.slow`)
retunes every animation in the app at once.

**Reduced motion is handled once, centrally:** `providers/motion-provider.tsx`
sets `MotionConfig reducedMotion="user"`, which makes Framer Motion
automatically substitute a cross-fade for transform-based animation
site-wide whenever the OS preference is on. `hooks/use-reduced-motion.ts`
exists for the non-Framer cases (gating the Lenis smooth-scroll instance
entirely — see `providers/smooth-scroll-provider.tsx`).

## Providers, composed once

`providers/index.tsx` exports a single `<AppProviders>` wrapping Theme →
Motion → SmoothScroll → Toast, used once in `app/layout.tsx`. Order is
documented in that file's header comment. Adding a provider later (e.g. an
analytics context) means editing one file, not hunting through
`layout.tsx`.

## SEO & structured data

- `lib/metadata.ts#createMetadata()` is the only place that translates the
  small, config-friendly `PageSeo` type into Next's `Metadata` type —
  every future page's `generateMetadata` calls this once.
- `app/sitemap.ts` and `app/robots.ts` use Next's file-convention Metadata
  API and are generated FROM `config/seo.ts#pageSeo`, so a new page added
  to that config object automatically appears in the sitemap — no second
  list to maintain.
- `lib/json-ld.ts` builds Person schema (rendered once, root layout) and
  Organization schema (one per project, rendered on each project page in
  the next build phase).

## Project status

Four phases — architecture (this file), a full design-system component
library (**DESIGN_SYSTEM.md**), the homepage, and now every remaining
page: **About**, **Financial Literacy**, **Tours/Language Courses/Camps**,
**Contact**, and **Privacy Policy**. Every page is built entirely from the
existing component library — this phase added content/config, not new UI
primitives:

- `config/home.ts`, `config/why-choose-me.ts` — homepage copy (phase 3).
- `config/about.ts`, `config/mission-values.ts`, `config/timeline.ts`,
  `config/achievements.ts`, `config/certificates.ts` — About page.
- `config/financial-page.ts`, `config/travel-page.ts` — the two project
  pages' section copy; `financialLearningFormats`/`financialBenefits` were
  added as separate exports in `config/financial.ts` (not new fields on
  the shared `Project` type) since that content has no travel-page
  equivalent.
- `config/contact-page.ts` — Contact page copy, working hours, and the
  contact form's labels/validation messages.
- `config/legal.ts` — Privacy Policy content (placeholder legal text —
  replace before launch).

**On the WhatsApp message requirement:** the brief referenced
`financialProject.whatsappMessage` / `travelProject.whatsappMessage`. That
field doesn't exist under those names — the predefined message lives at
`financialProject.contacts.whatsapp.prefilledMessage` /
`travelProject.contacts.whatsapp.prefilledMessage` (`config/contacts.ts`,
from the architecture phase), which was already the single source of
truth for it. `<ProjectHero>` and `<ProjectCtaSection>` both build the
WhatsApp deep link from there via `createWhatsappLink()`, so the requested
behavior is there — I didn't add a second, duplicate field.

**A note on `next/font/google` in this environment:** validating every
page's build in the sandbox this was built in required temporarily
stubbing `lib/fonts.ts`, because that sandbox's network egress can't reach
`fonts.googleapis.com`. The real implementation (what's actually in this
repo) is standard, documented `next/font/google` usage — it needs ordinary
internet access to self-host the font files at build time, which any real
dev machine or CI runner has. `npm run build` here will fetch Manrope,
Plus Jakarta Sans, and Inter normally.

**Still template/placeholder, by design:** the Contact page's form
validates and shows a success toast but has no backend wired up yet (see
the comment inside `components/sections/ContactFormSection.tsx` for where
to add a real submission); the Privacy Policy's section bodies and the
About page's certificates are placeholder text/images per the brief —
replace both before launch.

## Future CMS Integration

Because `types/` has no dependency on how data arrives, swapping
`config/*.ts` static objects for a Sanity/Payload/Strapi/Contentful fetch
later means writing a data-fetching function that returns the same typed
shape (`Project`, `FaqItem`, etc.) — components and types don't change.
