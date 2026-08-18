/**
 * lib/routes.ts
 * ----------------------------------------------------------------------------
 * Every page lives under a `/{locale}` segment, so every internal href has to
 * carry the active locale or a click silently drops the visitor back to the
 * default language. This is the one function that knows how to build them —
 * NavLink, the Footer, ProjectCard, CtaSection and HeroCtaButtons all route
 * through it rather than each interpolating `/${locale}${href}` themselves.
 *
 * Config files still store plain, locale-free paths ("/about"), which keeps
 * them readable and means adding a locale never touches content config.
 */

import type { Locale } from "@/types";
import { isLocale } from "./locale";

/**
 * Prefixes an app-internal path with the locale segment.
 *
 * Left untouched: absolute URLs and anything that is not an internal path
 * (mailto:, tel:, https:), and paths already carrying a locale segment — so
 * calling this twice is a no-op rather than producing "/ru/ru/about".
 *
 * A bare in-page anchor ("#faq") is returned as-is; prefixing it would turn a
 * same-page jump into a navigation.
 */
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/")) return path;

  const [pathname = "", hash] = path.split("#");
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== undefined && isLocale(segments[0])) return path;

  const rest = segments.join("/");
  const built = rest.length > 0 ? `/${locale}/${rest}` : `/${locale}`;
  return hash !== undefined ? `${built}#${hash}` : built;
}

/**
 * Swaps the locale segment on the CURRENT pathname, preserving the rest of
 * the route — what the language switcher needs so switching language on
 * /ru/about lands on /en/about rather than the homepage.
 */
export function swapLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== undefined && isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return localizedPath(pathname, nextLocale);
}
