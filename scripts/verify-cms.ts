import { getPayload } from "payload";
import config from "../src/payload.config.js";
import { locales } from "../src/lib/locale.js";

/**
 * scripts/verify-cms.ts
 * ----------------------------------------------------------------------------
 * A smoke test for the CMS schema, run against the real database through
 * Payload's Local API. It answers one question: does every collection and
 * global this site depends on actually exist and respond?
 *
 * This is deliberately not a Vitest test — it needs a live Postgres, which
 * would make `npm run test` unrunnable on a fresh checkout. It is a
 * development tool: run it after changing the schema, or after a migration,
 * to confirm the database and the config still agree.
 */

const EXPECTED_COLLECTIONS = [
  "projects",
  "gallery",
  "testimonials",
  "faq",
  "statistics",
  "value-propositions",
  "timeline",
  "certificates",
  "social-links",
  "media",
  "users",
] as const;

const EXPECTED_GLOBALS = [
  "person",
  "home-page",
  "about-page",
  "financial-page",
  "travel-page",
  "contact-page",
  "legal-page",
  "site-settings",
] as const;

async function main() {
  const payload = await getPayload({ config });
  let failures = 0;

  console.log("\nCollections");
  for (const slug of EXPECTED_COLLECTIONS) {
    try {
      const result = await payload.find({ collection: slug, limit: 0, depth: 0 });
      console.log(`  ok    ${slug.padEnd(20)} ${result.totalDocs} documents`);
    } catch (error) {
      failures += 1;
      console.log(`  FAIL  ${slug.padEnd(20)} ${(error as Error).message}`);
    }
  }

  console.log("\nGlobals");
  for (const slug of EXPECTED_GLOBALS) {
    try {
      await payload.findGlobal({ slug, depth: 0 });
      console.log(`  ok    ${slug}`);
    } catch (error) {
      failures += 1;
      console.log(`  FAIL  ${slug.padEnd(20)} ${(error as Error).message}`);
    }
  }

  // Read the locale list from the site's own registry, not from `config` —
  // the imported config is a Promise here, so `config.localization` is
  // undefined and the loop would silently run zero times, which is worse than
  // no check at all.
  console.log("\nLocales");
  for (const locale of locales) {
    try {
      await payload.findGlobal({ slug: "person", locale, depth: 0 });
      console.log(`  ok    ${locale}`);
    } catch (error) {
      failures += 1;
      console.log(`  FAIL  ${locale} — ${(error as Error).message}`);
    }
  }

  console.log(failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) failed.\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
