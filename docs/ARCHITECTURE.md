\# ARCHITECTURE.md



\# PathFinder AI

\## System Architecture \& Technical Design



Version: 1.0



\---



\# Overview



PathFinder AI is an AI-powered web application that helps students in Classes 9–12 make informed academic and career decisions.



The application consists of three main layers:



\- React Frontend

\- FastAPI Backend

\- IBM watsonx.ai Runtime (Llama 3.3)



The frontend collects student responses.



The backend prepares the AI prompt and communicates with IBM watsonx.ai.



The AI returns a structured JSON response.



The frontend renders the response as a modern Career Report.



\---



\# High Level Architecture



&#x20;                   User



&#x20;                     │



&#x20;                     ▼



&#x20;           React Frontend (Vercel)



&#x20;                     │



&#x20;             REST API (HTTPS)



&#x20;                     │



&#x20;                     ▼



&#x20;        FastAPI Backend (Render)



&#x20;                     │



&#x20;         IBM watsonx.ai SDK



&#x20;                     │



&#x20;                     ▼



&#x20;       IBM watsonx.ai Runtime



&#x20;            Llama 3.3 70B



&#x20;                     │



&#x20;             JSON Response



&#x20;                     │



&#x20;                     ▼



&#x20;         Career Report Cards



\---



\# Technology Stack



Frontend



\- React

\- Vite

\- Tailwind CSS

\- React Router

\- Lucide React Icons



Backend



\- FastAPI

\- Python

\- Pydantic

\- Uvicorn



AI



\- IBM watsonx.ai Runtime

\- Llama 3.3 70B Instruct



Development



\- IBM BOB



Deployment



Frontend



\- Vercel



Backend



\- Render



\---



\# Folder Structure



pathfinder-ai/



├── frontend/



│   ├── public/



│   ├── src/



│   │



│   ├── assets/



│   ├── components/



│   │



│   ├── layout/



│   │



│   ├── pages/



│   │   ├── LandingPage/



│   │   ├── Assessment/



│   │   ├── Analysis/



│   │   └── Report/



│   │



│   ├── hooks/



│   ├── services/



│   ├── utils/



│   ├── types/



│   ├── App.jsx



│   └── main.jsx



│



├── backend/



│



│   ├── app/



│   │



│   ├── api/



│   │



│   ├── services/



│   │



│   ├── prompts/



│   │



│   ├── models/



│   │



│   ├── schemas/



│   │



│   ├── utils/



│   │



│   ├── config/



│   │



│   ├── main.py



│   │



│   └── requirements.txt



│



├── docs/



│



├── README.md



└── .env



\---



\# Frontend Pages



Landing Page



Purpose



Introduce PathFinder AI.



Components



\- Hero

\- Features

\- How It Works

\- Footer



\---



Assessment Page



Purpose



Career Discovery Session.



Components



\- Progress Bar

\- Question Card

\- Option Cards

\- Continue Button

\- Back Button



\---



Analysis Page



Purpose



Display AI analysis animation.



Components



\- Animated Progress

\- Loading Indicator



\---



Report Page



Purpose



Display Career Report.



Components



\- Student Summary

\- Career Snapshot

\- Why Recommendation

\- Career Cards

\- Academic Pathway

\- Skills

\- Learning Roadmap

\- Resources

\- Encouragement

\- Download PDF



\---



\# React Components



Button



QuestionCard



OptionCard



ProgressBar



CareerCard



RoadmapCard



SkillChip



ResourceCard



SectionHeader



PDFButton



LoadingAnimation



Navbar



Footer



\---



\# Backend Structure



API Layer



Handles requests.



Service Layer



Handles AI communication.



Prompt Layer



Stores system prompt.



Schema Layer



Pydantic models.



Utility Layer



PDF generation



Resource mapping



Validation



\---



\# API Endpoints



GET /



Health Check



Returns



{

&#x20;   "status":"ok"

}



\---



POST /api/assessment



Purpose



Generate Career Report.



Request



Student assessment JSON.



Response



Structured Career Report JSON.



\---



GET /api/resources



Returns



Official learning resources.



Used for



IBM SkillsBuild



SWAYAM



NPTEL



etc.



\---



\# Request Flow



Student



↓



Assessment



↓



Frontend



↓



POST /api/assessment



↓



FastAPI



↓



Prompt Builder



↓



IBM watsonx.ai



↓



JSON



↓



Frontend



↓



Career Report



\---



\# Prompt Flow



Assessment Answers



↓



Prompt Template



↓



Student JSON



↓



Combined Prompt



↓



IBM watsonx.ai



↓



Structured JSON



↓



Validate



↓



Return



\---



\# Environment Variables



IBM\_API\_KEY=



IBM\_PROJECT\_ID=



IBM\_URL=



MODEL\_ID=



FRONTEND\_URL=



\---



\# Backend Services



Assessment Service



Receives student profile.



Prompt Service



Builds prompt.



AI Service



Calls watsonx.ai.



PDF Service



Generates downloadable report.



Resource Service



Maps resources to official URLs.



\---



\# Resource Mapping



Maintain locally.



Example



IBM SkillsBuild



↓



https://skillsbuild.org



SWAYAM



↓



https://swayam.gov.in



NPTEL



↓



https://nptel.ac.in



Do not ask the AI for URLs.



\---



\# Error Handling



API Timeout



↓



Retry once



↓



Return friendly error



Invalid JSON



↓



Attempt parsing



↓



Return fallback message



watsonx unavailable



↓



Display



"Unable to generate report right now.

Please try again."



\---



\# State Management



React Context



Use for



Assessment Answers



Current Question



Career Report



Loading State



Avoid Redux.



\---



\# Data Lifecycle



Student opens website



↓



Completes assessment



↓



Assessment sent



↓



AI generates report



↓



Frontend renders report



↓



Student downloads PDF



↓



Data discarded



No data is stored.



\---



\# Security



Never expose IBM API Key.



All AI requests go through backend.



Validate every request.



Use HTTPS in production.



\---



\# Performance



Only one AI request.



Lazy load report components.



Minimize bundle size.



Compress images.



Use optimized icons.



\---



\# Deployment Flow



Frontend



↓



Vercel



Backend



↓



Render



AI



↓



IBM watsonx.ai Runtime



Environment variables configured on Render.



Frontend communicates only with backend.



\---



\# Testing Checklist



Frontend



\- Navigation

\- Responsive Design

\- Assessment Flow

\- Animations



Backend



\- API endpoints

\- JSON validation

\- watsonx integration



AI



\- Prompt quality

\- JSON format

\- Response time



Deployment



\- Public URL

\- Mobile compatibility

\- PDF generation



\---



\# Architecture Principles



Keep the project:



\- Modular

\- Maintainable

\- Responsive

\- Lightweight

\- Scalable



Avoid unnecessary complexity.



Build only the MVP.



Focus on reliability and user experience.



\---



\# Future Expansion



Possible future integrations:



\- Authentication

\- Database

\- User Profiles

\- Multi-language Support

\- Voice Assistant

\- Parent Dashboard

\- Teacher Dashboard

\- Scholarship Finder

\- College Recommendation Engine



The architecture should allow these features to be added later without major restructuring.

