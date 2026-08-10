---
name: google-ads-optimization
description: Run the weekly optimization and reporting loop for the Cure Your Slice Google Ads account — search-term hygiene, bid/budget adjustments, creative rotation, scaling and kill decisions, and the plain-English performance report. Use this skill whenever the user asks how the ads are doing, wants a performance report, asks what to change/pause/scale, mentions wasted spend or rising CPA, or says "optimize the campaign" — and for any recurring weekly ads check-in.
---

# Ads Optimization Loop — Cure Your Slice

Purpose: the repeatable operating cadence once campaigns are live. Optimization
is deciding with the funnel's economics, not fiddling — every change traces to
the CPA/ROAS targets from `funnel-economics`, and one change category per week
so causes stay readable.

## Weekly checklist (run in this order)

1. **Tracking sanity first**: purchases in Google Ads ≈ ad-attributed orders
   in GHL/Stripe (within ~30%)? If not, STOP — no optimization decisions on
   dirty data; route to `google-conversion-tracking`.
2. **Search terms** (Search + PMax insights): add junk to the negative list
   (`ghl/cure-your-slice/negatives.txt` + account-level list); promote
   converting queries to exact match in their ad group.
3. **Budget/bid moves** by the decision table below.
4. **Creative**: RSA asset report — replace "Low" rated assets; keep winners.
   Check video hook rates (>25% good for :30) — swap hooks, not whole scripts.
5. **Funnel side**: checkout begin→purchase rate stable? Bump take rate ≥25%?
   If page metrics slid, the fix is `sales-copywriting`/`ghl-offer-funnel`,
   not bids — say so instead of touching the account.
6. **Audiences**: exclusion lists still applied; customer match fresh (manual
   CSV flow ages — see `google-remarketing`).

## Decision table (7-day windows, minimum ~10 conversions or ~$300 spend per
cell before acting — small numbers lie)

| Observation | Action |
|-------------|--------|
| CPA ≤ target, impression share lost to budget | raise budget 20% |
| CPA ≤ target for 2+ wks | tighten tCPA 10% OR scale budget — not both at once |
| CPA 1–2× target | no bid changes; fix search terms + worst ad group first |
| CPA > 2× target full week, tracking verified | pause worst ad groups, cut budget 30%, diagnose funnel |
| Ad group spends >$50, zero conversions | pause it, fold its best keywords elsewhere |
| Keyword CPC > $3 with no conversions | pause; note in keywords.md |
| PMax > 40% of conversions but account volume flat | cannibalization check per `google-ads-pmax` |

Change discipline: log every change (date, what, why, expected effect) in the
report file — smart bidding needs ~7 days to digest a change; don't stack
adjustments on top of unsettled ones.

## Monthly deep pass

Device/geo/schedule bid adjustments from segment data; landing-page test
proposal (one variable — headline, price framing, bump copy); LTV refresh in
`funnel-economics` with real bump/analysis/program take rates → re-derive
target CPA; audience-size review.

## Report format (plain English — Erik is a golf coach, not a media buyer)

Save weekly to `ghl/cure-your-slice/reports/YYYY-MM-DD.md`:

```
# Ads Week of {date}
**Bottom line:** spent ${X}, {N} sales, ${AOV} avg order → ${CPA} per sale
(target ${T}). {One-sentence verdict: on track / fixing / scaling.}
**Funnel:** {bump take %, upsell takes, program signups}
**Changes made:** {bulleted, with why}
**Watching next week:** {one thing}
```

Rule for the verdict line: compare CPA to CASH AOV (~$59 baseline), not the
$27 sticker — the campaign can look "unprofitable" against $27 while printing
money on the ladder. Never report CPA without the AOV context.
