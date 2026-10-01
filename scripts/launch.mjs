#!/usr/bin/env node
// Launch switch: turns the review draft into the public site.
//
//   node scripts/launch.mjs https://zenxyprivacy.org/            # apply
//   node scripts/launch.mjs https://zenxyprivacy.org/ --dry-run  # show what would change
//
// What it does:
//   1. Removes <meta name="robots" content="noindex, nofollow"> from every page.
//   2. Rewrites robots.txt to allow crawling and point at the sitemap.
//   3. Writes sitemap.xml (real pages only; the app's #pages are one URL to a crawler).
//   4. Points hard-coded addresses at the new base URL: share-preview tags in index.html,
//      the 404 page's links, and the Canonical line in .well-known/security.txt.
//
// Everything it touches is in git, so `git checkout -- .` undoes a run you haven't committed.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";

const root = new URL("..", import.meta.url).pathname;
const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const baseArg = args.find(a => !a.startsWith("--"));

if (!baseArg || !/^https:\/\/[^/]+\//.test(baseArg.endsWith("/") ? baseArg : baseArg + "/")) {
  console.error("Usage: node scripts/launch.mjs https://your-domain.example/ [--dry-run]");
  process.exit(1);
}
const base = baseArg.endsWith("/") ? baseArg : baseArg + "/";
const basePath = new URL(base).pathname; // "/" on a custom domain, "/zpc/" on GitHub Pages
const OLD = "https://meldfunction.github.io/zpc/";

const changes = [];
const write = (file, text) => {
  const path = join(root, file);
  const before = existsSync(path) ? readFileSync(path, "utf8") : null;
  if (before === text) return;
  changes.push(file);
  if (!dry) writeFileSync(path, text);
};

// 1. noindex off, everywhere except the raw design exports and vendored libraries.
const SKIP = new Set(["design", "vendor", "node_modules", ".git"]);
const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) htmlFiles.push(relative(root, p));
  }
})(root);

const NOINDEX = /[ \t]*<meta name="robots" content="noindex, ?nofollow">\r?\n?/g;
for (const f of htmlFiles) {
  let s = readFileSync(join(root, f), "utf8");
  let t = s.replace(NOINDEX, "");
  if (f === "index.html") t = t.split(OLD).join(base);
  if (f === "404.html") t = t.replaceAll('href="/zpc/', `href="${basePath}`);
  if (t !== s) write(f, t);
}

// 2. robots.txt
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`);

// 3. sitemap.xml: pages a visitor can land on. Redirect stubs and the 404 page are left out.
const REDIRECTS = new Set(["about.html", "education.html", "shop.html", "tech-stack.html", "security-fails.html"]);
const pages = htmlFiles
  .filter(f => f !== "404.html" && !REDIRECTS.has(f))
  .map(f => f === "index.html" ? "" : f.replace(/(^|\/)index\.html$/, "$1"))
  .sort((a, b) => a === "" ? -1 : b === "" ? 1 : a.localeCompare(b));
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map(p => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`);

// 4. security.txt Canonical (scanners only look at the domain root, so this matters once on a custom domain).
const sec = ".well-known/security.txt";
if (existsSync(join(root, sec))) {
  let s = readFileSync(join(root, sec), "utf8");
  const line = `Canonical: ${base}.well-known/security.txt`;
  s = /^Canonical:.*$/m.test(s) ? s.replace(/^Canonical:.*$/m, line) : s.replace(/\n?$/, "\n" + line + "\n");
  write(sec, s);
}

const left = dry ? [] : htmlFiles.filter(f => readFileSync(join(root, f), "utf8").includes('name="robots" content="noindex'));
console.log(`${dry ? "Would change" : "Changed"} ${changes.length} file(s) for ${base}:`);
changes.forEach(f => console.log("  " + f));
console.log(`Sitemap: ${pages.length} page(s).`);
if (!dry) {
  console.log(left.length ? `Still noindex: ${left.join(", ")}` : "No page is marked noindex any more.");
  if (basePath === "/") console.log("Custom domain: add a CNAME file with the domain, and set it under Settings → Pages.");
}
