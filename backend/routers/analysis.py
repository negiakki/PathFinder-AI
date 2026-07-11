"""
routers/analysis.py — API routes for career analysis.

Endpoint:
  POST /api/analyze — accept assessment answers, return career analysis report.
"""
from fastapi import APIRouter, HTTPException

from models.request import AnalyzeRequest
from models.response import AnalyzeResponse
from services.analysis_service import analyze

router = APIRouter(prefix="/api", tags=["Analysis"])


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_assessment(payload: AnalyzeRequest):
    """
    Accept student assessment answers and return a structured career analysis.

    The answers are forwarded to the service layer, which calls IBM watsonx.ai
    for a personalised report and falls back to mock data on failure.
    """
    try:
        result = await analyze(payload.answers)
        return result
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
