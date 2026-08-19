import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * scripts/generate-icons.mjs
 * ----------------------------------------------------------------------------
 * Generates every icon the site needs from ONE source image, so replacing the
 * favicon is a single command rather than five files exported by hand at five
 * sizes.
 *
 *   npm run icons -- path/to/logo.svg
 *   npm run icons -- path/to/logo.png
 *   npm run icons -- --letter М          (monogram fallback)
 *
 * Writes:
 *   src/app/icon.svg          browser tab (vector, when given an SVG)
 *   src/app/apple-icon.png    iOS home screen, 180x180
 *   public/icons/icon-192.png PWA manifest
 *   public/icons/icon-512.png PWA manifest, also used maskable
 *
 * Next.js picks up src/app/icon.* and src/app/apple-icon.png by file
 * convention — no HTML tags to add.
 *
 * THE SOURCE SHOULD BE SQUARE. A wide logo is letterboxed onto a square
 * background rather than stretched, because a favicon is rendered at 16px and
 * a distorted mark is worse than a padded one.
 */

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");

// Design system tokens, hardcoded because a standalone icon file is served
// outside the CSS cascade. Mirrors --color-accent / --color-accent-foreground
// (oklch(52% 0.16 292) / oklch(98% 0.005 292)) in src/config/theme.ts.
const BRAND = "#6d52bc";
const ON_BRAND = "#f8f8fc";

const args = process.argv.slice(2);
const letterIndex = args.indexOf("--letter");
const letter = letterIndex !== -1 ? args[letterIndex + 1] : null;
const sourcePath = args.find((arg) => !arg.startsWith("--") && arg !== letter);

function monogramSvg(char) {
  const safe = String(char).slice(0, 2).toUpperCase();
  const fontSize = safe.length > 1 ? 26 : 34;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${BRAND}"/>
  <text x="32" y="32" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}"
        font-weight="600" fill="${ON_BRAND}" text-anchor="middle" dominant-baseline="central">${safe}</text>
</svg>`
  );
}

async function main() {
  if (!sourcePath && !letter) {
    console.error(
      [
        "Usage:",
        "  npm run icons -- path/to/logo.svg     generate from a logo file",
        "  npm run icons -- --letter М           generate a monogram",
        "",
        "The source should be square; a wide logo is padded, not stretched.",
      ].join("\n")
    );
    process.exit(1);
  }

  let source;
  let isVector = false;

  if (sourcePath) {
    const resolved = path.resolve(process.cwd(), sourcePath);
    if (!existsSync(resolved)) {
      console.error(`Source not found: ${resolved}`);
      process.exit(1);
    }
    source = await readFile(resolved);
    isVector = resolved.toLowerCase().endsWith(".svg");
  } else {
    source = monogramSvg(letter);
    isVector = true;
  }

  await mkdir(path.join(root, "public/icons"), { recursive: true });

  // An SVG source stays vector for the browser tab — it scales to any DPI and
  // is a fraction of the size of a PNG.
  if (isVector) {
    await writeFile(path.join(root, "src/app/icon.svg"), source);
    console.log("src/app/icon.svg           (vector)");
  } else {
    await sharp(source).resize(64, 64, { fit: "contain", background: BRAND }).png()
      .toFile(path.join(root, "src/app/icon.png"));
    console.log("src/app/icon.png           64x64");
    console.log("  note: delete src/app/icon.svg if it still exists, or Next will prefer it");
  }

  const raster = [
    ["src/app/apple-icon.png", 180],
    ["public/icons/icon-192.png", 192],
    ["public/icons/icon-512.png", 512],
  ];

  for (const [target, size] of raster) {
    await sharp(source, { density: 600 })
      .resize(size, size, { fit: "contain", background: BRAND })
      .png()
      .toFile(path.join(root, target));
    console.log(`${target.padEnd(26)} ${size}x${size}`);
  }

  console.log("\nDone. The manifest and <head> tags update automatically.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
