"""
json_validator.py — safely parses and validates JSON from watsonx.ai.

The AI is instructed to return only valid JSON, but LLMs occasionally
wrap responses in Markdown code fences or include extra whitespace.
This utility strips those artefacts before parsing.

Full retry logic: Phase 5.
"""
import json
import re


def extract_json(raw: str) -> dict:
    """
    Attempt to extract and parse a JSON object from the raw model output.

    Strategy:
      1. Strip Markdown code fences (```json ... ```)
      2. Find the outermost { ... } block.
      3. Parse with json.loads.
      4. Raise ValueError if parsing fails — caller retries once.
    """
    # Remove ```json ... ``` or ``` ... ``` wrappers
    cleaned = re.sub(r"^```(?:json)?\s*", "", raw.strip(), flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned.strip())

    # Find the outermost JSON object
    start = cleaned.find("{")
    end   = cleaned.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("No JSON object found in model response.")

    json_str = cleaned[start : end + 1]
    return json.loads(json_str)
