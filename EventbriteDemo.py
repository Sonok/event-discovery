import requests
from eventbrite_token import EVENTBRITE_OAUTH_TOKEN

BASE_URL = "https://www.eventbriteapi.com/v3"
headers = {
    "Authorization": f"Bearer {EVENTBRITE_OAUTH_TOKEN}"
}

def get_user_details():
    url = f"{BASE_URL}/users/me/"
    response = requests.get(url, headers=headers)
    return response.json()

if __name__ == "__main__":
    user = get_user_details()
    print("Hello,", user.get("name", "Unknown User"))