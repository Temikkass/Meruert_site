import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactChannelsSection } from "@/components/sections/ContactChannelsSection";
import { createMetadata } from "@/lib/metadata";
import { getPageSeo } from "@/lib/seo";
import { assertLocale } from "@/lib/locale";
import { getContactPageContent, getPerson, getProjects } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const seo = await getPageSeo("/contact");
  return seo ? createMetadata(seo, locale) : {};
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);

  const [content, projects, person] = await Promise.all([
    getContactPageContent(),
    getProjects(),
    getPerson(),
  ]);

  return (
    <main>
      <PageHeader content={content.hero} locale={locale} />
      <ContactChannelsSection
        content={content}
        projects={[projects.financial, projects.travel]}
        person={person}
        locale={locale}
      />
    </main>
  );
}
