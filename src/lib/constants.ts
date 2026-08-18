/**
 * lib/constants.ts
 * ----------------------------------------------------------------------------
 * Numeric/string constants that components and hooks need in JS (not just
 * CSS) — e.g. `useMediaQuery` needs the breakpoint as a number to build a
 * media query string. These mirror the Tailwind breakpoints defined in
 * globals.css; if you change one, change both (see that file's header
 * comment on why Tailwind v4's CSS-native config means this isn't
 * auto-synced).
 */

export const BREAKPOINTS = {
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Height, in px, reserved for the fixed header — used to offset scrollToSection() */
export const HEADER_OFFSET = 88;

/** Default viewport margin used by scroll-reveal animations (components/animations) */
export const REVEAL_VIEWPORT_MARGIN = "-10% 0px -10% 0px";
