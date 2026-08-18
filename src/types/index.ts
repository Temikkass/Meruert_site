/**
 * types/index.ts
 * ----------------------------------------------------------------------------
 * Barrel export. Components import `import type { Project, FaqItem } from
 * "@/types"` instead of reaching into individual files — one import path to
 * remember, and file-level reorganization inside /types never breaks
 * consumers.
 */

export * from "./common";
export * from "./person";
export * from "./project";
export * from "./contacts";
export * from "./content";
export * from "./navigation";
export * from "./seo";
export * from "./theme";
export * from "./home";
export * from "./about";
export * from "./contact-page";
export * from "./legal";
export * from "./project-pages";
