import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactChannelsSection } from "@/components/sections/ContactChannelsSection";
import { createMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { assertLocale } from "@/lib/locale";
import { contactPageContent } from "@/config/contact-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = pageSeo["/contact"];
  return seo ? createMetadata(seo, locale) : {};
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  return (
    <main>
      <PageHeader content={contactPageContent.hero} locale={locale} />
      <ContactChannelsSection content={contactPageContent} locale={locale} />
    </main>
  );
}
