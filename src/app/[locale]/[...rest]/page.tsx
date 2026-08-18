import { notFound } from "next/navigation";

/**
 * app/[locale]/[...rest]/page.tsx
 * ----------------------------------------------------------------------------
 * Renders the site's own 404 for any URL under a locale that matches no real
 * page — /ru/nope, and (via middleware's redirect) /de/about too.
 *
 * WHY THIS FILE HAS TO EXIST: a `not-found.tsx` inside a segment only handles
 * `notFound()` thrown from within that segment. A URL matching no route at all
 * is handled by the ROOT `app/not-found.tsx` instead — and this app has no
 * app/ level, because the root layout lives at app/[locale]/layout.tsx so that
 * <html lang> can read the active locale. Without this catch-all, unmatched
 * URLs fell through to Next's built-in default 404: bare markup, no fonts, no
 * nav, no theme — the one page guaranteed to be seen by someone who is already
 * lost.
 *
 * Calling notFound() here routes them into app/[locale]/not-found.tsx, wrapped
 * in the normal layout, in the right language.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
