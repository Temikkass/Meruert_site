/**
 * seo.ts (types)
 * ----------------------------------------------------------------------------
 * Typed shape for everything `lib/metadata.ts#createMetadata()` needs to
 * build a Next.js `Metadata` object, Open Graph tags, Twitter Card tags, and
 * JSON-LD. Kept separate from Next's own `Metadata` type because this is a
 * narrower, config-authoring-friendly shape — `createMetadata()` is the only
 * place that has to know how to translate it into Next's (much larger,
 * partially-optional) `Metadata` shape.
 */

import type { ImageAsset, ProjectId } from "./common";

export interface PageSeo {
  title: string;
  description: string;
  /** Defaults to the page's own OG image if omitted */
  ogImage?: ImageAsset;
  path: string; // e.g. "/financial-literacy"
  project?: ProjectId | "shared";
}

export interface SiteSeo {
  siteName: string;
  baseUrl: string;
  defaultTitle: string;
  titleTemplate: string; // e.g. "%s — Firstname Lastname"
  defaultDescription: string;
  defaultOgImage: ImageAsset;
  twitterHandle?: string;
  locale: string; // e.g. "en_US"
}

/** Minimal, purpose-built shape for schema.org Person JSON-LD */
export interface PersonSchema {
  name: string;
  jobTitle: string[];
  url: string;
  image: string;
  sameAs: string[]; // social profile URLs
}

/** Minimal shape for schema.org Organization JSON-LD, one per project */
export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
}
