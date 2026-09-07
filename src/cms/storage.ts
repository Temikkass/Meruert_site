import { s3Storage } from "@payloadcms/storage-s3";
import type { Plugin } from "payload";

/**
 * cms/storage.ts
 * ----------------------------------------------------------------------------
 * Where uploaded images live.
 *
 * In development they go to ./media on local disk, which needs no
 * configuration and no account — you can clone this repo and upload a photo
 * immediately.
 *
 * In production that is not viable: most hosts (Vercel, and any container that
 * gets replaced on deploy) have an ephemeral filesystem, so images uploaded
 * through the admin would silently disappear on the next deploy — the kind of
 * failure the client discovers weeks later with no way to recover the files.
 * Setting the four S3 variables below switches uploads to object storage,
 * which persists.
 *
 * S3-COMPATIBLE rather than a specific vendor: the same adapter works with
 * Cloudflare R2, Backblaze B2, DigitalOcean Spaces, MinIO and AWS S3, so the
 * buyer picks on price and location rather than inheriting a decision made
 * here. R2 has no egress fees, which suits an image-heavy site.
 *
 * The plugin is only added when fully configured. A half-set environment
 * falls back to disk rather than failing at boot, so a missing variable
 * cannot take the whole site down — it degrades to the development behaviour,
 * and `npm run storage:check` reports which mode is active.
 */

export interface StorageConfig {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  /** Required for R2/Spaces/MinIO; omit for AWS S3. */
  endpoint?: string;
}

/**
 * Public base URL the bucket is reachable at, if the bucket is served
 * directly — an r2.dev subdomain or a custom domain, without a trailing slash.
 *
 * Setting it switches image delivery from "proxied by this site" to "served by
 * the CDN". Unsetting it switches back, with no code change: that is
 * deliberate, so the decision can be reversed from the hosting dashboard
 * alone. See `mediaCollectionOptions` for the measurements behind it.
 */
export function readPublicStorageUrl(): string | null {
  const url = process.env.S3_PUBLIC_URL?.trim().replace(/\/+$/, "");
  return url && url.length > 0 ? url : null;
}

/** Reads the S3 settings, or null when they are not all present. */
export function readStorageConfig(): StorageConfig | null {
  const bucket = process.env.S3_BUCKET?.trim();
  const region = process.env.S3_REGION?.trim();
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
  const endpoint = process.env.S3_ENDPOINT?.trim();

  if (!bucket || !region || !accessKeyId || !secretAccessKey) return null;

  return { bucket, region, accessKeyId, secretAccessKey, ...(endpoint ? { endpoint } : {}) };
}

/**
 * The storage plugin for payload.config.ts.
 *
 * ALWAYS REGISTERED, toggled by `enabled` — never conditionally added.
 *
 * Returning an empty array when S3 was unconfigured looked tidier and broke
 * the admin panel in production. The plugin contributes a client component
 * (`@payloadcms/storage-s3/client#S3ClientUploadHandler`) to Payload's import
 * map, and that map is generated ahead of time by `payload generate:importmap`.
 * Generated on a machine with no S3 variables, the map came out without the
 * handler; deployed where S3 *was* configured, the plugin asked for a
 * component the map did not contain and the whole admin rendered blank:
 *
 *   getFromImportMap: PayloadComponent not found in importMap
 *   key: '@payloadcms/storage-s3/client#S3ClientUploadHandler'
 *
 * That failure is server-side, so the browser showed no error at all — only
 * an empty page. Keeping the plugin in the config unconditionally makes the
 * import map identical in every environment, which is the only way a
 * pre-generated map can be correct.
 *
 * `alwaysInsertFields` keeps the collection schema identical too, so a
 * database migrated with storage off matches one migrated with it on.
 */
/**
 * How the media collection's files are addressed.
 *
 * DEFAULT (no S3_PUBLIC_URL): Payload serves every image through this site's
 * own route, /api/media/file/<name>. The bucket stays private and the
 * credentials are the only thing that touches it — but each image becomes a
 * serverless function invocation that downloads from the bucket and forwards
 * it.
 *
 * Measured on the deployed site, that cost is visible rather than theoretical:
 * the HTML arrived in 0.63s while the hero photo took 1.24s, and 2.4s on a
 * cold start. The top of the page filled in a second time, a beat after the
 * text — readers reported it as the page loading twice.
 *
 * WITH S3_PUBLIC_URL set, `disablePayloadAccessControl` makes Payload write
 * the bucket's own public URL into each media record, so browsers fetch
 * straight from Cloudflare's edge and never wake a function. The trade-off is
 * that the bucket must be publicly readable — acceptable for photographs that
 * are already on a public website, and a real widening of access that should
 * be a decision rather than a default.
 *
 * Reverting is removing the variable: URLs go back to the proxied route on the
 * next deploy, and the bucket can be closed again.
 */
function mediaCollectionOptions() {
  const publicUrl = readPublicStorageUrl();
  if (!publicUrl) return true as const;

  return {
    disablePayloadAccessControl: true as const,
    generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) =>
      [publicUrl, prefix, filename].filter(Boolean).join("/"),
  };
}

export function storagePlugins(): Plugin[] {
  const config = readStorageConfig();

  return [
    s3Storage({
      enabled: config !== null,
      alwaysInsertFields: true,
      collections: { media: mediaCollectionOptions() },
      bucket: config?.bucket ?? "",
      config: {
        region: config?.region ?? "auto",
        credentials: {
          accessKeyId: config?.accessKeyId ?? "",
          secretAccessKey: config?.secretAccessKey ?? "",
        },
        ...(config?.endpoint ? { endpoint: config.endpoint, forcePathStyle: true } : {}),
      },
    }),
  ];
}
