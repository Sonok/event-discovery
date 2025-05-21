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
