import type { Media } from "@/cms/payload-types";
import type { ImageAsset, LocalizedText } from "@/types";

/**
 * lib/content/mappers.ts
 * ----------------------------------------------------------------------------
 * Pure translation between Payload's stored shapes and the types the
 * components consume. No database, no Payload runtime — only types, which are
 * erased at compile time.
 *
 * Kept separate from client.ts on purpose: that module imports the Payload
 * config, which builds the entire CMS schema on import and needs environment
 * variables. Splitting these out means tests/content-mappers.test.ts can
 * exercise the logic that actually breaks — the null handling, the locale
 * fallbacks, the missing-image cases — without booting a CMS.
 */

/** Payload returns `{ ru, en, kk }` under `locale: "all"`. */
type MaybeLocalized = string | Partial<Record<string, string>> | null | undefined;

/**
 * Normalizes a localized field into `LocalizedText`.
 *
 * Falls back across locales rather than emitting `undefined`: a missing
 * translation should render the Russian text, never the string "undefined" or
 * an empty heading. This mirrors `localization.fallback` in payload.config.ts,
 * which handles the same case on Payload's side.
 */
export function toLocalizedText(value: MaybeLocalized): LocalizedText {
  if (typeof value === "string") {
    return { ru: value, en: value, kk: value };
  }

  const ru = value?.ru ?? "";
  return {
    ru,
    en: value?.en || ru,
    kk: value?.kk || ru,
  };
}

/** Same as above, but preserves "this field was never filled in" as undefined. */
export function toOptionalLocalizedText(value: MaybeLocalized): LocalizedText | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== "string" && !value.ru && !value.en && !value.kk) return undefined;
  return toLocalizedText(value);
}

/**
 * Turns a populated Media document into the `ImageAsset` the components take.
 *
 * `width`/`height` come straight from Payload, which records them on upload —
 * that is what lets `next/image` reserve the right box and keeps the layout
 * from shifting, the same reason those fields were required on ImageAsset.
 *
 * `alt` is localized in the CMS but `ImageAsset.alt` is a plain string, since
 * that is what `next/image` takes; the caller passes the active locale.
 */
export function toImageAsset(
  media: number | string | Media | null | undefined,
  locale: keyof LocalizedText
): ImageAsset | undefined {
  // A bare id means the query ran with depth 0 and the relationship was never
  // populated — a caller bug, not missing content.
  if (!media || typeof media !== "object") return undefined;
  if (!media.url || !media.width || !media.height) return undefined;

  const alt = toLocalizedText(media.alt as MaybeLocalized);

  return {
    src: media.url,
    alt: alt[locale],
    width: media.width,
    height: media.height,
  };
}

/**
 * `toImageAsset` for fields the site requires. Returns a 1×1 transparent
 * placeholder rather than throwing, so one missing image degrades to a blank
 * box instead of failing the whole page build — the client can then see and
 * fix it, which they cannot do if the site will not build.
 */
export function toRequiredImageAsset(
  media: number | string | Media | null | undefined,
  locale: keyof LocalizedText,
  fallbackAlt = ""
): ImageAsset {
  return (
    toImageAsset(media, locale) ?? {
      src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      alt: fallbackAlt,
      width: 1,
      height: 1,
    }
  );
}

/** Array fields come back as `{ text: ... }` rows; the site wants LocalizedText[]. */
export function toParagraphs(
  rows: { text?: MaybeLocalized }[] | null | undefined
): LocalizedText[] {
  return (rows ?? []).map((row) => toLocalizedText(row.text));
}
