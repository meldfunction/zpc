// ZPC workshop registration: a Cloudflare Worker + D1 database.
//
// Public API (called from the website):
//   GET  /api/sessions          seats left per session
//   POST /api/register          save a seat, or join the waitlist when the room is full
//   GET  /cancel?ref=&t=        confirm page for cancelling (a button, so link previews can't cancel)
//   POST /cancel                cancel, and move the next waitlisted person up
//
// Organizers (password: the ADMIN_PASSWORD secret, any username):
//   GET  /admin                 sessions, who's coming, access needs
//   GET  /admin/export.csv      everything, as CSV
//   POST /admin/action          delete a registration, or mark a promoted person as told
//
// Daily cron: deletes registrations RETENTION_DAYS after their session, and old rate-limit rows.
//
// Privacy: no IP addresses are stored (only a salted hash per day, for the abuse limit),
// cancel tokens are stored hashed, and nothing is sent to any third party.

const MAX_BODY = 4096;
const LIMITS = { name: 80, contact: 120, pay: 40, needs: 200, note: 1000 };
const MODES = { room: "room", online: "online", "in person": "room" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) return await api(request, env, url);
      if (url.pathname === "/cancel") return await cancelPage(request, env, url);
      if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) return await admin(request, env, url);
      if (url.pathname === "/") return html("<p>ZPC registration service. Book at the main site.</p>", 200);
      return html("<p>Not found.</p>", 404);
    } catch (e) {
      console.error(e && e.stack || e);
      return url.pathname.startsWith("/api/") ? json({ error: "server_error" }, 500, cors(request, env)) : html("<p>Something went wrong. Please try again.</p>", 500);
    }
  },

  async scheduled(event, env) {
    await purge(env);
  }
};

/* ---------------- public API ---------------- */

async function api(request, env, url) {
  const headers = cors(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: headers ? 204 : 403, headers: headers || {} });

  if (url.pathname === "/api/sessions" && request.method === "GET") {
    const { results } = await env.DB.prepare(`
      SELECT s.id, s.title, s.starts_at, s.room_capacity, s.online_capacity, s.open,
        (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id AND r.mode = 'room'   AND r.status = 'confirmed') AS room_taken,
        (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id AND r.mode = 'online' AND r.status = 'confirmed') AS online_taken,
        (SELECT COUNT(*) FROM registrations r WHERE r.session_id = s.id AND r.mode = 'room'   AND r.status = 'waitlist')  AS room_waitlist
      FROM sessions s ORDER BY s.starts_at`).all();
    const now = Date.now();
    const sessions = results.map(s => ({
      id: s.id, title: s.title, starts_at: s.starts_at,
      open: !!s.open && Date.parse(s.starts_at) > now,
      room_left: Math.max(0, s.room_capacity - s.room_taken),
      room_waitlist: s.room_waitlist,
      online_left: s.online_capacity == null ? null : Math.max(0, s.online_capacity - s.online_taken)
    }));
    return json({ sessions }, 200, { ...headers, "Cache-Control": "no-store" });
  }

  if (url.pathname === "/api/register" && request.method === "POST") {
    if (!headers) return json({ error: "origin_not_allowed" }, 403);
    if (!(request.headers.get("content-type") || "").includes("application/json")) return json({ error: "bad_request" }, 415, headers);
    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ error: "too_large" }, 413, headers);
    let b; try { b = JSON.parse(raw); } catch { return json({ error: "bad_request" }, 400, headers); }

    // Honeypot: a hidden field real people never fill. Pretend success so bots learn nothing.
    if (b.website) return json({ status: "confirmed", ref: "ok" }, 200, headers);

    const mode = MODES[String(b.mode || "").toLowerCase()];
    const clean = k => String(b[k] == null ? "" : b[k]).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, LIMITS[k]);
    const name = clean("name"), contact = clean("contact"), pay = clean("pay"), note = clean("note");
    const needs = (Array.isArray(b.needs) ? b.needs.join(", ") : String(b.needs || "")).slice(0, LIMITS.needs);
    if (!mode || !name || !contact || typeof b.session !== "string") return json({ error: "missing_fields" }, 400, headers);

    if (!(await rateOk(request, env))) return json({ error: "rate_limited" }, 429, headers);

    const s = await env.DB.prepare("SELECT * FROM sessions WHERE id = ?").bind(b.session).first();
    if (!s) return json({ error: "unknown_session" }, 404, headers);
    if (!s.open || Date.parse(s.starts_at) <= Date.now()) return json({ error: "closed" }, 409, headers);

    // Same person, same session: return what they already have instead of a second seat.
    const dup = await env.DB.prepare(
      "SELECT id, status FROM registrations WHERE session_id = ? AND lower(contact) = lower(?) AND status != 'cancelled'"
    ).bind(s.id, contact).first();
    if (dup) return json({ status: dup.status, ref: dup.id, duplicate: true, position: dup.status === "waitlist" ? await position(env, dup.id) : undefined }, 200, headers);

    const ref = randomRef(), token = randomToken();
    const cap = mode === "room" ? s.room_capacity : s.online_capacity;
    // One statement, so the seat check and the insert can't interleave with another booking.
    await env.DB.prepare(`
      INSERT INTO registrations (id, session_id, mode, status, name, contact, pay, needs, note, cancel_hash, created_at)
      SELECT ?1, ?2, ?3,
        CASE WHEN ?4 IS NULL OR (SELECT COUNT(*) FROM registrations WHERE session_id = ?2 AND mode = ?3 AND status = 'confirmed') < ?4
             THEN 'confirmed' ELSE 'waitlist' END,
        ?5, ?6, ?7, ?8, ?9, ?10, ?11`)
      .bind(ref, s.id, mode, cap, name, contact, pay || null, needs || null, note || null, await sha256(token), new Date().toISOString())
      .run();
    const row = await env.DB.prepare("SELECT status FROM registrations WHERE id = ?").bind(ref).first();
    const out = { status: row.status, ref, session: s.id, mode, cancel_url: `${url.origin}/cancel?ref=${ref}&t=${token}` };
    if (row.status === "waitlist") out.position = await position(env, ref);
    return json(out, 201, headers);
  }

  return json({ error: "not_found" }, 404, headers || {});
}

async function position(env, ref) {
  const r = await env.DB.prepare(`
    SELECT COUNT(*) AS n FROM registrations w, registrations me
    WHERE me.id = ? AND w.session_id = me.session_id AND w.mode = me.mode AND w.status = 'waitlist' AND w.created_at <= me.created_at`).bind(ref).first();
  return r ? r.n : null;
}

/* ---------------- cancel ---------------- */

async function cancelPage(request, env, url) {
  if (request.method === "GET") {
    const ref = url.searchParams.get("ref") || "", t = url.searchParams.get("t") || "";
    const reg = await findByToken(env, ref, t);
    if (!reg) return html(page("Link not valid", "<p>This cancel link isn't valid, or the seat was already cancelled.</p>"), 404);
    const s = await env.DB.prepare("SELECT title, starts_at FROM sessions WHERE id = ?").bind(reg.session_id).first();
    return html(page("Cancel your seat?", `
      <p>${esc(reg.name)}, this cancels your ${reg.status === "waitlist" ? "waitlist spot" : "seat"} for <strong>${esc(s.title)}</strong> (${esc(fmtDate(s.starts_at))}, ${reg.mode === "room" ? "in the room" : "online"}).</p>
      <form method="post" action="/cancel"><input type="hidden" name="ref" value="${esc(ref)}"><input type="hidden" name="t" value="${esc(t)}">
      <button type="submit">Yes, cancel it</button></form>
      <p class="small">Changed your mind? Just close this page.</p>`));
  }
  if (request.method === "POST") {
    const form = await request.formData();
    const reg = await findByToken(env, String(form.get("ref") || ""), String(form.get("t") || ""));
    if (!reg) return html(page("Link not valid", "<p>This cancel link isn't valid, or the seat was already cancelled.</p>"), 404);
    await env.DB.prepare("UPDATE registrations SET status = 'cancelled' WHERE id = ?").bind(reg.id).run();
    if (reg.status === "confirmed") await promote(env, reg.session_id, reg.mode);
    return html(page("Cancelled", "<p>Done. Your spot has gone to the next person on the waitlist. Thanks for letting us know.</p>"));
  }
  return html("<p>Method not allowed.</p>", 405);
}

async function findByToken(env, ref, token) {
  if (!/^[A-Z0-9]{6,12}$/.test(ref) || !/^[A-Za-z0-9_-]{20,}$/.test(token)) return null;
  const reg = await env.DB.prepare("SELECT * FROM registrations WHERE id = ? AND status != 'cancelled'").bind(ref).first();
  if (!reg) return null;
  return timingSafeEqual(reg.cancel_hash, await sha256(token)) ? reg : null;
}

// Move the earliest waitlisted person up, if a seat is free. Single statement, so it can't over-fill.
async function promote(env, sessionId, mode) {
  await env.DB.prepare(`
    UPDATE registrations SET status = 'confirmed', promoted_at = ?3
    WHERE id = (SELECT id FROM registrations WHERE session_id = ?1 AND mode = ?2 AND status = 'waitlist' ORDER BY created_at LIMIT 1)
      AND (SELECT CASE WHEN ?2 = 'room' THEN room_capacity ELSE online_capacity END FROM sessions WHERE id = ?1) IS NOT NULL
      AND (SELECT COUNT(*) FROM registrations WHERE session_id = ?1 AND mode = ?2 AND status = 'confirmed')
          < (SELECT CASE WHEN ?2 = 'room' THEN room_capacity ELSE online_capacity END FROM sessions WHERE id = ?1)`)
    .bind(sessionId, mode, new Date().toISOString()).run();
}

/* ---------------- organizers ---------------- */

async function admin(request, env, url) {
  if (!env.ADMIN_PASSWORD) return html(page("Not set up", "<p>Set the ADMIN_PASSWORD secret to use this page.</p>"), 503);
  if (!(await authorized(request, env))) {
    return new Response("Organizer login required.", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="ZPC organizers", charset="UTF-8"', ...SECURITY_HEADERS } });
  }

  if (url.pathname === "/admin/action" && request.method === "POST") {
    // Same-origin check: the form must come from this admin page.
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin) return html("<p>Forbidden.</p>", 403);
    const f = await request.formData(), id = String(f.get("id") || ""), act = String(f.get("act") || "");
    const reg = await env.DB.prepare("SELECT * FROM registrations WHERE id = ?").bind(id).first();
    if (reg && act === "delete") {
      await env.DB.prepare("DELETE FROM registrations WHERE id = ?").bind(id).run();
      if (reg.status === "confirmed") await promote(env, reg.session_id, reg.mode);
    } else if (reg && act === "told") {
      await env.DB.prepare("UPDATE registrations SET contacted_at = ? WHERE id = ?").bind(new Date().toISOString(), id).run();
    }
    return Response.redirect(`${url.origin}/admin#${reg ? reg.session_id : ""}`, 303);
  }

  const { results: sessions } = await env.DB.prepare("SELECT * FROM sessions ORDER BY starts_at").all();
  const { results: regs } = await env.DB.prepare("SELECT * FROM registrations WHERE status != 'cancelled' ORDER BY session_id, mode, status, created_at").all();

  if (url.pathname === "/admin/export.csv") {
    const cols = ["session_id", "mode", "status", "name", "contact", "pay", "needs", "note", "created_at", "promoted_at", "contacted_at", "id"];
    const csv = [cols.join(",")].concat(regs.map(r => cols.map(c => csvCell(r[c])).join(","))).join("\r\n");
    return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="zpc-registrations.csv"', "Cache-Control": "no-store", ...SECURITY_HEADERS } });
  }

  const blocks = sessions.map(s => {
    const mine = regs.filter(r => r.session_id === s.id);
    const count = (m, st) => mine.filter(r => r.mode === m && r.status === st).length;
    const needs = mine.filter(r => r.needs && r.status === "confirmed");
    const rows = mine.map(r => `<tr class="${r.status}">
      <td>${r.mode === "room" ? "Room" : "Online"}</td><td>${r.status === "waitlist" ? "Waitlist" : "Seat"}${r.promoted_at && !r.contacted_at ? ' <mark>moved up: tell them</mark>' : ""}</td>
      <td>${esc(r.name)}</td><td>${esc(r.contact)}</td><td>${esc(r.needs || "")}</td><td>${esc(r.pay || "")}</td><td>${esc(r.note || "")}</td><td class="small">${esc(r.created_at.slice(0, 10))}</td>
      <td><form method="post" action="/admin/action">${r.promoted_at && !r.contacted_at ? `<input type="hidden" name="id" value="${esc(r.id)}"><button name="act" value="told">Told them</button>` : `<input type="hidden" name="id" value="${esc(r.id)}">`}
      <button name="act" value="delete" onclick="return confirm('Delete ${esc(r.name).replace(/'/g, "")}? This frees their seat.')">Delete</button></form></td></tr>`).join("");
    return `<section id="${esc(s.id)}"><h2>${esc(s.title)}</h2>
      <p class="meta">${esc(fmtDate(s.starts_at))} · Room ${count("room", "confirmed")}/${s.room_capacity}${count("room", "waitlist") ? ` (+${count("room", "waitlist")} waitlist)` : ""} · Online ${count("online", "confirmed")}${s.online_capacity == null ? "" : "/" + s.online_capacity}${s.open ? "" : " · <strong>closed</strong>"}</p>
      ${needs.length ? `<p class="needs"><strong>Access needs:</strong> ${needs.map(r => esc(r.name) + " (" + esc(r.needs) + ")").join("; ")}</p>` : ""}
      ${mine.length ? `<div class="scroll"><table><thead><tr><th>Where</th><th>Status</th><th>Name</th><th>Contact</th><th>Needs</th><th>Pay</th><th>Note</th><th>Booked</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : "<p>No bookings yet.</p>"}
    </section>`;
  }).join("");

  return html(page("Registrations", `<p><a href="/admin/export.csv">Download everything as CSV</a> · Bookings are deleted automatically ${esc(env.RETENTION_DAYS || "90")} days after each session.</p>${blocks}`, true));
}

async function authorized(request, env) {
  const h = request.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return false;
  let pass = "";
  try { pass = atob(h.slice(6)).split(":").slice(1).join(":"); } catch { return false; }
  return timingSafeEqual(await sha256(pass), await sha256(env.ADMIN_PASSWORD));
}

/* ---------------- housekeeping ---------------- */

async function purge(env) {
  const days = parseInt(env.RETENTION_DAYS || "90", 10);
  const cutoff = new Date(Date.now() - days * 864e5).toISOString();
  // starts_at carries an offset, so compare as instants via julianday.
  await env.DB.prepare("DELETE FROM registrations WHERE session_id IN (SELECT id FROM sessions WHERE julianday(starts_at) < julianday(?))").bind(cutoff).run();
  await env.DB.prepare("DELETE FROM rate WHERE day < ?").bind(today()).run();
}

async function rateOk(request, env) {
  const ip = request.headers.get("cf-connecting-ip") || "local";
  const day = today();
  const key = await sha256(`${env.RATE_SALT || "zpc"}|${day}|${ip}`);
  const max = parseInt(env.RATE_PER_DAY || "10", 10);
  await env.DB.prepare("INSERT INTO rate (key, day, count) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET count = count + 1").bind(key, day).run();
  const r = await env.DB.prepare("SELECT count FROM rate WHERE key = ?").bind(key).first();
  return r.count <= max;
}

/* ---------------- helpers ---------------- */

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000"
};

function cors(request, env) {
  const origin = request.headers.get("origin");
  const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  if (!origin || !allowed.includes(origin)) return null;
  return { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", "Vary": "Origin" };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...SECURITY_HEADERS, ...(headers || {}) } });
}

function html(body, status = 200) {
  return new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'; script-src 'unsafe-inline'", ...SECURITY_HEADERS } });
}

function page(title, body, wide) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${esc(title)} · ZPC</title>
<style>body{margin:0;background:#f3f0e8;color:#121212;font:16px/1.5 system-ui,sans-serif}main{max-width:${wide ? "1100px" : "560px"};margin:0 auto;padding:32px 16px}
h1{font-size:28px;text-transform:uppercase;margin:0 0 16px}h1 b{background:#121212;color:#f3f0e8;padding:2px 8px;margin-right:8px;display:inline-block;transform:rotate(-4deg)}
h2{margin:32px 0 4px}button{font:inherit;font-weight:700;background:#ff6eb4;border:2px solid #121212;padding:10px 16px;cursor:pointer;min-height:44px}
td button{padding:4px 8px;min-height:32px;background:#fff;margin:2px}table{border-collapse:collapse;width:100%;background:#fff}th,td{border:1px solid #121212;padding:6px 8px;text-align:left;vertical-align:top;font-size:14px}
tr.waitlist td{background:#fff8d6}.scroll{overflow-x:auto}.small,.meta{font-size:13px;color:#444}mark{background:#d6f04a}.needs{background:#fff;border:2px solid #121212;padding:8px}</style></head>
<body><main><h1><b>ZPC</b>${esc(title)}</h1>${body}</main></body></html>`;
}

const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// Spreadsheet apps run cells starting with = + - @ as formulas; prefix a quote to stop that.
const csvCell = v => { let s = v == null ? "" : String(v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = iso => new Date(iso).toLocaleString("en-US", { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

function randomRef() {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", b = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(b, x => A[x % A.length]).join("");
}
function randomToken() {
  const b = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function sha256(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d), x => x.toString(16).padStart(2, "0")).join("");
}
function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
