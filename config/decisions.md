# Product Decisions — EJS Coach Blueprint

## Platform

**Selected: GoHighLevel (GHL) — 100% of delivery**

Every coach is set up as a **sub-account under Erik's GHL agency**. Scheduling, SMS, AI, funnels, SEO pages, reviews, social, ads, and nurture all run inside GHL. No separate custom app required.

| Capability | GHL feature |
|------------|-------------|
| Scheduling + payments | Calendars + Stripe |
| AI front desk | Conversation AI + missed-call text-back |
| CRM + pipeline | Opportunities pipeline |
| Intro funnel | Funnels / Websites |
| Local SEO pages | Website builder (duplicate pages) |
| Reviews | Reputation management |
| Social + blog | Social Planner + Blog |
| Ads | Meta + Google integrations (managed by Erik on Autopilot tier) |
| Coach billing | SaaS Mode + rebilling |
| White-label | Agency Pro — `app.ejsgolf.com` or custom domain |

## Brand

**EJS Coach Blueprint** — "The system behind Scottsdale's #1 coach — now yours."

## Business model

**Hybrid:** GHL sub-account per coach + white-glove setup ($997) + optional managed ads.

## Pricing (what coaches pay Erik)

| Tier | Price | GHL snapshot tier tag |
|------|-------|------------------------|
| Front Desk | $197/mo | `tier-front-desk` |
| Growth | $397/mo | `tier-growth` |
| Autopilot | $597/mo | `tier-autopilot` |
| Setup | $997 one-time | — |

Configure matching plans in **GHL SaaS Configurator** for automated billing and sub-account creation.

## Erik's agency requirements

- **GHL Agency Pro** (~$497/mo) — snapshots, SaaS mode, white-label, rebilling
- Master template sub-account → export **EJS-Coach-Blueprint-v1**
- Agency-level Twilio/Mailgun/LC Phone for branded comms

## Reference code (not production)

The `/src` and `/netlify` folders are an earlier prototype. **Do not deploy for coaches.** All production delivery is GHL. See [docs/archive-netlify-reference.md](docs/archive-netlify-reference.md).
