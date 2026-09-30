# Zen Privacy Collective website

Static site for Zen Privacy Collective: pay-what-you-can privacy and security education, in worker-co-op / solidarity-economy language. The design is the "Worker cooperative redesign" exported from Claude Design (punk/zine style, 21 pages).

## How it works

The whole site is one page, `index.html`, rendered in the browser by a small runtime (`support.js`) on top of React. Each page has its own address:

| Page | URL |
|---|---|
| Home | `index.html` |
| Who we help | `#needs` · guides: `#guide`, families: `#calm` |
| Your stack | `#stack` · phone checklist: `#phone` · quiz: `#quiz` |
| Learn (workshops) | `#workshops` |
| Library | `#library` |
| Hire us | `#services` |
| Commons (gear) | `#commons` |
| Tools / Fails | `#tools` / `#fails` |
| About / Solidarity / Bring us | `#about` / `#orgs` / `#bring` |
| The problem / AI / Social / Future | `#problem` / `#ai` / `#social` / `#future` |
| Book a seat | `#book` |
| Calendar | `#calendar` |
| Member directory | `#members` |
| News tracker | `#news` |
| Kids' device guide | `kids-devices/` (linked from `#calm`) |

The old page files (`education.html`, `about.html`, `tech-stack.html`, `security-fails.html`, `shop.html`) now redirect to the matching page, so old links keep working.

**Nothing loads from a third party.** React and fonts are served from this repo (`vendor/`, `fonts/`), not unpkg or Google Fonts. There are no trackers or cookies. The browser's local storage only remembers the last page you viewed.

```
.
├── index.html        # The site (template + page logic)
├── zpc-data.js       # Content: workshops, tools, fails, commons, library entries, guides
├── support.js        # Claude Design runtime (generated, do not edit)
├── vendor/           # React 18.3.1, ReactDOM, Babel (same files and hashes as the unpkg versions)
├── fonts/, css/fonts.css  # Archivo + Space Mono, self-hosted (SIL OFL)
├── img/              # Photos (see "Image credits")
├── news.json         # News tracker data (rebuilt daily by the Pages workflow)
├── scripts/fetch_news.py  # RSS feeds -> news.json
├── scripts/build_text.mjs # zpc-data.js + news.json -> text.html (the no-JavaScript version)
├── text.html         # Generated plain version of the site's core content
├── privacy.html, conduct.html, accessibility.html  # Plain policy pages (drafts; css/plain.css)
├── .well-known/security.txt  # Where to report vulnerabilities (renew yearly)
├── kids-devices/     # "Who can reach your kid?" families device guide (PDF, photos, sources)
├── design/           # Original Claude Design export files
├── favicon.svg, 404.html, robots.txt
└── *.html            # Redirects from the old site's pages
```

## Editing content

- **Workshop dates, calendar events, tools, fails, gear, library entries:** edit `zpc-data.js`. Calendar events are the `events` list: set `status` to `"confirmed"` when a date is set (it becomes bookable), keep `"proposed"` otherwise. Topics must be in `calendarTopics`. The member directory is `chapters` and `members` (initials only; currently sample data). The home page "Next up" card picks the next future workshop from this list automatically.
- **Page text and layout:** edit `index.html`, or edit the design in Claude Design and re-export it (see below).
- **Contact email:** `hello@zenxyprivacy.org` appears in `index.html` (`ZPC_INBOX` and a few `mailto:` links).

### Re-exporting from Claude Design

A fresh export replaces `index.html`. Changes made for the live site, which you need to re-apply (search `index.html` for these):

1. `<head>`: title, description, `noindex`, favicon, `css/fonts.css`, the `window.__resources` block that points React at `vendor/`, the `<noscript>` message. Remove the Google Fonts `<link>`s from `<helmet>`.
2. `ZPC_PAGES` + the `hashchange`/`pushState` code in `componentDidMount`/`goto` (per-page URLs and the Back button; guides use `#guide/<key>`). Also `DRAWER`, regrouped into Start / Learn / Guides / Tools / About to match the top nav.
3. `ZPC_INBOX` / `zpcMail` and the two `submit` handlers (forms open an email; see below).
4. `nextUp` (home "Next up" card).
5. Footer Newsletter/Contact `mailto:` links.
6. **Header and phone layout.** The `<header class="zh">` markup (text nav, search icon, short "Book" label on phones, menu button) and `cur` in the `nav` data (drives `aria-current`; comes from `sec`). Styling lives in `css/site.css`, which survives a re-export; only these class hooks need re-adding: `zh…` (header), the `<nav class="zb">` bottom tab bar right after the header, `PAGES` (four sections, each listing the pages it highlights on) and `sec` in the render data, `zt` (ticker), `zd` (menu drawer), `zs` (search dialog), `hero-in`, `hero-tags`, `hero-h1`, `hero-sticker`.
7. `<head>` extras for phones and sharing: `viewport-fit=cover`, `css/site.css`, the small scroll script (hides the header while scrolling down on phones), `site.webmanifest`, `apple-touch-icon`, and the Open Graph tags (`img/og-card.png`).
8. News tracker: `NEWS_TOPICS`, `newsAgo`, `loadNews`, the `news` value, the `#news` page section, the home "In the news" section, and the `news` entries in the nav, drawer, and explore lists.
9. The "Open the full device guide" link on the `#calm` page.
10. Calendar: the `cal` value, the `#calendar` section, the calendar button on `#workshops`, and the `calendar` entries in `ZPC_PAGES`, the Learn nav list, the menu, and `PAGE_META`.
12. Member directory: the `mem` value, the `#members` section, the "Meet the chapters" button on `#about`, and the `members` entries in `ZPC_PAGES`, the About nav list, the menu, and `PAGE_META`.
11. Photo credit captions (`calm.credit` and the two fixed captions), the "Skip to content" button (`skipToMain`, `id="main"` on `<main>`), and the footer links to the policy pages and text version.

## Pages that work without JavaScript

`privacy.html`, `conduct.html`, `accessibility.html`, `404.html`, and `text.html` are plain HTML. `text.html` is generated: edit `zpc-data.js` (or wait for the next headlines refresh) and run `node scripts/build_text.mjs`. The Pages workflow rebuilds it on every deploy. The `<noscript>` message in `index.html` sends visitors with JavaScript off to it.

## Forms

There's no form backend yet. The booking form and "Bring us to your city" form open the visitor's email app with a prefilled message to `ZPC_INBOX`, and the confirmation screen tells them to press send. To use a real backend, replace `zpcMail(...)` in the two `submit` handlers with a `fetch()` to your endpoint.

## Local preview

```
python3 -m http.server 8000     # then open http://localhost:8000
```

Opening `index.html` directly from disk (`file://`) won't work, because the browser blocks loading `zpc-data.js` that way.

## Review draft (GitHub Pages)

This copy is a **review draft**. Every page carries `<meta name="robots" content="noindex, nofollow">`, and `robots.txt` blocks crawlers. Remove both before the real launch.

Deployment: `.github/workflows/pages.yml` publishes the repo root on every push to `main`. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Deployment

`404.html` links to `/zpc/` (the GitHub Pages project path). Change it to `/` if the site moves to its own domain. The workflow deletes `design/` before publishing, so the raw Claude Design exports stay in the repo but off the site.

See `DEPLOYMENT.md`. The review draft deploys to GitHub Pages from `main` via `.github/workflows/pages.yml`.

## News tracker

`#news` shows privacy and security headlines from 17 RSS feeds (EFF, 404 Media, The Record, Krebs, Citizen Lab, Access Now, FTC consumer alerts, and others), with stories-per-day and by-topic charts, filters, and a link from each story to the ZPC page that helps. The home page shows the three latest.

- `scripts/fetch_news.py` (Python standard library only) reads the feeds, tags each story with topics by keyword, keeps 30 days of history, and writes `news.json`. The feed list and topic keywords are at the top of the script. Topic names must match `NEWS_TOPICS` in `index.html`.
- The Pages workflow runs it **once a day** (11:17 UTC). Scheduled runs are **paused until October 1, 2026**. Pushes to `main` deploy the site without re-fetching feeds (they reuse the published `news.json`). **Actions → Deploy to GitHub Pages → Run workflow** refreshes the feeds on demand.
- The page loads `news.json` fresh on every visit and has a "Load latest" button. Visitors' browsers never contact the news sites until they click a story.
- Run it locally: `python3 scripts/fetch_news.py`.

GitHub turns off scheduled workflows after 60 days with no commits to the repo; re-enable it under Actions if that happens.

## Kids' device guide

`kids-devices/` is the families guide ("Who can reach your kid?"): device picker, family plan, tech radar, country profiles, and a printable PDF. It's plain HTML (no React) but part of the ZPC site: ZPC header, footer, colors, and fonts, and it's linked from `#calm`. Its news box shows the tracker's "Kids & families" stories. It has its own README and photo credits (`image-credits.csv`). `grab_images.py` and the URL lists are the tools used to collect its photos.

## Image credits

- `img/classroom.jpg`: J R, Unsplash · `img/trail.jpg`: B T, Unsplash · `img/walkie.jpg`: K I M, Unsplash (Unsplash License)
- `img/tincan-hero.jpg`, `img/tincan-product.jpg`: Tin Can press page · `img/cosmo-bike.jpg`: Cosmo press page (press images for media use)

## License

Site code is open source; fork and adapt it. Fonts are SIL Open Font License. React is MIT.
