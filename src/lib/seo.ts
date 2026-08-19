import { cache } from "react";
import { getAboutContent, getContactPageContent, getLegalContent, getProjects, getSiteSettings } from "@/lib/content";
import { getPerson } from "@/lib/content";
import type { PageSeo, SiteSeo } from "@/types";

/**
 * lib/seo.ts
 * ----------------------------------------------------------------------------
 * Builds the `SiteSeo` and `PageSeo` objects `lib/metadata.ts` consumes, from
 * CMS content instead of a static config object. Same types, same consumers —
 * only the source changed.
 *
 * `baseUrl` deliberately does NOT come from the CMS. It is deployment
 * configuration, not content: it feeds `metadataBase`, every canonical URL,
 * Open Graph image resolution, sitemap.xml and robots.txt, and a typo in it
 * breaks all of them at once in a way the client could neither diagnose nor
 * undo. It stays in the environment.
 *
 * `pageSeo` used to be a plain object literal, so `app/sitemap.ts` could
 * iterate it synchronously. It is a function now, and the sitemap awaits it.
 */

/** Replace with the real production domain, or set NEXT_PUBLIC_SITE_URL. */
const FALLBACK_BASE_URL = "https://www.replace-with-domain.com";

/** Trailing slashes are stripped so `${baseUrl}${path}` never doubles up. */
export function resolveBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_BASE_URL;
  return value.replace(/\/+$/, "");
}

export const getSiteSeo = cache(async (): Promise<SiteSeo> => {
  const [settings, person] = await Promise.all([getSiteSettings(), getPerson()]);

  return {
    siteName: person.fullName,
    baseUrl: resolveBaseUrl(),
    defaultTitle: settings.defaultTitle,
    titleTemplate: `%s — ${person.fullName}`,
    defaultDescription: settings.defaultDescription,
    defaultOgImage: settings.defaultOgImage,
  };
});

/**
 * Every page that has its own metadata, keyed by locale-free path — the same
 * keys the old config object used, so `app/sitemap.ts` and each page's
 * `generateMetadata` look content up exactly as before.
 */
export const getAllPageSeo = cache(async (): Promise<Record<string, PageSeo>> => {
  const [siteSeo, about, contact, legal, projects] = await Promise.all([
    getSiteSeo(),
    getAboutContent(),
    getContactPageContent(),
    getLegalContent(),
    getProjects(),
  ]);

  return {
    "/": {
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      path: "/",
      project: "shared",
    },
    "/about": {
      title: about.hero.headline,
      description: about.hero.intro,
      path: "/about",
      project: "shared",
    },
    [`/${projects.financial.slug}`]: {
      title: projects.financial.name,
      description: projects.financial.tagline,
      path: `/${projects.financial.slug}`,
      project: "financial",
      ogImage: projects.financial.heroImage,
    },
    [`/${projects.travel.slug}`]: {
      title: projects.travel.name,
      description: projects.travel.tagline,
      path: `/${projects.travel.slug}`,
      project: "travel",
      ogImage: projects.travel.heroImage,
    },
    "/contact": {
      title: contact.hero.heading,
      description: contact.hero.subtitle ?? siteSeo.defaultDescription,
      path: "/contact",
      project: "shared",
    },
    "/privacy-policy": {
      title: legal.title,
      description: legal.intro,
      path: "/privacy-policy",
      project: "shared",
    },
  };
});

/** One page's metadata, or undefined if that path has none. */
export async function getPageSeo(path: string): Promise<PageSeo | undefined> {
  const all = await getAllPageSeo();
  return all[path];
}
