/**
 * about.ts (types)
 * ----------------------------------------------------------------------------
 * Mirrors the pattern in types/home.ts — one typed bundle
 * (config/about.ts#aboutContent) that every About-page section reads its
 * copy from. Biography content itself still comes from config/person.ts
 * (no duplication); this only covers the About page's OWN section framing
 * (headings/subtitles) that person.ts has no reason to know about.
 */

import type { HeroContent } from "./home";
import type { SectionCopy } from "./content";

export interface AboutContent {
  hero: HeroContent;
  biography: SectionCopy;
  missionValues: SectionCopy;
  timeline: SectionCopy;
  achievements: SectionCopy;
  certificates: SectionCopy;
  gallery: SectionCopy;
  cta: SectionCopy;
}
