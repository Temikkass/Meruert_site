/**
 * contact-page.ts (types)
 * ----------------------------------------------------------------------------
 * Named `contact-page` (not `contact`) specifically to avoid colliding with
 * types/contacts.ts, the per-project channel model (WhatsApp/Telegram/
 * Instagram/Email) that already exists — this file is the Contact PAGE's
 * own copy (headings, form labels, working hours), which is a completely
 * different concern from "what is the Financial project's WhatsApp number."
 */

import type { LocalizedText } from "./common";
import type { SectionCopy } from "./content";

export interface ContactFormCopy {
  nameLabel: LocalizedText;
  namePlaceholder: LocalizedText;
  emailLabel: LocalizedText;
  emailPlaceholder: LocalizedText;
  projectLabel: LocalizedText;
  messageLabel: LocalizedText;
  messagePlaceholder: LocalizedText;
  submitLabel: LocalizedText;
  submittingLabel: LocalizedText;
  successMessage: LocalizedText;
  errorMessage: LocalizedText;
  /** Validation messages — kept here (not hardcoded in the form component)
   * so a client can adjust the exact wording without touching form logic. */
  validation: {
    nameRequired: LocalizedText;
    emailInvalid: LocalizedText;
    messageRequired: LocalizedText;
    messageTooShort: LocalizedText;
  };
}

export interface ContactPageContent {
  hero: SectionCopy;
  channelsHeading: SectionCopy;
  locationLabel: LocalizedText;
  workingHoursLabel: LocalizedText;
  workingHours: LocalizedText;
  formSection: SectionCopy;
  form: ContactFormCopy;
}
