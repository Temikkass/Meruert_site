/**
 * app/financial-literacy/page.tsx
 * ----------------------------------------------------------------------------
 * `<main data-project="financial">` is set once, here — every accent-based
 * color in every section below (Button, Badge, IconBox, focus rings, the
 * gradient CTA) automatically resolves to the Financial project's
 * indigo-violet tint via the `[data-project]` utilities in globals.css.
 * No section component below branches on project color itself.
 */

import type { Metadata } from "next";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectAboutSection } from "@/components/sections/ProjectAboutSection";
import { OfferingsSection } from "@/components/sections/OfferingsSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
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
  getFinancialBenefits,
  getFinancialLearningFormats,
  getFinancialPageContent,
  getGallery,
  getProjects,
  getTestimonials,
} from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = await getPageSeo("/financial-literacy");
  return seo ? createMetadata(seo, locale) : {};
}

export default async function FinancialLiteracyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  const [projects, content, learningFormats, benefits, testimonials, gallery, faq] =
    await Promise.all([
      getProjects(),
      getFinancialPageContent(),
      getFinancialLearningFormats(),
      getFinancialBenefits(),
      getTestimonials(),
      getGallery(),
      getFaq(),
    ]);

  const financialProject = projects.financial;
  const organizationSchema = await buildOrganizationSchema(financialProject);

  return (
    <main data-project="financial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <ProjectHero project={financialProject} content={content.hero} locale={locale} />
      <ProjectAboutSection project={financialProject} content={content.about} locale={locale} />
      <OfferingsSection
        id="services"
        offerings={financialProject.offerings}
        content={content.services}
        locale={locale}
      />
      <FeatureGridSection
        id="learning-formats"
        items={learningFormats}
        content={content.learningFormats}
        background="card"
        locale={locale}
      />
      <FeatureGridSection
        id="benefits"
        items={benefits}
        content={content.benefits}
        locale={locale}
      />
      <TestimonialsSection
        id="success-stories"
        project="financial"
        reviews={testimonials}
        content={content.successStories}
        locale={locale}
      />
      <GalleryPreviewSection project="financial" gallery={gallery} content={content.gallery} locale={locale} />
      <FaqPreviewSection project="financial" faq={faq} content={content.faq} locale={locale} />
      <ProjectCtaSection project={financialProject} content={content.cta} locale={locale} />
    </main>
  );
}
