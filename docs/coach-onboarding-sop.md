# Coach Onboarding SOP — EJS Coach Blueprint (GHL)

**Time:** 2–3 hours per coach (after snapshot is built)  
**Owner:** Erik or trained VA  
**Prerequisite:** Master snapshot `EJS-Coach-Blueprint-v1` exported in agency

---

## Phase 0: Pre-sale (before sub-account)

- [ ] Coach completes **Intake Form** (see below)
- [ ] Coach signs service agreement (tier, monthly fee, setup fee, 30-day terms)
- [ ] Collect first month + setup fee via Stripe invoice or GHL SaaS billing
- [ ] Confirm coach has: Google Business Profile (or willing to create), professional headshot, lesson pricing

---

## Phase 1: Create sub-account (15 min)

1. Agency View → Sub-Accounts → **Create Sub-Account**
2. Name: `{Coach Last Name} Golf` (e.g., `Smith Golf`)
3. Apply snapshot: **EJS-Coach-Blueprint-v1**
4. Set timezone, business phone (provision Twilio/LC number or port)
5. Assign coach user (limited permissions — Conversations, Calendar, Contacts only if they want login)
6. Configure **API/Branded Domain** for this sub-account if using custom links

---

## Phase 2: Brand & content (45 min)

### Custom values (Settings → Custom Values)

| Key | Value |
|-----|-------|
| `coach_name` | |
| `coach_title` | PGA Professional / Golf Instructor |
| `city` | |
| `state` | |
| `venue_name` | |
| `venue_address` | |
| `phone_display` | |
| `email` | |
| `intro_lesson_price` | |
| `private_lesson_price` | |
| `google_review_link` | |
| `instagram_url` | |
| `primary_color` | |

### Funnel & website

- [ ] Replace hero photo on intro funnel
- [ ] Update bio paragraph (use coach intake answers)
- [ ] Swap testimonials (coach's own or use placeholders until collected)
- [ ] Set funnel domain: `{coachname}.ejsgolf.com` or coach's domain (CNAME to GHL)
- [ ] Publish website pages; verify `/golf-lessons-{city}` title and meta

### Calendars

- [ ] Set availability blocks per coach schedule
- [ ] Connect Google Calendar sync (two-way if coach uses GCal)
- [ ] Set Stripe for each paid calendar
- [ ] Test book → pay → confirmation

---

## Phase 3: Comms & AI (30 min)

- [ ] Provision local phone number (match area code when possible)
- [ ] Enable SMS compliance (A2P registration if not at agency level)
- [ ] Train Conversation AI with coach-specific pricing/hours/venue
- [ ] Test 5 intents: book, price, location, hours, human handoff
- [ ] Set coach notification number for handoffs and daily digests
- [ ] Enable missed-call text-back workflow

---

## Phase 4: Reputation & ads (30 min — Growth/Autopilot)

- [ ] Connect Google Business Profile
- [ ] Verify review link in WF-04
- [ ] Load 4 social posts into planner (approve first month)
- [ ] **Autopilot only:** Launch Meta lead ad (duplicate template, swap creative + geo)
- [ ] **Autopilot only:** Launch Google Search campaign or LSA if eligible

---

## Phase 5: Go-live (15 min)

- [ ] Send coach **Welcome Kit** email:
  - Booking link (primary CTA)
  - Phone number students will text
  - "What happens when someone contacts you" (1-page PDF)
  - Optional login credentials
- [ ] Add booking link to coach's existing site / GBP / Instagram bio (or Erik does it)
- [ ] Place 1 test booking end-to-end; cancel test appointment
- [ ] Schedule 30-day check-in call

---

## Phase 6: 30-day success check

| Metric | Target |
|--------|--------|
| Intro bookings | ≥ 3 in first 30 days (with ads) or ≥ 1 organic |
| Review requests sent | 100% of completed lessons |
| AI deflection rate | ≥ 50% of inbound SMS handled without coach |
| Coach login | Not required — but confirm coach reads SMS summaries |

---

## Intake form fields (send before setup call)

**Coach info**
- Full name, email, mobile, city/state
- Headshot (file upload)
- Bio (3–5 sentences) or link to existing site
- Credentials (PGA, certifications)

**Business**
- Venue name(s) and address(es)
- Lesson types offered (check all)
- Pricing: intro, private, packages, junior, playing, online
- Current booking method (phone, text, app name)
- Tools they want to keep (CoachNow, V1, TrackMan, etc.)

**Marketing**
- Google Business Profile URL (or "need help creating")
- Instagram/Facebook URLs
- Existing website URL (if any)
- Target student: beginner, junior, competitive, women, seniors
- Monthly ad budget (Autopilot tier)

**Availability**
- Days/times available for lessons
- Blackout dates
- Travel time between venues (if multi-location)

---

## Coach welcome SMS (send on go-live)

```
Hi {First Name} — your EJS Coach Blueprint system is live.

Your booking link: {link}
Your business line: {phone}

When someone texts or calls, the system responds and books them. You'll get a text when a human is needed.

Questions? Reply here or call Erik at {erik_phone}.
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| SMS not delivering | Check A2P / 10DLC registration |
| Calendar double-bookings | Verify buffer times + GCal sync direction |
| AI gives wrong price | Update Conversation AI training + custom values |
| Coach overwhelmed by notifications | Reduce to daily digest only; disable real-time except handoffs |
| Venue uses separate bay booking | Read-only import or manual block on GHL calendar |

---

## Snapshot update policy

When Erik releases v1.1+:
- New coaches get latest snapshot on create
- Existing coaches: agency pushes selective workflow updates (document changelog)
- Never overwrite coach custom content without backup
