# Cure Your Slice — Canonical Offer Sheet

Single source of truth for the Cure Your Slice funnel. Every campaign skill and
asset (ads, pages, emails, tracking) pulls prices and positioning from this file.
If pricing changes, change it HERE first, then update GHL products and ad copy.

---

## The offer ladder

| Step | Product | Price | Role |
|------|---------|-------|------|
| Front end | **Cure Your Slice** video series | **$27** one-time | Tripwire — turns clicks into buyers |
| Order bump | **Ball Striking Machine Blueprint** | Upgrade order to **$79** total (+$52 at checkout) | Raises AOV on the same checkout |
| Upsell 1 (post-purchase) | **One-time Online Swing Analysis** | **$279** one-time | Personalized diagnosis; bridge to coaching |
| Upsell 2 / ascension | **Monthly Online Program** | **$795/month** recurring | Back-end profit engine; ongoing coaching with Erik |

**Order bump mechanics:** the checkout shows a single checkbox — "Upgrade to $79
and get the Ball Striking Machine Blueprint." In GHL, configure the bump product
at $52 so the cart totals exactly $79 when checked.

**Ascension paths to the $795/mo program:** offered on the upsell flow after the
swing analysis, inside the members area, and in the buyer email sequence. Swing
analysis buyers are the hottest program prospects — every analysis delivery ends
with a program invitation.

---

## Who is buying

Amateur golfers (typically 35–70, disposable income, play 1–4x/month) whose ball
flight curves hard right (for right-handers) and who have tried tips, YouTube,
and training aids without a fix. They search things like "how to fix a slice,"
"why do I slice my driver," "golf slice fix." Pain: embarrassment, lost balls,
lost distance, scores stuck. They want a clear, proven fix — not swing theory.

---

## Why Erik / why this works (proof stack)

- Erik Schjolberg — Scottsdale's #1 golf coach, EJS Golf (ejsgolf.com)
- Teaches at McCormick Ranch Golf Club, Scottsdale, AZ
- TrackMan 4, 3D video, and pressure plates — data, not guesswork
- Philosophy: **get better from day one** — no "get worse to get better"
- Students: beginners through competitive juniors and low handicaps, plus
  online students nationwide

---

## Voice and claims rules

- Confident, plain-spoken, coach-to-student. No hype-bro tone, no fake scarcity.
- Never promise outcomes ("add 30 yards guaranteed"). Promise the mechanism:
  understand WHY you slice, drill the fix, see the ball flight change.
- Google Ads compliance: no "cure" as a medical claim issue here (golf context
  is fine), but avoid unrealistic performance claims and "guaranteed" results.
- Always name the price of the front end ($27) in ad copy where useful — it
  pre-qualifies clicks and filters freebie seekers.

---

## Funnel URLs (fill in once built in GHL)

| Page | URL |
|------|-----|
| Sales page | `https://go.ejsgolf.com/cure-your-slice` (suggested) |
| Checkout (bump lives here) | `/cure-your-slice/checkout` |
| Upsell 1 — Swing Analysis $279 | `/cure-your-slice/upgrade` |
| Upsell 2 — Program $795/mo | `/cure-your-slice/program` |
| Thank you / access | `/cure-your-slice/welcome` |

Use a dedicated subdomain (e.g., `go.ejsgolf.com`) CNAMEd to GHL so tracking
stays first-party and separate from the main site.

---

## Unit economics (baseline assumptions — update with real data)

- Bump take rate: assume 30% to start → AOV ≈ $27 + 0.30 × $52 ≈ **$42.60**
- Swing analysis take rate: assume 6% of buyers → adds ≈ $16.74 → AOV ≈ **$59**
- Program: even 1 member per 100 buyers adds $7.95/buyer/month recurring
- Break-even CPA on front-end AOV alone ≈ $55–60; target **$25–45 CPA** on
  purchases while learning, knowing back-end makes real margin
