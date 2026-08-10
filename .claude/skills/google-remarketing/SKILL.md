---
name: google-remarketing
description: Build remarketing for the Cure Your Slice funnel — audience definitions (visitors, checkout abandoners, buyers), customer match lists synced from GoHighLevel tags, exclusions, and win-back/ascension campaigns. Use this skill whenever the user asks about retargeting, remarketing, audiences, customer match, showing ads to past visitors or buyers, cart abandoners, or promoting the $279 swing analysis and $795/mo program to existing buyers.
---

# Remarketing — Cure Your Slice

Purpose: define the audience layer once, correctly, so every campaign skill
(`google-ads-search`, `google-ads-youtube`, `google-ads-pmax`) pulls from the
same lists — and buyers stop seeing $27 acquisition ads the day they buy.

## Audience map (build in Google Ads Audience Manager)

| Audience | Definition | Used for |
|----------|-----------|----------|
| CYS visitors 30d | sales-page URL visit, no /welcome visit | video remarketing, RLSA observation |
| Checkout abandoners 14d | /checkout visit, no /welcome | highest-value remarketing — dedicated ads |
| Buyers (pixel) | /welcome visit | EXCLUSION from all acquisition |
| CM — cys-buyer | customer match from GHL tag `cys-buyer` | exclusion + ascension targeting + PMax signal |
| CM — cys-analysis | GHL tag `cys-analysis` | program-ascension ads |
| CM — cys-abandon | GHL tag `cys-abandon` | belt-and-suspenders abandoner match |

Site audiences come from the GA4/Google tag already installed by
`google-conversion-tracking` — verify audiences are accumulating before
building campaigns on them (need 100+ for search lists, 1000+ for YouTube).

## Customer match sync (GHL → Google Ads)

Source of truth is GHL tags (defined in `ghl-offer-funnel`). Sync options, in
preference order:
1. Existing Zapier/Make connection: trigger on tag added → Google Ads "add
   contact to customer list" (the repo's Zapier connection has these actions).
2. Manual CSV export from GHL smart list → Audience Manager upload, refreshed
   weekly (fine at launch volume; note it as a recurring task).
Hash/PII handling is Google's standard customer-match flow — email + phone
give the best match rates.

## Exclusion discipline (do this before any remarketing ads)

- Exclude Buyers (pixel) + CM — cys-buyer from ALL acquisition campaigns
  (Search, video, Demand Gen, PMax).
- Exclude cys-program members from everything promotional — someone paying
  $795/mo should never see a $27 ad; it cheapens the program.

## Campaigns this layer enables

1. **Abandoner win-back** (first priority — warmest traffic): video/display to
   abandoners 14d. Message: acknowledge + remove risk ("still there, 30-day
   guarantee") or one free drill then re-offer. Cap frequency ~3/week; the
   list is small, don't stalk it. Works alongside (not instead of) the GHL
   abandon emails from `buyer-followup-sequences`.
2. **Visitor remarketing**: the remarketing scripts in `google-ads-youtube`.
3. **Ascension — analysis $279**: to cys-buyer CM list (minus analysis
   buyers), 1–2 weeks post-purchase: "You've got the videos — want my eyes on
   YOUR swing?"
4. **Ascension — program $795/mo**: to cys-analysis list; strongest candidates
   already paid $279 for personal attention. Small budget ($5–10/day) — this
   list may be tens of people, but one conversion pays for a month of the
   whole ad account.

## Output format

Save to `ghl/cure-your-slice/audiences.md`: audience table with sizes and
status (accumulating/ready), sync method chosen, exclusion checklist per
campaign, and which win-back/ascension campaigns are live. Review sizes
monthly — lists under minimums silently stop serving.
