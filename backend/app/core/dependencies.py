from typing import Annotated
from fastapi import Depends, HTTPException, status, Request
import httpx
from ..core.config import settings
from ..db.supabase_client import get_supabase_client


async def get_current_user_id(request: Request) -> str:
    """
    Validate the Supabase JWT sent from the frontend by calling
    Supabase Auth REST API directly.
    """

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header.split(" ")[1]

    # Validate token by calling Supabase REST auth API
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": settings.SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {token}",
            }
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    data = response.json()

    # Supabase responds with {"id": "...", "email": "...", ...}
    return data["id"]


def get_db():
    """
    Returns a Supabase client instance for any DB operations inside routes.
    This allows using: Depends(get_db)
    """
    return get_supabase_client()
