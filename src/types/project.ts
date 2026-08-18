/**
 * project.ts (types)
 * ----------------------------------------------------------------------------
 * The Financial Literacy project and the Tours/Courses/Camps project are
 * structurally identical from the site's point of view: each has its own
 * name, story, offerings, contact channels and accent color. Rather than
 * writing two near-duplicate interfaces (FinancialProject / TravelProject),
 * we model ONE `Project` interface and let /config/financial.ts and
 * /config/travel.ts each satisfy it.
 *
 * WHY THIS MATTERS FOR SCALE
 * A shared interface means shared components: <ProjectHero project={...} />,
 * <ProjectContactBar project={...} /> etc. can render either project without
 * knowing which one they got. If the owner adds a third project next year,
 * it's a new config file — zero new components, zero new types.
 */

import type { ImageAsset, LocalizedText, ProjectId } from "./common";
import type { ContactChannels } from "./contacts";

export interface ProjectOffering {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon?: string;
  image?: ImageAsset;
}

export interface ProjectAccent {
  /** CSS color value, e.g. "oklch(52% 0.18 293)" — see /config/theme.ts */
  primary: string;
  /** Lighter tint used for gradients/backgrounds behind this project's sections */
  tint: string;
}

export interface Project {
  id: ProjectId;
  name: LocalizedText;
  /** One-line positioning statement shown in the project preview card on the homepage */
  tagline: LocalizedText;
  /** Longer narrative for the project's own page */
  description: LocalizedText[];
  heroImage: ImageAsset;
  logo?: ImageAsset;
  offerings: ProjectOffering[];
  accent: ProjectAccent;
  contacts: ContactChannels;
  /** Route segment, e.g. "financial-literacy" -> /financial-literacy */
  slug: string;
}
