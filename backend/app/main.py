import logging
from fastapi import FastAPI, HTTPException
from .db.supabase_client import supabase
from pydantic import BaseModel
from .api.v1 import auth as auth_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.include_router(auth_router.router, prefix="/api/v1/auth", tags=["auth"])

@app.on_event("startup")
async def startup_event():
    if supabase is None:
        logger.warning("Supabase is not initialized; skipping startup check")
        return

    try:
        # Simple ping against a real table
        supabase.table("job_applications").select("id").limit(1).execute()
        logger.info("Supabase connection successful.")
    except Exception as e:
        logger.error(f"Supabase connection failed: {e}", exc_info=True)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# TEMP until you hook up real auth
FAKE_USER_ID = "7ad76912-1e41-49ab-995b-7cf0c1c7a583"


class CvPayload(BaseModel):
    cv_full_text: str


class JobApplicationPayload(BaseModel):
    title: str | None = None
    company: str | None = None
    job_ad_text: str
    instructions: str | None = None


@app.get("/cv")
def get_cv():
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase not initialized")

    resp = (
        supabase.table("cv_documents")
        .select("*")
        .eq("user_id", FAKE_USER_ID)
        .single()
        .execute()
    )

    if resp.data is None:
        return {"user_id": FAKE_USER_ID, "cv_full_text": ""}

    return resp.data


@app.post("/cv")
def upsert_cv(payload: CvPayload):
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase not initialized")

    row = {
        "user_id": FAKE_USER_ID,
        "cv_full_text": payload.cv_full_text,
    }

    resp = supabase.table("cv_documents").upsert(row).execute()
    return resp.data


@app.post("/job-applications")
def create_job_application(payload: JobApplicationPayload):
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase not initialized")

    row = {
        "user_id": FAKE_USER_ID,
        "title": payload.title,
        "company": payload.company,
        "job_ad_text": payload.job_ad_text,
        "instructions": payload.instructions,
    }

    resp = supabase.table("job_applications").insert(row).execute()
    return resp.data

