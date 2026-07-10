# PathFinder AI

**Your Personal AI Career Counselor**

PathFinder AI is an AI-powered career counseling web application that helps students in Classes 9–12 — particularly those from rural and underserved communities — make informed academic and career decisions through a structured Career Discovery Session and a personalized Career Report.

---

## Tech Stack

| Layer    | Technology                              | Deployment          |
|----------|-----------------------------------------|---------------------|
| Frontend | React 18 · Vite · Tailwind CSS          | Vercel              |
| Backend  | FastAPI · Python · Pydantic · Uvicorn   | Render              |
| AI       | IBM watsonx.ai · Llama 3.3 70B Instruct | IBM Cloud           |

---

## Project Structure

```
pathfinder-ai/
├── frontend/          # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/   # reusable UI components
│       ├── context/      # React Context (app-wide state)
│       ├── hooks/        # custom hooks
│       ├── layout/       # Navbar, Footer
│       ├── pages/        # route-level pages
│       │   ├── LandingPage/
│       │   ├── Assessment/
│       │   │   └── questions.js   # complete question bank
│       │   ├── Analysis/
│       │   └── Report/
│       │       └── components/    # report-specific cards
│       ├── services/     # API calls
│       └── utils/        # helpers (PDF export)
│
├── backend/           # FastAPI + Python
│   ├── app/
│   │   ├── api/          # route definitions
│   │   ├── config/       # environment settings
│   │   ├── prompts/      # system_prompt.txt
│   │   ├── schemas/      # Pydantic models
│   │   ├── services/     # AI, prompt, resource services
│   │   └── utils/        # JSON validator
│   └── main.py
│
└── docs/              # project documentation
```

---

## User Journey

```
Landing Page  →  Career Discovery Session  →  AI Analysis  →  Career Report  →  PDF Download
```

---

## Routes

| Path          | Page                       |
|---------------|----------------------------|
| `/`           | Landing Page               |
| `/assessment` | Career Discovery Session   |
| `/analysis`   | AI Analysis Screen         |
| `/report`     | Career Report              |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- IBM watsonx.ai API Key, Project ID, and Service URL

---

### Frontend

```bash
cd frontend
cp .env.example .env          # set VITE_API_URL
npm install
npm run dev                   # http://localhost:5173
```

---

### Backend

```bash
cd backend
cp .env.example .env          # add IBM credentials
python -m venv .venv
# Windows:  .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload     # http://localhost:8000
```

---

### Environment Variables

**Frontend** (`frontend/.env`)

| Variable       | Description                     |
|----------------|---------------------------------|
| `VITE_API_URL` | Backend API base URL            |

**Backend** (`backend/.env`)

| Variable          | Description                          |
|-------------------|--------------------------------------|
| `IBM_API_KEY`     | IBM watsonx.ai API key               |
| `IBM_PROJECT_ID`  | IBM watsonx.ai project ID            |
| `IBM_URL`         | IBM watsonx.ai service URL           |
| `MODEL_ID`        | Model ID (Llama 3.3 70B Instruct)    |
| `FRONTEND_URL`    | Frontend URL for CORS configuration  |

---

## API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/`               | Health check                       |
| POST   | `/api/assessment` | Generate Career Report             |
| GET    | `/api/resources`  | List official learning resources   |

---

## Development Progress

See [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) for the current phase and completion status.

---

## Powered by IBM watsonx.ai

This project uses [IBM watsonx.ai Runtime](https://www.ibm.com/watsonx) with the **Llama 3.3 70B Instruct** model to generate personalized career guidance.

---

## License

MIT
