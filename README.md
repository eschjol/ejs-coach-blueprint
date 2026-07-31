# EJS Coach Blueprint — GHL Agency Package

**Everything runs through GoHighLevel.** You set coaches up as sub-accounts under your agency. Each gets a snapshot of Erik's proven playbook: intro funnel, AI front desk, reviews, SEO pages, social, nurture, and (on Autopilot) managed ads.

## Start here

| Doc | What it is |
|-----|------------|
| [docs/ghl-master-guide.md](docs/ghl-master-guide.md) | **Main guide** — how every product module maps to GHL |
| [docs/ghl-agency-setup.md](docs/ghl-agency-setup.md) | Configure your agency (white-label, SaaS mode, rebilling) |
| [docs/ghl-build-order.md](docs/ghl-build-order.md) | Step-by-step: build the master snapshot in GHL |
| [docs/ghl-snapshot-spec.md](docs/ghl-snapshot-spec.md) | Snapshot contents (pipelines, workflows, calendars) |
| [docs/coach-onboarding-sop.md](docs/coach-onboarding-sop.md) | Per-coach setup checklist (2–3 hrs) |
| [docs/ghl-dogfood-ejsgolf.md](docs/ghl-dogfood-ejsgolf.md) | Run Erik's business in GHL first |
| [ghl/](ghl/) | Copy-paste templates (SMS, email, funnel, AI bot, ads) |

## One-line pitch

*"I set you up on my system. You teach golf. AI handles scheduling, follow-up, reviews, ads, and marketing."*

## Architecture

```
Erik's GHL Agency (Agency Pro)
├── Master snapshot: EJS-Coach-Blueprint-v1
├── White-label portal (app.ejsgolf.com)
├── SaaS billing + rebilling
└── Coach sub-accounts (one per client)
    ├── Intro lesson funnel
    ├── 6 calendars + Stripe
    ├── Conversation AI (SMS)
    ├── 8+ workflows
    ├── SEO website pages
    ├── Reputation / reviews
    ├── Social planner
    └── Meta/Google ads (Autopilot)
```

## Package tiers

| Tier | Coach pays | Includes |
|------|------------|----------|
| **Front Desk** | $197/mo | Funnel, calendar, SMS AI, reminders, reviews |
| **Growth** | $397/mo | + SEO site, social planner, nurture, reputation |
| **Autopilot** | $597/mo | + Erik runs ads, monthly call, content approval SMS |
| **Setup** | $997 once | White-glove onboarding per coach |

## Build sequence

1. [Set up your agency](docs/ghl-agency-setup.md) (Agency Pro, white-label, SaaS plans)
2. [Build master snapshot](docs/ghl-build-order.md) using [ghl/copy/](ghl/copy/) templates
3. [Dogfood on Erik](docs/ghl-dogfood-ejsgolf.md) — ejsgolf.com booking → GHL funnel
4. Onboard 3 beta coaches via [coach-onboarding-sop.md](docs/coach-onboarding-sop.md) — they start at [ghl/funnel/coach-intake-survey.md](ghl/funnel/coach-intake-survey.md)

## GHL vs custom app

Coaches never need another platform. CoachNow/V1 stay for swing video only. GHL replaces Calendly, Mailchimp, Wix, manual texting, and spreadsheet tracking.

---

## Install & run (this repository)

**Primary deliverable:** GHL documentation and copy-paste templates in [`docs/`](docs/) and [`ghl/`](ghl/). No install required — open the guides and build in GoHighLevel.

**Optional Netlify prototype** (archived reference in [`docs/archive-netlify-reference.md`](docs/archive-netlify-reference.md)):

```bash
npm install
npm run typecheck   # verify TypeScript
npm run build       # production build
npm run dev         # local dev server at http://localhost:5173
npx netlify dev     # full stack with functions at http://localhost:8888
```

Copy [`.env.example`](.env.example) to `.env` and set `NETLIFY_DATABASE_URL`, `STRIPE_SECRET_KEY`, `TWILIO_*` for live integrations.

## Repository layout

| Path | Purpose |
|------|---------|
| `ghl/` | GHL funnel copy, SMS/email templates, ads, AI bot training |
| `docs/` | Agency setup, snapshot spec, onboarding SOP |
| `config/` | Product decisions |
| `src/`, `netlify/` | Optional web prototype (not used for coach delivery) |
| `package.json` | Node deps for optional prototype |

## Branch

All application code is on **`main`** (and `cursor/ghl-coach-blueprint-ba5a`).
