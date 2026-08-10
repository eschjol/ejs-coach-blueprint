---
name: funnel-economics
description: Model the money side of the Cure Your Slice funnel — AOV, take rates, break-even CPA, target ROAS, LTV with the $795/mo program, and daily ad budget plans. Use this skill whenever the user asks about ad budgets, what to bid, CPA or ROAS targets, whether the campaign is profitable, how much to spend, pricing changes, or "can we afford" questions — and before launching or scaling any Google Ads campaign, since bid strategy targets come from this math.
---

# Funnel Economics — Cure Your Slice

Purpose: turn the offer ladder into concrete numbers Google Ads can be managed
against. Every bid target, budget, and scaling decision traces back to this
model. Read `ghl/cure-your-slice/offer.md` for current prices first.

## The model

Build the model in this order, showing your work so Erik can sanity-check:

1. **Front-end AOV** = $27 + (bump take rate × $52).
   Baseline bump take rate: 30% (typical well-written bumps run 20–40%).
   → baseline AOV ≈ $42.60.
2. **Cash AOV** = front-end AOV + (swing-analysis take rate × $279).
   Baseline 6% take → ≈ $59. This is the number ads must beat.
3. **LTV layer** = program signups × $795 × expected retention months.
   Baseline: 1 program member per 100 buyers, 4-month average retention →
   +$31.80/buyer. Do NOT count LTV in launch-phase bid targets; treat it as
   margin of safety and scale into it only with observed data.
4. **Break-even CPA** = cash AOV (≈ $55–60 at baseline).
5. **Target CPA** = 50–75% of break-even while learning: **$25–45**.
6. **Target ROAS** (for tROAS strategies later) = cash AOV ÷ target CPA ≈
   **130–230%** on front-end revenue alone.

Replace baselines with real GHL/Stripe data as soon as ~100 purchases exist,
and re-derive targets. State clearly which numbers are assumptions.

## Budget plan template

ALWAYS present budgets in this format:

| Phase | Daily budget | Channel split | Exit criteria |
|-------|-------------|---------------|---------------|
| Learning (wk 1–2) | $30–50 | 100% Search | 15+ purchases, CPA known |
| Validation (wk 3–4) | $50–100 | 70% Search / 30% video-remarketing | CPA ≤ $45 sustained |
| Scale (mo 2+) | raise 20%/wk | add PMax, Demand Gen | CPA holds within 20% of target |

Rules baked into the plan:
- Never raise a budget more than ~20% at a time — larger jumps reset learning.
- A day's spend with zero purchases is normal at $30/day (expect ~1 purchase
  per $35–45 spend at target). Judge on 7-day windows, not days.
- Kill criteria: if CPA > 2× break-even over a full 7-day window with tracking
  verified, pause and route the user to `google-ads-optimization` before
  spending more.

## Sensitivity checks worth running

When asked "what if" questions, model these levers — they move the business
more than ad tweaks:

- Bump take rate 20% vs 40% → AOV swings ~$10.
- Swing-analysis take 3% vs 10% → break-even CPA swings ~$20.
- One extra program member per 100 buyers ≈ +$3,180 LTV per 100 buyers at
  4-month retention — the program is where the campaign actually gets rich;
  say so whenever ascension investment is being weighed against ad spend.

## Output format

Deliver economics work as a short memo: assumptions table → derived targets →
recommended budget plan → what data would change the answer. Save recurring
models to `ghl/cure-your-slice/economics.md` so future sessions update rather
than rebuild.
