import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import CORSMiddleware

from .api.v1 import auth as auth_router
from .api.v1 import users as users_router
from .api.v1 import job_applications as job_applications_router
from .api.v1 import generation as generation_router
from .api.v1 import cover_letters as cover_letters_router
from .core.dependencies import get_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Frontend development server
    # Add any other origins you need to allow
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"], # Allow all headers
)

# Routers
app.include_router(auth_router.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users_router.router, prefix="/api/v1", tags=["users"])
app.include_router(job_applications_router.router, prefix="/api/v1", tags=["job-applications"])
app.include_router(generation_router.router, prefix="/api/v1", tags=["generation"])
app.include_router(cover_letters_router.router, prefix="/api/v1/cover-letters", tags=["cover-letters"])



@app.on_event("startup")
async def startup_event():
    """
    Simple Supabase connectivity check at startup.
    Uses an existing table (job_applications) instead of the old 'users' table.
    """
    supabase = get_db()

    if supabase is None:
        logger.warning("Supabase is not initialized; skipping startup check.")
        return

    try:
        # Ping a real table that exists in your schema
        supabase.table("job_applications").select("id").limit(1).execute()
        logger.info("Supabase connection successful.")
    except Exception as e:
        logger.error("Supabase connection failed: %s", e, exc_info=True)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def health_check():
    return {"status": "ok"}

