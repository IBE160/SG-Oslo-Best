import os
from supabase import create_client, Client

# Get Supabase credentials from environment variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")

if not supabase_url:
    raise ValueError("Missing environment variable: SUPABASE_URL")
if not supabase_key:
    raise ValueError("Missing environment variable: SUPABASE_SERVICE_KEY")

# Initialize the Supabase client
supabase: Client = create_client(supabase_url, supabase_key)
