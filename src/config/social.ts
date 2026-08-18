/**
 * config/social.ts
 * ----------------------------------------------------------------------------
 * WHY THIS FILE IS DERIVED, NOT HAND-AUTHORED
 * The brief lists social.ts as its own config file, but the actual
 * Instagram/Telegram/WhatsApp values already live in config/contacts.ts
 * (see that file's header comment for why). If social.ts duplicated those
 * values as a second hand-written list, the two files would inevitably
 * drift — someone updates a WhatsApp number in contacts.ts and forgets the
 * copy in social.ts, and now the footer icon links somewhere stale.
 *
 * So this file exports a small pure function that BUILDS the icon-row
 * `SocialLink[]` list FROM contacts.ts. contacts.ts stays the only place a
 * client edits a handle or number; this file only decides how those
 * channels are presented as a flat list of platform links.
 */

import type { ContactChannels, ProjectId, SocialLink } from "@/types";
import { financialContacts, travelContacts } from "./contacts";

function channelsToSocialLinks(
  channels: ContactChannels,
  project: ProjectId
): SocialLink[] {
  const links: SocialLink[] = [];

  if (channels.instagram) {
    links.push({ platform: "instagram", url: channels.instagram.url, project });
  }
  if (channels.telegram) {
    links.push({
      platform: "telegram",
      url: channels.telegram.url ?? `https://t.me/${channels.telegram.username}`,
      project,
    });
  }
  if (channels.whatsapp) {
    // Actual pre-filled message is built by lib/phone.ts#createWhatsappLink()
    // at the point of use — this list only needs the platform + project tag
    // to render an icon, so a bare wa.me link is a safe fallback here.
    links.push({
      platform: "whatsapp",
      url: `https://wa.me/${channels.whatsapp.phone}`,
      project,
    });
  }

  return links;
}

export const socialLinks: SocialLink[] = [
  ...channelsToSocialLinks(financialContacts, "financial"),
  ...channelsToSocialLinks(travelContacts, "travel"),
];
