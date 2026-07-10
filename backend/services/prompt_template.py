"""
services/prompt_template.py — Production prompt template for IBM watsonx.ai.

Phase 6B: Prompt engineering only.
DO NOT integrate into analyze() until Phase 6C.
DO NOT remove MOCK_ANALYSIS.

Usage (future integration point in analysis_service.py):
    from services.prompt_template import build_prompt
    prompt = build_prompt(answers)
    raw_text = model.generate_text(prompt=prompt)
    result   = json.loads(raw_text)
"""

from __future__ import annotations
from typing import Any

# ---------------------------------------------------------------------------
# System prompt
# Injected as the opening instruction block in the final prompt string.
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """\
You are an experienced Indian career counselor with 20 years of expertise guiding \
students in Classes 9–12 toward realistic, high-quality career paths within the \
Indian education system. You are deeply familiar with Indian entrance exams, degree \
programmes, university types, job markets, and regional academic realities.

Your task is to analyse a student's assessment answers and produce a complete, \
personalised career guidance report. You must:

1. Recommend the single best-fit career based on the student's interests, strengths, \
subjects, personality, goals, and education level.
2. Calculate an honest match percentage (0–100) for each recommended career using \
the student's combined signals — do not inflate scores.
3. Recommend degrees and entrance exams that are directly relevant to the \
recommended career AND appropriate for the student's current class and stream.
4. Build a step-by-step roadmap that starts from the student's current class.
5. List only learning resources that are freely accessible or widely used in India.
6. Avoid generic motivational text. Be specific, practical, and actionable.
7. Never recommend careers, exams, or degrees that contradict the student's stream \
or education level.

STRICT OUTPUT RULES:
- Return ONLY a single valid JSON object.
- No markdown. No code fences. No triple backticks.
- No explanations, preamble, or commentary before or after the JSON.
- No trailing commas. No JavaScript-style comments inside JSON.
- All string values must be properly escaped.
- If uncertain about a detail, make the best reasonable recommendation — but always \
  return complete, valid JSON.

JSON SCHEMA (you must match this exactly — field names are case-sensitive):

{
  "recommendedCareer": {
    "title": "<string: primary career title>",
    "description": "<string: 2–3 sentence description of the career role>",
    "matchPercentage": <integer 0–100>
  },
  "summary": "<string: 2–4 sentence personalised summary explaining why this \
career fits the student — reference their specific answers>",
  "strengths": [
    "<string: identified strength 1>",
    "<string: identified strength 2>",
    "<string: identified strength 3>",
    "<string: identified strength 4>",
    "<string: identified strength 5>"
  ],
  "topCareerMatches": [
    {
      "title": "<string: career title>",
      "matchPercentage": <integer 0–100>,
      "description": "<string: 1–2 sentence description>"
    }
  ],
  "recommendedDegrees": [
    "<string: full degree name e.g. B.Tech in Computer Science & Engineering>"
  ],
  "entranceExams": [
    {
      "name": "<string: exam name>",
      "description": "<string: 1–2 sentence description of what the exam unlocks>",
      "icon": "<string: single relevant emoji>"
    }
  ],
  "skillsToDevelop": [
    "<string: skill name>"
  ],
  "roadmap": [
    {
      "stage": "<string: stage label e.g. 'Now (Class 10)' or 'Undergraduate Degree'>",
      "description": "<string: 2–4 actionable sentences for this stage>"
    }
  ],
  "learningResources": [
    {
      "title": "<string: resource name>",
      "category": "<string: one of Online Course | Practice Platform | \
Book | YouTube Channel | Foundation | Advanced | Tooling | Web Development>",
      "description": "<string: 1–2 sentence description>"
    }
  ]
}

QUANTITY GUIDELINES (produce at minimum these counts):
- strengths:          exactly 5 items
- topCareerMatches:   5 items, sorted by matchPercentage descending; \
  first item must match recommendedCareer.title
- recommendedDegrees: 4–6 items
- entranceExams:      4–6 items relevant to the career and current class
- skillsToDevelop:    8–12 items
- roadmap:            5–7 stages starting from the student's current class
- learningResources:  5–7 items

MATCH PERCENTAGE LOGIC:
- 90–100: near-perfect alignment across interests, subjects, personality, and goals
- 75–89:  strong alignment with minor gaps
- 60–74:  moderate fit — some relevant signals present
- Below 60: include only if genuinely relevant as an alternative
"""

# ---------------------------------------------------------------------------
# User-turn prompt template
# ---------------------------------------------------------------------------
# Placeholders are filled by build_prompt().  Keys map directly to the
# question IDs in frontend/src/pages/Assessment/questions.js.
#
# ALL placeholders use the format: {PLACEHOLDER_NAME}
# ---------------------------------------------------------------------------

USER_PROMPT_TEMPLATE = """\
Analyse the following student assessment and return the career guidance JSON.

--- STUDENT PROFILE ---
Current Class         : {current_class}
Preferred Language    : {language}
Career Values         : {career_values}
Favourite Subjects    : {favorite_subjects}
Interests             : {interests}
Hobbies               : {hobbies}
Preferred Activities  : {preferred_activities}
Learning Style        : {learning_style}
Personality Traits    : {personality_traits}
Biggest Concern       : {biggest_concern}
Current Stream (11–12): {current_stream}
Career Interests      : {career_interests}
Preferred College Type: {preferred_college_type}
Annual Education Budget: {budget_preference}
Preferred Work Env.   : {preferred_work_environment}
Biggest Challenge     : {biggest_challenge}
--- END PROFILE ---

Return ONLY the JSON object. No other text.
"""

# ---------------------------------------------------------------------------
# Sentinel for missing / not-applicable fields
# ---------------------------------------------------------------------------

_NOT_PROVIDED = "Not provided"


def _fmt(value: Any) -> str:
    """
    Normalise a question answer to a display string.

    - list  → comma-joined string
    - str   → as-is
    - None  → _NOT_PROVIDED sentinel
    """
    if value is None:
        return _NOT_PROVIDED
    if isinstance(value, list):
        return ", ".join(str(v) for v in value) if value else _NOT_PROVIDED
    return str(value).strip() or _NOT_PROVIDED


def build_prompt(answers: dict[str, Any]) -> str:
    """
    Combine SYSTEM_PROMPT and USER_PROMPT_TEMPLATE into a single prompt string
    ready to pass to IBM watsonx.ai ``model.generate_text()``.

    Parameters
    ----------
    answers:
        The ``answers`` dict from the frontend ``AnalyzeRequest`` payload.
        Keys correspond to question IDs defined in questions.js.

    Returns
    -------
    str
        A fully-resolved prompt string.  No placeholders remain.

    Example
    -------
    >>> from services.prompt_template import build_prompt
    >>> prompt = build_prompt(EXAMPLE_INPUT["answers"])
    >>> print(prompt[:120])
    """
    user_section = USER_PROMPT_TEMPLATE.format(
        current_class          = _fmt(answers.get("current_class")),
        language               = _fmt(answers.get("language")),
        career_values          = _fmt(answers.get("career_values")),
        favorite_subjects      = _fmt(answers.get("favorite_subjects")),
        interests              = _fmt(answers.get("interests")),
        hobbies                = _fmt(answers.get("hobbies")),
        preferred_activities   = _fmt(answers.get("preferred_activities")),
        learning_style         = _fmt(answers.get("learning_style")),
        personality_traits     = _fmt(answers.get("personality_traits")),
        biggest_concern        = _fmt(answers.get("biggest_concern")),
        current_stream         = _fmt(answers.get("current_stream")),
        career_interests       = _fmt(answers.get("career_interests")),
        preferred_college_type = _fmt(answers.get("preferred_college_type")),
        budget_preference      = _fmt(answers.get("budget_preference")),
        preferred_work_environment = _fmt(answers.get("preferred_work_environment")),
        biggest_challenge      = _fmt(answers.get("biggest_challenge")),
    )
    return f"{SYSTEM_PROMPT}\n\n{user_section}"


# ---------------------------------------------------------------------------
# Example input payload
# Represents a Class 12 PCM student interested in engineering/technology.
# ---------------------------------------------------------------------------

EXAMPLE_INPUT: dict[str, Any] = {
    "answers": {
        # --- common questions ---
        "current_class":  "12",
        "language":       "English",
        "career_values":  ["Technology", "Financial Stability", "Entrepreneurship"],

        # --- Class 9–10 questions (N/A for Class 12, kept for schema completeness) ---
        "favorite_subjects":      ["Mathematics", "Physics", "Computer Science"],
        "interests":              ["Coding & Technology", "Science & Experiments", "Business & Finance"],
        "hobbies":                ["Building / Making things", "Playing video games", "Watching documentaries"],
        "preferred_activities":   "Solving problems & puzzles",
        "learning_style":         "Practical / Hands-on",
        "personality_traits":     ["Curious", "Logical", "Detail-oriented", "Creative"],
        "biggest_concern":        "Fear of a wrong decision",

        # --- Class 11–12 questions ---
        "current_stream":          "Science (PCM)",
        "career_interests":        ["Engineering & Technology", "Science & Research"],
        "preferred_college_type":  "IIT / NIT / AIIMS",
        "budget_preference":       "₹2,00,000 – ₹5,00,000",
        "preferred_work_environment": "Office / Corporate",
        "biggest_challenge":       "Preparing for entrance exams",
    }
}

# ---------------------------------------------------------------------------
# Example expected JSON response
# Demonstrates what a well-formed watsonx.ai output should look like for the
# EXAMPLE_INPUT above.  Used for prompt validation and regression testing.
# ---------------------------------------------------------------------------

EXAMPLE_EXPECTED_RESPONSE: dict[str, Any] = {
    "recommendedCareer": {
        "title": "Software Engineer",
        "description": (
            "Software Engineers design, develop, and maintain the software systems "
            "that power modern applications — from web platforms and mobile apps to "
            "cloud infrastructure and AI products. They work at tech companies, "
            "startups, and across every industry sector in India and globally."
        ),
        "matchPercentage": 95,
    },
    "summary": (
        "Your combination of Physics, Mathematics, and Computer Science — paired with "
        "a logical, detail-oriented personality and a passion for building things — "
        "strongly aligns with a career in Software Engineering. Your interest in "
        "entrepreneurship and financial stability maps well to the high-demand, "
        "well-compensated tech job market. Targeting IIT/NIT through JEE will give "
        "you a competitive foundation to enter top-tier product companies."
    ),
    "strengths": [
        "Logical & Analytical Thinking",
        "Mathematical Aptitude",
        "Curiosity-Driven Learning",
        "Attention to Detail",
        "Practical Problem Solving",
    ],
    "topCareerMatches": [
        {
            "title": "Software Engineer",
            "matchPercentage": 95,
            "description": (
                "Build scalable software systems across web, mobile, and cloud "
                "platforms using modern languages and frameworks."
            ),
        },
        {
            "title": "Data Scientist",
            "matchPercentage": 87,
            "description": (
                "Use statistical models and machine learning to extract business "
                "insights from large datasets."
            ),
        },
        {
            "title": "AI / ML Engineer",
            "matchPercentage": 82,
            "description": (
                "Design and deploy machine learning pipelines and AI systems "
                "that automate complex tasks at scale."
            ),
        },
        {
            "title": "Product Manager",
            "matchPercentage": 74,
            "description": (
                "Lead cross-functional teams to define, prioritise, and ship "
                "products that solve real user problems."
            ),
        },
        {
            "title": "Embedded Systems Engineer",
            "matchPercentage": 67,
            "description": (
                "Develop firmware and low-level software for hardware devices, "
                "robotics, and IoT systems — combining Physics and programming."
            ),
        },
    ],
    "recommendedDegrees": [
        "B.Tech in Computer Science & Engineering",
        "B.Tech in Artificial Intelligence & Data Science",
        "B.E. in Information Technology",
        "B.Sc. (Research) in Computer Science — IISc / IISERs",
        "B.Tech in Electronics & Computer Engineering",
    ],
    "entranceExams": [
        {
            "name": "JEE Main",
            "description": "Gateway to NITs, IIITs, and GFTIs offering B.Tech programmes across India.",
            "icon": "🎓",
        },
        {
            "name": "JEE Advanced",
            "description": "Qualifies students for admission to the IITs — India's most prestigious engineering institutions.",
            "icon": "🏆",
        },
        {
            "name": "BITSAT",
            "description": "Entrance exam for BITS Pilani, Goa, and Hyderabad — top-ranked private engineering colleges.",
            "icon": "⚡",
        },
        {
            "name": "CUET",
            "description": "Common University Entrance Test for UG admission to central universities including Delhi University.",
            "icon": "📋",
        },
        {
            "name": "VITEEE",
            "description": "VIT University's entrance exam for B.Tech programmes — widely recognised private option.",
            "icon": "📐",
        },
        {
            "name": "MHT-CET",
            "description": "Maharashtra's common entrance test — relevant if targeting state engineering colleges in Maharashtra.",
            "icon": "📝",
        },
    ],
    "skillsToDevelop": [
        "Data Structures & Algorithms",
        "Python Programming",
        "C / C++ Programming",
        "Object-Oriented Design",
        "Web Development (HTML / CSS / JavaScript)",
        "Database Management (SQL)",
        "Version Control with Git",
        "Operating Systems & Computer Networks",
        "System Design Fundamentals",
        "Competitive Programming (LeetCode / Codeforces)",
        "Cloud Computing Basics (AWS / GCP Free Tier)",
        "Communication & Technical Writing",
    ],
    "roadmap": [
        {
            "stage": "Now (Class 12 — Board Exam Year)",
            "description": (
                "Focus on NCERT mastery for Physics, Chemistry, and Mathematics. "
                "Simultaneously prepare for JEE Main with a structured coaching plan "
                "or self-study using PW / Allen material. Dedicate 1–2 hours daily to "
                "competitive programming on HackerRank or Code.org to build early fluency."
            ),
        },
        {
            "stage": "JEE / Entrance Exam Preparation",
            "description": (
                "Appear for JEE Main (January & April sessions), JEE Advanced if shortlisted, "
                "BITSAT, and VITEEE. Keep CUET as a parallel option for Delhi University programmes. "
                "Use PYQs (Previous Year Questions) and mock tests for time management."
            ),
        },
        {
            "stage": "Undergraduate Degree (Year 1–2)",
            "description": (
                "Pursue B.Tech in Computer Science at an IIT, NIT, or reputed private university. "
                "Build strong foundations in C/C++, Discrete Mathematics, and Data Structures. "
                "Join the college's coding club and participate in hackathons from Semester 1."
            ),
        },
        {
            "stage": "Internships & Open Source (Year 2–3)",
            "description": (
                "Apply for summer internships at tech startups or product companies via Internshala "
                "or LinkedIn. Contribute to open-source projects on GitHub. Start building a "
                "portfolio of 3–5 projects demonstrating real skills."
            ),
        },
        {
            "stage": "Pre-Placement Preparation (Year 3–4)",
            "description": (
                "Grind Data Structures & Algorithms on LeetCode targeting 200+ problems. "
                "Study System Design for senior roles. Prepare for campus placement season "
                "at companies like Google, Microsoft, Flipkart, and high-growth startups."
            ),
        },
        {
            "stage": "Career Launch",
            "description": (
                "Join as a Software Engineer (SDE-1) at a product company, service company, "
                "or funded startup. Build domain expertise over 2–3 years. Consider M.Tech, "
                "MS abroad (GRE route), or an MBA (CAT route) for an accelerated career trajectory."
            ),
        },
    ],
    "learningResources": [
        {
            "title": "CS50: Introduction to Computer Science",
            "category": "Online Course",
            "description": (
                "Harvard's free foundational course — covers C, Python, algorithms, and "
                "web development. The best starting point for any aspiring software engineer."
            ),
        },
        {
            "title": "LeetCode",
            "category": "Practice Platform",
            "description": (
                "Industry-standard platform for practising Data Structures & Algorithms "
                "problems used in FAANG and top Indian tech company interviews."
            ),
        },
        {
            "title": "NPTEL — Data Structures and Algorithms (IIT Madras)",
            "category": "Online Course",
            "description": (
                "Free, high-quality DSA course by IIT Madras faculty on the NPTEL platform — "
                "ideal for Indian students targeting IIT-level rigor."
            ),
        },
        {
            "title": "The Odin Project",
            "category": "Web Development",
            "description": (
                "Free, open-source full-stack curriculum covering HTML, CSS, JavaScript, "
                "React, and Node.js — takes a complete beginner to job-ready."
            ),
        },
        {
            "title": "MIT OpenCourseWare — 6.006 Introduction to Algorithms",
            "category": "Advanced",
            "description": (
                "MIT's free algorithms lectures and problem sets — essential for students "
                "targeting top-tier research or engineering roles."
            ),
        },
        {
            "title": "GitHub Student Developer Pack",
            "category": "Tooling",
            "description": (
                "Free access to 100+ developer tools including cloud credits, JetBrains IDEs, "
                "and domain names — exclusively for enrolled students."
            ),
        },
    ],
}
