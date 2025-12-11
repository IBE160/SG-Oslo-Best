from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel
from typing import Optional, Annotated
import google.generativeai as genai
from ...core.dependencies import get_current_user_id
from ...core.config import settings

router = APIRouter()

# Configure Gemini
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

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
):
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Gemini API key is not configured.",
        )

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
        Write a professional and compelling cover letter.

        --- CV ---
        {request.user_cv}

        --- Job Advertisement ---
        {request.job_ad}

        --- Instructions ---
        {request.instructions or "No specific instructions provided."}

        The cover letter should be personalized, relevant and well-structured.
        """

        # ASYNC Gemini call
        response = await model.generate_content_async(prompt)

        # Extract text safely
        if response and response.candidates:
            text = response.candidates[0].content.parts[0].text
        else:
            raise Exception("Gemini returned an empty response.")

        return GenerationResponse(generated_text=text)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Generation error: {e}",
        )
