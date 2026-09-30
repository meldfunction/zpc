export const workshops = [
  { n: 1, day: "02", mon: "Oct", date: "Friday, October 2, 2026", title: "Digital Hygiene Foundations",
    blurb: "Threat modeling for individuals and small organizations. We'll inventory your digital exposure, identify who wants what about you, and build a personal privacy baseline.",
    learn: ["What counts as personally identifiable information, and why it matters", "Threat modeling basics: adversaries, assets, and likelihood", "Data inventory: where your data lives and who holds it", "Creating a personal digital hygiene checklist"],
    prereq: "Free 1-hour course: \u201cDigital Privacy Fundamentals\u201d (link sent when you book)" },
  { n: 2, day: "09", mon: "Oct", date: "Friday, October 9, 2026", title: "Secure Communications & Tools",
    blurb: "Move beyond app choices to protocol design. We'll build a communications stack for your team, evaluate tools critically, and practice habits that stick.",
    learn: ["End-to-end encryption: what it is and what it isn't", "Evaluating tools critically (Proton, Signal, Matrix/Element, etc.)", "Team communication agreements that work", "Operational security (OPSEC) for remote teams", "Incident response for compromised communications"],
    prereq: "Workshop 1 or equivalent knowledge" },
  { n: 3, day: "16", mon: "Oct", date: "Friday, October 16, 2026", title: "Local AI Infrastructure & Privacy",
    blurb: "Run AI tools without cloud vendors. We'll set up local models, explore privacy-preserving compute patterns, and understand data sovereignty in practice.",
    learn: ["How cloud AI models train on user data (and what that means)", "Local-first AI infrastructure: Ollama, open models, and more", "Privacy-preserving techniques: differential privacy, federated learning", "Hands-on: set up Ollama with a current open-weight model", "Self-hosted assistants for organizations: what to run, where, and who sees the data"],
    prereq: "Basic command-line comfort, or Workshops 1 + 2" },
  { n: 4, day: "23", mon: "Oct", date: "Friday, October 23, 2026", title: "Computer Use Security & OPSEC",
    blurb: "Secure your machine and your habits. Device hardening, browser isolation, and the human practices that matter more than tools.",
    learn: ["Device inventory and threat assessment", "Operating system hardening (macOS, Linux, Windows)", "Browser isolation and privacy configurations", "Password management and secret handling", "Detecting compromise: what to look for", "OPSEC habits for high-risk work"],
    prereq: "Workshops 1\u20133 or equivalent" },
  { n: 5, day: "30", mon: "Oct", date: "Friday, October 30, 2026", title: "Organizational Privacy Systems",
    tag: "Capstone",
    blurb: "Build privacy governance that sticks. Design policies, create accountability structures, and align privacy with your organization's values and decision-making.",
    learn: ["Privacy policies that teams actually follow", "Governance structures for privacy decisions (including consent-based and co-op models)", "Training and culture change", "Audit and accountability mechanisms", "Building a privacy-first culture over time"],
    prereq: "Workshops 1\u20134 or equivalent knowledge" }
];

// Member directory (#members). SAMPLE DATA: notional chapters and members for layout and review, not real people.
// Members appear by initials only. `focus` values must be in calendarTopics. Contact goes through the shared inbox.
export const chapters = [
  { k: "LA", name: "Los Angeles", region: "California", status: "Forming", meets: "Second Saturdays, rotating union halls",
    blurb: "Hospitality and garment workers, Koreatown small businesses, and film crews who carry the whole shoot on one laptop." },
  { k: "PDX", name: "Portland", region: "Oregon", status: "Forming", meets: "Third Wednesdays, a bike co-op back room",
    blurb: "Self-hosters, survivors' advocates, and mutual aid crews who'd rather run their own tools than rent them." },
  { k: "ATX", name: "Austin", region: "Texas", status: "Forming", meets: "Last Sundays, a worker center",
    blurb: "Construction and service workers, parents pushing back on school surveillance, and engineers who know what AI agents can reach." },
  { k: "RVA", name: "Richmond", region: "Virginia", status: "Founding chapter", meets: "First Tuesdays, a library meeting room",
    blurb: "Worker co-ops, teachers, and the mutual aid networks that kept people fed in 2020 and never stopped." },
  { k: "DC", name: "Washington", region: "District of Columbia", status: "Founding chapter", meets: "Every other Thursday, online and in person",
    blurb: "Journalists, immigrant service groups, and policy nerds who read the bill so you don't have to." },
  { k: "DOR", name: "Dorchester", region: "Boston, Massachusetts", status: "Founding chapter", meets: "First Thursdays, a community room near Fields Corner",
    blurb: "Triple-deckers, corner stores, and neighbors who speak Haitian Creole, Vietnamese, Cape Verdean Kriolu, and English." }
];
export const members = [
  { i: "M D", c: "DOR", role: "Facilitator", since: 2025, langs: ["Haitian Creole", "English"], focus: ["Scams", "Families"],
    bio: "Spent a decade fixing computers at the branch library. Now runs our scam-proof-your-parents nights, code words and all." },
  { i: "T N", c: "DOR", role: "Tech steward", since: 2025, langs: ["Vietnamese", "English"], focus: ["Devices", "Accounts & comms"],
    bio: "Sets up phones and point-of-sale tablets for family businesses on Dot Ave. Believes every shop needs two security keys." },
  { i: "R A", c: "DOR", role: "Organizer", since: 2026, langs: ["Cape Verdean Kriolu", "Portuguese", "English"], focus: ["Organizing", "Data & exposure"],
    bio: "Tenant organizer. Moved the building association off a public group chat and onto Signal in one weekend." },

  { i: "K W", c: "RVA", role: "Accompaniment", since: 2025, langs: ["English"], focus: ["Organizations", "Foundations"],
    bio: "Helped start three worker co-ops. Brings the privacy questions into bylaws and onboarding, not just the IT closet." },
  { i: "J L", c: "RVA", role: "Facilitator", since: 2025, langs: ["English", "Spanish"], focus: ["Families", "Foundations"],
    bio: "High school teacher who read the terms of every app the district bought. Leads the teens-and-phones agreement nights." },
  { i: "D P", c: "RVA", role: "Organizer", since: 2026, langs: ["English"], focus: ["Organizing", "Data & exposure"],
    bio: "Runs a food distribution list with 400 households on it. Collects less data every year, on purpose." },

  { i: "A S", c: "DC", role: "Researcher", since: 2025, langs: ["English", "French"], focus: ["Organizing", "AI"],
    bio: "Tracks privacy bills and workplace monitoring rules. Explains them in one page, with what changes on Monday." },
  { i: "B O", c: "DC", role: "Facilitator", since: 2025, langs: ["English", "Yoruba"], focus: ["High-risk", "Accounts & comms"],
    bio: "Trains reporters on safer first contact with sources. Will ask what your phone number is attached to." },
  { i: "L M", c: "DC", role: "Accompaniment", since: 2026, langs: ["Spanish", "English"], focus: ["High-risk", "Organizations"],
    bio: "Volunteers with immigrant legal clinics. Cleans up case files, shared drives, and who can see them." },

  { i: "C R", c: "LA", role: "Organizer", since: 2026, langs: ["Spanish", "English"], focus: ["Organizing", "Devices"],
    bio: "Hospitality union rep. Teaches what to carry to a picket line, and what to leave at home." },
  { i: "Y K", c: "LA", role: "Facilitator", since: 2026, langs: ["Korean", "English"], focus: ["Scams", "Organizations"],
    bio: "Helps Koreatown shop owners spot fake invoices, fake bank calls, and fake landlords." },
  { i: "E V", c: "LA", role: "Tech steward", since: 2026, langs: ["English", "Armenian"], focus: ["Devices", "Data & exposure"],
    bio: "Film crew data wrangler. Runs laptop clinics: updates, backups, encryption, in that order." },

  { i: "S H", c: "PDX", role: "Tech steward", since: 2025, langs: ["English"], focus: ["AI", "Organizations"],
    bio: "Sysadmin who self-hosts everything, including a small open model for the co-op's paperwork. Teaches the local AI session." },
  { i: "N F", c: "PDX", role: "Accompaniment", since: 2026, langs: ["English", "ASL"], focus: ["High-risk", "Families"],
    bio: "Works with survivors' advocates on stalkerware, shared accounts, and safe device handoffs." },
  { i: "P G", c: "PDX", role: "Facilitator", since: 2026, langs: ["English", "Russian"], focus: ["Devices", "Foundations"],
    bio: "Runs the drop-in device clinics out of a bike co-op. No judgment, lots of stickers." },

  { i: "G T", c: "ATX", role: "Organizer", since: 2026, langs: ["Spanish", "English"], focus: ["Organizing", "Scams"],
    bio: "Worker center volunteer. Helps crews document wage theft without exposing themselves in the process." },
  { i: "H B", c: "ATX", role: "Researcher", since: 2026, langs: ["English", "Mandarin"], focus: ["AI", "Accounts & comms"],
    bio: "Software engineer who breaks AI assistants for a living. Explains prompt injection with real, boring examples." },
  { i: "O J", c: "ATX", role: "Facilitator", since: 2026, langs: ["English"], focus: ["Families", "Data & exposure"],
    bio: "Parent of three who got the school district to publish what its apps collect. Leads the holiday gadget check." }
];

// Calendar (#calendar). One row per event. `series: n` pulls title and blurb from the workshops list above.
// status: "confirmed" (bookable) or "proposed" (shown as a draft; visitors can ask to be told when it's set).
// t: start and end, US Eastern. page: the ZPC page for "Learn more". Topics must be in calendarTopics.
export const calendarTopics = ["Foundations", "Accounts & comms", "AI", "Devices", "Families", "Scams", "Data & exposure", "Organizations", "Organizing", "High-risk"];
export const events = [
  { d: "2026-10-02", t: ["18:30", "20:00"], series: 1, topic: "Foundations", status: "confirmed", page: "workshops" },
  { d: "2026-10-09", t: ["18:30", "20:00"], series: 2, topic: "Accounts & comms", status: "confirmed", page: "workshops" },
  { d: "2026-10-14", t: ["12:00", "13:00"], kind: "Office hours", where: "Online", topic: "Foundations", status: "proposed", page: "quiz",
    title: "Office hours: bring your questions", blurb: "Half an hour of open questions with a facilitator. Stuck on a setting, a scary email, or where to start? Bring it." },
  { d: "2026-10-16", t: ["18:30", "20:00"], series: 3, topic: "AI", status: "confirmed", page: "ai" },
  { d: "2026-10-23", t: ["18:30", "20:00"], series: 4, topic: "Devices", status: "confirmed", page: "phone" },
  { d: "2026-10-24", t: ["10:00", "12:00"], kind: "Clinic", where: "In person", topic: "Devices", status: "proposed", page: "phone",
    title: "Phone clinic: lock it down in ten minutes", blurb: "Drop in with your phone. We go through the eleven switches on our phone checklist with you, one person at a time." },
  { d: "2026-10-30", t: ["18:30", "20:00"], series: 5, topic: "Organizations", status: "confirmed", page: "workshops" },

  { d: "2026-11-05", t: ["18:30", "20:00"], kind: "Community night", topic: "Scams", status: "proposed", page: "fails",
    title: "Scam-proof your parents: voice clones and fake invoices", blurb: "Bring a parent, grandparent, or neighbor. We practice spotting AI voice clones, fake invoices, and \u201curgent\u201d texts, and set up a family code word." },
  { d: "2026-11-12", t: ["18:30", "20:00"], kind: "Workshop", topic: "Data & exposure", status: "proposed", page: "stack",
    title: "Data broker opt-out night", blurb: "Search yourself like an attacker would, then work through the big people-search sites and LexisNexis opt-outs together." },
  { d: "2026-11-18", t: ["18:30", "20:00"], kind: "Workshop", topic: "Organizing", status: "proposed", page: "guide",
    title: "Group chats for organizers: the Signal settings that matter", blurb: "Disappearing messages, usernames instead of phone numbers, admin roles, and what to do when a phone gets taken." },
  { d: "2026-11-21", t: ["10:00", "12:00"], kind: "Clinic", where: "In person", topic: "Devices", status: "proposed", page: "tools",
    title: "Laptop clinic: updates, backups, encryption", blurb: "Bring your laptop. Leave with updates on, a backup that works, and the disk encrypted." },

  { d: "2026-12-03", t: ["18:30", "20:00"], kind: "Community night", topic: "Families", status: "proposed", page: "calm",
    title: "Holiday gadget check: smart toys, kids' watches, first phones", blurb: "Before you wrap it: what the gift collects, who can contact your kid through it, and calmer alternatives." },
  { d: "2026-12-10", t: ["18:30", "20:00"], kind: "Workshop", topic: "Organizations", status: "proposed", page: "services",
    title: "Year-end security review for co-ops and nonprofits", blurb: "Who still has access, which accounts lack MFA, and what to fix first. Leave with a one-page plan for next year." },
  { d: "2026-12-15", t: ["12:00", "13:00"], kind: "Workshop", where: "Online", topic: "Accounts & comms", status: "proposed", page: "tools",
    title: "Password manager setup party", blurb: "Install one, import your saved passwords, and set up emergency access, together in one lunch hour." },

  { d: "2027-01-08", t: ["18:30", "20:00"], kind: "Workshop", topic: "Foundations", status: "proposed", page: "workshops",
    title: "Winter series begins: Digital Hygiene Foundations", blurb: "The five-Friday series runs again. Week one: threat modeling and your personal privacy baseline." },
  { d: "2027-01-14", t: ["18:30", "20:00"], kind: "Workshop", topic: "AI", status: "proposed", page: "ai",
    title: "Local AI in an afternoon: open models for small orgs", blurb: "Run a current open-weight model on your own machine, and decide what your group should never paste into a cloud chatbot." },
  { d: "2027-01-21", t: ["18:30", "20:00"], kind: "Workshop", topic: "Organizations", status: "proposed", page: "services",
    title: "Privacy governance for co-ops: consent, roles, and records", blurb: "Who decides, who has access, and how long you keep member data. Fits consent-based and co-op decision-making." },
  { d: "2027-01-27", t: ["12:00", "13:00"], kind: "Talk", where: "Online", topic: "High-risk", status: "proposed", page: "needs",
    title: "Journalists and sources: safer first contact", blurb: "How a source can reach you without leaving a trail, and what to set up before the first message arrives." },

  { d: "2027-02-04", t: ["18:30", "20:00"], kind: "Talk", topic: "AI", status: "proposed", page: "ai",
    title: "AI agents at work: prompt injection and over-permissioned tools", blurb: "Real cases of assistants tricked by an email or a web page, and the permission limits that stop them." },
  { d: "2027-02-11", t: ["18:30", "20:00"], kind: "Workshop", topic: "High-risk", status: "proposed", page: "needs",
    title: "Tech safety with survivors' advocates", blurb: "Stalkerware, shared accounts, location sharing, and safe device handoffs, built with advocates who do this work." },
  { d: "2027-02-18", t: ["18:30", "20:00"], kind: "Workshop", topic: "Organizing", status: "proposed", page: "phone",
    title: "Devices at protests and borders: know your rights", blurb: "What to carry, what to leave, and how to lock your phone so a quick look doesn't become a full copy." },
  { d: "2027-02-27", t: ["10:00", "12:00"], kind: "Clinic", where: "In person", topic: "Devices", status: "proposed", page: "phone",
    title: "Device clinic: bring anything", blurb: "Phones, laptops, routers, smart speakers. One-on-one help, no judgment." },

  { d: "2027-03-04", t: ["18:30", "20:00"], kind: "Community night", topic: "Families", status: "proposed", page: "calm",
    title: "Teens and phones: write a family tech agreement", blurb: "Parents and teens together. Leave with an agreement you both wrote, and a date to revisit it." },
  { d: "2027-03-11", t: ["18:30", "20:00"], kind: "Workshop", topic: "Organizations", status: "proposed", page: "stack",
    title: "Shared drives and member lists: the co-op cleanup", blurb: "Find the \u201canyone with the link\u201d files, trim who has access, and delete what you no longer need." },
  { d: "2027-03-18", t: ["18:30", "20:00"], kind: "Workshop", topic: "Data & exposure", status: "proposed", page: "social",
    title: "Face, voice, and socials: build your invisibility cloak", blurb: "Lock down your accounts and make your face and voice harder to scrape, clone, or misuse." },
  { d: "2027-03-25", t: ["18:30", "20:00"], kind: "Talk", topic: "Organizing", status: "proposed", page: "problem",
    title: "Worker data rights and workplace surveillance", blurb: "What your employer can see, what the law says, and how unions are bargaining over monitoring tools." }
];

const G = "good", W = "warn", N = "", R = "risk";
export const toolGroups = [
  { title: "Communication & collaboration", cats: [
    { title: "Encrypted messaging", items: [
      ["Signal", [["Open source",G],["E2E",G],["Free",N],["Easy",N]], "End-to-end encrypted messaging, calls, and groups. Open-source protocol with independent audits. Desktop and mobile.", "signal.org"],
      ["Matrix / Element", [["Open source",G],["Self-hostable",G],["E2E",G],["Free",N],["Medium",W]], "Decentralized, self-hostable messaging with E2E encryption. Federated like email. Bridges to other networks.", "element.io"],
      ["Briar", [["Open source",G],["Peer-to-peer",G],["Free",N],["Medium",W],["Android",N]], "Peer-to-peer messaging that works without internet if needed. Tor-integrated. Useful under censorship.", "briarproject.org"]]},
    { title: "Email & document exchange", items: [
      ["Proton Mail", [["Open-source apps",G],["E2E",G],["Free\u2013$",N],["Easy",N]], "End-to-end encrypted email with open-source cryptography and zero-access design.", "proton.me"],
      ["Mailbox.org", [["Proprietary",W],["$",N],["Easy",N]], "Privacy-respecting email with optional PGP. German privacy law, strong anti-surveillance stance.", "mailbox.org"],
      ["OpenPGP", [["Open standard",G],["Free",N],["Advanced",W]], "Resources and tools for PGP encryption. A legacy standard, still widely supported in the security community.", "openpgp.org"]]},
    { title: "Project collaboration", items: [
      ["Nextcloud", [["Open source",G],["Self-hostable",G],["Free\u2013$$",N],["Medium",W]], "Self-hosted file sync, calendar, contacts, and tasks. Full control over your shared data.", "nextcloud.com"],
      ["Forgejo / Gitea", [["Open source",G],["Self-hostable",G],["Free",N],["Medium",W]], "Self-hosted git. Forgejo is the community-governed fork, with federation work underway.", "forgejo.org"],
      ["OnlyOffice", [["Open source",G],["Self-hostable",G],["Free\u2013$$",N],["Medium",W]], "Self-hosted document collaboration, interoperable with Microsoft and Google formats.", "onlyoffice.com"],
      ["CryptPad", [["Open source",G],["Self-hostable",G],["E2E",G],["Free\u2013$",N],["Easy",N]], "End-to-end encrypted docs, sheets, forms, and kanban boards. A private alternative to Google Docs.", "cryptpad.org"],
      ["Jitsi Meet", [["Open source",G],["Self-hostable",G],["Free",N],["Easy",N]], "Video meetings in the browser, no account required. Self-host for full control.", "jitsi.org"]]}]},
  { title: "Local & self-hosted infrastructure", cats: [
    { title: "AI & language models (local-first)", items: [
      ["Ollama", [["Open source",G],["Local",G],["Free",N],["Medium",W]], "Run large language models locally. Simple CLI. No cloud, no tracking.", "ollama.com"],
      ["LM Studio", [["Proprietary app",W],["Local",G],["Free",N],["Easy",N]], "Desktop app for running local models. GUI-based and beginner-friendly.", "lmstudio.ai"],
      ["Open-weight models", [["Open weights",G],["Local",G],["Free",N],["Medium",W]], "Llama, Mistral, Qwen, Gemma and others. Pick by size and licence; check each licence before commercial use.", "ollama.com/library"]]},
    { title: "Infrastructure & deployment", items: [
      ["Docker & Podman", [["Open source",G],["Free",N],["Medium",W]], "Containers for reproducible, isolated deployments. Podman is the daemonless alternative.", "podman.io"],
      ["Kubernetes", [["Open source",G],["Free",N],["Advanced",W]], "Container orchestration at scale. Complex, but powerful for larger deployments.", "kubernetes.io"],
      ["OpenTofu / Terraform", [["OpenTofu: open source",G],["Terraform: BSL",W],["Free",N],["Advanced",W]], "Infrastructure as code. OpenTofu is the open-source fork created after Terraform's licence change.", "opentofu.org"]]}]},
  { title: "Device security & privacy", cats: [
    { title: "Operating systems", items: [
      ["Linux (Fedora, Debian)", [["Open source",G],["Free",N],["Medium",W]], "Full transparency and control. Fedora for current software, Debian for stability.", "fedoraproject.org"],
      ["Tails", [["Open source",G],["Free",N],["Medium",W],["High-risk tier",N]], "Live OS from USB. Uses Tor by default and leaves no traces.", "tails.net"],
      ["Whonix", [["Open source",G],["Free",N],["Advanced",W],["High-risk tier",N]], "Two VMs: one for Tor, one isolated for apps. Stronger isolation than Tails.", "whonix.org"],
      ["Qubes OS", [["Open source",G],["Free",N],["Advanced",W],["High-risk tier",N]], "Runs each task in its own VM, so a compromised browser can't reach your documents.", "qubes-os.org"]]},
    { title: "Browsers & blockers", items: [
      ["Firefox, hardened", [["Open source",G],["Free",N],["Easy",N]], "Configurable for strong privacy. Pair with uBlock Origin.", "mozilla.org/firefox"],
      ["Tor Browser", [["Open source",G],["Free",N],["Easy",N],["High-risk tier",N]], "Anonymizes your traffic. Essential for high-risk work or censored regions.", "torproject.org"],
      ["uBlock Origin", [["Open source",G],["Free",N],["Easy",N]], "Blocks ads, unwanted scripts, and tracking pixels.", "github.com/gorhill/uBlock"]]},
    { title: "Passwords & secrets", items: [
      ["Bitwarden", [["Open source",G],["Self-hostable",G],["Free\u2013$",N],["Easy",N]], "Open-source password manager with shared vaults for teams.", "bitwarden.com"],
      ["1Password", [["Proprietary",W],["$",N],["Easy",N]], "Professional-grade, publishes audits and security design. Team vaults for organizations.", "1password.com"],
      ["Pass", [["Open source",G],["Free",N],["Advanced",W]], "Command-line password manager using GPG. Minimal, Unix-style.", "passwordstore.org"]]},
    { title: "Mobile", items: [
      ["GrapheneOS", [["Open source",G],["Free",N],["Medium",W],["High-risk tier",N]], "Hardened Android for Pixel phones. Strong sandboxing, no Google services by default.", "grapheneos.org"],
      ["Aegis / Ente Auth", [["Open source",G],["Free",N],["Easy",N]], "Authenticator apps with encrypted backups. Ente Auth is cross-platform.", "ente.io/auth"],
      ["F-Droid", [["Open source",G],["Free",N],["Medium",W]], "App store for free and open-source Android apps, with anti-feature labels.", "f-droid.org"]]}]},
  { title: "Network, encryption & sharing", cats: [
    { title: "Aliases & virtual cards", items: [
      ["SimpleLogin", [["Open source",G],["Free\u2013$",N],["Easy",N]], "One email alias per service, forwarded to your real inbox. Now part of Proton.", "simplelogin.io"],
      ["Addy.io", [["Open source",G],["Self-hostable",G],["Free\u2013$",N],["Easy",N]], "Unlimited aliases on the fly; turn one off the moment it gets spam.", "addy.io"],
      ["Privacy.com", [["Proprietary",W],["Free\u2013$",N],["Easy",N],["US only",N]], "Virtual card numbers per merchant, with spending limits. A breach at one shop can't touch the rest.", "privacy.com"],
      ["Proton Pass aliases", [["Open source",G],["Free\u2013$",N],["Easy",N]], "Password manager that creates an alias as you sign up.", "proton.me/pass"]]},
    { title: "VPN & DNS", items: [
      ["Mullvad VPN", [["Open-source apps",G],["$",N],["Easy",N]], "No email needed, flat price, accepts cash. Audited. A VPN moves trust; it doesn't make you anonymous.", "mullvad.net"],
      ["Quad9", [["Free",N],["Easy",N]], "Nonprofit DNS resolver that blocks known malicious domains.", "quad9.net"],
      ["Pi-hole / AdGuard Home", [["Open source",G],["Self-hostable",G],["Free",N],["Medium",W]], "Network-wide ad and tracker blocking for every device on your Wi-Fi.", "pi-hole.net"]]},
    { title: "Encryption & backup", items: [
      ["VeraCrypt", [["Open source",G],["Free",N],["Medium",W]], "Encrypted containers and drives across Windows, macOS, and Linux.", "veracrypt.io"],
      ["Cryptomator", [["Open source",G],["Free\u2013$",N],["Easy",N]], "Encrypts files before they reach any cloud drive.", "cryptomator.org"],
      ["restic / BorgBackup", [["Open source",G],["Free",N],["Advanced",W]], "Encrypted, deduplicated backups. Pair with an offline copy.", "restic.net"]]},
    { title: "Sharing & cleanup", items: [
      ["OnionShare", [["Open source",G],["Free",N],["Easy",N],["High-risk tier",N]], "Share files or host a drop box over Tor, no account or third-party server.", "onionshare.org"],
      ["mat2 / ExifTool", [["Open source",G],["Free",N],["Medium",W]], "Strip location, author, and device metadata before sharing.", "exiftool.org"]]}]},
  { title: "Research & threat intelligence", cats: [
    { title: "OSINT & exposure", items: [
      ["SpiderFoot", [["Open source",G],["Local",G],["Free",N],["Medium",W]], "OSINT automation framework with 200+ modules. Runs locally.", "spiderfoot.net"],
      ["theHarvester", [["Open source",G],["Free",N],["Advanced",W]], "Domain footprinting: emails, subdomains, IPs from public sources.", "github.com/laramies/theHarvester"],
      ["OWASP Amass", [["Open source",G],["Free",N],["Advanced",W]], "Attack surface mapping and network reconnaissance.", "owasp.org/amass"],
      ["Shodan", [["Proprietary",W],["Free\u2013$",N],["Medium",W]], "Search internet-connected devices and exposed services.", "shodan.io"],
      ["Censys", [["Proprietary",W],["Free\u2013$$",N],["Medium",W]], "Certificate and host data with historical depth.", "censys.io"],
      ["Have I Been Pwned", [["Free",N],["Easy",N]], "Check whether your addresses appear in known breaches.", "haveibeenpwned.com"]]},
    { title: "Threat modeling", items: [
      ["Maltego", [["Proprietary",W],["Free\u2013$$$$",N],["Advanced",W]], "Visual link analysis and investigation. Free tier for learning.", "maltego.com"],
      ["MITRE ATT&CK", [["Open knowledge base",G],["Free",N],["Medium",W]], "Knowledge base of adversary tactics and techniques.", "attack.mitre.org"]]}]}
];

export const failRows = [
  ["Phishing & fake login pages","Very high","High","Low (security keys)","1, 4"],
  ["Password reuse","Very high","High","Low","4"],
  ["No MFA / SMS-only MFA","High","High","Low","4"],
  ["MFA fatigue & help-desk tricks","Medium","Severe","Medium","4, 5"],
  ["Wrong person in the group chat","High","High","Low","2"],
  ["Accounts nobody turned off","High","High","Medium","5"],
  ["Unpatched devices & routers","High","High","Low","4"],
  ["Lost or stolen unencrypted device","Medium","High","Low","4"],
  ["Publicly shared cloud links","High","Medium\u2013High","Low","1, 5"],
  ["Hidden metadata in files & photos","High","Medium","Low","1"],
  ["Pasting sensitive data into cloud AI","Very high","Medium\u2013High","Low","3"],
  ["Payment & invoice fraud (BEC, deepfakes)","Medium","Severe","Low (process)","2, 5"],
  ["Ransomware with no working backup","Medium","Severe","Medium","4, 5"],
  ["Malicious extensions & app permissions","High","Medium\u2013High","Low","4"],
  ["Data broker exposure & doxxing","Very high","Varies","Medium (ongoing)","1"],
  ["Stalkerware & hidden trackers","Medium","Severe","Medium","4"],
  ["Secrets committed to code or docs","High (tech teams)","High","Low","4"],
  ["Physical access: tailgating, shoulder surfing, USB drops","Medium","Medium\u2013High","Low","4"]
];

export const failGroups = [
  { title: "Accounts & access", items: [
    { t: "Phishing and fake login pages", tags: [["Very common",R],["Everyone",N]], looks: "\u201cYour mailbox is full\u201d, a shared-document notice, a delivery text, or a QR code on a flyer sends you to a page that looks exactly like your real login. The attacker relays your password and code in real time.", real: "The 2022 \u201c0ktapus\u201d campaign used texted links to fake single sign-on pages to breach Twilio and more than 100 other organizations.", fix: "Use hardware security keys or passkeys for email and admin accounts \u2014 they refuse look-alike domains. If your password manager doesn't autofill, stop and check the address. Never log in from a link." },
    { t: "Password reuse", tags: [["Very common",R],["Everyone",N]], looks: "One old shopping site gets breached. Attackers automatically try the same email and password on email, banking, and work tools (\u201ccredential stuffing\u201d).", fix: "A password manager with a unique, generated password for every account. Check your addresses on Have I Been Pwned and change anything that shows up." },
    { t: "No MFA, or SMS-only MFA", tags: [["Common",R],["Individuals & orgs",N]], looks: "A leaked password is all it takes. Or an attacker talks your carrier into moving your number to their SIM and receives your codes.", real: "Colonial Pipeline (2021) was entered through an old VPN account with a leaked password and no MFA. The 2024 Snowflake customer breaches used stolen credentials on accounts without MFA.", fix: "Turn on MFA everywhere, starting with email. Prefer security keys or passkeys, then an authenticator app. Add a carrier PIN / port-out lock." },
    { t: "MFA fatigue and help-desk social engineering", tags: [["Severe impact",R],["Organizations",N]], looks: "Dozens of \u201cApprove sign-in?\u201d prompts at 2 AM until someone taps yes. Or a caller posing as a locked-out colleague asking for an MFA reset.", real: "Uber (2022) was breached after repeated push prompts plus a message posing as IT. MGM Resorts (2023) lost systems after attackers called the help desk.", fix: "Use number-matching or security keys instead of simple push approvals. Write down an identity-verification procedure for resets and never skip it under pressure." },
    { t: "Accounts nobody turned off", tags: [["Common",W],["Organizations \u00b7 volunteers",N]], looks: "A volunteer left two years ago but still has the shared drive, the social password, and admin on the website. Or everyone shares one login, so nobody can be removed.", fix: "Keep a simple access inventory. Individual accounts, a team vault for shared passwords, and an offboarding checklist run the same day someone leaves. Review quarterly." }]},
  { title: "Communications", items: [
    { t: "The wrong person in the group chat", tags: [["Common",R],["Teams \u00b7 organizers",N]], looks: "Encryption works perfectly, but the chat has grown to include people nobody remembers adding, an ex-member, or an autocomplete mistake.", real: "In March 2025, senior U.S. officials discussed military strike plans in a Signal group that accidentally included a journalist. The app wasn't broken; the membership was.", fix: "Name an owner for every sensitive group. Check the member list before sharing, verify safety numbers, use disappearing messages, and start fresh groups rather than growing old ones forever." },
    { t: "Payment and invoice fraud (including deepfakes)", tags: [["Severe impact",R],["Finance \u00b7 coordinators",N]], looks: "An \u201curgent\u201d email from a coordinator or vendor with new bank details. Increasingly, a call with a convincing cloned voice or face.", real: "In 2024, an employee at engineering firm Arup transferred about US $25 million after a video call in which the other \u201ccolleagues\u201d were deepfakes.", fix: "A written rule: any new payment or bank-detail change is confirmed by calling back a known number and approved by two people. Agree on a verbal code phrase for emergencies." },
    { t: "Hidden metadata in files and photos", tags: [["Common",W],["Anyone who posts",N]], looks: "A photo carries the GPS coordinates of your home. A PDF carries the author's name, tracked changes, or \u201credactions\u201d you can copy text from underneath.", fix: "Strip metadata before sharing (mat2, ExifTool, or your phone's \u201cremove location\u201d option). Redact with a proper tool, export a fresh PDF, and check it." },
    { t: "Pasting sensitive data into cloud AI tools", tags: [["Very common",R],["Everyone",N]], looks: "Member records, donor lists, source code, or case notes pasted into a free chatbot to \u201csummarize this.\u201d That data may be stored, reviewed, or used for training.", real: "In 2023, Samsung engineers pasted confidential source code into a public chatbot, and the company restricted its use.", fix: "A one-page AI agreement: what data may go where. Use plans with training turned off, or run models locally for sensitive material (Workshop 3)." }]},
  { title: "Devices & data", items: [
    { t: "Unpatched devices and routers", tags: [["Common",R],["Everyone",N]], looks: "\u201cRemind me later\u201d for months. A router or office NAS still on its default admin password.", fix: "Turn on automatic updates. Replace devices that no longer get security updates. Change default passwords and turn off remote admin." },
    { t: "Lost or stolen device without encryption", tags: [["Medium",W],["Laptops \u00b7 phones \u00b7 USB",N]], looks: "A laptop left in a car or a USB stick lost at an event holds everything, readable by whoever picks it up.", fix: "Full-disk encryption (FileVault, BitLocker, LUKS), a strong screen lock, encrypted USB drives, and remote locate and wipe." },
    { t: "Publicly shared cloud links", tags: [["Common",W],["Organizations",N]], looks: "\u201cAnyone with the link can view\u201d on a folder of member records, or a public calendar showing meeting locations.", fix: "Default to named-people sharing. Audit link shares quarterly. Keep sensitive calendars private." },
    { t: "Ransomware with no working backup", tags: [["Severe impact",R],["Organizations",N]], looks: "Files are encrypted and the \u201cbackup\u201d was a synced folder that got encrypted too \u2014 or one nobody had ever restored.", fix: "3-2-1: three copies, two kinds of storage, one offline or immutable. Test a restore twice a year." },
    { t: "Malicious browser extensions and app permissions", tags: [["Common",W],["Everyone",N]], looks: "A helpful extension gets sold and starts reading every page you visit. A \u201cSign in with\u2026\u201d pop-up asks for full mailbox access.", fix: "Keep extensions to a short, known list. Review connected apps and remove anything you don't recognize." },
    { t: "Secrets committed to code or documents", tags: [["Common",W],["Tech teams",N]], looks: "An API key or database password in a public repo, a shared doc, or a screenshot. Bots scan for these within minutes.", fix: "Use a secrets manager or environment variables, turn on secret scanning, and rotate any exposed key immediately. Deleting the commit is not enough." }]},
  { title: "People & places", items: [
    { t: "Data broker exposure and doxxing", tags: [["Very common",R],["Organizers \u00b7 public-facing members",N]], looks: "Your address, phone, and relatives are listed on people-search sites. Combined with social media, that's enough to show up at your door.", fix: "Search yourself (Workshop 1), opt out of people-search sites, use a PO box or registered agent for public filings, and lock down profiles." },
    { t: "Stalkerware and hidden trackers", tags: [["Severe impact",R],["Survivors \u00b7 high-risk individuals",N]], looks: "Monitoring software installed by someone with access to your phone, a family location share nobody turned off, or a Bluetooth tracker in a bag.", fix: "Review location and device-sharing settings; use unknown-tracker alerts. If you suspect stalkerware, plan with an advocate before removing it \u2014 removal can alert the abuser." },
    { t: "Physical access: tailgating, shoulder surfing, USB drops", tags: [["Medium",W],["Offices \u00b7 events \u00b7 travel",N]], looks: "Someone follows people through a locked door. A password is read over a shoulder. A \u201cfound\u201d USB stick gets plugged in.", fix: "Lock screens when you step away, use privacy screens, never plug in unknown USB devices, and make it normal to ask visitors who they're with." }]}
];

export const kits = [
  { t: "Individual kit", price: "$60\u2013150", items: ["Two FIDO2 security keys", "Password manager", "Privacy screen", "Webcam cover"] },
  { t: "Organizer & journalist kit", price: "$600\u20131,100", items: ["Everything in the individual kit", "Pixel with GrapheneOS", "Faraday sleeve", "Travel router", "Encrypted USB drive"] },
  { t: "Shared workplace kit", price: "~$150 / person + $400\u2013700 shared", items: ["Two keys per person", "Team password vault", "Firewall box", "Raspberry Pi DNS blocker", "Encrypted backup drives"] }
];

export const commons = [
  { title: "Everyday carry", note: "The physical layer. Small things that close the gap between the digital world and the real one.", items: [
    ["Two security keys", [["Phishing-proof",G],["$\u2013$",N],["Easy",N]], "Keep one on your keys, one at home. The single best thing to carry.", "yubico.com"],
    ["BusKill kill cord", [["Open source",G],["$",N],["Medium",W]], "Magnetic cable from wrist to laptop. If yanked, it locks, shuts down, or wipes.", "buskill.in"],
    ["Faraday pouch", [["$\u2013$",N],["Easy",N]], "Wireless-dark on demand: no cell, Wi-Fi, or Bluetooth until you take it out.", "slnt.com"],
    ["USB data blocker", [["$",N],["Easy",N]], "Charge from public ports without letting data through.", ""],
    ["Privacy screen", [["$",N],["Easy",N]], "Your screen reads clearly to you and blank to the person next to you.", ""],
    ["Rayhunter (IMSI-catcher detector)", [["Open source",G],["$",N],["Advanced",W],["High-risk tier",N]], "EFF's tool that flags signs of fake cell towers at protests and events.", "github.com/EFForg/rayhunter"],
    ["Cash", [["Free",N],["Easy",N]], "The original privacy tool. No record of where, when, or how much.", ""]]},
  { title: "Security keys & authentication", note: "The single best purchase for most people. Buy two per person: one daily, one backup.", items: [
    ["YubiKey 5 / Security Key", [["Phishing-resistant",G],["$\u2013$$",N],["Easy",N],["Closed firmware",W]], "FIDO2 passkeys, one-time codes, smart-card features. Widest service support.", "yubico.com"],
    ["Nitrokey 3", [["Open source",G],["Phishing-resistant",G],["$\u2013$$",N],["Easy\u2013Medium",N]], "Open-source firmware and hardware. FIDO2, one-time codes, OpenPGP.", "shop.nitrokey.com"],
    ["Token2 FIDO2 keys", [["Phishing-resistant",G],["$",N],["Easy",N]], "Low-cost keys, including fingerprint and PIN models. Good for outfitting a whole team.", "token2.com"],
    ["OnlyKey", [["Open source",G],["$$",N],["Medium",W]], "PIN-pad key that also stores passwords; FIDO2 and OpenPGP.", "onlykey.io"]]},
  { title: "Phones", note: "Usually the most sensitive device you own. Choose one with long-term security updates.", items: [
    ["Google Pixel + GrapheneOS", [["Open source OS",G],["$$$",N],["Medium setup",W],["High-risk tier",N]], "Buy new and unlocked, then install GrapheneOS yourself.", "grapheneos.org"],
    ["Librem 5 (Purism)", [["Open source",G],["$$$$",N],["Advanced",W]], "Linux phone with hardware kill switches. Expect trade-offs in apps and polish.", "puri.sm"],
    ["PinePhone (Pine64)", [["Open source",G],["$",N],["Advanced \u00b7 hobbyist",W]], "Low-cost Linux phone for learning and tinkering.", "pine64.com"],
    ["Fairphone", [["Repairable",G],["$$",N],["Easy",N]], "Ethically sourced, user-repairable phone with long support. Available with /e/OS.", "fairphone.com"],
    ["Murena (/e/OS)", [["De-Googled",G],["$\u2013$$",N],["Easy",N]], "Phones sold with /e/OS: Android without Google tracking, ready to use.", "murena.com"],
    ["Punkt MC02", [["De-Googled",G],["$$",N],["Easy",N]], "Swiss privacy phone running AphyOS with a subscription model.", "punkt.ch"],
    ["Cape", [["Privacy carrier",G],["$ / month",N],["Easy",N]], "Mobile carrier built to resist SIM swaps and collect minimal data.", "cape.co"]]},
  { title: "Laptops & desktops", note: "Runs Linux well, gets firmware updates, can be repaired instead of replaced.", items: [
    ["Framework Laptop", [["Repairable",G],["$$$\u2013$$$$",N],["Easy",N]], "Modular, repairable, runs Linux well.", "frame.work"],
    ["NovaCustom", [["Open firmware",G],["$$$$",N],["Medium",W],["High-risk tier",N]], "Coreboot/Dasharo firmware; some models Qubes-certified.", "novacustom.com"],
    ["Purism Librem", [["Open firmware",G],["$$$$",N],["Medium",W]], "Coreboot, PureBoot tamper detection, kill switches.", "puri.sm"],
    ["System76", [["Linux preinstalled",G],["$$$\u2013$$$$",N],["Easy",N]], "Linux-first laptops and desktops with Pop!_OS.", "system76.com"],
    ["Star Labs", [["Open firmware",G],["$$$\u2013$$$$",N],["Easy",N]], "Linux laptops with coreboot option, shipped from the UK.", "starlabs.systems"]]},
  { title: "Network & shared infrastructure", note: "Your router sees everything. These put you back in control of it.", items: [
    ["Protectli Vault", [["Self-hosted",G],["$$\u2013$$$",N],["Medium\u2013Advanced",W]], "Fanless firewall boxes for OPNsense or pfSense.", "protectli.com"],
    ["GL.iNet travel routers", [["Open-source base",G],["$\u2013$$",N],["Easy",N]], "Pocket OpenWrt routers with WireGuard. Protects you on conference Wi-Fi.", "gl-inet.com"],
    ["Raspberry Pi", [["Self-hosted",G],["$",N],["Medium",W]], "Cheap computer for Pi-hole, a password vault, or a lab.", "raspberrypi.com"],
    ["Start9 / Umbrel", [["Self-hosted",G],["$$$",N],["Easy\u2013Medium",N]], "Plug-in home servers for Nextcloud, Vaultwarden, and more.", "start9.com"],
    ["Home Assistant Green", [["Local-first",G],["$$",N],["Medium",W]], "Local smart-home hub that doesn't depend on a vendor cloud.", "home-assistant.io"]]},
  { title: "Storage & physical privacy", note: "Protect data at rest and devices in transit.", items: [
    ["Apricorn Aegis Secure Key", [["Hardware-encrypted",G],["$$\u2013$$$",N],["Easy",N]], "USB drive with on-device PIN pad; no software needed.", "apricorn.com"],
    ["Mission Darkness Faraday bags", [["$\u2013$$",N],["Easy",N],["High-risk tier",N]], "Signal-blocking bags for travel, evidence handling, or device-free meetings.", "mosequipment.com"],
    ["SLNT Faraday bags", [["$\u2013$$",N],["Easy",N]], "Everyday-style Faraday backpacks and sleeves.", "slnt.com"],
    ["Privacy screens & webcam covers", [["$",N],["Easy",N]], "Cheap, effective protection against shoulder surfing.", ""]]},
  { title: "Open hardware makers", note: "Places to find auditable, community-built devices.", items: [
    ["Crowd Supply", [["Open hardware",G],["Varies",N]], "Crowdfunding and store for open-source hardware.", "crowdsupply.com"],
    ["Pine64 store", [["Open hardware",G],["$\u2013$$",N]], "Open, low-cost boards, phones, and laptops for learning.", "pine64.com"]]},
  { title: "Services worth paying for", note: "Paying directly is often the most private option: you're the customer, not the product.", items: [
    ["Mullvad VPN", [["Audited",G],["$ / month",N],["Easy",N]], "Flat price, no email to sign up, accepts cash.", "mullvad.net"],
    ["Proton (Mail, Drive, VPN, Pass)", [["E2E encrypted",G],["$ / month",N],["Easy",N]], "Encrypted suite from one Swiss provider, with team plans.", "proton.me"],
    ["Bitwarden Premium / Teams", [["Open source",G],["$ / year",N],["Easy",N]], "Security-key login, vault health, shared team vaults.", "bitwarden.com"]]}
];

export const library = [
  { id: "canary", t: "Every alias is a canary", cat: "Accounts", def: "Give every service its own email alias. If spam shows up at \u201cshop-x7k@\u2026\u201d, you know exactly who sold or leaked your address.", why: "Your real email is a universal ID that links you across brokers and breaches. Aliases cut that thread, one relationship at a time.", tryit: "Next sign-up, use SimpleLogin, Addy.io, or your password manager's alias feature instead of your real email.", rel: ["email-alias", "virtual-cards", "data-brokers"], read: [["SimpleLogin", "https://simplelogin.io"], ["Addy.io", "https://addy.io"]] },
  { id: "virtual-cards", t: "Virtual cards", cat: "Accounts", def: "Single-merchant card numbers with their own limits, linked to your real account.", why: "When one shop is breached, only that number leaks. Pause it and nothing else changes.", tryit: "Use a virtual card for your next subscription, with a limit just above the price.", rel: ["canary", "breach"], read: [["Privacy.com (US)", "https://privacy.com"]] },
  { id: "fingerprinting", t: "Browser fingerprinting", cat: "Surveillance", def: "Sites identify your browser from its setup (fonts, screen, graphics) without cookies.", why: "It survives clearing cookies, private mode, and often VPNs.", tryit: "Run EFF's Cover Your Tracks test, then try Tor Browser or Mullvad Browser and compare.", rel: ["location", "metadata"], read: [["EFF Cover Your Tracks", "https://coveryourtracks.eff.org"]] },
  { id: "kyc", t: "ID checks & face scans (KYC)", cat: "Surveillance", def: "\u201cKnow your customer\u201d checks where a company scans your ID and face, often through vendors like Persona, Jumio, or Onfido.", why: "Those vendors keep biometric data you can't change. Cloaking tools don't work on live video checks.", tryit: "After a verification, send the vendor a deletion request if your state or country gives you that right.", rel: ["data-rights", "data-brokers"], read: [["EFF on biometrics", "https://www.eff.org/issues/biometrics"]] },
  { id: "data-rights", t: "Your data rights", cat: "Basics", def: "Laws that let you see, correct, and delete data about you: GDPR in Europe, CCPA/CPRA in California, BIPA for biometrics in Illinois, PIPEDA in Canada, and a growing list of U.S. states.", why: "Deletion requests are free, and companies are required to answer. They're the legal side of shrinking your public layer.", tryit: "Send one access request (\u201cwhat do you have on me?\u201d) to a company you've used for years.", rel: ["kyc", "data-brokers", "canary"], read: [["California Privacy Protection Agency", "https://cppa.ca.gov"], ["EU: Your data protection rights", "https://commission.europa.eu/law/law-topic/data-protection/reform/rights-citizens_en"]] },

  { id: "owasp", t: "OWASP", cat: "Who's who", stands: "Open Worldwide Application Security Project", def: "A nonprofit foundation and volunteer community that publishes free, open guides to making software safer. Best known for its Top 10 lists of the most critical security risks.", why: "Developers and security teams worldwide use the OWASP Top 10 as a checklist. Its Top 10 for LLM Applications is where risks like prompt injection got a shared name. Our People's Top 10 borrows the format.", trust: "Vendor-neutral, free, and written in public by volunteers; anyone can see how the lists are built and comment. It's guidance, not a regulator or a certification.", tryit: "If your group builds anything with AI, skim the LLM Top 10 before you ship.", rel: ["mitre", "prompt-injection", "agents"], read: [["OWASP Foundation", "https://owasp.org"], ["OWASP Top 10 for LLM Applications", "https://genai.owasp.org/llm-top-10/"]] },
  { id: "mitre", t: "MITRE ATT&CK", cat: "Who's who", stands: "MITRE is a name, not an acronym. ATT&CK = Adversarial Tactics, Techniques, and Common Knowledge", def: "MITRE is a U.S. nonprofit that runs federally funded research centers. ATT&CK is its free, public map of how real attackers behave, organized by goal (tactics) and method (techniques).", why: "It gives defenders one shared language for attacks. Our Open Doors Matrix is a people-sized version of the same idea.", trust: "Built from public reports of real incidents and updated openly. MITRE works closely with the U.S. government, so read it as a map of threats to organizations, not a to-do list for individuals.", tryit: "Open our Open Doors Matrix first; it's the plain-language version.", rel: ["atlas", "owasp", "osint"], read: [["MITRE ATT&CK", "https://attack.mitre.org"]] },
  { id: "atlas", t: "MITRE ATLAS", cat: "Who's who", stands: "Adversarial Threat Landscape for Artificial-Intelligence Systems", def: "MITRE's ATT&CK-style matrix for attacks on AI systems: poisoning training data, stealing models, hijacking agents.", why: "As more tools run on AI, attackers go after the AI itself. ATLAS catalogs real cases.", trust: "Same open, case-based approach as ATT&CK, with contributions from industry and academia.", tryit: "Read two or three of its case studies to see how AI attacks actually happen.", rel: ["mitre", "agents", "prompt-injection"], read: [["MITRE ATLAS", "https://atlas.mitre.org"]] },
  { id: "nist", t: "NIST", cat: "Who's who", stands: "National Institute of Standards and Technology", def: "A U.S. Commerce Department agency that sets measurement and technology standards, including widely copied password and security guidance.", why: "NIST's advice is why modern guidance says long passphrases beat forced password changes and odd symbols.", trust: "Public drafts, public comment, and decades of use across governments and companies. It's a government body, so its priorities are institutional.", tryit: "Adopt NIST's core password advice: long, unique, no forced rotation, MFA on top.", rel: ["password-manager", "cisa", "least-privilege"], read: [["NIST digital identity guidelines (SP 800-63)", "https://pages.nist.gov/800-63-4/"]] },
  { id: "cisa", t: "CISA", cat: "Who's who", stands: "Cybersecurity and Infrastructure Security Agency", def: "The U.S. agency responsible for defending civilian government networks and helping everyone else. Publishes free guides like Secure Our World.", why: "Its small-organization guides and ransomware resources are free, plain-language, and practical.", trust: "Public, free, and focused on defense. As a government agency, it's not the place to go for privacy from the government.", tryit: "Use CISA's Cyber Essentials as a one-page checklist for your group.", rel: ["nist", "backups", "phishing"], read: [["CISA Secure Our World", "https://www.cisa.gov/secure-our-world"]] },
  { id: "eff", t: "EFF", cat: "Who's who", stands: "Electronic Frontier Foundation", def: "A nonprofit founded in 1990 that defends civil liberties online through lawsuits, research, and free tools like Surveillance Self-Defense and Rayhunter.", why: "EFF writes some of the clearest, most trusted security guides for ordinary people and activists.", trust: "Member-funded, open about its finances, and has a long public track record in court. It advocates for a point of view: privacy and free expression.", tryit: "Pick a playlist on Surveillance Self-Defense that matches you.", rel: ["threat-model", "citizenlab", "imsi"], read: [["EFF", "https://www.eff.org"], ["Surveillance Self-Defense", "https://ssd.eff.org"]] },
  { id: "fido", t: "FIDO Alliance", cat: "Who's who", stands: "Fast IDentity Online", def: "The industry group behind the open standards for security keys and passkeys.", why: "It's the reason one security key works with Google, Apple, Microsoft, and your password manager.", trust: "The standards are open and independently implemented, including in open-source keys. It's an industry consortium, so members have commercial interests.", tryit: "Look for \u201cFIDO2\u201d or \u201cpasskey\u201d support before you buy a key or pick a service.", rel: ["fido2", "passkeys"], read: [["FIDO Alliance", "https://fidoalliance.org"]] },
  { id: "osi", t: "OSI model", cat: "Who's who", stands: "Open Systems Interconnection", def: "A seven-layer reference model from the 1980s that network engineers use to describe how data moves, from physical cables up to apps.", why: "Our \u201cYour tech stack\u201d visual is loosely inspired by it, translated for people rather than engineers.", trust: "An international standard (ISO/IEC 7498) taught in every networking course. It's a teaching model; real networks don't map to it perfectly.", tryit: "Turn on nerd mode on the stack page to see which layer is which.", rel: ["attack-surface"], read: [["Cloudflare: What is the OSI model?", "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/"]] },
  { id: "pgp", t: "PGP", cat: "Who's who", stands: "Pretty Good Privacy", def: "Encryption software for email and files, released by Phil Zimmermann in 1991. Lives on as the OpenPGP standard.", why: "It made strong encryption available to ordinary people. Zimmermann's essay on why he wrote it gave us the postcard argument.", trust: "Open standard, decades of public scrutiny. It's powerful but easy to get wrong; for chat, Signal is simpler.", tryit: "Read Zimmermann's short essay, \u201cWhy I Wrote PGP.\u201d", rel: ["e2ee", "metadata"], read: [["Why I Wrote PGP", "https://www.philzimmermann.com/EN/essays/WhyIWrotePGP.html"], ["OpenPGP", "https://www.openpgp.org"]] },
  { id: "osint", t: "OSINT", cat: "Who's who", stands: "Open-Source Intelligence", def: "Information gathered from public sources: social posts, records, photos, maps, data brokers.", why: "It's how journalists investigate, and how stalkers and scammers find you. Layer 7 of your stack.", trust: "It's a practice, not an organization. The same techniques serve good and bad ends.", tryit: "Search yourself the way an OSINT investigator would, then close what you find.", rel: ["data-brokers", "attack-surface", "metadata"], read: [["Bellingcat's online investigations toolkit", "https://bellingcat.gitbook.io/toolkit"]] },
  { id: "citizenlab", t: "Citizen Lab", cat: "Who's who", stands: "Citizen Lab, Munk School of Global Affairs, University of Toronto", def: "An academic research lab that investigates spyware and digital attacks against journalists, activists, and civil society.", why: "It exposed tools like the Pegasus spyware used against reporters and human-rights defenders.", trust: "Academic, peer-reviewed, and publishes its evidence and methods.", tryit: "If you're high-risk, read one of their reports to see what targeted attacks look like.", rel: ["eff", "imsi"], read: [["Citizen Lab", "https://citizenlab.ca"]] },
  { id: "ica", t: "ICA", cat: "Who's who", stands: "International Cooperative Alliance", def: "The global body for cooperatives, founded in 1895. Keeper of the seven cooperative principles.", why: "Our way of working, from democratic control to concern for community, adapts its principles.", trust: "Represents co-ops worldwide and publishes its principles openly. It's a membership body for co-ops, not a watchdog.", tryit: "Read the seven principles, then ask which ones your group already practices.", rel: ["least-privilege"], read: [["ICA: Cooperative identity, values & principles", "https://ica.coop/en/cooperatives/cooperative-identity"]] },

  { id: "threat-model", t: "Threat modeling", cat: "Basics", def: "A simple way to decide what to protect, from whom, and how much effort it's worth.", why: "Without one, you either do nothing or buy everything. With one, you do the three things that matter.", tryit: "Answer five questions: What do I want to protect? From whom? How likely? How bad if it happens? How much trouble am I willing to go through?", rel: ["attack-surface", "opsec", "compartment"], read: [["EFF Surveillance Self-Defense: Your Security Plan", "https://ssd.eff.org/module/your-security-plan"]] },
  { id: "attack-surface", t: "Attack surface", cat: "Basics", def: "Every door someone could use to reach you: accounts, devices, people, habits, and the AI tools you've connected.", why: "You can't close doors you haven't counted.", tryit: "Take our open-doors quiz, then list every account that can reset another account.", rel: ["threat-model", "data-brokers", "least-privilege"], read: [["Consumer Reports Security Planner", "https://securityplanner.consumerreports.org"]] },
  { id: "opsec", t: "OPSEC", cat: "Basics", def: "Operational security: the habits that keep small details from adding up to a big exposure.", why: "Most leaks aren't hacks. They're a photo, a check-in, a group chat, a pattern.", tryit: "Before posting, ask: what does this reveal about where I am, who I'm with, and when?", rel: ["compartment", "metadata", "threat-model"], read: [["Freedom of the Press Foundation guides", "https://freedom.press/digisec/"]] },
  { id: "compartment", t: "Compartmentalization", cat: "Basics", def: "Keeping separate parts of your life on separate accounts, numbers, browsers, or devices.", why: "When one compartment is exposed, the others stay safe.", tryit: "Give your organizing work its own email and phone number. Never log into it from your personal browser profile.", rel: ["opsec", "email-alias", "threat-model"], read: [["Privacy Guides", "https://www.privacyguides.org"]] },
  { id: "password-manager", t: "Password manager", cat: "Accounts", def: "An encrypted vault that creates and remembers a unique password for every account.", why: "Password reuse is how one breach turns into ten. A manager also refuses to autofill on fake sites.", tryit: "Install one, then change your email, bank, and phone-carrier passwords first.", rel: ["mfa", "passkeys", "breach"], read: [["EFF SSD: Creating strong passwords", "https://ssd.eff.org/module/creating-strong-passwords"]] },
  { id: "mfa", t: "Multi-factor authentication (MFA)", cat: "Accounts", def: "Logging in with something you know plus something you have, like an app code or security key.", why: "It stops most account takeovers, even when your password leaks.", tryit: "Turn it on for email first, since email resets everything else. Avoid SMS codes when you can.", rel: ["fido2", "sim-swap", "passkeys"], read: [["EFF SSD: How to enable two-factor authentication", "https://ssd.eff.org/module/how-enable-two-factor-authentication"]] },
  { id: "fido2", t: "Security keys (FIDO2)", cat: "Accounts", def: "A small physical key that proves it's you, and only works on the real website.", why: "Phishing-proof: even a perfect fake login page can't use it.", tryit: "Buy two. Register both on your email and password manager. Keep one somewhere safe.", rel: ["mfa", "passkeys", "phishing"], read: [["FIDO Alliance: how it works", "https://fidoalliance.org/how-fido-works/"]] },
  { id: "passkeys", t: "Passkeys", cat: "Accounts", def: "A password replacement stored on your device or security key, tied to one website.", why: "Nothing to phish, nothing to reuse, nothing to leak.", tryit: "Accept the passkey offer next time a major site asks. Keep a backup method.", rel: ["fido2", "password-manager"], read: [["passkeys.dev", "https://passkeys.dev"]] },
  { id: "sim-swap", t: "SIM swapping", cat: "Accounts", def: "An attacker convinces your carrier to move your number to their phone.", why: "They get your texts, including login codes and password resets.", tryit: "Set a carrier PIN or port-out lock today. Move important accounts off SMS codes.", rel: ["mfa", "social-eng"], read: [["FTC: SIM swap scams", "https://consumer.ftc.gov/articles/how-protect-yourself-sim-swap-scams"]] },
  { id: "breach", t: "Data breaches & credential stuffing", cat: "Accounts", def: "When a company leaks your data, attackers automatically try those passwords everywhere else.", why: "Your oldest forgotten account can open your newest important one.", tryit: "Check your emails on Have I Been Pwned and change anything that shows up.", rel: ["password-manager", "mfa"], read: [["Have I Been Pwned", "https://haveibeenpwned.com"]] },
  { id: "e2ee", t: "End-to-end encryption (E2EE)", cat: "Communication", def: "Only the people in the conversation hold the keys. The company in the middle can't read it.", why: "It protects content from hacks, subpoenas, and snooping employees. It doesn't hide who you talk to.", tryit: "Move sensitive conversations to Signal. Verify safety numbers with the people who matter most.", rel: ["metadata", "zero-knowledge", "group-hygiene"], read: [["EFF SSD: What should I know about encryption?", "https://ssd.eff.org/module/what-should-i-know-about-encryption"]] },
  { id: "metadata", t: "Metadata", cat: "Communication", def: "Data about data: who, when, where, how long. Plus hidden info inside photos and files.", why: "Metadata can reveal your routine, relationships, and location even when content is encrypted.", tryit: "Strip photo location before posting. Use disappearing messages for sensitive chats.", rel: ["e2ee", "opsec", "location"], read: [["EFF SSD: Why metadata matters", "https://ssd.eff.org/module/why-metadata-matters"]] },
  { id: "zero-knowledge", t: "Zero-knowledge / zero-access design", cat: "Communication", def: "A service built so the provider can't read your data even if they wanted to.", why: "A company can't hand over, leak, or train on what it can't read.", tryit: "When choosing a cloud tool, ask: can the company read my files? If yes, keep sensitive stuff elsewhere.", rel: ["e2ee"], read: [["Proton: types of encryption", "https://proton.me/learn/encryption/types-of-encryption/zero-access"]] },
  { id: "group-hygiene", t: "Group-chat hygiene", cat: "Groups", def: "Rules for who's in a group, who owns it, and how long messages last.", why: "The most secure app can't help if the wrong person is in the room.", tryit: "Name an owner for every sensitive group. Review members monthly. Turn on disappearing messages.", rel: ["e2ee", "offboarding", "least-privilege"], read: [["Holistic Security manual", "https://holistic-security.tacticaltech.org"]] },
  { id: "offboarding", t: "Offboarding", cat: "Groups", def: "Removing someone's access to accounts, drives, and chats when they leave.", why: "Former members with live access are one of the most common ways groups get hurt.", tryit: "Keep a one-page access list. Run it the same day someone leaves.", rel: ["least-privilege", "group-hygiene"], read: [["CISA: Cyber essentials for small orgs", "https://www.cisa.gov/cyber-essentials"]] },
  { id: "least-privilege", t: "Least privilege", cat: "Groups", def: "Give each person, app, or AI agent only the access it needs, for only as long as it needs it.", why: "When something goes wrong, the damage stays small.", tryit: "List who has admin on your website, bank, and drive. Remove anyone who doesn't need it.", rel: ["offboarding", "agents", "prompt-injection"], read: [["NIST glossary: least privilege", "https://csrc.nist.gov/glossary/term/least_privilege"]] },
  { id: "backups", t: "3-2-1 backups", cat: "Devices", def: "Three copies, on two kinds of storage, with one offline or off-site.", why: "Ransomware, fires, and AI agents that \u201cclean up\u201d files all end the same way without a tested backup.", tryit: "Restore one file this week. If you can't, you don't have a backup yet.", rel: ["disk-encryption"], read: [["CISA: Ransomware guide", "https://www.cisa.gov/stopransomware"]] },
  { id: "disk-encryption", t: "Full-disk encryption", cat: "Devices", def: "Scrambles everything on a device so it's unreadable without your passcode.", why: "A lost or seized laptop becomes a paperweight instead of a data leak.", tryit: "Turn on FileVault, BitLocker, or LUKS. Use a real passcode on your phone, not just your face.", rel: ["backups", "border"], read: [["EFF SSD: Keeping your data safe", "https://ssd.eff.org/module/keeping-your-data-safe"]] },
  { id: "border", t: "Border & device searches", cat: "Devices", def: "Authorities at borders, protests, or traffic stops may try to search or copy your devices.", why: "Everything on your phone can be copied in minutes with forensic tools.", tryit: "Travel with less. Power off before checkpoints. Know your rights where you live.", rel: ["disk-encryption", "compartment"], read: [["EFF: Digital privacy at the U.S. border", "https://www.eff.org/wp/digital-privacy-us-border-2017"]] },
  { id: "phishing", t: "Phishing", cat: "Scams", def: "A fake message that gets you to click, log in, pay, or share. Now written by AI, in any language.", why: "It's still the number-one way attackers get in.", tryit: "Never log in from a link. Open the site yourself or use a bookmark.", rel: ["fido2", "social-eng", "voice-clone"], read: [["CISA: Recognize and report phishing", "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing"]] },
  { id: "social-eng", t: "Social engineering", cat: "Scams", def: "Hacking people instead of computers: urgency, authority, and friendliness used against you.", why: "Help desks, carriers, and busy coordinators are all targets.", tryit: "Write a verification rule: big requests get confirmed by calling back a number you already had.", rel: ["phishing", "voice-clone", "sim-swap"], read: [["Holistic Security manual", "https://holistic-security.tacticaltech.org"]] },
  { id: "voice-clone", t: "Voice clones & deepfakes", cat: "Scams", def: "AI-generated audio or video of someone you know, asking for money or secrets.", why: "A few seconds of your voice from a voicemail or video can be enough.", tryit: "Pick a family or team code word. Hang up and call back on a known number.", rel: ["social-eng", "phishing"], read: [["FTC: Voice-clone family emergency scams", "https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes"]] },
  { id: "prompt-injection", t: "Prompt injection", cat: "AI", def: "Hidden instructions in an email, web page, or file that hijack an AI assistant reading it.", why: "Whatever your AI can read, a stranger can try to steer. Labs say it may never be fully solved.", tryit: "Don't let an AI agent browse or read mail while it can also send, pay, or delete.", rel: ["agents", "least-privilege"], read: [["OWASP Top 10 for LLM Applications", "https://genai.owasp.org/llm-top-10/"]] },
  { id: "agents", t: "AI agents", cat: "AI", def: "AI that takes actions: clicking, sending, coding, buying, deleting.", why: "Useful and obedient, but easily fooled, and fast enough to do damage in seconds.", tryit: "Give agents their own limited accounts. Require your approval for anything irreversible.", rel: ["prompt-injection", "least-privilege", "local-ai"], read: [["MITRE ATLAS", "https://atlas.mitre.org"]] },
  { id: "local-ai", t: "Local AI", cat: "AI", def: "Running AI models on your own computer instead of a company's cloud.", why: "Sensitive data never leaves your machine or trains someone else's model.", tryit: "Install Ollama and try a small open model on a non-sensitive task.", rel: ["agents", "zero-knowledge"], read: [["Ollama", "https://ollama.com"]] },
  { id: "data-brokers", t: "Data brokers", cat: "Surveillance", def: "Companies that collect and sell your address, phone, relatives, and habits.", why: "It's how strangers, stalkers, and scammers find you, and AI makes stitching it together instant.", tryit: "Search your name on people-search sites and submit opt-outs, or use a removal service.", rel: ["attack-surface", "location", "email-alias"], read: [["Consumer Reports Permission Slip", "https://permissionslipcr.com"]] },
  { id: "location", t: "Location tracking", cat: "Surveillance", def: "Your phone, apps, car, and ad networks recording where you go.", why: "Location data is sold, subpoenaed, and used to identify people at clinics, protests, and homes.", tryit: "Turn off ad tracking and precise location for apps that don't need it. Review location sharing.", rel: ["metadata", "alpr", "imsi"], read: [["EFF: Location data", "https://www.eff.org/issues/location-privacy"]] },
  { id: "alpr", t: "License-plate readers (ALPR)", cat: "Surveillance", def: "Cameras, like Flock, that log every car that passes and share the data widely.", why: "They build a searchable history of where your car has been.", tryit: "Find out if your city uses them (EFF's Atlas of Surveillance) and show up at council meetings.", rel: ["location", "imsi"], read: [["EFF Atlas of Surveillance", "https://atlasofsurveillance.org"]] },
  { id: "imsi", t: "Cell-site simulators (IMSI catchers)", cat: "Surveillance", def: "Fake cell towers that trick nearby phones into connecting and identifying themselves.", why: "They've been used to log who attended protests.", tryit: "Airplane mode or a Faraday pouch at sensitive events. EFF's Rayhunter can flag suspicious towers.", rel: ["location", "alpr"], read: [["EFF: Meet Rayhunter", "https://www.eff.org/deeplinks/2025/03/meet-rayhunter-new-open-source-tool-eff-detect-cellular-spying"]] },
  { id: "email-alias", t: "Email aliases", cat: "Accounts", def: "Throwaway forwarding addresses so every site gets a different email.", why: "Breaches can't be linked together, and spam is easy to shut off.", tryit: "Try SimpleLogin or addy.io for new sign-ups.", rel: ["compartment", "data-brokers"], read: [["Privacy Guides: email aliasing", "https://www.privacyguides.org/en/email-aliasing/"]] }
];

export const libraryShelf = [
  ["EFF Surveillance Self-Defense", "The classic free guide, in many languages, with playlists by role.", "ssd.eff.org"],
  ["Consumer Reports Security Planner", "Answer a few questions, get a personal checklist. Great for families.", "securityplanner.consumerreports.org"],
  ["Privacy Guides", "Community-run, independent tool recommendations with clear criteria.", "privacyguides.org"],
  ["Holistic Security (Tactical Tech)", "Security for activists that includes wellbeing and group dynamics.", "holistic-security.tacticaltech.org"],
  ["Data Detox Kit (Tactical Tech)", "Bite-sized, friendly steps. Good for workshops and teens.", "datadetoxkit.org"],
  ["Freedom of the Press Foundation", "Digital security guides and trainings for journalists.", "freedom.press/digisec"],
  ["Access Now Digital Security Helpline", "Free 24/7 help for civil society in trouble.", "accessnow.org/help"],
  ["Proton on YouTube", "Short explainers, from everyday-carry gadgets to protest privacy and Flock cameras.", "youtube.com/@ProtonPrivacy"],
  ["OWASP Top 10 for LLM Applications", "The standard list of AI app risks, including prompt injection.", "genai.owasp.org/llm-top-10"],
  ["MITRE ATLAS", "The ATT&CK-style matrix for attacks on AI systems.", "atlas.mitre.org"],
  ["EFF Atlas of Surveillance", "Map of police surveillance tech near you.", "atlasofsurveillance.org"],
  ["Citizen Lab", "Research on spyware and targeted threats against civil society.", "citizenlab.ca"]
];

export const orgs = [
  { title: "Digital rights & security", items: [
    ["Electronic Frontier Foundation", "Defends civil liberties online. Makes Surveillance Self-Defense and Rayhunter.", "eff.org", 1],
    ["Access Now", "Digital rights advocacy, plus a free 24/7 security helpline for civil society.", "accessnow.org", 1],
    ["Freedom of the Press Foundation", "Security training and tools (SecureDrop) for journalists and sources.", "freedom.press", 1],
    ["Tactical Tech", "Makes Holistic Security and the Data Detox Kit. Workshop-ready materials.", "tacticaltech.org", 1],
    ["Citizen Lab", "Investigates spyware and digital attacks on civil society.", "citizenlab.ca", 1],
    ["Tor Project", "Nonprofit behind Tor Browser and Tails.", "torproject.org", 1],
    ["Signal Technology Foundation", "Nonprofit that runs Signal. No ads, no investors.", "signalfoundation.org", 1],
    ["S.T.O.P. (Surveillance Technology Oversight Project)", "Fights local police surveillance.", "stopspying.org", 1],
    ["Fight for the Future", "Grassroots campaigns against facial recognition and surveillance.", "fightforthefuture.org", 0]]},
  { title: "Movement tech & community infrastructure", items: [
    ["May First Movement Technology", "A member-run cooperative providing hosting and email for movements.", "mayfirst.coop", 1],
    ["Riseup", "Volunteer-run secure email, lists, and VPN for activists.", "riseup.net", 1],
    ["Co-op Cloud", "Open-source platform for co-ops to self-host tools together.", "coopcloud.tech", 1],
    ["Library Freedom Project", "Trains librarians to teach privacy in their communities.", "libraryfreedom.org", 1]]},
  { title: "Care, safety & community defense", items: [
    ["Digital Defense Fund", "Digital security for abortion access and reproductive-care workers.", "digitaldefensefund.org", 1],
    ["NNEDV Safety Net", "Tech safety for survivors of abuse and the advocates who help them.", "techsafety.org", 1],
    ["Coalition Against Stalkerware", "Resources for detecting and responding to stalkerware.", "stopstalkerware.org", 1],
    ["Just Futures Law", "Legal support and research on immigration surveillance and data.", "justfutureslaw.org", 1],
    ["Immigrant Defense Project", "Know-your-rights and surveillance resources for immigrant communities.", "immigrantdefenseproject.org", 0]]},
  { title: "Humane & calm technology", items: [
    ["Calm Tech Institute", "Founded by Amber Case. Certifies and teaches technology that respects attention.", "calmtech.institute", 0],
    ["Center for Humane Technology", "Exposes attention-extracting design and pushes for humane alternatives.", "humanetech.com", 0],
    ["Fairplay", "Fights manipulative marketing and addictive design aimed at kids.", "fairplayforkids.org", 0],
    ["Wait Until 8th", "Parents pledging together to delay smartphones, so no kid is the only one.", "waituntil8th.org", 0]]},
  { title: "Solidarity economy", items: [
    ["U.S. Federation of Worker Cooperatives", "National grassroots membership org for worker co-ops.", "usworker.coop", 0],
    ["Democracy at Work Institute", "Expands worker ownership, especially for low-wage workers.", "institute.coop", 0],
    ["Platform Cooperativism Consortium", "Research and support for member-owned platforms.", "platform.coop", 0],
    ["Sustainable Economies Law Center", "Legal tools for co-ops, commons, and community ownership.", "theselc.org", 0],
    ["New Economy Coalition", "Network of groups building a solidarity economy.", "neweconomy.net", 0],
    ["Project Equity", "Helps businesses convert to worker ownership.", "project-equity.org", 0]]}
];

export const guides = {
  orgs: { title: "Organizations", kicker: "Co-ops, nonprofits & tech teams", h1a: "Your group is only as safe as", h1b: "its shared password.", lede: "Worker co-ops, small nonprofits, incubators, and platform co-ops share the same weak spots: shared logins, rotating people, money that moves on one email, and a lot of trust in whoever \u201cknows computers.\u201d", members: ["coop", "nonprofit", "platform"],
    stats: [["$2.8B", "lost to business email compromise in 2024: fake invoices and \u201cnew bank details\u201d emails", "FBI IC3 2024 report", "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf"], ["44%", "of breaches involved ransomware in 2025, and third-party involvement doubled", "Verizon DBIR 2025", "https://www.verizon.com/business/resources/reports/dbir/"], ["~6 in 10", "breaches involve a human: a click, a mistake, a tricked help desk", "Verizon DBIR 2025", "https://www.verizon.com/business/resources/reports/dbir/"]],
    stack: [[7, ["Keep member rosters off public pages", "Separate public and internal social accounts"]], [6, ["Tested 3-2-1 backups for finance and member data", "Share drives with named people only"]], [5, ["Individual accounts plus a team password vault", "Security keys for admin and finance accounts", "Same-day offboarding checklist"]], [4, ["A one-page AI & data agreement", "Review connected apps quarterly"]], [3, ["Automatic updates on every work device", "Replace devices that lost support"]], [2, ["Change router defaults; separate guest Wi-Fi", "VPN for remote access, not open ports"]], [1, ["Full-disk encryption on laptops", "A drawer of spare security keys"]]],
    radar: [["Signal groups with named owners", 0, 0, "Encrypted chat; the owner reviews members monthly."], ["Element / Matrix (self-hosted)", 0, 1, "Chat you control, federated. Needs someone to run it."], ["Slack / Discord for sensitive work", 0, 3, "Convenient, but the company can read it and it's a subpoena target."], ["Nextcloud or CryptPad", 1, 1, "Shared files and docs without Big Tech."], ["Google Workspace with sharing locked down", 1, 2, "Fine for many groups if link-sharing is off and MFA is on."], ["\u201cAnyone with the link\u201d folders", 1, 3, "The most common way member data leaks."], ["Bitwarden / 1Password Teams", 2, 0, "Shared vaults, per-person access, easy offboarding."], ["Security keys for admins", 2, 0, "Phishing-proof logins where it matters most."], ["One shared login for everyone", 2, 3, "Nobody can be removed. Replace it."], ["Local AI (Ollama) for sensitive drafts", 3, 1, "Keeps member data off cloud AI."], ["Cloud AI with inbox and drive access", 3, 3, "Prompt injection turns it into a leak."], ["Hardened laptops with disk encryption", 3, 0, "The baseline for every work device."]],
    flags: [["A payment request with new bank details, by email only", 1], ["Someone left and nobody is sure what they still have", 0], ["The same password works for the website, socials, and bank", 0], ["Nobody has restored a backup this year", 0], ["Member data has been pasted into a chatbot", 0], ["An admin account uses text-message codes", 0]],
    moves: ["Two-person rule for any money movement", "Individual accounts + team vault", "A one-page AI & data agreement, adopted by consent"], cta: "Book accompaniment for your group", ctaType: "group" },
  networks: { title: "Networks & movements", kicker: "Mutual aid, organizers & labor", h1a: "Movements run on trust.", h1b: "Protect it like it's the rent.", lede: "Mutual aid crews, organizers, and workers building unions all rely on big, fast-moving groups, where one open chat or one work phone can expose everyone.", members: ["mutual", "activist", "labor"],
    stats: [["45", "countries where Citizen Lab found operators of NSO's Pegasus spyware, used against activists and journalists", "Citizen Lab, 2018", "https://citizenlab.ca/2018/09/hide-and-seek-tracking-nso-groups-pegasus-spyware-to-operations-in-45-countries/"], ["2022", "the NLRB's top lawyer warned that intrusive employer monitoring can interfere with workers' right to organize", "NLRB GC Memo 23-02", "https://www.nlrb.gov/news-outreach/news-story/nlrb-general-counsel-issues-memo-on-unlawful-electronic-surveillance-and"], ["Minutes", "is how long forensic tools can take to copy a phone that's unlocked or seized", "EFF Surveillance Self-Defense", "https://ssd.eff.org"]],
    stack: [[7, ["Consent-based photo norms at every action", "Organizing identities separate from personal ones"]], [6, ["Collect only what you need about recipients and members", "Delete on a schedule"]], [5, ["Separate email and number for organizing", "Carrier PIN; security keys on core accounts"]], [4, ["Signal with disappearing messages", "No organizing on work apps"]], [3, ["Strong passcode (not face or fingerprint) at actions", "Consider GrapheneOS for core organizers"]], [2, ["Never organize on work Wi-Fi", "Faraday pouch or airplane mode at sensitive events"]], [1, ["A device you'd be OK losing at an action", "Personal devices only for union work"]]],
    radar: [["Signal with disappearing messages", 0, 0, "The default for sensitive coordination."], ["Small vetted core + big announce channel", 0, 0, "Split who can talk from who can listen."], ["Giant open group chats", 0, 3, "Anyone can be in there, including people who shouldn't."], ["Riseup / May First services", 1, 1, "Movement-run email, lists, and hosting."], ["Recipient lists in shared spreadsheets", 1, 3, "Addresses and status in one file anyone can forward."], ["Separate organizing accounts", 2, 0, "One identity for the work, one for your life."], ["Security keys on core accounts", 2, 1, "Cheap, phishing-proof, worth it for leaders."], ["Work phone or work email for organizing", 2, 3, "Your employer can see it."], ["Burner-style secondary phone", 3, 2, "Useful for actions; needs discipline to stay separate."], ["GrapheneOS for core organizers", 3, 1, "Hardened phone for people most likely to be targeted."], ["Rayhunter at large actions", 3, 2, "Flags possible fake cell towers."]],
    flags: [["Someone new asks for the full member or recipient list", 1], ["Organizing happens on work devices or work Wi-Fi", 0], ["Nobody knows who's in the main group chat", 0], ["Photos from actions show faces of people who didn't agree", 0], ["A former member still has admin on a group or drive", 0], ["Leaders use one phone and one identity for everything", 0]],
    moves: ["Split chats: small trusted core, big announce channel", "Personal devices only; never work Wi-Fi", "Consent-based photo norms for every action"], cta: "Bring a training to your network", ctaType: "group" },
  pros: { title: "Professionals with a duty of care", kicker: "Journalists, researchers & healthcare", h1a: "Other people's secrets", h1b: "are in your hands.", lede: "Reporters protect sources. Clinics, doulas, and abortion funds protect patients. Your security isn't just yours; it's a promise to the people who trusted you.", members: ["journalist", "health"],
    stats: [["180+", "journalists found among potential Pegasus spyware targets in a leaked list", "Pegasus Project / Forbidden Stories, 2021", "https://forbiddenstories.org/case/the-pegasus-project/"], ["~190M", "people affected by the 2024 Change Healthcare ransomware attack", "UnitedHealth / HHS OCR", "https://www.hhs.gov/hipaa/for-professionals/special-topics/change-healthcare-cybersecurity-incident-frequently-asked-questions/index.html"], ["2022", "private messages obtained by warrant became evidence in a Nebraska abortion prosecution", "Reporting on Nebraska v. Burgess", "https://www.eff.org/deeplinks/2022/08/facebook-turned-over-chat-messages-between-mother-and-daughter-now-charged-over"]],
    stack: [[7, ["Publish a secure way for sources or patients to reach you", "Scrub your home address from public records"]], [6, ["Keep notes local and encrypted", "Minimize patient and source records; delete on schedule"]], [5, ["Security keys on email and cloud", "Separate work and personal identities"]], [4, ["Signal for sources and patients", "No cloud AI for interviews or patient notes"]], [3, ["Lockdown Mode or Advanced Protection if targeted", "Automatic updates, always"]], [2, ["VPN or Tor for sensitive research", "Travel router on hotel and conference Wi-Fi"]], [1, ["Travel with a clean device", "Encrypted drives for recordings"]]],
    radar: [["Signal with verified safety numbers", 0, 0, "The baseline for sources and patients."], ["SecureDrop", 0, 1, "Anonymous document drops for newsrooms."], ["Unencrypted email or SMS with sources/patients", 0, 3, "Readable by providers and subpoenas."], ["Local, encrypted notes (Cryptomator, VeraCrypt)", 1, 0, "Notes stay on your device, locked."], ["Cloud transcription and AI for interviews", 1, 3, "Your raw material on someone else's servers."], ["Security keys + passkeys", 2, 0, "Phishing-proof accounts."], ["Separate professional identity", 2, 1, "Work number and email apart from your life."], ["Lockdown Mode / Advanced Protection", 3, 1, "For people who may face spyware."], ["Clean travel device", 3, 1, "Carry only what you need across borders."], ["Period and health apps that sync to the cloud", 3, 3, "Health data you don't control."]],
    flags: [["Unexpected login alerts or password resets", 1], ["A source or patient contacts you on a platform you don't use for work", 0], ["Sensitive recordings live in a cloud drive", 0], ["You cross borders with everything on one laptop", 0], ["Patient or source data sits in regular email", 0], ["Your home address shows up in a search of your name", 0]],
    moves: ["Publish one secure contact method", "Keep sensitive notes local and encrypted", "A clean device for travel"], cta: "Get a privacy audit", ctaType: "group" },
  atrisk: { title: "People being targeted", kicker: "Survivors, immigrant communities & those at elevated risk", h1a: "When someone", h1b: "is looking for you.", lede: "Survivors of abuse and immigrant communities face people and systems actively trying to find them. The fixes here are careful and slow on purpose: acting too fast can tip someone off.", members: ["survivor", "immigrant"],
    stats: [["3 in 4", "U.S. adults' driver's license data is accessible to ICE, often through commercial data brokers", "Georgetown Law, American Dragnet, 2022", "https://americandragnet.org"], ["2023", "Apple and Google agreed on a joint standard for unknown-tracker alerts after AirTag stalking cases", "Apple & Google", "https://www.apple.com/newsroom/2023/05/apple-google-partner-on-an-industry-specification-to-address-unwanted-tracking/"], ["24/7", "free, confidential help from the National Domestic Violence Hotline, including tech safety", "The Hotline", "https://www.thehotline.org"]],
    stack: [[7, ["Opt out of people-search sites", "Ask about your state's address confidentiality program"]], [6, ["Keep documents in a safe place only you can reach", "Collect less if you serve these communities"]], [5, ["New accounts from a safe device", "Change recovery emails and security questions"]], [4, ["Check location sharing in every app", "Remove unknown linked devices"]], [3, ["Check for stalkerware with an advocate", "Turn off ad tracking and precise location"]], [2, ["Be careful on shared or monitored Wi-Fi", "Use a trusted device for sensitive searches"]], [1, ["Scan for Bluetooth trackers", "A separate, safe phone if needed"]]],
    radar: [["Plan with an advocate first", 0, 0, "Before changing anything, so changes don't alert an abuser."], ["Signal with disappearing messages", 0, 0, "For talking with helpers and family."], ["Shared family phone plans", 0, 3, "The account holder can often see a lot."], ["Safe, separate cloud for documents", 1, 1, "IDs and evidence somewhere only you can reach."], ["Unknown-tracker alerts on", 2, 0, "Built into iPhone and Android."], ["Changing passwords from a possibly-compromised device", 2, 3, "Can be seen by stalkerware. Use a safe device."], ["Address confidentiality programs", 2, 1, "State programs that give you a substitute address."], ["Safety Check (iPhone)", 3, 0, "Reviews and resets who you share with."], ["Removing stalkerware alone", 3, 2, "Can alert the abuser. Plan with an advocate."], ["Apps that collect precise location", 3, 3, "Location data gets sold and subpoenaed."]],
    flags: [["Someone knows where you've been without you telling them", 1], ["Your phone battery drains fast or it runs hot for no reason", 0], ["You find an unknown Bluetooth tracker alert", 1], ["Someone else pays for or manages your phone plan", 0], ["A caller claims to be from immigration or police and wants money or information", 1], ["Your address appears in a search of your name", 0]],
    moves: ["Talk to an advocate before you change anything", "Check location sharing, trackers, and linked devices", "Opt out of people-search sites"], cta: "Talk to us (Signal available)", ctaType: "group",
    crisis: "If you're in danger, call 911. For confidential help with abuse, call the National Domestic Violence Hotline at 1-800-799-7233 or text START to 88788." }
};
