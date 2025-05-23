# etl.py

import json
import sqlite3      # swap for psycopg2 or sqlalchemy for Postgres
from playwright.sync_api import sync_playwright

DB_PATH = "events.db"  # or "postgresql://user:pass@host/dbname"
SCRAPE_URL = "https://www.eventbrite.com/d/ny--new-york/all-events/"

def scrape_eventbrite_xhr() -> list[dict]:
    """Extract: launch browser, capture XHR JSON, return list of payloads."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        collected = []

        def capture(response):
            if "api/v3/destination/events" in response.url and response.status == 200:
                try:
                    collected.append(response.json())
                except:
                    pass

        page.on("response", capture)
        page.goto(SCRAPE_URL)
        page.wait_for_timeout(5000)
        browser.close()
    # Each payload has a top-level "events" array; flatten them
    events = []
    for payload in collected:
        events.extend(payload.get("events", []))
    return events

def transform(events: list[dict]) -> list[tuple]:
    """Transform: pick fields and normalize into tuples for SQL insert."""
    rows = []
    for e in events:
        # guard against missing fields
        vid = e.get("id")
        name = e.get("name") or ""
        start = e.get("start_date"), e.get("start_time")
        end   = e.get("end_date"),   e.get("end_time")
        url   = e.get("url")
        venue = e.get("primary_venue", {}).get("address", {}).get("localized_address_display")
        # price: some events may have no tickets or free
        ta = e.get("ticket_availability", {})
        minp = ta.get("minimum_ticket_price", {}).get("value") or 0
        maxp = ta.get("maximum_ticket_price", {}).get("value") or 0
        free = ta.get("is_free", False)
        rows.append((
            vid,
            name,
            start[0],
            start[1],
            end[0],
            end[1],
            url,
            venue,
            minp,
            maxp,
            int(free),
        ))
    return rows

def load(rows: list[tuple]):
    """Load: create table if needed, then upsert each row into SQLite."""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            name TEXT,
            start_date TEXT,
            start_time TEXT,
            end_date TEXT,
            end_time TEXT,
            url TEXT,
            venue TEXT,
            min_price INTEGER,
            max_price INTEGER,
            is_free INTEGER
        )
    """)
    # upsert each row
    for r in rows:
        cur.execute("""
            INSERT INTO events (
                id, name, start_date, start_time,
                end_date, end_time, url, venue,
                min_price, max_price, is_free
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                start_date=excluded.start_date,
                start_time=excluded.start_time,
                end_date=excluded.end_date,
                end_time=excluded.end_time,
                url=excluded.url,
                venue=excluded.venue,
                min_price=excluded.min_price,
                max_price=excluded.max_price,
                is_free=excluded.is_free
        """, r)
    conn.commit()
    conn.close()

def main():
    print(" Extracting events…")
    raw = scrape_eventbrite_xhr()
    print(f"  → {len(raw)} raw events")
    print(" Transforming…")
    rows = transform(raw)
    print(f"  → {len(rows)} rows ready")
    print(" Loading into database…")
    load(rows)
    print(" ETL complete.")
    conn = sqlite3.connect("events.db")
    cur = conn.cursor()

    cur.execute("SELECT name, start_date, url FROM events LIMIT 5")
    for row in cur.fetchall():
        print(row)

    conn.close()

if __name__ == "__main__":
    main()
