/**
 * contacts.ts (types)
 * ----------------------------------------------------------------------------
 * Every contact channel is modeled per-project, never globally, because the
 * brief is explicit: "Every project has different contacts. Different
 * WhatsApp messages. Different Instagram. Different Telegram." Baking that
 * into the type (rather than trusting config authors to remember it) means
 * a shared "SiteContacts" object structurally cannot exist — there is no
 * type that would let a component accidentally read one WhatsApp number for
 * both projects.
 */

import type { LocalizedText } from "./common";

export interface WhatsAppChannel {
  /** E.164 phone number, digits only, e.g. "77011234567" */
  phone: string;
  /** Pre-filled message text, localized — passed through createWhatsappLink() */
  prefilledMessage: LocalizedText;
}

export interface TelegramChannel {
  /** Username without @, e.g. "financeWithAmina" */
  username: string;
  /** Optional: a specific bot or channel link if different from the DM link */
  url?: string;
}

export interface InstagramChannel {
  username: string;
  url: string;
}

export interface EmailChannel {
  address: string;
  /** Optional prefilled subject line */
  subject?: string;
}

/**
 * The full bundle of contact channels for ONE project. `Toggleable`-style
 * optionality (each channel is optional) lets a project go live with only
 * WhatsApp + Instagram and add Telegram later without a type change.
 */
export interface ContactChannels {
  whatsapp?: WhatsAppChannel;
  telegram?: TelegramChannel;
  instagram?: InstagramChannel;
  email?: EmailChannel;
}
