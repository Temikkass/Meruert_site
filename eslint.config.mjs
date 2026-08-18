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
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
