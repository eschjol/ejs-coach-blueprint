# GHL Snapshot Spec — EJS Coach Blueprint v1

Build this in a **master template sub-account** (not a live client). Test every workflow end-to-end, then export as snapshot: `EJS-Coach-Blueprint-v1`.

---

## 1. Custom fields (Contacts)

| Field | Type | Example |
|-------|------|---------|
| `lesson_type_interest` | Dropdown | Intro, Private, Group, Junior, Playing, Online |
| `handicap_range` | Dropdown | Beginner, Mid, Low, Competitive |
| `package_balance` | Number | 7 |
| `last_lesson_date` | Date | |
| `preferred_venue` | Text | McCormick Ranch |
| `referral_source` | Dropdown | Google, Referral, Instagram, League, Other |
| `intro_attended` | Checkbox | |
| `google_review_left` | Checkbox | |

---

## 2. Tags

```
lead-new
lead-intro-booked
lead-no-show
student-active
student-package
student-lapsed
student-online
review-pending
review-complete
nurture-active
ads-meta
ads-google
coach-vip
```

---

## 3. Pipeline — Golf Coach Student Journey

| Stage | Trigger in | Auto-actions |
|-------|------------|--------------|
| **New Lead** | Form submit, SMS, missed call | Instant SMS: booking link + FAQ |
| **Intro Booked** | Calendar booking (Intro Lesson) | Confirmation SMS/email, reminder序列 |
| **Intro Attended** | Manual tag or workflow after appt | Package offer sequence (24h delay) |
| **Package Buyer** | Payment / tag | Welcome to roster, review ask schedule |
| **Active Student** | Ongoing | Rebook nudges, birthday, lapsed win-back |
| **Lapsed (60+ days)** | No booking 60 days | Win-back SMS + intro discount offer |
| **Online Student** | Online lesson calendar | Async upload instructions email |

---

## 4. Calendars

| Calendar | Duration | Buffer | Payment |
|----------|----------|--------|---------|
| Intro Lesson | 60 min | 15 min before/after | Optional deposit or free consult |
| Private Lesson | 60 min | 15 min | Stripe at booking |
| Playing Lesson | 120 min | 30 min | Stripe at booking |
| Group Clinic | 90 min | — | Stripe, capacity limit |
| Junior Lesson | 45 min | 15 min | Stripe |
| Online Lesson | 45 min | — | Stripe + Zoom link in confirmation |

**Settings:** SMS reminders at 24h and 2h. No-show tag + rebook workflow.

---

## 5. Funnels & websites

### Funnel 1: Intro Lesson (primary — mirror ejsgolf.com)

**Pages:**
1. **Landing** — Hero, social proof, "Book Intro Lesson" CTA, FAQ accordion
2. **Booking** — GHL calendar embed
3. **Thank you** — What to expect, what to bring, add-to-calendar

**Merge fields:** `{{contact.first_name}}`, `{{custom_values.coach_name}}`, `{{custom_values.city}}`, `{{custom_values.venue_address}}`

### Funnel 2: Package Purchase

- 3-pack / 5-pack / 10-pack options
- Stripe one-time or payment plan
- Triggers `student-package` tag + pipeline move

### Funnel 3: Online Lessons

- Explainer + calendar for online SKU
- Upload instructions (video to CoachNow/V1 — link in email, not built in GHL)

### Website (Growth tier)

GHL website with SEO pages (duplicate template, swap city/service):

- `/` — Home
- `/golf-lessons-{city}` — Primary local SEO
- `/junior-golf-lessons-{city}`
- `/online-golf-lessons`
- `/about-{coach_name}`
- `/reviews`
- `/book` — Calendar embed

**SEO per page:** Title `Golf Lessons in {City} | {Coach Name}`, LocalBusiness schema via GHL SEO settings, pricing transparency section.

---

## 6. Workflows (automations)

### WF-01: New Lead Instant Response
- **Trigger:** Form submitted OR inbound SMS OR Facebook lead
- **Actions:** Create/update contact → Send SMS (booking link) → Send email (intro + FAQ) → Add tag `lead-new` → Notify coach (SMS to Erik/coach)

### WF-02: Missed Call Text-Back
- **Trigger:** Inbound call missed
- **Wait:** 30 seconds
- **SMS:** "Sorry I missed you — I'm usually on the lesson tee. Book here: {calendar_link} or reply with your question."

### WF-03: Appointment Reminders
- **Trigger:** Appointment booked
- **24h before:** SMS + email reminder
- **2h before:** SMS only
- **If no-show:** Tag `lead-no-show` → rebook sequence (day 1, 3, 7)

### WF-04: Post-Lesson Review Request
- **Trigger:** Appointment status = showed (manual or automated)
- **Wait:** 2 hours
- **SMS:** "Thanks for today! If you have 30 seconds, a Google review helps other golfers find us: {review_link}"
- **If no review in 5 days:** Gentle reminder once

### WF-05: Intro → Package Nurture
- **Trigger:** Tag `intro_attended` OR pipeline stage "Intro Attended"
- **Day 0:** Email — recap + package options
- **Day 2:** SMS — "Ready to lock in your next sessions?"
- **Day 5:** Email — testimonial + limited-time package offer
- **Day 10:** Final SMS if no purchase

### WF-06: Lapsed Student Win-Back
- **Trigger:** `last_lesson_date` > 60 days ago (scheduled workflow weekly)
- **SMS:** Personal rebook offer
- **Day 3:** Email with new intro/practice tip

### WF-07: Conversation AI Handoff
- **Trigger:** Conversation AI can't answer OR keyword "speak to coach"
- **Action:** Internal notification + SMS to coach with conversation summary

### WF-08: Monthly Coach Report (Autopilot tier)
- **Trigger:** 1st of month
- **Email/SMS to coach:** New leads, bookings, reviews, pipeline summary (use GHL reporting + custom values)

---

## 7. Conversation AI (bot training)

**Bot name:** `{Coach Name}'s Assistant`

**Intents to train:**

| Intent | Sample phrases | Action |
|--------|----------------|--------|
| Book intro | "lesson", "book", "available", "schedule" | Send intro calendar link |
| Pricing | "how much", "cost", "price", "packages" | Send pricing FAQ + booking link |
| Location | "where", "address", "directions", "range" | Send venue address + map link |
| Hours | "when open", "availability", "Thursday" | Check calendar or send booking link |
| Package balance | "lessons left", "how many left" | Lookup custom field (or handoff) |
| Junior / group | "junior", "kids", "group", "clinic" | Send appropriate calendar |
| Online | "online", "zoom", "remote", "not local" | Send online lesson funnel |
| Human | "talk to coach", "call me", "Erik" | Notify coach |

**Tone:** Friendly, concise, golf-native. Not corporate.

**Guardrails:** Never diagnose swing faults. Never quote exact prices if coach flagged "call for pricing" — send range + booking link.

---

## 8. Email & SMS templates

Store in GHL Templates library. Prefix: `EJS-`

Minimum set:
- `EJS-intro-confirmation`
- `EJS-intro-reminder-24h`
- `EJS-intro-reminder-2h`
- `EJS-package-offer`
- `EJS-review-request`
- `EJS-lapsed-winback`
- `EJS-online-lesson-instructions`
- `EJS-welcome-package-buyer`

---

## 9. Reputation (reviews)

- Connect Google Business Profile per sub-account
- Auto review request via WF-04
- Reputation dashboard widget on coach login (optional)

---

## 10. Social planner (Growth tier)

Pre-load 12 post templates (rotate monthly):
- Tip: fix your slice
- Tip: strike the ball first
- Student win (generic, no PII)
- Intro lesson CTA
- Junior golf season
- Online lessons available
- League/community invite
- Before/after handicap story (template)
- Equipment myth bust
- Practice drill at home
- Coach credentials / tech (Trackman etc.)
- Seasonal (spring tune-up, winter online)

Coach approves via SMS: *"Reply 1 to post tomorrow's tip on Instagram."*

---

## 11. Ads (Autopilot tier — managed by Erik)

**Meta lead campaign template:**
- Objective: Leads
- Form: Name, phone, email, "What's your biggest golf challenge?"
- Instant follow-up: WF-01
- Geo: 15-mile radius from coach venue
- Creative: Coach photo + "Book your intro lesson in {City}"

**Google Local / Search template:**
- Keywords: golf lessons {city}, golf instructor near me, beginner golf lessons {city}
- Landing page: Intro funnel
- Call extension → missed call text-back

Store ad copy in `custom_values` for per-coach swap during onboarding.

---

## 12. Snapshot export checklist

Before exporting, verify:

- [ ] Test contact completes intro booking → all reminders fire
- [ ] Missed call triggers text-back (use test number)
- [ ] Review workflow sends (test mode)
- [ ] Conversation AI answers top 5 intents
- [ ] Pipeline stages move correctly on tags
- [ ] Stripe test payment on package funnel
- [ ] All links use sub-account API/branded domain (not gohighlevel.com leaks)
- [ ] Remove test contacts before export

**Export name:** `EJS-Coach-Blueprint-v1`  
**Include:** Workflows, funnels, websites, calendars, pipelines, tags, custom fields, email/SMS templates, Conversation AI config

---

## 13. Version roadmap

| Version | Adds |
|---------|------|
| v1.0 | Core snapshot (this doc) |
| v1.1 | Women's league + duos league funnel modules (from ejsgolf.com) |
| v1.2 | Webinar funnel for online group coaching |
| v2.0 | Snapshot push updates to existing sub-accounts (agency maintenance) |
