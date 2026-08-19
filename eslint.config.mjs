import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint.config.mjs
 * ----------------------------------------------------------------------------
 * eslint-config-next v16 ships native flat-config arrays, so they are spread
 * in directly. This previously went through `FlatCompat`
 * (`compat.extends("next/core-web-vitals", "next/typescript")`), which is the
 * eslintrc bridge — on v16 that path throws "Converting circular structure to
 * JSON" while trying to validate a config that no longer needs validating.
 * The shim and its `@eslint/eslintrc` dependency are gone.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    /**
     * Generated code is not reviewed by hand, so linting it only produces
     * noise a human cannot act on: the migration and payload-types files are
     * rewritten wholesale by `payload migrate:create` / `generate:types`, and
     * importMap.js by `generate:importmap`.
     */
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "src/migrations/**",
      "src/cms/payload-types.ts",
      "src/app/(payload)/admin/importMap.js",
    ],
  },
];

export default eslintConfig;
