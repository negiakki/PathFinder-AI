"""
routes.py — API route definitions.

Endpoints:
  GET  /                — health check
  POST /api/assessment  — generate Career Report
  GET  /api/resources   — return official resource mapping
"""
from fastapi import APIRouter, HTTPException

from app.schemas.models import AssessmentRequest, HealthResponse
from app.services.ai_service import generate_report
from app.services.resource_service import get_resources

router = APIRouter()


@router.get("/", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Returns 200 OK when the API is running."""
    return HealthResponse(status="ok")


@router.post("/api/assessment", tags=["Assessment"])
async def submit_assessment(payload: AssessmentRequest):
    """
    Accepts student assessment answers, sends them to IBM watsonx.ai,
    and returns a structured Career Report JSON.
    Full implementation: Phase 5.
    """
    try:
        report = await generate_report(payload.answers)
        return report
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@router.get("/api/resources", tags=["Resources"])
async def list_resources():
    """
    Returns the official resource mapping (title → URL).
    Used to attach links to AI-recommended resources.
    """
    return get_resources()
