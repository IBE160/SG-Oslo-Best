import os
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path

# Load .env from backend root
ENV_PATH = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=ENV_PATH)

class Settings(BaseModel):
    SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.environ.get("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_KEY: str = os.environ.get("SUPABASE_SERVICE_KEY", "")

    RESEND_API_KEY: str | None = os.environ.get("RESEND_API_KEY", None)

    GEMINI_API_KEY: str | None = os.environ.get("GEMINI_API_KEY")
    GOOGLE_API_KEY: str | None = os.environ.get("GOOGLE_API_KEY")

settings = Settings()
