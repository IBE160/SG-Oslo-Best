import os
import json
from dotenv import load_dotenv
from openai import OpenAI, APIError
from app.schemas.analysis_schema import AIAnalysisResult # Vi bruker Pydantic-skjemaet for validering

# Laster miljøvariabler (inkludert OPENAI_API_KEY) fra .env
load_dotenv()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o") # Bruker gpt-4o som standard

# Initialiser OpenAI klienten
client = OpenAI(api_key=OPENAI_API_KEY)

# System Prompt fra llm_handler_prompt.md
SYSTEM_PROMPT = (
    "You are a ruthless, highly efficient Career Optimization Specialist focused on the Norwegian tech market. "
    "Your goal is to maximize the CV's score against the job description. Output must be structured JSON. "
    "The JSON structure must strictly follow the requirements: {'match_score': int, 'missing_keywords': list[str], 'optimization_summary': str}."
)

def analyze_cv(resume_text: str, job_description: str) -> AIAnalysisResult:
    """
    Kaller OpenAI for å analysere CV-tekst mot en stillingsbeskrivelse og returnerer et AIAnalysisResult objekt.
    """
    if not OPENAI_API_KEY:
        raise ValueError("❌ FEIL: OPENAI_API_KEY mangler i .env-filen.")

    user_content = (
        f"--- CV TEXT ---\n{resume_text}\n\n"
        f"--- JOB DESCRIPTION ---\n{job_description}\n\n"
        "ANALYZE the CV against the job description and return the structured JSON only. DO NOT INCLUDE ANY PROSE OR MARKDOWN."
    )

    try:
        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content}
            ],
            # Krever JSON-respons fra OpenAI
            response_format={"type": "json_object"} 
        )
        
        # Parse JSON output og valider mot Pydantic-skjemaet
        json_content = json.loads(response.choices[0].message.content)
        return AIAnalysisResult(**json_content)

    except APIError as e:
        raise RuntimeError(f"OpenAI API Feil: {e}") from e
    except json.JSONDecodeError as e:
        raise RuntimeError(f"AI returnerte ugyldig JSON. Sjekk system prompt: {e}") from e


def generate_summary(cv_text: str) -> str:
    """
    Genererer en kort, slagkraftig profesjonell oppsummering (uten strukturert output).
    """
    if not OPENAI_API_KEY:
        raise ValueError("❌ FEIL: OPENAI_API_KEY mangler i .env-filen.")

    summary_prompt = (
        "Based on the following CV text, generate a short, impactful, and results-oriented "
        "professional summary suitable for the top of the CV. Max 4 sentences."
    )

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": "You are a professional copywriter."},
            {"role": "user", "content": summary_prompt + f"\n\nCV Text: {cv_text}"}
        ]
    )
    
    return response.choices[0].message.content.strip()

if __name__ == '__main__':
    print("Test mode: LLM service module is ready.")