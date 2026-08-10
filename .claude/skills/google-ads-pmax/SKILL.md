---
name: google-ads-pmax
description: Build Performance Max campaigns for Cure Your Slice — asset groups, audience signals, brand exclusions, and the guardrails that stop PMax from cannibalizing Search or chasing junk conversions. Use this skill whenever the user asks about Performance Max, PMax, "letting Google find buyers," scaling beyond search, or asks whether/when to add PMax to the account.
---

# Performance Max — Cure Your Slice

Purpose: spec PMax correctly and honestly. PMax is a scale tool, not a launch
tool — it optimizes to whatever conversion data exists, so feeding it a funnel
with thin or dirty data produces expensive garbage. Enforce the entry gate
before building.

## Entry gate (check before anything else)

Build PMax only when ALL hold — otherwise tell the user which gate fails and
route accordingly:

- [ ] 30+ purchase conversions in the last 30 days (else keep scaling Search)
- [ ] Purchase conversion with dynamic values verified (`google-conversion-tracking`)
- [ ] Search campaign CPA within target for 2+ consecutive weeks
- [ ] Video + image assets exist (pull stills/cuts from `google-ads-youtube`
      production)

## Campaign design

One PMax campaign, goal Purchases, bid **tCPA set ~20% above proven Search
CPA** (PMax needs headroom to exit learning; tighten later). Budget: start at
~30% of Search budget. **Final URL expansion OFF** and page feed pinned to the
funnel URLs only — otherwise Google sends traffic to ejsgolf.com pages that
don't sell the $27 offer.

### Asset groups (2 at launch, one story each)

| Asset group | Angle | Audience signal |
|-------------|-------|-----------------|
| Slice Fix — Problem | "ball curves right, here's why" | custom segment: slice-fix search terms + site visitors |
| Coach Proof — Erik | "Scottsdale's #1 coach, TrackMan-proven" | customer match buyers (signal, not target) + golf-instruction interest |

Per asset group, supply the full asset stack — PMax punishes thin stacks with
low reach: 5 headlines (30c), 5 long headlines (90c), 4–5 descriptions, 15–20
images across 1.91:1 / 1:1 / 4:5, 1+ logo, and at least one video per aspect —
**always upload real videos; PMax auto-generates slideshow junk from images if
any video slot is empty.** Reuse RSA-proven lines from `google-ads-search` as
the headline starting point.

## Exclusions and hygiene

- Account-level negative keywords apply to PMax — make sure the
  `google-keyword-research` negative list is loaded at ACCOUNT level, not just
  the Search campaign.
- Exclude buyer customer-match list (`cys-buyer`) from the campaign.
- Brand exclusions: add "EJS Golf" / "Erik Schjolberg" terms so PMax doesn't
  claim branded conversions Search or organic would get free.
- Check the insights/placements report weekly for app-placement junk; exclude
  placements that spend with zero conversions.

## Judging PMax (it will try to look better than it is)

Judge on **account-level incremental CPA**: did total purchases rise when PMax
spend was added, or did Search conversions just migrate? Compare 2 weeks
pre/post launch. If account CPA held while volume grew → keep scaling. If
Search volume dropped by roughly what PMax "won" → it's cannibalizing;
tighten brand exclusions and cut its budget.

## Output format

Save the spec to `ghl/cure-your-slice/pmax-campaign.md`: gate check results,
settings table, both asset groups with full asset text, exclusion checklist,
and the pre/post evaluation plan with dates.
