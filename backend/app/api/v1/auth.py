from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
import resend

from ...db.supabase_client import get_supabase_client # Changed to relative import
from ...core.config import settings # Changed to relative import
from supabase import Client # Import Client for type hinting

router = APIRouter()

# Configure Resend
if settings.RESEND_API_KEY:
    resend.api_key = settings.RESEND_API_KEY

class UserRegistration(BaseModel):
    email: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(
    user: UserRegistration,
    supabase: Annotated[Client, Depends(get_supabase_client)] # Inject Supabase client
):
    """
    Creates a new user in Supabase Auth.
    """
    try:
        # Create user in Supabase
        auth_response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
        })

        if auth_response.user:
            # Send verification email if Resend is configured
            if settings.RESEND_API_KEY:
                try:
                    resend.Emails.send({
                        "from": "onboarding@resend.dev",
                        "to": auth_response.user.email,
                        "subject": "Welcome to CVAI Turbo! Please verify your email.",
                        "html": "<p>Thanks for registering! Please click the link above to verify your email address.</p>" # Supabase handles the actual verification link
                    })
                except Exception as e:
                    # Log the error but don't fail the registration
                    print(f"Failed to send verification email: {e}")
            
            return {
                "message": "User created successfully. Please check your email for a verification link.",
                "data": {"user_id": auth_response.user.id, "email": auth_response.user.email}
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to create user. The user may already exist.")

    except Exception as e:
        error_message = str(e)
        if "User already registered" in error_message:
             raise HTTPException(status_code=400, detail="User with this email already exists.")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {error_message}")


class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/login")
async def sign_in_user(
    credentials: UserLogin,
    supabase: Annotated[Client, Depends(get_supabase_client)] # Inject Supabase client
):
    """
    Authenticates a user and returns a JWT.
    """
    try:
        # Sign in user with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })

        if auth_response.session:
            return {
                "data": {
                    "access_token": auth_response.session.access_token,
                    "refresh_token": auth_response.session.refresh_token
                }
            }
        else:
            raise HTTPException(status_code=401, detail="Incorrect email or password")

    except Exception as e:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
