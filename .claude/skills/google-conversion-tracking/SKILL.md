---
name: google-conversion-tracking
description: Set up and debug conversion tracking for the Cure Your Slice funnel — Google Ads purchase conversions with dynamic values, GA4, the Google tag on GoHighLevel pages, enhanced conversions, and consent basics. Use this skill whenever the user asks about tracking, pixels, tags, GA4, conversion values, "is tracking working," discrepancies between GHL/Stripe and Google Ads numbers, or before any campaign launches — tracking is a launch blocker for every ads skill.
---

# Conversion Tracking — Cure Your Slice

Purpose: make every dollar of the funnel visible to Google Ads with correct
values, because smart bidding optimizes to exactly what tracking reports —
wrong values teach the algorithm to buy the wrong buyers. This skill produces
setup checklists and debug diagnoses for the GHL-hosted funnel.

## Architecture (what gets built)

- **Google Ads conversion actions** (primary/secondary below) via the Google
  tag, installed on ALL funnel pages through GHL's per-funnel tracking-code
  settings (head code) — not per-page pastes that drift.
- **GA4 property** linked to Google Ads, funnel steps as events, for
  diagnosis and audience building.
- **Enhanced conversions ON**, fed with the buyer's email — GHL checkouts have
  the email at purchase time; hashed-email matching recovers conversions
  browsers hide.

| Conversion action | Trigger | Value | Goal status |
|-------------------|---------|-------|-------------|
| Purchase — CYS | /welcome pageview OR GHL purchase event | dynamic order total ($27–$79+) | **Primary** (bids optimize to this) |
| Upsell — Swing Analysis | upsell accept | $279 | Primary (same Purchases goal) |
| Program signup | subscription start | $795 | Primary |
| Begin checkout | checkout step-1 submit | — | Secondary (observe) |
| Sales page view | landing pageview | — | Secondary |

## The dynamic-value problem (main GHL gotcha)

A plain thank-you-page tag fires $27 for every buyer and loses bump/upsell
revenue — bidding then undervalues the exact buyers who take bumps. Preferred
fixes, in order:

1. **GHL native Google Ads integration** (Settings → Integrations): sends
   purchase conversions server-side with real order totals. Use it if the
   account plan has it; verify amounts against Stripe on test purchases.
2. **Order-confirmation page + dataLayer**: GHL exposes order details on the
   confirmation step; read the total into the tag's value parameter.
3. Fallback: separate fixed-value conversion actions per product (the table
   above already supports this) — cruder but honest.

Never double-count: if the native integration sends purchases, the
thank-you-page tag must be demoted to secondary or removed.

## Deduplication & attribution settings

- Transaction ID = GHL order ID on every purchase fire (dedupes refresh/reopen
  of /welcome).
- Attribution: data-driven; count "one per click" for the front-end purchase.
- Conversion window 30 days click-through.

## Verification protocol (run before ANY campaign launches, and any time
numbers look off)

1. Tag Assistant on every funnel URL — one Google tag firing once per page.
2. Test purchase with real card → confirm: conversion appears in Google Ads
   (diagnostics → recent conversions), value matches Stripe charge, GA4
   purchase event has the transaction ID.
3. Bump test: buy WITH the bump → value must be $79, not $27.
4. Refund the test orders in Stripe; note test transaction IDs in the tracking
   doc so reporting can exclude them.

## Debugging discrepancies (GHL says X sales, Google says Y)

Work the chain in order and report the first break: Google claims fewer than
Stripe? → normal (attribution only counts ad-click conversions; compare
against ad-clicked orders, expect 60–80% capture; enhanced conversions closes
part of the gap). Google claims MORE than Stripe? → duplicate firing (two
tags, missing transaction ID, or native integration + page tag both primary).
GA4 and Ads disagree? → different attribution models; expected within ~20%,
use Ads numbers for bidding decisions.

## Consent

Funnel pages need a privacy policy link (Google Ads landing-page requirement)
and, if EU/UK traffic is ever targeted, consent mode — this campaign targets
US only, so note it as out of scope unless targeting changes.

## Output format

Save setup + verification results to `ghl/cure-your-slice/tracking.md`:
conversion-action table with IDs, where each tag lives in GHL settings, test
purchase log (date, transaction ID, value seen in Ads), and open issues. Other
ads skills treat an unverified tracking.md as a launch blocker.
