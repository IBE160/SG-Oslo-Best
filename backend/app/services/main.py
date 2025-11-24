from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

# Import av databasefunksjonen
try:
    from app.db.supabase import fetch_user_applications
except ImportError:
    print("Warning: Could not import fetch_user_applications")
    fetch_user_applications = lambda x: []

app = FastAPI()

# --- CORS (Viktig for at Frontend skal kunne snakke med Backend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CoverLetterRequest(BaseModel):
    user_id: str
    job_description: str
    resume_text: str
    instructions: Optional[str] = None

@app.post("/api/v1/analyze-cv")
async def analyze_cv(request: CoverLetterRequest):
    return {
        "match_score": 85,
        "missing_keywords": ["Teamwork", "Python"],
        "optimization_summary": "God match, men legg til flere nøkkelord.",
        "generated_cover_letter": f"Dette er et generert brev for jobben: {request.job_description[:50]}..."
    }

@app.get("/api/v1/applications/history")
async def get_application_history(user_id: str):
    print(f"Mottok forespørsel om historikk for user_id: {user_id}")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    applications = fetch_user_applications(user_id)
    return applications
