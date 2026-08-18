/**
 * content.ts (types)
 * ----------------------------------------------------------------------------
 * Smaller, self-contained content shapes: gallery, FAQ, testimonials,
 * statistics, articles. Grouped in one file (rather than five one-line
 * files) because none of these is large enough to justify its own module,
 * and they're conceptually "site content blocks" — but each is still
 * exported as its own named interface, so importing components stay
 * specific (`import type { FaqItem } from "@/types/content"`) rather than
 * reaching into a catch-all `Content` blob type.
 */

import type { IconKey, ImageAsset, LocalizedText, ProjectId } from "./common";

export interface GalleryImage {
  id: string;
  image: ImageAsset;
  caption?: LocalizedText;
  /** Which project this image belongs to, or "shared" for homepage-level gallery */
  project?: ProjectId | "shared";
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  project?: ProjectId | "shared";
}

export interface Testimonial {
  id: string;
  authorName: string;
  /** e.g. "Client, Financial Coaching Cohort 3" */
  authorRole?: LocalizedText;
  quote: LocalizedText;
  avatar?: ImageAsset;
  project?: ProjectId | "shared";
  rating?: number;
}

export interface Statistic {
  id: string;
  /** The number as data, not a formatted string — formatting (e.g. "+", "%")
   * happens at render time via a `suffix`/`prefix`, so the raw value stays
   * usable for animated count-up components. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: LocalizedText;
  project?: ProjectId | "shared";
}

export interface Article {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  slug: string;
  cover: ImageAsset;
  publishedAt: string; // ISO date
  project?: ProjectId | "shared";
  /** External URL if the article lives on Medium/Telegraph/etc. instead of on-site */
  externalUrl?: string;
}

/**
 * A single icon+title+description entry — originally modeled for the
 * homepage's "Why Choose Me" section (config/why-choose-me.ts), reused
 * as-is for the About page's "Mission & Values" (config/mission-values.ts)
 * since both are the same shape. Relocated here from types/home.ts so
 * either page can import it without one page's types depending on the
 * other's.
 */
export interface ValueProposition {
  id: string;
  icon: IconKey;
  title: LocalizedText;
  description: LocalizedText;
}

/** One entry in a <Timeline> (components/shared/timeline/Timeline.tsx) —
 * `date` is left as a plain string (not LocalizedText) since a year or
 * date label is language-invariant; title/description are localized. */
export interface TimelineEntry {
  id: string;
  date: string;
  title: LocalizedText;
  description?: LocalizedText;
}

/** A placeholder-friendly certificate/credential entry for the About
 * page's "Certificates" section. */
export interface Certificate {
  id: string;
  title: LocalizedText;
  issuer?: LocalizedText;
  image: ImageAsset;
}

/** The eyebrow + heading + subtitle shape most sections share — mirrors
 * the props of components/shared/content/SectionHeading. Used by every
 * page's section copy (config/home.ts, config/about.ts, config/financial.ts,
 * ...), not just the homepage. */
export interface SectionCopy {
  eyebrow?: LocalizedText;
  heading: LocalizedText;
  subtitle?: LocalizedText;
}
