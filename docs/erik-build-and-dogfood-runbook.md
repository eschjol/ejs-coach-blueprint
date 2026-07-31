# Erik's Build & Dogfood Runbook

One document for both jobs: build **EJS-Coach-Blueprint-v1** in your template sub-account, then dogfood it on **ejsgolf.com** before selling to other coaches.

**Important:** [ejsgolf.com](https://ejsgolf.com) is already hosted on GoHighLevel (LeadConnector). Dogfood is not "move to GHL" — it is **align your live account with the Blueprint snapshot** so it becomes the proof-of-concept other coaches get.

---

## Before you start (30 min)

| Item | Where | Status |
|------|-------|--------|
| Agency Pro ($497/mo) | GHL billing | Required for snapshots |
| A2P/10DLC approved | Agency → Phone → Trust Center | Required for SMS |
| White-label domain | `app.ejsgolf.com` → CNAME whitelabel | Optional for dogfood, required before beta coaches |
| Branded links domain | `links.ejsgolf.com` | Calendar URLs in SMS must not show gohighlevel.com |
| Template sub-account | **EJS Blueprint Template** | Build snapshot here first |
| Live sub-account | **EJS Golf — Erik Schjolberg** | Dogfood here after export |

**Repo assets:** Open `/ghl/` on GitHub while building. Every template, funnel page, and bot prompt is copy-paste ready.

---

## Part A — Build the snapshot (6 days)

Follow [ghl-build-order.md](ghl-build-order.md) in the template sub-account. Use Erik values below as placeholders while building (swap per coach during onboarding).

### Erik placeholder custom values (template + dogfood)

Paste into **Settings → Custom Values** in the template account:

| Key | Erik value |
|-----|------------|
| `coach_name` | Erik Schjolberg |
| `coach_title` | PGA Teaching Professional |
| `city` | Scottsdale |
| `state` | AZ |
| `venue_name` | McCormick Ranch Golf Club |
| `venue_address` | 7505 E McCormick Pkwy, Scottsdale, AZ 85258 |
| `phone_display` | (480) 861-9370 |
| `email` | erik@ejsgolf.com |
| `intro_lesson_price` | Free |
| `private_lesson_price` | $150 |
| `google_review_link` | *(paste GBP review URL — see below)* |
| `booking_url` | `https://book.ejsgolf.com` *(set after funnel publish)* |
| `instagram_url` | https://instagram.com/ejsgolf |
| `primary_color` | `#ff914e` |

**Get Google review link:** Google Business Profile → Ask for reviews → copy short link. Erik's listing: [EJS Golf on Google Maps](https://www.google.com/maps/place/EJS+Golf+-+Coach+Erik+%7C+Scottsdale+Golf+Lessons+-+McCormick+Ranch+G.+C.).

### Day-by-day checklist

#### Day 1 — Foundation
- [ ] Custom values (table above + [ghl-snapshot-spec.md](ghl-snapshot-spec.md) §1 fields)
- [ ] Tags ([ghl-snapshot-spec.md](ghl-snapshot-spec.md) §2)
- [ ] Contact custom fields ([ghl-snapshot-spec.md](ghl-snapshot-spec.md) §1)
- [ ] Pipeline **Golf Coach Student Journey** ([ghl-snapshot-spec.md](ghl-snapshot-spec.md) §3)

#### Day 2 — Calendars & payments
- [ ] Stripe connected (Settings → Payments)
- [ ] 6 calendars built ([ghl-snapshot-spec.md](ghl-snapshot-spec.md) §4)
- [ ] Confirmation + reminder SMS/email from [ghl/copy/sms-templates.md](../ghl/copy/sms-templates.md) and [email-templates.md](../ghl/copy/email-templates.md)
- [ ] Google Calendar two-way sync
- [ ] **Test:** Book intro on calendar → appears on GCal → reminders scheduled

#### Day 3 — Funnels & website
- [ ] Intro funnel from [ghl/funnel/intro-lesson.md](../ghl/funnel/intro-lesson.md)
- [ ] Package funnel (3-pack / 5-pack / 10-pack + Stripe)
- [ ] Online lesson funnel
- [ ] SEO website pages from [ghl/website/seo-pages.md](../ghl/website/seo-pages.md)
- [ ] Coach intake survey in **agency marketing account** only ([ghl/funnel/coach-intake-survey.md](../ghl/funnel/coach-intake-survey.md)) → export as `EJS-Agency-Marketing-v1`

#### Day 4 — Workflows (build in this order)

| # | Workflow | Copy from |
|---|----------|-----------|
| 1 | WF-01 New Lead Instant Response | [ghl-snapshot-spec.md](ghl-snapshot-spec.md) §6 |
| 2 | WF-02 Missed Call Text-Back | §6 + `EJS-missed-call-textback` |
| 3 | WF-03 Appointment Reminders | §6 *(avoid duplicating calendar defaults)* |
| 4 | WF-04 Post-Lesson Review | §6 + `EJS-review-request` |
| 5 | WF-05 Intro → Package Nurture | §6 |
| 6 | WF-06 Lapsed Win-Back | §6 |
| 7 | WF-07 Conversation AI Handoff | §6 |
| 8 | WF-08 Monthly Coach Report | §6 |

Test each workflow with your own phone before moving on.

#### Day 5 — AI, reputation, social
- [ ] Conversation AI from [ghl/conversation-ai/bot-training.md](../ghl/conversation-ai/bot-training.md)
- [ ] Erik-specific knowledge from [ghl/conversation-ai/erik-ejsgolf-knowledge.md](../ghl/conversation-ai/erik-ejsgolf-knowledge.md)
- [ ] Google Business Profile connected (Reputation)
- [ ] 12 Social Planner drafts from [ghl/copy/social-posts.md](../ghl/copy/social-posts.md)
- [ ] Import all `EJS-*` templates into Template Library

#### Day 6 — Test & export
Run full test journey ([ghl-build-order.md](ghl-build-order.md) Day 6 checklist).

- [ ] Export snapshot: **EJS-Coach-Blueprint-v1**
- [ ] Delete test contacts before export

---

## Part B — Dogfood on ejsgolf.com

### Option 1 (recommended): Fresh sub-account from snapshot

Best if you want a clean Blueprint install without legacy workflows.

1. Create sub-account **EJS Golf — Erik Schjolberg**
2. Apply snapshot **EJS-Coach-Blueprint-v1**
3. Set custom values (table above)
4. Provision **480** area code SMS number
5. Connect Stripe + Google Calendar
6. Publish intro funnel at `book.ejsgolf.com`

### Option 2: Upgrade existing ejsgolf.com GHL site

Use if you want to keep current pages/design and add Blueprint automations.

1. Audit current sub-account: list existing workflows, calendars, forms
2. Import missing Blueprint pieces only (workflows WF-01–WF-08, tags, pipeline, Conversation AI)
3. Point all "Book Intro Lesson" buttons to one canonical intro calendar
4. Disable duplicate reminder workflows (calendar + WF-03 overlap)
5. Add Erik bot knowledge ([erik-ejsgolf-knowledge.md](../ghl/conversation-ai/erik-ejsgolf-knowledge.md))

**Current site pages (already GHL):**
- `/` — home
- `/scottsdale-golf-lessons` — local SEO
- `/online-golf-lessons` — online SKU

**CTA updates:**

| Location | Change |
|----------|--------|
| All "Book Intro Lesson" buttons | → `https://book.ejsgolf.com` (or intro funnel step 2) |
| Phone (480) 861-9370 | GHL number OR forward cell → GHL for missed-call text-back |
| Instagram bio | Booking link |
| Google Business Profile | Booking link + website |
| Contact forms | Trigger WF-01 |

### Domain: book.ejsgolf.com

1. GHL sub-account → Settings → Domains → Add domain `book.ejsgolf.com`
2. DNS (at your registrar):

```
Type: CNAME
Host: book
Value: (GHL-provided target, e.g. sites.ludicrous.cloud)
```

3. Assign domain to Intro Lesson funnel
4. Update `booking_url` custom value to `https://book.ejsgolf.com`
5. Verify SSL active (green lock)

### Phone setup

**Option A — GHL as primary:** Provision 480 number in sub-account. Update website + GBP.

**Option B — Keep Erik's cell public:** Forward `(480) 861-9370` to GHL number; missed-call workflow fires on GHL side.

### Parallel run (2 weeks)

Keep existing booking flow live while testing Blueprint:

| Week | Action |
|------|--------|
| 1 | Route 50% of CTAs to `book.ejsgolf.com`; monitor Conversations for AI + text-back |
| 2 | Route 100%; compare booking count vs prior 2 weeks |
| End | Erik self-report admin hours saved (target: 10+ hrs/week) |

Track metrics in [dogfood-metrics-tracker.md](dogfood-metrics-tracker.md).

---

## Part C — Go-live checklist (Erik)

Run these on your phone before telling anyone:

- [ ] Book intro from iPhone Safari → confirmation SMS + email within 2 min
- [ ] Text GHL number: "how much" → pricing + booking link
- [ ] Text: "book lesson" → calendar link
- [ ] Text: "where are you" → McCormick Ranch address
- [ ] Call number, don't answer → missed-call text within 60 sec
- [ ] Mark test appointment complete → review SMS in 2 hours
- [ ] Verify 24h and 2h reminders (book appt 25+ hours out)
- [ ] Stripe test payment on package funnel
- [ ] Erik receives handoff text only when AI escalates

---

## Part D — After dogfood (sell to beta coaches)

1. Fix anything that broke → export **EJS-Coach-Blueprint-v1.0.1**
2. Publish case study using [dogfood-metrics-tracker.md](dogfood-metrics-tracker.md)
3. Onboard 3 beta coaches at 50% off Growth tier via [coach-onboarding-sop.md](coach-onboarding-sop.md)
4. Collect testimonials → raise to full pricing ($197 / $397 / $597)

**Case study title:** *How Coach Erik automated his back office with EJS Coach Blueprint (GHL)*

---

## Quick reference — file map

| Task | Open this file |
|------|----------------|
| Build order | [ghl-build-order.md](ghl-build-order.md) |
| Technical spec | [ghl-snapshot-spec.md](ghl-snapshot-spec.md) |
| Intro funnel copy | [ghl/funnel/intro-lesson.md](../ghl/funnel/intro-lesson.md) |
| SMS templates | [ghl/copy/sms-templates.md](../ghl/copy/sms-templates.md) |
| Email templates | [ghl/copy/email-templates.md](../ghl/copy/email-templates.md) |
| Bot training | [ghl/conversation-ai/bot-training.md](../ghl/conversation-ai/bot-training.md) |
| Erik bot facts | [ghl/conversation-ai/erik-ejsgolf-knowledge.md](../ghl/conversation-ai/erik-ejsgolf-knowledge.md) |
| Metrics | [dogfood-metrics-tracker.md](dogfood-metrics-tracker.md) |
| Onboard coaches | [coach-onboarding-sop.md](coach-onboarding-sop.md) |
