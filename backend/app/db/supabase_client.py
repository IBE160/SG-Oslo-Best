# backend/app/db/supabase_client.py

import os
from supabase import create_client, Client
from ..core.config import settings # Changed to relative import

def get_supabase_client() -> Client:
    """Returns a Supabase client instance."""
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
        raise ValueError("Supabase URL and Key must be set in environment variables.")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)