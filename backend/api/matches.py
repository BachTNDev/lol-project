from fastapi import APIRouter, HTTPException
from utils.pandascoreAPI import fetch_active_leagues,  fetch_upcoming_matches

router = APIRouter()

@router.get("/active-leagues")
def get_active_leagues():
    leagues = fetch_active_leagues()
    
    if leagues is None:
        raise HTTPException(status_code=500, detail="Failed to fetch active leagues")

    return leagues

@router.get("/upcoming-matches")
def get_all_upcoming_matches():
    # First get active leagues
    leagues = fetch_active_leagues()
    
    if not leagues:
        raise HTTPException(
            status_code=404, 
            detail="No active leagues found"
        )
    
    # Extract league IDs
    league_ids = [league["id"] for league in leagues]
    
    # Fetch matches for all leagues
    matches = fetch_upcoming_matches(league_ids)
    
    if not matches:
        raise HTTPException(
            status_code=404,
            detail="No upcoming matches found in major leagues"
        )
    
    return matches