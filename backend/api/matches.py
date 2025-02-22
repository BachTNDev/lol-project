from fastapi import APIRouter, HTTPException
from utils.pandascoreAPI import fetch_upcoming_lck_match

router = APIRouter()

@router.get("/upcoming-lck-match")
def get_upcoming_lck_match():
    match = fetch_upcoming_lck_match()
    
    if not match:
        raise HTTPException(
            status_code=404,
            detail="No upcoming LCK matches found"
        )
    
    # Format the response
    return {
        "id": match["id"],
        "scheduled_at": match["scheduled_at"],
        "best_of": match["number_of_games"],
        "league": match["league"]["name"],
        "teams": [
            {
                "name": opponent["opponent"]["name"],
                "image_url": opponent["opponent"]["image_url"]
            }
            for opponent in match["opponents"]
        ]
    }