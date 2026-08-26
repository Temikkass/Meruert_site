/**
 * components/layout/Footer.tsx
 * ----------------------------------------------------------------------------
 * Reads `footerColumns`/`footerOwnerName` from config/footer.ts — adding or
 * renaming a footer link/column is a config edit, never a change here. The
 * copyright year is computed (`new Date().getFullYear()`), never a
 * hardcoded string that goes stale every January.
 *
 * Social icons are GROUPED BY PROJECT here, unlike on the project pages: the
 * footer is the one place showing both projects' channels together, and the
 * client runs a separate Instagram, Telegram and WhatsApp for each. A flat row
 * put two identical Instagram glyphs next to each other with nothing to
 * distinguish them.
 */

import Link from "next/link";
import type { Route } from "next";
import { Container } from "./Container";
import { Divider } from "./Divider";
import { SocialIconRow } from "@/components/shared/buttons/SocialIconRow";
import { localizedPath } from "@/lib/routes";
import type { Locale, LocalizedText, ProjectId, SocialLink } from "@/types";

export interface FooterColumn {
  title: LocalizedText;
  links: { label: LocalizedText; href: string }[];
}

export function Footer({
  columns,
  ownerName,
  copyrightNotice,
  socialLinks,
  projectNames,
  locale = "en",
}: {
  columns: FooterColumn[];
  ownerName: string;
  copyrightNotice: LocalizedText;
  socialLinks: SocialLink[];
  /**
   * Display name per project, used to caption each group of social icons.
   * The footer shows both projects' channels at once, so without these the
   * two Instagram icons would be indistinguishable — see SocialIconRow.
   */
  projectNames: Partial<Record<ProjectId | "shared", string>>;
  locale?: Locale;
}) {
  return (
    <footer className="pb-[calc(env(safe-area-inset-bottom)+2rem)]">
      <Container>
        <Divider />

        <div className="flex flex-col gap-10 py-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4">
            <span className="font-display text-body-lg font-semibold text-ink">{ownerName}</span>
            <SocialIconRow links={socialLinks} locale={locale} groupLabels={projectNames} />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:flex md:gap-16">
            {columns.map((column) => (
              <div key={column.title[locale]} className="flex flex-col gap-3">
                <span className="text-caption font-semibold uppercase tracking-eyebrow text-ink-muted">
                  {column.title[locale]}
                </span>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={localizedPath(link.href, locale) as Route}
                    className="text-body-sm text-ink-muted transition-colors duration-fast ease-standard hover:text-ink"
                  >
                    {link.label[locale]}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <p className="py-6 text-caption text-ink-muted">
          © {new Date().getFullYear()} {ownerName}. {copyrightNotice[locale]}
        </p>
      </Container>
    </footer>
  );
}
