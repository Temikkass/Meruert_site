/**
 * app/about/page.tsx
 * ----------------------------------------------------------------------------
 * Reuses <Hero> (the same person-focused hero component the homepage
 * uses) and <AboutPreview> (the same biography block) with About-specific
 * copy from config/about.ts — the homepage's version of both is a teaser;
 * this page is the full telling. Every other section here is unique to
 * this page: Mission & Values, Timeline, Achievements, Certificates.
 */

import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { createMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { assertLocale } from "@/lib/locale";
import { aboutContent } from "@/config/about";
import { missionValues } from "@/config/mission-values";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = pageSeo["/about"];
  return seo ? createMetadata(seo, locale) : {};
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  return (
    <main>
      <Hero content={aboutContent.hero} locale={locale} />
      <AboutPreview content={aboutContent.biography} locale={locale} />
      <FeatureGridSection
        id="mission-values"
        items={missionValues}
        content={aboutContent.missionValues}
        background="card"
        locale={locale}
      />
      <TimelineSection content={aboutContent.timeline} locale={locale} />
      <AchievementsSection content={aboutContent.achievements} locale={locale} />
      <CertificatesSection content={aboutContent.certificates} locale={locale} />
      <GalleryPreviewSection content={aboutContent.gallery} locale={locale} />
      <CtaSection content={aboutContent.cta} locale={locale} />
    </main>
  );
}
