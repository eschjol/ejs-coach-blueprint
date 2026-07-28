# EJS Coach Blueprint — Golf Coach AI Business OS

AI-powered business operating system for golf coaches: scheduling, SMS front desk, SEO, content autopilot, ads templates, and nurture sequences.

Built on **Netlify** (Vite + React + Functions + Database).

## Quick start

```bash
npm install
npm run dev          # Frontend at http://localhost:5173
npx netlify dev      # Full stack with functions at http://localhost:8888
```

## Product decisions

See [config/decisions.md](config/decisions.md) — brand (EJS Coach Blueprint), hybrid model, full MVP scope.

## Architecture

| Layer | Implementation |
|-------|----------------|
| Frontend | Vite + React — booking funnel, dashboard, SEO pages, beta signup |
| API | Netlify Functions — book-intro, sms-webhook, review-request, seo-pages |
| Jobs | Scheduled functions — seo-generate, content-generate, coach-report |
| Database | Postgres via Netlify Database + Drizzle ORM |
| AI | Netlify AI Gateway / OpenAI for SMS replies |
| Payments | Stripe Checkout |
| SMS | Twilio |

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Marketing home + pricing tiers |
| `/book/erik-schjolberg` | Intro lesson booking funnel |
| `/dashboard/erik-schjolberg` | Coach dashboard |
| `/golf/:coach/:page` | Local SEO landing pages |
| `/beta` | Beta coach recruitment |

## API endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/book-intro` | POST | Create booking + Stripe checkout |
| `/api/sms-webhook` | POST | Twilio inbound → AI reply |
| `/api/review-request` | POST | Post-lesson review SMS |
| `/api/seo-pages` | GET | List coach SEO pages |

## Docs

- [config/decisions.md](config/decisions.md) — Locked product decisions
- [docs/dogfood-ejsgolf.md](docs/dogfood-ejsgolf.md) — Deploy on Erik's business
- [docs/EJS-COACH-BLUEPRINT-GHL.md](docs/EJS-COACH-BLUEPRINT-GHL.md) — Alternate GHL agency delivery path
- [docs/ghl-snapshot-spec.md](docs/ghl-snapshot-spec.md) — GHL snapshot spec (if using GHL sub-accounts)
- [docs/coach-onboarding-sop.md](docs/coach-onboarding-sop.md) — White-glove onboarding SOP

## Templates

- [templates/seo-pages/](templates/seo-pages/) — Local SEO page templates
- [templates/ads/](templates/ads/) — Meta + Google ad templates
- [templates/nurture/](templates/nurture/) — SMS/email sequences

## Environment

Copy [.env.example](.env.example) and configure in Netlify dashboard.

## GHL alternative

Coaches can also be set up as GHL sub-accounts under Erik's agency — see `/docs` for snapshot spec. This Netlify app is the standalone platform implementation from the product plan.
