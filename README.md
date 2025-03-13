# ProMatch Analyzer 🎮📊  

ProMatch Analyzer is a League of Legends **pro match analysis tool** that provides **match predictions** based on historical data and machine learning models. It fetches upcoming matches from the **PandaScore API**, processes data using **FastAPI**, and predicts match outcomes using **scikit-learn models with Redis caching** for efficiency.  

---

## 🚀 Features  
- 🏆 **Fetch upcoming matches** from major leagues (**LCK, LPL, LEC, LTA**).  
- 🤖 **Predict match winners** using a trained machine learning model.  
- ⚡ **Redis caching** to optimize API calls and reduce redundant predictions.  
- 🎯 **User-friendly frontend** with Next.js, Tailwind CSS, and TypeScript.  

---

## 🛠️ Tech Stack  
### **Backend (FastAPI)**  
- **FastAPI** → For handling API requests.  
- **Redis** → For caching match predictions.  
- **Scikit-learn** → For training & serving ML models.  
- **PandaScore API** → For fetching match data.  

### **Frontend (Next.js)**  
- **Next.js (App Router)** → For UI.  
- **TypeScript** → Ensuring type safety.  
- **Tailwind CSS** → For styling.  

---

## 📥 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/yourusername/promatch-analyzer.git
cd promatch-analyzer
```

### 2️⃣ Set Up Backend (FastAPI)

### Install dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Set Up Environment Variables
Create a `.env` file inside `/backend/` and add:
```ini
PANDASCORE_API_KEY=your_api_key_here
```

### Start Redis (If Not Running)
```bash
sudo service redis-server start
```

### Run FastAPI Server
```bash
uvicorn main:app --reload
```
✅ The backend is now running at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## 3️⃣ Set Up Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
✅ The frontend is now running at [http://localhost:3000/](http://localhost:3000/)

---

## 🔥 API Endpoints

### 1️⃣ Fetch Upcoming Matches
**GET** `/api/upcoming-matches`

#### Response Example
```json
[
  {
    "id": 12345,
    "scheduled_at": "2024-06-15T12:00:00Z",
    "league": { "id": 293, "abbreviation": "LCK" },
    "opponents": [
      { "opponent": { "name": "Team A", "image_url": "https://..." } },
      { "opponent": { "name": "Team B", "image_url": "https://..." } }
    ]
  }
]
```

### 2️⃣ Get Match Prediction
**GET** `/api/predictions?matchId=<match_id>`

#### Response Example
```json
{
  "match_id": 12345,
  "prediction": "Team A Wins"
}
```
📌 Redis caches predictions for 1 hour to reduce API calls.

---

## 📊 Machine Learning Model
- Uses `RandomForestClassifier` trained on historical match data.
- Extracts features like **team winrate, player stats, objectives taken, and kills**.
- Predictions are **precomputed & cached in Redis** for efficiency.

### Train the Model
```bash
cd backend/ml
python train_model.py
```
This saves the model as `match_prediction_model.pkl`.

---

## 🎨 Frontend Features
- **Search & filter upcoming matches.**
- **Click a match** to get **real-time predictions**.
- **Responsive UI** using Tailwind CSS.

---

## 🛠️ Contributing
1. **Fork the repo**
2. **Create a feature branch** (`git checkout -b feature-xyz`)
3. **Commit changes** (`git commit -m "Added XYZ feature"`)
4. **Push to your fork** (`git push origin feature-xyz`)
5. **Submit a PR for review**

---

## 📝 To-Do List
✅ Implement match predictions  
✅ Cache results using Redis  
🟡 Improve prediction model with more features  
🟡 Add database for storing match history  
🟡 Deploy backend & frontend  

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🌟 Credits
Built by **[Your Name]** as a portfolio project for **data science & analytics** in esports.

---

## 🚀 Stay Updated
📢 Follow for updates!  
📧 Contact: `your.email@example.com`
