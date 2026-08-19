# Seed data

These files are **not** the site's content any more. The site reads everything
from the CMS (see `src/lib/content/`); this directory is the *initial* content
that `npm run seed` loads into an empty database.

## Why keep it

A fresh checkout — a new developer, a new deployment, or a buyer setting up
their own environment — starts with an empty database and therefore an empty
admin panel. Running `npm run seed` fills it with this placeholder content, so
the panel is explorable and every page renders immediately.

It is also the record of what the site shipped with: all three translations of
every string, in one reviewable place.

## What NOT to do

**Editing these files does not change the live site.** They are read only by
`scripts/seed.ts`. To change site content, edit it in the admin panel at
`/admin`.

Re-running `npm run seed` is destructive: it clears the content collections
and rewrites them from these files, discarding anything edited in the admin.
It never touches the `users` collection, so you will not be logged out.

## Still live, in `src/config/`

Two files stayed behind because they are configuration the site reads at
runtime, not editable content:

- `config/theme.ts` — design tokens, mirrored by `globals.css` and guarded by
  `tests/theme-tokens.test.ts`.
- `config/system.ts` — 404 / error page copy, the skip link, and the theme and
  language toggle labels. UI chrome rather than content.
