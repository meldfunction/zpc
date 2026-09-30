#!/usr/bin/env python3
"""
grab_images.py: collect images from brand and press pages for the kids' devices guide.

What it does
  1. Visits each page you list (optionally one level deeper, same site, press/media/product links only).
  2. Finds images from <img>, srcset (largest version), <picture> sources, and og:image tags.
  3. Skips icons and tiny images, removes duplicates, and saves the rest by site.
  4. Lists press kit downloads (zip files, Dropbox, Google Drive, Box) in downloads.csv
     so you can grab those by hand, since they often need a click-through.
  5. Writes manifest.csv (where every image came from, its size, and alt text) and zips it all
     into images_for_claude.zip, ready to upload to the chat.

It respects robots.txt, waits between requests, and identifies itself politely.

Setup (once)
  pip install requests beautifulsoup4 pillow

Run
  python grab_images.py --urls-file urls.txt
  python grab_images.py https://tincan.kids/pages/press --depth 1

Rights
  Finding an image is not permission to publish it. Press kit images are usually fine for editorial
  use; everything else needs a yes from the owner. The manifest has a rights column for you to fill in.
"""

import argparse
import csv
import hashlib
import io
import re
import sys
import time
import zipfile
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib import robotparser

import requests
from bs4 import BeautifulSoup

try:
    from PIL import Image
except ImportError:
    Image = None

UA = "KidsDevicesGuide-ImageCollector/1.0 (personal research; contact via site owner)"
IMG_EXT = re.compile(r"\.(jpe?g|png|webp|gif|svg|avif)(\?|$)", re.I)
KIT_HINT = re.compile(r"(\.zip(\?|$)|dropbox\.com|drive\.google\.com|box\.com|wetransfer|frame\.io|brandfolder|bynder)", re.I)
FOLLOW_HINT = re.compile(r"(press|media|newsroom|brand|kit|product|gallery|about)", re.I)
SKIP_HINT = re.compile(r"(sprite|icon|logo-small|favicon|pixel|tracking|spacer|badge|avatar|emoji|flag)", re.I)
MAX_BYTES = 15 * 1024 * 1024

session = requests.Session()
session.headers.update({"User-Agent": UA, "Accept-Language": "en"})
_robots = {}


def allowed(url):
    parts = urlparse(url)
    base = f"{parts.scheme}://{parts.netloc}"
    if base not in _robots:
        rp = robotparser.RobotFileParser()
        rp.set_url(base + "/robots.txt")
        try:
            rp.read()
        except Exception:
            rp = None
        _robots[base] = rp
    rp = _robots[base]
    return True if rp is None else rp.can_fetch(UA, url)


def slug(text, n=40):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return s[:n] or "page"


def largest_from_srcset(srcset):
    best, best_w = None, -1
    for part in srcset.split(","):
        bits = part.strip().split()
        if not bits:
            continue
        url, w = bits[0], 0
        if len(bits) > 1:
            m = re.match(r"(\d+)(w|x)", bits[1])
            if m:
                w = int(m.group(1)) * (1000 if m.group(2) == "x" else 1)
        if w > best_w:
            best, best_w = url, w
    return best


def find_images(page_url, soup):
    found = []
    for tag in soup.find_all("meta", attrs={"property": ["og:image", "og:image:secure_url"]}):
        if tag.get("content"):
            found.append((urljoin(page_url, tag["content"]), "", "og:image"))
    for img in soup.find_all("img"):
        alt = (img.get("alt") or "").strip()
        src = None
        for attr in ("srcset", "data-srcset"):
            if img.get(attr):
                src = largest_from_srcset(img[attr])
                break
        src = src or img.get("data-src") or img.get("src")
        if src and not src.startswith("data:"):
            found.append((urljoin(page_url, src), alt, "img"))
    for source in soup.select("picture source[srcset]"):
        src = largest_from_srcset(source["srcset"])
        if src:
            found.append((urljoin(page_url, src), "", "picture"))
    for a in soup.find_all("a", href=True):
        href = urljoin(page_url, a["href"])
        if IMG_EXT.search(href):
            found.append((href, a.get_text(" ", strip=True)[:120], "link"))
    # Shopify and similar CDNs add size hints; ask for a big version where the pattern is obvious.
    cleaned = []
    for url, alt, kind in found:
        url = url.replace("//", "https://", 1) if url.startswith("//") else url
        url = re.sub(r"([?&])width=\d+", r"\1width=2000", url)
        cleaned.append((url, alt, kind))
    return cleaned


def find_kits(page_url, soup):
    kits = []
    for a in soup.find_all("a", href=True):
        href = urljoin(page_url, a["href"])
        text = a.get_text(" ", strip=True)
        if KIT_HINT.search(href) or re.search(r"download|press kit|media kit|product images|headshots", text, re.I):
            kits.append((page_url, href, text[:120]))
    return kits


def follow_links(page_url, soup):
    host = urlparse(page_url).netloc
    out = set()
    for a in soup.find_all("a", href=True):
        href = urljoin(page_url, a["href"]).split("#")[0]
        if urlparse(href).netloc == host and FOLLOW_HINT.search(href) and not IMG_EXT.search(href):
            out.add(href)
    return sorted(out)[:15]


def fetch(url, delay):
    if not allowed(url):
        print(f"  skipped by robots.txt: {url}")
        return None
    time.sleep(delay)
    try:
        r = session.get(url, timeout=25, stream=True)
        r.raise_for_status()
        return r
    except Exception as e:
        print(f"  could not fetch {url}: {e}")
        return None


def save_image(url, alt, kind, page_url, out, seen, args, rows):
    if SKIP_HINT.search(url):
        return
    r = fetch(url, args.delay)
    if r is None:
        return
    ctype = r.headers.get("Content-Type", "").split(";")[0]
    if not ctype.startswith("image/"):
        return
    data = r.raw.read(MAX_BYTES + 1, decode_content=True)
    if len(data) > MAX_BYTES:
        print(f"  too large, skipped: {url}")
        return
    digest = hashlib.sha1(data).hexdigest()
    if digest in seen:
        return
    w = h = ""
    is_svg = ctype == "image/svg+xml"
    if not is_svg and Image is not None:
        try:
            im = Image.open(io.BytesIO(data))
            w, h = im.size
            if min(w, h) < args.min_size:
                return
        except Exception:
            return
    seen.add(digest)
    ext = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif",
           "image/svg+xml": "svg", "image/avif": "avif"}.get(ctype, "img")
    site = urlparse(page_url).netloc.replace("www.", "")
    folder = out / slug(site)
    folder.mkdir(parents=True, exist_ok=True)
    name = f"{slug(site, 20)}__{slug(alt or Path(urlparse(url).path).stem, 30)}__{digest[:6]}.{ext}"
    (folder / name).write_bytes(data)
    rows.append({"file": f"{folder.name}/{name}", "width": w, "height": h, "bytes": len(data),
                 "found_as": kind, "alt_text": alt, "image_url": url, "page_url": page_url,
                 "rights": "UNVERIFIED: confirm permission before publishing"})
    print(f"  saved {folder.name}/{name}  {w}x{h}")


def main():
    ap = argparse.ArgumentParser(description="Collect images from brand and press pages.")
    ap.add_argument("urls", nargs="*", help="Page URLs to crawl")
    ap.add_argument("--urls-file", help="Text file with one URL per line (# for comments)")
    ap.add_argument("--out", default="images_for_claude", help="Output folder")
    ap.add_argument("--depth", type=int, default=0, choices=[0, 1], help="1 = also visit press/media/product pages on the same site")
    ap.add_argument("--min-size", type=int, default=400, help="Skip images smaller than this many pixels on the short side")
    ap.add_argument("--max-per-page", type=int, default=30, help="Most images to save from one page")
    ap.add_argument("--delay", type=float, default=1.0, help="Seconds to wait between requests")
    ap.add_argument("--og-only", action="store_true", help="Only save each page's main share image (use for Unsplash photo pages)")
    args = ap.parse_args()

    urls = list(args.urls)
    if args.urls_file:
        for line in Path(args.urls_file).read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#"):
                urls.append(line)
    if not urls:
        ap.error("Give at least one URL, or --urls-file")
    if Image is None:
        print("Pillow isn't installed, so tiny images can't be filtered out. Run: pip install pillow")

    out = Path(args.out)
    out.mkdir(exist_ok=True)
    rows, kits, seen, visited = [], [], set(), set()
    queue = [(u, 0) for u in urls]

    while queue:
        page, level = queue.pop(0)
        if page in visited:
            continue
        visited.add(page)
        print(f"\nPage: {page}")
        r = fetch(page, args.delay)
        if r is None or "html" not in r.headers.get("Content-Type", ""):
            continue
        soup = BeautifulSoup(r.content, "html.parser")
        kits.extend(find_kits(page, soup))
        imgs, done = find_images(page, soup), set()
        if args.og_only:
            imgs = [i for i in imgs if i[2] == "og:image"][:1]
        for url, alt, kind in imgs:
            if url in done or len(done) >= args.max_per_page:
                continue
            done.add(url)
            save_image(url, alt, kind, page, out, seen, args, rows)
        if level < args.depth:
            queue.extend((link, level + 1) for link in follow_links(page, soup))

    with open(out / "manifest.csv", "w", newline="", encoding="utf-8") as f:
        cols = ["file", "width", "height", "bytes", "found_as", "alt_text", "image_url", "page_url", "rights"]
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)
    with open(out / "downloads.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["found_on_page", "download_link", "link_text"])
        w.writerows(sorted(set(kits)))

    zpath = Path(f"{args.out}.zip")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for p in out.rglob("*"):
            if p.is_file():
                z.write(p, p.relative_to(out.parent))

    print(f"\nDone. {len(rows)} images saved, {len(set(kits))} press kit links listed.")
    print(f"Upload {zpath} to the chat. Open downloads.csv to grab any press kits by hand.")


if __name__ == "__main__":
    sys.exit(main())
