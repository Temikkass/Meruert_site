/**
 * app/[locale]/page.tsx
 * ----------------------------------------------------------------------------
 * The homepage — a Server Component that fetches content and composes existing
 * section components in the order the brief specifies. No copy, no markup
 * logic and no new components live here.
 *
 * Content now comes from the CMS (lib/content) rather than config files, but
 * the shapes are identical, so the sections below are unchanged from when this
 * read `homeContent` directly. Everything is fetched here, on the server, and
 * passed down as props — the sections themselves know nothing about Payload,
 * which keeps them reusable with any backend.
 *
 * `Promise.all` because these queries are independent; awaiting them in
 * sequence would make the page as slow as the sum of its content rather than
 * its slowest part.
 *
 * DYNAMIC IMPORTS: `TestimonialsSection` and `GalleryPreviewSection` are the
 * two heaviest client subtrees on the page (Embla's carousel engine and, for
 * the gallery, a Radix Dialog-based Lightbox on top of it) and both sit well
 * below the fold — `next/dynamic` code-splits them out of the initial JS
 * bundle. They still render as real HTML for SEO/no-JS users; only the JS is
 * deferred.
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
import { getPageSeo } from "@/lib/seo";
import { assertLocale } from "@/lib/locale";
import {
  getFaq,
  getGallery,
  getHomeContent,
  getPerson,
  getProjects,
  getStatistics,
  getTestimonials,
  getWhyChooseMe,
} from "@/lib/content";

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

const GalleryPreviewSection = dynamic(
  () => import("@/components/sections/GalleryPreviewSection").then((mod) => mod.GalleryPreviewSection),
  { ssr: true }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = await getPageSeo("/");
  return seo ? createMetadata(seo, locale) : {};
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  const [content, person, projects, whyChooseMe, statistics, testimonials, gallery, faq] =
    await Promise.all([
      getHomeContent(),
      getPerson(),
      getProjects(),
      getWhyChooseMe(),
      getStatistics(),
      getTestimonials(),
      getGallery(),
      getFaq(),
    ]);

  return (
    <main>
      <Hero content={content.hero} person={person} locale={locale} />
      <AboutPreview content={content.aboutPreview} person={person} locale={locale} />
      <ProjectsSection
        content={content.projects}
        projects={[projects.financial, projects.travel]}
        locale={locale}
      />
      <WhyChooseMe content={content.whyChooseMe} items={whyChooseMe} locale={locale} />
      <StatisticsSection content={content.statistics} statistics={statistics} locale={locale} />
      <TestimonialsSection content={content.testimonials} reviews={testimonials} locale={locale} />
      <GalleryPreviewSection content={content.galleryPreview} gallery={gallery} locale={locale} />
      <FaqPreviewSection content={content.faqPreview} faq={faq} locale={locale} />
      <CtaSection
        content={content.cta}
        financialProject={projects.financial}
        travelProject={projects.travel}
        locale={locale}
      />
    </main>
  );
}
