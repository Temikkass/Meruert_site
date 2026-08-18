import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/content/Eyebrow";
import { notFoundCopy } from "@/config/system";
import { defaultLocale } from "@/lib/locale";
import { localizedPath } from "@/lib/routes";

/**
 * app/not-found.tsx
 * ----------------------------------------------------------------------------
 * Next renders this for any unmatched route. It is deliberately quiet — a
 * 404 that tries to be a landing page reads as a mistake, not a courtesy.
 * Same tokens as <PageHeader> so it is recognizably the same site, and a
 * single way out rather than a menu of consolation links.
 *
 * Locale: this file sits above the `[locale]` segment (Next resolves it for
 * routes that match no segment at all, so there is no param to read), which
 * is why it uses `defaultLocale` rather than a prop.
 */
export default function NotFound() {
  const locale = defaultLocale;

  return (
    <main className="flex min-h-[70svh] items-center">
      <Container>
        <div className="flex max-w-xl flex-col items-start gap-5">
          <Eyebrow>{notFoundCopy.eyebrow[locale]}</Eyebrow>
          <h1 className="text-display-lg font-display font-semibold leading-display tracking-display text-ink">
            {notFoundCopy.heading[locale]}
          </h1>
          <p className="text-body-lg leading-body text-ink-muted">{notFoundCopy.body[locale]}</p>
          <Button asChild size="lg" className="mt-2">
            <Link href={localizedPath("/", locale) as Route}>{notFoundCopy.action[locale]}</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
