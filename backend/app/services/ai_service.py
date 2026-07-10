"""
ai_service.py — communicates with IBM watsonx.ai Runtime.

Full implementation: Phase 5.
"""
from typing import Any


async def generate_report(answers: dict[str, Any]) -> dict[str, Any]:
    """
    Build the prompt from student answers, call IBM watsonx.ai,
    validate the JSON response, and return the Career Report.

    Phase 5 implementation will:
      1. Build the structured student profile payload.
      2. Load system_prompt.txt from prompts/.
      3. Call ibm-watsonx-ai ModelInference.
      4. Parse and validate the JSON response.
      5. Attach resource URLs via resource_service.
      6. Return the complete report dict.
    """
    raise NotImplementedError(
        "AI service not yet implemented — scheduled for Phase 5."
    )
