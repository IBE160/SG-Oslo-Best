import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Warning: SUPABASE_URL or SUPABASE_KEY not set in .env file")
    supabase_client = None
else:
    supabase_client: Client = create_client(url, key)

def fetch_user_applications(user_id: str):
    """
    Henter historikk for en spesifikk bruker fra 'cover_letters' tabellen.
    """
    if not supabase_client:
        return []

    try:
        response = (
            supabase_client.table("cover_letters")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    except Exception as e:
        print(f"Error fetching history: {e}")
        return []
