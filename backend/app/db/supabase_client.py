import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env
load_dotenv()

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