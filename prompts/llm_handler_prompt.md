\# AI INSTRUCTION: LLM SERVICE HANDLER (PYTHON)



\*\*Role:\*\* You are the Lead AI Developer.

\*\*Task:\*\* Write the core Python service (`llm\_service.py`) responsible for communication with the OpenAI API for CV analysis.



\*\*Dependencies:\*\*

\* Requires `openai` library.

\* Must load `OPENAI\_API\_KEY` from the environment (using the same `dotenv` logic as the database test).



\*\*Core Functions to Implement:\*\*



\### 1. `def analyze\_cv(resume\_text: str, job\_description: str) -> dict:`

\* \*\*Purpose:\*\* Takes the user's CV text and a job description and prompts the AI for feedback.

\* \*\*System Prompt:\*\* Use the following system prompt to guide the analysis:

&nbsp;   > "You are a ruthless, highly efficient Career Optimization Specialist focused on the Norwegian tech market. Your goal is to maximize the CV's score against the job description. Output must be structured JSON."

\* \*\*Output Format (JSON):\*\* Must return a structured JSON object containing:

&nbsp;   \* `match\_score`: Integer (0-100).

&nbsp;   \* `missing\_keywords`: List\[str] (Keywords from the job description missing in the CV).

&nbsp;   \* `optimization\_summary`: str (Max 3 concise bullet points for improvement).



\### 2. `def generate\_summary(cv\_text: str) -> str:`

\* \*\*Purpose:\*\* Generates a short, impactful professional summary suitable for the top of the CV.

\* \*\*Tone:\*\* Confident and results-oriented.



\*\*Output Goal:\*\* Generate the complete, production-ready Python file `llm\_service.py`.

