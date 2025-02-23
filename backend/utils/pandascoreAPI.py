import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()
PANDASCORE_API_KEY = os.getenv("PANDASCORE_API_KEY")
BASE_URL = "https://api.pandascore.co/lol"

def fetch_active_leagues():
    """Fetch only active major League of Legends leagues (LCK, LPL, LEC, LTA)."""
    headers = {"Authorization": f"Bearer {PANDASCORE_API_KEY}"}

    response = requests.get(BASE_URL+"/leagues?filter[name]=LCK,LPL,LEC,LTA,LTA South,LTA North", headers=headers)

    if response.status_code != 200:
        print(f"Error fetching leagues: {response.status_code} - {response.text}")
        return None

    leagues = response.json()
    active_leagues = []
    
    # Get current UTC time
    now = datetime.now(timezone.utc)

    for league in leagues:
        if "series" in league and league["series"]:
            # Sort series by latest `begin_at` date
            sorted_series = sorted(
                league["series"], key=lambda s: s["begin_at"], reverse=True
            )
            latest_season = sorted_series[0]

            # Convert `end_at` to a timezone-aware datetime
            end_date = latest_season["end_at"]
            if end_date:
                end_date_dt = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)

                if end_date_dt > now:
                    active_leagues.append({
                        "id": league["id"],
                        "name": league["name"],
                        "image_url": league["image_url"],
                        "latest_season": latest_season["full_name"],
                        "season_id": latest_season["id"],
                        "season_start": latest_season["begin_at"],
                        "season_end": latest_season["end_at"]
                    })

    return active_leagues if active_leagues else None

def fetch_upcoming_matches(league_ids):
    """Fetch all upcoming matches for specified leagues."""
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
            
    return all_matches if all_matches else None