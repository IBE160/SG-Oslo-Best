# backend/app/core/dependencies.py

from typing import Annotated, Optional
from fastapi import Depends, HTTPException, status, Request # Import Request
from supabase import Client

from ..db.supabase_client import get_supabase_client

async def get_current_user_id(
    request: Request, # Add request as a parameter
    supabase: Annotated[Client, Depends(get_supabase_client)]
) -> str:
    """
    Retrieves the current authenticated user's ID by validating the JWT from the Authorization header.
    """
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        token = auth_header.split(" ")[1]
        
        # Verify the token with Supabase
        user_response = supabase.auth.get_user(token)
        
        if not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return str(user_response.user.id)
    except HTTPException:
        raise # Re-raise FastAPI HTTPExceptions
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_db() -> Optional[Client]:
    """
    Returns the global Supabase client instance.

    This function takes no arguments so it can be used both as:
        - Depends(get_db) in route dependencies
        - get_db() in startup_event (main.py)
    """
    return get_supabase_client()
