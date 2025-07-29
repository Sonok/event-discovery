# test_location_playwright.py

import requests
from playwright.sync_api import sync_playwright
import time

def reverse_geocode(lat, lon):
    """Use Nominatim to get (city, country) from coords."""
    url = "https://nominatim.openstreetmap.org/reverse"
    params = {"lat": lat, "lon": lon, "format": "json"}
    headers = {"User-Agent": "LocationTester/1.0"}
    r = requests.get(url, params=params, headers=headers, timeout=5)
    r.raise_for_status()
    addr = r.json().get("address", {})
    city = addr.get("city") or addr.get("town") or addr.get("village") or "Unknown"
    country = addr.get("country") or "Unknown"
    return city, country

def generate_scrape_url(city, country):
    """Create the Eventbrite URL from city & country."""
    city_slug = city.lower().replace(" ", "-")
    country_slug = country.lower().replace(" ", "-")
    return f"https://www.eventbrite.com/d/{country_slug}--{city_slug}/all-events/"

def test_with_playwright(url):
    """Open the URL in Playwright, capture XHR events, and return count."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        events_count = None

        def capture(response):
            if "api/v3/destination/events" in response.url and response.status == 200:
                data = response.json()
                events_count = len(data.get("events", []))
                print(f"    📦 Captured {events_count} events from XHR")
        
        page.on("response", capture)
        page.goto(url, wait_until="networkidle")
        # give it a moment for XHRs
        time.sleep(3)
        browser.close()

def main():
    sample_coords = [
        (40.7128, -74.0060),   # NYC
        (51.5074, -0.1278),    # London
        (35.6895, 139.6917),   # Tokyo
    ]

    for lat, lon in sample_coords:
        print(f"\n🌐 Coords: {lat:.4f}, {lon:.4f}")
        try:
            city, country = reverse_geocode(lat, lon)
            url = generate_scrape_url(city, country)
            print(f"  ↳ Location: {city}, {country}")
            print(f"  ↳ Checking URL: {url}")
            resp = requests.get(url, timeout=5)
            print(f"  ↳ HTTP status: {resp.status_code}")
            if resp.status_code == 200:
                print("  ↳ Opening in Playwright…")
                test_with_playwright(url)
            else:
                print("  ❌ Skipping Playwright (non-200)")
        except Exception as e:
            print(f"  ❌ Error: {e}")

if __name__ == "__main__":
    main()
