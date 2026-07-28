# GHL Master Guide — EJS Coach Blueprint

Everything in the product plan runs inside **GoHighLevel sub-accounts** under Erik's agency. This doc maps each module to the exact GHL feature to configure.

---

## Module map

| Product module | GHL feature | Snapshot asset |
|----------------|-------------|----------------|
| AI Front Desk | Conversation AI + Workflows | `ghl/conversation-ai/bot-training.md` |
| Missed-call text-back | Workflow trigger: Call Status | WF-02 in snapshot spec |
| Smart Scheduling | Calendars (6 types) + Stripe | Calendars section |
| Intro funnel | Funnel builder (3 pages) | `ghl/funnel/intro-lesson.md` |
| Package sales | Funnel + Stripe one-time | Funnel 2 in snapshot spec |
| Student CRM | Contacts + Custom Fields + Tags | Snapshot spec §1–2 |
| Pipeline | Opportunities pipeline | Snapshot spec §3 |
| Review engine | Reputation + Workflow WF-04 | Reputation settings |
| Local SEO | Website pages (duplicate template) | `ghl/website/seo-pages.md` |
| Content autopilot | Social Planner + Workflow approval SMS | WF-08 + social templates |
| Blog | Website blog | `ghl/website/blog-topics.md` |
| Nurture sequences | Workflows WF-05, WF-06 | `ghl/copy/sms-templates.md`, `email-templates.md` |
| Ads | Meta Ads + Google Ads (sub-account) | `ghl/ads/` |
| Monthly report | Workflow WF-08 + GHL reporting | Scheduled 1st of month |
| Coach billing | SaaS Configurator | `ghl/saas-plans.md` |
| White-glove onboarding | Manual + SOP | `docs/coach-onboarding-sop.md` |

---

## Layer 1 — Front Desk (Front Desk tier)

### Conversation AI
- **Location:** Sub-account → Settings → Conversation AI
- **Bot name:** `{{custom_values.coach_name}}'s Assistant`
- **Training:** Copy from [ghl/conversation-ai/bot-training.md](../ghl/conversation-ai/bot-training.md)
- **Actions:** Send calendar link, send custom value (pricing), notify coach on handoff

### Missed call text-back
- **Workflow:** WF-02 — trigger on missed inbound call, wait 30s, send SMS with calendar link
- **GHL path:** Automation → Workflows → Create → Trigger: Call

### Calendars
Build all 6 in **Calendars** before workflows reference them:
1. Intro Lesson (60 min, free or deposit)
2. Private Lesson (60 min, Stripe)
3. Playing Lesson (120 min)
4. Group Clinic (90 min, max attendees)
5. Junior Lesson (45 min)
6. Online Lesson (45 min, Zoom link in confirmation email)

Enable: **SMS reminder 24h + 2h**, Google Calendar sync, buffer times.

### Intro funnel
- **Path:** Sites → Funnels → Intro Lesson
- **Copy:** [ghl/funnel/intro-lesson.md](../ghl/funnel/intro-lesson.md)
- **Page 3:** Calendar widget for Intro Lesson only
- **Domain:** `{coach}.ejsgolf.com/book` or custom domain

---

## Layer 2 — Growth Engine (Growth tier)

### Local SEO website
Duplicate one master page template per service × city. Minimum 8 pages per coach:

| Page slug | Title pattern |
|-----------|---------------|
| `/` | Home |
| `/golf-lessons-{city}` | Golf Lessons in {City} |
| `/junior-golf-lessons-{city}` | Junior Golf Lessons in {City} |
| `/beginner-golf-lessons-{city}` | Beginner Golf Lessons in {City} |
| `/online-golf-lessons` | Online Golf Lessons |
| `/private-golf-lessons-{city}` | Private Golf Lessons in {City} |
| `/about` | About {Coach Name} |
| `/book` | Calendar embed |

**Copy templates:** [ghl/website/seo-pages.md](../ghl/website/seo-pages.md)

**SEO settings per page:** Title, meta description, H1 with city + service. Enable Local Business schema in GHL site settings.

### Reputation (reviews)
- Connect Google Business Profile in **Reputation**
- WF-04 fires 2h after appointment marked complete
- Review link = `{{custom_values.google_review_link}}`

### Social Planner
- Pre-load 12 posts from [ghl/copy/social-posts.md](../ghl/copy/social-posts.md)
- Workflow: weekly SMS to coach — "Reply 1 to approve, 2 to skip"
- On reply `1`: publish scheduled post (manual or workflow if GHL supports inbound SMS trigger)

### Blog
- 1 post/month from [ghl/website/blog-topics.md](../ghl/website/blog-topics.md)
- Cross-link to `/book` on every post

---

## Layer 3 — Autopilot (Autopilot tier)

### Meta ads
- **Location:** Marketing → Facebook / Instagram Ads (or Ads Manager integration)
- **Template:** [ghl/ads/meta-intro-lesson.md](../ghl/ads/meta-intro-lesson.md)
- **Landing page:** Intro funnel
- **Lead form →** WF-01 (instant SMS + email)

### Google ads
- **Template:** [ghl/ads/google-local-search.md](../ghl/ads/google-local-search.md)
- **Landing page:** Intro funnel
- **Call extension** → missed call text-back workflow

### Monthly coach report
- WF-08 on 1st of month
- Pull from GHL dashboard: new contacts, appointments, reputation score
- SMS plain-English summary to coach's mobile

---

## Senior Coach Edition (UX rules)

Built into every sub-account:

1. **SMS-first** — Conversation AI + all notifications to coach's phone
2. **No dashboard required** — coach never needs to log in
3. **Approval via text** — social posts, ad creative (optional)
4. **One setup call** — Erik/VA does everything in onboarding SOP
5. **Large-type** — if coach logs in, use simple calendar + conversations view only

---

## What Erik controls (agency level)

| Task | Where |
|------|-------|
| Create coach sub-account | Agency → Sub-Accounts |
| Apply snapshot | On create or Settings → Snapshots |
| Set SaaS plan + billing | SaaS Configurator |
| Rebill SMS/email usage | Agency → Rebilling |
| Push snapshot updates | Agency → Snapshots → Push to selected accounts |
| Run ads (Autopilot) | Coach sub-account or agency ad account |

---

## Integration with existing coach tools

| Keep | GHL replaces |
|------|--------------|
| CoachNow / V1 (video) | — |
| TrackMan / launch monitor | — |
| ProAgenda / venue bay booking | Optional GCal read-only block |
| Calendly, Acuity | GHL Calendars |
| Mailchimp | GHL Email |
| Wix / Squarespace | GHL Website |
| Google Sheets roster | GHL Contacts |

---

## Version roadmap

| Snapshot | Adds |
|----------|------|
| v1.0 | Core — this guide |
| v1.1 | Women's + Duos league funnels (from ejsgolf.com) |
| v1.2 | Webinar / group online coaching funnel |
| v2.0 | Agency push updates to existing sub-accounts |
