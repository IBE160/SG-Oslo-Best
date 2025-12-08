import logging
from fastapi import FastAPI
from .db.supabase_client import supabase

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# @app.on_event("startup")
# async def startup_event():
#     try:
#         # Perform a simple query to check the connection
#         response = supabase.from_('supabase_migrations.schema_migrations').select('version').limit(1).execute()
#         logger.info("Supabase connection successful.")
#     except Exception as e:
#         logger.error(f"Supabase connection failed: {e}", exc_info=True)
#         # Depending on criticality, you might want to raise the exception here
#         # raise Exception("Failed to connect to Supabase during startup") from e


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
