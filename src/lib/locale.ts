/**
 * lib/locale.ts
 * ----------------------------------------------------------------------------
 * The single source of truth for WHICH locales exist and which one is
 * primary. `types/common.ts` defines the `Locale` union (the type); this
 * file owns the runtime values derived from it — the array to iterate for
 * `generateStaticParams`/sitemap/hreflang, the default to fall back to, and
 * the guard that turns an untrusted route param into a `Locale`.
 *
 * `locales` is asserted against the union rather than typed loosely, so
 * adding a locale to `Locale` without adding it here is a compile error —
 * the two can't drift.
 *
 * WHY RUSSIAN IS DEFAULT: the site's audience is in Kazakhstan. English was
 * the hardcoded default through the template phase only because no locale
 * routing existed yet.
 */

import type { Locale } from "@/types";

export const locales = ["ru", "en", "kk"] as const satisfies readonly Locale[];

export const defaultLocale: Locale = "ru";

/** Narrows an arbitrary route param to a supported `Locale`. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * BCP 47 tags for `<html lang>` and hreflang. Kept separate from the short
 * `Locale` keys because "kk" alone is ambiguous for hreflang purposes while
 * "kk-KZ" is not.
 */
export const htmlLang: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en",
  kk: "kk-KZ",
};

/** Open Graph locale tags — the format `og:locale` expects. */
export const ogLocale: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  kk: "kk_KZ",
};

/** Native language names, for the language switcher's own labels. */
export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  kk: "Қазақша",
};

/** Short labels for the compact/mobile switcher. */
export const localeShortNames: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  kk: "KK",
};
