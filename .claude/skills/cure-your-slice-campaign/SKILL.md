---
name: cure-your-slice-campaign
description: Master playbook for the end-to-end Google marketing campaign selling Erik's Cure Your Slice video series ($27 front end, $79 Ball Striking Machine Blueprint order bump, $279 swing analysis upsell, $795/mo online program) on GoHighLevel. Use this skill whenever the user asks to launch, plan, build, review, or work on the Cure Your Slice campaign or funnel as a whole, asks "where do we start," asks for a launch checklist or campaign status, or mentions selling the video series — even if they don't name a specific channel. This is the entry point that routes to the specialized skills.
---

# Cure Your Slice — Campaign Orchestrator

This skill is the map. It sequences the entire campaign — offer → funnel →
tracking → traffic → follow-up → optimization — and tells you which specialized
skill to use at each step. When the user's request is broad ("get the campaign
going," "what's next"), work through the phases below in order and report where
things stand.

**Canonical offer facts live in `ghl/cure-your-slice/offer.md`.** Read it before
producing any asset. Never invent prices — the ladder is $27 → $79 (bump) →
$279 (swing analysis) → $795/mo (program).

## The campaign, end to end

Traffic (Google) → GHL sales page → $27 checkout with $79 bump → upsell $279
swing analysis → upsell $795/mo program → members area + email/SMS ascension →
remarketing brings back non-buyers → weekly optimization loop.

## Build order and skill routing

Work phases in order — each phase depends on the previous one. Skipping ahead
(e.g., launching ads before conversion tracking) burns money blind.

| Phase | What gets built | Skill to use |
|-------|-----------------|--------------|
| 1. Economics | CPA/ROAS targets, budget plan, take-rate assumptions | `funnel-economics` |
| 2. Funnel | GHL products, checkout + bump, upsells, members area, automations wiring | `ghl-offer-funnel` |
| 3. Copy | Sales page, checkout, bump copy, upsell pages, thank-you | `sales-copywriting` |
| 4. Tracking | GA4 + Google Ads conversions with values, on every funnel step | `google-conversion-tracking` |
| 5. Keywords | Slice keyword universe, match types, negatives | `google-keyword-research` |
| 6. Search ads | Campaign structure, ad groups, RSAs | `google-ads-search` |
| 7. Video ads | YouTube scripts, Demand Gen setup | `google-ads-youtube` |
| 8. PMax | Performance Max asset groups (only after Search has data) | `google-ads-pmax` |
| 9. Follow-up | Buyer onboarding, abandoned checkout, ascension emails/SMS | `buyer-followup-sequences` |
| 10. Remarketing | Audiences, customer match, win-back campaigns | `google-remarketing` |
| 11. Optimize | Weekly search-term/budget/creative loop, reporting | `google-ads-optimization` |

## Launch gates

Do not tell the user the campaign is ready to launch until every gate passes:

- [ ] Test purchase completed end-to-end in GHL (card charged, bump adds $52,
      upsells fire one-click, access email arrives, member login works)
- [ ] Purchase conversion fires in Google Ads with correct dynamic value on a
      test transaction
- [ ] Refund/decline path tested (declined card doesn't grant access)
- [ ] Abandoned-checkout automation fires on a test abandon
- [ ] Search campaign has negatives loaded and budget cap set
- [ ] Weekly optimization checklist scheduled

## Default launch plan (when the user asks "what's the plan?")

1. **Week 0:** phases 1–4. Nothing spends money yet.
2. **Week 1–2:** launch Search only, $30–50/day, Maximize Conversions (no tCPA
   yet). Daily search-term checks.
3. **Week 3–4:** add YouTube remarketing + one Demand Gen test. Set tCPA on
   Search once ~30 conversions accumulate.
4. **Month 2+:** add PMax, scale winners per `google-ads-optimization`.

## Working style

- When the user asks for one artifact (an ad, an email), route to that skill
  directly — don't rebuild the whole plan.
- When a price or offer detail conflicts with `ghl/cure-your-slice/offer.md`,
  flag it and treat offer.md as truth.
- Keep every deliverable in this repo: ads under `ghl/ads/`, copy under
  `ghl/copy/`, funnel specs under `ghl/cure-your-slice/`. Files are the
  campaign's source of truth; GHL and Google Ads are where they get pasted.
