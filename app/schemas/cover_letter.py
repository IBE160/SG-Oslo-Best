from pydantic import BaseModel, Field, constr
from typing import Optional
from uuid import UUID, uuid4

# Common types and base schema used across the package
TextStr = constr(min_length=1, max_length=10000)

class BaseSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: Optional[UUID] = Field(default=None)

    class Config:
        orm_mode = True
        json_encoders = {UUID: lambda u: str(u)}
from datetime import datetime

class CoverLetter(BaseModel):
    text: str

class CoverLetterOut(CoverLetter):
    id: str
    user_id: str
    created_at: datetime
