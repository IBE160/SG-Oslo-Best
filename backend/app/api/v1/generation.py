from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel
from typing import Optional, Annotated
from supabase import Client
from ...core.dependencies import get_current_user_id, get_db

router = APIRouter()

class GenerationRequest(BaseModel):
    job_ad: str
    instructions: Optional[str] = None
    user_cv: str

class GenerationResponse(BaseModel):
    generated_text: str

@router.post("/generation", response_model=GenerationResponse, status_code=status.HTTP_200_OK)
async def generate_cover_letter(
    request: GenerationRequest,
    user_id: Annotated[str, Depends(get_current_user_id)],
    supabase: Annotated[Client, Depends(get_db)],
):
    # This is a mock implementation.
    # In a real implementation, this would call the Gemini API.
    
    # For now, just echoing back a constructed string.
    generated_text = f"Based on your CV and the job ad for '{request.job_ad}', here is your cover letter."
    if request.instructions:
        generated_text += f"\n\nInstructions: {request.instructions}"
    
    return GenerationResponse(generated_text=generated_text)