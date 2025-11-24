import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from typing import Generator

# Laster miljøvariabler fra .env-filen (SUPABASE_URL, DATABASE_URL, etc.)
load_dotenv()

# Hent den fulle Postgres-tilkoblingsstrengen fra .env (Kreves av SQLAlchemy)
DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    # Feilmelding dersom DATABASE_URL ikke er satt i .env-filen.
    raise EnvironmentError(
        "DATABASE_URL mangler i .env-filen. Vennligst legg inn den fulle Postgres-strengen."
    )

# Opprett database-motoren (Engine)
# pool_pre_ping sikrer at tilkoblingen er testet før bruk.
engine = create_engine(
    DATABASE_URL, 
    pool_pre_ping=True
)

# Definer SessionLocal
# Dette er en klasse som vil opprette en ny, uavhengig databaseøkt for hver forespørsel.
SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False,  
    bind=engine       
)

# --- FastAPI Dependency Funksjon ---
# Denne funksjonen brukes i FastAPI for å injisere en database-session i dine API-endepunkter.
def get_db() -> Generator:
    """Gir en uavhengig database-session for hver API-forespørsel."""
    db = SessionLocal()
    try:
        # Sender økten til funksjonen som kaller den (f.eks. en /analyze rute)
        yield db
    finally:
        # Lukker økten uansett om det skjedde en feil eller ikke
        db.close()