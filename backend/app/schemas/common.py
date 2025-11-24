from typing import Optional
from uuid import UUID, uuid4
from datetime import datetime

from pydantic import BaseModel, Field


class IDModel(BaseModel):
    id: UUID = Field(default_factory=uuid4, description="Unique identifier")


class Timestamped(BaseModel):
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")

class Msg(BaseModel):
    message: str = Field(..., description="Human readable message")
