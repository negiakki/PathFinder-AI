"""
models/response.py — Pydantic response models for the analysis API.

The shape here exactly matches what the frontend dashboard expects.
"""
from pydantic import BaseModel


class RecommendedCareer(BaseModel):
    title: str
    description: str
    matchPercentage: int


class CareerMatch(BaseModel):
    title: str
    matchPercentage: int
    description: str


class EntranceExam(BaseModel):
    name: str
    description: str
    icon: str


class RoadmapStage(BaseModel):
    stage: str
    description: str


class LearningResource(BaseModel):
    title: str
    category: str
    description: str


class AnalyzeResponse(BaseModel):
    """
    Structured career analysis report returned to the frontend.
    Field names match the existing frontend dashboard components exactly.
    """
    recommendedCareer: RecommendedCareer
    summary: str
    strengths: list[str]
    topCareerMatches: list[CareerMatch]
    recommendedDegrees: list[str]
    entranceExams: list[EntranceExam]
    skillsToDevelop: list[str]
    roadmap: list[RoadmapStage]
    learningResources: list[LearningResource]
