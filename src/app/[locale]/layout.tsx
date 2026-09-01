import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/providers";
import { PageTransition } from "@/providers/page-transition";
import { Navbar } from "@/components/navigation/Navbar";
import { SkipLink } from "@/components/navigation/SkipLink";
import { Footer } from "@/components/layout/Footer";
import { fontVariables } from "@/lib/fonts";
import { createDefaultMetadata } from "@/lib/metadata";
import { buildPersonSchema, serializeJsonLd } from "@/lib/json-ld";
import { SKIP_TARGET_ID } from "@/lib/constants";
import { assertLocale, htmlLang, locales } from "@/lib/locale";
import { getPerson, getPrimaryNav, getProjects, getSiteSettings, getSocialLinks } from "@/lib/content";
import "../globals.css";

/**
 * app/[locale]/layout.tsx
 * ----------------------------------------------------------------------------
 * The ROOT layout. It sits inside the `[locale]` segment rather than at
 * app/ because `<html lang>` has to reflect the active language, and a
 * layout above the dynamic segment cannot read it — every route on the site
 * is localized, so there is nothing left for an app/layout.tsx to wrap.
 * Requests without a locale prefix are redirected by proxy.ts, so this
 * layout always has one.
 *
 * Establishes, once, everything every page depends on:
 *
 *  - Font variables on <html>, so every Server or Client Component below
 *    can use `font-display`/`font-body`/`font-data` Tailwind classes
 *    immediately, with zero additional setup.
 *  - `<AppProviders>` once, at the root, so theme/motion/smooth-scroll
 *    context is available everywhere without per-page wiring.
 *  - Locale-aware default metadata + Person JSON-LD, so even an empty page
 *    shipped right now would already pass basic SEO/structured-data checks.
 *  - `<SkipLink>` as the first focusable element in the document, with its
 *    target id on the wrapper around {children} — so every page gets a
 *    working "bypass blocks" affordance without each page.tsx opting in.
 *  - `<Navbar>` and `<Footer>`, rendered ONCE here rather than by each
 *    page — so they stay visually stable (no fade/reset) across the page
 *    transitions `<PageTransition>` adds around `{children}`. This also
 *    avoids remounting the Navbar on every navigation, which would reset
 *    its scroll-blur state for a frame.
 *
 * `generateStaticParams` enumerates every locale, so all pages under this
 * layout stay statically prerendered per language — the same build output
 * as before locale routing existed, three times over.
 *
 * Server Component by default (no "use client") — only the providers and
 * PageTransition composed inside it opt into client rendering where they
 * must.
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createDefaultMetadata(assertLocale(locale));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches --color-canvas / dark canvas so the browser UI (address bar on
  // mobile) never flashes a mismatched color during load or theme switch.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(98.5% 0.004 293)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(15% 0.015 293)" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);

  // getProjects() costs no extra query here: getPrimaryNav() already calls it
  // and both are cache()d for the render pass.
  const [personSchema, person, nav, settings, socialLinks, projects] = await Promise.all([
    buildPersonSchema(),
    getPerson(),
    getPrimaryNav(),
    getSiteSettings(),
    getSocialLinks(),
    getProjects(),
  ]);

  // Captions for the footer's social groups, in the visitor's language.
  const projectNames = {
    financial: projects.financial.name[locale],
    travel: projects.travel.name[locale],
  };

  return (
    <html lang={htmlLang[locale]} className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
        />
      </head>
      <body>
        <AppProviders>
          <SkipLink locale={locale} />
          <Navbar
            items={nav}
            ownerName={person.fullName}
            socialLinks={socialLinks}
            locale={locale}
          />
          {/* tabIndex={-1} so the skip link actually moves focus here, not
              just the viewport — a jump target that is not focusable leaves
              the next Tab back at the top of the nav in several browsers. */}
          <div id={SKIP_TARGET_ID} tabIndex={-1} className="outline-none">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer
            columns={settings.footerColumns}
            ownerName={settings.footerOwnerName}
            copyrightNotice={settings.footerCopyrightNotice}
            socialLinks={socialLinks}
            projectNames={projectNames}
            locale={locale}
          />
        </AppProviders>
      </body>
    </html>
  );
}

