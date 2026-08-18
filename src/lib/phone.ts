/**
 * lib/phone.ts
 * ----------------------------------------------------------------------------
 * Both `formatPhone` and `createWhatsappLink` take a `WhatsAppChannel`
 * object (not raw strings) so the ONLY place a WhatsApp link gets built
 * from is a typed contact record already validated against the config
 * schema — a component can never accidentally build a link from a stray
 * hardcoded number.
 */

import type { Locale, WhatsAppChannel } from "@/types";

/**
 * Formats an E.164 digit string for display, e.g. "77011234567" ->
 * "+7 701 123 45 67". Falls back to the raw digits with a leading "+" if
 * the length doesn't match the expected KZ/RU-style grouping, so it never
 * throws on an unexpected format — a client typo shows an ugly-but-correct
 * number instead of a broken page.
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const match = digits.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return `+${digits}`;
  const [, country, area, first, second, third] = match;
  return `+${country} ${area} ${first} ${second} ${third}`;
}

/**
 * Builds a wa.me deep link with the channel's pre-filled message for the
 * given locale, falling back to English if the requested locale is
 * somehow missing (defensive — LocalizedText's type already requires every
 * locale, this only guards against a malformed config object at runtime).
 */
export function createWhatsappLink(
  channel: WhatsAppChannel,
  locale: Locale = "en"
): string {
  const digits = channel.phone.replace(/\D/g, "");
  const message = channel.prefilledMessage[locale] ?? channel.prefilledMessage.en;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
