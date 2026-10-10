#!/usr/bin/env python3
"""Build seo-site/data.json for seo.ejsgolf.com from an SEO Board database dump.

The weekly run reads the claude.ai SEO Board database with ArtifactData (out_dir=<dump>),
which writes <dump>/<collection>/<doc>.json. This script folds those files into the one
JSON file the static dashboard loads. Read-only on everything except the output file.

Usage: python3 scripts/seo/build_board_data.py <dump_dir> [--out seo-site/data.json]
"""
import argparse, glob, json, os, sys


def load(path):
    with open(path) as f:
        return json.load(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dump")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..", "..", "seo-site", "data.json"))
    a = ap.parse_args()
    d = a.dump
    one = {"summary": "board/summary.json", "daily": "gsc/daily.json",
           "opp": "gsc/opportunities.json", "pages": "gsc/pages.json", "health": "health/latest.json"}
    data = {}
    for key, rel in one.items():
        p = os.path.join(d, rel)
        data[key] = load(p) if os.path.exists(p) else None
    data["keywords"] = [load(p) for p in sorted(glob.glob(os.path.join(d, "keywords", "*.json")))]
    data["runs"] = [load(p) for p in sorted(glob.glob(os.path.join(d, "runs", "*.json")))]
    missing = [k for k, v in data.items() if not v]
    if missing:
        sys.exit(f"refusing to write: missing {missing} in {d}")

    # Local competitor/map/brand/GBP sections, if present (refreshed weekly). Optional:
    # a dump without them still builds, leaving the page's old local panels in place.
    local = {"grid": "local/grid.json", "gbp": "local/gbp.json",
             "competitorsOrganic": "local/competitors.json", "brand": "local/brand.json",
             "aiVisibility": "local/aiVisibility.json", "analytics": "local/analytics.json",
             "backlinks": "local/backlinks.json", "reviews": "local/reviews.json",
             "audit": "local/audit.json"}
    for key, rel in local.items():
        p = os.path.join(d, rel)
        if os.path.exists(p):
            data[key] = load(p)
    rivals = os.path.join(d, "local", "rivals.json")
    if os.path.exists(rivals):
        data["localRivals"] = load(rivals).get("rows", [])
    with open(a.out, "w") as f:
        json.dump(data, f, separators=(",", ":"))
    print(f"wrote {a.out}: {len(data['keywords'])} keywords, {len(data['runs'])} runs, "
          f"{len(data['daily'].get('rows', []))} daily rows")


if __name__ == "__main__":
    main()
