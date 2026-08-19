import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";
import { locales } from "@/lib/locale";

/**
 * cms/hooks/revalidate.ts
 * ----------------------------------------------------------------------------
 * What makes an edit in the admin panel show up on the live site.
 *
 * Every page is statically prerendered, which is why the site is fast — but it
 * also means a saved edit would otherwise sit in the database, invisible,
 * until the next deploy. These hooks rebuild the affected pages the moment
 * content changes, which is the mechanism behind the decision that saving
 * publishes immediately rather than going through a draft step.
 *
 * WHY WHOLE PATHS AND NOT TAGS: this site has six pages in three languages.
 * Rebuilding a handful of them is cheap and, more importantly, correct without
 * anyone having to maintain a map of which content appears where. A gallery
 * photo shows on the homepage, the About page and a project page; a tag scheme
 * would need updating every time a section is added, and the failure mode of
 * getting it wrong is a stale page nobody notices. Paths that are always
 * revalidated together are the conservative choice at this size.
 *
 * `revalidatePath` is a no-op during the build itself, so seeding does not
 * fight the static export.
 */

/** Locale-free page paths, mirroring the routes under app/[locale]/. */
const PAGE_PATHS = [
  "",
  "/about",
  "/contact",
  "/financial-literacy",
  "/tours-and-courses",
  "/privacy-policy",
] as const;

/**
 * Revalidates every localized page.
 *
 * Content is shared widely enough across this site — the person's name is in
 * every header and footer, the projects are on the homepage and their own
 * pages, the gallery spans three — that narrowing this per collection would
 * save a trivial amount of work in exchange for a class of stale-page bug.
 */
function revalidateSite() {
  // `revalidatePath` only works inside a Next.js request context. Writes made
  // from a CLI script — `npm run seed`, a migration, a maintenance task — have
  // no such context and it throws "Invariant: static generation store missing",
  // which would abort the script partway through. There is nothing to
  // invalidate in that case anyway: no server is serving cached pages, and the
  // next build regenerates all of them from scratch.
  //
  // So the failure is caught and ignored rather than guarded against, because
  // Next exposes no public way to ask "am I in a request context?". Errors
  // that are NOT this invariant are re-thrown, so a genuine revalidation
  // failure in the admin still surfaces instead of being swallowed.
  try {
    for (const locale of locales) {
      for (const path of PAGE_PATHS) {
        revalidatePath(`/${locale}${path}`);
      }
    }

    // The sitemap and manifest are generated from CMS content too.
    revalidatePath("/sitemap.xml");
    revalidatePath("/manifest.webmanifest");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("static generation store")) throw error;
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite();
  return doc;
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateSite();
  return doc;
};
