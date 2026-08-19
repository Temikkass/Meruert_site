/**
 * lib/json-ld.ts
 * ----------------------------------------------------------------------------
 * Structured data is infrastructure, not a visual component — it renders as
 * an invisible <script type="application/ld+json"> tag, so it lives in
 * /lib next to the other metadata helpers rather than in /components. Two
 * builders: one Person schema (rendered once, root layout) and one
 * Organization schema per project (rendered on each project's own page in
 * the next build phase).
 */

import type { OrganizationSchema, PersonSchema, Project } from "@/types";
import { getPerson, getSocialLinks } from "@/lib/content";
import { getSiteSeo } from "@/lib/seo";

export async function buildPersonSchema(): Promise<PersonSchema & { "@context": string; "@type": string }> {
  const [person, siteSeo, socialLinks] = await Promise.all([
    getPerson(),
    getSiteSeo(),
    getSocialLinks(),
  ]);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    jobTitle: [person.tagline.en],
    url: siteSeo.baseUrl,
    image: `${siteSeo.baseUrl}${person.photo.src}`,
    // Instagram/Telegram profile URLs across both projects — search engines
    // use `sameAs` to connect this Person entity to its social profiles.
    // WhatsApp is deliberately excluded: it's a click-to-chat deep link,
    // not a profile page, so it doesn't fit `sameAs`'s intended use.
    // Deduplicated since Instagram/Telegram happen to be identical across
    // both projects in the current placeholder config.
    sameAs: Array.from(
      new Set(
        socialLinks
          .filter((link) => link.platform === "instagram" || link.platform === "telegram")
          .map((link) => link.url)
      )
    ),
  };
}

export async function buildOrganizationSchema(
  project: Project
): Promise<OrganizationSchema & { "@context": string; "@type": string }> {
  const siteSeo = await getSiteSeo();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: project.name.en,
    url: `${siteSeo.baseUrl}/${project.slug}`,
    logo: project.logo ? `${siteSeo.baseUrl}${project.logo.src}` : "",
    description: project.tagline.en,
  };
}

/** Serializes a schema object for use inside a <script> tag, safely
 * escaping `</script>` sequences that could otherwise break out of the tag. */
export function serializeJsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
