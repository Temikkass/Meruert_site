/**
 * config/theme.ts
 * ----------------------------------------------------------------------------
 * DESIGN RATIONALE (read this before touching a color)
 *
 * Palette: neutral canvas (near-white / near-black) with a single restrained
 * violet-lavender accent family, exactly as briefed — no oversaturated
 * color, no competing hues. Values use OKLCH instead of hex so lightness
 * and chroma can be tuned independently (e.g. dimming the accent for dark
 * mode) without the hue drifting, which is a common problem when you
 * "just darken the hex."
 *
 * The one deliberate system-level decision beyond the brief: each of the
 * two projects gets its own ACCENT TINT within the same restrained violet
 * family — Financial Literacy leans deep indigo-violet (precision, trust),
 * Tours/Courses leans warmer plum-mauve (warmth, journey) — rather than
 * both projects sharing one identical accent. This gives each project a
 * quietly distinct identity when the user is on its dedicated page, while
 * the homepage that introduces the person stays fully neutral. It is the
 * one place this system takes a visual risk; everything else is disciplined
 * and quiet on purpose.
 *
 * This file is the SINGLE SOURCE OF TRUTH for tokens. It does not import
 * React or Tailwind. `app/globals.css` mirrors these exact values as CSS
 * variables inside a Tailwind v4 `@theme` block — see the comment at the
 * top of globals.css for why the values must be kept in sync by hand
 * rather than generated (Tailwind v4 config is CSS-native, so there is no
 * JS→CSS build step to automate this without adding a bespoke script).
 *
 * DESIGN-SYSTEM PHASE ADDITIONS (semantic colors, shadow/blur/glass/
 * gradient/spacing/size scales) are appended below the original light/dark
 * palettes and radius/duration/easing tokens — nothing above that line
 * changed shape or meaning from the architecture phase.
 */

import type { ThemeTokens } from "@/types";

export const theme: ThemeTokens = {
  light: {
    canvas: "oklch(98.5% 0.004 293)", // near-white, faint cool-violet undertone
    surface: "oklch(100% 0 0)", // pure white cards on top of the canvas
    ink: "oklch(18% 0.02 293)", // near-black, not pure #000 — softer on a light canvas
    inkMuted: "oklch(46% 0.02 293)",
    border: "oklch(90% 0.01 293)",
    accent: "oklch(52% 0.16 292)", // primary violet
    accentTint: "oklch(90% 0.05 292)", // soft lavender tint for gradients/backgrounds

    card: "oklch(99.2% 0.003 293)", // one step above canvas, one step below surface
    accentForeground: "oklch(98% 0.005 292)", // near-white text/icons on the accent color

    primary: "oklch(52% 0.16 292)", // same value as accent — kept as its own token so a
    // future rebrand could diverge "brand primary" from "the violet accent" independently
    primaryForeground: "oklch(98% 0.005 292)",
    secondary: "oklch(94% 0.006 293)", // quiet neutral chip/button background
    secondaryForeground: "oklch(18% 0.02 293)",
    muted: "oklch(95.5% 0.005 293)",
    mutedForeground: "oklch(52% 0.015 293)",
    success: "oklch(50% 0.13 155)", // darkened from an earlier 58% for AA text contrast on canvas (was 3.86:1, now 5.35:1)
    warning: "oklch(52% 0.13 75)", // darkened from an earlier 68% — that value failed AA contrast entirely (2.81:1); now 5.37:1
    error: "oklch(55% 0.18 25)",
    hover: "oklch(18% 0.02 293 / 0.04)", // faint ink wash — works on any light surface
    selection: "oklch(90% 0.05 292 / 0.55)", // accentTint, semi-transparent
  },
  dark: {
    canvas: "oklch(15% 0.015 293)",
    surface: "oklch(19% 0.018 293)",
    ink: "oklch(96% 0.004 293)",
    inkMuted: "oklch(70% 0.015 293)",
    border: "oklch(28% 0.02 293)",
    accent: "oklch(74% 0.13 292)", // lifted lightness so violet stays legible on dark
    accentTint: "oklch(30% 0.06 292)",

    card: "oklch(21% 0.018 293)",
    accentForeground: "oklch(14% 0.02 292)", // near-black text on the lifted dark-mode accent

    primary: "oklch(74% 0.13 292)",
    primaryForeground: "oklch(14% 0.02 292)",
    secondary: "oklch(24% 0.016 293)",
    secondaryForeground: "oklch(96% 0.004 293)",
    muted: "oklch(23% 0.015 293)",
    mutedForeground: "oklch(66% 0.015 293)",
    success: "oklch(72% 0.14 155)",
    warning: "oklch(78% 0.13 80)",
    error: "oklch(70% 0.16 25)",
    hover: "oklch(100% 0 0 / 0.06)", // faint white wash on dark surfaces
    selection: "oklch(30% 0.06 292 / 0.6)",
  },
  projects: [
    {
      id: "financial",
      accent: "oklch(50% 0.17 288)", // deep indigo-violet — precision, trust
      accentTint: "oklch(91% 0.045 288)",
    },
    {
      id: "travel",
      accent: "oklch(54% 0.13 322)", // warm plum-mauve — journey, warmth
      accentTint: "oklch(91% 0.035 322)",
    },
  ],
  radius: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1.25rem",
    xl: "2rem",
    full: "9999px",
  },
  duration: {
    fast: 150,
    base: 350,
    slow: 600,
    ambient: 1200,
  },
  easing: {
    // Standard: a refined ease-out used for most UI motion
    standard: "cubic-bezier(0.22, 1, 0.36, 1)",
    // Entrance: slightly more pronounced deceleration for reveals
    entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
    // Exit: quicker, snappier — things leaving the screen shouldn't linger
    exit: "cubic-bezier(0.7, 0, 0.84, 0)",
  },

  // ---- Design-system phase additions ---------------------------------
  //
  // Shadows are intentionally soft and low-opacity (never a hard drop
  // shadow) and neutral-tinted except `glow`, which carries a faint trace
  // of the accent hue — this is what separates a "premium quiet" shadow
  // system from a default framework one.
  shadow: {
    xs: "0 1px 2px oklch(18% 0.02 293 / 0.04)",
    sm: "0 2px 8px -2px oklch(18% 0.02 293 / 0.08)",
    md: "0 8px 24px -8px oklch(18% 0.02 293 / 0.12)",
    lg: "0 24px 48px -12px oklch(18% 0.02 293 / 0.16)",
    xl: "0 40px 80px -16px oklch(18% 0.02 293 / 0.2)",
    glow: "0 0 64px -8px oklch(52% 0.16 292 / 0.25)",
  },
  blur: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
  },
  glass: {
    background: "oklch(100% 0 0 / 0.6)",
    border: "oklch(100% 0 0 / 0.3)",
    blur: "16px", // mirrors blur.md
  },
  gradient: {
    brand: "linear-gradient(135deg, oklch(52% 0.16 292) 0%, oklch(60% 0.14 320) 100%)",
    subtle: "linear-gradient(180deg, oklch(98.5% 0.004 293) 0%, oklch(96% 0.02 292) 100%)",
    radialGlow: "radial-gradient(circle at 50% 30%, oklch(90% 0.05 292 / 0.4) 0%, transparent 70%)",
  },
  spacing: {
    section: {
      sm: "4rem", // 64px — mobile section padding
      md: "6rem", // 96px — tablet
      lg: "8rem", // 128px — desktop, generous editorial whitespace
    },
    gutter: "1.25rem",
  },
  iconSize: {
    xs: "0.875rem", // 14px
    sm: "1.125rem", // 18px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "2.75rem", // 44px
  },
  buttonHeight: {
    xs: "2rem", // 32px
    sm: "2.5rem", // 40px
    md: "3rem", // 48px — meets the 48px minimum touch target on its own
    lg: "3.5rem", // 56px
    xl: "4rem", // 64px
  },
  cardPadding: {
    sm: "1.25rem",
    md: "2rem",
    lg: "2.75rem",
  },

  container: {
    max: "88rem", // 1408px — wide enough for an editorial desktop layout
    padding: "1.25rem", // mobile-first gutter; scaled up via Tailwind screens
  },
};
