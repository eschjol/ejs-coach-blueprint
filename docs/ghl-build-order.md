# GHL Build Order — Master Snapshot

Build in this order inside your **EJS Blueprint Template** sub-account. Each step depends on the previous.

**Erik:** Use [erik-build-and-dogfood-runbook.md](erik-build-and-dogfood-runbook.md) for pre-filled values and dogfood steps after export.

**Estimated time:** 12–16 hours for v1.0 snapshot

---

## Day 1 — Foundation (3–4 hrs)

### Step 1: Custom values
Settings → Custom Values. Create all keys from [ghl-snapshot-spec.md](ghl-snapshot-spec.md) §1 plus:

| Key | Example |
|-----|---------|
| `coach_name` | Erik Schjolberg |
| `coach_title` | PGA Teaching Professional |
| `city` | Scottsdale |
| `state` | AZ |
| `venue_name` | McCormick Ranch Golf Club |
| `venue_address` | 7505 E McCormick Pkwy |
| `phone_display` | (480) 861-9370 |
| `email` | erik@ejsgolf.com |
| `intro_lesson_price` | Free |
| `private_lesson_price` | $150 |
| `google_review_link` | (GBP review URL) |
| `booking_url` | (intro funnel URL) |
| `instagram_url` | |

### Step 2: Tags
Settings → Tags. Create all tags from snapshot spec §2.

### Step 3: Custom fields (contacts)
Settings → Custom Fields. Create contact fields from snapshot spec §1.

### Step 4: Pipeline
Opportunities → Pipelines → **Golf Coach Journey**. Stages from snapshot spec §3.

---

## Day 2 — Calendars & payments (2–3 hrs)

### Step 5: Connect Stripe
Settings → Payments → Stripe. Connect agency or per-sub-account Stripe.

### Step 6: Build 6 calendars
Calendars → Create each calendar from snapshot spec §4.

For each calendar:
- Duration, buffer, availability (placeholder Mon–Sat 9–5)
- Confirmation SMS + email (use templates from `ghl/copy/`)
- Reminders: 24h email+SMS, 2h SMS
- Stripe payment where applicable

### Step 7: Google Calendar sync
Connect Google Calendar for Erik's test account. Verify two-way sync.

**Test:** Book intro lesson on funnel → appears on GCal → reminders scheduled.

---

## Day 3 — Funnels & website (3–4 hrs)

### Step 8: Intro lesson funnel
Sites → Funnels → New → **Intro Lesson**
(copy from `ghl/funnel/intro-lesson.md`)

### Step 8b: Coach intake survey (Erik's marketing account only)
Sites → Funnels → New → **EJS Coach Blueprint — Apply**
(copy from `ghl/funnel/coach-intake-survey.md`)

Build in Erik's marketing sub-account, not the coach template. Export as `EJS-Agency-Marketing-v1`.

### Step 9: Package funnel
3-step funnel: Package selection → Stripe checkout → Thank you.

### Step 10: Online lesson funnel
Explainer page → Online calendar → Upload instructions email.

### Step 11: Website SEO pages (Growth tier pages — include in snapshot)
Sites → Website → Create pages from [ghl/website/seo-pages.md](../ghl/website/seo-pages.md).

Use placeholder `{{custom_values.city}}` in titles where GHL supports merge in site builder, or swap manually per coach during onboarding.

---

## Day 4 — Workflows (3–4 hrs)

Build in this order (workflows reference calendars and tags):

| Order | Workflow | Spec |
|-------|----------|------|
| 1 | WF-01 New Lead Instant Response | snapshot §6 |
| 2 | WF-02 Missed Call Text-Back | snapshot §6 |
| 3 | WF-03 Appointment Reminders | snapshot §6 (may overlap calendar defaults — avoid duplicates) |
| 4 | WF-04 Post-Lesson Review | snapshot §6 |
| 5 | WF-05 Intro → Package Nurture | snapshot §6 |
| 6 | WF-06 Lapsed Win-Back | snapshot §6 |
| 7 | WF-07 Conversation AI Handoff | snapshot §6 |
| 8 | WF-08 Monthly Coach Report | snapshot §6 |

**Copy for SMS/email:** [ghl/copy/sms-templates.md](../ghl/copy/sms-templates.md), [ghl/copy/email-templates.md](../ghl/copy/email-templates.md)

**Test each workflow** with a test contact and your own phone before moving on.

---

## Day 5 — AI, reputation, social (2–3 hrs)

### Step 12: Conversation AI
Settings → Conversation AI. Configure from [ghl/conversation-ai/bot-training.md](../ghl/conversation-ai/bot-training.md).

Test intents: book, price, location, hours, speak to coach.

### Step 13: Reputation
Connect Google Business Profile (Erik's for template). Link review URL custom value.

### Step 14: Social Planner
Pre-create 12 posts from [ghl/copy/social-posts.md](../ghl/copy/social-posts.md) as drafts.

### Step 15: Email/SMS template library
Settings → Templates. Import all EJS-prefixed templates from `ghl/copy/`.

---

## Day 6 — Test & export (2 hrs)

Run full test journey:

1. [ ] Meta/Google lead form submit → WF-01 fires
2. [ ] Missed call → text-back in 30s
3. [ ] Book intro → confirmation + reminders
4. [ ] Mark complete → review SMS
5. [ ] Tag intro_attended → nurture sequence
6. [ ] Conversation AI answers 5 test questions
7. [ ] Stripe test payment on package funnel
8. [ ] All links use branded domain (no gohighlevel.com leaks)

**Export:** Agency → Snapshots → `EJS-Coach-Blueprint-v1`

Delete test contacts. Document any coach-specific placeholders in onboarding SOP.

---

## After export

1. Create Erik's live sub-account → apply snapshot → customize
2. Follow [ghl-dogfood-ejsgolf.md](ghl-dogfood-ejsgolf.md)
3. Onboard first beta coach via [coach-onboarding-sop.md](coach-onboarding-sop.md)
