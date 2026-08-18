import type { MetadataRoute } from "next";
import { siteSeo } from "@/config/seo";

/**
 * app/robots.ts
 * ----------------------------------------------------------------------------
 * Next's file-convention Metadata API route — generates /robots.txt at
 * build time from config, so there is no static robots.txt to forget to
 * update when the domain changes (see config/seo.ts#baseUrl).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteSeo.baseUrl}/sitemap.xml`,
  };
}
