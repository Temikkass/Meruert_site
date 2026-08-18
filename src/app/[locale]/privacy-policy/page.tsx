import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { LegalContent } from "@/components/sections/LegalContent";
import { createMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { assertLocale } from "@/lib/locale";
import { privacyPolicyContent } from "@/config/legal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = pageSeo["/privacy-policy"];
  return seo ? createMetadata(seo, locale) : {};
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  return (
    <main>
      <PageHeader content={{ heading: privacyPolicyContent.title }} locale={locale} />
      <LegalContent content={privacyPolicyContent} locale={locale} />
    </main>
  );
}
