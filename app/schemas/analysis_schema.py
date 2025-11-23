from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

# --- 1. Skjema for INNPUTT til API (Hva brukeren sender) ---
class CVAnalyzeRequest(BaseModel):
    """Definerer strukturen for data som sendes til /analyze-cv endepunktet."""
    
    # Råteksten fra CV-en (må være streng og finnes)
    resume_text: str
    
    # Stillingsbeskrivelsen (må være streng og finnes)
    job_description: str

    # Valgfri felt for å lagre bruker-ID hvis appen håndterer økter (sessions)
    user_id: Optional[UUID] = None 


# --- 2. Skjema for UTGÅENDE data fra AI-analyse (Matcher LLM Prompten!) ---
# Dette sikrer at AI-ens JSON-respons valideres.
class AIAnalysisResult(BaseModel):
    """Definerer den forventede strukturen på JSON-outputen fra LLM-tjenesten."""
    
    # Score fra 0 til 100
    match_score: int
    
    # Liste over nøkkelord som mangler i CV-en
    missing_keywords: List[str]
    
    # Oppsummering av forbedringer
    optimization_summary: str 


# --- 3. Skjema for FULL Database-respons (Hva APIet returnerer etter lagring) ---
class CVEntryResponse(BaseModel):
    """Representerer den komplette posten som lagres i databasen og returneres til klienten."""

    id: UUID
    user_id: UUID
    
    # Tekst og analyse-JSON hentet fra DB
    raw_text: str
    analysis_data: AIAnalysisResult # Bruker skjemaet over
    
    created_at: datetime

    # Konfigurasjon for å håndtere SQLAlchemy ORM-objekter
    class Config:
        from_attributes = True 
        json_encoders = {
            # Sikrer at UUID-objekter serialiseres riktig
            UUID: str, 
        }