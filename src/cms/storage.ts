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

/** The storage plugins for payload.config.ts — empty when running on disk. */
export function storagePlugins(): Plugin[] {
  const config = readStorageConfig();
  if (!config) return [];

  return [
    s3Storage({
      collections: { media: true },
      bucket: config.bucket,
      config: {
        region: config.region,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
        ...(config.endpoint ? { endpoint: config.endpoint, forcePathStyle: true } : {}),
      },
    }),
  ];
}
