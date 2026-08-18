import { defineConfig } from "vitest/config";

/**
 * vitest.config.mts
 * ----------------------------------------------------------------------------
 * `.mts` so Vite loads it as real ESM rather than warning about ESM-in-CJS.
 *
 * `resolve.tsconfigPaths` makes tests import through the same `@/` alias the
 * app uses — a test reaching for "../../src/lib/x" breaks every time a file
 * moves. This is Vite's native replacement for the vite-tsconfig-paths plugin.
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
