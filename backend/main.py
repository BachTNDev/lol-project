from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # <-- Add this import
from pydantic import BaseModel
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (use specific URL in production for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Train a simple example model
model = RandomForestClassifier()
model.fit([[1, 2], [3, 4]], [0, 1])  # Dummy training data for demonstration

# Define request schema
class CustomerData(BaseModel):
    feature1: float
    feature2: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the Customer Churn Prediction API!"}

@app.get("/favicon.ico")
async def favicon():
    return {"message": "No favicon here!"}

@app.post("/predict")
def predict(data: CustomerData):
    # Convert input to numpy array
    X = np.array([[data.feature1, data.feature2]])
    # Make a prediction
    prediction = model.predict(X)
    return {"prediction": int(prediction[0])}
