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

### junior-golf-lessons-in-scottsdale-az — DONE (fixed in place + redirect)
Post record found under the archived-filter (id `6677bf84b3f3a758e590ce17`, status PUBLISHED,
renders live), so it was API-editable after all — edited in place rather than recreated:
- "EJS Golf Academy" / "EJS Golf" (9 mentions) → "Coach Erik Schjolberg Golf"
- dead YouTube `@ejsgolf` → `youtube.com/@coachErikSchjolberg`
- dead `/shaft-lean` → `/what-is-shaft-lean`
- Article schema added
- canonical corrected from the legacy `/blog/b/` URL to `/post/junior-golf-lessons-in-scottsdale-az`
- **301 redirect** created: `/blog/b/junior-golf-lessons-in-scottsdale-az` → `/post/...`
  (verified 301; `/post/` returns 200 and is now self-canonical). Redirect id `GzhPBHkJJwuvD5funNcD`.

### Off-CDN images (11) — cosmetic, low priority
External reference images that render today but could rot: support.trackmangolf.com ×4,
static.wixstatic.com ×3, researchgate.net, australiangolfdigest.com.au,
blogger.googleusercontent.com, media.licdn.com. Optional: re-host into the GHL media library.
