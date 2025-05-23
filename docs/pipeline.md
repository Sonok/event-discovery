# Eventbrite ETL Pipeline

This project is a **containerized ETL pipeline** written in Python. It uses **Playwright** to extract event data from the Eventbrite website (via browser-level XHR capture), transforms that data into a structured schema, and loads it into a **SQL database** (SQLite for development, PostgreSQL for production).

The ETL is built as a **microservice**, and can be run as a CLI tool, scheduled via cron, or deployed as part of a larger backend service (e.g., FastAPI).

---

## Features

- Extracts live event data from Eventbrite via browser-based scraping  
- ETL pattern: **Extract → Transform → Load**  
- Dockerized for container-based deployment  
- Supports **SQLite** (local) and **PostgreSQL** (scalable production)  
- Coordinates and tags are stored for user-event matching  
- Future-ready for **async scraping**, multi-city ingestion, and recommender systems  

---

## Getting Started

### Option 1: Run with Docker

```bash
docker-compose up --build
```

### Option 2: Run Locally (with virtual environment)

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python eventbrite_etl.py
```

---

## Async Python — Something Worth Looking Into

As the project grows in scope, consider converting it to **asynchronous Python** using `async def`, `await`, and `asyncio`.

### What It Is

Async Python allows you to run multiple I/O-bound tasks concurrently without threads. It’s ideal for:

- Waiting on external APIs  
- Scraping multiple cities/pages  
- Reducing bottlenecks from network latency  

### Why It Might Be Useful Here

- Scrape multiple Eventbrite cities in parallel  
- Call multiple APIs (Eventbrite + Meetup + Ticketmaster)  
- Handle large data volumes efficiently  
- FastAPI (planned backend) is **async-native**  

### Pros

- Concurrent scraping of many cities/pages  
- Faster API calls via `aiohttp`, `httpx`  
- Cleaner than threads or subprocesses  

### Cons

- Requires understanding `async`/`await`/`event loops`  
- Doesn’t help CPU-bound work  
- Slightly harder to debug if unfamiliar  

### Async To-Do

- [ ] Convert Playwright scraper to `async_playwright`  
- [ ] Replace `requests` with `httpx` or `aiohttp`  
- [ ] Use `asyncio.gather()` for batch scraping  
- [ ] Benchmark async vs sync performance  
- [ ] Use FastAPI to expose scraping and recommendation endpoints  

### References

- [asyncio docs](https://docs.python.org/3/library/asyncio.html)  
- [aiohttp](https://docs.aiohttp.org/en/stable/)  
- [httpx](https://www.python-httpx.org/)  
- [FastAPI](https://fastapi.tiangolo.com/)  
- [Playwright async API](https://playwright.dev/python/docs/intro#async-api)  

**Bottom line**: Async isn’t needed *yet*, but it’s a powerful upgrade path for scaling up.

---

## Replace SQLite with PostgreSQL (When Ready)

SQLite is ideal for:

- Local testing  
- Development and prototyping  
- Single-user CLI tools  

But when deploying to a web backend or scaling to larger workloads, switch to **PostgreSQL**.

### Benefits of PostgreSQL

- Concurrent reads/writes (vs. SQLite locking)  
- JSONB support, full-text search, indexing, schemas  
- Better support for concurrent FastAPI or Django apps  
- Plays well with cloud platforms like:
  - Heroku  
  - Supabase  
  - Railway  
  - AWS RDS  

### When to Switch

- Web backend (FastAPI, Django)  
- Multi-user access or dashboards  
- > 10K+ rows of data  
- Need for advanced querying and filtering  
- Integrating search, geolocation, or analytics  

### Migration Plan

Replace:

```python
import sqlite3
conn = sqlite3.connect("events.db")
```

With:

```python
import psycopg2
conn = psycopg2.connect("dbname=events user=postgres password=secret")
```

Or with SQLAlchemy:

```python
from sqlalchemy import create_engine
engine = create_engine("postgresql://user:pass@host:5432/events")
```

Be sure to update schema types:

- `TEXT` → `VARCHAR`  
- `INTEGER` → `NUMERIC`  
- Add `TIMESTAMPTZ`, `JSONB`, `BOOLEAN` where appropriate  

---

## Location-Aware Event Matching

Long-term, the system will support matching users to events using **location + interests**.

### How It Works

1. Store user coordinates (lat/lon)  
2. Store event venue coordinates  
3. Use the **Haversine formula** to compute distance  
4. Combine with cosine similarity on tag vectors  
5. Score = `cosine_similarity × location_decay`  

### Location Matching Formula

```python
from math import radians, sin, cos, sqrt, atan2

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c
```

---

## Dynamic City-Based Scraping

Rather than hard-coding:

```python
SCRAPE_URL = "https://www.eventbrite.com/d/ny--new-york/all-events/"
```

Generate URLs dynamically based on user coordinates:

```python
def reverse_geocode(lat, lon):
    # Use Nominatim or Google Maps API to get (city, country)
    return "Toronto", "Canada"

def generate_scrape_url(city, country):
    return f"https://www.eventbrite.com/d/{country.lower()}--{city.lower().replace(' ', '-')}/all-events/"
```

You can now support:

- Toronto → `/d/canada--toronto/all-events/`  
- London → `/d/united-kingdom--london/all-events/`  
- Sydney → `/d/australia--sydney/all-events/`  

---

## Roadmap

- [x] Playwright-based Eventbrite XHR scraper  
- [x] SQL schema for events with tags and coordinates  
- [x] `.gitignore` for secrets and `venv/`  
- [ ] Add `.env` support for API tokens  
- [ ] User profile table with interests  
- [ ] Cosine similarity-based event matching  
- [ ] Haversine scoring for local relevance  
- [ ] Batch scrape multiple cities  
- [ ] FastAPI endpoint: `/events` and `/recommendations`  
- [ ] Async scraping with `asyncio` and `async_playwright`  
- [ ] PostgreSQL deployment with Heroku/Supabase  

---

**This document evolves with the project. Update it as architecture, deployment, or scale needs change.**
