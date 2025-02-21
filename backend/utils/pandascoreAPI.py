import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API Key
PANDASCORE_API_KEY = os.getenv("ryM4JJYOq7Kb-seT5EDhyYi27o0hMJGFQDtqPw8L0vk72m7iQac")

# Base URL for PandaScore API
BASE_URL = "https://api.pandascore.co/lol"


def fetch_upcoming_matches():
    """Fetch upcoming League of Legends matches from PandaScore."""
    url = f"{BASE_URL}/matches/upcoming"
    headers = {"Authorization": f"Bearer {PANDASCORE_API_KEY}"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return None