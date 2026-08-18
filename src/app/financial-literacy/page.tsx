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
import { pageSeo } from "@/config/seo";
import { financialProject, financialLearningFormats, financialBenefits } from "@/config/financial";
import { financialPageContent } from "@/config/financial-page";

export function generateMetadata(): Metadata {
  const seo = pageSeo[`/${financialProject.slug}`];
  return seo ? createMetadata(seo) : {};
}

export default function FinancialLiteracyPage() {
  const locale = "en" as const;
  const organizationSchema = buildOrganizationSchema(financialProject);

  return (
    <main data-project="financial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <ProjectHero project={financialProject} content={financialPageContent.hero} locale={locale} />
      <ProjectAboutSection project={financialProject} content={financialPageContent.about} locale={locale} />
      <OfferingsSection
        id="services"
        offerings={financialProject.offerings}
        content={financialPageContent.services}
        locale={locale}
      />
      <FeatureGridSection
        id="learning-formats"
        items={financialLearningFormats}
        content={financialPageContent.learningFormats}
        background="card"
        locale={locale}
      />
      <FeatureGridSection
        id="benefits"
        items={financialBenefits}
        content={financialPageContent.benefits}
        locale={locale}
      />
      <TestimonialsSection
        id="success-stories"
        project="financial"
        content={financialPageContent.successStories}
        locale={locale}
      />
      <GalleryPreviewSection project="financial" content={financialPageContent.gallery} locale={locale} />
      <FaqPreviewSection project="financial" content={financialPageContent.faq} locale={locale} />
      <ProjectCtaSection project={financialProject} content={financialPageContent.cta} locale={locale} />
    </main>
  );
}
