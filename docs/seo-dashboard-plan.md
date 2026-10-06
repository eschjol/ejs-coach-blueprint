# Scottsdale SEO Dashboard: Build Plan

Status: **v1 live (6 Oct 2026).** Written 2 Oct 2026; decision added 6 Oct 2026.

## Decision (6 Oct 2026)

v1 is a private claude.ai artifact dashboard, the **Coach Erik SEO Board**
(https://claude.ai/artifact/4NKcxm3er8uQQHyyCpd59G), backed by the artifact's own
database. A weekly scheduled Claude run fills it:

1. Runs the existing OpenSEO Scottsdale rank tracker (24 keywords, about 216 credits
   per run, so about 860 credits a month) and appends each keyword's position.
2. Pulls Search Console daily totals, near-page-one queries and top pages through
   OpenSEO's existing Search Console connection (free).
3. Runs `scripts/seo/blog_health.py`, a read-only scan of every post in the public
   sitemap, and stores the findings.

Why: it needs no new accounts, keys, hosting or Google credentials, because
OpenSEO already holds the Search Console connection and the credit balance. The
Netlify + Postgres build below stays the path if the board outgrows a weekly cadence
or needs to be shared beyond Erik; the open questions under it only matter then.

## Goal

This is an internal tool, not a product. It replaces the parts of Semrush that move bookings for
Coach Erik Schjolberg Golf, using data we can verify:

1. **Rankings** for a fixed list of Scottsdale, brand, and swing-fault keywords, with weekly history.
2. **Map-pack visibility** around McCormick Ranch Golf Club (local rank grid).
3. **Search Console opportunities**: queries and posts with high impressions and low click-through.
4. **Blog health**: dead links, legacy handles, banned terms, missing schema, and off-CDN images.
   This automates the manual audit run on 2 Oct 2026.
5. **One weekly summary** for Erik.

The dashboard does not build its own keyword database or backlink index. Ad-hoc research
(keyword ideas, competitor pulls, backlinks) stays in OpenSEO through Claude, where it already works.

## What has been verified

| Fact | How it was verified |
|---|---|
| OpenSEO project `ejsgolf.com` exists, US market, account erik@ejsgolf.com | OpenSEO `whoami` / `list_projects`, 2 Oct 2026 |
| Search Console is connected inside OpenSEO and returns data | `get_search_console_performance` returned 3 months of query data, 2 Oct 2026 |
| A 24-keyword Scottsdale mobile rank check costs 216 OpenSEO credits, about $0.20 of DataForSEO usage per OpenSEO's estimate | `estimate_rank_tracker_cost`, then the run itself, 2 Oct 2026 |
| OpenSEO is open source (MIT), self-hostable on Docker or Cloudflare, and needs a DataForSEO key | github.com/every-app/open-seo README, loaded 2 Oct 2026 |
| `ejsgolf.com` returns HTTP 200 with the contact page for unknown URLs (a soft 404) | Control-URL test, 2 Oct 2026. Link checks must compare the page title, not the status code. |

## What is not verified yet (resolve before building)

1. **Data access for the app itself.** OpenSEO works through Claude, but I have not confirmed that
   it exposes a REST API the app could call. The options are:
   - (a) a DataForSEO account and API key used directly by Netlify functions;
   - (b) a self-hosted OpenSEO with our own DataForSEO key;
   - (c) a REST API on hosted OpenSEO, if one exists.

   This needs a decision from Erik and a check of the vendor docs.
2. **Search Console access for the app.** This needs a Google Cloud service account added as a user
   on the `https://ejsgolf.com/` property, or an OAuth refresh token. Neither exists yet.
3. **Google Business Profile identifiers** (CID / place ID) for the local grid. The grid can match
   on business name, but CID is more reliable.
4. **DataForSEO per-call pricing** at the volumes below. The only cost measured so far is the OpenSEO
   estimate above.

## Architecture (fits the existing prototype)

The repo already has the right pieces: Vite + React SPA, Netlify Functions v2 with `schedule`
configs, Postgres via Drizzle, and integrations that mock out when env vars are unset. The
dashboard follows the same pattern.

### New tables (`db/schema.ts`)

| Table | Key columns |
|---|---|
| `seo_keywords` | id, coach_id, keyword, group (`local` / `brand` / `fault` / `scoring`), location_code, device, active |
| `seo_rank_checks` | id, keyword_id, checked_at, position (nullable = not in top N), ranking_url, serp_features (jsonb) |
| `seo_gsc_daily` | date, query, page, clicks, impressions, ctr, position. Unique on (date, query, page). |
| `seo_local_grid` | id, keyword, checked_at, center_lat, center_lng, spacing_km, cells (jsonb: rank + #1 business per point) |
| `seo_audit_findings` | id, checked_at, post_slug, kind (`dead_link`, `legacy_handle`, `banned_term`, `schema_missing`, `off_cdn_image`, `h1_count`), detail, resolved_at |

### New functions (`netlify/functions/`)

| Function | Schedule | Does |
|---|---|---|
| `seo-rank-check.ts` | weekly | Rank check for active keywords and stores rows. Mock rows when no data key is set. |
| `seo-gsc-sync.ts` | daily | Pulls the last 3 days of Search Console data (GSC lags about 3 days) and upserts. |
| `seo-local-grid.ts` | monthly | 3×3 grid, 2 km spacing, centered on 7505 E McCormick Pkwy. Two or three keywords only, because cost scales with grid points. |
| `seo-blog-audit.ts` | weekly | Reads `https://ejsgolf.com/sitemap.xml` and fetches each `/post/` URL with a browser User-Agent. Checks links with the soft-404 control method, scans for legacy handles, banned terms, `force plate`, `clubhead/clubface`, schema block count, and image hosts. |
| `seo-dashboard.ts` | on request | `GET /seo-dashboard?coach=erik-schjolberg`: returns rank history, GSC opportunities, grid, and open findings. |

`seo-blog-audit` is read-only. It never edits a post. Fixes go through the reviewed API push
described in the audit notes, never through the GHL rich-text editor, which strips JSON-LD.

### New page

`/dashboard/:coachSlug/seo` (React), with four panels in this order:

1. **Rank table.** Keyword, current position, change vs. last check, ranking URL, SERP features.
   It flags any keyword whose ranking URL changed; for example, `/home` was ranking instead of `/`
   on 2 Oct 2026.
2. **Search Console opportunities.** Queries at positions 4 to 20 with 500 or more impressions and
   CTR under 2%. On 2 Oct 2026 this list would have surfaced "what percentage of golfers break 90":
   5,386 impressions, position 6.1, CTR 0.46%.
3. **Local grid.** A 3×3 map of rank per cell, showing the #1 business in each cell.
4. **Blog health.** Open findings by post, newest first.

Brand: orange `#FF914E` for accents only, dark gray `#505050` text, blue `#0B5C8E` for data and
links, white background. Titles in Brandon Grotesque and body in Avenir, with sans-serif fallbacks.

## Initial keyword list

Start from the 24 keywords already tracked in OpenSEO (Scottsdale local terms, brand terms, and
swing-fault queries), then add Search Console striking-distance queries as they appear. Keep the
list under 50 keywords so the weekly cost stays small and the table stays readable.

## Build order

1. Decide data access (open question 1) and set up Search Console access (open question 2).
2. Add tables plus a SQL migration that matches `db/migrations/0000_initial.sql` style. Seed the 24
   keywords.
3. `seo-gsc-sync` first. It is free and first-party, and the opportunities panel is the
   highest-value view.
4. `seo-blog-audit`, which codifies the 2 Oct audit so the blog stays clean.
5. `seo-rank-check`, then `seo-local-grid`.
6. Dashboard page and weekly summary.

Each step runs end-to-end with mocks before any paid key is added, matching the rest of the
prototype.

## Not in scope

- Selling this to other coaches. That would be a separate product decision.
- Building a backlink index or keyword database. That is the expensive part of Semrush, and paying
  per query is cheaper.
- Any automatic change to live GHL pages, DNS, or posts.
