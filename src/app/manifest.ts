import type { MetadataRoute } from "next";
import { siteSeo } from "@/config/seo";
import { person } from "@/config/person";
import { defaultLocale, htmlLang } from "@/lib/locale";

/**
 * app/manifest.ts
 * ----------------------------------------------------------------------------
 * Generates /manifest.webmanifest from the same config the rest of the site
 * reads, so "add to home screen" on mobile shows the client's real name and
 * brand color the moment config/person.ts and config/seo.ts are filled in —
 * no second place to update.
 *
 * `theme_color`/`background_color` mirror app/layout.tsx's `viewport.themeColor`
 * light value (the accent and canvas tokens). They are literal hex rather
 * than oklch() because manifest consumers are OS-level UI, not the browser's
 * CSS engine, and support for oklch here is not universal.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSeo.siteName,
    short_name: person.fullName.split(" ")[0] ?? siteSeo.siteName,
    description: siteSeo.defaultDescription,
    lang: htmlLang[defaultLocale],
    start_url: "/",
    display: "standalone",
    background_color: "#fafafd",
    theme_color: "#6d52bc",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
