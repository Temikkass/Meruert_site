import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cn, TYPE_SCALE } from "@/lib/utils";

/**
 * THE TYPE SCALE HAS TO BE REGISTERED WITH tailwind-merge, OR IT DISAPPEARS
 *
 * `text-*` is two Tailwind namespaces wearing one prefix: font size and text
 * colour. tailwind-merge separates them using a list of known values, which
 * cannot include this project's custom tokens. Left undeclared, it reads
 * `text-body-sm text-ink-muted` as two colours in conflict and drops the
 * first — the element then inherits 16px from `body` and looks merely
 * unremarkable rather than broken.
 *
 * Two things are pinned here:
 *
 *  1. `cn()` actually keeps a size next to a colour. This is the regression
 *     test for the real defect — the nav shipped at 16px instead of 14px.
 *  2. `TYPE_SCALE` still matches the `--text-*` tokens declared in
 *     globals.css. Adding a token there and forgetting it here reintroduces
 *     the same silent deletion for that one token only, which is the hardest
 *     version of this bug to notice.
 */

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

/** The `@theme { ... }` block is the authoritative list of design tokens. */
function themeBlock(): string {
  const start = css.indexOf("@theme {");
  expect(start, "globals.css should contain an @theme block").toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("\n}", start));
}

describe("cn() preserves the custom type scale", () => {
  it.each(TYPE_SCALE)("keeps text-%s when a text colour sits beside it", (token) => {
    expect(cn(`text-${token}`, "text-ink-muted")).toContain(`text-${token}`);
  });

  it("still resolves genuine conflicts between two sizes", () => {
    // Last one wins — that is the whole reason cn() exists.
    expect(cn("text-body-lg", "text-body-sm")).toBe("text-body-sm");
  });

  it("still resolves genuine conflicts between two colours", () => {
    expect(cn("text-ink", "text-ink-muted")).toBe("text-ink-muted");
  });

  it("keeps a size and a colour together in one string", () => {
    const result = cn("text-body-sm text-ink-muted font-medium");
    expect(result).toContain("text-body-sm");
    expect(result).toContain("text-ink-muted");
  });
});

describe("TYPE_SCALE matches globals.css", () => {
  it("lists exactly the --text-* tokens the theme declares", () => {
    const declared = [...themeBlock().matchAll(/--text-([a-z0-9-]+):/g)].map((m) => m[1] as string);

    expect(new Set(TYPE_SCALE)).toEqual(new Set(declared));
  });
});
