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
├── kids-devices/     # "Who can reach your kid?" parents' device guide (standalone page, PDF, photos, sources)
├── design/           # Original Claude Design export files
├── favicon.svg, 404.html, robots.txt
└── *.html            # Redirects from the old site's pages
```

## Editing content

- **Workshop dates, tools, fails, gear, library entries:** edit `zpc-data.js`. The home page "Next up" card picks the next future workshop from this list automatically.
- **Page text and layout:** edit `index.html`, or edit the design in Claude Design and re-export it (see below).
- **Contact email:** `hello@zenxyprivacy.org` appears in `index.html` (`ZPC_INBOX` and a few `mailto:` links).

### Re-exporting from Claude Design

A fresh export replaces `index.html`. Changes made for the live site, which you need to re-apply (search `index.html` for these):

1. `<head>`: title, description, `noindex`, favicon, `css/fonts.css`, the `window.__resources` block that points React at `vendor/`, the `<noscript>` message. Remove the Google Fonts `<link>`s from `<helmet>`.
2. `ZPC_PAGES` + the `hashchange`/`pushState` code in `componentDidMount`/`goto` (per-page URLs and the Back button).
3. `ZPC_INBOX` / `zpcMail` and the two `submit` handlers (forms open an email; see below).
4. `nextUp` (home "Next up" card).
5. Footer Newsletter/Contact `mailto:` links.
6. **Header and phone layout.** The `<header class="zh">` markup (text nav, search icon, short "Book" label on phones, menu button) and `cur` in the `nav` data (drives `aria-current`; comes from `sec`). Styling lives in `css/site.css`, which survives a re-export; only these class hooks need re-adding: `zh…` (header), the `<nav class="zb">` bottom tab bar right after the header, `PAGES` (four sections, each listing the pages it highlights on) and `sec` in the render data, `zt` (ticker), `zd` (menu drawer), `zs` (search dialog), `hero-in`, `hero-tags`, `hero-h1`, `hero-sticker`.
7. `<head>` extras for phones and sharing: `viewport-fit=cover`, `css/site.css`, the small scroll script (hides the header while scrolling down on phones), `site.webmanifest`, `apple-touch-icon`, and the Open Graph tags (`img/og-card.png`).

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

See `DEPLOYMENT.md`. The review draft deploys to GitHub Pages from `main` via `.github/workflows/pages.yml`.

## Kids' device guide

`kids-devices/` is a separate, self-contained page (plain HTML, no React) with its own README, photo credits (`image-credits.csv`), country data, and printable PDF. Its fonts are self-hosted too. Its "Live news" box uses Claude's Exa connector, so on the public site it falls back to curated stories and a Google News link. `grab_images.py` and the URL lists are the tools used to collect its photos.

## Image credits

- `img/classroom.jpg`: Jun Ren, Unsplash · `img/trail.jpg`: Brandee Taylor, Unsplash · `img/walkie.jpg`: Kedibone Isaac Makhumisane, Unsplash (Unsplash License)
- `img/tincan-hero.jpg`, `img/tincan-product.jpg`: Tin Can press page · `img/cosmo-bike.jpg`: Cosmo press page (press images for media use)

## License

Site code is open source; fork and adapt it. Fonts are SIL Open Font License. React is MIT.
