from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.matches import router as matches_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(matches_router, prefix="/api", tags=["matches"])

@app.get("/")
def root():
    return {"message": "FastAPI Backend is Running"}
