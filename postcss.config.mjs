/**
 * postcss.config.mjs
 * ----------------------------------------------------------------------------
 * Tailwind v4 ships its own PostCSS plugin package (@tailwindcss/postcss)
 * rather than being configured as a plain `tailwindcss` plugin — this is
 * the v4-specific setup, not a v3 config left over from a template.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
