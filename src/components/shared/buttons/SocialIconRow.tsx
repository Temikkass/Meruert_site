/**
 * components/shared/buttons/SocialIconRow.tsx
 * ----------------------------------------------------------------------------
 * Renders config/social.ts's derived link list (itself built from
 * config/contacts.ts — see that file's header comment) as a row of
 * <SocialButton>s. Optionally filtered to one project's channels — the
 * homepage footer shows every channel across both projects; a project
 * page's contact section shows only that project's.
 */

import { socialLinks } from "@/config/social";
import { SocialButton, type SocialPlatform } from "./SocialButton";
import { Stack } from "@/components/layout/Stack";
import { cn } from "@/lib/utils";
import type { ProjectId, SocialLink } from "@/types";

const supportedPlatforms: SocialPlatform[] = ["instagram", "telegram", "whatsapp", "email", "phone"];

function isSupportedPlatform(link: SocialLink): link is SocialLink & { platform: SocialPlatform } {
  return supportedPlatforms.includes(link.platform as SocialPlatform);
}

export interface SocialIconRowProps {
  project?: ProjectId;
  className?: string;
}

export function SocialIconRow({ project, className }: SocialIconRowProps) {
  const scoped = project ? socialLinks.filter((link) => link.project === project) : socialLinks;
  const links = scoped.filter(isSupportedPlatform);

  return (
    <Stack direction="row" gap={3} className={cn("flex-wrap", className)}>
      {links.map((link) => (
        <SocialButton key={`${link.project}-${link.platform}`} platform={link.platform} href={link.url} />
      ))}
    </Stack>
  );
}
