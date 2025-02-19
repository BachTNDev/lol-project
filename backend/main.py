# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import matches  # Import the router from api/matches.py

app = FastAPI(title="ProMatch Analyzer API")

# Enable CORS for all origins (modify for production use)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include match-related routes under a common prefix
app.include_router(matches.router, prefix="/matches", tags=["matches"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the ProMatch Analyzer API!"}
