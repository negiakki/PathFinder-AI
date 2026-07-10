"""
models.py — Pydantic request and response models.

Full schemas are finalised in Phase 5 alongside the prompt engineering.
These are the base models required for the API layer.
"""
from typing import Any
from pydantic import BaseModel


# ── Request ──────────────────────────────────────────────────────────────────

class AssessmentRequest(BaseModel):
    """
    Payload sent by the frontend after the student completes the assessment.
    The 'answers' dict maps question IDs to the student's selected value(s).
    """
    answers: dict[str, Any]


# ── Response ──────────────────────────────────────────────────────────────────

class HealthResponse(BaseModel):
    status: str = "ok"


class AssessmentResponse(BaseModel):
    """
    Structured Career Report returned to the frontend.
    Fields mirror the JSON schema defined in PROMPT_SPEC.md.
    Full field definitions added in Phase 5.
    """
    version:          str
    status:           str
    student_summary:  str
    career_snapshot:  dict[str, Any]
    why_recommendation: str
    career_opportunities: list[dict[str, Any]]
    academic_pathway:     list[dict[str, Any]]
    skills_to_develop:    list[dict[str, Any]]
    learning_roadmap:     list[dict[str, Any]]
    resources:            list[dict[str, Any]]
    encouragement:        str


class ErrorResponse(BaseModel):
    detail: str
