---
name: google-ads-search
description: Build and manage Google Search campaigns for Cure Your Slice — campaign/ad-group structure, responsive search ads (RSAs), assets/extensions, bidding strategy, and launch settings. Use this skill whenever the user asks to create or edit Google search ads, write ad headlines or descriptions, set up a search campaign, choose a bidding strategy, or asks why search ads aren't converting or spending.
---

# Google Search Ads — Cure Your Slice

Purpose: produce launch-ready Search campaign specs and RSA copy. Keywords come
from `google-keyword-research`; CPA targets from `funnel-economics`; the
landing page is the GHL sales page from `ghl-offer-funnel`. Conversion tracking
(`google-conversion-tracking`) must be verified BEFORE launch — flag it as a
blocker if it isn't.

## Campaign structure

One campaign at launch — budget is too small to split learning across several:

```
Campaign: CYS — Search — US            (Search only; UNCHECK search partners
│                                       and Display expansion at launch)
├── AG1: Slice Fix — core              (tier 1 keywords)
├── AG2: Driver Slice                  (driver-specific)
├── AG3: Why Do I Slice                (cause/diagnosis)
└── AG4: [test] Anti-Slice Equipment   (tier 4 — own budget expectations)
```

Settings that matter: Location = United States (presence, not interest);
Languages = English; Networks = Google Search only; no audience *targeting*
(add audiences as Observation only). Ad schedule: all hours at launch — a $27
info product sells at 11pm.

## Bidding

- Launch: **Maximize Conversions, no target** (fresh account has no data for
  tCPA to work with).
- At ~30 conversions: set tCPA at observed CPA + 10–15%, then walk it down
  toward the `funnel-economics` target over weeks.
- Never launch Manual CPC unless tracking is broken and being diagnosed.

## RSA rules (per ad group: 1 RSA, add a 2nd variant after launch)

- 10–12 headlines, 4 descriptions, no pinning at launch (pin only for
  compliance-critical lines later).
- Headlines mix these jobs: keyword mirror ("Fix Your Golf Slice"), mechanism
  ("It's Face-to-Path, Not Talent"), credibility ("From Scottsdale's #1
  Coach"), offer/price ("Full Video Series — $27"), CTA ("Start Fixing It
  Today").
- Include the $27 price in at least one headline and one description — it
  filters freebie-seekers before the click, which matters at this price point.
- Descriptions: one mechanism, one product-contents, one proof, one
  offer+guarantee.
- Path fields: `/slice-fix/videos` style.

Example RSA (AG1 core — adapt, don't reuse verbatim across ad groups; mirror
each ad group's keyword in H1):

```
H: Fix Your Golf Slice | Stop Slicing for Good | It's Face-to-Path, Not Talent
H: Video Series by a Top Coach | Full Slice-Fix System — $27 | Drills That Actually Work
H: From Scottsdale's #1 Coach | Watch It This Afternoon | No More Aiming Left
H: TrackMan-Proven Method | Start Fixing It Today
D: Learn why your ball curves right and the exact drills to fix it. Complete video series, $27.
D: Built by coach Erik Schjolberg with TrackMan data — not guesswork. Get better from day one.
D: Stop aiming further left every round. Fix the real cause: your club face and swing path.
D: Instant access. Watch on your phone at the range. 30-day money-back guarantee.
```

## Assets (extensions)

- Sitelinks: What's Inside | Meet Coach Erik | Student Results | Get Instant
  Access — all pointing at sales-page anchors, never at ejsgolf.com pages
  (keeps paid traffic in the funnel).
- Callouts: Instant Access · 30-Day Guarantee · TrackMan-Tested · All Skill
  Levels.
- Structured snippet (Courses): Slice Fix Fundamentals, Driver Off the Tee,
  Face Control Drills.
- Price asset: Cure Your Slice $27 / Ball Striking Blueprint $79 — price
  assets pre-qualify hard.
- NO call or location assets — this is not the local-lessons campaign
  (`ghl/ads/google-local-search.md` covers that; keep the two strictly apart).

## Policy notes

Landing page must have working privacy policy and terms links, real contact
info, and no unrealistic claims — Google flags "cure/fix guaranteed" style
health-adjacent promises far less in golf context, but "results guaranteed"
still risks disapproval. If an ad is disapproved, diagnose against the policy
name Google cites before appealing.

## Output format

Save campaign specs to `ghl/cure-your-slice/search-campaign.md`: settings
table, ad-group/keyword map, full RSA text per ad group, asset list, and a
launch checklist (tracking verified → negatives loaded → budget cap → ads
approved). Ads are pasted into Google Ads Editor or the UI from this file.
