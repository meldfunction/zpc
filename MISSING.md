# What's missing: ZPC website audit (Sept 29, 2026)

✅ = fixed in this version · ⬜ = still open (needs your input or a backend)

## 🔴 Fix before launch (workshop 1 is days away)
- ✅ **Wrong weekday.** Page said "Wednesdays", but Oct 2/9/16/23/30 2026 are all **Fridays**. Changed text to "Fridays". If Wednesdays was right, the dates should be Oct 7, 14, 21, 28 and Nov 4.
- ⬜ **No way to register.** "Get on the waiting list", "Donate now", "Newsletter", and "Contact" all point to `#`. The prerequisite course link says "provided on registration", but there is no registration.
- ⬜ **Tax-deductible claim before the IRS letter.** The EIN is "to be completed" but the site says donations are tax-deductible and calls ZPC a 501(c)(3). Check with your attorney. Until the determination letter arrives, wording like "501(c)(3) status pending" is usually safer.
- ⬜ **No venue address or virtual-join link** for workshops.
- ⬜ **No price.** It mentions sliding scale, but not the standard price.

## 🟠 Trust gaps (a privacy org gets judged on these)
- ⬜ **Privacy policy page.** The biggest gap for a privacy nonprofit.
- ⬜ **Recording and photo consent policy.** Sessions are recorded and kept for 90 days. Who can see them, how to opt out, and how they're deleted?
- ⬜ **Secure contact channel.** Add a Signal username, a PGP key, or a SecureDrop/OnionShare drop for sensitive enquiries. Right now there's only a plain email.
- ⬜ **`/.well-known/security.txt`** for vulnerability reports.
- ⬜ **Team, board, and bylaws.** No names, bios, or board list. "Backgrounds in EFF / Proton / DEFCON" can read as an affiliation. Name the real people or say "not affiliated with".
- ⬜ **Code of conduct** for workshops and community spaces.
- ⬜ **Funding transparency.** List funders, and post a Form 990 once one exists.
- ⬜ **Accessibility statement** and a way to request accommodations (the ASL and childcare offer needs a request form or contact).
- ⬜ **Naming mismatch.** Brand is "Zen Privacy Collective", but the domain and GitHub are "zenxyprivacy". Pick one.

## 🟡 Technical / security hardening
- ✅ External links now use `rel="noopener noreferrer"` (stops leaking the referring page to outside sites).
- ✅ The nav now wraps on phones (there are 6 links now).
- ⬜ **Security headers** missing from the nginx config in DEPLOYMENT.md: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, `Permissions-Policy`, `server_tokens off`, and a port 80→443 redirect.
- ⬜ No `404.html`, favicon, `robots.txt`, `sitemap.xml`, or Open Graph/social preview tags.
- ⬜ No "skip to content" link, and no highlight on the current page in the nav.
- ⬜ README says "All CSS inlined". It isn't (it's in `css/styles.css`). Fine as is, but fix the claim.
- ⬜ The analytics suggestion loads a third-party script. For a privacy org, prefer self-hosted analytics, log-based stats, or none.

## 🔵 Content: outdated or unclear (✅ fixed)
- ✅ Llama 2 (2023) → "Open-weight models" (Llama, Mistral, Qwen, Gemma). Workshop 3 updated to match.
- ✅ "OpenClaw-style infrastructure" (unexplained jargon) → plain wording.
- ✅ `ollama.ai` → `ollama.com`, `tails.boum.org` → `tails.net`, `getfedora.org` → `fedoraproject.org`.
- ✅ Terraform is no longer open source (BSL licence) → added OpenTofu. Gitea → added Forgejo.
- ✅ Removed the specific "$49 Shodan membership" price, which goes stale.

## 🟢 Added in this version
- ✅ **Augmented data / dimensions.** Every tool on the Tech Stack page now has tags for **Licence · Control (self-host/local) · Cost tier · Difficulty · Threat tier**, plus a legend explaining them.
- ✅ **Missing tool categories added:** Mobile (GrapheneOS, Aegis/Ente Auth, F-Droid) · VPN & DNS (Mullvad, Quad9, Pi-hole) · Encryption & backup (VeraCrypt, Cryptomator, restic) · Sharing & cleanup (OnionShare, mat2/ExifTool, CryptPad, Jitsi) · Qubes OS.
- ✅ **`security-fails.html`**: 18 common failure scenarios. It starts with a table (how common, impact, fix effort, which workshop covers it), then gives each scenario a real-world example and a fix.
- ✅ **`shop.html`**: 3 starter kits with price ranges, buy-safely rules, and 26 items across 7 categories (security keys, phones, laptops, network, storage/physical, open-hardware stores, paid services). Every link goes directly to the vendor.
- ✅ Homepage "Start here" cards link to the new pages.

## Ideas for later (other dimensions)
- Threat-model **personas** ("I'm an organizer / journalist / survivor / small nonprofit") that each give a filtered tool list and kit.
- A **"last reviewed" date** on each tool, plus a link to its most recent security audit.
- A downloadable **printable checklist** from each workshop.
- **Resources/blog** section, an FAQ, and a glossary (E2E, MFA, FIDO2, metadata…).
- **Incident help** page: "I think I've been hacked — what now?" with links to Access Now's Digital Security Helpline.
- A real **shop** (selling ZPC-branded kits) needs a payment provider, sales-tax handling, and a returns policy. The current page is a vendor directory, not a store.
