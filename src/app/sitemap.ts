import type { MetadataRoute } from "next";
import { getAllPageSeo, resolveBaseUrl } from "@/lib/seo";
import { defaultLocale, htmlLang, locales } from "@/lib/locale";
import { localizedPath } from "@/lib/routes";

/**
 * app/sitemap.ts
 * ----------------------------------------------------------------------------
 * Generated FROM `pageSeo` (config/seo.ts) rather than hand-listing routes a
 * second time — every entry added to `pageSeo` for a new page automatically
 * appears in the sitemap, in every locale.
 *
 * Each URL carries an `alternates.languages` map, which is the sitemap-level
 * equivalent of the hreflang tags lib/metadata.ts emits in <head>. Declaring
 * the relationship in both places is what tells a crawler that /ru/about and
 * /en/about are one page in two languages rather than duplicate content.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = resolveBaseUrl();
  const pages = Object.values(await getAllPageSeo());

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(page.path, locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((alt) => [htmlLang[alt], `${baseUrl}${localizedPath(page.path, alt)}`])
          ),
          "x-default": `${baseUrl}${localizedPath(page.path, defaultLocale)}`,
        },
      },
    }))
  );
}
