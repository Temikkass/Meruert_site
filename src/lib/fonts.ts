/**
 * lib/fonts.ts
 * ----------------------------------------------------------------------------
 * TYPE SYSTEM RATIONALE
 * Three faces, each with one job — not because more fonts feel more
 * "premium," but because each solves a different reading problem:
 *
 * - Plus Jakarta Sans (display): headlines, hero statements. It has more
 *   character than a pure grotesk at large sizes — distinct enough to
 *   carry the "handcrafted" feeling the brief asks for — while remaining
 *   fully legible, unlike a display serif that would fight the brief's
 *   "modern, minimalistic" direction.
 * - Inter (body): paragraphs, biography, descriptions. Chosen specifically
 *   because it disappears — body copy's job is to be read effortlessly,
 *   not to have personality.
 * - Manrope (data/mono-adjacent): statistics, captions, nav labels, form
 *   labels. Its tighter, more geometric numerals read well as data at small
 *   sizes — the "utility face" the design-token system calls for.
 *
 * next/font self-hosts and subsets each family at build time (no runtime
 * request to Google Fonts, no layout-shift from a late-loading @font-face)
 * and exposes each as a CSS variable, which app/globals.css maps onto the
 * `--font-display` / `--font-body` / `--font-data` Tailwind theme tokens.
 */

import { Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";

export const fontDisplay = Plus_Jakarta_Sans({
  // Plus Jakarta Sans genuinely has no "cyrillic" subset — only "cyrillic-ext"
  // (U+0460-052F), which holds historic and extended letters, NOT the basic
  // Russian alphabet at U+0400-045F. Requesting it here is therefore as much
  // Cyrillic as this family can give, and headings in Russian fall through to
  // the metric-adjusted fallback face. See the note at the bottom of this file.
  subsets: ["latin", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  // Both Cyrillic subsets, and both are needed: "cyrillic" (U+0400-045F) is the
  // Russian alphabet, while Kazakh's Ә Ғ Қ Ң Ө Ү Һ sit in "cyrillic-ext"
  // (U+0460-052F). With only one of the two, words in the other script render
  // half in Inter and half in a fallback face, mid-word.
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontData = Manrope({
  // Manrope does have a plain "cyrillic" subset, and omitting it was a bug:
  // nav labels, statistics and captions are Russian on the primary locale, and
  // "cyrillic-ext" alone covers none of those letters.
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-data",
  display: "swap",
});

/**
 * KNOWN GAP, left as a decision rather than settled here: the display face
 * cannot render Russian or Kazakh.
 *
 * Plus Jakarta Sans ships no basic-Cyrillic glyphs, so on /ru and /kk every
 * heading falls through to next/font's metric-adjusted fallback — Arial-like on
 * Windows. Latin headings on /en are unaffected. The site's primary language is
 * Russian, so in practice most visitors never see the display face at all.
 *
 * Fixing it means choosing a second display family with real Cyrillic and
 * appending it to `--font-display` in globals.css, so browsers fall back per
 * glyph: Latin keeps Plus Jakarta Sans, Cyrillic gets the new face. That is a
 * visible change to the brand's typography and belongs to whoever owns the
 * brand, which is why it is written down here rather than applied.
 */

/** Combined class string applied once, on <html>, in app/layout.tsx */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontData.variable}`;
