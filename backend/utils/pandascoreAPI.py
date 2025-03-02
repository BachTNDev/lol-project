import requests
import os
import json
from dotenv import load_dotenv
from datetime import datetime, timezone 
import redis

load_dotenv()
PANDASCORE_API_KEY = os.getenv("PANDASCORE_API_KEY")
BASE_URL = "https://api.pandascore.co/lol"

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def fetch_upcoming_matches(league_ids):
    """Fetch all upcoming matches for specified leagues."""
    # Generate a cache key based on the sorted league IDs
    league_ids_sorted = sorted([str(l) for l in league_ids])
    cache_key = "upcoming_matches_" + "_".join(league_ids_sorted)
    
    # Check if cached data exists
    cached = redis_client.get(cache_key)
    if cached:
        print("Returning cached upcoming matches")
        return json.loads(cached)
    
    all_matches = []
    headers = {"Authorization": f"Bearer {PANDASCORE_API_KEY}"}
    current_time = datetime.now(timezone.utc)

    for league_id in league_ids:
        url = f"{BASE_URL}/matches/upcoming"
        params = {
            "filter[league_id]": league_id,
            "sort": "scheduled_at",
            "filter[status]": "not_started"  # Only get upcoming matches
        }

        try:
            # First request
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            matches = response.json()

            # Handle pagination if needed
            while "next" in response.links:
                next_url = response.links["next"]["url"]
                response = requests.get(next_url, headers=headers)
                response.raise_for_status()
                matches.extend(response.json())

            # Filter matches by time (in case API returns past matches)
            valid_matches = [
                m for m in matches
                if datetime.fromisoformat(m["scheduled_at"].replace('Z', '+00:00')) > current_time
            ]

            all_matches.extend(valid_matches)
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching matches for league {league_id}: {e}")
            continue
        
    if all_matches:
        # Cache the result for 1 hour (3600 seconds)
        redis_client.setex(cache_key, 3600, json.dumps(all_matches))
        print("Caching upcoming matches result")
        return all_matches
            
    return all_matches if all_matches else None