# Eventbrite ETL Pipeline

I’m building a **containerized ETL pipeline** in Python that uses the **Eventbrite API** to extract event data, transform it, and load it into a **SQL database**.

It's structured as a **microservice** and can be run as a **CLI tool** or scheduled for regular ingestion (e.g. via cron or container orchestration tools).

## Features

- Uses the Eventbrite API
- ETL pipeline: Extract → Transform → Load
- Dockerized for portability
- Supports local SQLite or external SQL databases
- Easy to extend with a FastAPI backend (coming soon)

## Getting Started

```bash
docker-compose up

##  Async Python — Something Worth Looking Into

As the project grows, it might be worth exploring **asynchronous programming** (aka `async`/`await`) for improved performance, especially in data extraction and network-bound tasks like scraping or calling APIs.

###  What It Is

Async Python allows you to **run multiple tasks concurrently** — not in parallel like threads, but via **non-blocking I/O**.  
It's perfect for situations where you're mostly **waiting on external systems** (like HTTP requests), and want to do more with that idle time.

---

###  Why It Might Be Useful for This Project

Right now, we’re scraping data from Eventbrite using Playwright and saving JSON. Later, as this scales:

- We might want to **scrape multiple cities** or categories in one run
- We could call **multiple APIs (e.g. Eventbrite + Ticketmaster + Meetup)**
- We might want to **ETL 100s of records in real-time**, not sequentially
- If we build a backend API, **FastAPI is async-native**

---

###  Pros

-  **Much faster** when making many HTTP calls (e.g. `aiohttp`, `httpx`)
-  Can process **multiple events/pages in parallel**
- Pairs perfectly with async-capable APIs and browsers
-  Avoids the complexity of multithreading

---

###  Cons

-  Slightly steeper learning curve (`async def`, `await`, `asyncio`)
-  Doesn't help CPU-bound tasks (use multiprocessing instead)
-  Harder to debug if you’re not used to event loops

---

###  Things to Explore

- [ ] Convert current Playwright sync scraper to `async_playwright`
- [ ] Try `aiohttp` or `httpx` for making API calls (instead of `requests`)
- [ ] Use `asyncio.gather()` to scrape multiple URLs concurrently
- [ ] Benchmark sync vs async scraping speed
- [ ] Consider FastAPI (async-native) if an API endpoint is added later

---

###  References

- [`asyncio` official docs](https://docs.python.org/3/library/asyncio.html)
- [`aiohttp`](https://docs.aiohttp.org/en/stable/) — async requests
- [`httpx`](https://www.python-httpx.org/) — requests-like async lib
- [`FastAPI`](https://fastapi.tiangolo.com/) — fast, async-ready API framework
- [`Playwright async API`](https://playwright.dev/python/docs/intro#async-api)

---

 **Bottom line**: not critical right now, but if we ever need to speed up scraping or add real-time backend logic, async could seriously boost performance without adding much overhead.

## Note for Future: Replace SQLite with PostgreSQL (When Ready)

### Why Switch to PostgreSQL Later?

SQLite is perfect for:
- Local development
- Prototyping
- Quick scripts or single-user pipelines

But when this project grows (e.g., deployed web app, concurrent access, large datasets), **PostgreSQL is the smarter long-term solution**.

### Benefits of PostgreSQL
- Supports **concurrent reads/writes** (vs. SQLite's write-locking)
- Easy to deploy with **Heroku, Railway, Supabase, AWS RDS**
- Strong support for:
  - JSONB columns
  - Full-text search
  - Complex queries, joins, indexing
  - Multiple schemas, roles, and permissions
- Robust tooling and community

---

### When to Patch

Switch to Postgres when:
- You deploy to a backend (FastAPI, Django, etc.)
- You want to support concurrent queries (multi-user)
- You’re adding user accounts, dashboards, or analytics
- You’re storing **more than a few thousand records** reliably
- You need features like filtering, search, or custom SQL reports
- See changes

---


