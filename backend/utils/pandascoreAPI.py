import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API Key
PANDASCORE_API_KEY = os.getenv("API_KEY")

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