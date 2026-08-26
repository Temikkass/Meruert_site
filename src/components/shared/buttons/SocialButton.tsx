"use client";

/**
 * components/shared/buttons/SocialButton.tsx
 * ----------------------------------------------------------------------------
 * One component for every social channel type, rather than five near-
 * identical ones (InstagramButton, TelegramButton, ...) — the brief lists
 * them separately, but they differ only in icon + href + accessible label,
 * which is exactly what a `platform` prop is for. Built on the shared
 * `Button` (variant="social"), so it automatically gets the same hover/
 * press/focus states as every other button in the system.
 *
 * WhatsApp specifically expects a fully-built deep link (with the
 * pre-filled message) rather than deriving one internally, so callers pass
 * `href={createWhatsappLink(channel, locale)}` (lib/phone.ts) — this
 * component doesn't know about locale or message text, only how to render
 * a link once it has one. `label` follows the same rule: the caller knows
 * the locale and the surrounding context, this component does not.
 */

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/animations/Magnetic";
import type { IconKey } from "@/types";

export type SocialPlatform = "instagram" | "telegram" | "whatsapp" | "email" | "phone";

const platformIcon: Record<SocialPlatform, IconKey> = {
  instagram: "instagram",
  telegram: "telegram",
  whatsapp: "whatsapp",
  email: "mail",
  phone: "phone",
};

export interface SocialButtonProps {
  platform: SocialPlatform;
  href: string;
  /**
   * The button's accessible name. Required, and supplied by the caller,
   * because it has to be BOTH localized and disambiguating — the footer
   * shows two Instagram icons (one per project) and passes
   * "Instagram — Туры и курсы" so they do not announce identically.
   * This used to be an internal English lookup table; see
   * config/system.ts#socialPlatformLabels for why that was wrong.
   */
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
}

export function SocialButton({
  platform,
  href,
  label,
  size = "md",
  className,
  magnetic = true,
}: SocialButtonProps) {
  const isExternal = platform !== "email" && platform !== "phone";

  const button = (
    <Button asChild variant="social" size="icon" className={className} aria-label={label}>
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        <Icon name={platformIcon[platform]} size={size === "lg" ? "md" : "sm"} />
      </a>
    </Button>
  );

  return magnetic ? <Magnetic strength={10}>{button}</Magnetic> : button;
}
