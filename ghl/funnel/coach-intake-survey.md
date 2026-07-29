# Coach Intake Survey Funnel — GHL Build Spec

**Purpose:** Coaches apply for EJS Coach Blueprint. Erik collects everything needed for white-glove setup in one form — before the 60-min onboarding call.

**Where it lives:** Erik's **agency marketing sub-account** or **EJS Golf internal sub-account** (not inside coach client sub-accounts).

**Funnel name:** `EJS Coach Blueprint — Apply`  
**Recommended URL:** `apply.ejsgolf.com` or `ejsgolf.com/apply`

---

## Funnel structure (3 pages)

```
Page 1: Landing (sell + CTA)
    ↓
Page 2: Multi-step survey (5 steps)
    ↓
Page 3: Thank you + book setup call
```

---

## Page 1 — Landing

### Hero
**Headline:** Run Your Golf Business on Autopilot  
**Subheadline:** I set you up on my system. You teach golf. AI handles scheduling, follow-up, reviews, and marketing.

**CTA button:** Apply Now → Page 2

### Trust
Built by **Erik Schjolberg** — Scottsdale's #1 rated golf instructor. The same system running my academy at McCormick Ranch.

### What you get (3 columns)

| | |
|--|--|
| **Front Desk AI** | SMS replies, missed-call text-back, instant booking — students never wait hours for a reply. |
| **Marketing on autopilot** | SEO pages, reviews, social posts, nurture sequences — without you learning software. |
| **White-glove setup** | I configure everything in a 60-minute call. You don't touch settings. |

### Pricing preview
- Front Desk from **$197/mo**
- Growth from **$397/mo**
- Autopilot from **$597/mo**
- Setup **$997** one-time

### Who this is for
- PGA teaching pros tired of admin and marketing
- Coaches 40+ who don't want another dashboard
- Independent instructors ready to fill their calendar
- Academy owners who want a proven playbook

### FAQ

**Do I have to learn GoHighLevel?**  
No. Most coaches never log in. Everything runs via text and email.

**Can I keep CoachNow or V1?**  
Yes — this handles business operations, not swing video.

**How long until I'm live?**  
48 hours after your setup call, typically.

**CTA:** Apply Now → Page 2

---

## Page 2 — Multi-step survey

Build as **GHL Survey** (multi-step) or **Form** with sections. Recommended: **5-step survey** for mobile-friendly completion.

### Step 1 of 5 — About you

| Field | GHL type | Required | Maps to contact field |
|-------|----------|----------|------------------------|
| First name | Text | Yes | `first_name` |
| Last name | Text | Yes | `last_name` |
| Email | Email | Yes | `email` |
| Mobile | Phone | Yes | `phone` |
| City | Text | Yes | Custom: `coach_city` |
| State | Dropdown (US states) | Yes | Custom: `coach_state` |
| Headshot | File upload | Yes | Custom: `coach_headshot` |
| Bio (3–5 sentences) | Textarea | Yes | Custom: `coach_bio` |
| Or link to existing website | URL | No | Custom: `coach_website_url` |
| Credentials | Multi-select | Yes | Custom: `coach_credentials` |

**Credentials options:**
- PGA Member
- PGA Apprentice
- LPGA
- TPI Certified
- TrackMan Certified
- Other (text field)

**Button:** Next → Step 2

---

### Step 2 of 5 — Your business

| Field | GHL type | Required | Maps to |
|-------|----------|----------|---------|
| Primary venue name | Text | Yes | Custom: `venue_name` |
| Venue address | Text | Yes | Custom: `venue_address` |
| Second venue (if any) | Text | No | Custom: `venue_name_2` |
| Second venue address | Text | No | Custom: `venue_address_2` |
| Lesson types offered | Multi-checkbox | Yes | Custom: `lesson_types` |

**Lesson types:**
- [ ] Intro / assessment lesson
- [ ] Private lesson
- [ ] Playing lesson
- [ ] Group clinic
- [ ] Junior lesson
- [ ] Online lesson

| Field | GHL type | Required |
|-------|----------|----------|
| Intro lesson price | Dropdown | Yes |
| Private lesson price (60 min) | Text | Yes |
| 3-pack price | Text | No |
| 5-pack price | Text | No |
| 10-pack price | Text | No |
| Junior lesson price | Text | No |
| Playing lesson price | Text | No |
| Online lesson price | Text | No |
| Current booking method | Dropdown | Yes |
| Tools you want to keep | Multi-checkbox | No |

**Intro lesson price options:**
- Free intro lesson
- $XX (text field if paid)
- Complimentary with deposit

**Current booking method:**
- Phone / text manually
- Calendly
- Acuity
- Bookeo / other app
- ProAgenda / venue system
- No online booking yet

**Tools to keep:**
- [ ] CoachNow
- [ ] V1 Sports
- [ ] TrackMan
- [ ] FlightScope / Foresight
- [ ] None — replace everything

**Button:** Next → Step 3

---

### Step 3 of 5 — Marketing & visibility

| Field | GHL type | Required | Maps to |
|-------|----------|----------|---------|
| Google Business Profile URL | URL | No | Custom: `gbp_url` |
| Don't have GBP — need help | Checkbox | No | Tag: `needs-gbp-setup` |
| Instagram URL | URL | No | Custom: `instagram_url` |
| Facebook URL | URL | No | Custom: `facebook_url` |
| Existing website URL | URL | No | Custom: `website_url` |
| Primary student audience | Multi-checkbox | Yes | Custom: `target_audience` |
| Biggest marketing headache today | Textarea | Yes | Custom: `marketing_pain` |

**Target audience:**
- [ ] Beginners / high handicap
- [ ] Juniors
- [ ] Competitive / low handicap
- [ ] Women
- [ ] Seniors
- [ ] Online / remote students

**Button:** Next → Step 4

---

### Step 4 of 5 — Availability & plan

| Field | GHL type | Required | Maps to |
|-------|----------|----------|---------|
| Days available for lessons | Multi-checkbox | Yes | Custom: `availability_days` |
| Typical start time | Dropdown | Yes | Custom: `availability_start` |
| Typical end time | Dropdown | Yes | Custom: `availability_end` |
| Blackout dates or notes | Textarea | No | Custom: `blackout_notes` |
| Multi-location travel time | Dropdown | No | Custom: `travel_time` |
| Plan interested in | Radio | Yes | Custom: `plan_tier` |
| Monthly ad budget (if Autopilot) | Dropdown | Conditional | Custom: `ad_budget` |

**Days:** Mon Tue Wed Thu Fri Sat Sun

**Plan options:**
- Front Desk — $197/mo (scheduling + AI front desk)
- Growth — $397/mo (+ SEO, social, nurture)
- Autopilot — $597/mo (+ I run your ads)
- Not sure — help me choose

**Ad budget (show if Autopilot selected):**
- $300–500/mo
- $500–1,000/mo
- $1,000+/mo
- Not ready for ads yet

**Button:** Next → Step 5

---

### Step 5 of 5 — Final details

| Field | GHL type | Required | Maps to |
|-------|----------|----------|---------|
| How did you hear about us? | Dropdown | Yes | Custom: `referral_source` |
| Anything else for setup call? | Textarea | No | Custom: `setup_notes` |
| I agree to monthly service terms | Checkbox | Yes | Tag: `terms-accepted` |
| Ready for $997 setup + first month | Checkbox | Yes | Tag: `payment-acknowledged` |

**Referral source:**
- Erik Schjolberg / ejsgolf.com
- Proponent Group
- PGA event / summit
- TrackMan / Foresight network
- Another coach referral
- Instagram / social
- Other

**Submit button:** Submit Application

---

## Page 3 — Thank you

### Headline
You're in — welcome to EJS Coach Blueprint.

### Body
Thanks, {{contact.first_name}}! I received your application and will review it within 24 hours.

**Next step:** Book your 60-minute white-glove setup call. We'll connect your calendar, phone line, payments, and Google listing — everything.

### Embed
**Setup Call calendar** — Erik's "Coach Onboarding" calendar (90 min block)

### What to have ready
- Headshot (if not uploaded)
- Logo or brand colors (optional)
- Stripe or bank info for payments
- Google account access (for Business Profile)

### Confirmation copy
You'll receive a confirmation email and text shortly. Questions? Reply to the text or email erik@ejsgolf.com.

**Secondary CTA:** Watch 2-min overview video (optional — link to Loom or ejsgolf.com)

---

## Contact custom fields to create (prospect pipeline)

Create these in the **agency/marketing sub-account** before building the form:

```
coach_city          Text
coach_state         Text
coach_headshot      File
coach_bio           Large text
coach_website_url   URL
coach_credentials   Text
venue_name          Text
venue_address       Text
venue_name_2        Text
venue_address_2     Text
lesson_types        Text
intro_lesson_price  Text
private_lesson_price Text
package_3_price     Text
package_5_price     Text
package_10_price    Text
junior_lesson_price Text
playing_lesson_price Text
online_lesson_price Text
current_booking_method Text
tools_to_keep       Text
gbp_url             URL
instagram_url       URL
facebook_url        URL
website_url         URL
target_audience     Text
marketing_pain      Text
availability_days   Text
availability_start  Text
availability_end    Text
blackout_notes      Text
travel_time         Text
plan_tier           Text
ad_budget           Text
referral_source     Text
setup_notes         Text
```

---

## Pipeline — Coach Prospects

| Stage | Trigger |
|-------|---------|
| **Applied** | Survey submitted |
| **Setup call booked** | Onboarding calendar booked |
| **Onboarding scheduled** | 24h before call |
| **Sub-account created** | Manual after call |
| **Live** | Go-live checklist complete |
| **Lost** | No response / declined |

---

## Workflows on submit

### WF-INTAKE-01: Application received

**Trigger:** Form / Survey submitted (Coach Intake)

**Actions:**
1. Create/update contact
2. Add tag `coach-prospect`
3. Add tag `plan-{tier}` based on plan_tier field (e.g. `plan-growth`)
4. If `needs-gbp-setup` checked → tag `needs-gbp-setup`
5. Move to pipeline **Coach Prospects → Applied**
6. Send SMS → [EJS-intake-confirmation](../copy/sms-templates.md#ejs-intake-confirmation)
7. Send email → [EJS-intake-confirmation-email](../copy/email-templates.md#ejs-intake-confirmation-email)
8. Internal notification → Erik (SMS + email): "New coach application: {{contact.first_name}} {{contact.last_name}} — {{custom_values.plan_tier}} — {{custom_values.coach_city}}"
9. Create task for Erik: "Review application — {{contact.first_name}}" due in 24h

### WF-INTAKE-02: Setup call booked

**Trigger:** Appointment booked on "Coach Onboarding" calendar

**Actions:**
1. Move pipeline → Setup call booked
2. Send SMS with prep checklist
3. Send email with Zoom/link + what to prepare

### WF-INTAKE-03: No setup call (24h nudge)

**Trigger:** Tag `coach-prospect` + no onboarding appointment + 24h since submit

**Actions:**
1. SMS: "Hey {{contact.first_name}} — still need to book your setup call: {{custom_values.onboarding_calendar_url}}"

---

## Calendar — Coach Onboarding

| Setting | Value |
|---------|-------|
| Name | EJS Coach Blueprint — Setup Call |
| Duration | 60 min |
| Buffer | 15 min |
| Location | Zoom link in confirmation |
| Assignee | Erik (or VA) |

Embed on thank-you page (Page 3).

---

## GHL build steps (quick)

1. **Settings → Custom Fields** — create all fields above
2. **Settings → Tags** — `coach-prospect`, `plan-front-desk`, `plan-growth`, `plan-autopilot`, `needs-gbp-setup`, `terms-accepted`
3. **Opportunities → Pipeline** — Coach Prospects (6 stages)
4. **Sites → Funnels → New** — 3 pages per this doc
5. **Page 2** — Add Survey element, configure 5 steps with fields mapped to custom fields
6. **Calendars** — Create Coach Onboarding calendar
7. **Automations** — WF-INTAKE-01, 02, 03
8. **Templates** — Add intake SMS/email from copy folder
9. **Test** — Submit with test data → verify Erik notification + confirmation
10. **Domain** — Publish at `apply.ejsgolf.com`

---

## After submission — Erik's prep (before setup call)

Pull from contact record into onboarding checklist:

| Survey field | Used in sub-account setup |
|--------------|---------------------------|
| coach_city, venue_*, pricing | Custom values |
| lesson_types | Calendars to enable |
| availability_* | Calendar blocks |
| plan_tier | SaaS plan to assign |
| gbp_url, social URLs | Reputation + social |
| marketing_pain | Ad strategy notes |
| headshot, bio | Funnel + website |

Full sub-account setup: [coach-onboarding-sop.md](../../docs/coach-onboarding-sop.md)

---

## Snapshot note

This funnel lives in **Erik's marketing sub-account**, not in `EJS-Coach-Blueprint-v1` coach snapshot. Export separately as `EJS-Agency-Marketing-v1` or keep only in Erik's account.
