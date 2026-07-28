# SMS Templates — paste into GHL Template Library

Prefix all templates: **EJS-**

GHL merge fields: `{{contact.first_name}}`, `{{custom_values.coach_name}}`, `{{custom_values.venue_name}}`, `{{custom_values.venue_address}}`, `{{custom_values.booking_url}}`, `{{custom_values.google_review_link}}`

For appointment times use GHL appointment merge fields: `{{appointment.only_start_date}}`, `{{appointment.only_start_time}}`

---

## EJS-intro-confirmation

```
Hi {{contact.first_name}}! You're booked for an intro lesson with {{custom_values.coach_name}} on {{appointment.only_start_date}} at {{appointment.only_start_time}}.

Location: {{custom_values.venue_name}}, {{custom_values.venue_address}}

Reply if you need to reschedule.
```

---

## EJS-intro-reminder-24h

```
Reminder: intro lesson with {{custom_values.coach_name}} tomorrow at {{appointment.only_start_time}}.

{{custom_values.venue_name}} — {{custom_values.venue_address}}

See you on the range!
```

---

## EJS-intro-reminder-2h

```
See you in 2 hours! {{custom_values.venue_name}}. — {{custom_values.coach_name}}'s team
```

---

## EJS-new-lead-instant (WF-01)

```
Hi {{contact.first_name}}! Thanks for reaching out to {{custom_values.coach_name}} in {{custom_values.city}}.

Book your intro lesson here: {{custom_values.booking_url}}

Or reply with your question — we're here to help.
```

---

## EJS-missed-call-textback (WF-02)

```
Sorry we missed you — {{custom_values.coach_name}} is usually on the lesson tee.

Book online in 2 minutes: {{custom_values.booking_url}}

Or reply here and we'll get back to you shortly.
```

---

## EJS-review-request (WF-04)

```
Thanks for your lesson with {{custom_values.coach_name}}! If you have 30 seconds, a Google review helps other golfers find us:

{{custom_values.google_review_link}}
```

---

## EJS-review-reminder (WF-04 day 5)

```
Hi {{contact.first_name}} — quick favor? A Google review for {{custom_values.coach_name}} really helps local golfers find quality instruction:

{{custom_values.google_review_link}}
```

---

## EJS-package-nudge (WF-05 day 2)

```
Hi {{contact.first_name}} — ready to lock in your next sessions with {{custom_values.coach_name}}? Package pricing saves vs single lessons. Book: {{custom_values.booking_url}}
```

---

## EJS-lapsed-winback (WF-06)

```
Hi {{contact.first_name}} — it's been a while! {{custom_values.coach_name}} has openings this week if you want to pick up where we left off. Book: {{custom_values.booking_url}}
```

---

## EJS-content-approval (Growth/Autopilot)

```
[EJS Blueprint] Approve this week's post?

"{{custom_values.pending_post_body}}"

Reply 1 to approve, 2 to skip.
```

---

## EJS-coach-handoff (WF-07)

```
[EJS Blueprint] {{contact.first_name}} ({{contact.phone}}) needs you:

"{{custom_values.last_inbound_message}}"

Reply to them in GHL Conversations or call directly.
```

---

## EJS-coach-welcome (onboarding)

```
Hi {{contact.first_name}} — your EJS Coach Blueprint system is live.

Book link: {{custom_values.booking_url}}
Your line: {{custom_values.phone_display}}

Students can text or call — AI handles booking and FAQs. You'll get a text when someone needs you personally.

Questions? Reply here.
```

---

## EJS-monthly-report (WF-08)

```
[EJS Blueprint — {{custom_values.report_month}}]
New leads: {{custom_values.report_leads}}
Bookings: {{custom_values.report_bookings}}
Reviews: {{custom_values.report_reviews}}

Great month — keep teaching!
```
