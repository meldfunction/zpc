// Builds text.html: the whole site's core content as one plain page that works with JavaScript off
// (Tor Browser "Safest", NoScript, screen readers that struggle with the app, slow phones).
// Reads the same data as the site: zpc-data.js (workshops, calendar, tools, fails, gear, library) and news.json.
// Run: node scripts/build_text.mjs   (the Pages workflow runs it on every deploy, after the news refresh)
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "zpc-"));
writeFileSync(join(tmp, "data.mjs"), readFileSync(join(ROOT, "zpc-data.js"), "utf8"));
const D = await import(pathToFileURL(join(tmp, "data.mjs")).href);
rmSync(tmp, { recursive: true, force: true });
let news = { items: [], sources: [] };
try { news = JSON.parse(readFileSync(join(ROOT, "news.json"), "utf8")); } catch {}

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ext = (u, label) => `<a href="${esc(u.startsWith("http") ? u : "https://" + u)}" rel="noopener noreferrer">${esc(label ?? u)}</a>`;
const tags = t => (t || []).map(x => x[0]).filter(Boolean).join(" · ");
const hm = h => { const [H, M] = h.split(":").map(Number); return (H % 12 || 12) + (M ? ":" + String(M).padStart(2, "0") : "") + (H < 12 ? " AM" : " PM"); };
const span = t => { const a = hm(t[0]), b = hm(t[1]); return (a.slice(-2) === b.slice(-2) ? a.slice(0, -3) : a) + "–" + b + " ET"; };
const ws = D.workshops || [];

const out = [];
const h = s => out.push(s);

h(`<p class="eyebrow">Text version · no JavaScript needed</p>
<h1>Zen Privacy Collective, in plain text.</h1>
<p class="lede">Pay-what-you-can privacy and security education for families, co-ops, organizers, and anyone being targeted. This page has the site's core content without the app: workshops, the calendar, headlines, and our guides. <a href="./">The full site</a> has the quiz, search, and interactive guides.</p>
<nav class="box" aria-label="On this page"><strong>On this page:</strong> <a href="#workshops">Workshops</a> · <a href="#calendar">Calendar</a> · <a href="#members">Chapters</a> · <a href="#projects">Projects</a> · <a href="#book">How to book</a> · <a href="#news">Headlines</a> · <a href="#fails">Common fails</a> · <a href="#tools">Tools</a> · <a href="#commons">Gear</a> · <a href="#library">Library</a></nav>`);

h(`<h2 id="workshops">Workshops: five Fridays, zero panic</h2>
<p>Fridays, 6:30–8 PM ET, in person and online. 20 seats per room. Pay what you can; no one turned away. ASL interpretation and childcare on request.</p>`);
for (const w of ws) {
  h(`<h3>${esc(w.date)}: Workshop ${w.n}, ${esc(w.title)}${w.tag ? " (" + esc(w.tag) + ")" : ""}</h3>
<p>${esc(w.blurb)}</p>
<ul>${(w.learn || []).map(l => `<li>${esc(l)}</li>`).join("")}</ul>
<p class="small"><strong>Before you come:</strong> ${esc(w.prereq)}</p>`);
}

h(`<h2 id="calendar">Calendar</h2>
<p>Confirmed events can be booked now. <strong>Proposed</strong> dates aren't set yet: email us if you want one and we'll tell you when it's confirmed.</p>`);
const byMonth = new Map();
for (const e of D.events || []) {
  const [y, m, d] = e.d.split("-").map(Number), dt = new Date(Date.UTC(y, m - 1, d, 12));
  const key = dt.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const w = e.series ? ws.find(x => x.n === e.series) : null;
  if (!byMonth.has(key)) byMonth.set(key, []);
  byMonth.get(key).push({ day: dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }), title: w ? `Workshop ${w.n}: ${w.title}` : e.title, kind: w ? "Workshop" : e.kind || "Workshop", topic: e.topic, where: e.where || "In person + online", time: span(e.t), status: e.status === "confirmed" ? "Confirmed" : "Proposed" });
}
for (const [month, list] of byMonth) {
  h(`<h3>${esc(month)}</h3>
<div class="tablewrap"><table><thead><tr><th>Date</th><th>Event</th><th>Topic</th><th>Status</th></tr></thead><tbody>
${list.map(e => `<tr><td>${esc(e.day)}<br><span class="small">${esc(e.time)}</span></td><td>${esc(e.title)}<br><span class="small">${esc(e.kind)} · ${esc(e.where)}</span></td><td>${esc(e.topic)}</td><td>${e.status}</td></tr>`).join("\n")}
</tbody></table></div>`);
}

h(`<h2 id="members">Chapters and members</h2>
<p>We list each other by initials only. <strong>Sample directory:</strong> these chapters and members are placeholders while the collective sets up. To reach someone, email <a href="mailto:hello@zenxyprivacy.org">hello@zenxyprivacy.org</a> with their initials and city in the subject.</p>`);
for (const c of D.chapters || []) {
  const ms = (D.members || []).filter(m => m.c === c.k);
  h(`<h3>${esc(c.name)}, ${esc(c.region)} (${esc(c.k)})</h3>
<p>${esc(c.blurb)} <span class="small">${esc(c.status)} · ${esc(c.meets)}</span></p>
<ul>${ms.map(m => `<li><strong>${esc(m.i)}</strong>, ${esc(m.role)}: ${esc(m.bio)} <span class="small">(Speaks ${esc(m.langs.join(", "))} · ${esc(m.focus.join(", "))})</span></li>`).join("\n")}</ul>`);
}

h(`<h2 id="projects">Projects in flight</h2>
<p><strong>Example projects:</strong> anonymized composites, not real clients. Each moves through five stages: ${(D.projectStages || []).map(x => esc(x.pizza + " (" + x.t + ")")).join(" \u2192 ")}.</p>
<div class="tablewrap"><table><thead><tr><th>Project</th><th>Stage</th><th>Status</th></tr></thead><tbody>
${(D.projects || []).map(p => `<tr><td><strong>${esc(p.code)}</strong>: ${esc(p.org)} (${esc(p.city)}), ${esc(p.foundation)}. Lead ${esc(p.lead)}.<br><span class="small">${esc(p.now)}</span></td><td>${esc(((D.projectStages || [])[p.stage] || {}).pizza || "")}</td><td>${esc(p.health)}${p.cost ? "<br><span class=\"small\">Cost to fix: " + esc(p.cost) + "</span>" : ""}</td></tr>`).join("\n")}
</tbody></table></div>`);
h(`<h3>How a project works, step by step</h3>`);
(D.projectStages || []).forEach((st, i) => {
  const ow = k => ((D.workflowOwners || []).find(o => o.k === k) || {}).label || k;
  h(`<p><strong>${i + 1}. ${esc(st.pizza)} (${esc(st.t)}).</strong> ${esc(st.d)}</p><ul>${((D.workflow || [])[i] || []).map(([t, k, dd]) => `<li><strong>${esc(t)}</strong> <span class="small">(${esc(ow(k))})</span>: ${esc(dd)}</li>`).join("")}</ul>`);
});

h(`<h2 id="book">How to book</h2>
<p>Email <a href="mailto:hello@zenxyprivacy.org?subject=Workshop%20seat">hello@zenxyprivacy.org</a> with the session you want, in person or online, a name (a nickname is fine), and any access needs (ASL, captions, childcare, anything else). Pay what you can: suggested $10, $25, or $50, or nothing. Nobody checks.</p>
<p>Want a session for your group, or to bring us to your city? <a href="mailto:hello@zenxyprivacy.org?subject=Session%20for%20my%20group">Email us</a> with your city and group.</p>`);

const items = (news.items || []).slice(0, 30);
h(`<h2 id="news">Latest privacy &amp; security headlines</h2>
<p>From ${(news.sources || []).length} newsrooms and watchdogs, collected by us once a day. Links go to the publisher.</p>
${items.length ? `<ul>${items.map(i => `<li>${ext(i.u, i.t)} <span class="small">(${esc(i.s)}, ${esc(i.d.slice(0, 10))}${i.k && i.k.length ? " · " + esc(i.k.join(", ")) : ""})</span></li>`).join("\n")}</ul>` : "<p>No headlines right now.</p>"}`);

h(`<h2 id="fails">Common security fails, and the fix for each</h2>`);
for (const g of D.failGroups || []) {
  h(`<h3>${esc(g.title)}</h3><ul>${g.items.map(x => `<li><strong>${esc(x.t)}.</strong> ${esc(x.looks)} <em>Fix:</em> ${esc(x.fix)}</li>`).join("\n")}</ul>`);
}

h(`<h2 id="tools">Tools we actually trust</h2>`);
for (const g of D.toolGroups || []) for (const c of g.cats) {
  h(`<h3>${esc(g.title)}: ${esc(c.title)}</h3><ul>${c.items.map(t => `<li>${ext(t[3], t[0])}: ${esc(t[2])} <span class="small">(${esc(tags(t[1]))})</span></li>`).join("\n")}</ul>`);
}

h(`<h2 id="commons">Gear (buy direct, buy two keys)</h2>`);
for (const g of D.commons || []) {
  h(`<h3>${esc(g.title)}</h3>${g.note ? `<p class="small">${esc(g.note)}</p>` : ""}<ul>${g.items.map(t => `<li>${ext(t[3], t[0])}: ${esc(t[2])} <span class="small">(${esc(tags(t[1]))})</span></li>`).join("\n")}</ul>`);
}

h(`<h2 id="library">Library: words that keep you safe</h2><dl>`);
for (const e of [...(D.library || [])].sort((a, b) => a.t.localeCompare(b.t))) {
  h(`<dt><strong>${esc(e.t)}</strong>${e.stands ? " (" + esc(e.stands) + ")" : ""}</dt><dd>${esc(e.def)}${e.why ? " <em>Why it matters:</em> " + esc(e.why) : ""}${e.tryit ? " <em>Try it:</em> " + esc(e.tryit) : ""}</dd>`);
}
h(`</dl>`);

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Text version: Zen Privacy Collective</title>
<meta name="description" content="Zen Privacy Collective's workshops, calendar, headlines, and guides as one plain page. No JavaScript needed.">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="no-referrer">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="css/fonts.css">
<link rel="stylesheet" href="css/plain.css">
<style>dd{margin:0 0 1em 0}dt{margin-top:.6em}</style>
</head>
<body>
<!-- Generated by scripts/build_text.mjs from zpc-data.js and news.json. Edit those, not this file. -->
<a class="skip" href="#content">Skip to content</a>
<header class="pz"><div class="in">
  <a class="brand" href="./"><b>ZPC</b><span>Zen Privacy<br>Collective</span></a>
  <nav aria-label="Site"><a href="./">Full site</a><a href="#calendar">Calendar</a><a href="#book">Book</a><a href="#news">News</a></nav>
</div></header>
<main id="content">
${out.join("\n\n")}
<p class="small" style="margin-top:3em">Generated ${new Date().toISOString().slice(0, 10)}.</p>
</main>
<footer class="pz"><div class="in">
  <span>Zen Privacy Collective · Protect each other.</span>
  <span><a href="privacy.html">Privacy</a> · <a href="conduct.html">Code of conduct</a> · <a href="accessibility.html">Accessibility</a> · <a href="mailto:hello@zenxyprivacy.org">Contact</a></span>
</div></footer>
</body>
</html>
`;
writeFileSync(join(ROOT, "text.html"), page);
console.error(`text.html: ${ws.length} workshops, ${(D.events || []).length} events, ${items.length} headlines, ${(D.library || []).length} library entries`);
