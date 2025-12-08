import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env
ENV_PATH = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=ENV_PATH)


print("DEBUG SUPABASE_URL:", repr(os.environ.get("SUPABASE_URL")))
print("DEBUG SUPABASE_SERVICE_KEY set:", bool(os.environ.get("SUPABASE_SERVICE_KEY")))

# Get Supabase credentials
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")

supabase: Client | None = None

# Initialize Supabase only if credentials exist
if supabase_url and supabase_key:
    try:
        supabase = create_client(supabase_url, supabase_key)
        print("✅ Supabase client initialized")
    except Exception as e:
        print("❌ Failed to initialize Supabase client:", e)
else:
    print("⚠️ Supabase is disabled (missing SUPABASE_URL or SUPABASE_SERVICE_KEY)") 