# CVAI Turbo: Fullstack AI Cover Letter Generator

Dette er den fullførte koden for en fullstack AI-drevet applikasjon bygget med Next.js (Frontend) og FastAPI (Backend) for å generere optimaliserte jobbsøknader basert på brukerens lagrede CV og en spesifikk stillingsbeskrivelse.

Prosjektet følger en detaljert UX/UI-design og implementerer tre hovedflyter:
1.  **Flow 1: Authentication & Profile:** Sikker brukerautentisering og lagring av profil/CV-data i Supabase.
2.  **Flow 2: Core Generation:** Analyse av CV mot stillingsbeskrivelse (match score, nøkkelord) og generering av et skreddersydd følgebrev via FastAPI.
3.  **Flow 3: Application History:** Gjennomgang og nedlasting av alle tidligere lagrede søknader.

## 🚀 Teknisk Stabel

| Del | Teknologi | Funksjon |
| :--- | :--- | :--- |
| **Frontend** | Next.js, React, Tailwind CSS | Brukergrensesnitt, Auth Context, API-kall. |
| **Backend** | Python, FastAPI | Håndterer AI-analyse, validering, og forbereder data. |
| **Database** | Supabase (PostgreSQL) | PostgreSQL Database, Autentisering (Auth), RLS, og Lagring av brukerdata og søknadshistorikk. |
| **AI** | [Simulert] LLM-kall | Brukes for matching, optimalisering og generering av tekst. |

## ⚙️ Oppsett og Kjøring

Applikasjonen krever at både backend (FastAPI) og frontend (Next.js) kjører samtidig.

### Steg 0: Konfigurasjon (Supabase)

Før du starter, må du sikre at du har fylt ut følgende miljøvariabler:

* **Frontend (`frontend/.env.local`):**
    ```
    NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=din_anon_key
    ```
* **Backend (`.env` i roten):**
    ```
    SUPABASE_URL=din_supabase_url
    SUPABASE_KEY=din_service_role_key # (Anbefalt for backend-tilgang)
    OPENAI_API_KEY=din_openai_key # (For LLM/AI-funksjonalitet)
    ```

### Steg 1: Start Backend (FastAPI)

Naviger til rotmappen, aktiver det virtuelle miljøet ditt (hvis du bruker det), og start serveren.

```bash
# Aktivering (velg riktig sti for din terminal)
# Windows/CMD: .\venv\Scripts\activate.bat
# Windows/Git Bash (vanligst): source venv/Scripts/activate

# Installer avhengigheter (om ikke gjort)
pip install -r requirements.txt

# Start serveren (lytter på [http://127.0.0.1:8000](http://127.0.0.1:8000))
uvicorn app.services.main:app --reload
