from fastapi import APIRouter, HTTPException
from utils.pandascoreAPI import fetch_upcoming_matches

router = APIRouter()

STATIC_LEAGUE_IDS = [293, 294, 5347, 4197]

@router.get("/upcoming-matches")
def get_all_upcoming_matches():

    league_ids = STATIC_LEAGUE_IDS
    
    # Fetch matches for all leagues
    matches = fetch_upcoming_matches(league_ids)
    
    if not matches:
        raise HTTPException(
            status_code=404,
            detail="No upcoming matches found in major leagues"
        )
    
    return [
        {
            "id": match["id"],
            "scheduled_at": match["scheduled_at"],
            "league": {
                "id": match["league"]["id"],
                "abbreviation": get_league_abbreviation(match["league"]["id"])
            },
            "opponents": match["opponents"]
        }
        for match in matches
    ]

def get_league_abbreviation(league_id):
    # Map your known league IDs to abbreviations
    return {
        293: "LCK",
        294: "LPL",
        5347: "LTA",
        4197: "LEC"
    }.get(league_id, "UNK")