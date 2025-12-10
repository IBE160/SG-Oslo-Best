from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from backend.app.core.dependencies import get_db, get_current_user_id
from backend.app.api.v1.schemas import CoverLetterCreate

router = APIRouter()

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
