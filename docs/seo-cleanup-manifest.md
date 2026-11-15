# SEO Board Cleanup — Manifest & Status

Source: read-only blog-health scan of ejsgolf.com. Working against the live GHL blog
API. Board went from **61 findings → 16** over this cleanup. Last updated 2026-11-15.

## DONE — live & verified

- **16 dead internal links** fixed across 13 posts (`/online-lessons` → `/online-golf-lessons`;
  the broken `/post/...` cross-links repointed to their correct live destinations), plus one
  visible-link-text polish. Each PUT preserved the post's schema, images, and other links.
- **8 Article schema blocks added** (7 in the first pass + `eliminating-early-extension`),
  cloned from the site's own `@graph` with each post's real values. Two posts the scanner
  flagged already had Article schema in source — skipped to avoid duplicates.
- **`four-release-patterns-golf-swing` rewritten** to the three-pattern taxonomy:
  Body-Driven → Pivot-Dominant (Body-Driven); Rotational → Forearm-Rotational; Explosive +
  Progressive **merged into one Timed Release section** (Late/Abrupt + Gradual/Staged tempo
  settings), with matchup requirements preserved. Framework count, drills line, editor's note,
  and the JSON-LD schema description all updated. No "four pattern" language remains.
- **Strike-location dead link** (3 posts): `amateur-vs-pro-golf-swing-variance-gap` and
  `duffed-chip-fix...` repointed to `/post/how-to-stop-shanking-heel-strike-truth`;
  on the shank post itself the self-link was unwrapped to plain text.
- **`how-ball-position-affects-shaft-lean`** featured-image alt text changed from
  "golf ball and marketing for skool.com/ejsgolf" to a clean descriptive alt.

## REMAINING

### junior-golf-lessons-in-scottsdale-az — NOT API-editable
Confirmed a **legacy `/blog/b/` blog post** (canonical `https://ejsgolf.com/blog/b/junior-golf-lessons-in-scottsdale-az`).
It does not appear in the current `/blogs/posts` API (checked all 210 posts, including by
title "Finding & Learning Your Swing"), so it can't be edited from the API the rest of this
cleanup used. Its issues: "EJS Golf Academy" ×5, "EJS Golf" ×6, dead YouTube @ejsgolf link,
dead `/shaft-lean` link (→ `/what-is-shaft-lean`), no Article schema.
Fix paths: (a) Erik edits it in the GHL UI's legacy blog section; or (b) recreate it as a
current blog post (which IS API-editable) and 301-redirect the old URL.

### Off-CDN images (11) — cosmetic, low priority
External reference images that render today but could rot: support.trackmangolf.com ×4,
static.wixstatic.com ×3, researchgate.net, australiangolfdigest.com.au,
blogger.googleusercontent.com, media.licdn.com. Optional: re-host into the GHL media library.
