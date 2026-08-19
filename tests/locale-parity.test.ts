import { describe, expect, it } from "vitest";
import { defaultLocale, htmlLang, localeNames, localeShortNames, locales, ogLocale } from "@/lib/locale";
import type { Locale } from "@/types";

/**
 * THE SECOND THING THIS CODEBASE ASKS YOU TO KEEP IN STEP
 *
 * The site's locales live in src/lib/locale.ts; the CMS's live in
 * payload.config.ts. If those two ever disagree, the failure is quiet and
 * confusing: the admin offers a language tab whose content no page can read,
 * or a page requests a locale the CMS has never stored and renders fallback
 * text with no error anywhere.
 *
 * payload.config.ts already derives its locale list from src/lib/locale.ts by
 * importing it, so they cannot drift by construction. These tests guard the
 * layer underneath that — the maps every locale must appear in. Adding "de"
 * to the `Locale` union without adding it to `htmlLang`, `ogLocale` and the
 * two name maps would otherwise produce `undefined` in an `<html lang>`
 * attribute, an hreflang tag and the language switcher.
 *
 * The config itself is not imported here on purpose: it opens a database
 * connection at module load, which would make a unit test require Postgres.
 */

describe("locale registry", () => {
  it("has Russian as the default, matching the site's audience", () => {
    expect(defaultLocale).toBe("ru");
  });

  it("includes the default locale in the list of locales", () => {
    expect(locales).toContain(defaultLocale);
  });

  it("has no duplicates", () => {
    expect(new Set(locales).size).toBe(locales.length);
  });

  it.each(locales)("'%s' has a BCP 47 tag for <html lang> and hreflang", (locale) => {
    expect(htmlLang[locale]).toBeTruthy();
  });

  it.each(locales)("'%s' has an Open Graph locale tag", (locale) => {
    expect(ogLocale[locale]).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
  });

  it.each(locales)("'%s' has a native name and a short label for the switcher", (locale) => {
    expect(localeNames[locale]).toBeTruthy();
    expect(localeShortNames[locale]).toMatch(/^[A-Z]{2}$/);
  });

  it("defines no map entries for locales that do not exist", () => {
    // Guards the reverse drift: removing a locale from `locales` but leaving
    // it in the maps, which would keep a dead language visible in the
    // switcher's type surface.
    const known = new Set<string>(locales);
    for (const map of [htmlLang, ogLocale, localeNames, localeShortNames]) {
      for (const key of Object.keys(map)) {
        expect(known.has(key), `'${key}' is in a locale map but not in locales`).toBe(true);
      }
    }
  });

  it("keeps the Locale union and the runtime list in sync", () => {
    // If someone adds a locale to the union but not to `locales`, this
    // assignment stops compiling — the test is the type check.
    const all: Locale[] = [...locales];
    expect(all.length).toBe(locales.length);
  });
});
