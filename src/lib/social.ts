import { socialPlatformLabels } from "@/config/system";
import type { Locale } from "@/types";

/**
 * lib/social.ts
 * ----------------------------------------------------------------------------
 * Accessible names for social channel icons.
 *
 * WHY THIS IS NOT IN SocialButton.tsx, WHERE IT STARTED
 * That file is a Client Component, and every export of a `"use client"` module
 * is a client reference — so a Server Component importing this helper got
 * "Attempted to call socialLabel() from the server but socialLabel is on the
 * client" at request time. TypeScript cannot see that boundary; only running
 * the page does. `SocialIconRow` renders on the server, so the helper belongs
 * in a module with no directive, importable from either side — the same shape
 * as lib/phone.ts, which is a pure function over the same contact config.
 */

export type SocialPlatform = keyof typeof socialPlatformLabels;

/**
 * The localized platform name, plus an optional qualifier for places showing
 * more than one of the same platform. The footer lists both projects'
 * channels, so it passes the project name and gets "Instagram — Туры и курсы"
 * rather than a second, identical "Instagram".
 */
export function socialLabel(platform: SocialPlatform, locale: Locale, context?: string): string {
  const base = socialPlatformLabels[platform][locale];
  return context ? `${base} — ${context}` : base;
}
