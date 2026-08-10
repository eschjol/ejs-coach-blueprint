# Cure Your Slice — Unit Economics (living model)

Turns the offer ladder in [`offer.md`](offer.md) into the numbers Google Ads is
managed against. Every bid target, budget, and scale/kill decision traces back
here. **All figures below the "real data" line are ASSUMPTIONS** — replace them
with GHL/Stripe actuals once ~100 purchases exist, then re-derive targets.

_Last updated: 2026-08-10 · baseline (pre-launch, no real data yet)_

---

## Assumptions (baseline — edit these as data arrives)

| Lever | Baseline | Notes |
|-------|----------|-------|
| Front-end price | $27 | Tripwire, fixed in offer.md |
| Order bump add | +$52 (cart → $79) | Ball Striking Machine Blueprint |
| Bump take rate | **30%** | Well-written bumps run 20–40% |
| Swing analysis price | $279 | Post-purchase one-click upsell |
| Swing analysis take rate | **6%** | Of front-end buyers |
| Program price | $795/mo | Ascension, recurring |
| Program conversion | **1 per 100 buyers** | Off the whole buyer base |
| Program retention | **4 months avg** | LTV layer only |

---

## Derived targets (show-your-work)

**1. Front-end AOV** = $27 + (0.30 × $52)
= $27 + $15.60 = **$42.60**

**2. Cash AOV** = front-end AOV + (0.06 × $279)
= $42.60 + $16.74 = **$59.34**
→ *This is the number ad spend must beat on immediate cash alone.*

**3. LTV layer** (do NOT bid on this — margin of safety):
1 program member / 100 buyers × $795 × 4 mo = $3,180 per 100 buyers
= **+$31.80 / buyer** on top of cash AOV.
Fully-loaded value per buyer ≈ **$91** — but launch bids ignore this until the
program conversion rate is observed, not assumed.

**4. Break-even CPA** = cash AOV ≈ **$59** per purchase.

**5. Target CPA (learning phase)** = 50–75% of break-even = **$30–$44**.
Manage to **~$35** as the working target; treat $45 as the ceiling.

**6. Target ROAS** (for tROAS strategies later) = cash AOV ÷ target CPA
= $59.34 / $35 ≈ **170%** (band: 130–230% on front-end revenue alone).

---

## Budget plan

| Phase | Daily budget | Channel split | Exit criteria |
|-------|-------------|---------------|---------------|
| Learning (wk 1–2) | $30–50 | 100% Search | 15+ purchases, CPA known |
| Validation (wk 3–4) | $50–100 | 70% Search / 30% video-remarketing | CPA ≤ $45 sustained |
| Scale (mo 2+) | +20%/wk | add PMax, Demand Gen | CPA holds within 20% of target |

**Rules baked in:**
- Never raise a budget >~20% at once — bigger jumps reset the learning phase.
- A $30/day day with zero purchases is normal (~1 purchase per $35–45 at
  target). Judge on **7-day windows**, never single days.
- **Kill trigger:** CPA > 2× break-even (> ~$120) over a full verified 7-day
  window → pause and route to `google-ads-optimization` before spending more.
- Do not set tCPA until Search has ~30 conversions; start on Maximize
  Conversions.

---

## Sensitivity (the levers that move the business)

| Change | Effect |
|--------|--------|
| Bump take 20% → 40% | AOV swings ≈ ±$10 |
| Swing-analysis take 3% → 10% | Break-even CPA swings ≈ ±$20 |
| +1 program member per 100 buyers (4-mo) | +$3,180 LTV per 100 buyers |

The **program is where this funnel actually makes money.** One extra retained
member per 100 buyers dwarfs almost any front-end ad optimization — so
ascension effort (`buyer-followup-sequences`) competes directly with ad spend
for attention and usually wins.

---

## What would change these answers

- **Real bump + upsell take rates** from the first ~100 checkouts (biggest
  lever on break-even CPA).
- **Observed program conversion + retention** — unlocks bidding into the LTV
  layer and higher CPAs.
- **Refund/chargeback rate** — not yet modeled; subtract from cash AOV once
  known.
- **Price changes** — edit `offer.md` first, then re-derive every line here.
