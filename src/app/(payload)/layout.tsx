/* THIS FILE IS PART OF THE PAYLOAD ADMIN MOUNT — see the note below. */
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap.js";

import "@payloadcms/next/css";
import "./custom.scss";

/**
 * app/(payload)/layout.tsx
 * ----------------------------------------------------------------------------
 * The admin panel's own root layout.
 *
 * WHY THIS IS A ROUTE GROUP AND NOT UNDER [locale]
 * `(payload)` is a route group, so it contributes nothing to the URL but does
 * get its own layout — which means the admin renders its own <html>/<body>
 * and never inherits the public site's fonts, Lenis smooth-scroll, custom
 * cursor, page transitions or Tailwind base styles. Those are all deliberate
 * choices for a marketing site and all actively wrong inside a CMS: eased
 * scrolling in a long form is unusable, and the custom cursor would hide the
 * real one over admin controls.
 *
 * It also sits OUTSIDE the [locale] segment, so /admin is not a localized
 * route and middleware.ts skips it — the admin's own language is configured
 * in payload.config.ts#i18n, independently of the site's content locales.
 */

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function PayloadAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
