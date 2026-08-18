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
import "./globals.css";

/**
 * app/layout.tsx
 * ----------------------------------------------------------------------------
 * Establishes, once, everything every page depends on:
 *
 *  - Font variables on <html>, so every Server or Client Component below
 *    can use `font-display`/`font-body`/`font-data` Tailwind classes
 *    immediately, with zero additional setup.
 *  - `<AppProviders>` once, at the root, so theme/motion/smooth-scroll/toast
 *    context is available everywhere without per-page wiring.
 *  - Site-default metadata + Person JSON-LD, so even an empty page shipped
 *    right now would already pass basic SEO/structured-data checks.
 *  - `<SkipLink>` as the first focusable element in the document, with its
 *    target id on the wrapper around {children} — so every page gets a
 *    working "bypass blocks" affordance without each page.tsx opting in.
 *  - `<Navbar>` and `<Footer>`, rendered ONCE here rather than by each
 *    page — moved from per-page in the motion-design pass specifically so
 *    they stay visually stable (no fade/reset) across the page transitions
 *    `<PageTransition>` now adds around `{children}`. This also fixes a
 *    latent bug: with a per-page Navbar, every navigation was remounting
 *    it, silently resetting its scroll-blur and active-section-tracking
 *    state for a frame. Every `page.tsx` in app/ was updated to stop
 *    rendering its own Navbar/Footer to match.
 *
 * Server Component by default (no "use client") — only the providers and
 * PageTransition composed inside it opt into client rendering where they
 * must.
 */

export const metadata: Metadata = createDefaultMetadata();

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = buildPersonSchema();

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
        />
      </head>
      <body>
        <AppProviders>
          <SkipLink locale="en" />
          <Navbar locale="en" />
          {/* tabIndex={-1} so the skip link actually moves focus here, not
              just the viewport — a jump target that is not focusable leaves
              the next Tab back at the top of the nav in several browsers. */}
          <div id={SKIP_TARGET_ID} tabIndex={-1} className="outline-none">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer locale="en" />
        </AppProviders>
      </body>
    </html>
  );
}
