# Story 3.2: Generate Cover Letter

Status: done

## Story

As a logged-in student user,
I want to click a "Generate" button to create a cover letter,
so that I can receive an AI-drafted letter tailored to the job.

## Acceptance Criteria

1.  Given I have provided a job advertisement and clicked "Generate", when the generation process begins, then all input fields are temporarily disabled.
2.  And the UI shows the "Generation Status Indicator" (Story 3.8).
3.  And the backend receives the necessary data, integrates with the Gemini API, and returns the generated text.
4.  When the generation is complete, the generated cover letter text is returned to the frontend.

## Tasks / Subtasks

- [ ] **Backend:** Create `POST /api/v1/generation` endpoint. (AC: #3)
    - [ ] Endpoint should accept user's CV data, job advertisement, and optional instructions.
    - [ ] Service layer should call the Gemini API with the provided data.
    - [ ] Endpoint should return the generated cover letter text.
- [ ] **Frontend:** Implement the "Generate" button logic. (AC: #1, #2, #4)
    - [ ] On click, disable the input fields.
    - [ ] Display the "Generation Status Indicator" component.
    - [ ] Call the `POST /api/v1/generation` endpoint using React Query.
    - [ ] On success, hide the status indicator and display the returned text.
    - [ ] On error, hide the status indicator and show an error message.
- [ ] **Testing:** Add Playwright E2E test for the generation flow. (AC: #1, #2, #4)
    - [ ] Test that input fields are disabled during generation.
    - [ ] Test that the loading indicator is displayed.
    - [ ] Mock the API response and test that the generated text is displayed correctly.

## Dev Notes

- **Architecture:** Use React Query for managing the API call's state (loading, error, success) as per `docs/architecture.md`. The backend endpoint should follow the defined API contract standards.
- **Gemini Integration:** The backend service will need to handle the integration with the Gemini API, including managing API keys securely.

### Project Structure Notes

- **Backend:** The new generation logic should be in `backend/app/api/v1/generation.py` and a corresponding service in `backend/app/services/`.
- **Frontend:** The API call logic should be managed within the `frontend/lib/` directory, and the UI state changes will happen in the `frontend/app/dashboard/` components.

### References

- [Source: docs/epics.md#Story-3.2]
- [Source: docs/architecture.md#API-Communication-Frontend]
- [Source: docs/architecture.md#API-Contracts]

### Learnings from Previous Story

*From Story 3.1 (3-1-input-job-application-and-instructions.md)*
- **New Service Created**: A `POST /api/v1/job-applications` endpoint was established. This generation story will create a similar `POST /api/v1/generation` endpoint.
- **Architectural Change**: A key takeaway was the requirement to enable Row Level Security on all new database tables. This must be applied to any tables created for storing generation results.
- **Testing Setup**: E2E tests in `tests/e2e/` use `data-testid` for robust element selection and mock API responses with Playwright's `page.route()`. This pattern should be continued.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-2-generate-cover-letter.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| YYYY-MM-DD | 1.0 | Initial draft creation | Agent |
