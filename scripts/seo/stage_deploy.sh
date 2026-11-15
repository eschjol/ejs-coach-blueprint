#!/usr/bin/env bash
# Stage the SEO dashboard for a Netlify deploy that includes the gitignored
# data.json. The Netlify deploy only ships git-tracked files, so deploying
# straight from seo-site/ would omit data.json and the live board would show
# no data. This copies the publish files (data.json included) into a fresh
# temp dir OUTSIDE the repo and prints its path; run the Netlify deploy there.
#
# Usage: dir=$(scripts/seo/stage_deploy.sh) && cd "$dir" && npx ... (deploy)
set -euo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
src="$root/seo-site"
[ -f "$src/data.json" ] || { echo "missing $src/data.json (run build_board_data.py first)" >&2; exit 1; }
out="$(mktemp -d)"
cp "$src/index.html" "$src/netlify.toml" "$src/robots.txt" "$src/data.json" "$out/"
echo "$out"
