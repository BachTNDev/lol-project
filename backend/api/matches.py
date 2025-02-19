# backend/api/matches.py
from fastapi import APIRouter, HTTPException
from utils.riotAPI import get_upcoming_matches

router = APIRouter()

@router.get("/upcoming")
async def upcoming_matches():
    """
    Retrieve upcoming professional League of Legends matches.
    """
    try:
        matches = get_upcoming_matches()
        return {"matches": matches}
    except Exception as e:
        # You might want to log the error in a real app
        raise HTTPException(status_code=500, detail="Failed to fetch upcoming matches") from e
