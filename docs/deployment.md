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
to live somewhere that survives a deploy. That is five separate pieces:

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

### Two ways to serve the images — pick one

**Proxied through the site (default).** Leave `S3_PUBLIC_URL` unset and the
bucket private. `src/cms/storage.ts` configures `s3Storage` without
`disablePayloadAccessControl`, so Payload registers its own handler and every
image is fetched through `/api/media/file/<name>`. The credentials are the only
thing that ever touches the bucket, and `next.config.ts` needs no
`remotePatterns` because the images are same-origin.

The cost is real and was measured on the deployed site, not estimated: the HTML
arrived in **0.63s** while the hero photo took **1.24s**, and 2.4s on a cold
start. Each image is a serverless function that downloads from the bucket and
forwards it. Visitors saw the top of the page fill in a second time, a beat
after the text, and read it as the page loading twice.

**Served straight from the CDN (recommended for a photo-led site).** Give the
bucket a public URL — R2 bucket → **Settings** → **Public access** → an
`r2.dev` subdomain or a custom domain — and set:

```
S3_PUBLIC_URL=https://pub-xxxx.r2.dev
```

Payload then writes the bucket's own URL into each media record, browsers fetch
from Cloudflare's edge, and no function is involved. `next.config.ts` derives
`images.remotePatterns` from the same variable, so nothing else needs changing.

The trade-off is that **the bucket becomes publicly readable**. For photographs
already displayed on a public website that is reasonable; it is still a real
widening of access, which is why it is a variable you set rather than the
default.

**Reverting is removing the variable** and redeploying — URLs go back to the
proxied route with no code change, and the bucket can be closed again. Run
`npm run launch:check` to see which mode is active.

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
| `S3_PUBLIC_URL` | optional — see step 2; serves images from the CDN instead of through the site |
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

Run it with the production environment loaded. It checks the things that fail
silently rather than loudly: a placeholder domain, a missing database URL,
missing image storage, missing email, and a weak or development
`PAYLOAD_SECRET`. It also reports which of the two image-delivery modes is
active, as a warning rather than a blocker.

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
