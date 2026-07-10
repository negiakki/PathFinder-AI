"""
main.py — FastAPI application entry point.

Registers routes and configures CORS for React frontend communication.
"""
import sys
import os

# Allow imports from backend/ root (routers, models, services, mock)
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as app_router
from app.config.settings import get_settings
from routers.analysis import router as analysis_router

settings = get_settings()

app = FastAPI(
    title="PathFinder AI API",
    description="Career counseling API powered by IBM watsonx.ai",
    version="1.0.0",
)

# CORS — allows the React frontend (localhost:5173) to call the API
origins = [settings.frontend_url]
for dev_origin in ("http://localhost:5173", "http://127.0.0.1:5173"):
    if dev_origin not in origins:
        origins.append(dev_origin)  # always allow local dev, both loopback hostnames

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Existing app routes (health check, legacy /api/assessment)
app.include_router(app_router)

# Phase 5: mock analysis endpoint — POST /api/analyze
app.include_router(analysis_router)
