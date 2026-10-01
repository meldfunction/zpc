// End-to-end tests against a local Worker + local D1 (wrangler dev). Run: npm test
// Starts from an empty local database every time; nothing touches Cloudflare.
import { spawn, execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("..", import.meta.url));
const PORT = 8799, BASE = `http://127.0.0.1:${PORT}`, ORIGIN = "https://meldfunction.github.io";
const ADMIN = "Basic " + btoa("org:local-test-password");
const wr = (...a) => execFileSync("npx", ["wrangler", ...a], { cwd: dir, stdio: "pipe", env: { ...process.env, NO_COLOR: "1" } }).toString();

rmSync(new URL("../.wrangler/state", import.meta.url), { recursive: true, force: true });
wr("d1", "migrations", "apply", "zpc-registration", "--local");
wr("d1", "execute", "zpc-registration", "--local", "--command", `
  INSERT INTO sessions (id, title, starts_at, room_capacity, online_capacity) VALUES
    ('t-small', 'Two-seat test', '2099-01-01T18:30:00-05:00', 2, 1),
    ('t-closed', 'Closed test', '2099-01-02T18:30:00-05:00', 20, NULL),
    ('t-past', 'Past test', '2020-01-01T18:30:00-05:00', 20, NULL),
    ('t-race', 'Race', '2099-02-01T18:30:00-05:00', 2, NULL);
  UPDATE sessions SET open = 0 WHERE id = 't-closed';
  INSERT INTO registrations (id, session_id, mode, status, name, contact, cancel_hash, created_at)
    VALUES ('OLDROW01', 't-past', 'room', 'confirmed', 'Old', 'old@example.org', 'x', '2019-12-01T00:00:00Z');`);

const server = spawn("npx", ["wrangler", "dev", "--local", "--port", String(PORT), "--ip", "127.0.0.1", "--test-scheduled", "--var", "RATE_PER_DAY:40"], { cwd: dir, detached: true, env: { ...process.env, NO_COLOR: "1" } });
let log = ""; server.stdout.on("data", d => log += d); server.stderr.on("data", d => log += d);
// Kill the whole process group: npx -> wrangler -> workerd. Killing only npx leaves workerd holding the port.
const stop = () => { try { process.kill(-server.pid, "SIGTERM"); } catch {} };
process.on("exit", stop);

for (let i = 0; i < 120; i++) { try { if ((await fetch(BASE + "/")).ok) break; } catch {} await new Promise(r => setTimeout(r, 500)); if (i === 119) { console.log(log); throw new Error("wrangler dev did not start"); } }

let pass = 0, fail = 0;
const t = async (name, fn) => { try { await fn(); pass++; console.log("  ✓ " + name); } catch (e) { fail++; console.log("  ✗ " + name + "\n      " + (e && (e.cause ? e.message + " / " + e.cause.message : e.message))); if (process.env.SHOWLOG) console.log(log.split("\n").slice(-25).join("\n")); } };
const eq = (a, b, m) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${m || "expected"} ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };
const ok = (c, m) => { if (!c) throw new Error(m); };
const reg = (body, origin = ORIGIN) => fetch(BASE + "/api/register", { method: "POST", headers: { "Content-Type": "application/json", ...(origin ? { Origin: origin } : {}) }, body: JSON.stringify(body) });
const sessions = async () => (await (await fetch(BASE + "/api/sessions", { headers: { Origin: ORIGIN } })).json()).sessions;
const seat = (n, extra = {}) => ({ session: "t-small", mode: "room", name: "Person " + n, contact: `p${n}@example.org`, ...extra });

console.log("API");
await t("lists the five fall sessions plus test sessions", async () => {
  const s = await sessions();
  eq(s.filter(x => x.id.startsWith("ws-")).length, 5);
  eq(s.find(x => x.id === "ws-1").room_left, 20);
  eq(s.find(x => x.id === "ws-1").online_left, null, "online unlimited ->");
});
await t("CORS: allowed origin echoed, other origins refused", async () => {
  const a = await fetch(BASE + "/api/sessions", { headers: { Origin: ORIGIN } });
  eq(a.headers.get("access-control-allow-origin"), ORIGIN);
  const b = await reg(seat(90), "https://evil.example");
  eq(b.status, 403);
  const c = await reg(seat(91), null);
  eq(c.status, 403, "no Origin header ->");
});
await t("rejects missing fields, bad mode, unknown and closed sessions", async () => {
  eq((await reg({ session: "t-small", mode: "room", name: "", contact: "x" })).status, 400);
  eq((await reg(seat(1, { mode: "balcony" }))).status, 400);
  eq((await reg(seat(1, { session: "nope" }))).status, 404);
  eq((await reg(seat(1, { session: "t-closed" }))).status, 409);
  eq((await reg(seat(1, { session: "t-past" }))).status, 409);
});
await t("honeypot looks like success but saves nothing", async () => {
  const r = await (await reg(seat(80, { website: "http://spam" }))).json();
  eq(r.status, "confirmed");
  eq((await sessions()).find(x => x.id === "t-small").room_left, 2);
});

console.log("Seats and waitlist");
let first, third;
await t("first two get seats, third is waitlisted at position 1", async () => {
  first = await (await reg(seat(1, { needs: ["ASL interpretation"], pay: "$10" }))).json();
  const second = await (await reg(seat(2))).json();
  third = await (await reg(seat(3))).json();
  eq([first.status, second.status, third.status], ["confirmed", "confirmed", "waitlist"]);
  eq(third.position, 1);
  ok(/\/cancel\?ref=[A-Z0-9]+&t=/.test(first.cancel_url), "cancel_url missing");
  const s = (await sessions()).find(x => x.id === "t-small");
  eq([s.room_left, s.room_waitlist], [0, 1]);
});
await t("same contact again returns the existing booking, not a new seat", async () => {
  const again = await (await reg(seat(1, { contact: "P1@EXAMPLE.ORG" }))).json();
  eq([again.duplicate, again.status, again.ref], [true, "confirmed", first.ref]);
});
await t("online has its own limit (1 here)", async () => {
  eq((await (await reg(seat(4, { mode: "online" }))).json()).status, "confirmed");
  eq((await (await reg(seat(5, { mode: "in person" }))).json()).status, "waitlist", "'in person' maps to room ->");
  eq((await (await reg(seat(6, { mode: "online" }))).json()).status, "waitlist");
});
await t("10 simultaneous bookings for 2 free seats never over-fill", async () => {
  const rs = await Promise.all(Array.from({ length: 10 }, (_, i) => reg({ session: "t-race", mode: "room", name: "R" + i, contact: `r${i}@example.org` }).then(r => r.json())));
  eq(rs.filter(r => r.status === "confirmed").length, 2, "confirmed ->");
  eq(rs.filter(r => r.status === "waitlist").length, 8, "waitlist ->");
});

console.log("Cancel");
await t("GET shows a confirm button and changes nothing", async () => {
  const r = await fetch(first.cancel_url);
  const body = await r.text();
  ok(r.ok && body.includes("Yes, cancel it") && body.includes("Two-seat test"), "no confirm page");
  eq((await sessions()).find(x => x.id === "t-small").room_left, 0, "seat freed by GET ->");
});
await t("POST cancels and moves the waitlisted person up", async () => {
  const u = new URL(first.cancel_url);
  const r = await fetch(BASE + "/cancel", { method: "POST", body: new URLSearchParams({ ref: u.searchParams.get("ref"), t: u.searchParams.get("t") }) });
  ok((await r.text()).includes("Cancelled"), "not cancelled");
  const s = (await sessions()).find(x => x.id === "t-small");
  eq([s.room_left, s.room_waitlist], [0, 1], "[room_left, waitlist] after promotion ->");
});
await t("used or wrong cancel links are refused", async () => {
  eq((await fetch(first.cancel_url)).status, 404, "reused ->");
  const u = new URL(third.cancel_url);
  eq((await fetch(`${BASE}/cancel?ref=${u.searchParams.get("ref")}&t=${"A".repeat(32)}`)).status, 404, "wrong token ->");
});

console.log("Organizers");
await t("admin needs the password", async () => {
  eq((await fetch(BASE + "/admin")).status, 401);
  eq((await fetch(BASE + "/admin", { headers: { Authorization: "Basic " + btoa("org:wrong") } })).status, 401);
});
await t("admin page lists people, needs, and flags the promoted person", async () => {
  const h = await (await fetch(BASE + "/admin", { headers: { Authorization: ADMIN } })).text();
  ok(h.includes("Person 3") && h.includes("moved up: tell them"), "promoted person not flagged");
  ok(h.includes("Room 2/2"), "room count wrong");
});
await t("names are HTML-escaped on the admin page", async () => {
  await reg({ session: "ws-2", mode: "online", name: "<script>alert(1)</script>", contact: "x@example.org" });
  const h = await (await fetch(BASE + "/admin", { headers: { Authorization: ADMIN } })).text();
  ok(!h.includes("<script>alert(1)") && h.includes("&lt;script&gt;"), "not escaped");
});
await t("CSV export works and defuses spreadsheet formulas", async () => {
  await reg({ session: "ws-3", mode: "online", name: "=HYPERLINK(\"http://x\")", contact: "f@example.org" });
  const r = await fetch(BASE + "/admin/export.csv", { headers: { Authorization: ADMIN } });
  const csv = await r.text();
  ok(r.headers.get("content-type").includes("text/csv"), "not csv");
  ok(csv.includes("\"'=HYPERLINK"), "formula not defused");
});
await t("admin delete frees the seat and promotes the next person", async () => {
  const h = await (await fetch(BASE + "/admin", { headers: { Authorization: ADMIN } })).text();
  const id = /<td>Person 2<\/td>[\s\S]*?name="id" value="([A-Z0-9]+)"/.exec(h)[1];
  const r = await fetch(BASE + "/admin/action", { method: "POST", redirect: "manual", headers: { Authorization: ADMIN }, body: new URLSearchParams({ id, act: "delete" }) });
  eq(r.status, 303);
  const s = (await sessions()).find(x => x.id === "t-small");
  eq([s.room_left, s.room_waitlist], [0, 0], "Person 5 should have moved up ->");
});

await t("abuse limit kicks in (40/day in tests, 10 by default)", async () => {
  let last = 0;
  for (let i = 0; i < 45 && last !== 429; i++) last = (await reg({ session: "ws-4", mode: "online", name: "L" + i, contact: `l${i}@example.org` })).status;
  eq(last, 429);
});

console.log("Housekeeping");
await t("daily cron deletes registrations 90 days after their session", async () => {
  const csv = () => fetch(BASE + "/admin/export.csv", { headers: { Authorization: ADMIN } }).then(r => r.text());
  ok((await csv()).includes("OLDROW01"), "test row missing before cleanup");
  eq((await fetch(BASE + "/__scheduled?cron=15+7+*+*+*")).status, 200);
  const after = await csv();
  ok(!after.includes("OLDROW01"), "old row still there");
  ok(after.includes("t-small"), "future bookings were deleted too");
});
await t("server still answers after the cleanup run", async () => { eq((await fetch(BASE + "/")).status, 200); });

stop();
await new Promise(r => setTimeout(r, 1500));
console.log("Stored data (read after the server stops)");
await t("no IP addresses stored; cancel tokens stored only as hashes", async () => {
  const dump = wr("d1", "execute", "zpc-registration", "--local", "--json", "--command", "SELECT r.cancel_hash, k.key FROM registrations r, rate k LIMIT 1");
  const row = JSON.parse(dump)[0].results[0];
  ok(/^[0-9a-f]{64}$/.test(row.cancel_hash) && /^[0-9a-f]{64}$/.test(row.key), "not hashed");
  ok(!dump.includes("127.0.0.1"), "raw IP found");
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
