import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/locale";

/**
 * proxy.ts
 * ----------------------------------------------------------------------------
 * Renamed from middleware.ts for Next 16, which deprecated the `middleware`
 * file convention in favour of `proxy`. Same execution model, same request
 * lifecycle position, same `config.matcher` — only the filename and the
 * exported function's name changed. Next requires the export to be named
 * `proxy` (or be the default export); leaving it as `middleware` makes the
 * file silently do nothing.
 *
 * Every page lives under `/{locale}`, so a request for `/about` (or `/`)
 * matches no route. This redirects those to the same path under a locale,
 * which is what makes bare, un-prefixed URLs — the ones people type, and the
 * ones already printed on anything the client has handed out — keep working.
 *
 * WHICH LOCALE: the visitor's own `Accept-Language`, if it names one we
 * support, otherwise `defaultLocale`. Guessing from the browser and then
 * redirecting (308, not a rewrite) keeps one canonical URL per language,
 * which is what the hreflang tags in lib/metadata.ts promise search engines.
 *
 * Requests that already carry a valid locale fall through untouched. Invalid
 * ones (`/de/about`) also fall through, and `assertLocale` in the layout
 * turns them into a 404 rather than quietly serving the default language at
 * a URL that implies German.
 */

function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // "ru-RU,ru;q=0.9,en;q=0.8" -> ["ru-ru", "ru", "en"], best-quality first.
  const requested = header
    .split(",")
    .map((part) => {
      const [tag = "", q = "q=1"] = part.trim().split(";");
      return { tag: tag.trim().toLowerCase(), q: Number.parseFloat(q.replace("q=", "")) || 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of requested) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

/**
 * True for anything that is a file rather than a page — any path whose last
 * segment contains a dot (/images/portrait.jpg, /robots.txt, /icon.svg).
 *
 * This lives in code rather than in the `matcher` regex below on purpose. The
 * usual `(?!...|.*\..*)` idiom does not survive Next's path-to-regexp
 * compilation: the backslash is stripped, so `.*\..*` becomes `.*..*` — "any
 * two characters" — and the matcher then excludes every path of two or more
 * characters. The failure is silent, and its symptom is a proxy that appears
 * to run only for "/".
 */
function isFileRequest(pathname: string): boolean {
  const lastSegment = pathname.split("/").pop() ?? "";
  return lastSegment.includes(".");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isFileRequest(pathname)) return NextResponse.next();

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  /**
   * Next's own internals and the Payload admin are excluded here; everything
   * else is filtered in `isFileRequest` above, where the logic is readable and
   * cannot be mangled by regex compilation.
   *
   * `admin` matters: the admin panel is not a localized route, so without this
   * every visit to /admin would be redirected to /ru/admin and 404. The same
   * applies to `api`, which serves Payload's REST and GraphQL endpoints.
   *
   * Exclusions carry no trailing slash because path-to-regexp tokenises on "/".
   */
  matcher: ["/((?!api|_next|admin).*)"],
};

