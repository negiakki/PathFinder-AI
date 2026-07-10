"""
main.py — FastAPI application entry point.

Registers routes and configures CORS.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.config.settings import get_settings

settings = get_settings()

app = FastAPI(
    title="PathFinder AI API",
    description="Career counseling API powered by IBM watsonx.ai",
    version="1.0.0",
)

# CORS — allows the React frontend to call the API
origins = [settings.frontend_url]
if settings.frontend_url != "http://localhost:5173":
    origins.append("http://localhost:5173")   # always allow local dev

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(router)
