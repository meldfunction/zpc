-- Workshop sessions people can book. One row per workshop date.
CREATE TABLE sessions (
  id              TEXT PRIMARY KEY,           -- matches the site: "ws-" + workshop number, e.g. ws-1
  title           TEXT NOT NULL,
  starts_at       TEXT NOT NULL,              -- ISO 8601 with offset, e.g. 2026-10-02T18:30:00-04:00
  room_capacity   INTEGER NOT NULL DEFAULT 20,
  online_capacity INTEGER,                    -- NULL = no limit
  open            INTEGER NOT NULL DEFAULT 1  -- 0 = closed to new bookings
);

-- Seat requests. Kept for RETENTION_DAYS after the session, then deleted by the daily cron.
CREATE TABLE registrations (
  id           TEXT PRIMARY KEY,              -- short public reference shown to the person
  session_id   TEXT NOT NULL REFERENCES sessions(id),
  mode         TEXT NOT NULL CHECK (mode IN ('room', 'online')),
  status       TEXT NOT NULL CHECK (status IN ('confirmed', 'waitlist', 'cancelled')),
  name         TEXT NOT NULL,
  contact      TEXT NOT NULL,                 -- email or Signal, whatever they gave
  pay          TEXT,                          -- pay-what-you-can pledge, informational only
  needs        TEXT,                          -- access needs, comma separated
  note         TEXT,
  cancel_hash  TEXT NOT NULL,                 -- SHA-256 of the private cancel token; the token itself is never stored
  created_at   TEXT NOT NULL,
  promoted_at  TEXT,                          -- set when moved from waitlist to confirmed; organizers should tell them
  contacted_at TEXT                           -- organizers mark this after telling a promoted person
);
CREATE INDEX reg_session ON registrations (session_id, mode, status, created_at);

-- Abuse limit: salted hash of IP + day, never the IP itself. Rows older than today are deleted daily.
CREATE TABLE rate (
  key   TEXT PRIMARY KEY,
  day   TEXT NOT NULL,
  count INTEGER NOT NULL
);
