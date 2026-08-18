/**
 * lib/metadata.ts
 * ----------------------------------------------------------------------------
 * The only function in the codebase that knows how to translate our small,
 * config-authoring-friendly `PageSeo`/`SiteSeo` types (see /types/seo.ts)
 * into Next's much larger `Metadata` type. Every page's `generateMetadata`
 * (added when pages are built in the next phase) will call
 * `createMetadata(pageSeo["/some-path"])` instead of hand-assembling a
 * Metadata object — so Open Graph/Twitter defaults, canonical URLs and
 * fallbacks are applied consistently everywhere, once.
 */

import type { Metadata } from "next";
import type { PageSeo } from "@/types";
import { siteSeo } from "@/config/seo";

export function createMetadata(page: PageSeo): Metadata {
  const url = `${siteSeo.baseUrl}${page.path}`;
  const ogImage = page.ogImage ?? siteSeo.defaultOgImage;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: siteSeo.siteName,
      locale: siteSeo.locale,
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
      title: page.title,
      description: page.description,
      images: [ogImage.src],
      creator: siteSeo.twitterHandle,
    },
  };
}

/**
 * Root-level default metadata, consumed once by app/layout.tsx via
 * Next's `metadataBase` + spread defaults. Individual pages layer their own
 * `createMetadata(pageSeo[...])` on top of this via Next's metadata
 * inheritance/merging.
 */
export function createDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteSeo.baseUrl),
    title: {
      default: siteSeo.defaultTitle,
      template: siteSeo.titleTemplate,
    },
    description: siteSeo.defaultDescription,
  };
}
