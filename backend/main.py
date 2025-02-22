from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.matches import router as matches_router

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(matches_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to ProMatch Analyzer API"}