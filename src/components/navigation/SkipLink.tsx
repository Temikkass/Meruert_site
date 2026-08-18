/**
 * components/navigation/SkipLink.tsx
 * ----------------------------------------------------------------------------
 * The first focusable element on every page. Visually hidden until focused,
 * then it drops into view as a normal button.
 *
 * WHY IT IS NOT OPTIONAL HERE: the header is `position: fixed` and the
 * mobile menu is a full-screen dialog, so a keyboard user landing on a page
 * would otherwise have to tab through the entire nav on every navigation
 * before reaching content. WCAG 2.4.1 (Bypass Blocks).
 *
 * A plain <a>, not next/link — this is a same-document jump to an anchor,
 * not a route change, and routing it through the client router would move
 * focus without moving the viewport.
 *
 * The hidden/revealed states live in globals.css as `.skip-link` /
 * `.skip-link:focus` rather than as `sr-only` + `focus:not-sr-only`
 * utilities. That idiom needs two competing `position` values (`not-sr-only`
 * resets to `static`, but the revealed link must stay `fixed` to sit above
 * the header); expressing the pair as one local CSS rule keeps the cascade
 * explicit and leaves the link in the accessibility tree throughout, which
 * is what a skip link is for.
 *
 * The class list is a plain string rather than `cn()` on purpose. There is no
 * incoming className to merge, and tailwind-merge cannot tell this design
 * system's `text-body-sm` (a font size) from `text-primary-foreground` (a
 * color) — it treats both as `text-*` and drops the first. Passing them
 * through `cn()` silently cost the link its type scale.
 *
 * `focus:` and not `focus-visible:` deliberately: the link is unreachable
 * by pointer, so every focus it receives is a keyboard focus, and
 * `:focus-visible` heuristics only add a way for it to silently not appear.
 */

import { SKIP_TARGET_ID } from "@/lib/constants";
import { skipLinkLabel } from "@/config/system";
import { defaultLocale } from "@/lib/locale";
import type { Locale } from "@/types";

export function SkipLink({ locale = defaultLocale }: { locale?: Locale }) {
  return (
    <a
      href={`#${SKIP_TARGET_ID}`}
      className="skip-link fixed left-4 z-50 rounded-lg bg-primary px-5 py-3 text-body-sm font-medium text-primary-foreground shadow-md"
    >
      {skipLinkLabel[locale]}
    </a>
  );
}
