# backend/app/api/v1/schemas.py

from datetime import date, datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr

class UserProfileCreate(BaseModel):
    full_name: str
    date_of_birth: date
    gender: str
    phone_number: str
    address: str
    cv_content: str

class CVUpdate(BaseModel):
    cv_full_text: Optional[str] = None # Optional for partial update

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    cv_full_text: Optional[str] = None # Renamed from cv_content to match DB

class UserProfileResponse(BaseModel):
    id: UUID
    full_name: str
    date_of_birth: date
    gender: str
    phone_number: str
    address: str
    cv_content: str
    created_at: datetime # Changed to datetime
    updated_at: datetime # Changed to datetime
