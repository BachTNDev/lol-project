import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load your dataset (replace with actual data)
data = pd.read_csv("historical_matches.csv")  

# Feature selection (modify based on available features)
features = ["team1_winrate", "team2_winrate", "team1_avg_kills", "team2_avg_kills"]
X = data[features]
y = data["winner"]  # 0 = Team 1 wins, 1 = Team 2 wins

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save the trained model
joblib.dump(model, "match_prediction_model.pkl")
print("Model saved as match_prediction_model.pkl")
