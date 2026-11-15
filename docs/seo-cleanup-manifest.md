# SEO Board Cleanup — Manifest & Status

Source: read-only blog-health scan of ejsgolf.com (149 posts). Working against the
live GHL blog API. Last updated 2026-11-15.

## DONE — live & verified (20 fixes)

### Dead internal links fixed (16 links, 13 posts)
All PUT 200, each post's schema/image/anchor counts preserved.

| Fix | Posts | Dead → Correct (verified live) |
|-----|-------|--------------------------------|
| online-lessons | How-to-perfect-strikes, distance-in-golf-debate-part-1-of-2, eliminating-early-extension, golf-and-life, how-to-get-up-and-down-chipping (×2), rory-mcilroy-ryder-cup-spinner, shaft-lean-ball-compression, stop-topping-the-golf-ball, topped-golf-shot-mystery-revealed | `/online-lessons` → `/online-golf-lessons` |
| shallowing | how-to-shallow-the-golf-club-sequence-first | `/post/the-science-of-shallowing` → `/post/the-science-of-shallowing-club-trail-elbow-data` |
| topping | why-do-i-hit-behind-the-golf-ball | `/post/how-to-stop-topping-the-golf-ball-low-point` → `/post/stop-topping-the-golf-ball` |
| hackmotion-video | how-to-stop-shanking-heel-strike-truth | `/post/hackmotion-wrist-data-golf-what-video-cannot-show` → `/post/hackmotion-wrist-angles-golf-swing-scottsdale` |
| wrist-flexion | duffed-chip-fix..., how-to-stop-shanking... | `/post/wrist-flexion-extension-golf-impact-club-face` → `/post/hackmotion-wrist-flexion-extension-golf-data` |
| lead-wrist | duffed-chip-fix... | `/post/lead-wrist-flexion-golf-compression` → `/post/hackmotion-wrist-flexion-extension-golf-data` |
| visible-text polish | stop-topping-the-golf-ball | anchor text `ejsgolf.com/online-lessons` → `ejsgolf.com/online-golf-lessons` |

### Article schema added (7 posts)
Cloned the site's own `@graph` (Article + Person + Organization) with each post's real
values. PGA-LPGA-Scratch-Statistic-Comp, head-down-golf-myth,
how-to-evaluate-scottsdale-golf-lessons-for-real-results, how-to-fix-a-golf-slice-face-to-path,
how-to-shallow-the-golf-club-sequence-first, scratch-golfer-vs-tour-pro-stats,
why-do-i-hit-behind-the-golf-ball.
(Scratch-vs-PGA-LPGA and scratch-vs-professional already had Article schema — skipped to
avoid duplicates; scanner flagged them on the rendered page only.)

## PENDING — needs Erik

### Decision owed: dead link with no destination (3 posts)
`/post/golf-strike-location-on-club-face-center-contact` — never-published / deleted page.
Links in: amateur-vs-pro-golf-swing-variance-gap, duffed-chip-fix..., how-to-stop-shanking...
Options: (a) point to `/post/how-to-stop-shanking-heel-strike-truth`; (b) remove the link,
keep the text; (c) write the center-contact post and link to it.

### Editorial — draft-first (wording in Erik's name)
- **four-release-patterns-golf-swing** — built on the retired FOUR-pattern model (heading
  "The Four Release Patterns"). Needs a real rewrite to the three-pattern taxonomy
  (Pivot-Dominant, Forearm-Rotational, Timed), not a word swap.
- **junior-golf-lessons-in-scottsdale-az** — "EJS Golf Academy" ×5, "EJS Golf" ×6, dead
  YouTube @ejsgolf link, dead `/shaft-lean` link (→ `/what-is-shaft-lean`), no schema.
  Full cleanup pass, drafted for review.
- **how-ball-position-affects-shaft-lean** — featured-image alt text reads
  "golf ball and marketing for skool.com/ejsgolf" (dead domain in metadata). Rewrite alt.
