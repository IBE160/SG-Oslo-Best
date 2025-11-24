# AI INSTRUCTION: INTEGRATION TEST SUITE

**Role:** You are the Lead QA Automation Engineer.
**Task:** Write the complete integration test suite for the FastAPI backend (`test_integration.py`).

**Technology Requirements:**
* Test Framework: **pytest**
* HTTP Client: **FastAPI TestClient** (fra `starlette.testclient`)
* Dependencies: Must mock the database session and LLM calls to isolate the test environment.

**Core Tests to Implement:**

### 1. Test Setup:
* Create a pytest fixture for the `TestClient` instance of the FastAPI app (`app/services/main.py`).
* Create a test-database session fixture that overrides the `get_db` dependency to use an in-memory **SQLite database** for fast, isolated testing. This prevents tests from actually writing to Supabase.
* **MOCKING:** Crucially, mock the `llm_service.analyze_cv` function to **always return a fixed, valid `AIAnalysisResult` object** instead of calling the real Gemini API. This makes the test fast and deterministic.

### 2. `test_health_check_endpoint()`
* **Purpose:** Verify that GET `/health` returns status code 200 and `{"status": "ok"}`.

### 3. `test_analyze_cv_success()`
* **Endpoint:** POST `/api/v1/analyze-cv`
* **Purpose:** Test den komplette flyten fra mottakelse til lagring.
* **Steg:**
    1. Send et gyldig `CVAnalyzeRequest` (med dummy-tekst).
    2. Verifiser at responsstatuskoden er **200 OK**.
    3. Verifiser at respons-JSON-en nøyaktig matcher det mockede `AIAnalysisResult`-objektet (fra mocking-steget).
    4. **Viktig:** Bruk test-sessionen til å sjekke at **nøyaktig én ny rad** ble lagt til i `cv_entries`-tabellen i den in-memory databasen etter API-kallet.

**Output Goal:** Generate the complete, runnable Python code for the file `tests/test_integration.py`.
