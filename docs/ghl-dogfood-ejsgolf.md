# Dogfood on GHL — Erik Schjolberg / ejsgolf.com

Run Erik's entire lead flow through GHL before selling to other coaches.

**Start here:** [erik-build-and-dogfood-runbook.md](erik-build-and-dogfood-runbook.md) — combined snapshot build + dogfood checklist with Erik's values pre-filled.

**Note:** [ejsgolf.com](https://ejsgolf.com) is already on GoHighLevel. Dogfood means aligning that live account with the **EJS-Coach-Blueprint-v1** snapshot (workflows, AI, calendars, booking funnel) — not migrating off another platform.

---

## Goal

Replace manual booking texts + scattered marketing with one GHL sub-account:
**EJS Golf — Erik Schjolberg**

---

## Setup

1. Create sub-account under Erik's agency
2. Apply snapshot `EJS-Coach-Blueprint-v1`
3. Set custom values:

| Key | Value |
|-----|-------|
| coach_name | Erik Schjolberg |
| city | Scottsdale |
| venue_name | McCormick Ranch Golf Club |
| venue_address | 7505 E McCormick Pkwy, Scottsdale, AZ |
| phone_display | (480) 861-9370 |
| email | erik@ejsgolf.com |
| intro_lesson_price | Free |
| private_lesson_price | $150 |
| google_review_link | (Erik's GBP review link) |

4. Provision 480 area code SMS number
5. Connect Stripe + Google Calendar
6. Publish intro funnel at `book.ejsgolf.com` or subdomain

---

## Point ejsgolf.com traffic to GHL

Update [ejsgolf.com](https://ejsgolf.com) CTAs:

| Current | Change to |
|---------|-----------|
| "Book Intro Lesson" buttons | GHL intro funnel URL |
| Phone 480.861.9370 | GHL number (or forward Erik's cell → GHL for missed-call text-back) |
| Contact form (if any) | GHL form → WF-01 |

**Parallel run (2 weeks):** Keep existing flow live while testing GHL. Compare booking volume and response time.

---

## Metrics — 30-day case study

Track in GHL dashboard:

| Metric | How to measure |
|--------|----------------|
| Intro bookings | Calendar → Intro Lesson appointments |
| Lead response time | Conversations → avg first reply time |
| AI deflection | Conversation AI resolved vs handoff |
| Reviews | Reputation → new Google reviews |
| Admin hours saved | Erik self-report (target: 10+ hrs/week) |
| Package conversion | Pipeline: Intro Attended → Package Buyer |

**Case study title:** *How Coach Erik automated his back office with EJS Coach Blueprint (GHL)*

Use for beta coach sales and Proponent Group outreach.

---

## Conversation AI — Erik-specific training

Full copy-paste knowledge base: [ghl/conversation-ai/erik-ejsgolf-knowledge.md](../ghl/conversation-ai/erik-ejsgolf-knowledge.md)

Covers: McCormick Ranch location, lesson types, TrackMan/tech, leagues, philosophy, and SMS-ready FAQ pairs.

---

## Go-live checklist

- [ ] Test booking from phone and desktop
- [ ] Test inbound SMS: "how much", "book lesson", "where are you"
- [ ] Test missed call text-back
- [ ] Complete one lesson → verify review SMS
- [ ] Verify 24h and 2h reminders fire
- [ ] Add GHL booking link to Instagram bio + GBP
- [ ] Erik confirms he receives handoff texts only when needed

---

## Metrics

Track weekly in [dogfood-metrics-tracker.md](dogfood-metrics-tracker.md).

---

## After dogfood

1. Fix anything that broke in snapshot → export v1.0.1
2. Onboard 3 beta coaches at 50% off Growth tier
3. Collect testimonials → raise to full pricing
