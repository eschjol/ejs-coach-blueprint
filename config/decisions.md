# Product Decisions — EJS Coach Blueprint

Locked decisions for implementation (per product plan).

## Brand

**Selected:** EJS Coach Blueprint  
**Tagline:** The system behind Scottsdale's #1 coach — now yours.  
**Neutral brand fallback:** Fairway Front Desk (future scale)

## Business model

**Selected:** Hybrid  
- Self-serve core platform (booking, AI front desk, reminders)  
- White-glove setup tier ($997 one-time)  
- Managed ads on Amplify tier ($499/mo)

## Pricing tiers

| Tier | Price | Includes |
|------|-------|----------|
| Blueprint Core | $149/mo | Scheduling, AI front desk, reminders, review engine, booking page |
| Blueprint Growth | $299/mo | + SEO pages, content autopilot, GBP optimization, nurture |
| Blueprint Amplify | $499/mo | + Google/Meta ads management, quarterly strategy call |
| White-Glove Setup | $997 one-time | 60-min onboarding, calendar/GBP/Stripe wiring |

## MVP scope

**Phase 1 (v1.0):** Front Desk + Scheduling — booking funnel, Stripe, calendar sync, Twilio SMS, AI replies  
**Phase 2 (v1.0):** Growth Engine — SEO page factory, review requests, content queue with SMS approval  
**Phase 3 (v1.0):** Ads + Playbook — ad templates, nurture sequences, monthly reports, league templates

All three phases implemented in this codebase; external API keys required for production.

## Integration priority

1. Google Calendar + Stripe + Twilio SMS  
2. Netlify AI Gateway for SMS reply drafting  
3. Google Business Profile (manual link in v1; API in v1.1)

## Delivery note

GHL snapshot docs in `/docs` remain available as an alternate deployment path for coaches Erik sets up manually under his agency. This Netlify app is the **Coach OS platform** referenced in the product plan.
