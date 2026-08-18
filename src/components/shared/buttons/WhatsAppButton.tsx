/**
 * components/shared/buttons/WhatsAppButton.tsx
 * ----------------------------------------------------------------------------
 * Unlike the other social channels, WhatsApp always needs a pre-filled,
 * localized message baked into its link (see lib/phone.ts#createWhatsappLink)
 * — this wrapper takes the typed `WhatsAppChannel` straight from a
 * project's `contacts` config and builds that link internally, so call
 * sites never construct a wa.me URL by hand.
 */

import { SocialButton } from "./SocialButton";
import { createWhatsappLink } from "@/lib/phone";
import type { Locale, WhatsAppChannel } from "@/types";

export interface WhatsAppButtonProps {
  channel: WhatsAppChannel;
  locale?: Locale;
  className?: string;
}

export function WhatsAppButton({ channel, locale = "en", className }: WhatsAppButtonProps) {
  return <SocialButton platform="whatsapp" href={createWhatsappLink(channel, locale)} className={className} />;
}
