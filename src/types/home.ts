/**
 * home.ts (types)
 * ----------------------------------------------------------------------------
 * Every section on the homepage reads its heading/subtitle/CTA copy from
 * `config/home.ts` rather than a component hardcoding it — this is the type
 * that config satisfies. `SectionCopy` and `ValueProposition` used to live
 * here too; both were relocated to types/content.ts once the About/Contact/
 * project pages needed the same shapes — this file now only holds what's
 * genuinely homepage-specific (the hero shape, and the full page bundle).
 */

import type { Link, LocalizedText } from "./common";
import type { SectionCopy } from "./content";

export interface HeroContent {
  eyebrow: LocalizedText;
  /** The large display headline — distinct from person.tagline, which is
   * the short line used in the nav/footer/metadata context instead. */
  headline: LocalizedText;
  intro: LocalizedText;
  primaryCta: Link;
  secondaryCta: Link;
  scrollIndicatorLabel: LocalizedText;
}

export interface HomeContent {
  hero: HeroContent;
  aboutPreview: SectionCopy;
  projects: SectionCopy & { cardCtaLabel: LocalizedText };
  whyChooseMe: SectionCopy;
  statistics: SectionCopy;
  testimonials: SectionCopy;
  galleryPreview: SectionCopy;
  faqPreview: SectionCopy;
  cta: SectionCopy;
}
