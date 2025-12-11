from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from typing import List
from app.core.dependencies import get_db, get_current_user_id
from app.api.v1.schemas import CoverLetterCreate, CoverLetter

router = APIRouter()

@router.get("/", response_model=List[CoverLetter])
def get_cover_letters(
    supabase: Client = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    response = (
        supabase.table("cover_letters")
        .select("*")
        .eq("user_id", user_id)
        .execute()
    )
    if response.data:
        return response.data
    return []

@router.post("/")
def save_cover_letter(
    cover_letter: CoverLetterCreate,
    supabase: Client = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    response = (
        supabase.table("cover_letters")
        .insert({
            "content": cover_letter.content,
            "job_application_id": cover_letter.job_application_id,
            "user_id": user_id,
        })
        .execute()
    )

    if response.data:
        return {"message": "Cover letter saved", "id": response.data[0]["id"]}
    else:
        raise HTTPException(status_code=500, detail="Failed to save cover letter")
