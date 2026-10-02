# AGENTS.md

## Project overview

`ejs-coach-blueprint` is primarily a **GoHighLevel (GHL) delivery package**: the
main deliverable is documentation and copy-paste templates in `docs/` and `ghl/`
(no build/runtime). See `README.md`.

It also ships an **optional web prototype** — the only runnable application in the
repo:

- Frontend: Vite + React 19 + React Router SPA (`src/`, entry `src/main.tsx`,
  routes in `src/App.tsx`).
- Backend: Netlify Functions (`netlify/functions/*.ts`, Netlify Functions v2 API,
  each declares a custom `path`/`schedule` via its `config` export).
- Data: Postgres via Drizzle ORM (`db/schema.ts`, `db/client.ts`); raw SQL +
  seed in `db/migrations/0000_initial.sql`.
- Integrations (Stripe, Twilio, Google Calendar, AI): all **mock out gracefully
  when their env vars are unset** (see `netlify/functions/_shared/`), so the app
  runs end-to-end with only a database configured.

## Brand rules

Before writing any copy, page, or template, read
[`config/brand-identity.md`](config/brand-identity.md). It records the company
name decision (Coach Erik Schjolberg Golf, with EJS Golf kept as an alternate
name) and which tools may be named as current.

## Standard commands

Scripts live in `package.json` (`dev`, `build`, `typecheck`, `preview`,
`db:generate`, `db:migrate`). Install/run instructions are in `README.md`
("Install & run"). The frontend dev server is Vite on port 5173; the full stack
(frontend + functions) runs via `netlify dev` on port 8888.

## Cursor Cloud specific instructions

- **Running the app for development, use the Vite server (`npm run dev`, port
  5173).** Vite proxies `/api/*` to `http://localhost:8888` and strips the `/api`
  prefix (see `vite.config.ts`), which matches the functions' custom paths (e.g.
  `book-intro` is served at `/book-intro`). So run `netlify dev` (port 8888) for
  the functions layer AND browse the app at **5173** — API calls made from 5173
  work correctly.
- **Do not expect `/api/*` to work when browsing the 8888 server directly.** The
  `netlify.toml` `/api/* -> /.netlify/functions/:splat` redirect points at the
  default function path, but the functions use custom `path` configs, so
  `/.netlify/functions/book-intro` returns 404 on 8888. This is a pre-existing
  repo quirk; browse via 5173 for a working API in dev.
- **`netlify dev` needs to be run non-interactively with `--offline`** (e.g.
  `./node_modules/.bin/netlify dev --offline`) so it doesn't try to log in / link
  a Netlify site. It auto-loads `.env`.
- **`netlify-cli` is a dev-only dependency** added so `netlify dev` works without
  an interactive `npx` download. It is not needed to build or to run the Vite
  frontend alone.
- **Database:** the functions require Postgres via `NETLIFY_DATABASE_URL` /
  `DATABASE_URL` (either works). For local dev, run a local Postgres, apply
  `db/migrations/0000_initial.sql` with `psql` (this creates the schema AND seeds
  coach `erik-schjolberg`), and put the URL in `.env`. `npm run db:migrate`
  (drizzle-kit) expects a drizzle journal that isn't committed, so prefer applying
  the SQL file directly with `psql`.
- **Hello-world flow:** book an intro lesson at `/book/erik-schjolberg` on the
  5173 server — it POSTs `/api/book-intro`, inserts `students` + `bookings` rows,
  returns a mock Stripe checkout URL (no Stripe key needed), and redirects to the
  thanks page.
