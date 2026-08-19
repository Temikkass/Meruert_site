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
import { getPageSeo } from "@/lib/seo";
import { assertLocale } from "@/lib/locale";
import {
  getFaq,
  getGallery,
  getProjects,
  getTestimonials,
  getTravelPageContent,
} from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = await getPageSeo("/tours-and-courses");
  return seo ? createMetadata(seo, locale) : {};
}

export default async function TravelPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  const [projects, content, testimonials, gallery, faq] = await Promise.all([
    getProjects(),
    getTravelPageContent(),
    getTestimonials(),
    getGallery(),
    getFaq(),
  ]);

  const travelProject = projects.travel;
  const [toursOffering, languageOffering, campsOffering] = travelProject.offerings;
  const organizationSchema = await buildOrganizationSchema(travelProject);

  return (
    <main data-project="travel">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <ProjectHero project={travelProject} content={content.hero} locale={locale} />
      <ProjectAboutSection project={travelProject} content={content.about} locale={locale} />
      <OfferingsSection
        id="programs"
        offerings={travelProject.offerings}
        content={content.programs}
        locale={locale}
      />
      {toursOffering && (
        <ProjectOfferingDetail offering={toursOffering} content={content.tours} locale={locale} />
      )}
      {languageOffering && (
        <ProjectOfferingDetail
          offering={languageOffering}
          content={content.languageCourses}
          reverse
          locale={locale}
        />
      )}
      {campsOffering && (
        <ProjectOfferingDetail offering={campsOffering} content={content.camps} locale={locale} />
      )}
      <GalleryPreviewSection project="travel" gallery={gallery} content={content.gallery} locale={locale} />
      <TestimonialsSection id="reviews" project="travel" reviews={testimonials} content={content.reviews} locale={locale} />
      <FaqPreviewSection project="travel" faq={faq} content={content.faq} locale={locale} />
      <ProjectCtaSection project={travelProject} content={content.cta} locale={locale} />
    </main>
  );
}
