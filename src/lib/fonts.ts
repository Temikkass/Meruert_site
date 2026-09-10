/**
 * lib/fonts.ts
 * ----------------------------------------------------------------------------
 * TYPE SYSTEM RATIONALE
 * Three roles, each solving a different reading problem — not more fonts
 * because more fonts feel "premium":
 *
 * - Display: headlines, hero statements. More character than a pure grotesk at
 *   large sizes — enough to carry the "handcrafted" feeling the brief asks for
 *   — while staying fully legible, unlike a display serif that would fight the
 *   brief's "modern, minimalistic" direction.
 * - Inter (body): paragraphs, biography, descriptions. Chosen specifically
 *   because it disappears — body copy's job is to be read effortlessly,
 *   not to have personality.
 * - Manrope (data/mono-adjacent): statistics, captions, nav labels, form
 *   labels. Its tighter, more geometric numerals read well as data at small
 *   sizes — the "utility face" the design-token system calls for.
 *
 * next/font self-hosts and subsets each family at build time (no runtime
 * request to Google Fonts, no layout-shift from a late-loading @font-face) and
 * exposes each as a CSS variable. globals.css composes those into the
 * `--font-display` / `--font-body` / `--font-data` Tailwind theme tokens.
 *
 * VARIABLE NAMES MUST NOT MATCH THE THEME TOKENS. next/font sets its variable
 * via a class on <html>, and Tailwind's `@theme` sets the token on `:root` —
 * the same element, at the same specificity. The later declaration simply wins,
 * so naming both `--font-display` meant next/font's value silently replaced the
 * whole composed stack, tail and all. Distinct `*-latin` / `*-face` names keep
 * the two layers separate, which is what makes the display stack below work.
 */

import { Inter, Manrope, Onest, Plus_Jakarta_Sans } from "next/font/google";

/**
 * The display face for Latin — and Latin only.
 *
 * `adjustFontFallback: false` is the load-bearing part. next/font normally
 * appends a metric-adjusted local face ("Plus Jakarta Sans Fallback", built
 * from Arial) to its variable. Arial has Cyrillic; Plus Jakarta Sans does not.
 * So with the fallback in the stack, every Russian and Kazakh glyph landed in
 * Arial before any later family could be reached — measured on the running
 * page, a Cyrillic word rendered at exactly the fallback's width, never the
 * display face's. Dropping it lets Onest below take those glyphs instead, and
 * Onest brings its own metric-adjusted fallback for the pre-load moment.
 */
export const fontDisplayLatin = Plus_Jakarta_Sans({
  // LATIN ONLY, deliberately, even though this family also offers
  // "cyrillic-ext" (U+0460-052F).
  //
  // Requesting cyrillic-ext here splits Kazakh words down the middle: Қ and қ
  // live in that range and would be served by Plus Jakarta Sans, while the
  // а з с т н beside them fall through to Onest. Measured on the built site,
  // "Қазақстан" came out 495.91px against Onest's own 518.73px — two typefaces
  // inside one word. Dropping the subset sends every Cyrillic letter to one
  // place.
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
});

/**
 * The display face for Cyrillic, second in the stack so browsers reach it per
 * glyph: Latin keeps Plus Jakarta Sans, Russian and Kazakh get real display
 * type instead of Arial.
 *
 * Onest is the pairing because it is the same species — a geometric humanist
 * sans with a tall x-height and open apertures — and it was drawn with Cyrillic
 * as a first-class script rather than an afterthought, so the Russian letters
 * are designed rather than derived. Same weights as above, so nothing in the
 * type scale changes when a heading switches language.
 */
export const fontDisplayCyrillic = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-cyrillic",
  display: "swap",
});

export const fontBody = Inter({
  // Both Cyrillic subsets, and both are needed: "cyrillic" (U+0400-045F) is the
  // Russian alphabet, while Kazakh's Ә Ғ Қ Ң Ө Ү Һ sit in "cyrillic-ext"
  // (U+0460-052F). With only one of the two, words in the other script render
  // half in Inter and half in a fallback face, mid-word.
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body-face",
  display: "swap",
});

export const fontData = Manrope({
  // Manrope does have a plain "cyrillic" subset, and omitting it was a bug:
  // nav labels, statistics and captions are Russian on the primary locale, and
  // "cyrillic-ext" alone covers none of those letters.
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-data-face",
  display: "swap",
});

/** Combined class string applied once, on <html>, in app/layout.tsx */
export const fontVariables = [
  fontDisplayLatin.variable,
  fontDisplayCyrillic.variable,
  fontBody.variable,
  fontData.variable,
].join(" ");
