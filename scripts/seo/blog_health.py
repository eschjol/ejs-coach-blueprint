#!/usr/bin/env python3
"""Read-only health check of every published post on ejsgolf.com.

Reads the public sitemap, fetches each /post/ page with a browser User-Agent
and reports house-standard problems. It never edits anything.

Checks:
  dead_link      internal link that falls through to the contact page (soft 404)
  legacy_link    link to a retired handle or dead domain
  banned_term    force plate, clubhead/clubface, "Citation Hook", etc.
  schema_missing no Article JSON-LD on the page
  off_cdn_image  <img> hosted outside the GHL media library
  artifact       build leftovers such as [object Object] or [IMAGE: ...]

Usage: python3 scripts/seo/blog_health.py [--out health.json]
Standard library only.
"""
import argparse, html, json, re, sys, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

SITE = "https://ejsgolf.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
OK_IMAGE_HOSTS = ("assets.cdn.filesafe.space", "storage.googleapis.com", "images.leadconnectorhq.com",
                  "stcdn.leadconnectorhq.com", "img.youtube.com", "i.ytimg.com")
LEGACY = [
    (r"youtube\.com/@ejsgolf\b", "YouTube @ejsgolf (404)"),
    (r"(?:twitter|x)\.com/ejs_golf\b", "X @EJS_Golf"),
    (r"facebook\.com/ejsgolf\b", "facebook.com/ejsgolf"),
    (r"linkedin\.com/in/ejsgolf\b", "linkedin.com/in/ejsgolf"),
    (r"instagram\.com/(?:ejsgolfacademy|ejs_golf)\b", "old Instagram handle"),
    (r"tsbgolf\.com", "tsbgolf.com (dead)"),
    (r"skool\.com/ejsgolf", "skool.com/ejsgolf (dead)"),
    (r"clientclub\.net", "clientclub community (not current)"),
    (r"thescienceofbettergolf\.com/?\"", "thescienceofbettergolf.com waitlist page"),
    (r"coacherikschjolberg\.com", "coacherikschjolberg.com (does not resolve)"),
    (r"www\.ejsgolf\.com", "www.ejsgolf.com (use apex)"),
    (r"getonform\.com", "OnForm link"),
]
BANNED = [
    (r"force[- ]?plates?", "force plate"),
    (r"\bclub(?:head|face)s?\b", "clubhead/clubface"),
    (r"pressure plates", "pressure plates"),
    (r"Citation Hook", "Citation Hook label"),
    (r"\bfour (?:primary |distinct )?release patterns\b", "four release patterns"),
    (r"game[- ]changer", "game-changer"),
    (r"\bEJS Golf Academy\b", "EJS Golf Academy"),
]
ARTIFACTS = [(r"\[object Object\]", "[object Object]"), (r"\[(?:IMAGE|GRAPH|VIDEO):", "[IMAGE: ...] callout")]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.geturl(), r.read().decode("utf-8", "replace")
        except Exception:
            time.sleep(2 * (attempt + 1))
    return url, ""


def title_of(page):
    m = re.search(r"<title>(.*?)</title>", page, re.S)
    return html.unescape(m.group(1).strip()) if m else ""


def article_html(page):
    """The post body only, so the site template's own links are not counted."""
    m = re.search(r'<div[^>]*class="[^"]*blog-html-container-single[^"]*"[^>]*>(.*)', page, re.S)
    body = m.group(1) if m else page
    return re.split(r'class="[^"]*author-social-icon-container', body)[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="")
    a = ap.parse_args()

    _, sm = fetch(SITE + "/sitemap.xml")
    posts = sorted(set(re.findall(r"<loc>(https://ejsgolf\.com/post/[^<]+)</loc>", sm)))
    _, control = fetch(SITE + "/zz-health-check-control-" + str(int(time.time())))
    control_title = title_of(control)

    pages = {}
    with ThreadPoolExecutor(6) as ex:
        for url, (final, page) in zip(posts, ex.map(fetch, posts)):
            pages[url] = page

    findings = []
    internal = {}
    for url, page in pages.items():
        slug = url.rsplit("/post/", 1)[1]
        if not page:
            findings.append({"slug": slug, "kind": "fetch_failed", "detail": "page did not load"}); continue
        if title_of(page) == control_title:
            findings.append({"slug": slug, "kind": "dead_link", "detail": "post URL in sitemap shows the contact page"}); continue
        if not re.search(r'"@type"\s*:\s*"(?:Article|BlogPosting)"', page):
            findings.append({"slug": slug, "kind": "schema_missing", "detail": "no Article JSON-LD"})
        body = article_html(page)
        text = html.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"<(script|style)\b.*?</\1>", " ", body, flags=re.S)))
        for rx, label in LEGACY:
            n = len(re.findall(rx, body, re.I))
            if n: findings.append({"slug": slug, "kind": "legacy_link", "detail": f"{label} x{n}"})
        for rx, label in BANNED:
            n = len(re.findall(rx, text, re.I))
            if n: findings.append({"slug": slug, "kind": "banned_term", "detail": f"{label} x{n}"})
        for rx, label in ARTIFACTS:
            if re.search(rx, body): findings.append({"slug": slug, "kind": "artifact", "detail": label})
        for src in re.findall(r'<img[^>]*src="([^"]+)"', body):
            host = urllib.parse.urlparse(src).netloc
            if host and not host.endswith(OK_IMAGE_HOSTS):
                findings.append({"slug": slug, "kind": "off_cdn_image", "detail": host})
        for href in re.findall(r'href="([^"]+)"', body):
            p = urllib.parse.urlparse(href)
            if p.netloc.lower() in ("ejsgolf.com", "www.ejsgolf.com"):
                internal.setdefault(p.path.rstrip("/") or "/", set()).add(slug)

    def check(path):
        _, page = fetch(SITE + path)
        return path, title_of(page)
    with ThreadPoolExecutor(6) as ex:
        for path, t in ex.map(check, sorted(internal)):
            if t == control_title and path not in ("/contact",):
                for slug in sorted(internal[path]):
                    findings.append({"slug": slug, "kind": "dead_link", "detail": path})

    out = {"checkedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "postsChecked": len(pages),
           "internalLinksChecked": len(internal), "findings": findings}
    s = json.dumps(out, indent=1)
    if a.out:
        open(a.out, "w").write(s)
    print(s if not a.out else f"{len(pages)} posts, {len(findings)} findings -> {a.out}")


if __name__ == "__main__":
    main()
