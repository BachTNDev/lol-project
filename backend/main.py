from fastapi import FastAPI
from api.matches import router as matches_router

app = FastAPI()

# Include the router
app.include_router(matches_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to ProMatch Analyzer API"}