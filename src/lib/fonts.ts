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
  // Like Manrope below, Plus Jakarta Sans's Google Fonts metadata only
  // exposes "cyrillic-ext" rather than a separate base "cyrillic" subset.
  subsets: ["latin", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontData = Manrope({
  // Manrope's Google Fonts metadata exposes "cyrillic-ext", not a plain
  // "cyrillic" subset (unlike Inter/Plus Jakarta Sans below) — this still
  // covers the Cyrillic glyphs used by Russian/Kazakh nav labels and stats.
  subsets: ["latin", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-data",
  display: "swap",
});

/** Combined class string applied once, on <html>, in app/layout.tsx */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontData.variable}`;
