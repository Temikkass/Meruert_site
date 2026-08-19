/**
 * app/[locale]/about/page.tsx
 * ----------------------------------------------------------------------------
 * Reuses <Hero> (the same person-focused hero the homepage uses) and
 * <AboutPreview> (the same biography block) with About-specific copy — the
 * homepage's version of both is a teaser; this page is the full telling. Every
 * other section here is unique to this page: Mission & Values, Timeline,
 * Achievements, Certificates.
 *
 * Content comes from the CMS, fetched here and passed down as props. The
 * biography itself lives on the `person` global rather than this page's own
 * content, so the homepage teaser and this page cannot drift apart.
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
import { getPageSeo } from "@/lib/seo";
import { assertLocale } from "@/lib/locale";
import {
  getAboutContent,
  getAchievements,
  getCertificates,
  getGallery,
  getMissionValues,
  getPerson,
  getProjects,
  getTimeline,
} from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = await getPageSeo("/about");
  return seo ? createMetadata(seo, locale) : {};
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  const [content, person, missionValues, timeline, achievements, certificates, gallery, projects] =
    await Promise.all([
      getAboutContent(),
      getPerson(),
      getMissionValues(),
      getTimeline(),
      getAchievements(),
      getCertificates(),
      getGallery(),
      getProjects(),
    ]);

  return (
    <main>
      <Hero content={content.hero} person={person} locale={locale} />
      <AboutPreview content={content.biography} person={person} locale={locale} />
      <FeatureGridSection
        id="mission-values"
        items={missionValues}
        content={content.missionValues}
        background="card"
        locale={locale}
      />
      <TimelineSection content={content.timeline} timelineEntries={timeline} locale={locale} />
      <AchievementsSection
        content={content.achievements}
        achievements={achievements}
        locale={locale}
      />
      <CertificatesSection
        content={content.certificates}
        certificates={certificates}
        locale={locale}
      />
      <GalleryPreviewSection content={content.gallery} gallery={gallery} locale={locale} />
      <CtaSection
        content={content.cta}
        financialProject={projects.financial}
        travelProject={projects.travel}
        locale={locale}
      />
    </main>
  );
}
