import requests, json
from eventbrite_token import EVENTBRITE_OAUTH_TOKEN

def fetch_one_matching_event(query="tech"):
    url = "https://www.eventbriteapi.com/v3/events/search/"
    params = {
        "q": query,
        "page_size": 1,
        "token": EVENTBRITE_OAUTH_TOKEN
    }
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    evs = resp.json().get("events", [])
    return evs[0] if evs else None

if __name__ == "__main__":
    ev = fetch_one_matching_event("nyc")
    if ev:
        print(json.dumps(ev, indent=2))
    else:
        print("No events found.")
