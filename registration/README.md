# Workshop registration (Cloudflare Worker + D1)

ZPC's own booking service. No Pretix and no server to maintain: one Cloudflare Worker and one D1 (SQLite) database, both on Cloudflare's free tier at this size.

**What it does**
- Seat limits per session: 20 in the room, online unlimited by default (both adjustable per session).
- Waitlist: when the room is full, people join a waitlist. When someone cancels, the next person moves up automatically.
- Private cancel link for each person. It opens a confirm page, so link previews in chat apps can't cancel by accident.
- Organizer page (`/admin`, password protected): who's coming, access needs (ASL, childcare), pay-what-you-can pledges, CSV export, delete. People who moved up from the waitlist are flagged "moved up: tell them" until someone clicks **Told them**.
- Deletes every booking **90 days after its session**, daily, to match the privacy policy.
- Abuse limit: 10 bookings per connection per day, counted with a salted daily hash. **No IP addresses are stored.** Cancel tokens are stored only as hashes.
- Nothing is sent to any third party.

**What it doesn't do (yet)**
- **Send email.** The confirmation and cancel link appear on screen after booking. Organizers send the online link and reminders. Email could be added later with any sending service.
- **Take payments.** Pay-what-you-can is a pledge, shown to organizers.

**Until it's deployed, nothing changes on the site**: `ZPC_REG_API` in `index.html` is empty, so the booking form keeps opening an email.

## Files

```
src/index.js                     the Worker (API, cancel pages, organizer page, daily cleanup)
migrations/0001_init.sql         tables
migrations/0002_fall_2026.sql    the five fall sessions (ws-1 … ws-5, matching zpc-data.js)
test/run.mjs                     20 end-to-end tests against a local Worker + local database
wrangler.toml                    config (allowed sites, retention, cron)
```

## Test locally

```bash
cd registration
npm install
npm test          # 20 tests, local only, never touches Cloudflare
npm run dev       # local Worker at http://localhost:8787 (admin password: see .dev.vars)
```

`.dev.vars` (git-ignored) holds local-only secrets:
```
ADMIN_PASSWORD=local-test-password
RATE_SALT=local-test-salt
```

## Deploy (one time, about 10 minutes)

You need a Cloudflare account. Either run `npx wrangler login`, or create an API token (**My Profile → API Tokens → "Edit Cloudflare Workers"** template, plus **D1 Edit**) and `export CLOUDFLARE_API_TOKEN=…`.

```bash
cd registration
npm install

# 1. Create the database. --location enam keeps it in eastern North America.
npx wrangler d1 create zpc-registration --location enam
#    Copy the database_id it prints into wrangler.toml.

# 2. Create the tables and the fall sessions.
npx wrangler d1 migrations apply zpc-registration --remote

# 3. Secrets. Pick a strong organizer password; RATE_SALT is any long random string.
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put RATE_SALT

# 4. Deploy. It prints the address, e.g. https://zpc-registration.<account>.workers.dev
npx wrangler deploy
```

Then:
1. In `index.html`, set `const ZPC_REG_API = "https://zpc-registration.<account>.workers.dev";`, commit, and push. The booking form now saves seats directly and shows seats left.
2. If the site moves to its own domain, add it to `ALLOWED_ORIGINS` in `wrangler.toml` and run `npx wrangler deploy` again.
3. Update `privacy.html`: bookings are now stored in a Cloudflare D1 database (eastern North America), and deleted 90 days after the session.
4. Optional: put the organizer page behind **Cloudflare Access** (Zero Trust → Access → add an application for `/admin*`) for a second lock in front of the password.

## Running it

- **Who's coming:** open `https://<worker>/admin` and log in with any username and the `ADMIN_PASSWORD`.
- **New session:** add a migration, for example `migrations/0003_winter_2027.sql` with `INSERT INTO sessions …`, then run `npx wrangler d1 migrations apply zpc-registration --remote`. Use ids `ws-<n>` that match the workshop numbers in `zpc-data.js`.
- **Change capacity or close a session:**
  `npx wrangler d1 execute zpc-registration --remote --command "UPDATE sessions SET room_capacity = 25 WHERE id = 'ws-3'"`
  Use `SET open = 0` to close a session.
- **Someone moved up from the waitlist:** the organizer page flags them. Tell them, then click **Told them**.

## Cost

Free tier covers it comfortably: Workers allow 100,000 requests a day, and D1 gives 5 GB of storage and millions of row reads a day. A five-workshop series with a few hundred bookings uses a tiny fraction of that.
