---
name: ghl-offer-funnel
description: Build and configure the Cure Your Slice sales funnel in GoHighLevel — products and prices, two-step checkout with the $79 order bump, one-click upsells ($279 swing analysis, $795/mo program), membership/course access, and the workflows that wire purchases to tags, access, and follow-up. Use this skill whenever the user asks to build, fix, or change anything inside GHL for this funnel: pages, checkout, order bump setup, upsell flow, product setup, Stripe, members area, funnel workflows, or "why didn't a buyer get access."
---

# GHL Offer Funnel — Cure Your Slice

Purpose: produce exact, click-by-click GHL build specs (and troubleshoot the
built funnel). GHL is configured by hand in its UI, so deliverables are precise
checklists and settings tables Erik can follow, saved to
`ghl/cure-your-slice/`. Prices come from `ghl/cure-your-slice/offer.md` — never
hardcode different ones.

## Funnel architecture (build exactly this)

```
/cure-your-slice            Sales page (long-form)
/cure-your-slice/checkout   2-step order form + ORDER BUMP checkbox
/cure-your-slice/upgrade    Upsell 1: Swing Analysis $279 (one-click)
/cure-your-slice/program    Upsell 2: Online Program $795/mo (one-click)
/cure-your-slice/welcome    Thank you + access instructions
```

Domain: dedicated subdomain (e.g. `go.ejsgolf.com`) CNAMEd to GHL — keeps paid
traffic and tracking separate from ejsgolf.com. One funnel, five steps, in this
order, so GHL's upsell steps chain automatically after payment.

## Products (Payments → Products)

| Product | Price | Type | Notes |
|---------|-------|------|-------|
| Cure Your Slice | $27 | one-time | main checkout product |
| Ball Striking Machine Blueprint (bump) | $52 | one-time | bump price so cart totals $79 — bump copy says "Upgrade to $79" |
| Online Swing Analysis | $279 | one-time | upsell 1 |
| Online Program | $795 | recurring monthly | upsell 2; no trial unless Erik says so |

Stripe must be connected in the sub-account before any of this. Test mode
first; take a real $27 test purchase before launch.

## Checkout specifics

- Two-step order form: step 1 contact info (name, email, phone), step 2 card.
  Step 1 submission creates the contact even if they never pay — that contact
  is the abandoned-checkout audience.
- Order bump element: checkbox styled prominently (dashed border works),
  headline from `sales-copywriting`, configured to add the $52 bump product.
- Upsell steps use GHL's one-click upsell (charge saved card) — the buyer must
  NOT re-enter card details. If one-click isn't available on the account plan,
  flag it as a blocker rather than silently building a re-entry form.
- Decline on upsell must still land the buyer on /welcome with their $27 (and
  bump, if taken) purchase intact.

## Access delivery (Memberships → Courses)

- Course products: "Cure Your Slice" and "Ball Striking Machine Blueprint" as
  separate courses so bump buyers see both.
- Grant offers via workflow on purchase (below), not manual adds.
- Welcome page and email both link to the members login; set the magic-link
  login option so buyers aren't stuck at a password screen.
- Swing analysis buyers: purchase triggers a task/notification to Erik AND an
  email to the buyer with upload instructions (V1/CoachNow link, per Erik's
  existing online-lesson flow).

## Workflows to build (Automation → Workflows)

| Workflow | Trigger | Actions |
|----------|---------|---------|
| CYS-01 Purchase — front end | Product purchased: Cure Your Slice | tag `cys-buyer`, grant course, welcome email, add to buyer sequence |
| CYS-02 Purchase — bump | Product purchased: Blueprint | tag `cys-bump`, grant Blueprint course |
| CYS-03 Purchase — swing analysis | Product purchased: Swing Analysis | tag `cys-analysis`, upload-instructions email, notify Erik |
| CYS-04 Purchase — program | Subscription started: Online Program | tag `cys-program`, onboarding email, notify Erik, remove from ascension sequence |
| CYS-05 Abandoned checkout | Order form step-1 submit, no purchase after 30 min | tag `cys-abandon`, start abandon sequence (see `buyer-followup-sequences`) |
| CYS-06 Payment failed (program) | Subscription payment failed | dunning email/SMS day 0/3/5, notify Erik day 5 |

Tags are load-bearing: remarketing audiences, email segmentation, and reporting
all key off `cys-*` tags. Keep the exact names above.

## Troubleshooting posture

When something misfires ("buyer didn't get access"), check in this order:
Stripe payment succeeded? → workflow trigger fired (check contact's workflow
history)? → offer granted? → email sent/delivered? Report the first broken link
in that chain, with where in the GHL UI to see it.

## Output format

Build specs as markdown checklists with exact GHL menu paths
(Sites → Funnels → …), saved to `ghl/cure-your-slice/funnel-build.md`. Include
a final QA section: test card purchase, bump math totals $79, both upsell
accept/decline paths, access email, member login.
