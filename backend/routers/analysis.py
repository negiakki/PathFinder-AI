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


logger = __import__("logging").getLogger(__name__)


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_assessment(payload: AnalyzeRequest):
    """
    Accept student assessment answers and return a structured career analysis.

    For this phase, the answers are forwarded to the service layer
    which returns the same mock response regardless of input.
    Replacing mock data with IBM watsonx.ai only requires changing
    the service layer implementation.
    """
    import json as _j
    logger.info(_j.dumps(payload.answers, ensure_ascii=True))
    try:
        result = await analyze(payload.answers)
        return result
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
