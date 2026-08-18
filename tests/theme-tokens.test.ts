import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { theme } from "@/config/theme";

/**
 * THE ONE THING THIS CODEBASE ASKS YOU TO MAINTAIN BY HAND
 *
 * Tailwind v4 moved configuration into CSS, so there is no JS -> CSS build
 * step that could generate `globals.css`'s `@theme` block from
 * `config/theme.ts`. Both files therefore carry the same palette, and the
 * comments in both say "keep these in sync by hand".
 *
 * Hand-synced duplication decays. This test is the thing that notices: change
 * a color in one file and forget the other, and it fails naming the exact
 * token. That turns a silent visual drift — the kind found weeks later on a
 * single component in dark mode — into a failing check on the same commit.
 *
 * It reads globals.css as text rather than compiling it: the point is to
 * compare the two authored sources, not what a browser eventually computes.
 */

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

/** camelCase token name -> the `--color-*` custom property it mirrors. */
function cssVarName(token: string): string {
  return `--color-${token.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
}

/** Reads a custom property out of a specific block of globals.css. */
function readCssToken(block: string, varName: string): string | undefined {
  const match = block.match(new RegExp(`${varName}:\s*([^;]+);`));
  return match?.[1]?.trim();
}

/** The `@theme { ... }` block holds the light palette. */
function themeBlock(): string {
  const start = css.indexOf("@theme {");
  expect(start, "globals.css should contain an @theme block").toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("\n}", start));
}

/** The `.dark { ... }` block re-points the same tokens for dark mode. */
function darkBlock(): string {
  const start = css.indexOf(".dark {");
  expect(start, "globals.css should contain a .dark block").toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("\n}", start));
}

describe.each([
  ["light", theme.light, themeBlock()],
  ["dark", theme.dark, darkBlock()],
])("%s palette matches globals.css", (mode, tokens, block) => {
  it.each(Object.entries(tokens))("%s", (token, value) => {
    const varName = cssVarName(token);
    const fromCss = readCssToken(block, varName);

    expect(
      fromCss,
      `${varName} is missing from the ${mode} block of globals.css — config/theme.ts defines ${token}`
    ).toBeDefined();

    expect(
      fromCss,
      `${varName} drifted from config/theme.ts#${mode}.${token}`
    ).toBe(value);
  });
});
