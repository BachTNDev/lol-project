from fastapi import APIRouter, HTTPException
from utils.pandascoreAPI import fetch_upcoming_matches

router = APIRouter()

@router.get("/upcoming-matches")
def get_upcoming_matches():
    matches = fetch_upcoming_matches()
    
    if matches is None:
        raise HTTPException(status_code=500, detail="Failed to fetch upcoming matches")

    return matches