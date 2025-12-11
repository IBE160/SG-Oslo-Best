from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel
from typing import Optional, Annotated, List
from supabase import Client
from ...core.dependencies import get_current_user_id, get_db

router = APIRouter()

# --- Pydantic Models ---
class JobApplicationCreate(BaseModel):
    jobAdvertisementText: str
    instructionsText: Optional[str] = None

class JobApplicationUpdate(BaseModel):
    jobAdvertisementText: Optional[str] = None
    instructionsText: Optional[str] = None

class JobApplicationResponse(BaseModel):
    id: str
    jobAdvertisementText: str
    instructionsText: Optional[str]
    status: str

class JobApplicationListResponse(BaseModel):
    items: List[JobApplicationResponse]

# --- Create Job Application ---
@router.post("/job-applications", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_job_application(
    application: JobApplicationCreate,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    try:
        job_application_data = {
            "user_id": user_id,
            "job_advertisement_text": application.jobAdvertisementText,
            "instructions_text": application.instructionsText,
            "status": "received",
        }

        response = supabase.table("job_applications").insert(job_application_data).execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create job application.",
            )

        created_application = response.data[0]

        return JobApplicationResponse(
            id=created_application["id"],
            jobAdvertisementText=created_application["job_advertisement_text"],
            instructionsText=created_application["instructions_text"],
            status=created_application["status"],
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )


# --- Get Single Job Application ---
@router.get("/job-applications/{job_application_id}", response_model=JobApplicationResponse)
async def get_job_application(
    job_application_id: str,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    try:
        response = supabase.table("job_applications") \
            .select("*") \
            .eq("id", job_application_id) \
            .eq("user_id", user_id) \
            .single() \
            .execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found.")

        app = response.data

        return JobApplicationResponse(
            id=app["id"],
            jobAdvertisementText=app["job_advertisement_text"],
            instructionsText=app["instructions_text"],
            status=app["status"],
        )

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An error occurred: {e}")


# --- Update Job Application ---
@router.patch("/job-applications/{job_application_id}", response_model=JobApplicationResponse)
async def update_job_application(
    job_application_id: str,
    application_update: JobApplicationUpdate,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    try:
        # Verify the application belongs to this user
        response = supabase.table("job_applications") \
            .select("id") \
            .eq("id", job_application_id) \
            .eq("user_id", user_id) \
            .execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found.")

        # Convert frontend camelCase → database snake_case
        mapped_update = {}
        if application_update.jobAdvertisementText is not None:
            mapped_update["job_advertisement_text"] = application_update.jobAdvertisementText
        if application_update.instructionsText is not None:
            mapped_update["instructions_text"] = application_update.instructionsText

        if not mapped_update:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update."
            )

        update_response = supabase.table("job_applications") \
            .update(mapped_update) \
            .eq("id", job_application_id) \
            .execute()

        if not update_response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update job application."
            )

        updated = update_response.data[0]

        return JobApplicationResponse(
            id=updated["id"],
            jobAdvertisementText=updated["job_advertisement_text"],
            instructionsText=updated["instructions_text"],
            status=updated["status"],
        )

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )


# --- List Job Applications ---
@router.get("/job-applications", response_model=JobApplicationListResponse)
async def get_job_applications(
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    try:
        response = supabase.table("job_applications") \
            .select("*") \
            .eq("user_id", user_id) \
            .execute()

        if not response.data:
            return JobApplicationListResponse(items=[])

        items = [
            JobApplicationResponse(
                id=app["id"],
                jobAdvertisementText=app["job_advertisement_text"],
                instructionsText=app["instructions_text"],
                status=app["status"],
            )
            for app in response.data
        ]

        return JobApplicationListResponse(items=items)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )


# --- Delete Job Application ---
@router.delete("/job-applications/{job_application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job_application(
    job_application_id: str,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    try:
        # Verify the application belongs to user
        response = supabase.table("job_applications") \
            .select("id") \
            .eq("id", job_application_id) \
            .eq("user_id", user_id) \
            .execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found.")

        delete_response = supabase.table("job_applications") \
            .delete() \
            .eq("id", job_application_id) \
            .execute()

        if not delete_response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete job application."
            )

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {e}",
        )
