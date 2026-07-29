# Email Templates — paste into GHL Template Library

Prefix: **EJS-**

---

## EJS-intro-confirmation-email

**Subject:** You're booked — intro lesson with {{custom_values.coach_name}}

```
Hi {{contact.first_name}},

Your intro lesson is confirmed:

Date: {{appointment.only_start_date}}
Time: {{appointment.only_start_time}}
Location: {{custom_values.venue_name}}, {{custom_values.venue_address}}

What to bring: your clubs, athletic shoes, and an open mind.

What to expect: we'll assess your game, use data-driven feedback, and you'll leave with a clear plan to improve — starting today.

Questions? Reply to this email or text {{custom_values.phone_display}}.

See you on the range,
{{custom_values.coach_name}}
```

---

## EJS-new-lead-email (WF-01)

**Subject:** Golf lessons in {{custom_values.city}} — book with {{custom_values.coach_name}}

```
Hi {{contact.first_name}},

Thanks for your interest in golf lessons with {{custom_values.coach_name}}.

{{custom_values.coach_name}} specializes in data-driven instruction for all skill levels — beginners, juniors, competitive players, and golfers stuck on a plateau.

Book your intro lesson: {{custom_values.booking_url}}

Location: {{custom_values.venue_name}}, {{custom_values.venue_address}}

— {{custom_values.coach_name}}'s team
```

---

## EJS-package-offer (WF-05 day 0)

**Subject:** Great session — here's your improvement plan

```
Hi {{contact.first_name}},

Thanks for coming in today. The fastest path to lower scores is consistent practice with the right feedback between lessons.

Package options:
• 3-pack — {{custom_values.price_3pack}}
• 5-pack — {{custom_values.price_5pack}}
• 10-pack — {{custom_values.price_10pack}}

Book your next session: {{custom_values.booking_url}}

— {{custom_values.coach_name}}
```

---

## EJS-package-final (WF-05 day 5)

**Subject:** Lock in your improvement plan

```
Hi {{contact.first_name}},

Golfers who book a package after their intro lesson improve 2–3x faster than single-lesson students — because the same message carries through every session.

Ready to commit? {{custom_values.booking_url}}

— {{custom_values.coach_name}}
```

---

## EJS-welcome-package-buyer

**Subject:** Welcome to {{custom_values.coach_name}}'s roster

```
Hi {{contact.first_name}},

You're officially on the roster. Here's how we work:

1. Book your next lesson anytime: {{custom_values.booking_url}}
2. Practice the drills we send after each session
3. Text us with questions — we're here between lessons too

Let's get to work.

— {{custom_values.coach_name}}
```

---

## EJS-online-lesson-instructions

**Subject:** Your online lesson with {{custom_values.coach_name}}

```
Hi {{contact.first_name}},

Your online lesson is confirmed for {{appointment.only_start_date}} at {{appointment.only_start_time}}.

Before your session:
1. Set up your phone or camera to capture face-on and down-the-line views
2. Hit 5–10 balls with your priority club
3. Upload video via the link we'll send, or reply to this email with your video attached

Zoom link (if applicable): {{custom_values.zoom_link}}

— {{custom_values.coach_name}}
```

---

## EJS-lapsed-winback-email (WF-06 day 3)

**Subject:** We'd love to see you back on the range

```
Hi {{contact.first_name}},

It's been a while since your last lesson with {{custom_values.coach_name}}. If life got in the way — we get it.

Here's a quick practice tip: focus on strike location before swing path. Most golfers skip this and wonder why scores don't drop.

Ready to pick back up? {{custom_values.booking_url}}

— {{custom_values.coach_name}}'s team
```

---

## EJS-intake-confirmation-email (WF-INTAKE-01)

**Subject:** Application received — book your EJS Coach Blueprint setup call

```
Hi {{contact.first_name}},

Thanks for applying to EJS Coach Blueprint. I built this system to run my own academy at McCormick Ranch — and now I set it up for golf coaches who'd rather teach than manage marketing software.

**Your selected plan:** {{contact.coach_plan_tier}}

**Next step:** Book your 60-minute white-glove setup call:
{{custom_values.onboarding_calendar_url}}

On the call we'll connect:
• Your calendar and lesson pricing
• Your business phone line and AI front desk
• Payments (Stripe)
• Google Business Profile and review automation

Have ready: headshot, logo (optional), and Stripe/bank details.

Questions before the call? Reply to this email or text me at (480) 861-9370.

— Erik Schjolberg
EJS Coach Blueprint
```

---

## EJS-intake-setup-call-booked (WF-INTAKE-02)

**Subject:** Setup call confirmed — here's what to prepare

```
Hi {{contact.first_name}},

Your EJS Coach Blueprint setup call is confirmed:

{{appointment.only_start_date}} at {{appointment.only_start_time}}

**Before the call, please have:**
1. Headshot (professional photo for your funnel)
2. Lesson pricing — intro, private, packages
3. Your weekly availability (days + hours)
4. Google account login (for Business Profile, if applicable)
5. Stripe account or bank details for payments

**We'll build on the call:**
• Intro lesson booking funnel
• AI SMS front desk
• Reminders and review requests
• (Growth/Autopilot) SEO pages and social templates

See you soon,
Erik Schjolberg
```
