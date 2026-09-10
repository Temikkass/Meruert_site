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

describe("font subsets cover every language the site ships", () => {
  // Both families offer both Cyrillic ranges, so both must be requested:
  // Russian is the primary locale and Kazakh is one of the three.
  it.each([
    ["fontBody", "Inter"],
    ["fontData", "Manrope"],
  ])("%s (%s) requests latin, cyrillic and cyrillic-ext", (exportName) => {
    expect(subsetsFor(exportName)).toEqual(
      expect.arrayContaining(["latin", "cyrillic", "cyrillic-ext"])
    );
  });

  /**
   * Plus Jakarta Sans publishes no `cyrillic` subset at all — asking for one is
   * a build error, not a silent miss. `cyrillic-ext` is the most Cyrillic this
   * family has, which is why headings in Russian fall back; the note at the
   * bottom of fonts.ts records that gap and what fixing it would take.
   */
  it("fontDisplay (Plus Jakarta Sans) requests every subset it has", () => {
    expect(subsetsFor("fontDisplay")).toEqual(expect.arrayContaining(["latin", "cyrillic-ext"]));
  });
});
