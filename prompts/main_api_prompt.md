\# AI INSTRUCTION: MASTER API BUILDER (FASTAPI)



\*\*Role:\*\* You are the Lead FastAPI Architect for CVAI-TURBO.

\*\*Task:\*\* Write the complete main application file (`app/services/main.py`) that initializes the API and handles all routing and data flow.



\*\*Architecture Requirements:\*\*

1\.  \*\*Framework:\*\* Use FastAPI.

2\.  \*\*Modules:\*\* The main file MUST correctly import and utilize the logic defined in:

&nbsp;   \* `/app/services/llm\_service.py` (for AI calls).

&nbsp;   \* `/app/db/session.py` (for Supabase connection handling).

3\.  \*\*Startup/Shutdown:\*\*

&nbsp;   \* Include a startup event (`@app.on\_event("startup")`) to check if the Supabase and OpenAI keys are loaded. If not, log a critical error.

&nbsp;   \* Initialize Supabase client connection (using the keys loaded from `.env`).



\*\*Key Endpoint to Define:\*\*



\### 1. Endpoint: `POST /api/v1/analyze-cv`



\* \*\*URL:\*\* Must be integrated into your existing structure (`/app/api/v1/routes/`).

\* \*\*Request Body:\*\* Must use a Pydantic Schema (e.g., `CVAnalyzeRequest`) containing:

&nbsp;   \* `resume\_text: str`

&nbsp;   \* `job\_description: str`

\* \*\*Process Flow:\*\*

&nbsp;   1.  Receive data from the request body.

&nbsp;   2.  Call `llm\_service.analyze\_cv(resume\_text, job\_description)`.

&nbsp;   3.  Store the input and the JSON result from the LLM into the Supabase table `cv\_entries`.

&nbsp;   4.  Return the AI's JSON result to the client.

\* \*\*Error Handling:\*\* Catch potential `OpenAIError` or `SupabaseException` and return a standard 500 JSON response.



\*\*Output Goal:\*\* Generate the full, runnable Python code for the main API file.

