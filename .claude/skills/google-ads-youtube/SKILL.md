---
name: google-ads-youtube
description: Create YouTube and Demand Gen video ad campaigns for Cure Your Slice — video ad scripts (hooks, 30s/60s structures), audience targeting, and campaign setup. Use this skill whenever the user asks for video ads, YouTube ads, video ad scripts, Demand Gen campaigns, video remarketing, or wants to put Erik on camera to sell the slice series — including "what should the video say."
---

# YouTube / Demand Gen Ads — Cure Your Slice

Purpose: script the videos and spec the campaigns. Erik teaching on camera at
the range is the creative advantage — a real coach demonstrating why a ball
slices outperforms polished promo footage for this product. Scripts must be
shootable in one range session on a phone.

## Where video fits (sequence matters)

1. **First:** video remarketing to site visitors who didn't buy (cheapest wins;
   audiences from `google-remarketing`).
2. **Then:** Demand Gen to cold slice-related audiences once the funnel
   converts remarketing traffic.
3. In-feed/in-stream prospecting at scale only after CPA holds. Don't pitch
   cold YouTube prospecting as step one — it burns budget while the funnel is
   unproven.

## Script formula (every ad follows this skeleton)

**Hook (0–3s, decides everything):** call the shot the viewer hits. On camera,
ball flight visible if possible.
- "If your ball starts left and curves way right — watch this."
- "You don't slice because you're bad at golf."
- "Stop aiming left. It's making your slice worse."

**Diagnose (3–15s):** the mechanism in one breath — face open to path, the
out-to-in move — demonstrated with a club in hand. Teach one real thing; the ad
should be worth watching even without buying.

**Proof (15–25s):** who Erik is (Scottsdale's #1 coach, TrackMan 4, students
from beginners to competitive juniors) — one line, not a resume.

**Offer + CTA (last 5–10s):** "I put the whole fix in a video series — it's
$27, link below. Watch it this afternoon, see a different ball flight this
weekend." On-screen text: price + URL.

Lengths to produce per concept: **:30 cut** (in-stream skippable) and **:60
cut** (more diagnosis; feeds + remarketing). Write scripts two-column
(VISUAL | AUDIO) so they're shootable. Vertical 9:16 versions serve Shorts —
same script, reframed.

## Three launch concepts

1. **The Diagnosis** — pure mechanism teach (hook: "You don't slice because
   you're bad at golf").
2. **The Aim-Left Trap** — agitate the compensation everyone makes (hook:
   "Stop aiming left").
3. **Range Proof** — before/after ball flight with TrackMan numbers on screen.

Remarketing variant: acknowledge the visit — "You checked out the slice series
and didn't grab it — fair. Here's one drill free…" then re-offer.

## Campaign setup

| Setting | Remarketing campaign | Demand Gen cold |
|---------|---------------------|------------------|
| Type | Video (or Demand Gen) | Demand Gen |
| Audience | site visitors 30d, checkout abandoners 14d (exclude buyers) | custom segments below |
| Bidding | tCPA at ~1.5× search tCPA | Maximize Conversions → tCPA |
| Budget | $10–15/day | $20–30/day, only after remarketing converts |

Cold audience segments (build in Audience Manager):
- Custom segment — people who searched: "how to fix a slice", "stop slicing
  driver", "golf slice fix" (search-intent segments are the strongest signal
  Demand Gen has).
- Custom segment — YouTube interest: golf instruction channel viewers.
- Life events/in-market golf segments as Observation first.
Always exclude the `cys-buyer` customer-match list.

## Output format

Save scripts to `ghl/cure-your-slice/video-scripts.md` (two-column format,
per-cut) and campaign specs alongside. Include a shot list per script so Erik
can film all concepts in one range session: talking-head at camera,
down-the-line swing, ball-flight tracer or TrackMan screen, drill close-up.
