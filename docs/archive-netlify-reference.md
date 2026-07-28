# Archive — Netlify Prototype (not used for delivery)

The `/src`, `/netlify`, and `/db` folders were an early implementation of the Golf Coach AI Business OS product plan using a custom Netlify stack.

**Decision (current):** All coach delivery goes through **GoHighLevel sub-accounts** under Erik's agency. See [README.md](../README.md) and [ghl-master-guide.md](ghl-master-guide.md).

## What the prototype contained

- Vite/React booking funnel
- Netlify Functions for SMS webhook, booking, SEO generation
- Drizzle/Postgres schema
- Scheduled jobs for content and reports

## Why GHL instead

| Need | GHL | Custom app |
|------|-----|------------|
| Time to first paying coach | Days (snapshot) | Weeks/months |
| Erik sets up coaches | Sub-account + snapshot | Deploy + config each |
| SMS, AI, calendars, CRM | Built-in | Build + maintain |
| Rebilling coaches | SaaS mode | Custom billing |
| Older coach UX | SMS-first, no login needed | Requires new platform |

## If you need the prototype

```bash
npm install
npm run build
npx netlify dev
```

Requires `NETLIFY_DATABASE_URL`, Stripe, Twilio, etc. — not recommended for production coaches.

Do not delete without Erik's approval — may be useful for reference or a future standalone SaaS spin-off.
