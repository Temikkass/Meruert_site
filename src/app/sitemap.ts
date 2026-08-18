import type { MetadataRoute } from "next";
import { pageSeo, siteSeo } from "@/config/seo";

/**
 * app/sitemap.ts
 * ----------------------------------------------------------------------------
 * Generated FROM `pageSeo` (config/seo.ts) rather than hand-listing routes a
 * second time — every entry added to `pageSeo` for a new page automatically
 * appears in the sitemap. This is exactly the kind of "everything else
 * should automatically update" behavior the brief asks for around content
 * management.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageSeo).map((page) => ({
    url: `${siteSeo.baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1 : 0.8,
  }));
}
