"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/content/Eyebrow";
import { errorCopy } from "@/config/system";
import { defaultLocale } from "@/lib/locale";

/**
 * app/error.tsx
 * ----------------------------------------------------------------------------
 * The route-level error boundary. Must be a Client Component — Next requires
 * it, because `reset()` is a callback it hands to the browser.
 *
 * The error object is logged rather than displayed: in production Next
 * replaces `error.message` with a generic string anyway, and showing a raw
 * stack to a visitor of a personal brand site is the opposite of the
 * impression the rest of the design is working toward. Wire the console.error
 * below to Sentry (or similar) when the client picks a monitoring provider.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const locale = defaultLocale;

  return (
    <main className="flex min-h-[70svh] items-center">
      <Container>
        <div className="flex max-w-xl flex-col items-start gap-5">
          <Eyebrow>{errorCopy.eyebrow[locale]}</Eyebrow>
          <h1 className="text-display-lg font-display font-semibold leading-display tracking-display text-ink">
            {errorCopy.heading[locale]}
          </h1>
          <p className="text-body-lg leading-body text-ink-muted">{errorCopy.body[locale]}</p>
          <Button size="lg" className="mt-2" onClick={reset}>
            {errorCopy.action[locale]}
          </Button>
        </div>
      </Container>
    </main>
  );
}
