# backend/app/api/v1/users.py

from datetime import datetime, timezone
from typing import Annotated, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client

from .schemas import (
    UserProfileCreate,
    UserProfileResponse,
    CVUpdate,
    UserProfileUpdate,
)
from ...core.dependencies import get_current_user_id, get_db

router = APIRouter()

# ------------------------------------------------------------------
# Allow tests to override dependencies on this router
# (FastAPI only defines `dependency_overrides` on the app by default)
# ------------------------------------------------------------------
if not hasattr(router, "dependency_overrides"):
    router.dependency_overrides = {}
# ------------------------------------------------------------------


def as_datetime_or_default(value: Optional[str], default: datetime) -> datetime:
    """
    Convert an ISO string to a timezone-aware datetime.
    If value is None or invalid, return the provided default.
    """
    if not value:
        return default
    try:
        dt = datetime.fromisoformat(value)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except Exception:
        # For now, just fall back to the default
        return default


# ------------------------------------------------------------------
# POST /users/me/cv  -> create initial profile + CV
# ------------------------------------------------------------------
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
    print(f"DEBUG: Starting create_user_profile_cv for user_id: {user_id}")

    # 1) Check if a profile already exists for this user
    print(f"DEBUG: Checking for existing profile for user_id: {user_id}")
    existing_profile = (
        supabase.table("profiles")
        .select("*")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    print(f"DEBUG: Existing profile data: {existing_profile.data}")

    if existing_profile.data and existing_profile.data[0].get("full_name"):
        print("DEBUG: Profile already exists, raising 409.")
        # Profile already fully set up → tests expect 409 here
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User profile and CV already exist. Use PATCH to update.",
        )

    try:
        # 2) Insert or update profile in public.profiles
        print("DEBUG: Preparing profile payload.")
        now_iso = datetime.now(timezone.utc).isoformat()

        profile_payload = {
            "user_id": user_id,
            "full_name": profile_data.full_name,
            "date_of_birth": profile_data.date_of_birth.isoformat(),
            "gender": profile_data.gender,
            "phone_number": profile_data.phone_number,
            "address": profile_data.address,
            "updated_at": now_iso,
        }
        print(f"DEBUG: Profile payload: {profile_payload}")

        if existing_profile.data:
            print("DEBUG: Updating existing profile in 'profiles' table.")
            profile_response = (
                supabase.table("profiles")
                .update(profile_payload)
                .eq("user_id", user_id)
                .execute()
            )
        else:
            print("DEBUG: Inserting new profile into 'profiles' table.")
            profile_payload["created_at"] = now_iso
            profile_response = (
                supabase.table("profiles").insert(profile_payload).execute()
            )
        print(f"DEBUG: Profile Supabase response data: {profile_response.data}")

        if not profile_response.data:
            print("DEBUG: Profile response data is empty, raising 500.")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create/update user profile in 'profiles' table.",
            )

        profile_record = profile_response.data[0]
        print(f"DEBUG: Profile record from Supabase: {profile_record}")

        # 3) Insert a CV row in public.cv_documents
        print("DEBUG: Preparing CV payload.")
        cv_payload = {
            "user_id": user_id,
            "cv_full_text": profile_data.cv_content,
            "created_at": now_iso,
            "updated_at": now_iso,
        }
        print(f"DEBUG: CV payload: {cv_payload}")

        cv_insert_response = (
            supabase.table("cv_documents").insert(cv_payload).execute()
        )
        print(f"DEBUG: CV Supabase response data: {cv_insert_response.data}")

        if not cv_insert_response.data:
            print("DEBUG: CV response data is empty, raising 500.")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create CV in 'cv_documents' table.",
            )

        cv_record = cv_insert_response.data[0]
        print(f"DEBUG: CV record from Supabase: {cv_record}")

        # 4) Prepare values for the response model
        print("DEBUG: Preparing UserProfileResponse.")
        cv_created_at_str = cv_record.get("created_at") or now_iso
        cv_updated_at_str = cv_record.get("updated_at") or now_iso
        cv_text = cv_record.get("cv_full_text")

        response_data = UserProfileResponse(
            id=UUID(str(profile_record.get("id", user_id))),  # profile id or user id
            full_name=profile_record.get("full_name", ""),
            date_of_birth=as_datetime_or_default(profile_record.get("date_of_birth"), datetime.min.replace(tzinfo=timezone.utc)).date(),
            gender=profile_record.get("gender", ""),
            phone_number=profile_data.phone_number, # Use from profile_data
            address=profile_record.get("address", ""),
            cv_content=cv_text,
            created_at=as_datetime_or_default(cv_created_at_str, datetime.min.replace(tzinfo=timezone.utc)),
            updated_at=as_datetime_or_default(cv_updated_at_str, datetime.min.replace(tzinfo=timezone.utc)),
        )
        print(f"DEBUG: UserProfileResponse created: {response_data}")
        return response_data

    except HTTPException:
        print("DEBUG: Caught HTTPException, re-raising.")
        raise
    except Exception as e:
        print(f"DEBUG: Caught generic Exception: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )


# ------------------------------------------------------------------
# PATCH /users/me/cv  -> partial update of profile + CV
# ------------------------------------------------------------------
@router.patch(
    "/users/me/cv",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
)
async def update_user_profile_cv(
    profile_cv_update_data: UserProfileUpdate,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    """
    Updates the user's profile and CV information for the logged-in user.
    Handles partial updates of profile fields and cv_full_text.
    """
    profile_update_payload: dict = {}
    cv_update_payload: dict = {}

    # Validate and prepare profile fields
    if profile_cv_update_data.full_name is not None:
        if not profile_cv_update_data.full_name.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="'full_name' cannot be empty.",
            )
        profile_update_payload["full_name"] = profile_cv_update_data.full_name

    if profile_cv_update_data.date_of_birth is not None:
        profile_update_payload["date_of_birth"] = (
            profile_cv_update_data.date_of_birth.isoformat()
        )

    if profile_cv_update_data.gender is not None:
        if not profile_cv_update_data.gender.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="'gender' cannot be empty.",
            )
        profile_update_payload["gender"] = profile_cv_update_data.gender

    if profile_cv_update_data.phone_number is not None:
        if not profile_cv_update_data.phone_number.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="'phone_number' cannot be empty.",
            )
        profile_update_payload["phone_number"] = profile_cv_update_data.phone_number

    if profile_cv_update_data.address is not None:
        if not profile_cv_update_data.address.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="'address' cannot be empty.",
            )
        profile_update_payload["address"] = profile_cv_update_data.address

    # Validate and prepare CV field
    if profile_cv_update_data.cv_full_text is not None:
        if not profile_cv_update_data.cv_full_text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="'cv_full_text' cannot be empty.",
            )
        cv_update_payload["cv_full_text"] = profile_cv_update_data.cv_full_text

    if not profile_update_payload and not cv_update_payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided for update.",
        )

    now = datetime.now(timezone.utc)
    now_iso = now.isoformat()

    if profile_update_payload:
        profile_update_payload["updated_at"] = now_iso
    if cv_update_payload:
        cv_update_payload["updated_at"] = now_iso

    try:
        # ---------- PROFILE UPDATE ----------
        if profile_update_payload:
            profile_response = (
                supabase.table("profiles")
                .update(profile_update_payload)
                .eq("user_id", user_id)
                .execute()
            )
            # If no rows were updated, there is no profile yet -> 404, not 500
            if not profile_response.data:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User profile not found. Please create your profile first.",
                )

        # ---------- CV UPDATE ----------
        if cv_update_payload:
            existing_cv = (
                supabase.table("cv_documents")
                .select("id")
                .eq("user_id", user_id)
                .limit(1)
                .execute()
            )
            if not existing_cv.data:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="CV not found for this user. Please create your CV first.",
                )

            cv_update_response = (
                supabase.table("cv_documents")
                .update(cv_update_payload)
                .eq("user_id", user_id)
                .execute()
            )
            if not cv_update_response.data:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to update CV in 'cv_documents' table.",
                )

        # ---------- LOAD FULL RECORDS FOR RESPONSE ----------
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
                detail="User profile not found after update.",
            )
        profile_record = profile_response.data[0]

        cv_response = (
            supabase.table("cv_documents")
            .select("cv_full_text, created_at, updated_at")
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        cv_record = cv_response.data[0] if cv_response.data else {}

        cv_created_at_str = cv_record.get("created_at")
        cv_updated_at_str = cv_record.get("updated_at")

        return UserProfileResponse(
            id=UUID(str(profile_record.get("id", user_id))),
            full_name=profile_record.get("full_name", ""),
            date_of_birth=as_datetime_or_default(
                profile_record.get("date_of_birth"), now
            ).date(),
            gender=profile_record.get("gender", ""),
            phone_number=profile_record.get("phone_number", ""),
            address=profile_record.get("address", ""),
            cv_content=cv_record.get("cv_full_text", ""),
            created_at=as_datetime_or_default(cv_created_at_str, now),
            updated_at=as_datetime_or_default(cv_updated_at_str, now),
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )


# ------------------------------------------------------------------
# GET /users/me/cv  -> fetch profile + CV
# ------------------------------------------------------------------
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
            detail="User profile not found. Please create your profile first.",
        )
    profile_record = profile_response.data[0]

    cv_response = (
        supabase.table("cv_documents")
        .select("cv_full_text, created_at, updated_at")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    cv_record = cv_response.data[0] if cv_response.data else {}

    now = datetime.now(timezone.utc)
    cv_created_at_str = cv_record.get("created_at")
    cv_updated_at_str = cv_record.get("updated_at")

    return UserProfileResponse(
        id=UUID(str(profile_record.get("id", user_id))),
        full_name=profile_record.get("full_name", ""),
        date_of_birth=as_datetime_or_default(
            profile_record.get("date_of_birth"),
            now,
        ).date(),
        gender=profile_record.get("gender", ""),
        phone_number=profile_record.get("phone_number", ""),
        address=profile_record.get("address", ""),
        cv_content=cv_record.get("cv_full_text", ""),
        created_at=as_datetime_or_default(
            cv_created_at_str,
            now,
        ),
        updated_at=as_datetime_or_default(
            cv_updated_at_str,
            now,
        ),
    )