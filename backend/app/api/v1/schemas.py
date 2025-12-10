from pydantic import BaseModel

class CoverLetterCreate(BaseModel):
    content: str
    job_application_id: str