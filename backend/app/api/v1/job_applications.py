from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel
from typing import Optional, Annotated
from supabase import Client
from ...core.dependencies import get_current_user_id, get_db

router = APIRouter()

# --- Pydantic Models (Viktig: Må arve fra BaseModel) ---
class JobApplicationCreate(BaseModel):
    jobAdvertisementText: str
    instructionsText: Optional[str] = None

class JobApplicationResponse(BaseModel):
    id: str
    jobAdvertisementText: str
    instructionsText: Optional[str]
    status: str

# --- Endpoints ---
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
