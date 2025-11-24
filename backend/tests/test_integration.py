import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from unittest.mock import patch
from uuid import uuid4

# Importer de nødvendige modulene fra din applikasjon
from app.services.main import app
from app.db.session import get_db
from app.db.models.base import Base
# Antar at CVEntry er definert her. Endre om din fil er annerledes.
from app.db.models.cv_model import CVEntry 
from app.schemas.analysis_schema import AIAnalysisResult # Pydantic-skjema

# ---------------------------------------------
# 1. TEST SETUP: IN-MEMORY DATABASE (SQLite)
# ---------------------------------------------

# Bruk SQLite in-memory for testing - raskt og isolert
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool, # Viktig for in-memory SQLite i FastAPI
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture()
def session_fixture():
    # Oppretter alle tabellene (CVEntry, Profile, etc.) i test-databasen
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Sletter tabellene etter testen er ferdig
        Base.metadata.drop_all(bind=engine)

# Override funksjonen for å tvinge appen til å bruke test-databasen
def override_get_db(db_session):
    def _get_db_override():
        yield db_session
    return _get_db_override

@pytest.fixture()
def client_fixture(session_fixture):
    # Injiserer test-databasen inn i FastAPI-applikasjonen
    app.dependency_overrides[get_db] = override_get_db(session_fixture)
    # Bruk TestClient for å simulere HTTP-forespørsler
    with TestClient(app) as client:
        yield client
    # Rydd opp etter testen
    app.dependency_overrides.clear()


# ---------------------------------------------
# 2. MOCKING: SIMULERE AI-SVARET
# ---------------------------------------------

# Definer det faste, forventede svaret fra den mockede LLM-tjenesten
MOCK_ANALYSIS_RESULT = AIAnalysisResult(
    match_score=92,
    missing_keywords=["Alembic Migrations", "Zustand State Management"],
    optimization_summary="Fokus på å inkludere backend migrasjonsverktøy og moderne frontend state management for å øke scoren."
)

# ---------------------------------------------
# 3. TEST CASES
# ---------------------------------------------

def test_health_check_endpoint(client_fixture):
    """Tester at GET /health returnerer OK."""
    response = client_fixture.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "CVAI-TURBO API"}


@patch('app.services.llm_service.analyze_cv', return_value=MOCK_ANALYSIS_RESULT)
def test_analyze_cv_success(mock_analyze_cv, client_fixture, session_fixture):
    """
    Tester flyten: API-kall -> LLM-mocking -> DB-lagring.
    """
    
    # 1. Sett opp test-data
    test_user_id = str(uuid4())
    request_data = {
        "resume_text": "Min CV...",
        "job_description": "Søker utvikler...",
        "user_id": test_user_id
    }
    
    # 2. Utfør API-kallet
    response = client_fixture.post("/api/v1/analyze-cv", json=request_data)
    
    # 3. Assertions (API-svaret)
    assert response.status_code == 200
    # Verifiser at responsen er nøyaktig det mockede resultatet
    assert response.json() == MOCK_ANALYSIS_RESULT.model_dump()
    
    # 4. Verifiser at LLM-tjenesten ble kalt korrekt
    mock_analyze_cv.assert_called_once()
    
    # 5. Assertions (Database-lagring)
    # Tell antall poster i CVEntry-tabellen i in-memory DB
    entries = session_fixture.query(CVEntry).all()
    
    # Sjekk at nøyaktig én post ble lagret
    assert len(entries) == 1
    
    # Sjekk innholdet i den lagrede posten
    saved_entry = entries[0]
    assert str(saved_entry.user_id) == test_user_id
    assert saved_entry.raw_text == request_data["resume_text"]
    assert saved_entry.analysis_json["match_score"] == 92