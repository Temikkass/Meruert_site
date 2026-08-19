import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { LegalContent } from "@/components/sections/LegalContent";
import { createMetadata } from "@/lib/metadata";
import { getPageSeo } from "@/lib/seo";
import { assertLocale } from "@/lib/locale";
import { getLegalContent } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = await getPageSeo("/privacy-policy");
  return seo ? createMetadata(seo, locale) : {};
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);
  const content = await getLegalContent();

  return (
    <main>
      <PageHeader content={{ heading: content.title }} locale={locale} />
      <LegalContent content={content} locale={locale} />
    </main>
  );
}
