import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * lib/content/client.ts
 * ----------------------------------------------------------------------------
 * The bridge between Payload's stored shapes and the types the components
 * already speak. Everything under lib/content/ returns the SAME types the old
 * `src/config/*.ts` files exported — `HomeContent`, `Project`, `FaqItem` — so
 * the component layer did not change at all when content moved into a
 * database.
 *
 * THE KEY DECISION: every query runs with `locale: "all"`, so Payload returns
 * each localized field as `{ ru, en, kk }` — which is exactly `LocalizedText`.
 * Fetching one locale at a time would have meant flattening every field to a
 * plain string and rewriting the ~120 `content.x[locale]` call sites across
 * the components. Reading all three costs one query instead of three and
 * leaves those call sites untouched.
 *
 * `cache()` dedupes within a single render pass: the layout and the page both
 * ask for `person`, and this makes that one database round trip rather than
 * two.
 */

export const getPayloadClient = cache(async () => getPayload({ config }));

// Pure mapping helpers live in ./mappers so they can be unit-tested without
// loading the Payload config. Re-exported here so callers have one import.
export * from "./mappers";
