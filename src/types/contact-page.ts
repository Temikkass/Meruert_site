/**
 * contact-page.ts (types)
 * ----------------------------------------------------------------------------
 * Named `contact-page` (not `contact`) specifically to avoid colliding with
 * types/contacts.ts, the per-project channel model (WhatsApp/Telegram/
 * Instagram/Email) that already exists — this file is the Contact PAGE's
 * own copy (headings, form labels, working hours), which is a completely
 * different concern from "what is the Financial project's WhatsApp number."
 *
 * This used to also carry `ContactFormCopy` — labels, placeholders and
 * validation messages for a contact form that never sent anything. The form
 * is gone (see the Contact page); direct messaging channels are the whole
 * contact story now, which is how this audience actually gets in touch.
 */

import type { LocalizedText } from "./common";
import type { SectionCopy } from "./content";

export interface ContactPageContent {
  hero: SectionCopy;
  channelsHeading: SectionCopy;
  locationLabel: LocalizedText;
  workingHoursLabel: LocalizedText;
  workingHours: LocalizedText;
  /** Label on each project card's primary WhatsApp action. */
  primaryActionLabel: LocalizedText;
}
