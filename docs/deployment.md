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
   `meruert-media`.
2. **Manage R2 API Tokens** → create a token with **Object Read & Write**,
   scoped to that bucket.
3. Note the Access Key ID, Secret Access Key, and your account's S3 endpoint
   (`https://<account-id>.r2.cloudflarestorage.com`).
4. Give the bucket a public URL: bucket → **Settings** → **Public access** →
   either an `r2.dev` subdomain or a custom domain. Images must be publicly
   readable — they are shown on a public website.

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
