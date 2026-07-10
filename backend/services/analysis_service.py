"""
services/analysis_service.py — Business logic for career analysis.

Phase 6C: integrates IBM watsonx.ai for real AI-generated career reports.
Falls back to MOCK_ANALYSIS on any error so the frontend is never disrupted.
"""
import json
import logging
import re
from typing import Any

from ibm_watsonx_ai import APIClient, Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.wml_client_error import CannotSetProjectOrSpace

from app.config.settings import get_settings
from mock.analysis import MOCK_ANALYSIS
from services.prompt_template import SYSTEM_PROMPT, build_prompt

logger = logging.getLogger(__name__)

# Required top-level fields that must be present in the AI response
_REQUIRED_FIELDS = {
    "recommendedCareer",
    "summary",
    "strengths",
    "topCareerMatches",
    "recommendedDegrees",
    "entranceExams",
    "skillsToDevelop",
    "roadmap",
    "learningResources",
}


def test_watsonx_connection() -> str:
    """
    Phase 6A connectivity test — sends a minimal prompt to IBM watsonx.ai
    and returns the model's response text.

    This function is intentionally separate from `analyze` so that the
    existing mock endpoint is completely unaffected.

    Usage (run from repo root inside the venv):
        python -c "from services.analysis_service import test_watsonx_connection; print(test_watsonx_connection())"
    """
    settings = get_settings()

    # Diagnostic: echo the resolved configuration (no secret values).
    ibm_url = settings.ibm_url
    project_id = settings.ibm_project_id
    model_id = settings.model_id

    # The SDK maps the WML runtime URL to the platform URL for project lookups:
    #   https://us-south.ml.cloud.ibm.com  →  https://api.dataplatform.cloud.ibm.com
    # The project validation call is:
    #   GET https://api.dataplatform.cloud.ibm.com/v2/projects/{project_id}
    PLATFORM_URLS_MAP = {
        "https://us-south.ml.cloud.ibm.com":         "https://api.dataplatform.cloud.ibm.com",
        "https://jp-tok.ml.cloud.ibm.com":            "https://api.jp-tok.dataplatform.cloud.ibm.com",
        "https://eu-gb.ml.cloud.ibm.com":             "https://api.eu-gb.dataplatform.cloud.ibm.com",
        "https://eu-de.ml.cloud.ibm.com":             "https://api.eu-de.dataplatform.cloud.ibm.com",
        "https://private.us-south.ml.cloud.ibm.com":  "https://api.dataplatform.cloud.ibm.com",
    }
    platform_url = PLATFORM_URLS_MAP.get(ibm_url, ibm_url)
    project_endpoint = f"{platform_url}/v2/projects/{project_id}"

    print(f"[watsonx] WML URL    : {ibm_url}")
    print(f"[watsonx] Platform URL: {platform_url}")
    print(f"[watsonx] Project ID  : {project_id}")
    print(f"[watsonx] Model ID    : {model_id}")
    print(f"[watsonx] Calling     : GET {project_endpoint}")

    try:
        client = APIClient(
            credentials=Credentials(
                api_key=settings.ibm_api_key,
                url=ibm_url,
            ),
            project_id=project_id,
        )
    except CannotSetProjectOrSpace as exc:
        # Decode the full IBM error body for precise diagnosis.
        # str(exc) looks like: "Cannot set Project or Space\nReason: {...json...}"
        reason_text = str(exc)
        # Strip the leading "Reason: " prefix that the SDK prepends to the JSON body.
        json_start = reason_text.find("{")
        raw_json = reason_text[json_start:] if json_start != -1 else reason_text
        try:
            body = json.loads(raw_json)
            ibm_code   = body.get("code", "unknown")
            ibm_error  = body.get("error", "unknown")
            ibm_reason = body.get("reason", "unknown")
            ibm_msg    = body.get("message", "")
        except (json.JSONDecodeError, AttributeError):
            ibm_code   = "unknown"
            ibm_error  = reason_text
            ibm_reason = reason_text
            ibm_msg    = ""

        print()
        print("=== IBM watsonx.ai — Project Resolution Failed ===")
        print(f"  Endpoint  : GET {project_endpoint}")
        print(f"  HTTP code : {ibm_code}")
        print(f"  IBM error : {ibm_error}")
        print(f"  Reason    : {ibm_reason}")
        if ibm_msg:
            print(f"  Message   : {ibm_msg}")
        print(f"  Raw body  : {raw_json}")
        print()
        raise

    model = ModelInference(
        model_id=model_id,
        api_client=client,
    )

    prompt = "Reply with exactly: IBM Watson connection successful."
    response = model.generate_text(prompt=prompt)

    logger.info("watsonx.ai connectivity test response: %s", response)
    return response


async def analyze(answers: dict[str, Any]) -> dict[str, Any]:
    """
    Accept student assessment answers and return a career analysis report.

    Phase 6C: calls IBM watsonx.ai with the student's answers.
    Falls back to MOCK_ANALYSIS on any failure so the frontend is never disrupted.
    """
    settings = get_settings()

    try:
        # 1. Build the prompt
        user_prompt = build_prompt(answers)
        logger.info("watsonx: prompt built (%d chars)", len(user_prompt))

        # 2. Create authenticated client
        client = APIClient(
            credentials=Credentials(
                api_key=settings.ibm_api_key,
                url=settings.ibm_url,
            ),
            project_id=settings.ibm_project_id,
        )

        model = ModelInference(
            model_id=settings.model_id,
            api_client=client,
        )

        # 3. Call the Chat API (recommended over deprecated generate_text)
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_prompt},
        ]
        params = {"max_tokens": 4096}
        logger.info("watsonx: sending request to %s", settings.model_id)
        response = model.chat(messages=messages, params=params)
        logger.info("watsonx: response received")

        # 4. Extract content from the chat response
        raw_text: str = response["choices"][0]["message"]["content"]
        logger.debug("watsonx: raw response length=%d", len(raw_text))

        # 5. Extract the JSON block — strip surrounding markdown fences or text
        json_text = raw_text.strip()
        # Remove optional ```json ... ``` fences if the model adds them
        fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)```", json_text)
        if fence_match:
            json_text = fence_match.group(1).strip()
        else:
            # Fall back: find the outermost { ... } block
            brace_match = re.search(r"\{[\s\S]*\}", json_text)
            if brace_match:
                json_text = brace_match.group(0)

        # 6. Parse JSON
        result: dict[str, Any] = json.loads(json_text)
        logger.info("watsonx: JSON parsed successfully")

        # 7. Validate required fields
        missing = _REQUIRED_FIELDS - result.keys()
        if missing:
            logger.warning(
                "watsonx: response missing required fields %s — falling back to mock",
                missing,
            )
            return MOCK_ANALYSIS

        return result

    except Exception as exc:  # noqa: BLE001
        logger.error("watsonx: inference failed — %s: %s", type(exc).__name__, exc)
        logger.exception("Watson failed")
        return MOCK_ANALYSIS
