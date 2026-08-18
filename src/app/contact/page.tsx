import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactChannelsSection } from "@/components/sections/ContactChannelsSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { createMetadata } from "@/lib/metadata";
import { pageSeo } from "@/config/seo";
import { contactPageContent } from "@/config/contact-page";

export function generateMetadata(): Metadata {
  const seo = pageSeo["/contact"];
  return seo ? createMetadata(seo) : {};
}

export default function ContactPage() {
  const locale = "en" as const;

  return (
    <main>
      <PageHeader content={contactPageContent.hero} locale={locale} />
      <ContactChannelsSection content={contactPageContent} locale={locale} />
      <ContactFormSection content={contactPageContent} locale={locale} />
    </main>
  );
}
