import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load from backend/.env

BASE_URL = "https://api.pandascore.co/lol"
API_KEY = os.getenv("PANDASCORE_API_KEY")  # Match .env variable name

def fetch_upcoming_lck_match():
    url = f"{BASE_URL}/matches/upcoming"
    headers = {"Authorization": f"Bearer {API_KEY}"}
    
    # Specific parameters for LCK match
    params = {
        "filter[league_slug]": "lck",  # Only LCK matches
        "sort": "scheduled_at",         # Get earliest first
        "per_page": 1,                  # Only get 1 match
        "filter[videogame]": "lol"       # Ensure LoL matches
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        matches = response.json()
        
        if matches:
            return matches[0]  # Return first match only
        return None
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching LCK match: {e}")
        return None