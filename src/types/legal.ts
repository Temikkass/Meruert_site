/**
 * legal.ts (types)
 * ----------------------------------------------------------------------------
 * A generic, reusable shape for a legal/policy page — built for Privacy
 * Policy but not named after it specifically, so the same
 * `LegalPageContent` + `<LegalContent>` component pair could render Terms
 * of Service or a Cookie Policy later from a second config object, per the
 * brief's "clean, reusable template page" instruction.
 */

import type { LocalizedText } from "./common";

export interface LegalSection {
  id: string;
  heading: LocalizedText;
  /** Each paragraph is its own array entry, same convention as
   * person.biography — renders as separate <p> blocks. */
  body: LocalizedText[];
}

export interface LegalPageContent {
  title: LocalizedText;
  lastUpdatedLabel: LocalizedText;
  lastUpdated: string; // ISO date — formatted at render time via toLocaleDateString
  intro: LocalizedText;
  sections: LegalSection[];
}
