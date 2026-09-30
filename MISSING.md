# What's missing: ZPC website audit (updated Sept 30, 2026, redesign build)

✅ = done · ⬜ = still open (needs your input or a backend)

## Redesign build (Sept 30)
- ✅ Worker-co-op redesign from Claude Design is live as `index.html` (21 pages, search, quiz, guides, library).
- ✅ Each page has its own URL (`#workshops`, `#library`, …) and the Back button works. The design only remembered the last page.
- ✅ Old page URLs (`education.html`, `shop.html`, …) redirect to the matching new page.
- ✅ **No third-party requests.** The design loaded React from unpkg.com and fonts from Google Fonts, which tells both companies about every visitor. Both are now served from this repo.
- ✅ Forms no longer pretend: the design showed "You're in." but sent nothing anywhere. They now open a prefilled email to hello@zenxyprivacy.org and tell the visitor to press send.
- ✅ Home "Next up" card was hardcoded to "This Friday · Oct 02". It now shows the next future session from `zpc-data.js`.
- ✅ Footer Newsletter/Contact were `#`; now `mailto:` links. Added page title, description, favicon, `404.html`, and a no-JavaScript message.
- ✅ Tax-deductible / "501(c)(3)" claim is gone. The About page now says ZPC is hosted by Limicelia, a fiscally sponsored project of ISI, a 501(c)(3).

## Phone & navigation pass (Sept 30)
- ✅ **Phone header went from a third of the screen to one 60px row**: logo, search icon, "Book", menu. The six section links live in the menu on phones and tablets.
- ✅ **Header hides while you scroll down on phones** and comes back on any scroll up, so reading gets the full screen.
- ✅ **Desktop nav is plain text links** instead of six boxed buttons, with the current page highlighted (and announced to screen readers via `aria-current`).
- ✅ **Hero on phones:** headline uses the full width (was one word per line), the "No one turned away" sticker no longer covers the tags, and the scrolling ticker is hidden on phones.
- ✅ **Menu and search open full-screen on phones**, with room for the iPhone notch and home bar. Every header button is at least 44×44px (Apple's minimum tap size).
- ✅ **Reduced motion respected:** the ticker stops and the header doesn't slide for visitors who turn motion off.
- ✅ **Four sections instead of six:** Learn · Guides · Tools · About. Each stays highlighted on its related pages (e.g. Library → Learn, Commons → Tools). "Hire us" now sits under About; everything is still in the full menu.
- ✅ **Bottom tab bar on phones:** Home · Learn · Guides · Search · Book, where the thumb already is. The top bar on phones is just the logo and the menu. The tab bar hides while typing so it doesn't ride up on the keyboard.
- ✅ **Integration pass:** each guide has its own shareable address (`#guide/orgs`, `#guide/pros`, …) and Back/Forward work between them; the full menu is regrouped to match the top nav (Start · Learn · Guides · Tools · About); the kids' device guide links back to the Families page; the "page not found" link now goes to the site instead of `github.io`; the raw design exports in `design/` are no longer published.
- ✅ **Presence:** share-preview image for links sent in iMessage/Signal/Slack (`img/og-card.png`), home-screen icon, and a web manifest so "Add to Home Screen" shows ZPC properly.

## 🔴 Needs your input before launch (workshop 1 is Friday, Oct 2)
- ⬜ **Real registration.** Email is a stopgap: someone must watch hello@zenxyprivacy.org, and there's no seat count against the "20 seats per room" promise. Pick a form tool (e.g. a self-hosted form, Cryptpad form, or a ticketing tool) and swap `zpcMail` for it.
- ⬜ **Confirm hello@zenxyprivacy.org receives mail.** Every form and contact link depends on it.
- ⬜ **Venue address and online join link** for Oct 2. The site says "in the room or online" and "6:30–8 PM ET" but never says where.
- ⬜ **Check the fiscal-sponsor sentence** ("hosted by Limicelia, a fiscally sponsored project of ISI") with ISI, and confirm they're OK with it being public.
- ⬜ **Newsletter.** The footer link just emails you. Needs a list tool, or remove the link.
- ⬜ **Donations.** There's no donate link anywhere, though "sponsor a seat" is offered on the booking form.
- ⬜ **Naming mismatch.** Brand is "Zen Privacy Collective"; email and GitHub link are "zenxyprivacy". The footer links to `github.com/zenxyprivacy`: confirm that org exists (this repo is `meldfunction/zpc`).

## 🟠 Trust gaps (still open)
- ⬜ **Privacy policy page.** Short and true is fine: no trackers, no cookies, local storage remembers the last page, form emails go to one inbox.
- ⬜ **Secure contact channel.** The "Bring us" form asks for "Email or Signal", but ZPC doesn't publish its own Signal username or PGP key.
- ⬜ **`/.well-known/security.txt`**, code of conduct, accessibility statement. The booking form now offers ASL and childcare requests (they arrive in the email).
- ⬜ **Team/board names.** About covers governance and the sponsor, but names no people.
- ⬜ **Funding list.** About promises "we'll publish who funds us".
- ⬜ **Image rights.** Three photos are Tin Can / Cosmo press images (for media use). Consider asking permission, since this is an advocacy site rather than press. Credits are in README; Unsplash asks for on-page credit where practical.

## 🟡 Technical
- ⬜ **JavaScript required.** Visitors with JavaScript off (Tor Browser "Safest", NoScript), a big share of a privacy audience, see only a short notice with the email address. A later step could pre-render the pages to plain HTML.
- ⬜ **Security headers** (for self-hosting; GitHub Pages can't set them): CSP (`script-src 'self'` works, no CDN needed now), HSTS, `Referrer-Policy: no-referrer` (also set via meta tag), `X-Content-Type-Options`, `Permissions-Policy`.
- ⬜ **Hand edits vs re-export.** Re-exporting from Claude Design overwrites the fixes above. README lists what to re-apply.
- ⬜ `sitemap.xml`, Open Graph tags. Leave until the `noindex` review-draft flags come off.
- ⬜ **Kids' device guide (`kids-devices/`) photo permissions.** Now published and linked from the Families page. Five brand photos are marked "Permission pending" in `kids-devices/image-credits.csv` (Spacetalk ×2, TickTalk, Gabb, Bark). Get a yes or swap them before the `noindex` comes off. Still missing images: Garmin Bounce 2, Verizon Gizmo Watch 4, Xplora, Apple Watch, Xiaotiancai (drawn icons for now).
- ✅ Kids' guide is part of the ZPC site now (ZPC header/footer, colors, fonts). Its Claude-only "Live news" box is replaced by the news tracker's Kids & families stories, and "Download my plan" works as a normal browser download.
- ✅ **News tracker** (`#news`): 17 RSS feeds, refreshed daily by the Pages workflow (scheduled runs start Oct 1), with per-day and per-topic charts.
- ⬜ **News tracker review.** Check the feed list and topic keywords in `scripts/fetch_news.py`. Topics are keyword-tagged, so some stories land in odd buckets. Some feeds include opinion or sponsor posts.

---

# Earlier audit (Sept 29, previous site)

### 🔴 Fix before launch (workshop 1 is days away)
- ✅ **Wrong weekday.** Page said "Wednesdays", but Oct 2/9/16/23/30 2026 are all **Fridays**. Changed text to "Fridays". If Wednesdays was right, the dates should be Oct 7, 14, 21, 28 and Nov 4.
- ⬜ **No way to register.** "Get on the waiting list", "Donate now", "Newsletter", and "Contact" all point to `#`. The prerequisite course link says "provided on registration", but there is no registration.
- ⬜ **Tax-deductible claim before the IRS letter.** The EIN is "to be completed" but the site says donations are tax-deductible and calls ZPC a 501(c)(3). Check with your attorney. Until the determination letter arrives, wording like "501(c)(3) status pending" is usually safer.
- ⬜ **No venue address or virtual-join link** for workshops.
- ⬜ **No price.** It mentions sliding scale, but not the standard price.

### 🟠 Trust gaps (a privacy org gets judged on these)
- ⬜ **Privacy policy page.** The biggest gap for a privacy nonprofit.
- ⬜ **Recording and photo consent policy.** Sessions are recorded and kept for 90 days. Who can see them, how to opt out, and how they're deleted?
- ⬜ **Secure contact channel.** Add a Signal username, a PGP key, or a SecureDrop/OnionShare drop for sensitive enquiries. Right now there's only a plain email.
- ⬜ **`/.well-known/security.txt`** for vulnerability reports.
- ⬜ **Team, board, and bylaws.** No names, bios, or board list. "Backgrounds in EFF / Proton / DEFCON" can read as an affiliation. Name the real people or say "not affiliated with".
- ⬜ **Code of conduct** for workshops and community spaces.
- ⬜ **Funding transparency.** List funders, and post a Form 990 once one exists.
- ⬜ **Accessibility statement** and a way to request accommodations (the ASL and childcare offer needs a request form or contact).
- ⬜ **Naming mismatch.** Brand is "Zen Privacy Collective", but the domain and GitHub are "zenxyprivacy". Pick one.

### 🟡 Technical / security hardening
- ✅ External links now use `rel="noopener noreferrer"` (stops leaking the referring page to outside sites).
- ✅ The nav now wraps on phones (there are 6 links now).
- ⬜ **Security headers** missing from the nginx config in DEPLOYMENT.md: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, `Permissions-Policy`, `server_tokens off`, and a port 80→443 redirect.
- ⬜ No `404.html`, favicon, `robots.txt`, `sitemap.xml`, or Open Graph/social preview tags.
- ⬜ No "skip to content" link, and no highlight on the current page in the nav.
- ⬜ README says "All CSS inlined". It isn't (it's in `css/styles.css`). Fine as is, but fix the claim.
- ⬜ The analytics suggestion loads a third-party script. For a privacy org, prefer self-hosted analytics, log-based stats, or none.

### 🔵 Content: outdated or unclear (✅ fixed)
- ✅ Llama 2 (2023) → "Open-weight models" (Llama, Mistral, Qwen, Gemma). Workshop 3 updated to match.
- ✅ "OpenClaw-style infrastructure" (unexplained jargon) → plain wording.
- ✅ `ollama.ai` → `ollama.com`, `tails.boum.org` → `tails.net`, `getfedora.org` → `fedoraproject.org`.
- ✅ Terraform is no longer open source (BSL licence) → added OpenTofu. Gitea → added Forgejo.
- ✅ Removed the specific "$49 Shodan membership" price, which goes stale.

### 🟢 Added in this version
- ✅ **Augmented data / dimensions.** Every tool on the Tech Stack page now has tags for **Licence · Control (self-host/local) · Cost tier · Difficulty · Threat tier**, plus a legend explaining them.
- ✅ **Missing tool categories added:** Mobile (GrapheneOS, Aegis/Ente Auth, F-Droid) · VPN & DNS (Mullvad, Quad9, Pi-hole) · Encryption & backup (VeraCrypt, Cryptomator, restic) · Sharing & cleanup (OnionShare, mat2/ExifTool, CryptPad, Jitsi) · Qubes OS.
- ✅ **`security-fails.html`**: 18 common failure scenarios. It starts with a table (how common, impact, fix effort, which workshop covers it), then gives each scenario a real-world example and a fix.
- ✅ **`shop.html`**: 3 starter kits with price ranges, buy-safely rules, and 26 items across 7 categories (security keys, phones, laptops, network, storage/physical, open-hardware stores, paid services). Every link goes directly to the vendor.
- ✅ Homepage "Start here" cards link to the new pages.

### Ideas for later (other dimensions)
- Threat-model **personas** ("I'm an organizer / journalist / survivor / small nonprofit") that each give a filtered tool list and kit.
- A **"last reviewed" date** on each tool, plus a link to its most recent security audit.
- A downloadable **printable checklist** from each workshop.
- **Resources/blog** section, an FAQ, and a glossary (E2E, MFA, FIDO2, metadata…).
- **Incident help** page: "I think I've been hacked — what now?" with links to Access Now's Digital Security Helpline.
- A real **shop** (selling ZPC-branded kits) needs a payment provider, sales-tax handling, and a returns policy. The current page is a vendor directory, not a store.
