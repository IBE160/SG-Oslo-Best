import os
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file in the project root
ENV_PATH = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(dotenv_path=ENV_PATH)

class Settings(BaseModel):
    # Resend API Key
    # If you don't have a Resend account, you can get a key from https://resend.com
    RESEND_API_KEY: str | None = os.environ.get("RESEND_API_KEY")

settings = Settings()
