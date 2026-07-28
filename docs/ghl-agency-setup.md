# GHL Agency Setup — Erik Schjolberg

Configure your GHL agency **once** before building the coach snapshot or onboarding clients.

---

## 1. Plan requirement

**Agency Pro ($497/mo)** — required for:
- Snapshots (export/import template sub-accounts)
- SaaS Mode (automated sub-account creation + billing)
- White-label desktop (and mobile app)
- Rebilling markup on SMS, email, AI usage

---

## 2. White-label branding

**Agency View → Settings → Company**

| Setting | Recommended |
|---------|-------------|
| Platform name | EJS Coach Blueprint |
| Logo | EJS Golf logo (light + dark) |
| Primary color | Match ejsgolf.com green/gold |
| Whitelabel domain | `app.ejsgolf.com` (CNAME → whitelabel.ludicrous.cloud) |
| API/branded links domain | `links.ejsgolf.com` (for SMS/email calendar links) |
| Terms & Privacy URLs | ejsgolf.com terms + privacy |

Coaches who log in see **your brand**, never GoHighLevel.

---

## 3. Agency communications (set once, inherit to sub-accounts)

| Channel | Provider | Notes |
|---------|----------|-------|
| SMS | LC Phone / Twilio via GHL | Complete A2P/10DLC registration at agency level |
| Email | Mailgun or LC Email | Set sending domain (e.g. `mail.ejsgolf.com`) |
| Phone | LC Phone | Pool numbers; assign local area code per coach on onboarding |

---

## 4. Master template sub-account

Create a sub-account named **EJS Blueprint Template** (not a paying client).

This is where you build everything before exporting the snapshot:
- All workflows, funnels, calendars, pipelines
- Placeholder custom values (`coach_name`, `city`, etc.)
- Test with your own phone/email

**Do not** use a live coach account as the template.

---

## 5. SaaS Configurator — coach pricing plans

**Agency View → SaaS Configurator**

Create 3 plans matching what coaches pay you:

| Plan name | Monthly price | Snapshot | Features enabled |
|-----------|---------------|----------|------------------|
| Front Desk | $197 | EJS-Coach-Blueprint-v1 | Calendars, Conversation AI, core workflows |
| Growth | $397 | EJS-Coach-Blueprint-v1 | + Website, Social, Reputation, nurture |
| Autopilot | $597 | EJS-Coach-Blueprint-v1 | + Ads access, monthly report workflow |

**Setup fee:** $997 one-time — charge via Stripe invoice or first invoice in SaaS plan.

**Rebilling:** Enable markup on SMS (e.g. cost + 20%), email, AI minutes.

See [ghl/saas-plans.md](../ghl/saas-plans.md) for feature flags per plan.

---

## 6. Snapshot library

After building the template sub-account:

1. Agency View → Snapshots → **Create Snapshot**
2. Name: `EJS-Coach-Blueprint-v1`
3. Include: Workflows, Funnels, Websites, Calendars, Pipelines, Tags, Custom Fields, Templates, Conversation AI

On new coach create → **Apply snapshot** automatically via SaaS plan or manually.

---

## 7. Internal sub-account (Erik's own business)

Create **EJS Golf — Erik Schjolberg** sub-account:
- Apply same snapshot
- Customize for Scottsdale / McCormick Ranch
- Dogfood before selling to other coaches
- See [ghl-dogfood-ejsgolf.md](ghl-dogfood-ejsgolf.md)

---

## 8. Team access

| Role | Access |
|------|--------|
| Erik | Agency admin + all sub-accounts |
| VA (future) | Sub-account setup only, no agency billing |
| Coach client | Their sub-account only — Conversations, Calendar (optional) |

---

## 9. Checklist before first paying coach

- [ ] Agency Pro active
- [ ] White-label domain live (`app.ejsgolf.com`)
- [ ] Branded link domain live (`links.ejsgolf.com`)
- [ ] A2P/10DLC approved for SMS
- [ ] Email sending domain verified
- [ ] Snapshot `EJS-Coach-Blueprint-v1` exported and tested
- [ ] SaaS plans created with correct pricing
- [ ] Erik's dogfood sub-account live with test booking
- [ ] Service agreement + intake form ready
- [ ] Onboarding SOP printed or in Notion for VA

---

## 10. Monthly agency maintenance

- Review rebilling margins
- Push snapshot updates to existing coaches (with changelog)
- Monitor A2P compliance and deliverability
- Audit Conversation AI handoff rate per coach
