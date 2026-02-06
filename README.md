🎯 Problem Statement:

Mental health deterioration often appears through subtle, sustained behavioral changes long before clinical diagnosis.
Existing systems depend heavily on self-reporting and delayed assessments, making early intervention difficult.

💡 Solution Overview:

This platform:

• Collects simple daily experience inputs

• Computes a risk score based on trends and persistence

• Visualizes risk level, trend, and contributing factors

• Avoids self-diagnosis or medical claims

• The system focuses on early risk detection, not treatment.

🧩 Core Features:

📊 Risk Dashboard:

• Current Risk Level

• Risk Score

• Persistence Days

• Stress Trend Visualization

📈 Trend Analysis:

• Daily stress vs personal baseline

• Detects sustained deviation, not single bad days

📉 Signal Breakdown:

• Focus difficulty

• Mental exhaustion

• Sleep disruption

• Workload

• Emotional friction

📝 Daily Check-In:

• Multi-step, human-friendly input

• No self-diagnosis required

🛠 Tech Stack:

Backend:

• FastAPI

• PostgreSQL

• Python

Frontend:

• React (Vite)

• Recharts

• Framer Motion

• CSS Grid / Flexbox

⚙️ Setup Instructions:

1️⃣ Backend Setup:

cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt


Set up .env with your PostgreSQL URL:

DATABASE_URL=postgresql://user:password@localhost:5432/mental_health


Run backend:

uvicorn backend.main:app --reload


Backend runs at:

http://127.0.0.1:8000

2️⃣ Seed Demo Data (Recommended)

python scripts/seed_demo_data.py


This populates realistic data for demo purposes.

3️⃣ Frontend Setup:

cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔗 API Endpoints (Key):

Method	 Endpoint	        Description

POST	/risk/daily-input	Submit daily check-in
GET	    /risk/status	    Current risk snapshot
GET	    /risk/history	    Historical trend data


🧠 Ethical Design Notes: 

• No medical diagnosis

• No mental health advice

• No personal identifiers

• Focused on decision support, not treatment

🎤 Demo Flow (Quick):

• Open Dashboard

• Explain Risk Level & Trend

• Show Signal Breakdown

• Open Daily Check-In

• Explain experience-based input

• Return to Dashboard

👥 Team:

This is completely build by NAVEENS K, JASWANT KARUN S A.

📌 SDG Alignment:

This project supports UN SDG 3 – Good Health & Well-Being by enabling early identification of mental health risk patterns, improving the potential for timely support and prevention.