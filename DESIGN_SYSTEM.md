# Design System — Component Reference

Every reusable building block the site's pages are assembled from: tokens,
primitives, layout, motion.

> **How to read this document.** The component and token reference is current.
> The narrative sections further down ("How this was validated", "Motion-design
> pass", "Production optimization pass") were written as a build log, phase by
> phase, and describe the state at the time each phase closed. Four structural
> facts have changed since, and are not corrected inline below:
>
> - **The root layout is `app/[locale]/layout.tsx`**, not `app/layout.tsx`. All
>   pages moved under a `[locale]` segment when real i18n routing was added.
> - **There are 26 routes, not 11** — six pages times three locales, plus the
>   metadata routes and a catch-all 404.
> - **There is no contact form.** See "Contact: no form, by design" at the end
>   of this file.
> - **`ArticleCard` has no `config/articles.ts`** any more; see "Library
>   surface not currently on a page", also at the end.
>
> Where a claim below conflicts with those four points, those four points win.

## Token reference (config/theme.ts + globals.css)

All of it lives in `config/theme.ts` (the typed source) and is mirrored by
hand into `app/globals.css`'s `@theme` block — see that file's header
comment for why there's no build step generating one from the other.

| Category | Tokens | Tailwind utilities generated |
|---|---|---|
| Color (base) | `canvas`, `surface`, `card`, `ink`, `inkMuted`, `border` | `bg-canvas`, `bg-card`, `text-ink`, etc. |
| Color (brand) | `accent`, `accentTint`, `accentForeground` | `bg-accent`, `text-accent-tint` |
| Color (semantic) | `primary/secondary/muted/success/warning/error` + foreground pairs | `bg-primary`, `text-primary-foreground`, `bg-success`, ... |
| Color (interaction) | `hover`, `selection` | `bg-hover`, used in `::selection` |
| Per-project accent | `financial` (indigo-violet), `travel` (plum-mauve) | via `[data-project="..."]` scoping, see below |
| Shadow / elevation | `xs sm md lg xl` + `glow` | `shadow-xs` … `shadow-glow` |
| Blur | `sm md lg xl` | `blur-sm` … `blur-xl` |
| Glass | `background border blur` | `.glass` utility class |
| Gradient | `brand subtle radialGlow` | `.bg-gradient-brand`, `.bg-gradient-subtle`, `.bg-gradient-radial-glow` |
| Radius | `sm md lg xl full` | `rounded-sm` … `rounded-full` |
| Button height | `xs sm md lg xl` | `h-button-md`, `size-button-md` (icon buttons) |
| Card padding | `sm md lg` | `p-card-md` |
| Icon size | `xs sm md lg xl` | `size-icon-md` |
| Section rhythm | `sm md lg` (responsive) | `py-section-{sm,md,lg}` (applied automatically by `<Section>`) |
| Gutter | one value | `px-gutter` |
| Duration / easing | `fast base slow ambient` / `standard entrance exit` | `duration-fast`, `ease-standard` (CSS transitions); Framer reads `lib/animations/transitions.ts` instead |

All sizing scales (button/card/icon/section/gutter) are defined under
Tailwind v4's native `--spacing-*` namespace specifically so they generate
real utilities — see the comment at the top of `globals.css`.

**Per-project theming**: wrap a project page's `<main>` in
`data-project="financial"` or `data-project="travel"` and `--color-accent`/
`--color-primary` resolve to that project's tint automatically — every
component that reads `bg-accent`/`bg-primary` (Button, Badge, focus rings,
IconBox) re-themes for free, no per-component project prop needed.

## Component inventory

### `components/ui/` — primitives
`Button` (10 variants × 5 sizes + icon size), `Card` (+ Header/Title/
Description/Content/Footer/AnimatedBorder), `Input`, `Textarea`, `Label`,
`Checkbox`, `Switch`, `RadioGroup`, `Select`, `Badge`, `Accordion`,
`Avatar`, `Separator`, `Dialog`, `Icon` (config icon-key → lucide-react).

### `components/animations/`
`Reveal` (generic scroll-in wrapper, any preset from `lib/animations/
variants.ts`), `StaggerGroup` + `StaggerItem` (sequenced reveal — read both
file headers, the split matters), `Parallax` (scroll-linked, not scroll-
triggered), `Magnetic` (standalone; Button/Card have the same effect
built in via `hooks/use-magnetic.ts`), `TextReveal` (per-word masked
headline), `Floating` (continuous ambient loop, decorative only).

### `components/layout/`
`Container`, `Section` / `AnimatedSection` (section + pre-wired reveal),
`Stack`, `Grid`, `Spacer`, `Divider`, `PageWrapper` (for the future
`template.tsx` exit-transition phase), `StickySection` (scroll-pinned
storytelling panel).

### `components/navigation/`
`Navbar` (one component, not separate desktop/mobile — transparent → glass
on scroll, active-section underline via scroll-spy), `NavLink` (handles
both in-page anchors and real routes), `MobileMenu` (full-screen, Radix
Dialog-based focus trap).

### `components/shared/`
- **buttons/** — `SocialButton` (one component, `platform` prop, not five),
  `SocialIconRow` (renders `config/social.ts`), `WhatsAppButton`
  (pre-filled deep link from a `WhatsAppChannel`).
- **cards/** — `ProjectCard` (the homepage's project-preview pivot),
  `FeatureCard` + `ServiceCard` (same file — stacked vs. horizontal layout
  of the same data), `ReviewCard`, `ArticleCard`, `PricingCard`
  (future-ready — no pricing config exists yet, see its header comment).
- **content/** — `SectionHeading`, `Eyebrow`, `Quote`, `HighlightText`,
  `IconBox`. *(New leaf folder not in the original architecture listing —
  additive only, holds the typography-level pieces that didn't have a
  home; nothing existing moved.)*
- **gallery/** — `GalleryCard`, `GalleryGrid` (grid or CSS-masonry),
  `Lightbox` (Radix Dialog, keyboard + swipe), `Carousel` (Embla — one
  implementation reused for testimonials/gallery/projects/articles, per
  the brief).
- **faq/** — `FaqAccordion` (filters `config/faq.ts` by project).
- **stats/** — `AnimatedCounter`, `StatCard`, `ProgressCard` (achievement
  bar).
- **timeline/** — `Timeline`.
- **forms/** — `FormField` (label + control + error/hint, react-hook-form
  ready via render props, framework-agnostic).

## Design decisions worth knowing about

- **One `cva()` button, not ten button components.** `<Button variant="glass" size="lg">`
  is one mental model; see `button.tsx`'s header comment.
- **`asChild` (Button) renders a bare Radix `Slot`** — it does NOT run
  `leadingIcon`/`trailingIcon`/`loading` rendering, magnetic physics, or the
  press animation, because Slot merges props onto a single child rather than
  composing extra nodes around it. When a Button-styled `<Link>` needs an
  icon, include it directly in `children` (see `ProjectCard` for the
  pattern) — this is documented in `button.tsx` itself.
- **Card's `tilt`/`magnetic`-equivalent effects are props, not separate
  components** (`<GlowCard>`, `<TiltCard>` don't exist) — composition over
  a combinatorial explosion of card types.
- **`StaggerItem` must not set its own `whileInView`** — it inherits
  animate state from the nearest `StaggerGroup`. Adding one breaks the
  sequence silently; this is called out in both files' headers.
- **`typedRoutes` is off** (see `next.config.ts`). It types `<Link href>`
  against routes that exist as real `page.tsx` files — with zero pages
  built yet, every link (including `href="/"`) would need a cast. Turn it
  back on once pages exist; `NavLink`, `ProjectCard`, and `ArticleCard`
  already cast their config-driven hrefs with `as Route` in anticipation of
  that, so re-enabling it later needs no further changes in this layer.
- **Magnetic and tilt are always disabled** under `prefers-reduced-motion`
  and on coarse (touch) pointers — see `hooks/use-magnetic.ts` and
  `Card`'s tilt logic. Neither effect has meaning without a mouse.

## How this was validated

Beyond `tsc --noEmit` and `eslint` (both zero errors), every component in
this inventory was mounted together on a single temporary route with real
config data, built with `next build`, and the prerendered HTML was
inspected directly for the expected content — then that route was deleted,
since the brief calls for building blocks only, not pages. This caught
several real issues before delivery (a `typedRoutes`/dynamic-href conflict,
a couple of TypeScript ref-typing issues on polymorphic components) that
type-checking alone would not have surfaced.

## Installing

Same as the architecture phase — `npm install && npm run dev`. This phase
adds Radix UI primitives (`@radix-ui/react-*` — accordion, checkbox,
switch, radio-group, select, dialog, avatar, separator, label, slot,
visually-hidden) for the accessible interaction layer; everything else
was already in `package.json`.

## Motion-design pass (page transitions, microinteractions, cursor)

A later pass focused entirely on motion — no new pages, no visual
redesign. What changed and why:

**One necessary architecture touch: `<Navbar>`/`<Footer>` moved from each
page into `app/layout.tsx`.** Real page-transition animations need
`AnimatePresence` to see the outgoing page while a *persistent* parent
stays mounted — a per-page `<Navbar>` would itself fade/blur out and back
in on every navigation, which reads as broken chrome, not a premium
transition. Moving them to the root layout also fixes a latent bug: with
a per-page Navbar, every navigation silently reset its scroll-blur and
active-section-tracking state for a frame. Every route's `page.tsx` now
returns just its `<main>` content.

**Page transitions** — `providers/page-transition.tsx`, an
`AnimatePresence` keyed on `usePathname()`, using an enhanced
`pageTransition` preset (`lib/animations/variants.ts`): fade + a very
slight scale + blur, fast on purpose (0.32s enter, 0.18s exit — a
transition paid on every click should never feel like a tax). `initial=
{false}` skips the animation on first load. Also fixes a real Lenis
gotcha: on route change, scroll is snapped to top via
`window.__lenis.scrollTo(0, { immediate: true })` — without this, Lenis
would ease the browser's own scroll-reset into a visible upward scroll
racing the fade transition.

**Card gained a `spotlight` prop** — a cursor-following soft light,
implemented via Framer Motion values + `useMotionTemplate` so the
radial-gradient position updates every mousemove frame without a single
React re-render. Enabled on `ProjectCard` (the "Project cards" hover
request). Disabled on coarse pointers and under reduced motion, same
pattern as the existing `tilt` prop.

**Custom cursor** — `providers/custom-cursor.tsx`, a dot + lagged ring
that scales up over interactive elements. Renders nothing at all unless
`(pointer: fine)` matches and reduced-motion is off (checked before
mount, not styled away); every element is `pointer-events-none`; the
native cursor is hidden via a `.cursor-none` class added only after the
component confirms it's active, so a JS failure leaves the native cursor
visible rather than none at all.

**Existing presets got used more deliberately, not reinvented**: Hero and
ProjectHero's portrait now use the `imageReveal` clip-path wipe (was a
generic blur-in); the gallery grid's stagger item now uses `maskReveal`
(was `scaleIn`) — matching the brief's "Image reveal" / "Mask reveal"
asks to presets that already existed for exactly this. `Button` gained a
`whileHover` lift to pair with its existing `whileTap` press. The
homepage/About `<CtaSection>`'s primary button now wraps in the existing
`<Magnetic>` component.

**Two performance fixes**: `ProgressCard` was animating `width` directly
(a layout property) — switched to `scaleX` with `transform-origin: left`,
same visual result, compositor-only. `HeroBackground`'s one blob visible
on mobile now uses a smaller blur radius there (`blur-xl`, vs `blur-2xl`
on desktop) — large blur filters are one of the more expensive things to
composite on mobile GPUs, and the brief calls this out explicitly.

**Lenis hardening**: `syncTouch: false` made explicit (was already the
default, but the brief asks specifically that native touch scrolling
isn't broken, so this is now a documented decision, not an implicit
default) — see `providers/smooth-scroll-provider.tsx`'s header comment
for the full compatibility notes (anchors, sticky elements, Framer
Motion, mobile).

## Production optimization pass

A full audit pass — mobile responsiveness, performance, SEO,
accessibility, security/code-quality — done by actually measuring/testing
each claim rather than assuming the earlier phases got everything right.
Real, concrete issues found and fixed:

**Touch targets below the 48×48px minimum** — `MobileMenu`'s open/close
buttons and the `Carousel`/`Lightbox` prev-next controls were all 40px or
32px (`size-button-sm`/`size-button-xs`). All bumped to `size-button-md`
(48px). `Input`/`Select` field height was also 40px, bumped to 48px —
that's a genuine tap target on a touch keyboard, not just a "button."

**A real color-contrast failure** — the `warning` token was 2.81:1 against
canvas (fails even the 3:1 UI-component minimum) and `success` was 3.86:1
(fails the 4.5:1 text minimum); both were caught precisely by converting
the OKLCH values to sRGB and computing WCAG relative luminance, not by
eyeballing them. This wasn't theoretical — `ReviewCard`'s star ratings
render in `text-warning`/render against `bg-card` on every testimonials
section on the live site. Both tokens' lightness were adjusted
(`config/theme.ts` + `globals.css`, light mode only — dark mode already
passed) to a comfortable 5.3:1+.

**Two heading-hierarchy skips** — `ProjectOfferingDetail` (Tours/Language
Courses/Camps) used `h3` for what's actually a top-level page section, a
peer to the `h2`-level "About"/"Programs" sections around it; and
`Timeline`'s entry titles jumped straight from the section's `h2` to
`h4`, skipping `h3` entirely. Both fixed. Verified across all six pages:
exactly one `h1` and zero level-skips on every page, checked
programmatically against the built HTML, not just read by eye.

**Organization Schema was built but never rendered** — `lib/json-ld.ts`
had a working `buildOrganizationSchema()` since the architecture phase,
but nothing ever called it. Now rendered on both project pages. Person
schema's `sameAs` was also a hardcoded empty array with a stale "once
config/social.ts is finalized" comment — it's been finalized since the
design-system phase; `sameAs` now pulls the real Instagram/Telegram URLs
from it (WhatsApp deliberately excluded — it's a chat deep link, not a
profile page, so it doesn't belong in `sameAs`).

**A missing `sizes` attribute** — `ReviewCard`'s avatar `<Image fill>` had
no `sizes`, so Next.js was defaulting to fetching a 100vw-sized image for
what renders as a 40px circle. Added `sizes="40px"`.

**`typedRoutes` turned back on** — it was deliberately off during the
design-system phase (no pages existed yet to type-check links against).
All six real pages exist now, so it's back on; `Footer`, `CtaSection`, and
`HeroCtaButtons` needed `as Route` casts added for their config-driven
hrefs (`NavLink`/`ProjectCard`/`ArticleCard` already had theirs). Verified
by a full `next build` with the setting on — this is the one check that
NEEDS an actual build, not just `tsc`, since the route-literal type is
generated at build time.

**Bundle**: `experimental.optimizePackageImports: ["lucide-react"]` added
— Next's documented pattern for icon libraries, ensures per-icon bundling
rather than relying on the package's module graph alone. Audited every
`package.json` dependency for actual usage — all confirmed used, nothing
to remove.

**What was checked and found already correct, not just assumed**: every
`next/image` usage was already using `next/image` (zero raw `<img>` tags);
every external `target="_blank"` link already paired `rel="noopener
noreferrer"`; no secrets in source or `.env.example`; `tsc --noEmit` and
`eslint` both clean throughout; a full `next build` across all 11 routes
(6 pages + robots.txt + sitemap.xml + not-found) produces zero warnings.
Final bundle sizes: 102kB shared JS baseline, page-specific JS from 1–27kB
(Contact's form logic is the heaviest at 27.3kB, still a reasonable cost
for real client-side validation).

## Library surface not currently on a page

Some components below are **intentionally unrendered**. They are part of the
component library this project ships, built so the site can grow without
reopening design decisions — not leftovers, and not dead code to prune.
Anyone auditing the tree should read them as available, not abandoned:

- **`components/ui/`** — `input`, `textarea`, `label`, `checkbox`,
  `radio-group`, `select`, `switch`, `avatar`. The form primitives lost their
  last caller when the fake contact form was removed (see below); the rest
  have not had a use yet. All are token-driven and ready.
- **`components/shared/`** — `forms/FormField`, `cards/ArticleCard`,
  `cards/PricingCard`, `stats/ProgressCard`, `content/HighlightText`,
  `content/Quote`, `gallery/GalleryGrid`.
- **`components/layout/`** — `PageWrapper`, `Spacer`, `StickySection`.

`ArticleCard` in particular is waiting on an articles/blog page. Its
`config/articles.ts` was **deleted**: a content config that no page renders is
worse than no config at all, because it invites the client to write copy that
will never appear. Re-add it alongside the page that consumes it.

Unused files are not bundled — none of the above costs the visitor anything.

## Contact: no form, by design

`ContactFormSection` was removed. It validated input, waited 900ms and showed
a success toast without sending anything anywhere, so every message a visitor
wrote was silently discarded. `ContactChannelsSection` is now the Contact
page's primary call to action, with WhatsApp promoted to a full labelled
button per project (the pre-filled, localized message comes from
`config/contacts.ts` via `createWhatsappLink`). `react-hook-form`, `zod`,
`@hookform/resolvers` and `sonner` were removed with it; `/contact` first-load
JS went from 191kB to 157kB.

To add a real form later: the primitives above are still here, and the
submission endpoint is the only genuinely new piece.
