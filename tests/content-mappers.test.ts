import { describe, expect, it } from "vitest";
import {
  toImageAsset,
  toLocalizedText,
  toOptionalLocalizedText,
  toParagraphs,
  toRequiredImageAsset,
} from "@/lib/content/mappers";
import type { Media } from "@/cms/payload-types";

/**
 * The translation layer between Payload's stored shapes and the types the
 * components consume. These are pure functions, so they are testable without a
 * database — which matters, because a regression here is silent: the site
 * still builds and still renders, just with the wrong text, a missing image or
 * "undefined" where a heading should be.
 *
 * The database-backed half of this (do the collections and globals actually
 * respond?) is covered by `npm run cms:verify`, which needs Postgres and is
 * therefore a script rather than a unit test.
 */

describe("toLocalizedText", () => {
  it("passes through a full { ru, en, kk } object", () => {
    expect(toLocalizedText({ ru: "Привет", en: "Hello", kk: "Сәлем" })).toEqual({
      ru: "Привет",
      en: "Hello",
      kk: "Сәлем",
    });
  });

  it("falls back to Russian for missing translations rather than emitting undefined", () => {
    // A half-translated page should show Russian for the rest, never the
    // string "undefined" in a heading.
    expect(toLocalizedText({ ru: "Только по-русски" })).toEqual({
      ru: "Только по-русски",
      en: "Только по-русски",
      kk: "Только по-русски",
    });
  });

  it("treats an empty string as missing, not as a valid translation", () => {
    expect(toLocalizedText({ ru: "Русский", en: "", kk: "Қазақша" })).toEqual({
      ru: "Русский",
      en: "Русский",
      kk: "Қазақша",
    });
  });

  it("accepts a plain string, which is what a non-localized field returns", () => {
    expect(toLocalizedText("same everywhere")).toEqual({
      ru: "same everywhere",
      en: "same everywhere",
      kk: "same everywhere",
    });
  });

  it("never returns undefined for a null field", () => {
    expect(toLocalizedText(null)).toEqual({ ru: "", en: "", kk: "" });
  });
});

describe("toOptionalLocalizedText", () => {
  it("preserves 'never filled in' as undefined", () => {
    // Distinct from toLocalizedText: an optional eyebrow that was left blank
    // must stay undefined so the component omits it, rather than rendering an
    // empty element.
    expect(toOptionalLocalizedText(null)).toBeUndefined();
    expect(toOptionalLocalizedText(undefined)).toBeUndefined();
    expect(toOptionalLocalizedText({})).toBeUndefined();
    expect(toOptionalLocalizedText({ ru: "", en: "", kk: "" })).toBeUndefined();
  });

  it("returns text when any locale has content", () => {
    expect(toOptionalLocalizedText({ ru: "Есть" })?.ru).toBe("Есть");
  });
});

describe("toImageAsset", () => {
  const media = {
    id: 1,
    url: "/api/media/file/photo.jpg",
    width: 1200,
    height: 800,
    alt: { ru: "Фото", en: "Photo", kk: "Сурет" },
  } as unknown as Media;

  it("maps a populated media document to ImageAsset with the locale's alt", () => {
    expect(toImageAsset(media, "ru")).toEqual({
      src: "/api/media/file/photo.jpg",
      alt: "Фото",
      width: 1200,
      height: 800,
    });
    expect(toImageAsset(media, "en")?.alt).toBe("Photo");
  });

  it("returns undefined for an unpopulated relationship", () => {
    // A bare id means the query ran at depth 0 — a caller bug, not missing
    // content, and it must not silently render a broken image.
    expect(toImageAsset(7, "ru")).toBeUndefined();
    expect(toImageAsset(null, "ru")).toBeUndefined();
  });

  it("returns undefined when dimensions are missing", () => {
    // next/image needs intrinsic dimensions to reserve layout space; without
    // them the page would shift on load.
    const noDimensions = { id: 2, url: "/x.jpg", alt: "x" } as unknown as Media;
    expect(toImageAsset(noDimensions, "ru")).toBeUndefined();
  });
});

describe("toRequiredImageAsset", () => {
  it("degrades to a transparent placeholder instead of throwing", () => {
    // One missing image should leave a blank box the client can see and fix,
    // not fail the entire page build.
    const asset = toRequiredImageAsset(null, "ru", "fallback");
    expect(asset.src.startsWith("data:image/gif;base64,")).toBe(true);
    expect(asset.alt).toBe("fallback");
    expect(asset.width).toBe(1);
  });
});

describe("toParagraphs", () => {
  it("unwraps array rows into LocalizedText[]", () => {
    expect(
      toParagraphs([
        { text: { ru: "Первый", en: "First", kk: "Бірінші" } },
        { text: { ru: "Второй", en: "Second", kk: "Екінші" } },
      ])
    ).toEqual([
      { ru: "Первый", en: "First", kk: "Бірінші" },
      { ru: "Второй", en: "Second", kk: "Екінші" },
    ]);
  });

  it("returns an empty array for missing content", () => {
    expect(toParagraphs(null)).toEqual([]);
    expect(toParagraphs(undefined)).toEqual([]);
  });
});
