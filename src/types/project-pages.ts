/**
 * project-pages.ts (types)
 * ----------------------------------------------------------------------------
 * Financial Literacy and Tours/Courses share the underlying `Project` type
 * (types/project.ts) for their core data, but their PAGE section lists
 * genuinely differ per the brief — Financial has a "Learning Formats" +
 * "Benefits" breakdown with no travel equivalent; Travel breaks its
 * offerings into three detailed sections (Tours/Language Courses/Camps)
 * instead of one. Forcing both into one shared type would mean padding
 * one page's config with sections the other doesn't use — two small,
 * honest types instead.
 */

import type { SectionCopy } from "./content";

export interface FinancialPageContent {
  hero: SectionCopy & { intro: import("./common").LocalizedText };
  about: SectionCopy;
  services: SectionCopy;
  learningFormats: SectionCopy;
  benefits: SectionCopy;
  successStories: SectionCopy;
  gallery: SectionCopy;
  faq: SectionCopy;
  cta: SectionCopy;
}

export interface TravelPageContent {
  hero: SectionCopy & { intro: import("./common").LocalizedText };
  about: SectionCopy;
  programs: SectionCopy;
  tours: SectionCopy;
  languageCourses: SectionCopy;
  camps: SectionCopy;
  gallery: SectionCopy;
  reviews: SectionCopy;
  faq: SectionCopy;
  cta: SectionCopy;
}
