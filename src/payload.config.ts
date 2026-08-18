import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "@/cms/collections/Users";
import { Media } from "@/cms/collections/Media";
import { locales, defaultLocale } from "@/lib/locale";

/**
 * payload.config.ts
 * ----------------------------------------------------------------------------
 * The admin panel's single source of truth. Collections and globals are
 * defined under src/cms/ and imported here, so this file stays a wiring
 * diagram rather than a 2000-line schema.
 *
 * LOCALIZATION is the reason this integration is as small as it is. Every
 * user-facing string in this project has always been `LocalizedText`
 * ({ en, ru, kk }, see src/types/common.ts), which is exactly the shape
 * Payload produces for a field marked `localized: true`. The locale list is
 * imported from src/lib/locale.ts rather than restated, so the CMS and the
 * site can never disagree about which languages exist — tests/locale-parity
 * asserts it.
 *
 * `sharp` is passed in explicitly: Payload needs it to generate image sizes
 * on upload, and it is already a dependency of this project.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "app/(payload)"),
    },
    meta: {
      titleSuffix: "— Админ-панель",
    },
  },

  collections: [Users, Media],

  localization: {
    locales: locales.map((code) => ({ code, label: code.toUpperCase() })),
    defaultLocale,
    fallback: true,
  },

  // The admin UI's own chrome (buttons, labels, menus) in Russian. This is
  // separate from `localization` above, which is about the CONTENT.
  i18n: {
    supportedLanguages: {},
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
