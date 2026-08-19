import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { ru } from "@payloadcms/translations/languages/ru";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Certificates } from "@/cms/collections/Certificates";
import { Faq } from "@/cms/collections/Faq";
import { Gallery } from "@/cms/collections/Gallery";
import { Media } from "@/cms/collections/Media";
import { Projects } from "@/cms/collections/Projects";
import { SocialLinks } from "@/cms/collections/SocialLinks";
import { Statistics } from "@/cms/collections/Statistics";
import { Testimonials } from "@/cms/collections/Testimonials";
import { Timeline } from "@/cms/collections/Timeline";
import { Users } from "@/cms/collections/Users";
import { ValuePropositions } from "@/cms/collections/ValuePropositions";

import { AboutPage } from "@/cms/globals/AboutPage";
import { ContactPage } from "@/cms/globals/ContactPage";
import { HomePage } from "@/cms/globals/HomePage";
import { LegalPage } from "@/cms/globals/LegalPage";
import { Person } from "@/cms/globals/Person";
import { FinancialPage, TravelPage } from "@/cms/globals/ProjectPages";
import { SiteSettings } from "@/cms/globals/SiteSettings";

import { defaultLocale, locales } from "@/lib/locale";

/**
 * payload.config.ts
 * ----------------------------------------------------------------------------
 * The admin panel's single source of truth. Collections and globals are
 * defined under src/cms/ and imported here, so this file stays a wiring
 * diagram rather than a 2000-line schema.
 *
 * COLLECTIONS are the repeatable things the client adds and removes: gallery
 * photos, FAQs, reviews, statistics, timeline entries, certificates. GLOBALS
 * are the one-of-a-kind pages whose text gets edited in place.
 *
 * LOCALIZATION is why this integration is as small as it is. Every
 * user-facing string in this project has always been `LocalizedText`
 * ({ en, ru, kk }, see src/types/common.ts) — exactly the shape Payload
 * produces for a field marked `localized: true`. The locale list is imported
 * from src/lib/locale.ts rather than restated, so the CMS and the site can
 * never disagree about which languages exist; tests/locale-parity.test.ts
 * asserts it.
 *
 * `fallback: true` means an untranslated field falls back to the default
 * locale rather than rendering blank — so a page half-translated into Kazakh
 * shows Russian for the rest instead of holes.
 *
 * `sharp` is passed explicitly: Payload needs it to generate image sizes on
 * upload, and it is already a dependency of this project.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "app/(payload)"),
    },
    meta: {
      titleSuffix: " — Админ-панель",
    },
  },

  collections: [
    Projects,
    Gallery,
    Testimonials,
    Faq,
    Statistics,
    ValuePropositions,
    Timeline,
    Certificates,
    SocialLinks,
    Media,
    Users,
  ],

  globals: [Person, HomePage, AboutPage, FinancialPage, TravelPage, ContactPage, LegalPage, SiteSettings],

  localization: {
    locales: locales.map((code) => ({ code, label: code.toUpperCase() })),
    defaultLocale,
    fallback: true,
  },

  /**
   * The admin UI's own chrome — buttons, menus, validation messages — in
   * Russian. This is separate from `localization` above, which is about the
   * CONTENT being edited. The client works in Russian, so the interface
   * around the content should be too; English stays available so a developer
   * can switch back from the account menu.
   */
  i18n: {
    supportedLanguages: { ru, en },
    fallbackLanguage: "ru",
  },

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET ?? "",

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "cms/payload-types.ts"),
  },
});
