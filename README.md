# SG-Oslo-Best 

Repository for SG-Oslo-Best - IBE160 Programmering med KI. 

 

--- 

 

# CVAI – AI-based Cover Letter Generator 

 

CVAI is a full-stack web application that helps users generate professional and tailored cover letters based on their own CV and a job advertisement. 

The application uses a third-party Large Language Model (LLM) to produce high-quality job applications with minimal effort from the user. 

 

This project is delivered as part of Phase 4 and focuses on functionality, structure and practical usability. 

 

--- 

 

## How the application works 

 

1. The user logs in or creates an account 

2. The user uploads or pastes their CV (plain text) 

3. The user adds a job advertisement (plain text) 

4. Optional instructions can be provided to adjust tone or style 

5. The backend sends the data to an LLM 

6. A tailored cover letter is generated and shown in the UI 

 

--- 

 

## Frontend 

 

Tech stack: 

- Next.js (App Router) 

- TypeScript 

- Tailwind CSS 

- Supabase Authentication 

- shadcn/ui 

 

--- 

 

### Frontend environment variables 

 

Create a file called **`.env.local`** inside the `frontend` folder: 

 

``env 

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 

 

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co 

NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_SUPABASE_ANON_KEY 

 

Explanation 

- NEXT_PUBLIC_API_URL – URL of the backend API 

- NEXT_PUBLIC_SUPABASE_URL – Supabase project URL 

- NEXT_PUBLIC_SUPABASE_ANON_KEY – Public (anonymous) Supabase key used for client-side authentication 

 

**Start frontend:** 

 

cd frontend 

npm install 

npm run dev 

 

**Frontend runs on:** 

http://localhost:3000 

 

--- 

 

## Backend 

 

Tech stack: 

- Python 

- FastAPI 

- Uvicorn 

- Third-party LLM integration 

 

### Backend environment variables 

Create a file called .env inside the backend folder: 

 

SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co 

SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY 

 

OPENAI_API_KEY=YOUR_LLM_API_KEY 

OPENAI_MODEL=gpt-4o-mini 

 

Explanation 

- SUPABASE_URL – Supabase project URL 

- SUPABASE_SERVICE_ROLE_KEY – Server-side key used by the backend 

- OPENAI_API_KEY – API key for the LLM provider 

- OPENAI_MODEL – Model used for cover letter generation 

 

Required Python libraries: 

- fastapi 

- uvicorn 

- python-dotenv 

- requests 

 

**Start backend:** 

 

cd backend 

python -m venv .venv 

 

**Activate virtual environment (Windows):** 

.\.venv\Scripts\activate 

 

**Install dependencies:** 

pip install -r requirements.txt 

 

**Start backend server:** 

uvicorn app.main:app --reload 

 

**Backend runs on:** 

http://localhost:8000 

 

**API documentation:** 

http://localhost:8000/docs 

 

--- 

 

## Features 

 

- User authentication 

- Create, update and delete a single CV (plain text) 

- CV profile section 

- Job advertisement input 

- Optional instructions for tone and style 

- AI-generated cover letters 

- Multiple generated versions per job application 

 

--- 

 

## Notes for evaluation 

- `.env` and `.env.local` files are intentionally excluded from the repository 

- All required environment variables are documented using placeholders 

- Evaluators are not expected to run the application without providing their own credentials 

- The focus of the project is architecture, data flow and correct use of external services 

 

--- 

 

## Project status 

 

This project is a functional prototype intended for academic delivery and demonstration purposes. 

Focus has been placed on clean structure, working flow and realistic user interaction. 

 

--- 