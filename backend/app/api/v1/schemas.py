# backend/app/api/v1/schemas.py

from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional
from uuid import UUID


# ---------------------------------------------------------
# COVER LETTER SCHEMAS (these were correct)
# ---------------------------------------------------------
class CoverLetterCreate(BaseModel):
    content: str
    job_application_id: str


class CoverLetter(CoverLetterCreate):
    id: str


# ---------------------------------------------------------
# CREATE PROFILE + CV
# The backend expects these exact fields.
# ---------------------------------------------------------
class UserProfileCreate(BaseModel):
    full_name: str
    date_of_birth: date
    gender: str
    phone_number: str
    address: str
    cv_content: str


# ---------------------------------------------------------
# PARTIAL UPDATE (PATCH)
# ---------------------------------------------------------
class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    cv_content: Optional[str] = None


# ---------------------------------------------------------
# RESPONSE MODEL RETURNED BY API
# ---------------------------------------------------------
class UserProfileResponse(BaseModel):
    id: UUID
    full_name: str
    date_of_birth: date
    gender: str
    phone_number: str
    address: str
    cv_content: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
