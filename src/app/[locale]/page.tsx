/**
 * app/page.tsx
 * ----------------------------------------------------------------------------
 * The homepage — a Server Component that only composes existing section
 * components in the order the brief specifies. No copy, no markup logic,
 * and no new components live here; every section reads its own slice of
 * `homeContent` (config/home.ts) and other config files directly.
 *
 * DYNAMIC IMPORTS: `TestimonialsSection` and `GalleryPreviewSection` are
 * the two heaviest client subtrees on the page (Embla's carousel engine
 * and, for the gallery, a Radix Dialog-based Lightbox on top of it) and
 * both sit well below the fold — `next/dynamic` code-splits them out of
 * the initial JS bundle. `ssr: true` (the default) is kept explicit here
 * because these sections still need to render as real HTML for SEO/no-JS
 * users; only the JS bundle is deferred, not the markup.
 */

import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { FaqPreviewSection } from "@/components/sections/FaqPreviewSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { createMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { assertLocale } from "@/lib/locale";
import { homeContent } from "@/config/home";

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

const GalleryPreviewSection = dynamic(
  () => import("@/components/sections/GalleryPreviewSection").then((mod) => mod.GalleryPreviewSection),
  { ssr: true }
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const homePageSeo = pageSeo["/"];
  return homePageSeo ? createMetadata(homePageSeo, locale) : {};
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  return (
    <main>
      <Hero content={homeContent.hero} locale={locale} />
      <AboutPreview content={homeContent.aboutPreview} locale={locale} />
      <ProjectsSection content={homeContent.projects} locale={locale} />
      <WhyChooseMe content={homeContent.whyChooseMe} locale={locale} />
      <StatisticsSection content={homeContent.statistics} locale={locale} />
      <TestimonialsSection content={homeContent.testimonials} locale={locale} />
      <GalleryPreviewSection content={homeContent.galleryPreview} locale={locale} />
      <FaqPreviewSection content={homeContent.faqPreview} locale={locale} />
      <CtaSection content={homeContent.cta} locale={locale} />
    </main>
  );
}
