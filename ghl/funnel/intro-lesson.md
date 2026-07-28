# Intro Lesson Funnel — GHL Funnel Copy

Mirror [ejsgolf.com](https://ejsgolf.com) "Book Intro Lesson" flow. Replace placeholders with custom values or coach-specific copy during onboarding.

---

## Page 1 — Landing

### Hero
**Headline:** Elevate Your Golf Game  
**Subheadline:** Schedule your intro lesson and get better from day one.  
**CTA button:** Book Intro Lesson → Page 2

### Trust line
{{custom_values.coach_name}} · {{custom_values.city}} · {{custom_values.venue_name}}

### Value props (3 columns)

| Headline | Body |
|----------|------|
| Get Better From Day One | No "get worse to get better." Clear feedback and drills from your first session. |
| Data-Driven Instruction | Modern technology meets biomechanics — for every skill level. |
| A Plan You Can Use | Leave with homework: video, drills, and follow-up between lessons. |

### Who this is for
- Beginners building fundamentals
- Golfers stuck on a plateau
- Competitive juniors and low handicaps
- Online students (not local? we do that too)

### Social proof
Add 2–3 testimonial blocks (coach's own reviews from ejsgolf.com or placeholders).

Example:
> "Erik has the ability to dissect your swing and make small changes for big improvements." — Student review

### FAQ accordion

**Who is this for?**  
All skill levels — beginners, plateaued golfers, competitive juniors, and low handicaps.

**What should I bring?**  
Your clubs, athletic shoes, and an open mind.

**Where is the lesson?**  
{{custom_values.venue_name}}, {{custom_values.venue_address}}

**Do you offer online lessons?**  
Yes — book the Online Lesson calendar if you're not local.

**How much does it cost?**  
Intro lesson: {{custom_values.intro_lesson_price}}. Private lessons from {{custom_values.private_lesson_price}}.

### Footer CTA
**Book Intro Lesson** → Page 2

---

## Page 2 — Booking

**Headline:** Pick a time that works for you  
**Subheadline:** No back-and-forth texts. Confirm instantly.

**Embed:** Intro Lesson calendar widget (GHL)

Optional form fields before calendar:
- First name, last name, email, phone (required)
- Skill level dropdown (Beginner / Mid / Low / Junior / Competitive)

---

## Page 3 — Thank you

**Headline:** You're booked!

**Body:**
Thanks, {{contact.first_name}}! Your intro lesson with {{custom_values.coach_name}} is confirmed.

**What happens next:**
1. You'll get a confirmation text and email
2. Show up with your clubs and athletic shoes
3. We'll assess your game and build a plan — you'll leave with clear drills to practice

**Location:**  
{{custom_values.venue_name}}  
{{custom_values.venue_address}}

**Add to calendar:** (GHL calendar add link)

**Questions?** Text {{custom_values.phone_display}}

---

## Workflow triggers on this funnel

| Event | Workflow |
|-------|----------|
| Form submit (if pre-calendar form) | WF-01 |
| Appointment booked | WF-03 + pipeline → Intro Booked |
| Payment collected (if deposit) | Tag + receipt email |

---

## Domain setup

- Recommended: `book.{coachdomain}.com` or `book.ejsgolf.com/erik`
- CNAME to GHL
- Use branded link domain for calendar URLs in SMS
