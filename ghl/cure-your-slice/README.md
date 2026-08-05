# Cure Your Slice — Campaign Workspace

Workspace for the end-to-end Google marketing campaign selling Erik's **Cure
Your Slice** video series ($27) on GoHighLevel, with the Ball Striking Machine
Blueprint order bump (upgrade to $79), one-time Online Swing Analysis upsell
($279), and Monthly Online Program ascension ($795/mo).

## How to work this campaign

The campaign is driven by the Claude Code skill suite in
[`.claude/skills/`](../../.claude/skills/). Start any session with the
orchestrator — ask Claude to *"work on the Cure Your Slice campaign"* — and it
routes to the right specialist skill. Or invoke a stage directly:

| Skill | Covers |
|-------|--------|
| `cure-your-slice-campaign` | Master playbook, build order, launch gates |
| `funnel-economics` | AOV/CPA/ROAS math, budgets, scaling rules |
| `ghl-offer-funnel` | GHL pages, products, bump, one-click upsells, workflows |
| `sales-copywriting` | Sales page, checkout, bump box, upsell pages |
| `google-keyword-research` | Slice keyword universe + negative list |
| `google-ads-search` | Search campaign structure + RSAs |
| `google-ads-youtube` | Video scripts, remarketing + Demand Gen |
| `google-ads-pmax` | Performance Max (gated until Search proves out) |
| `google-conversion-tracking` | Google tag on GHL, dynamic values, debugging |
| `google-remarketing` | Audiences, customer match, ascension campaigns |
| `buyer-followup-sequences` | Abandon recovery, onboarding, ascension email/SMS |
| `google-ads-optimization` | Weekly ops loop + plain-English reports |

## Files in this directory

| File | Purpose |
|------|---------|
| [`offer.md`](offer.md) | **Canonical offer sheet** — prices, positioning, voice rules. Change prices here first. |
| `funnel-build.md` | GHL build spec (produced by `ghl-offer-funnel`) |
| `copy/` | Page copy per funnel step (produced by `sales-copywriting`) |
| `keywords.md`, `negatives.txt` | Keyword universe + negative list |
| `search-campaign.md`, `video-scripts.md`, `pmax-campaign.md` | Channel specs |
| `tracking.md` | Conversion setup + test-purchase log (launch blocker) |
| `audiences.md` | Remarketing/customer-match layer |
| `sequences/` | Email/SMS automation copy + workflow specs |
| `economics.md` | Living unit-economics model |
| `reports/` | Weekly performance reports |

Files beyond `offer.md` are produced by their skills as the campaign gets
built — this README is the index of what goes where.

## Relationship to the rest of the repo

This is Erik's **own product funnel** (dogfood account, ejsgolf.com), separate
from the coach-agency local-lessons system (`ghl/ads/google-local-search.md`,
intro funnel). Keep the two apart in Google Ads: no local "golf lessons"
keywords here, no slice-fix keywords there.
