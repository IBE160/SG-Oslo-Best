# backend/app/api/v1/schemas.py

from datetime import date
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

class UserProfileResponse(BaseModel):
    id: UUID
    full_name: str
    date_of_birth: date
    gender: str
    phone_number: str
    address: str
    cv_content: str
    created_at: date
    updated_at: date
