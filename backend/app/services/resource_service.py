"""
resource_service.py — maps resource names to official URLs.

The AI model never generates URLs.
The backend injects official links here before returning the report.
"""

# Official resource URL mapping — extend as needed.
RESOURCE_MAP: dict[str, str] = {
    "IBM SkillsBuild":   "https://skillsbuild.org",
    "SWAYAM":            "https://swayam.gov.in",
    "NPTEL":             "https://nptel.ac.in",
    "NCERT":             "https://ncert.nic.in",
    "freeCodeCamp":      "https://www.freecodecamp.org",
    "Khan Academy":      "https://www.khanacademy.org",
    "JEE Official":      "https://jeemain.nta.nic.in",
    "NEET Official":     "https://neet.nta.nic.in",
    "CLAT Official":     "https://consortiumofnlus.ac.in",
    "CUET Official":     "https://cuet.samarth.ac.in",
}


def get_resources() -> dict[str, str]:
    """Returns the full resource map."""
    return RESOURCE_MAP


def attach_urls(resources: list[dict]) -> list[dict]:
    """
    Given a list of resource dicts (with 'title' keys from the AI response),
    attaches the matching official URL from RESOURCE_MAP.
    Resources with no mapping get an empty url field.
    """
    for resource in resources:
        title = resource.get("title", "")
        resource["url"] = RESOURCE_MAP.get(title, "")
    return resources
