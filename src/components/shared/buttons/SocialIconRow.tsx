/**
 * components/shared/buttons/SocialIconRow.tsx
 * ----------------------------------------------------------------------------
 * Renders a list of `SocialLink`s as a row of <SocialButton>s. Two modes:
 *
 *  - SCOPED (`project` set): one flat row of that project's channels. This is
 *    what the project pages use, and it needs nothing else — there is only one
 *    of each platform on screen, so "Instagram" is unambiguous on its own.
 *
 *  - GROUPED (`groupLabels` set): one captioned group per project. This is what
 *    the footer needs, because it shows BOTH projects' channels at once.
 *    Without grouping it rendered a flat row of six icons — Instagram,
 *    Telegram, WhatsApp, Instagram, Telegram, WhatsApp — with two identical
 *    glyphs side by side and no way to tell which account each went to.
 *    Sighted visitors read that as a bug; screen-reader users heard
 *    "Instagram link… Instagram link" and could not choose at all. The client
 *    runs a separate account per project, so both icons are real and distinct
 *    and the visitor genuinely needs to know which is which.
 *
 * Accessible names are composed by the caller through `socialLabel()`, which
 * localizes the platform name and appends the project name in grouped mode —
 * so the announcement stays unambiguous even where the visible caption is not
 * read out.
 */

import { SocialButton, type SocialPlatform } from "./SocialButton";
import { socialLabel } from "@/lib/social";
import { Stack } from "@/components/layout/Stack";
import { cn } from "@/lib/utils";
import type { Locale, ProjectId, SocialLink } from "@/types";

const supportedPlatforms: SocialPlatform[] = ["instagram", "telegram", "whatsapp", "email", "phone"];

function isSupportedPlatform(link: SocialLink): link is SocialLink & { platform: SocialPlatform } {
  return supportedPlatforms.includes(link.platform as SocialPlatform);
}

export interface SocialIconRowProps {
  /** Every social link on the site; filtered by `project` or split by `groupLabels`. */
  links: SocialLink[];
  locale: Locale;
  /** Show only this project's channels, as a single flat row. */
  project?: ProjectId;
  /**
   * Display name per project. When provided, links are split into one
   * captioned group per project instead of a single row. Names come from the
   * CMS, so renaming a project in the admin renames its footer group too.
   */
  groupLabels?: Partial<Record<ProjectId | "shared", string>>;
  className?: string;
}

export function SocialIconRow({
  project,
  links: socialLinks,
  locale,
  groupLabels,
  className,
}: SocialIconRowProps) {
  const scoped = project ? socialLinks.filter((link) => link.project === project) : socialLinks;
  const links = scoped.filter(isSupportedPlatform);

  if (!groupLabels) {
    return (
      <Stack direction="row" gap={3} className={cn("flex-wrap", className)}>
        {links.map((link) => (
          <SocialButton
            key={`${link.project}-${link.platform}`}
            platform={link.platform}
            href={link.url}
            label={socialLabel(link.platform, locale)}
          />
        ))}
      </Stack>
    );
  }

  // Preserve the order the links arrive in (the CMS `order` field) rather than
  // imposing one here, so the client controls which project appears first.
  const groups: { key: string; label: string | undefined; items: typeof links }[] = [];
  for (const link of links) {
    const key = link.project ?? "shared";
    const existing = groups.find((group) => group.key === key);
    if (existing) {
      existing.items.push(link);
    } else {
      groups.push({ key, label: groupLabels[key], items: [link] });
    }
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {groups.map((group) => (
        <div key={group.key} className="flex flex-col gap-2">
          {group.label && (
            <span className="text-caption font-semibold uppercase tracking-eyebrow text-ink-muted">
              {group.label}
            </span>
          )}
          <Stack direction="row" gap={3} className="flex-wrap">
            {group.items.map((link) => (
              <SocialButton
                key={`${link.project}-${link.platform}`}
                platform={link.platform}
                href={link.url}
                label={socialLabel(link.platform, locale, group.label)}
              />
            ))}
          </Stack>
        </div>
      ))}
    </div>
  );
}
