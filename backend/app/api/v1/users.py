# backend/app/api/v1/users.py

from datetime import date
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client

from .schemas import UserProfileCreate, UserProfileResponse  # relative import
from ...core.dependencies import get_current_user_id, get_db  # relative import

router = APIRouter()


@router.post(
    "/users/me/cv",
    response_model=UserProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_user_profile_cv(
    profile_data: UserProfileCreate,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    """
    Creates / updates the user profile and CV information for the logged-in user.

    Uses:
      - public.profiles       (instead of public.users)
      - public.cv_documents   (instead of public.cvs)
    """

    # 1) Check if a profile already exists for this user
    existing_profile = (
        supabase.table("profiles")
        .select("*")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )

    if existing_profile.data and existing_profile.data[0].get("full_name"):
        # Profile already fully set up → tests expect 409 here
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User profile and CV already exist. Use PATCH to update.",
        )

    try:
        # 2) Insert or update profile in public.profiles

        profile_payload = {
            "user_id": user_id,
            "full_name": profile_data.full_name,
            "date_of_birth": profile_data.date_of_birth.isoformat(),
            "gender": profile_data.gender,
            "phone_number": profile_data.phone_number,
            "address": profile_data.address,
            "updated_at": date.today().isoformat(),
        }

        if existing_profile.data:
            # Profile row exists → update it
            profile_response = (
                supabase.table("profiles")
                .update(profile_payload)
                .eq("user_id", user_id)
                .execute()
            )
        else:
            # No profile row yet → create it
            profile_payload["created_at"] = date.today().isoformat()
            profile_response = (
                supabase.table("profiles").insert(profile_payload).execute()
            )

        if not profile_response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create/update user profile in 'profiles' table.",
            )

        profile_record = profile_response.data[0]

        # 3) Insert a CV row in public.cv_documents
        cv_payload = {
            "user_id": user_id,
            "cv_full_text": profile_data.cv_content,  # Changed to cv_full_text
            "updated_at": date.today().isoformat(),
        }

        # If you prefer to track created_at manually instead of default:
        cv_payload["created_at"] = date.today().isoformat()

        cv_insert_response = (
            supabase.table("cv_documents").insert(cv_payload).execute()
        )

        if not cv_insert_response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create CV in 'cv_documents' table.",
            )

        cv_record = cv_insert_response.data[0]

        # 4) Prepare values for the response model

        def as_date(value: str) -> date:
            # Accept either 'YYYY-MM-DD' or full timestamp 'YYYY-MM-DDTHH:MM:SS...'
            if value is None:
                return date.today()
            return date.fromisoformat(value.split("T")[0])

        created_at_str = profile_record.get("created_at") or date.today().isoformat()
        updated_at_str = profile_record.get("updated_at") or date.today().isoformat()

        cv_text = cv_record.get("cv_full_text") # Changed to cv_full_text

        return UserProfileResponse(
            id=UUID(str(profile_record.get("id", user_id))),  # profile id or user id
            full_name=profile_record["full_name"],
            date_of_birth=as_date(profile_record["date_of_birth"]),
            gender=profile_record["gender"],
            phone_number=profile_data.phone_number, # Use from profile_data
            address=profile_record["address"],
            cv_content=cv_text,
            created_at=as_date(created_at_str),
            updated_at=as_date(updated_at_str),
        )

    except HTTPException:
        # Re-raise our own HTTP errors unchanged
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )


@router.get("/users/me/cv", response_model=UserProfileResponse)
async def get_user_profile_cv(
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    """
    Retrieves the user's profile and CV information for the logged-in user.
    """
    profile_response = (
        supabase.table("profiles")
        .select("*")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )

    if not profile_response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found. Please create your profile first."
        )
    profile_record = profile_response.data[0]

    cv_response = (
        supabase.table("cv_documents")
        .select("cv_full_text, created_at, updated_at") # Changed to cv_full_text
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )

    cv_record = cv_response.data[0] if cv_response.data else {}

    def as_date(value: str) -> date:
        if value is None:
            return date.today() # Or handle as error/return None
        return date.fromisoformat(value.split("T")[0])

    created_at_str = profile_record.get("created_at") or date.today().isoformat()
    updated_at_str = profile_record.get("updated_at") or date.today().isoformat()

    return UserProfileResponse(
        id=UUID(str(profile_record.get("id", user_id))),
        full_name=profile_record["full_name"],
        date_of_birth=as_date(profile_record["date_of_birth"]),
        gender=profile_record["gender"],
        phone_number=profile_record["phone_number"],
        address=profile_record["address"],
        cv_content=cv_record.get("cv_full_text", ""), # Changed to cv_full_text
        created_at=as_date(created_at_str),
        updated_at=as_date(updated_at_str),
    )
