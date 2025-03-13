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
