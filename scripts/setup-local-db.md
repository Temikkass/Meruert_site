# Local development database

The site reads its content from PostgreSQL, so `npm run dev` and `npm run build`
both need a database. This describes the throwaway one used for development.
Production is separate — see *Deploying* in the README.

## Why a separate cluster

A PostgreSQL service may already be running on your machine on port 5432,
installed by some other tool and owned by whoever installed it. Rather than
guess at its password or change its configuration, this project creates its own
cluster on **port 5433**, in `.postgres/` inside the repo. It is:

- **self-contained** — everything lives in one gitignored folder;
- **password-free**, via `trust` auth on localhost only, because a throwaway
  development database gains nothing from a password you would have to store in
  a file next to it;
- **disposable** — delete `.postgres/` and run the steps below to start over.

`trust` auth is appropriate here and nowhere else. It means anything that can
reach port 5433 on this machine can connect as `postgres`. That is fine for a
local development database holding placeholder content, and would be
indefensible for production.

## First-time setup

Requires the PostgreSQL 17 client tools on your PATH. On Windows they are at
`C:\Program Files\PostgreSQL\17\bin`.

```bash
initdb -D .postgres/data -U postgres --auth=trust --encoding=UTF8 --locale=C
npm run db:start
createdb -h 127.0.0.1 -p 5433 -U postgres meruert
npm run cms:migrate
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD="a long passphrase" npm run admin:create
```

Then put this in `.env.local`:

```
DATABASE_URL=postgres://postgres@127.0.0.1:5433/meruert
```

## Everyday use

```bash
npm run db:start     # start it (survives until you stop it or reboot)
npm run db:status    # is it running?
npm run db:stop      # stop it
npm run cms:verify   # check every collection and global responds
```

The server does not start automatically on boot. If `npm run dev` reports a
connection error, `npm run db:start` is almost always the fix.

## After changing the schema

Editing anything under `src/cms/` changes the database schema, so:

```bash
npx payload migrate:create <short-name>   # write the migration
npm run cms:migrate                       # apply it
npm run cms:types                         # regenerate payload-types.ts
```

Migrations are committed. They are how the production database gets the same
schema as yours, so never edit a migration that has already been applied
anywhere else — add a new one.
