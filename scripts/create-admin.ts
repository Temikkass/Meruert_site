import { getPayload } from "payload";
import config from "../src/payload.config.js";

/**
 * scripts/create-admin.ts
 * ----------------------------------------------------------------------------
 * Creates the first admin account, so a fresh checkout can reach /admin
 * without clicking through the create-first-user screen.
 *
 * Reads credentials from the environment rather than hardcoding them:
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run admin:create
 * A committed default password would be the account every deployment of this
 * template ships with, which is exactly how a site gets taken over.
 *
 * Idempotent: if the email already exists, it reports and exits rather than
 * failing, so re-running after a database reset is safe.
 */

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Администратор";

  if (!email || !password) {
    console.error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must both be set.\n" +
        'Example: ADMIN_EMAIL=me@example.com ADMIN_PASSWORD="a long passphrase" npm run admin:create'
    );
    process.exit(1);
  }

  if (password.length < 12) {
    console.error("ADMIN_PASSWORD must be at least 12 characters.");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log(`User ${email} already exists — nothing to do.`);
    process.exit(0);
  }

  await payload.create({
    collection: "users",
    data: { email, password, name },
  });

  console.log(`Created admin user ${email}. Sign in at /admin.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
