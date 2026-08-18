/**
 * navigation.ts (types)
 * ----------------------------------------------------------------------------
 */

import type { Link, ProjectId } from "./common";

export interface NavItem extends Link {
  /** Sub-items render as a dropdown/mega-menu; omit for a flat link */
  children?: NavItem[];
  /** Scopes this item to a project's own page nav vs. the global nav */
  project?: ProjectId | "shared";
}

export interface FooterColumn {
  title: import("./common").LocalizedText;
  links: Link[];
}

export interface SocialLink {
  platform: "instagram" | "telegram" | "whatsapp" | "youtube" | "linkedin" | "tiktok";
  url: string;
  project?: ProjectId | "shared";
}
