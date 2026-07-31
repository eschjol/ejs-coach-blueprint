#!/bin/bash
# Run on your Mac AFTER opening this project folder in Cursor (Move to Local).
# Requires: git, GitHub login (HTTPS or SSH)

set -e
REPO="https://github.com/eschjol/ejs-coach-blueprint.git"

cd "$(dirname "$0")"

if [ ! -d .git ]; then
  git init
fi

git remote remove origin 2>/dev/null || true
git remote add origin "$REPO"

git add -A
git status

if ! git diff --cached --quiet 2>/dev/null || [ -n "$(git status --porcelain)" ]; then
  git commit -m "EJS Coach Blueprint — GHL agency package and docs" || true
fi

git branch -M main
git push -u origin main --force

echo "Done. View at: https://github.com/eschjol/ejs-coach-blueprint"
