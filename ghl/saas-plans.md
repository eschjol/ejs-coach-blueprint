# GHL SaaS Plans — Coach Billing

Configure in **Agency View → SaaS Configurator**. Each plan creates a sub-account with snapshot + billing.

---

## Plan 1: Front Desk — $197/mo

| Setting | Value |
|---------|-------|
| Snapshot | EJS-Coach-Blueprint-v1 |
| Tag on create | `tier-front-desk` |

**Enable in sub-account:**
- Calendars (all 6)
- Conversation AI
- Workflows: WF-01, WF-02, WF-03, WF-04, WF-07
- Intro funnel only
- SMS + email

**Disable / hide from coach:**
- Social Planner (optional lock)
- Ads manager
- Website SEO pages (can exist but not maintained by Erik)

**Rebilling:** SMS, email at cost + 20% markup

---

## Plan 2: Growth — $397/mo

| Setting | Value |
|---------|-------|
| Snapshot | EJS-Coach-Blueprint-v1 |
| Tag on create | `tier-growth` |

**Everything in Front Desk, plus:**
- Full website + SEO pages
- Social Planner (12 templates)
- Workflows: WF-05, WF-06, WF-08 (content approval)
- Reputation / Google reviews
- Nurture sequences

**Erik delivers:**
- 8 SEO pages customized on onboarding
- 4 social posts/month (approval via SMS)

---

## Plan 3: Autopilot — $597/mo

| Setting | Value |
|---------|-------|
| Snapshot | EJS-Coach-Blueprint-v1 |
| Tag on create | `tier-autopilot` |

**Everything in Growth, plus:**
- Meta + Google ads (Erik managed)
- Monthly 15-min strategy call
- Monthly performance SMS report (WF-08)
- Blog 1x/month
- Priority support

**Ad spend:** Billed separately to coach (Erik markup 15–20% on management, pass-through ad spend)

---

## Setup fee — $997 one-time

Options:
1. First invoice line item in SaaS signup
2. Separate Stripe payment before sub-account creation
3. GHL one-time product in funnel

**Includes:** 60-min onboarding, calendar/GBP/Stripe wiring, first month content loaded, test booking verified.

---

## Automated sub-account creation flow

1. Coach pays via SaaS signup page (GHL-built or external Stripe → webhook)
2. GHL creates sub-account
3. Snapshot applied automatically
4. Welcome email + Erik notified for onboarding call
5. Erik completes customization per [coach-onboarding-sop.md](../docs/coach-onboarding-sop.md)

---

## Rebilling defaults (agency level)

| Usage | Markup suggestion |
|-------|-------------------|
| SMS (US) | Cost + $0.01–0.02/msg |
| Email | Cost + 10% |
| AI / LC Phone minutes | Cost + 15% |
| Phone numbers | Pass-through |

Review monthly — adjust as coach volume scales.

---

## Beta pricing (first 5 coaches)

| Plan | Beta price | Duration |
|------|------------|----------|
| Growth | $197/mo | 3 months |
| Autopilot | $397/mo | 3 months |
| Setup | $497 | one-time |

Tag contacts `beta-coach` for case study follow-up.
