from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import resend

from app.db.supabase_client import supabase
from app.core.config import settings

router = APIRouter()

# Configure Resend
if settings.RESEND_API_KEY:
    resend.api_key = settings.RESEND_API_KEY

class UserRegistration(BaseModel):
    email: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserRegistration):
    """
    Creates a new user in Supabase Auth.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase client not initialized")

    try:
        # Create user in Supabase
        auth_response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
        })

        # The user object is available in auth_response.user
        # The session object is available in auth_response.session
        # Supabase sends a verification email by default if enabled in settings.
        # If we need more custom emails, we can use Resend here.

        # Example of sending a custom email with Resend (currently disabled)
        # if resend.api_key:
        #     try:
        #         params = {
        #             "from": "onboarding@example.com", # TODO: Use a proper domain
        #             "to": [user.email],
        #             "subject": "Welcome to CVAI Turbo!",
        #             "html": "<strong>Welcome!</strong> Please verify your email.",
        #         }
                #         email = resend.Emails.send(params)
                #     except Exception as e:
                #         # Log the email sending failure but don't block registration
                #         print(f"Failed to send verification email: {e}")


        # As per tech spec, we just need to return a success message with user info.
        # Supabase handles the verification email sending.
        if auth_response.user:
             return {"data": {"user_id": auth_response.user.id, "email": auth_response.user.email}}
        else:
            # This case might happen if user already exists but email is not confirmed
             raise HTTPException(status_code=400, detail="Failed to create user. The user may already exist.")


    except Exception as e:
        # Catch potential exceptions from Supabase client if the user already exists
        # or other issues occur.
        error_message = str(e)
        # Check for specific error messages if needed
        if "User already registered" in error_message:
             raise HTTPException(status_code=400, detail="User with this email already exists.")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {error_message}")


class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/login")
async def sign_in_user(credentials: UserLogin):
    """
    Authenticates a user and returns a JWT.
    """
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase client not initialized")

    try:
        # Sign in user with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })

        # The session object contains the access token
        if auth_response.session:
            return {
                "data": {
                    "access_token": auth_response.session.access_token,
                    "refresh_token": auth_response.session.refresh_token
                }
            }
        else:
            # Handle cases where sign-in fails without raising an exception
            raise HTTPException(status_code=401, detail="Incorrect email or password")

    except Exception as e:
        # Supabase client might raise an exception for auth errors
        raise HTTPException(status_code=401, detail="Incorrect email or password")

