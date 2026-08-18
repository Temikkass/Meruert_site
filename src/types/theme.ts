/**
 * theme.ts (types)
 * ----------------------------------------------------------------------------
 * Typed shape for the design-token object in /config/theme.ts. Colors are
 * typed as `string` (CSS color values) rather than a union of literal hexes
 * — the type system's job here is to guarantee *structure* (every palette
 * has these keys) not to lock in specific values, which would defeat the
 * purpose of having a config file at all.
 *
 * DESIGN-SYSTEM PHASE EXTENSION
 * The architecture phase shipped the 7-field ColorScale plus radius/
 * duration/easing/container. This phase extends the same object — never
 * replaces it — with the full semantic set a real component library needs
 * (primary/secondary/muted/success/warning/error, foreground pairs for
 * each), plus shadow (doubling as elevation), blur, glass, gradient,
 * spacing, icon-size, button-size and card-size scales. Every existing
 * field keeps its old name and meaning; nothing that read `theme.light.ink`
 * or `theme.duration.base` before needs to change.
 */

import type { ProjectId } from "./common";

export interface ColorScale {
  // --- Base surfaces (architecture phase) ---
  canvas: string; // page background
  surface: string; // card/panel background
  ink: string; // primary text
  inkMuted: string; // secondary text
  border: string;
  accent: string;
  accentTint: string;

  // --- Base surfaces, extended ---
  /** A step above `surface` — used where a card sits on top of another
   * surface (e.g. a card inside a glass panel) and needs to read as
   * distinct without a hard border. */
  card: string;
  /** Text/icon color placed directly on top of `accent` (buttons, badges) */
  accentForeground: string;

  // --- Semantic roles ---
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  success: string;
  warning: string;
  error: string;
  /** Overlay tint layered on interactive elements on hover (low-opacity ink or white) */
  hover: string;
  /** `::selection` background */
  selection: string;
}

export interface ProjectTheme {
  id: ProjectId;
  accent: string;
  accentTint: string;
}

export interface RadiusScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface DurationScale {
  fast: number; // ms
  base: number;
  slow: number;
  ambient: number;
}

export interface EasingScale {
  standard: string; // cubic-bezier string
  entrance: string;
  exit: string;
}

/**
 * Shadow scale doubles as the elevation scale — in this system "how far
 * off the canvas does this sit" and "how soft is its shadow" are the same
 * design decision, so there's no separate elevation token set to keep in
 * sync with this one.
 */
export interface ShadowScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  /** Accent-tinted glow, used sparingly — a focused card, a primary CTA on hover */
  glow: string;
}

export interface BlurScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface GlassTokens {
  background: string;
  border: string;
  blur: string; // references BlurScale's value, kept as a resolved string for direct CSS use
}

export interface GradientTokens {
  /** The brand gradient — accent to accentTint, used on primary CTAs and section washes */
  brand: string;
  /** A near-invisible wash used behind hero/section content, never a full-strength gradient */
  subtle: string;
  /** Radial spotlight, used behind a portrait or a single focal element */
  radialGlow: string;
}

export interface SpacingScale {
  /** Vertical rhythm between major sections, by viewport tier */
  section: {
    sm: string; // mobile
    md: string; // tablet
    lg: string; // desktop
  };
  /** Horizontal page gutter — mirrors container.padding but exposed as its
   * own token so layout components don't reach into `container` for it */
  gutter: string;
}

export interface SizeScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTokens {
  light: ColorScale;
  dark: ColorScale;
  projects: ProjectTheme[];
  radius: RadiusScale;
  duration: DurationScale;
  easing: EasingScale;
  shadow: ShadowScale;
  blur: BlurScale;
  glass: GlassTokens;
  gradient: GradientTokens;
  spacing: SpacingScale;
  /** Icon size scale, in rem — consumed by <Icon> usages across the system */
  iconSize: SizeScale;
  /** Button height scale, in rem — consumed by the Button component's size variants */
  buttonHeight: SizeScale;
  /** Card internal padding scale, in rem — consumed by the Card component's size prop */
  cardPadding: Pick<SizeScale, "sm" | "md" | "lg">;
  container: {
    max: string;
    padding: string;
  };
}
