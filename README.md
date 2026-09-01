# Personal Brand Site

A trilingual (Russian / English / Kazakh) personal brand site for a client in
Kazakhstan, introducing the owner and two independent projects: **Financial
Literacy**, and **Tours, Language Courses & Educational Camps**.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Payload CMS 3 · PostgreSQL · Framer Motion · Lenis.

The client edits everything at `/admin`, in Russian. Every page is still
statically prerendered in all three languages, and rebuilds within seconds of
a save.

---

## Quick start

```bash
npm ci
cp .env.example .env.local
npm run db:start        # start the local database
npm run cms:migrate     # create the schema
npm run seed            # load the placeholder content
npm run admin:create    # see below
npm run dev
```

Create your admin account with a real passphrase — the script refuses anything
under 12 characters and ships no default:

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD="a long passphrase" npm run admin:create
```

Then open:

- **http://localhost:3000** — the site (redirects to `/ru`)
- **http://localhost:3000/admin** — the admin panel

> The first `npm run dev` or `npm run build` needs internet access:
> `next/font/google` downloads and self-hosts Inter, Manrope and Plus Jakarta
> Sans at build time. There are no runtime requests to Google Fonts.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run verify` | typecheck + lint + test + build — run before shipping |
| `npm run test` | Vitest unit tests |
| `npm run db:start` / `db:stop` / `db:status` | Local development database |
| `npm run cms:migrate` | Apply database migrations |
| `npm run cms:types` | Regenerate `payload-types.ts` after a schema change |
| `npm run cms:verify` | Check every collection and global responds |
| `npm run seed` | Reload placeholder content (**destructive**) |
| `npm run admin:create` | Create an admin account |
| `npm run placeholders` | Regenerate placeholder images |

`npm run build` is not redundant with `typecheck`: `typedRoutes` generates its
route-literal union at build time, so a mistyped `href` is only caught there.
CI (`.github/workflows/ci.yml`) runs the whole sequence on every push.

---

## Editing content

**Everything the client sees is edited at `/admin`.** No code change, no
deploy. Saving updates the live site within seconds.

The panel is in Russian, and organised the way the site is:

| Section in the admin | What it controls |
| --- | --- |
| **Проекты** | The two projects — and **this is where new tours, courses and camps are added**, under a project's *Программы* tab |
| **Страницы** | The headings and text on each page |
| **Контент** | Gallery photos, reviews, FAQs, numbers, icon cards |
| **Обо мне** | Personal details, biography, timeline, certificates |
| **Контакты** | Social links |
| **Медиа** | Every image |
| **Настройки сайта** | Search/social preview text, footer, menu labels |

Each field carries a Russian description explaining what it does and where it
appears. Every text field has three language tabs — **RU**, **EN**, **KK**. A
field left untranslated falls back to Russian rather than rendering blank.

There is a fuller walkthrough in Russian at
[`docs/admin-guide.ru.md`](docs/admin-guide.ru.md) — hand that to the client.

### What is deliberately not editable

Some things stay in code because a mistake in them breaks the site in ways the
client cannot diagnose or undo:

- **Page addresses.** Labels are editable; the routes are real pages defined in
  code. Footer and menu links choose from a list of pages that exist, so it is
  not possible to author a 404.
- **Design tokens** (`src/config/theme.ts`). Colours are contrast-tuned — two
  were darkened specifically to pass AA — and editable colours would silently
  undo that.
- **`NEXT_PUBLIC_SITE_URL`.** It feeds `metadataBase`, every canonical URL, the
  sitemap and robots.txt; a typo breaks all of them at once.

---

## Before launch

| What | Where |
| --- | --- |
| **Production domain** | `NEXT_PUBLIC_SITE_URL` env var — **required** |
| **Database** | `DATABASE_URL` — a hosted Postgres (Neon, Supabase, …) |
| **Image storage** | `S3_*` vars — **required**, see *Deploying* |
| **`PAYLOAD_SECRET`** | A fresh random value per environment |
| Owner name, biography, portrait, contacts | `/admin` → Обо мне |
| All page copy | `/admin` → Страницы |
| **Privacy policy** — currently placeholder legal text | `/admin` → Политика конфиденциальности |
| Photography | `/admin` → Медиа |
| Favicon / logo mark | `src/app/icon.svg`, `src/app/apple-icon.png`, `public/icons/` |

---

## Languages

Russian is the default; English and Kazakh are equal-status alternatives.

- Pages live at `/{locale}/...`; `/about` redirects to `/ru/about`, or to the
  visitor's own language if `Accept-Language` names one we support
  (`src/proxy.ts`).
- The navbar switcher preserves the current page when changing language.
- `<html lang>`, `hreflang` alternates, `x-default`, Open Graph locale and the
  sitemap are all generated per locale.

**To add a locale**: add it to the `Locale` union in `src/types/common.ts`,
then to `src/lib/locale.ts`. `payload.config.ts` imports that list rather than
restating it, so the CMS picks it up automatically and TypeScript flags
everything else that needs updating. `tests/locale-parity.test.ts` guards the
two registries against drift.

---

## Deploying

Any host that runs Next.js 16 works; Vercel needs no configuration. Four
requirements:

1. **`NEXT_PUBLIC_SITE_URL`** — the production origin, no trailing slash.
2. **`DATABASE_URL`** — a hosted Postgres. Run `npm run cms:migrate` against it
   once before the first build.
3. **`PAYLOAD_SECRET`** — a fresh random value. Changing it logs everyone out.
4. **`S3_*`** — object storage for uploads. This is not optional in production:
   Vercel and most containers have an ephemeral filesystem, so images uploaded
   through the admin would vanish on the next deploy. Any S3-compatible
   provider works (Cloudflare R2, Backblaze B2, DigitalOcean Spaces, MinIO,
   AWS). See `.env.example`.

The build reads content from the database, so the database must be reachable
from the build environment and must already contain content — otherwise the
pages build successfully but empty.

`src/proxy.ts` runs on every page request, so a purely static export is
not supported: the locale redirect needs a server.

### After changing the CMS schema

Editing anything under `src/cms/` changes the database schema:

```bash
npx payload migrate:create <short-name>
npm run cms:migrate
npm run cms:types
```

Migrations are committed — they are how production gets the same schema as
your machine. Never edit a migration that has already been applied somewhere
else; add a new one.

Note that the dev server pushes schema changes to your database automatically.
That leaves a `dev` row in `payload_migrations`, after which `payload migrate`
stops on an interactive data-loss prompt. On a development database the fix is
to reset it (`dropdb` / `createdb`, then migrate and seed).

---

## Testing

`npm run test` covers the pure logic where a silent regression would be
expensive:

- `tests/content-mappers.test.ts` — the translation between Payload's stored
  shapes and the site's types: locale fallbacks, missing images, empty fields.
  A regression here still builds and still renders, just with the wrong text.
- `tests/routes.test.ts` — locale-aware href building. Every internal link on
  the site goes through it.
- `tests/phone.test.ts` — phone formatting and WhatsApp deep links.
- `tests/theme-tokens.test.ts` — asserts `config/theme.ts` and the `@theme` and
  `.dark` blocks in `globals.css` hold identical values. Tailwind v4 has no
  JS→CSS build step, so those two are synced by hand; this notices when they
  drift.
- `tests/locale-parity.test.ts` — the site's locale registry against the maps
  every locale must appear in.

`npm run cms:verify` is the database-backed counterpart: it checks every
collection, global and locale responds. It needs Postgres, so it is a script
rather than a unit test.

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
  cms/             Payload schema: collections, globals, fields, hooks
  lib/content/     Reads content out of the CMS into those types
  seed-data/       Placeholder content for an empty database (not the site's)
  config/          Design tokens and UI chrome that stay in code
  migrations/      Database migrations — committed, applied in order
public/
  icons/  fonts/   (uploaded images live in the CMS, not here)
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
"How content reaches the page" below) without touching a single type.

---

## Content layer — one file per concern, not per page

The CMS mirrors this structure: `config/faq.ts` became the `faq` collection,
`config/home.ts` became the `home-page` global. Content is grouped by *what it
is*, not by which page happens to show it, so a gallery photo or an FAQ can
appear on three pages without being stored three times. The `project` field on
those lists ("financial" / "travel" / "shared") is what each section filters
on.

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

## How content reaches the page

`src/types/` never depended on where data came from, which is what made moving
to a CMS a small change rather than a rewrite.

- **`src/cms/`** — the schema: collections (repeatable content), globals
  (one-of-a-kind pages), field factories, and the revalidation hooks.
- **`src/lib/content/`** — the read layer. Every function returns the *same
  type* the old config files exported, so no component's rendering logic
  changed. Queries run with `locale: "all"`, which makes Payload return each
  field as `{ ru, en, kk }` — exactly `LocalizedText`, so the ~120
  `content.x[locale]` call sites across the components were never touched.
- **`src/lib/content/mappers.ts`** — the pure half of that, split out so it can
  be unit-tested without booting a CMS.
- **`src/seed-data/`** — the placeholder content `npm run seed` loads into an
  empty database. **Not** the live site's content; see the README in that
  directory.

Components take content as **props** and never query the CMS themselves. That
is deliberate: the section components stay reusable with any backend, which
matters because the component library is part of what this project is.
