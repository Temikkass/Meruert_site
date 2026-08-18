/**
 * app/tours-and-courses/page.tsx
 * ----------------------------------------------------------------------------
 * `<main data-project="travel">` scopes every accent color below to the
 * warm plum-mauve tint, same mechanism as the Financial page (see that
 * page's header comment). "Programs" is the offerings overview
 * (<OfferingsSection>, shared with Financial's "Services"); Tours/Language
 * Courses/Camps are the same three offerings shown again in more detail,
 * one <ProjectOfferingDetail> call each with alternating image side.
 */

import type { Metadata } from "next";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectAboutSection } from "@/components/sections/ProjectAboutSection";
import { OfferingsSection } from "@/components/sections/OfferingsSection";
import { ProjectOfferingDetail } from "@/components/sections/ProjectOfferingDetail";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { FaqPreviewSection } from "@/components/sections/FaqPreviewSection";
import { ProjectCtaSection } from "@/components/sections/ProjectCtaSection";
import { createMetadata } from "@/lib/metadata";
import { buildOrganizationSchema, serializeJsonLd } from "@/lib/json-ld";
import { pageSeo } from "@/config/seo";
import { travelProject } from "@/config/travel";
import { travelPageContent } from "@/config/travel-page";

export function generateMetadata(): Metadata {
  const seo = pageSeo[`/${travelProject.slug}`];
  return seo ? createMetadata(seo) : {};
}

export default function TravelPage() {
  const locale = "en" as const;
  const [toursOffering, languageOffering, campsOffering] = travelProject.offerings;
  const organizationSchema = buildOrganizationSchema(travelProject);

  return (
    <main data-project="travel">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <ProjectHero project={travelProject} content={travelPageContent.hero} locale={locale} />
      <ProjectAboutSection project={travelProject} content={travelPageContent.about} locale={locale} />
      <OfferingsSection
        id="programs"
        offerings={travelProject.offerings}
        content={travelPageContent.programs}
        locale={locale}
      />
      {toursOffering && (
        <ProjectOfferingDetail offering={toursOffering} content={travelPageContent.tours} locale={locale} />
      )}
      {languageOffering && (
        <ProjectOfferingDetail
          offering={languageOffering}
          content={travelPageContent.languageCourses}
          reverse
          locale={locale}
        />
      )}
      {campsOffering && (
        <ProjectOfferingDetail offering={campsOffering} content={travelPageContent.camps} locale={locale} />
      )}
      <GalleryPreviewSection project="travel" content={travelPageContent.gallery} locale={locale} />
      <TestimonialsSection id="reviews" project="travel" content={travelPageContent.reviews} locale={locale} />
      <FaqPreviewSection project="travel" content={travelPageContent.faq} locale={locale} />
      <ProjectCtaSection project={travelProject} content={travelPageContent.cta} locale={locale} />
    </main>
  );
}
