import type { ImportMap } from "payload";

/**
 * app/(payload)/admin/importMap.d.ts
 * ----------------------------------------------------------------------------
 * Types the generated `importMap.js` sibling.
 *
 * `payload generate:importmap` emits plain JavaScript with a JSDoc type
 * annotation, which this project cannot read: tsconfig sets `allowJs: false`
 * (deliberately — see that file) so TypeScript never looks inside .js at all,
 * and under `strict` the untyped import is an implicit-any error.
 *
 * Declaring the shape here keeps the strictness rather than relaxing
 * `allowJs` for one generated file. This file is hand-written and stable;
 * only `importMap.js` is regenerated, so the two do not fight.
 */
export declare const importMap: ImportMap;
