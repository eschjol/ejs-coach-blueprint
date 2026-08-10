# Cure Your Slice — GHL Funnel Build Spec

Click-by-click build for the GoHighLevel funnel. Follow top to bottom; each
section lists the exact GHL menu path. Prices are canonical from
[`offer.md`](offer.md) — do not substitute. Page copy comes from
`sales-copywriting` (paste into the pages built here).

**Build in test mode first. Take a real $27 test purchase before launch.**

---

## 0. Prerequisites

- [ ] Sub-account selected (Erik's EJS Golf / ejsgolf.com dogfood account)
- [ ] **Stripe connected**: Settings → Payments → Integrations → connect Stripe
      (live + test). No products or checkout work until this is green.
- [ ] Confirm the account plan supports **one-click upsells**. Payments →
      check that Funnels offer upsell steps. If not available on the plan,
      **STOP and flag** — the upsell flow depends on charging the saved card
      with no re-entry.
- [ ] Dedicated subdomain ready: `go.ejsgolf.com` CNAMEd to GHL
      (Settings → Domains). Keeps paid traffic + tracking off the main site.

---

## 1. Products  (Payments → Products → Create Product)

Build all four before the funnel so checkout can reference them.

| Product | Price | Type | Setting notes |
|---------|-------|------|---------------|
| Cure Your Slice | $27.00 | One-time | Main checkout product |
| Ball Striking Machine Blueprint | $52.00 | One-time | **Bump price $52** so cart totals $79 when added. Bump copy says "Upgrade to $79." Do NOT price this at $79. |
| Online Swing Analysis | $279.00 | One-time | Upsell 1 |
| Online Program | $795.00 | **Recurring — monthly** | Upsell 2. No trial unless Erik says otherwise. |

- [ ] All four created, prices exactly as above
- [ ] Each has a name + image (images optional now, needed before launch)

---

## 2. Funnel + pages  (Sites → Funnels → New Funnel)

Create one funnel named **"Cure Your Slice"** with five steps in this exact
order so GHL chains the upsell steps after payment:

| # | Step name | Path | Type |
|---|-----------|------|------|
| 1 | Sales Page | `/cure-your-slice` | Regular |
| 2 | Checkout | `/cure-your-slice/checkout` | Order form (2-step) |
| 3 | Upgrade | `/cure-your-slice/upgrade` | Upsell (one-click) |
| 4 | Program | `/cure-your-slice/program` | Upsell (one-click) |
| 5 | Welcome | `/cure-your-slice/welcome` | Thank-you |

- [ ] Funnel domain set to `go.ejsgolf.com`
- [ ] All five steps created with the paths above
- [ ] Step order matches (upsells auto-chain after checkout)

---

## 3. Checkout step  (edit step 2 → Order Form element)

- [ ] **Two-step order form**: Step 1 = contact (name, email, phone),
      Step 2 = card. Step-1 submit creates the contact even with no payment —
      that contact is the abandoned-checkout audience (CYS-05).
- [ ] Primary product = **Cure Your Slice $27**
- [ ] **Order bump element** added:
  - [ ] Bump product = **Ball Striking Machine Blueprint ($52)**
  - [ ] Prominent style (dashed border), headline + box copy from
        `sales-copywriting` bump box
  - [ ] Verify: checking the box makes the order total read **$79.00**
- [ ] Post-purchase redirect flows to Step 3 (Upgrade) automatically

---

## 4. Upsell 1 — Swing Analysis  (step 3 `/upgrade`)

- [ ] One-click upsell element, product = **Online Swing Analysis $279**
- [ ] **Accept** ("Yes") = one-click charge on saved card — **no card
      re-entry**. Then continue to Step 4 (Program).
- [ ] **Decline** ("No thanks") = continue to Step 4 (Program).
- [ ] A decline must NOT lose the $27 (+bump) already captured.

---

## 5. Upsell 2 — Program  (step 4 `/program`)

- [ ] One-click upsell element, product = **Online Program $795/mo recurring**
- [ ] Accept = one-click start subscription on saved card → Step 5 (Welcome)
- [ ] Decline → Step 5 (Welcome)

---

## 6. Welcome / access  (step 5 `/welcome`)

- [ ] Thank-you copy from `sales-copywriting`
- [ ] Button links to members login (magic-link enabled — see §7)
- [ ] States what they bought and what happens next (course access + any
      swing-analysis upload instructions)

---

## 7. Access delivery  (Memberships → Courses)

- [ ] Two separate courses: **"Cure Your Slice"** and **"Ball Striking Machine
      Blueprint"** (separate so bump buyers see both).
- [ ] Build/stub the Online Program membership area (content can follow; access
      grant must work at launch).
- [ ] Enable **magic-link login** (Memberships → Settings) so buyers aren't
      stuck at a password screen.
- [ ] Access is granted **by workflow on purchase** (§8), never manual adds.

---

## 8. Workflows  (Automation → Workflows)

Tag names are **load-bearing** — remarketing audiences, email segmentation, and
reporting all key off `cys-*`. Use these names exactly.

| Workflow | Trigger | Actions |
|----------|---------|---------|
| **CYS-01** Purchase — front end | Product purchased: Cure Your Slice | tag `cys-buyer`; grant Cure Your Slice course; welcome email; add to buyer onboarding sequence |
| **CYS-02** Purchase — bump | Product purchased: Ball Striking Machine Blueprint | tag `cys-bump`; grant Blueprint course |
| **CYS-03** Purchase — swing analysis | Product purchased: Online Swing Analysis | tag `cys-analysis`; upload-instructions email (V1/CoachNow per Erik's online-lesson flow); notify Erik |
| **CYS-04** Purchase — program | Subscription started: Online Program | tag `cys-program`; onboarding email; notify Erik; **remove** from ascension sequence |
| **CYS-05** Abandoned checkout | Order-form step-1 submit, no purchase after 30 min | tag `cys-abandon`; start abandon sequence (`buyer-followup-sequences`) |
| **CYS-06** Payment failed (program) | Subscription payment failed | dunning email/SMS day 0/3/5; notify Erik day 5 |

- [ ] All six built with exact trigger + tag names
- [ ] CYS-01/02 grant the correct courses
- [ ] CYS-04 removes the buyer from the ascension sequence (don't sell the
      program to someone who just bought it)

---

## 9. Launch QA  (must all pass before spending on ads)

- [ ] **Test card purchase** end-to-end completes
- [ ] Bump checkbox makes total read **$79.00**
- [ ] Upsell 1 **accept** charges $279 one-click (no re-entry); **decline**
      proceeds cleanly
- [ ] Upsell 2 **accept** starts $795/mo; **decline** proceeds
- [ ] Upsell **decline does not** drop the original $27 (+bump)
- [ ] Access/welcome email arrives; **member login works** via magic link
- [ ] Swing-analysis purchase notifies Erik + emails upload instructions
- [ ] Declined card does **not** grant access (test the refund/decline path)
- [ ] Abandoned-checkout workflow (CYS-05) fires on a test step-1 abandon
- [ ] Conversion tracking fires with correct value — **do this in
      `google-conversion-tracking` before launch; it is a hard gate**

---

## Troubleshooting order (when a buyer reports a problem)

Stripe payment succeeded? → workflow trigger fired (check the contact's
workflow history)? → offer/course granted? → email sent + delivered?
Report the **first** broken link in that chain and where in the GHL UI to see
it.
