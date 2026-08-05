---
name: google-keyword-research
description: Build and maintain the keyword universe for the Cure Your Slice Google Search campaigns — slice-fix intent keywords, match-type strategy, ad-group themes, and the negative keyword list. Use this skill whenever the user asks for keywords, search terms, negative keywords, "what should we bid on," keyword expansion, or when search-term reports show junk traffic that needs blocking.
---

# Keyword Research — Cure Your Slice

Purpose: produce the keyword lists Search campaigns are built from, organized
into tightly themed ad groups, with the negative list that keeps a $27 product
from paying for tire-kicker clicks. Output feeds `google-ads-search` directly.

## Intent model

A $27 slice-fix product monetizes **problem-aware intent**, not local-lesson
intent. Rank intent tiers and treat them differently:

| Tier | Intent | Examples | Action |
|------|--------|----------|--------|
| 1 | Fix-my-slice (core) | how to fix a slice in golf, golf slice fix, stop slicing driver | Bid — primary ad groups |
| 2 | Cause/diagnosis | why do I slice my driver, what causes a slice | Bid — education-angle ads |
| 3 | Club-specific | slicing my driver but not irons, 3 wood slice | Bid — mirrors real pain, cheap CPCs |
| 4 | Product-adjacent | anti slice driver, slice correcting tee, golf training aid for slice | Test small — buyer mindset but wrong product |
| 5 | Generic improvement | golf tips, how to swing a golf club | Do NOT bid — too broad for a tripwire |
| 6 | Local lessons | golf lessons scottsdale | Do NOT bid here — that's Erik's separate local funnel (`ghl/ads/google-local-search.md`) |

## Seed universe (starting point — expand, don't just copy)

Core: `how to fix a slice`, `golf slice fix`, `how to stop slicing the ball`,
`fix my slice`, `cure a slice in golf`, `slice fix drills`.
Driver: `how to stop slicing driver`, `driver slice fix`, `why do I slice my
driver`, `slicing driver off the tee`.
Cause: `what causes a slice in golf`, `open club face slice`, `out to in swing
fix`, `over the top golf fix`.
Lefty variant: `hook fix` terms are the mirror — exclude unless Erik wants
left-hander coverage; a slice product page reads wrong to someone fixing a hook.

Expansion method: run each seed through Google autocomplete/"people also ask"
patterns, add club/situation modifiers (driver, irons, tee, "off the tee",
"with driver"), and mine actual search-term reports once live — real queries
beat brainstormed ones within two weeks of launch.

## Match types

- Start **phrase match** on tiers 1–3. Exact match the top ~10 proven
  converters once data exists.
- Broad match ONLY paired with a working tCPA and daily search-term review —
  never at launch on a fresh account.

## Negative keyword list (load at launch, grow weekly)

Free-seekers and wrong-intent at minimum:

```
free, youtube, reddit, forum
mini golf, disc golf, wii, videogame, 2k
pizza (slice), cake
clubs for slicers, best driver for slice, shaft, regripping
lessons near me, golf lessons, instructor near me
jobs, salary
```

Keep `best driver for slice`-type equipment queries negative in core ad groups
even though tier 4 tests them separately — separation is what makes the test
readable. Maintain the canonical list at
`ghl/cure-your-slice/negatives.txt` and append every junk term found in weekly
search-term reviews (see `google-ads-optimization`).

## Output format

Deliver keyword work as: ad-group table (theme → keywords → match type →
intent tier) plus the negative list, saved to
`ghl/cure-your-slice/keywords.md`. Flag any keyword whose CPC likely exceeds
~$3 — at a $42 AOV, expensive clicks need conversion rates the page may not
have yet; recommend those wait for the exact-match proven list.
