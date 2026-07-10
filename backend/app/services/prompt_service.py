"""
prompt_service.py — builds the watsonx.ai prompt payload.

Full implementation: Phase 5.
"""
from typing import Any
import json
from pathlib import Path

_SYSTEM_PROMPT_PATH = Path(__file__).parent.parent / "prompts" / "system_prompt.txt"


def build_user_prompt(answers: dict[str, Any]) -> str:
    """
    Formats the student's answers into the user prompt template
    defined in PROMPT_SPEC.md.
    """
    student_json = json.dumps(answers, indent=2, ensure_ascii=False)
    return (
        "Using the following student profile, generate a personalized career counseling report.\n\n"
        f"<Student Profile>\n{student_json}\n\n"
        "Return ONLY valid JSON matching the required schema."
    )


def load_system_prompt() -> str:
    """Reads the static system prompt from prompts/system_prompt.txt."""
    return _SYSTEM_PROMPT_PATH.read_text(encoding="utf-8").strip()
