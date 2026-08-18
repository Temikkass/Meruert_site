/**
 * common.ts
 * ----------------------------------------------------------------------------
 * Primitive, cross-cutting types shared by every domain type in /types.
 *
 * WHY THIS FILE EXISTS
 * Config objects (person, financial project, travel project, gallery, etc.)
 * all repeat the same shapes: an image with alt text, a locale-aware string,
 * a link, a color token. Defining them once here means every domain type
 * imports the same primitives instead of re-declaring slightly different
 * versions of "an image" in five files — which is how type drift and `any`
 * creep into a codebase over time.
 */

/**
 * Supported locales. The brief is bilingual-ready (the owner operates in
 * Kazakhstan); every content string that is user-facing copy uses
 * `LocalizedText` instead of a bare `string` so translation is a config
 * change, not a component rewrite.
 */
export type Locale = "en" | "ru" | "kk";

/**
 * A string that must be provided in every supported locale.
 * Using `Record<Locale, string>` (rather than optional keys) forces the
 * client to fill in every language when they add content — a missing
 * translation becomes a TypeScript error, not a silent blank on production.
 */
export type LocalizedText = Record<Locale, string>;

/**
 * A single image reference. `width`/`height` are required (not optional)
 * because Next.js `<Image>` needs intrinsic dimensions to reserve layout
 * space up front — omitting them is a common cause of layout shift, which
 * directly costs Core Web Vitals / Lighthouse score.
 */
export interface ImageAsset {
  /** Path relative to /public, e.g. "/images/profile/headshot.jpg" */
  src: string;
  /** Required for every content image — accessibility, not optional polish */
  alt: string;
  width: number;
  height: number;
  /** Optional low-res base64 blur placeholder for above-the-fold images */
  blurDataURL?: string;
}

/**
 * A generic external or internal link. Kept generic (not "NavLink" or
 * "SocialLink" specifically) so it can be reused anywhere a label+href pair
 * is needed — footer links, CTA buttons, breadcrumbs.
 */
export interface Link {
  label: LocalizedText;
  href: string;
  /** External links get target=_blank + rel=noopener handled centrally */
  external?: boolean;
}

/**
 * The two independent projects the owner runs. Modeled as a union of two
 * string literals (not a generic `string`) so that every place a project is
 * referenced — contacts, theme accents, navigation — is exhaustively
 * type-checked. Adding a third project later is then a compiler-guided
 * change: TypeScript will flag every switch/map that needs updating.
 */
export type ProjectId = "financial" | "travel";

/**
 * Icon reference. We store a string key (resolved to a lucide-react
 * component at render time via a lookup map) rather than a JSX.Element or
 * component reference directly in config. This keeps config files pure data
 * — serializable, testable, and safe to eventually swap for a CMS response
 * (see /config/README notes on future CMS integration) without importing
 * React into data files.
 */
export type IconKey = string;

/** Standard shape for anything that can be enabled/disabled without deletion */
export interface Toggleable {
  enabled: boolean;
}
