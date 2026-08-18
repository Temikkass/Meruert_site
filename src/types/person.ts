/**
 * person.ts (types)
 * ----------------------------------------------------------------------------
 * Shape of the site owner's identity — the "who" the homepage introduces
 * before either project is presented.
 */

import type { ImageAsset, LocalizedText } from "./common";

export interface Credential {
  label: LocalizedText;
  /** e.g. "2019", "since 2016" — kept as free text, not a Date, since these
   * are display credentials, not data the site computes with. */
  year?: string;
}

export interface Person {
  fullName: string;
  /** Short line under the name, e.g. "Financial Educator & Travel Author" */
  tagline: LocalizedText;
  /** The 2-4 paragraph biography rendered on the homepage intro */
  biography: LocalizedText[];
  photo: ImageAsset;
  /** Alternate portrait for dark backgrounds/sections, if art-directed differently */
  photoAlt?: ImageAsset;
  credentials: Credential[];
  location: LocalizedText;
}
