import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { LegalContent } from "@/components/sections/LegalContent";
import { createMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { privacyPolicyContent } from "@/config/legal";

export function generateMetadata(): Metadata {
  const seo = pageSeo["/privacy-policy"];
  return seo ? createMetadata(seo) : {};
}

export default function PrivacyPolicyPage() {
  const locale = "en" as const;

  return (
    <main>
      <PageHeader content={{ heading: privacyPolicyContent.title }} locale={locale} />
      <LegalContent content={privacyPolicyContent} locale={locale} />
    </main>
  );
}
