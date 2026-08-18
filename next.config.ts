import type { NextConfig } from "next";

/**
 * next.config.ts
 * ----------------------------------------------------------------------------
 * Kept deliberately small. Every option here maps directly to a requirement
 * in the brief:
 *  - `images.formats`: serve AVIF first (smaller than WebP at equal quality),
 *    falling back to WebP — directly targets the "100 Performance" goal.
 *  - `reactStrictMode`: surfaces unsafe lifecycle/effect patterns in dev,
 *    before they become production bugs in a codebase other engineers will
 *    maintain.
 *  - `typedRoutes`: now ON. It was deliberately off during the design-
 *    system phase (zero pages existed yet, so every `<Link>` — even
 *    `href="/"` — would've needed a cast for no benefit). All six real
 *    pages exist now, so this is back on for real build-time protection
 *    against a typo'd `href="/financial-literacy-typo"`. Every
 *    config-driven or otherwise dynamic href in the codebase (NavLink,
 *    ProjectCard, ArticleCard, Footer, CtaSection, HeroCtaButtons) already
 *    casts with `as Route` — re-enabling this needed no further changes
 *    beyond those.
 *  - `experimental.optimizePackageImports`: Next's documented pattern for
 *    icon libraries like lucide-react — ensures each icon is bundled
 *    individually rather than the package's shared module graph pulling in
 *    more than what `components/ui/icon.tsx`'s iconMap actually imports.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
