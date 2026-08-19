/**
 * scripts/launch-check.ts
 * ----------------------------------------------------------------------------
 * Answers one question before a deploy: is anything missing that will break
 * quietly?
 *
 * Every failure below is one this project has a specific reason to check for,
 * because each fails SILENTLY rather than loudly:
 *
 *  - No image storage: uploads go to the server's disk, which most hosts wipe
 *    on the next deploy. The client loses every photo she uploaded, with no
 *    error and no way to recover them.
 *  - No email: the "forgot password" link reports success and delivers
 *    nothing, locking the owner out permanently.
 *  - Placeholder domain: every canonical URL, the sitemap and robots.txt point
 *    at a domain that does not exist, and search engines index it that way.
 *  - Weak or default secret: admin session tokens become forgeable.
 *
 * None of these break the build. All of them are discovered late and are
 * expensive when they are. Run with: npm run launch:check
 */

const PLACEHOLDER_DOMAIN = "replace-with-domain.com";
const DEV_SECRET_MARKER = "dev-only-secret";

interface Check {
  name: string;
  ok: boolean;
  detail: string;
  /** false = a warning that does not block a deploy. */
  blocking: boolean;
}

function check(): Check[] {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";
  const secret = process.env.PAYLOAD_SECRET?.trim() ?? "";

  const s3 = ["S3_BUCKET", "S3_REGION", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"];
  const s3Set = s3.filter((key) => Boolean(process.env[key]?.trim()));

  const emailKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const emailFrom = process.env.EMAIL_FROM_ADDRESS?.trim() ?? "";

  return [
    {
      name: "Site URL",
      ok: Boolean(siteUrl) && !siteUrl.includes(PLACEHOLDER_DOMAIN) && siteUrl.startsWith("https://"),
      detail: !siteUrl
        ? "NEXT_PUBLIC_SITE_URL is not set — canonical URLs, sitemap and robots.txt will use the placeholder domain."
        : siteUrl.includes(PLACEHOLDER_DOMAIN)
          ? `NEXT_PUBLIC_SITE_URL is still the placeholder (${siteUrl}).`
          : !siteUrl.startsWith("https://")
            ? `NEXT_PUBLIC_SITE_URL should be https in production (got ${siteUrl}).`
            : siteUrl,
      blocking: true,
    },
    {
      name: "Database",
      ok: Boolean(databaseUrl),
      detail: databaseUrl
        ? databaseUrl.replace(/:\/\/[^@]*@/, "://***@")
        : "DATABASE_URL is not set — the build cannot read any content.",
      blocking: true,
    },
    {
      name: "Payload secret",
      ok: secret.length >= 32 && !secret.includes(DEV_SECRET_MARKER),
      detail: !secret
        ? "PAYLOAD_SECRET is not set."
        : secret.includes(DEV_SECRET_MARKER)
          ? "PAYLOAD_SECRET is still the development value — generate a fresh one for production."
          : secret.length < 32
            ? `PAYLOAD_SECRET is only ${secret.length} characters; use at least 32.`
            : "set, and not the development value",
      blocking: true,
    },
    {
      name: "Image storage",
      ok: s3Set.length === s3.length,
      detail:
        s3Set.length === s3.length
          ? `S3-compatible storage configured (bucket: ${process.env.S3_BUCKET})`
          : s3Set.length === 0
            ? "No S3_* variables — uploads go to local disk and will be LOST on the next deploy."
            : `Only ${s3Set.length} of ${s3.length} S3_* variables set (${s3.filter((k) => !s3Set.includes(k)).join(", ")} missing) — falls back to local disk.`,
      blocking: true,
    },
    {
      name: "Email",
      ok: Boolean(emailKey && emailFrom),
      detail:
        emailKey && emailFrom
          ? `sending as ${emailFrom}`
          : "RESEND_API_KEY / EMAIL_FROM_ADDRESS not set — password reset will silently fail.",
      blocking: true,
    },
  ];
}

const results = check();
const failures = results.filter((r) => !r.ok && r.blocking);
const warnings = results.filter((r) => !r.ok && !r.blocking);

console.log("\nLaunch readiness\n");
for (const result of results) {
  const mark = result.ok ? "  ok  " : result.blocking ? " FAIL " : " warn ";
  console.log(`${mark} ${result.name.padEnd(16)} ${result.detail}`);
}

if (failures.length === 0) {
  console.log("\nReady to deploy.\n");
  process.exit(0);
}

console.log(
  `\n${failures.length} blocking issue${failures.length === 1 ? "" : "s"}${
    warnings.length ? ` and ${warnings.length} warning${warnings.length === 1 ? "" : "s"}` : ""
  }. See docs/deployment.md.\n`
);
process.exit(1);
