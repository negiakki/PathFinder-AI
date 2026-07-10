"""
settings.py — environment variable loading via pydantic-settings.

All secrets are read from environment variables (never hardcoded).
A .env file is loaded automatically in development.
"""
from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve .env relative to this file (backend/app/config/settings.py → backend/.env)
_ENV_FILE = Path(__file__).parent.parent.parent / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE),
        env_file_encoding="utf-8",
        case_sensitive=False,
        protected_namespaces=("settings_",),   # avoids conflict with model_id field
    )

    # IBM watsonx.ai
    ibm_api_key:    str = ""
    ibm_project_id: str = ""
    ibm_url:        str = "https://us-south.ml.cloud.ibm.com"
    model_id:       str = "meta-llama/llama-3-3-70b-instruct"

    # CORS
    frontend_url:   str = "http://localhost:5173"


@lru_cache
def get_settings() -> Settings:
    return Settings()
