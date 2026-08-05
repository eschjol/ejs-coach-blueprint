---
name: buyer-followup-sequences
description: Write and spec the GHL email/SMS automation for the Cure Your Slice funnel — abandoned checkout recovery, buyer onboarding, and the ascension sequences that sell the $279 swing analysis and $795/mo program to $27 buyers. Use this skill whenever the user asks for email sequences, follow-up emails, SMS follow-up, abandoned cart messages, nurture campaigns, onboarding emails, or how to turn video-series buyers into program members.
---

# Buyer Follow-up Sequences — Cure Your Slice

Purpose: the back end is where this funnel makes real money — ads roughly
break even on the $27+bump, and email ascends buyers to $279 and $795/mo.
Write complete, paste-ready sequences and the GHL workflow specs that send
them. Voice rules from `sales-copywriting` apply (coach-to-student, teach
first, no hype). Prices from `ghl/cure-your-slice/offer.md`.

## Sequence inventory (build all four)

### SEQ-A: Abandoned checkout (trigger: CYS-05, tag `cys-abandon`)

They gave contact info at checkout step 1 — permission to follow up exists.
Exit immediately on purchase.

| Send | Timing | Angle |
|------|--------|-------|
| SMS 1 | +30 min | casual, from Erik: "left the slice videos in your cart — link if you still want in" |
| Email 1 | +1 hr | resend link + restate promise, answer the unasked "will this work for me" |
| Email 2 | +24 hr | teach: the #1 mistake slicers make (aiming left) → the series fixes the cause |
| Email 3 | +72 hr | guarantee-forward close ("watch it all; if your ball flight doesn't change, refund") |

No fake deadlines — if Erik won't actually raise the price, don't claim it.

### SEQ-B: Buyer onboarding (trigger: CYS-01, tag `cys-buyer`)

Job 1 is consumption — buyers who watch the videos see results, don't refund,
and ascend. Job 2 is the analysis pitch, earned after value is delivered.

| Send | Timing | Angle |
|------|--------|-------|
| Email 0 | instant | access + login link, "watch lesson 1 today" (single CTA) |
| SMS 0 | instant | "Erik here — you're in. Login link: …" |
| Email 1 | +1 day | consumption push: what lesson 1 unlocks, common question answered |
| Email 2 | +3 days | check-in + drill reminder; reply-bait ("hit reply, tell me your ball flight") — replies feed Conversation AI/Erik |
| Email 3 | +5 days | bridge: "videos fix the pattern; if you want my eyes on YOUR swing" → analysis $279 |
| Email 4 | +7 days | analysis case study (one student's before/after) → $279 CTA |

Branch: bump buyers (`cys-bump`) get one extra instant email granting Blueprint
access; non-bump buyers get a day-2 "add the Blueprint" one-time offer email.

### SEQ-C: Analysis delivery → program ascension (trigger: CYS-03)

Upload instructions instantly; reminder at +2 days if no video uploaded (GHL
task for Erik to confirm receipt). Erik's delivered analysis ALWAYS ends with
a personal program invitation — then email +2 days after delivery: "the plan I
sent works 10x faster with monthly eyes on it" → $795/mo program page, and a
booking link for a 15-min call with Erik for fence-sitters. High-ticket
recurring sells better with one human touch; the sequence's job is to get the
call or the click, not to hard-close $795 in text.

### SEQ-D: Long-term nurture (after SEQ-B ends, no purchase)

Weekly-ish teaching email (drills, course strategy, student stories) with soft
CTAs rotating analysis/program. Feeds from existing content patterns in
`ghl/copy/email-templates.md` and `ghl/website/blog-topics.md`. Exit to the
matching sequence on any purchase.

## Writing rules

- Subject lines: lowercase-casual, curiosity or benefit, ≤45 chars ("your
  slice has one cause", "still aiming left?"). No ALL CAPS, no emoji spam.
- Emails 150–250 words, one CTA each. SMS ≤ 300 chars, always from Erik's
  voice, always with opt-out compliance handled by GHL settings.
- Every teaching email must contain one genuinely useful idea a non-buyer
  could use — that's why they keep opening.
- Merge fields: GHL syntax ({{contact.first_name}}, {{custom_values.*}}) to
  match the repo's existing templates.

## Output format

Save to `ghl/cure-your-slice/sequences/` — one file per sequence containing:
trigger/exit conditions table, then full copy for every send (subject + body,
or SMS text), then the GHL workflow build steps (Automation → Workflows,
wait steps, if/else branches on tags). Cross-check trigger names against
`ghl-offer-funnel` workflow IDs (CYS-01…CYS-06) so specs stay wired together.
