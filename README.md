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

## Build Instructions

**Frontend** — production build output goes to `frontend/dist/`:

```bash
cd frontend
npm run build      # outputs frontend/dist/
npm run preview    # serve the build locally to sanity-check
```

**Backend** — production start command (binds to `0.0.0.0` and `$PORT`, no `--reload`):

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

`backend/Procfile` already defines this for Render/Heroku-style platforms.

---

## Deployment Prerequisites

- Set `VITE_API_URL` on the frontend host (Vercel) to the deployed backend URL, e.g. `https://your-backend.onrender.com`.
- Set `FRONTEND_URL` on the backend host (Render) to the deployed frontend URL, e.g. `https://your-app.vercel.app` — used for CORS.
- Set `IBM_API_KEY`, `IBM_PROJECT_ID`, `IBM_URL`, and `MODEL_ID` on the backend host. Never commit real values — `backend/.env` is gitignored.
- Backend start command: `uvicorn main:app --host 0.0.0.0 --port $PORT` (see `backend/Procfile`).
- Frontend build command: `npm run build`, output directory: `frontend/dist`.

---

## Development Progress

See [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) for the current phase and completion status.

---

## Powered by IBM watsonx.ai

This project uses [IBM watsonx.ai Runtime](https://www.ibm.com/watsonx) with the **Llama 3.3 70B Instruct** model to generate personalized career guidance.

---

## License

MIT
