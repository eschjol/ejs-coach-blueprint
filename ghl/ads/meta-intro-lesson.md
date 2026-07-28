# Meta Lead Ad — GHL / Ads Manager

Use for Autopilot tier coaches. Erik manages from coach sub-account or agency ad account.

---

## Campaign settings

| Setting | Value |
|---------|-------|
| Objective | Leads |
| Budget | Start $15–25/day |
| Geo | 15-mile radius from {{venue_address}} |
| Age | 35–65 |
| Interests | Golf, PGA, golf instruction |

---

## Primary text

```
Struggling with your golf game? {{coach_name}} helps golfers in {{city}} get better from day one — with data-driven instruction, not guesswork.

Book your intro lesson. Limited spots this week.
```

---

## Headline

```
Golf Lessons in {{city}}
```

---

## Description

```
Intro lesson available · All skill levels
```

---

## Lead form fields

- First name
- Last name
- Phone
- Email
- Custom: "What's your biggest golf challenge?" (Slice / Consistency / Distance / Short game / Getting started)

---

## GHL integration

**On lead submit →** WF-01 New Lead Instant Response  
**Pipeline →** New Lead  
**Tag →** `ads-meta`

---

## Creative brief

- Photo: coach on range or with student (permission required)
- Text overlay: "Golf Lessons in {{city}}"
- CTA: Sign Up / Book Now
- Landing page: Intro funnel (not homepage)

---

## Coach approval SMS (before launch)

```
[EJS Blueprint] Approve Meta ad for this week?

Headline: Golf Lessons in {{city}}
Budget: ${{daily_budget}}/day

Reply 1 to launch, 2 to revise.
```
