# Dogfood Guide — Erik Schjolberg / ejsgolf.com

Run the EJS Coach Blueprint on Erik's business before onboarding beta coaches.

## Metrics to track (30-day case study)

| Metric | Baseline (manual) | Target (automated) |
|--------|-------------------|---------------------|
| Admin hours/week | ~10 hrs | < 2 hrs |
| Intro lesson conversion (lead → booked) | Measure current | > 60% |
| Avg response time to student texts | Hours | < 60 seconds (AI) |
| Google reviews/month | Current rate | +50% |
| Organic leads from SEO pages | 0 (if single page) | Track in dashboard |

## Deployment steps

1. **Netlify site**
   ```bash
   npm install
   npm run build
   npx netlify init
   npx netlify deploy --prod
   ```

2. **Netlify Database**
   - Enable Netlify Database on the site
   - Set `NETLIFY_DATABASE_URL`
   - Run migration: `psql $NETLIFY_DATABASE_URL -f db/migrations/0000_initial.sql`

3. **Twilio**
   - Provision number matching 480 area code
   - Webhook → `/.netlify/functions/sms-webhook`
   - Update coach record: `twilio_number`

4. **Stripe**
   - Connect Stripe account
   - Set `STRIPE_SECRET_KEY`
   - Intro lesson = $0 (free consult) or paid deposit

5. **Google**
   - Set `google_review_url` on coach record
   - Optional: Calendar OAuth for `GOOGLE_CALENDAR_ACCESS_TOKEN`

6. **Parallel run with ejsgolf.com**
   - Add booking CTA on ejsgolf.com → `/book/erik-schjolberg`
   - Keep existing site; Blueprint handles booking + SMS + reviews
   - Or replace "Book Intro" buttons with new funnel URL

## Case study template

**Title:** How Coach Erik automated 10+ hours/week with EJS Coach Blueprint

**Results (fill after 30 days):**
- X intro lessons booked via automated funnel
- Y SMS conversations handled by AI without Erik
- Z new Google reviews
- Admin time reduced from A to B hours/week

**Quote:** (from Erik)

**CTA:** Join the beta at `/beta`

## Review trigger

After marking a lesson complete, call:
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/review-request \
  -H "Content-Type: application/json" \
  -d '{"bookingId": "UUID"}'
```

Or integrate with calendar completion webhook in a future iteration.
