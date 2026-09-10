import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * A MISSING FONT SUBSET IS INVISIBLE UNTIL SOMEONE READS THE SITE IN RUSSIAN
 *
 * next/font subsets each family at build time and ships only the ranges asked
 * for. Ask for the wrong ones and nothing fails: the build is green, the page
 * renders, and the browser quietly falls back per glyph to a system face. The
 * only symptom is that headings and labels in the site's PRIMARY language look
 * like Arial while the English ones look designed.
 *
 * That is exactly what had happened here. Google splits Cyrillic in two:
 *
 *   cyrillic      U+0400-045F   the Russian alphabet
 *   cyrillic-ext  U+0460-052F   historic letters, and Kazakh's Ә Ғ Қ Ң Ө Ү Һ
 *
 * The names invite the assumption that "ext" is a superset of the other. It is
 * not — they are disjoint. Manrope carried only `cyrillic-ext`, so every
 * Russian nav label and statistic fell back; Inter carried only `cyrillic`, so
 * Kazakh words broke mid-word.
 *
 * This test reads fonts.ts as text, the way theme-tokens.test.ts reads
 * globals.css: the thing worth pinning is what the source asks for, not what a
 * browser eventually resolves.
 */

const source = readFileSync(new URL("../src/lib/fonts.ts", import.meta.url), "utf8");

/** Pulls the `subsets: [...]` array out of one `export const <name> = Family({...})`. */
function subsetsFor(exportName: string): string[] {
  const start = source.indexOf(`export const ${exportName} = `);
  expect(start, `fonts.ts should export ${exportName}`).toBeGreaterThan(-1);

  const block = source.slice(start, source.indexOf("});", start));
  const match = block.match(/subsets:\s*\[([^\]]+)\]/);
  expect(match, `${exportName} should declare a subsets array`).not.toBeNull();

  return [...(match?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1] as string);
}

/** Pulls the `weight: [...]` array out of the same block. */
function weightsFor(exportName: string): string[] {
  const start = source.indexOf(`export const ${exportName} = `);
  expect(start, `fonts.ts should export ${exportName}`).toBeGreaterThan(-1);

  const block = source.slice(start, source.indexOf("});", start));
  const match = block.match(/weight:\s*\[([^\]]+)\]/);
  expect(match, `${exportName} should declare a weight array`).not.toBeNull();

  return [...(match?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1] as string);
}

describe("font subsets cover every language the site ships", () => {
  // These families offer both Cyrillic ranges, so both must be requested:
  // Russian is the primary locale and Kazakh is one of the three.
  it.each([
    ["fontBody", "Inter"],
    ["fontData", "Manrope"],
    ["fontDisplayCyrillic", "Onest"],
  ])("%s (%s) requests latin, cyrillic and cyrillic-ext", (exportName) => {
    expect(subsetsFor(exportName)).toEqual(
      expect.arrayContaining(["latin", "cyrillic", "cyrillic-ext"])
    );
  });

  /**
   * The Latin half of the display stack must claim NO Cyrillic range at all.
   * Plus Jakarta Sans has no basic `cyrillic` subset, but it does have
   * `cyrillic-ext` — and taking it splits Kazakh words between two typefaces,
   * because Қ resolves to Jakarta while the а beside it resolves to Onest.
   * Whichever family serves Cyrillic must serve all of it.
   */
  it("fontDisplayLatin (Plus Jakarta Sans) claims no Cyrillic range", () => {
    const subsets = subsetsFor("fontDisplayLatin");
    expect(subsets).toContain("latin");
    expect(subsets.filter((s) => s.startsWith("cyrillic"))).toEqual([]);
  });

  /**
   * The two halves of the display stack must agree on weights, or a heading
   * changes thickness when it changes language — the kind of drift nobody
   * notices in review because reviewers read one locale.
   */
  it("both display faces offer the same weights", () => {
    expect(weightsFor("fontDisplayCyrillic")).toEqual(weightsFor("fontDisplayLatin"));
  });

  /**
   * next/font would otherwise append a metric-adjusted Arial face to the Latin
   * display family, and Arial HAS Cyrillic — so it would swallow every Russian
   * glyph before the browser ever reached Onest. Measured on the running page
   * before the fix: Cyrillic rendered at the fallback's width, not the display
   * face's.
   */
  it("the Latin display face does not carry a fallback that would eat Cyrillic", () => {
    const block = source.slice(
      source.indexOf("export const fontDisplayLatin"),
      source.indexOf("export const fontDisplayCyrillic")
    );
    expect(block).toContain("adjustFontFallback: false");
  });
});
