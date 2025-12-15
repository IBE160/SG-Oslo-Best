# Story 3.7: Delete Job Application

Status: done

## Story

As a logged-in student user,
I want to delete a job application I no longer need,
so that I can keep my workspace clean.

## Acceptance Criteria

1.  Given I have an existing job application, when I choose the delete option and confirm the deletion, then the job application and all associated saved cover letters are permanently removed from the database.

## Tasks / Subtasks

- [ ] **Frontend:** Implement the UI for deleting a job application. (AC: #1)
    - [ ] Create a confirmation modal for deletion as per UX Spec Section 7.1.7 "Confirmation Patterns".
    - [ ] Implement the `DELETE /api/v1/job-applications/{job_application_id}` request on confirmation.
    - [ ] Use React Query to manage the API request state (loading, error, success).
- [ ] **Backend:** Implement the API endpoint for deleting a job application. (AC: #1)
    - [ ] Create the `DELETE /api/v1/job-applications/{job_application_id}` endpoint in FastAPI.
    - [ ] Implement the logic to delete the specified job application and associated cover letters from the Supabase database (e.g., via cascading delete or explicit service logic).
    - [ ] Ensure the endpoint is protected and the user can only delete their own applications (RLS).
- [ ] **Testing:** Add E2E tests for the delete functionality. (AC: #1)
    - [ ] Write a Playwright test that navigates to an existing job application.
    - [ ] Mocks the API call for deleting the application data.
    - [ ] Simulates choosing the delete option and confirming.
    - [ ] Verifies the `DELETE` request is sent.
    - [ ] Verifies that the application is no longer listed after deletion.

## Dev Notes

- **Architecture:** The implementation should follow the established patterns: React Hook Form (for any potential form elements in the confirmation modal, though mainly a button action here), React Query for API state management, and a versioned FastAPI endpoint for the backend. Data persistence is handled by Supabase, with authorization enforced by RLS. This aligns with the decisions in the Architecture and UX Specifications.
- **Testing Standards:** E2E tests should be located in `tests/e2e/`. Use `data-testid` attributes for reliable element selection and mock API responses using Playwright's `page.route()` functionality.
- **UX Considerations:** The delete action must include a confirmation modal as described in UX Spec Section 7.1.7 "Confirmation Patterns" to prevent accidental data loss.

### Project Structure Notes

- The frontend components for this feature will likely be located within `frontend/app/dashboard/` or a related subdirectory for job application management.
- The new backend API endpoint will be added to the relevant FastAPI router, likely in a file such as `backend/app/api/v1/job_applications.py`.

### References

- [Source: docs/epics.md#Story-3.7]
- [Source: docs/PRD.md#FR-2.3]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/architecture.md#Implementation-Patterns]
- [Source: docs/ux-design-specification.md#Confirmation-Patterns]

### Learnings from Previous Story

*From Story 3.6 (3-6-update-job-application.md)*
- **API Interaction Pattern**: Continue using React Query for managing API call states (loading, error, success) for the delete operation.
- **UI Components**: Leverage Shadcn/UI components where appropriate for consistent UI, especially for confirmation modals and buttons.
- **Testing Approach**: Continue the established E2E testing pattern using `data-testid` for element selection and `Playwright` for mocking API responses, extending it to cover the delete functionality.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-7-delete-job-application.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| mandag 15. desember 2025 | 1.0 | Initial draft creation | Agent |


## Story

As a logged-in student user,
I want to delete a job application I no longer need,
so that I can keep my workspace clean.

## Acceptance Criteria

1.  Given I have an existing job application, when I choose the delete option and confirm the deletion, then the job application and all associated saved cover letters are permanently removed from the database.

## Tasks / Subtasks

- [ ] **Frontend:** Implement the UI for deleting a job application. (AC: #1)
    - [ ] Create a confirmation modal for deletion as per UX Spec Section 7.1.7 "Confirmation Patterns".
    - [ ] Implement the `DELETE /api/v1/job-applications/{job_application_id}` request on confirmation.
    - [ ] Use React Query to manage the API request state (loading, error, success).
- [ ] **Backend:** Implement the API endpoint for deleting a job application. (AC: #1)
    - [ ] Create the `DELETE /api/v1/job-applications/{job_application_id}` endpoint in FastAPI.
    - [ ] Implement the logic to delete the specified job application and associated cover letters from the Supabase database (e.g., via cascading delete or explicit service logic).
    - [ ] Ensure the endpoint is protected and the user can only delete their own applications (RLS).
- [ ] **Testing:** Add E2E tests for the delete functionality. (AC: #1)
    - [ ] Write a Playwright test that navigates to an existing job application.
    - [ ] Mocks the API call for deleting the application data.
    - [ ] Simulates choosing the delete option and confirming.
    - [ ] Verifies the `DELETE` request is sent.
    - [ ] Verifies that the application is no longer listed after deletion.

## Dev Notes

- **Architecture:** The implementation should follow the established patterns: React Hook Form (for any potential form elements in the confirmation modal, though mainly a button action here), React Query for API state management, and a versioned FastAPI endpoint for the backend. Data persistence is handled by Supabase, with authorization enforced by RLS. This aligns with the decisions in the Architecture and UX Specifications.
- **Testing Standards:** E2E tests should be located in `tests/e2e/`. Use `data-testid` attributes for reliable element selection and mock API responses using Playwright's `page.route()` functionality.
- **UX Considerations:** The delete action must include a confirmation modal as described in UX Spec Section 7.1.7 "Confirmation Patterns" to prevent accidental data loss.

### Project Structure Notes

- The frontend components for this feature will likely be located within `frontend/app/dashboard/` or a related subdirectory for job application management.
- The new backend API endpoint will be added to the relevant FastAPI router, likely in a file such as `backend/app/api/v1/job_applications.py`.

### References

- [Source: docs/epics.md#Story-3.7]
- [Source: docs/PRD.md#FR-2.3]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/architecture.md#Implementation-Patterns]
- [Source: docs/ux-design-specification.md#Confirmation-Patterns]

### Learnings from Previous Story

*From Story 3.6 (3-6-update-job-application.md)*
- **API Interaction Pattern**: Continue using React Query for managing API call states (loading, error, success) for the delete operation.
- **UI Components**: Leverage Shadcn/UI components where appropriate for consistent UI, especially for confirmation modals and buttons.
- **Testing Approach**: Continue the established E2E testing pattern using `data-testid` for element selection and `Playwright` for mocking API responses, extending it to cover the delete functionality.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-7-delete-job-application.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| mandag 15. desember 2025 | 1.0 | Initial draft creation | Agent |


## Story

As a logged-in student user,
I want to delete a job application I no longer need,
so that I can keep my workspace clean.

## Acceptance Criteria

1.  Given I have an existing job application, when I choose the delete option and confirm the deletion, then the job application and all associated saved cover letters are permanently removed from the database.

## Tasks / Subtasks

- [ ] **Frontend:** Implement the UI for deleting a job application. (AC: #1)
    - [ ] Create a confirmation modal for deletion as per UX Spec Section 7.1.7 "Confirmation Patterns".
    - [ ] Implement the `DELETE /api/v1/job-applications/{job_application_id}` request on confirmation.
    - [ ] Use React Query to manage the API request state (loading, error, success).
- [ ] **Backend:** Implement the API endpoint for deleting a job application. (AC: #1)
    - [ ] Create the `DELETE /api/v1/job-applications/{job_application_id}` endpoint in FastAPI.
    - [ ] Implement the logic to delete the specified job application and associated cover letters from the Supabase database (e.g., via cascading delete or explicit service logic).
    - [ ] Ensure the endpoint is protected and the user can only delete their own applications (RLS).
- [ ] **Testing:** Add E2E tests for the delete functionality. (AC: #1)
    - [ ] Write a Playwright test that navigates to an existing job application.
    - [ ] Mocks the API call for deleting the application data.
    - [ ] Simulates choosing the delete option and confirming.
    - [ ] Verifies the `DELETE` request is sent.
    - [ ] Verifies that the application is no longer listed after deletion.

## Dev Notes

- **Architecture:** The implementation should follow the established patterns: React Hook Form (for any potential form elements in the confirmation modal, though mainly a button action here), React Query for API state management, and a versioned FastAPI endpoint for the backend. Data persistence is handled by Supabase, with authorization enforced by RLS. This aligns with the decisions in the Architecture and UX Specifications.
- **Testing Standards:** E2E tests should be located in `tests/e2e/`. Use `data-testid` attributes for reliable element selection and mock API responses using Playwright's `page.route()` functionality.
- **UX Considerations:** The delete action must include a confirmation modal as described in UX Spec Section 7.1.7 "Confirmation Patterns" to prevent accidental data loss.

### Project Structure Notes

- The frontend components for this feature will likely be located within `frontend/app/dashboard/` or a related subdirectory for job application management.
- The new backend API endpoint will be added to the relevant FastAPI router, likely in a file such as `backend/app/api/v1/job_applications.py`.

### References

- [Source: docs/epics.md#Story-3.7]
- [Source: docs/PRD.md#FR-2.3]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/architecture.md#Implementation-Patterns]
- [Source: docs/ux-design-specification.md#Confirmation-Patterns]

### Learnings from Previous Story

*From Story 3.6 (3-6-update-job-application.md)*
- **API Interaction Pattern**: Continue using React Query for managing API call states (loading, error, success) for the delete operation.
- **UI Components**: Leverage Shadcn/UI components where appropriate for consistent UI, especially for confirmation modals and buttons.
- **Testing Approach**: Continue the established E2E testing pattern using `data-testid` for element selection and `Playwright` for mocking API responses, extending it to cover the delete functionality.

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| mandag 15. desember 2025 | 1.0 | Initial draft creation | Agent |
