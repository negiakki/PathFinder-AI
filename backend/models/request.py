"""
models/request.py — Pydantic request models for the analysis API.
"""
from typing import Any
from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    """
    Payload sent by the frontend after the student completes the assessment.
    'answers' maps question IDs to the student's selected value(s).
    """
    answers: dict[str, Any]
