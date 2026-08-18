/**
 * Generates neutral placeholder JPEGs at exactly the dimensions declared in
 * src/config/*.ts, so `next/image` reserves the right box and nothing 404s
 * before the client's real photos arrive. Re-runnable; overwrites in place.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = fileURLToPath(new URL("../public/", import.meta.url));

// Muted violet-grey drawn from the design system's --color-secondary /
// --color-border range, so placeholders sit inside the palette rather than
// screaming "missing asset" in default browser grey.
const BG = "#e6e4ec";
const FG = "#8b869c";

const targets = [
  ["images/profile/portrait-placeholder.jpg", 1200, 1500, "Portrait"],
  ["images/backgrounds/og-default-placeholder.jpg", 1200, 630, "OG image"],
  ["images/projects/financial-hero-placeholder.jpg", 1920, 1080, "Financial hero"],
  ["images/projects/travel-hero-placeholder.jpg", 1920, 1080, "Travel hero"],
  ["images/projects/travel-offering-tours-placeholder.jpg", 1200, 900, "Tours"],
  ["images/projects/travel-offering-language-placeholder.jpg", 1200, 900, "Language courses"],
  ["images/projects/travel-offering-camps-placeholder.jpg", 1200, 900, "Camps"],
  ["images/gallery/placeholder-01.jpg", 1600, 2000, "Gallery 1"],
  ["images/gallery/placeholder-02.jpg", 1600, 1067, "Gallery 2"],
  ["images/gallery/placeholder-03.jpg", 1600, 1067, "Gallery 3"],
  ["images/certificates/placeholder-01.jpg", 800, 600, "Certificate 1"],
  ["images/certificates/placeholder-02.jpg", 800, 600, "Certificate 2"],
  ["images/certificates/placeholder-03.jpg", 800, 600, "Certificate 3"],
  ["images/testimonials/placeholder-01.jpg", 200, 200, "Avatar 1"],
  ["images/testimonials/placeholder-02.jpg", 200, 200, "Avatar 2"],
];

function label(w, h, text) {
  const base = Math.min(w, h);
  const size = Math.max(11, Math.round(base * 0.055));
  const sub = Math.max(9, Math.round(base * 0.038));
  const showText = base >= 240;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${BG}"/>
  <circle cx="${w / 2}" cy="${h / 2 - (showText ? size : 0)}" r="${base * 0.09}" fill="none" stroke="${FG}" stroke-width="${Math.max(1.5, base * 0.008)}"/>
  ${showText ? `<text x="${w / 2}" y="${h / 2 + size * 1.6}" font-family="sans-serif" font-size="${size}" fill="${FG}" text-anchor="middle">${text}</text>
  <text x="${w / 2}" y="${h / 2 + size * 1.6 + sub * 1.5}" font-family="sans-serif" font-size="${sub}" fill="${FG}" opacity="0.75" text-anchor="middle">${w} x ${h}</text>` : ""}
</svg>`);
}

for (const [rel, w, h, text] of targets) {
  const out = join(PUBLIC, rel);
  await mkdir(dirname(out), { recursive: true });
  await sharp(label(w, h, text)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`${rel}  ${w}x${h}`);
}
