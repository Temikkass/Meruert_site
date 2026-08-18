# Personal Brand Site

A trilingual (Russian / English / Kazakh) personal brand site for a client in
Kazakhstan, introducing the owner and two independent projects: **Financial
Literacy**, and **Tours, Language Courses & Educational Camps**.

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Framer Motion · Lenis. Every page is statically prerendered, in all three
languages.

---

## Quick start

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000 — it redirects to `/ru`.

> `npm run dev` (and `npm run build`) need internet access the first time:
> `next/font/google` downloads and self-hosts Inter, Manrope and Plus Jakarta
> Sans at build time. There are no runtime requests to Google Fonts.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |
| `npm run verify` | typecheck + lint + test + build — run this before shipping |
| `npm run placeholders` | Regenerate placeholder images (see *Assets*) |

`npm run build` is not redundant with `typecheck`: `typedRoutes` generates its
route-literal union at build time, so a mistyped `href` is only caught there.
CI (`.github/workflows/ci.yml`) runs all four on every push.

---

## Before launch

Everything below is placeholder and must be replaced. Nothing else needs to
change to go live.

| What | Where |
| --- | --- |
| **Production domain** | `NEXT_PUBLIC_SITE_URL` env var — **required** |
| Owner name, tagline, biography, portrait, location | `src/config/person.ts` |
| WhatsApp / Telegram / Instagram / email, per project | `src/config/contacts.ts` |
| Footer owner name | `src/config/footer.ts` |
| Homepage copy | `src/config/home.ts` |
| About page copy, timeline, achievements, certificates | `src/config/about.ts`, `timeline.ts`, `achievements.ts`, `certificates.ts` |
| Project copy | `src/config/financial.ts`, `travel.ts`, `financial-page.ts`, `travel-page.ts` |
| Contact page copy, working hours | `src/config/contact-page.ts` |
| Reviews, gallery, FAQ, statistics | `src/config/reviews.ts`, `gallery.ts`, `faq.ts`, `statistics.ts` |
| **Privacy policy text** — currently placeholder legal copy | `src/config/legal.ts` |
| Favicon / logo mark | `src/app/icon.svg`, `src/app/apple-icon.png`, `public/icons/` |
| Photography | `public/images/**` (see *Assets*) |

`NEXT_PUBLIC_SITE_URL` deserves emphasis: it feeds `metadataBase`, every
canonical URL, Open Graph image resolution, `sitemap.xml` and `robots.txt`.
Deploy without it and all of those publish the placeholder domain.

### Content is data, not markup

Every user-facing string lives in `src/config/*.ts`, typed as
`LocalizedText` — `{ en, ru, kk }`. TypeScript will not compile a config
entry that is missing a language, so a half-translated page cannot ship
silently. Editing copy never means touching a component.

---

## Languages

Russian is the default. English and Kazakh are equal-status alternatives.

- Pages live at `/{locale}/...`; `/about` redirects to `/ru/about`, or to the
  visitor's own language if `Accept-Language` names one we support
  (`src/middleware.ts`).
- The navbar switcher preserves the current page when changing language.
- `<html lang>`, `hreflang` alternates, `x-default`, Open Graph locale and the
  sitemap are all generated per locale.

**To add a locale**: add it to the `Locale` union in `src/types/common.ts`,
then to `src/lib/locale.ts` (`locales`, `htmlLang`, `ogLocale`, `localeNames`,
`localeShortNames`). TypeScript will then flag every config file that needs
the new translation — the compiler walks you through it.

**To drop one**: remove it from both, and delete that key from each config
entry.

---

## Assets

`public/images/**` currently holds generated grey placeholders, sized to the
exact `width`/`height` each `ImageAsset` in config declares, so `next/image`
reserves the correct box and nothing shifts on load.

Replace them with real photography at the **same dimensions**, or update the
`width`/`height` in the corresponding config entry to match the new files —
they must agree, or the image will be distorted.

`npm run placeholders` regenerates the placeholder set
(`scripts/generate-placeholders.mjs`); delete the script once real photography
is in.

---

## Deploying

Any host that runs Next.js 15 works; Vercel needs no configuration. Two
requirements:

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin, no trailing slash.
2. The build machine needs network access for the font download.

`src/middleware.ts` runs on every page request, so a purely static export is
not supported — the locale redirect needs a server.

---

## Testing

`npm run test` covers the pure logic where a silent regression would be
expensive:

- `tests/routes.test.ts` — locale-aware href building. Every internal link on
  the site goes through it.
- `tests/phone.test.ts` — phone formatting and WhatsApp deep links.
- `tests/theme-tokens.test.ts` — asserts `config/theme.ts` and the `@theme`
  and `.dark` blocks in `globals.css` hold identical values. Tailwind v4 has
  no JS→CSS build step, so those two files are synced by hand; this test is
  what notices when they drift.

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
  images/{profile,gallery,projects,backgrounds,testimonials,certificates}
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
| `gallery.ts` / `faq.ts` / `reviews.ts` / `statistics.ts` | Tagged content arrays (`project: "financial" \| "travel" \| "shared"`) | One array each, filtered by consuming components — easier for a non-technical editor to scan than parallel per-project files |
| `navigation.ts` / `footer.ts` | Site-wide nav and footer structure | Generated from `financial.ts`/`travel.ts` project data where possible, so a renamed project updates its nav label automatically |
| `theme.ts` | Every design token, typed | Mirrored (by hand) into `app/globals.css`'s `@theme` block — see that file's header comment |
| `seo.ts` | Site defaults + per-path metadata | Feeds both `lib/metadata.ts` and `app/sitemap.ts` |

## Why two projects share one `Project` type instead of two interfaces

`FinancialProject` and `TravelProject` would be identical shapes with
different names — that duplication is exactly what causes two nearly-same
types to quietly drift apart over time. One `Project` interface (in
`types/project.ts`) means one `<ProjectHero>`, one `<ProjectPage>` template
later, and a genuinely trivial path to a third project
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
Motion → SmoothScroll, used once in `app/[locale]/layout.tsx`. Order is
documented in that file's header comment. Adding a provider later (e.g. an
analytics context) means editing one file, not hunting through
`layout.tsx`.

## SEO & structured data

- `lib/metadata.ts#createMetadata()` is the only place that translates the
  small, config-friendly `PageSeo` type into Next's `Metadata` type — every
  page's `generateMetadata` calls it with the active locale, and it emits the
  canonical URL plus `hreflang` alternates and `x-default` for all three
  languages.
- `app/sitemap.ts` and `app/robots.ts` use Next's file-convention Metadata
  API and are generated FROM `config/seo.ts#pageSeo`, so a new page added
  to that config object automatically appears in the sitemap, once per
  locale, with language alternates — no second list to maintain.
- `lib/json-ld.ts` builds Person schema (rendered once, in the root layout)
  and Organization schema (one per project, rendered on each project page).

## Future CMS Integration

Because `types/` has no dependency on how data arrives, swapping
`config/*.ts` static objects for a Sanity/Payload/Strapi/Contentful fetch
later means writing a data-fetching function that returns the same typed
shape (`Project`, `FaqItem`, etc.) — components and types don't change.
