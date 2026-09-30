#!/usr/bin/env python3
"""Fetch privacy and security RSS/Atom feeds into news.json for the News page.

Runs in the GitHub Pages workflow on a schedule, so visitors' browsers never
contact the news sites: they only load news.json from this site.
Standard library only. Stories from the previous news.json (the workflow downloads the
published copy first) are merged in, so the tracker keeps DAYS of history even though
each feed only lists its latest posts. A feed that fails keeps its earlier stories.

    python3 scripts/fetch_news.py            # writes news.json in the repo root
"""
import html, json, os, re, sys, urllib.request
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from zoneinfo import ZoneInfo
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "news.json")
DAYS = 30          # keep this many days of stories
MAX_PER_FEED = 40

FEEDS = [
    ("EFF", "https://www.eff.org/rss/updates.xml"),
    ("404 Media", "https://www.404media.co/rss/"),
    ("The Record", "https://therecord.media/feed"),
    ("Krebs on Security", "https://krebsonsecurity.com/feed/"),
    ("Schneier on Security", "https://www.schneier.com/feed/atom/"),
    ("Citizen Lab", "https://citizenlab.ca/feed/"),
    ("Access Now", "https://www.accessnow.org/feed/"),
    ("Privacy International", "https://privacyinternational.org/rss.xml"),
    ("Freedom of the Press", "https://freedom.press/issues/feed/"),
    ("The Markup", "https://themarkup.org/feeds/rss.xml"),
    ("FTC Consumer Alerts", "https://consumer.ftc.gov/blog/gd-rss.xml"),
    ("Malwarebytes", "https://www.malwarebytes.com/blog/feed/index.xml"),
    ("BleepingComputer", "https://www.bleepingcomputer.com/feed/"),
    ("Wired Security", "https://www.wired.com/feed/category/security/latest/rss"),
    ("Ars Technica Security", "https://arstechnica.com/security/feed/"),
    ("TechCrunch Security", "https://techcrunch.com/category/security/feed/"),
    ("Guardian Data Protection", "https://www.theguardian.com/technology/data-protection/rss"),
]

# Topic -> keyword pattern. Order matters only for display. Keep in sync with NEWS_TOPICS in index.html.
TOPICS = [
    ("AI & agents", r"\bA\.?I\b|artificial intelligence|chatbot|\bLLMs?\b|\bagent(s|ic)?\b|deepfake|openai|chatgpt|gemini|copilot|prompt injection|machine learning"),
    ("Scams & phishing", r"scam|phish|fraud|smishing|impersonat|voice clon|sextortion|romance|pig butchering|fake (invoice|job|app)"),
    ("Breaches & leaks", r"breach|leak|exposed|stolen data|data theft|hacked|hackers? (stole|accessed)|compromised"),
    ("Malware & ransomware", r"ransomware|malware|trojan|botnet|infostealer|stealer|backdoor|exploit|zero-day|0-day|vulnerabilit|patch"),
    ("Spyware & stalkerware", r"spyware|stalkerware|pegasus|\bNSO\b|paragon|predator|mercenary|intellexa"),
    ("Surveillance", r"surveil|police|\bICE\b|immigration|facial recognition|license plate|\bALPR\b|flock|\bFBI\b|\bNSA\b|wiretap|warrant|biometric"),
    ("Data brokers & tracking", r"data broker|tracking|tracker|location data|ad ?tech|advertis|cookie|people-search|fingerprint|telemetry|sold (user|customer) data"),
    ("Kids & families", r"\b(child|children|childhood|kids?|teens?|teenagers?|minors|parents?|parental|students?|youth|CSAM)\b|(?<![-\w])schools?\b|age verification|age check"),
    ("Law & policy", r"\blaw\b|\blaws\b|\bbill\b|legislat|regulat|court|judge|lawsuit|\bsued?\b|\bFTC\b|\bGDPR\b|senate|congress|ruling|\bbans?\b|\bbanned\b|supreme court|attorney general"),
    ("Encryption & accounts", r"encrypt|\bsignal\b|end-to-end|\bE2EE\b|whatsapp|passkey|password|two-factor|\b2FA\b|\bMFA\b|authenticat|\bVPN\b"),
    ("Workers & organizing", r"union|worker|labor|labour|organiz|protest|activist|journalist|press freedom|civil society|human rights"),
]
TOPIC_RE = [(name, re.compile(pat, re.I)) for name, pat in TOPICS]
UA = "Mozilla/5.0 (compatible; ZPC-news/1.0)"


def text(el):
    return "".join(el.itertext()).strip() if el is not None else ""


def clean(s, n=None):
    s = html.unescape(re.sub(r"<[^>]+>", " ", s or ""))
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\s*(\[(\.\.\.|\u2026)\]|The post .{0,300}? appeared first on .*|Continue reading.*|Read more.*)$", "", s)
    if n and len(s) > n:
        s = s[: n].rsplit(" ", 1)[0].rstrip(",.;:") + "…"
    return s


def parse_date(s):
    s = (s or "").strip()
    if not s:
        return None
    try:
        d = parsedate_to_datetime(s)
    except (TypeError, ValueError):
        try:
            d = datetime.fromisoformat(s.replace("Z", "+00:00"))
        except ValueError:
            try:  # FTC style: "September 28, 2026 | 12:41PM" (US Eastern)
                d = datetime.strptime(s, "%B %d, %Y | %I:%M%p").replace(tzinfo=ZoneInfo("America/New_York"))
            except ValueError:
                return None
    if d.tzinfo is None:
        d = d.replace(tzinfo=timezone.utc)
    return d.astimezone(timezone.utc)


def local(tag):
    return tag.rsplit("}", 1)[-1]


def child(el, *names):
    for c in el:
        if local(c.tag) in names:
            return c
    return None


def parse_feed(raw):
    root = ET.fromstring(raw)
    out = []
    items = [e for e in root.iter() if local(e.tag) in ("item", "entry")]
    for it in items:
        title = clean(text(child(it, "title")))
        link_el = child(it, "link")
        link = ""
        if link_el is not None:
            link = (link_el.get("href") or text(link_el)).strip()
            if local(it.tag) == "entry":  # Atom: prefer rel=alternate
                for c in it:
                    if local(c.tag) == "link" and c.get("rel", "alternate") == "alternate" and c.get("href"):
                        link = c.get("href"); break
        date = parse_date(text(child(it, "pubDate", "published", "updated", "date")))
        summ = clean(text(child(it, "description", "summary", "content", "encoded")), 240)
        if title and link.startswith("http"):
            out.append({"t": title, "u": link, "d": date, "x": summ})
    return out


def topics_for(title, summary):
    hay = title + " " + summary
    return [name for name, rx in TOPIC_RE if rx.search(hay)]


def main():
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=DAYS)
    try:
        prev = json.load(open(OUT, encoding="utf-8"))
    except (OSError, ValueError):
        prev = {"items": []}
    items, sources = [], []
    for name, url in FEEDS:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml"})
            with urllib.request.urlopen(req, timeout=25) as r:
                got = parse_feed(r.read())
            got = [g for g in got if g["d"] and cutoff <= g["d"] <= now + timedelta(hours=2)][:MAX_PER_FEED]  # skips future-dated event listings
            for g in got:
                items.append({"t": g["t"], "u": g["u"], "s": name, "d": g["d"].strftime("%Y-%m-%dT%H:%M:%SZ"), "x": g["x"], "k": topics_for(g["t"], g["x"])})
            sources.append({"name": name, "feed": url, "ok": True, "n": len(got)})
        except Exception as e:
            sources.append({"name": name, "feed": url, "ok": False, "n": 0, "error": type(e).__name__})
            print(f"warn: {name}: {e}", file=sys.stderr)
    names = {n for n, _ in FEEDS}
    for i in prev.get("items", []):  # history from earlier runs (fresh copies above win the dedupe)
        d = parse_date(i.get("d"))
        if i.get("s") in names and d and d >= cutoff:
            items.append({**i, "k": topics_for(i["t"], i.get("x", ""))})
    seen, uniq = set(), []
    for i in sorted(items, key=lambda i: i["d"], reverse=True):  # stable sort: fresh items first on ties
        key = re.sub(r"[?#].*$", "", i["u"]).rstrip("/").lower()
        tkey = i["t"].lower()
        if key in seen or tkey in seen:
            continue
        seen.update((key, tkey))
        uniq.append(i)
    for src in sources:
        src["n"] = sum(1 for i in uniq if i["s"] == src["name"])
    data = {"generated": now.strftime("%Y-%m-%dT%H:%M:%SZ"), "days": DAYS, "topics": [t for t, _ in TOPICS], "sources": sources, "items": uniq}
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    ok = sum(s["ok"] for s in sources)
    print(f"news.json: {len(uniq)} stories from {ok}/{len(sources)} feeds", file=sys.stderr)


if __name__ == "__main__":
    main()
