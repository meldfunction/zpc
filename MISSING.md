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
- ✅ **Registration is live (Oct 1).** `registration/` is deployed on Cloudflare at https://zpc-registration.bk-c5b.workers.dev, and the booking form uses it: seats left per session, waitlist, private cancel links, organizer page at `/admin`, bookings deleted 90 days after each session. The live service was checked: all five sessions open, only this site allowed in, organizer page locked, and a test booking cancelled cleanly. The privacy page now describes it. Pay-what-you-can amounts aren't sent to it, keeping the promise that they're never recorded against a name. Still to do: confirmation emails (none sent; the screen shows the confirmation and cancel link). Database `38477d2f…` runs in eastern North America (ENAM).
- ⬜ **Confirm hello@zenxyprivacy.org receives mail.** Every form and contact link depends on it.
- ⬜ **Venue address and online join link** for Oct 2. The site says "in the room or online" and "6:30–8 PM ET" but never says where.
- ⬜ **Check the fiscal-sponsor sentence** ("hosted by Limicelia, a fiscally sponsored project of ISI") with ISI, and confirm they're OK with it being public.
- ⬜ **Newsletter.** The footer link just emails you. Needs a list tool, or remove the link.
- ⬜ **Donations.** There's no donate link anywhere, though "sponsor a seat" is offered on the booking form.
- ⬜ **Naming mismatch.** Brand is "Zen Privacy Collective"; email and GitHub link are "zenxyprivacy". The footer links to `github.com/zenxyprivacy`: confirm that org exists (this repo is `meldfunction/zpc`).

## Calendar, policies & plain pages (Sept 30)
- ✅ **Calendar** (`#calendar`, under Learn; linked from Workshops): October's five confirmed workshops plus 21 **proposed** events through March 2027 across 10 topics (foundations, AI, devices, families, scams, data & exposure, organizations, organizing, high-risk, accounts). Month grid, topic filters, event details, "Add to my calendar" (.ics), and "Tell me when it's confirmed" for proposed dates. Events live in `zpc-data.js`.
- ✅ **Privacy policy, code of conduct, accessibility statement** (`privacy.html`, `conduct.html`, `accessibility.html`), plain HTML, linked from every footer. Drafts: see "Needs your input".
- ✅ **`/.well-known/security.txt`** for vulnerability reports (expires Sept 30, 2027: renew it yearly).
- ✅ **Text version** (`text.html`): workshops, calendar, how to book, headlines, fails, tools, gear, and library as one plain page. Rebuilt on every deploy by `scripts/build_text.mjs`. The no-JavaScript notice now points there instead of a dead end.
- ✅ **Photo credits** shown on the photos (Unsplash photographers, Tin Can and Cosmo press images). **"Skip to content"** link for keyboard users.

## 🟠 Needs your input: policies and trust
- ⬜ **Project tracker is example data.** `#projects` shows eight anonymized composite projects (a food network in RVA, a tenants' association in DOR, a legal clinic and a newsroom in DC, a housing co-op in PDX, a hotel workers' local in LA, a bakery co-op in RVA, a worker center in ATX). Before real projects go on it, get each group's OK to be listed, even anonymized, and never put anything on it the group wouldn't want public.
- ⬜ **Member directory is sample data.** `#members` lists six notional chapters (Dorchester MA, Richmond VA, DC, Los Angeles, Portland OR, Austin TX) and 18 made-up members by initials. Replace with real members' initials, roles, and languages in `chapters` / `members` in `zpc-data.js`, and remove the "Sample directory" notes (on `#members` and in `scripts/build_text.mjs`) when it's real. Check the chapter meeting spots too; they're invented.
- ⬜ **Approve the policy drafts.** They include promises the collective has to keep: booking emails deleted 90 days after a workshop, recordings shared only with registered participants and deleted after 90 days, small groups never recorded, replies within 14 days (privacy) or a week (accessibility), captions and large-print playbooks on request, five days' notice for ASL/childcare. Change anything that isn't true.
- ⬜ **Code of conduct:** name who handles reports, and a second person for reports about a facilitator.
- ⬜ **Accessibility:** add venue access details (step-free entry, restrooms, seating) once the venue is booked.
- ⬜ **Calendar:** the 21 proposed events (Nov–Mar) are placeholders with made-up dates and topics. Keep, change, or drop them, and flip `status` to `"confirmed"` in `zpc-data.js` as each is set.
- ⬜ **Secure contact channel.** The "Bring us" form asks for "Email or Signal", but ZPC doesn't publish its own Signal username or PGP key.
- ⬜ **Team/board names.** About covers governance and the sponsor, but names no people.
- ⬜ **Funding list.** About promises "we'll publish who funds us".
- ✅ **Image rights.** Permission granted (Oct 1) by Tin Can, Cosmo, Spacetalk, TickTalk, Gabb, and Bark. `kids-devices/image-credits.csv` and the guide's public credits list say "used with permission". Worth saving the brands' replies with the collective's records.
- ⬜ **News tracker review.** Check the feed list and topic keywords in `scripts/fetch_news.py`. Topics are keyword-tagged, so some stories land in odd buckets.

## 🟡 Technical
- ⬜ **GitHub Pages source.** Two deploy jobs run on each push ("Deploy to GitHub Pages" and the built-in "pages build and deployment"). Set Settings → Pages → Source to **GitHub Actions** so only ours publishes. Otherwise the branch copy can win: no fresh headlines, no fresh text version, and `design/` gets published.
- ⬜ **Scheduled workflows pause after 60 days without commits.** If headlines stop updating, re-enable the workflow under Actions.
- ⬜ **Security headers** (only if self-hosting; GitHub Pages can't set them). `DEPLOYMENT.md` now has a ready nginx config.
- ⬜ **Hand edits vs re-export.** Re-exporting from Claude Design overwrites the fixes above. README lists what to re-apply.
- ✅ **Launch switch ready (not run).** `node scripts/launch.mjs https://your-domain/` removes `noindex` from every page, opens `robots.txt`, writes `sitemap.xml`, and points the share tags, 404 links, and `security.txt` at the new address. Add `--dry-run` to preview. `scripts/build_text.mjs` now copies `index.html`'s noindex setting, so the nightly text rebuild won't re-hide the text page after launch.

## Ideas for later
- A **"last reviewed" date** on each tool, plus a link to its most recent security audit.
- A downloadable **printable checklist** from each workshop.
- **Incident help** page: "I think I've been hacked, what now?" with Access Now's Digital Security Helpline.
- A real **shop** for ZPC kits needs a payment provider, sales tax, and a returns policy. The Commons page is a vendor directory, not a store.
