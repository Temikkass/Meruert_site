/**
 * scripts/build-manual-pdf.mjs
 * ----------------------------------------------------------------------------
 * Rebuilds the client's printable manual from its HTML source.
 *
 *   docs/handover/manual.html            the text, styled like the site
 * + docs/handover/manual.print.css.html  A4 setup, print fonts, page breaks
 * = docs/handover/Как наполнять сайт - инструкция.pdf
 *
 * Chrome does the printing, because it is already on every machine that would
 * edit this and a headless PDF pipeline is not worth a dependency for one
 * document. Point CHROME_PATH at the binary if it lives somewhere unusual.
 *
 * Note on fonts: Chrome's print path does not load web fonts here, so the
 * print stylesheet deliberately uses system faces with full Cyrillic coverage
 * rather than the site's own. See docs/handover/README.md.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const DIR = resolve(import.meta.dirname, "..", "docs", "handover");
const SOURCE = join(DIR, "manual.html");
const PRINT_CSS = join(DIR, "manual.print.css.html");
const OUTPUT = join(DIR, "Как наполнять сайт - инструкция.pdf");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

function findChrome() {
  const found = CHROME_CANDIDATES.find((path) => path && existsSync(path));
  if (!found) {
    throw new Error(
      "Chrome not found. Install it, or set CHROME_PATH to the binary:\n" +
        `  CHROME_PATH="/path/to/chrome" node scripts/build-manual-pdf.mjs`
    );
  }
  return found;
}

/**
 * The source is a fragment: it starts at <title> and has no document shell,
 * because it is also published as an Artifact, which supplies one. Printing
 * needs a real document, and the Google Fonts <link>s are stripped so the
 * render never waits on a network request it cannot use anyway.
 */
function buildPrintable() {
  const body = readFileSync(SOURCE, "utf8")
    .split("\n")
    .filter((line) => !line.includes("fonts.googleapis.com") && !line.includes("fonts.gstatic.com"))
    .join("\n");

  return [
    "<!doctype html>",
    '<html lang="ru" data-theme="light">',
    '<head>\n<meta charset="utf-8">\n</head>',
    "<body>",
    body,
    readFileSync(PRINT_CSS, "utf8"),
  ].join("\n");
}

const chrome = findChrome();
const scratch = join(tmpdir(), `manual-print-${process.pid}.html`);
writeFileSync(scratch, buildPrintable(), "utf8");

try {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--print-to-pdf-no-header",
      `--print-to-pdf=${OUTPUT}`,
      `file:///${scratch.replace(/\\/g, "/")}`,
    ],
    { stdio: "ignore" }
  );
} finally {
  unlinkSync(scratch);
}

if (!existsSync(OUTPUT)) {
  console.error("Chrome exited without writing a PDF.");
  process.exit(1);
}

const pages = (readFileSync(OUTPUT).toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`Wrote ${OUTPUT} (${pages} pages).`);
