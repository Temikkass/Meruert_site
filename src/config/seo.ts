/**
 * config/seo.ts
 * ----------------------------------------------------------------------------
 * `baseUrl` is read from NEXT_PUBLIC_SITE_URL when present, falling back to
 * the literal below. Every absolute URL the site emits derives from it —
 * `metadataBase`, each page's canonical, Open Graph image resolution,
 * sitemap.xml and robots.txt — so a deploy that forgets the variable
 * publishes a sitemap full of the placeholder domain. Setting it in the
 * hosting provider's env is the last required launch step; see README.
 *
 * `siteSeo` feeds the root layout's default metadata (see app/layout.tsx)
 * and lib/metadata.ts#createMetadata(). `pageSeo` entries are looked up by
 * path when a specific page wants to override the default title/description
 * — every page calls `createMetadata(pageSeo["/some-path"])` from its own
 * `generateMetadata`, and `app/sitemap.ts` is generated FROM this same
 * object (see that file), so a new page added here automatically appears
 * in the sitemap too.
 */

import type { PageSeo, SiteSeo } from "@/types";
import { financialProject } from "./financial";
import { travelProject } from "./travel";
import { person } from "./person";
import { aboutContent } from "./about";
import { contactPageContent } from "./contact-page";
import { privacyPolicyContent } from "./legal";

/** Replace with the real production domain, or set NEXT_PUBLIC_SITE_URL. */
const FALLBACK_BASE_URL = "https://www.replace-with-domain.com";

/** Trailing slashes are stripped so `${baseUrl}${path}` never doubles up. */
function resolveBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_BASE_URL;
  return value.replace(/\/+$/, "");
}

export const siteSeo: SiteSeo = {
  siteName: person.fullName,
  baseUrl: resolveBaseUrl(),
  defaultTitle: `${person.fullName} — Financial Literacy, Tours & Language Courses`,
  titleTemplate: `%s — ${person.fullName}`,
  defaultDescription:
    "Personal site introducing two independent projects: financial literacy education, and author-led tours, language courses and educational camps.",
  defaultOgImage: {
    src: "/images/backgrounds/og-default-placeholder.jpg",
    alt: person.fullName,
    width: 1200,
    height: 630,
  },
  locale: "en_US",
};

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    path: "/",
    project: "shared",
  },
  "/about": {
    title: aboutContent.hero.headline.en,
    description: aboutContent.hero.intro.en,
    path: "/about",
    project: "shared",
  },
  [`/${financialProject.slug}`]: {
    title: financialProject.name.en,
    description: financialProject.tagline.en,
    path: `/${financialProject.slug}`,
    project: "financial",
    ogImage: financialProject.heroImage,
  },
  [`/${travelProject.slug}`]: {
    title: travelProject.name.en,
    description: travelProject.tagline.en,
    path: `/${travelProject.slug}`,
    project: "travel",
    ogImage: travelProject.heroImage,
  },
  "/contact": {
    title: contactPageContent.hero.heading.en,
    description: contactPageContent.hero.subtitle?.en ?? siteSeo.defaultDescription,
    path: "/contact",
    project: "shared",
  },
  "/privacy-policy": {
    title: privacyPolicyContent.title.en,
    description: privacyPolicyContent.intro.en,
    path: "/privacy-policy",
    project: "shared",
  },
};
