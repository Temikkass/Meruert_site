/**
 * lib/metadata.ts
 * ----------------------------------------------------------------------------
 * The only function in the codebase that knows how to translate our small,
 * config-authoring-friendly `PageSeo`/`SiteSeo` types (see /types/seo.ts)
 * into Next's much larger `Metadata` type. Every page's `generateMetadata`
 * calls `createMetadata(pageSeo["/some-path"], locale)` instead of
 * hand-assembling a Metadata object — so Open Graph/Twitter defaults,
 * canonical URLs, hreflang alternates and fallbacks are applied
 * consistently everywhere, once.
 *
 * LOCALE: every page exists at `/{locale}{path}`, so the canonical URL and
 * the `alternates.languages` map are both derived here rather than in each
 * page. Emitting hreflang for all three locales from one place is what stops
 * the three language versions of a page from competing with each other in
 * search results.
 */

import type { Metadata } from "next";
import type { Locale, PageSeo } from "@/types";
import { getSiteSeo } from "./seo";
import { defaultLocale, htmlLang, locales, ogLocale } from "./locale";
import { localizedPath } from "./routes";

/** Absolute URL for a path in a given locale. */
function absoluteUrl(baseUrl: string, path: string, locale: Locale): string {
  return `${baseUrl}${localizedPath(path, locale)}`;
}

/**
 * `alternates.languages` for one logical page across every locale, plus an
 * `x-default` pointing at the primary language — the signal Google uses when
 * none of the listed languages match the user.
 */
function languageAlternates(baseUrl: string, path: string): Record<string, string> {
  const entries = locales.map(
    (locale) => [htmlLang[locale], absoluteUrl(baseUrl, path, locale)] as const
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": absoluteUrl(baseUrl, path, defaultLocale),
  };
}

export async function createMetadata(page: PageSeo, locale: Locale): Promise<Metadata> {
  const siteSeo = await getSiteSeo();
  const url = absoluteUrl(siteSeo.baseUrl, page.path, locale);
  const ogImage = page.ogImage ?? siteSeo.defaultOgImage;
  const title = page.title[locale];
  const description = page.description[locale];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(siteSeo.baseUrl, page.path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSeo.siteName,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type: "website",
      images: [
        {
          url: ogImage.src,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.src],
      creator: siteSeo.twitterHandle,
    },
  };
}

/**
 * Root-level default metadata, consumed once by app/[locale]/layout.tsx via
 * Next's `metadataBase` + spread defaults. Individual pages layer their own
 * `createMetadata(pageSeo[...], locale)` on top of this via Next's metadata
 * inheritance/merging.
 */
export async function createDefaultMetadata(locale: Locale): Promise<Metadata> {
  const siteSeo = await getSiteSeo();
  return {
    metadataBase: new URL(siteSeo.baseUrl),
    title: {
      default: siteSeo.defaultTitle[locale],
      template: siteSeo.titleTemplate,
    },
    description: siteSeo.defaultDescription[locale],
  };
}
