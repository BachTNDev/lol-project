from fastapi import FastAPI
from api.matches import router as matches_router

app = FastAPI()

# Register API routes
app.include_router(matches_router, prefix="/api", tags=["matches"])

@app.get("/")
def root():
    return {"message": "FastAPI Backend is Running"}
