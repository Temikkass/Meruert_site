import { resendAdapter } from "@payloadcms/email-resend";
import type { EmailAdapter } from "payload";

/**
 * cms/email.ts
 * ----------------------------------------------------------------------------
 * Outgoing email. The admin panel sends exactly two kinds: password reset and
 * account verification. Volume is a handful per year.
 *
 * WHY THIS IS NOT OPTIONAL IN PRODUCTION
 * Without an adapter Payload logs emails to the server console instead of
 * sending them. The "Забыли пароль?" link on the login screen still appears
 * and still reports success — it just never delivers anything. If the site
 * owner locks herself out after handover, the only way back in is a developer
 * running a script against the database. That is a support call caused
 * entirely by a missing environment variable.
 *
 * Returns `undefined` when unconfigured, which keeps Payload's console-logging
 * default for local development: a developer resetting their own password can
 * read the link out of the terminal, and nobody needs an API key to run the
 * project. `npm run launch:check` reports which mode is active so this cannot
 * be missed at deploy time.
 */

export function emailAdapter(): EmailAdapter | undefined {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress = process.env.EMAIL_FROM_ADDRESS?.trim();
  const fromName = process.env.EMAIL_FROM_NAME?.trim();

  if (!apiKey || !fromAddress) return undefined;

  return resendAdapter({
    apiKey,
    defaultFromAddress: fromAddress,
    // Shown as the sender name in the inbox. Falls back to the address rather
    // than to something generic like "Payload", which would look like spam.
    defaultFromName: fromName || fromAddress,
  });
}

/** True when outgoing email is fully configured — used by the launch check. */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.EMAIL_FROM_ADDRESS?.trim());
}
