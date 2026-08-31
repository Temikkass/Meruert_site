   # Deploying

From nothing to a live site. Follow in order — each step produces a value the
next one needs.

Budget: **~$10–15/year for the domain**, plus hosting. Everything else fits in
free tiers at this site's size, comfortably. Verify current limits yourself
before committing — providers change their terms.

---

## What you are setting up, and why

The site is no longer a folder of files. It has an admin panel, so the text
Meruert types has to live somewhere permanent, and the photos she uploads have
to live somewhere that survives a deploy. That is four separate things:

| Piece | Suggested | Cost at this size |
| --- | --- | --- |
| Hosting | Vercel | free tier is **non-commercial**; a client site needs Pro (~$20/mo) |
| Database | Neon (Postgres) | free |
| Image storage | Cloudflare R2 | free |
| Email | Resend | free |
| Domain | any registrar | ~$10–15/year |

### Why images cannot live on the server

This is the one that fails quietly. Most modern hosts rebuild the server from
scratch on every deploy, erasing anything written to its disk since the last
one.

So: Meruert uploads 40 photos over three months, you push one small fix, and
**all 40 photos are gone.** No error, no warning — just broken images, and no
way to recover them. That is why storage is a separate box.

### Why the free database is genuinely fine

This site's entire content, in all three languages, is a few hundred kilobytes
— smaller than a single photo. Free tiers offer hundreds of megabytes.

Free databases also sleep when idle and wake slowly, which normally means a
slow first visit. Not here: every page is **pre-built**, so visitors read
finished HTML and never touch the database. It only wakes when Meruert saves
an edit.

---

## 1. Database (Neon)

1. Create a project at neon.tech. Pick the region closest to Kazakhstan —
   Frankfurt (`eu-central-1`) is usually the best available.
2. Copy the connection string. It looks like
   `postgres://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`

Keep it for step 5. Do not commit it anywhere.

## 2. Image storage (Cloudflare R2)

1. In the Cloudflare dashboard: **R2** → **Create bucket**. Name it e.g.
   `meruert-media`. That name is `S3_BUCKET`.
2. Open the bucket and copy its **S3 API** address — it contains your account
   id and looks like `https://<account-id>.r2.cloudflarestorage.com`. That is
   `S3_ENDPOINT`, copied whole, including `https://`.
3. **Manage R2 API Tokens** → **Create API Token**, permission
   **Object Read & Write**, scoped to that bucket. Read-only will break
   uploads. You get an Access Key ID and a Secret Access Key.

**The Secret Access Key is shown once.** Close the dialog without copying it
and the token has to be recreated. Paste it into Vercel immediately.

### What the five variables mean

Think of it as a login to a folder on someone else's disk:

| Variable | What it is | Example for R2 |
| --- | --- | --- |
| `S3_ENDPOINT` | the server address | `https://a1b2c3.r2.cloudflarestorage.com` |
| `S3_BUCKET` | the folder name, chosen by you | `meruert-media` |
| `S3_ACCESS_KEY_ID` | the login | a long alphanumeric string |
| `S3_SECRET_ACCESS_KEY` | the password | a long alphanumeric string |
| `S3_REGION` | where it physically lives | `auto` — R2 has no regions, but the S3 client requires the field |

### Leave the bucket PRIVATE

Do not enable public access, and do not set up an `r2.dev` subdomain — neither
is needed, and both widen access for nothing.

`src/cms/storage.ts` configures `s3Storage` without `disablePayloadAccessControl`,
which means Payload registers its own static handler and serves every image
through the site itself (`/api/media/file/<filename>`). The stored `url` is
that route, not a bucket address — the plugin only writes a direct bucket URL
when `disablePayloadAccessControl: true`. So the credentials above are the only
thing that ever touches the bucket, and `next.config.ts` needs no
`images.remotePatterns` because the images are same-origin.

The trade-off: each image is proxied by a serverless function rather than
served straight from a CDN. At this site's traffic that is fine, and it keeps
the bucket closed. If the site ever grows enough for that to matter, the change
is `disablePayloadAccessControl: true` plus a public bucket plus a
`remotePatterns` entry — a deliberate step, not the default.

R2 has no egress fees, which is why it suits an image-heavy site.

## 3. Email (Resend)

1. Create an account at resend.com.
2. Add and verify the sending domain (or use their test domain to start).
3. Create an API key.

Only used for admin password resets — a handful of emails per year. Without
it, the "Забыли пароль?" link reports success and delivers nothing, which
locks the owner out permanently after handover.

## 4. Domain

Buy from any registrar. For a `.kz` domain the local registrars (PS Internet,
Hoster.kz) are usually simplest; `.com` works anywhere.

Do not point it anywhere yet — Vercel gives you the DNS records in step 6.

## 5. Deploy to Vercel

1. Push the repository to GitHub (see the README).
2. In Vercel: **Add New** → **Project** → import the repo.
3. Framework preset: **Next.js** (detected automatically).
4. Add these environment variables — all of them, for **Production**:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain` — no trailing slash |
| `DATABASE_URL` | from step 1 |
| `PAYLOAD_SECRET` | generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `S3_BUCKET` | from step 2 |
| `S3_REGION` | `auto` for R2 |
| `S3_ACCESS_KEY_ID` | from step 2 |
| `S3_SECRET_ACCESS_KEY` | from step 2 |
| `S3_ENDPOINT` | from step 2 |
| `RESEND_API_KEY` | from step 3 |
| `EMAIL_FROM_ADDRESS` | e.g. `noreply@your-domain` |
| `EMAIL_FROM_NAME` | e.g. `Meruert` |

5. Deploy.

`vercel.json` sets the build command to `payload migrate && next build`, so the
database schema is created before the build tries to read content. The first
deploy therefore sets up the database on its own.

## 6. Point the domain

In Vercel: **Settings** → **Domains** → add your domain, then create the DNS
records it shows at your registrar. Propagation is usually minutes.

Once live, set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy — it
feeds every canonical URL, the sitemap and robots.txt.

## 7. Create the admin account and add content

The production database starts empty: no admin user, no content.

```bash
# from your machine, pointed at the production database
DATABASE_URL="<production url>" PAYLOAD_SECRET="<production secret>" \
  ADMIN_EMAIL=meruert@example.com ADMIN_PASSWORD="a long passphrase" \
  npm run admin:create
```

Then sign in at `https://your-domain/admin` and add the real content.

**Optionally** seed the placeholder content first, if you would rather edit
existing entries than create everything from scratch:

```bash
DATABASE_URL="<production url>" PAYLOAD_SECRET="<production secret>" npm run seed
```

Do this **once**, before real content exists — `npm run seed` is destructive
and rewrites every content collection.

---

## Before you call it live

```bash
npm run launch:check
```

Run it with the production environment loaded. It checks the four things that
fail silently rather than loudly: placeholder domain, missing image storage,
missing email, and a weak or development `PAYLOAD_SECRET`.

Then check by hand:

- [ ] `https://your-domain` loads and redirects to `/ru`
- [ ] `/en` and `/kk` work, and the language switcher keeps your place
- [ ] Sign in at `/admin`
- [ ] **Upload a photo, then redeploy, then confirm the photo is still there** —
      this is the single most important check, and the one that proves storage
      is configured. If the photo vanishes, `S3_*` is wrong.
- [ ] Change some text, save, reload the page — it should update within seconds
- [ ] Trigger a password reset and confirm the email arrives
- [ ] `https://your-domain/sitemap.xml` shows 18 URLs on the real domain
- [ ] Run Lighthouse on the homepage, mobile preset

---

## Ongoing

**Backups.** Neon keeps point-in-time history on paid plans; on the free tier
take periodic dumps yourself:

```bash
pg_dump "<production url>" > backup-$(date +%F).sql
```

The database holds everything Meruert has written. It is the only copy.

**Costs to expect:** the domain each year, hosting monthly, and nothing else
unless the site grows far beyond a personal brand site.

**Schema changes.** If a developer changes anything under `src/cms/`, they must
commit a migration — `vercel-build` applies it automatically on the next
deploy. See the README.
