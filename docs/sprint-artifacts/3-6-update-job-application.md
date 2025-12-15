# Story 3.6: Update Job Application

Status: done

## Story

As a logged-in student user,
I want to update the text of a job application I previously created,
so that I can correct mistakes or add new information.

## Acceptance Criteria

1.  Given I have an existing job application, when I navigate to the application's edit page, then I see the current job advertisement text pre-filled.
2.  When I modify the text and save, then the updated text is persisted in the database.

## Tasks / Subtasks

- [ ] **Frontend:** Implement the UI for updating a job application. (AC: #1, #2)
    - [ ] Create a form (managed by React Hook Form) that fetches and displays the existing job application text.
    - [ ] Implement the `PATCH /api/v1/job-applications/{job_application_id}` request on form submission.
    - [ ] Use React Query to manage the API request state (loading, error, success).
- [ ] **Backend:** Implement the API endpoint for updating a job application. (AC: #2)
    - [ ] Create the `PATCH /api/v1/job-applications/{job_application_id}` endpoint in FastAPI.
    - [ ] Implement the logic to update the specified job application in the Supabase database.
    - [ ] Ensure the endpoint is protected and the user can only update their own applications (RLS).
- [ ] **Testing:** Add E2E tests for the update functionality. (AC: #1, #2)
    - [ ] Write a Playwright test that navigates to an existing job application.
    - [ ] Mocks the API call for fetching the application data.
    - [ ] Verifies the text area is pre-filled.
    - [ ] Simulates editing the text and saving.
    - [ ] Verifies the `PATCH` request is sent with the correct payload.

## Dev Notes

- **Architecture:** The implementation should follow the established patterns: React Hook Form for frontend forms, React Query for API state management, and a versioned FastAPI endpoint for the backend. Data persistence is handled by Supabase, with authorization enforced by RLS. This aligns with the decisions in the Architecture and UX Specifications.
- **Testing Standards:** E2E tests should be located in `tests/e2e/`. Use `data-testid` attributes for reliable element selection and mock API responses using Playwright's `page.route()` functionality.

### Project Structure Notes

- The frontend components for this feature will likely be located within `frontend/app/dashboard/` or a related subdirectory for job application management.
- The new backend API endpoint will be added to the relevant FastAPI router, likely in a file such as `backend/app/api/v1/job_applications.py`.

### References

- [Source: docs/epics.md#Story-3.6]
- [Source: docs/PRD.md#FR-2.2]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/architecture.md#Implementation-Patterns]

### Learnings from Previous Story

*From Story 3.5 (3-5-save-generated-cover-letter.md)*
- **API Interaction Pattern**: Continue using React Query for managing API call states (loading, error, success) for the save operation, similar to how it was used for regeneration.
- **UI Components**: Leverage Shadcn/UI components where appropriate for consistent UI, especially for forms and buttons.
- **Testing Approach**: Continue the established E2E testing pattern using `data-testid` for element selection and `Playwright` for mocking API responses, extending it to cover the update functionality.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-6-update-job-application.context.xml

## Story

As a logged-in student user,
I want to update the text of a job application I previously created,
so that I can correct mistakes or add new information.

## Acceptance Criteria

1.  Given I have an existing job application, when I navigate to the application's edit page, then I see the current job advertisement text pre-filled.
2.  When I modify the text and save, then the updated text is persisted in the database.

## Tasks / Subtasks

- [ ] **Frontend:** Implement the UI for updating a job application. (AC: #1, #2)
    - [ ] Create a form (managed by React Hook Form) that fetches and displays the existing job application text.
    - [ ] Implement the `PATCH /api/v1/job-applications/{job_application_id}` request on form submission.
    - [ ] Use React Query to manage the API request state (loading, error, success).
- [ ] **Backend:** Implement the API endpoint for updating a job application. (AC: #2)
    - [ ] Create the `PATCH /api/v1/job-applications/{job_application_id}` endpoint in FastAPI.
    - [ ] Implement the logic to update the specified job application in the Supabase database.
    - [ ] Ensure the endpoint is protected and the user can only update their own applications (RLS).
- [ ] **Testing:** Add E2E tests for the update functionality. (AC: #1, #2)
    - [ ] Write a Playwright test that navigates to an existing job application.
    - [ ] Mocks the API call for fetching the application data.
    - [ ] Verifies the text area is pre-filled.
    - [ ] Simulates editing the text and saving.
    - [ ] Verifies the `PATCH` request is sent with the correct payload.

## Dev Notes

- **Architecture:** The implementation should follow the established patterns: React Hook Form for frontend forms, React Query for API state management, and a versioned FastAPI endpoint for the backend. Data persistence is handled by Supabase, with authorization enforced by RLS. This aligns with the decisions in the Architecture and UX Specifications.
- **Testing Standards:** E2E tests should be located in `tests/e2e/`. Use `data-testid` attributes for reliable element selection and mock API responses using Playwright's `page.route()` functionality.

### Project Structure Notes

- The frontend components for this feature will likely be located within `frontend/app/dashboard/` or a related subdirectory for job application management.
- The new backend API endpoint will be added to the relevant FastAPI router, likely in a file such as `backend/app/api/v1/job_applications.py`.

### References

- [Source: docs/epics.md#Story-3.6]
- [Source: docs/PRD.md#FR-2.2]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/architecture.md#Implementation-Patterns]

### Learnings from Previous Story

*From Story 3.5 (3-5-save-generated-cover-letter.md)*
- **API Interaction Pattern**: Continue using React Query for managing API call states (loading, error, success) for the save operation, similar to how it was used for regeneration.
- **UI Components**: Leverage Shadcn/UI components where appropriate for consistent UI, especially for forms and buttons.
- **Testing Approach**: Continue the established E2E testing pattern using `data-testid` for element selection and `Playwright` for mocking API responses, extending it to cover the update functionality.

