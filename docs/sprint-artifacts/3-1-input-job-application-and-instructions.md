# Story 3.1: Input Job Application and Instructions

Status: done

## Story

As a logged-in student user,
I want to input a job advertisement and provide optional instructions,
so that I can prepare the context for generating a tailored cover letter.

## Acceptance Criteria

1.  Given I am on the main generation page, when I paste a job advertisement into the designated text area, then the "Generate" button becomes enabled. (AC: #1)
2.  And I can (optionally) write instructions for style and tone. (AC: #2)
3.  Then the application captures all inputs, ready for generation. (AC: #3)

## Tasks / Subtasks

- [ ] **Backend:** Create `POST /api/v1/job-applications` endpoint. (AC: #3)
    - [ ] The endpoint should accept a job advertisement text and optional instructions.
    - [ ] The endpoint should save the data to a new `job_applications` table in Supabase, linked to the authenticated user.
- [ ] **Frontend:** Create the main generation page UI. (AC: #1, #2)
    - [ ] Add a large text area for the job advertisement.
    - [ ] Add a text input or text area for optional instructions.
    - [ ] Add a "Generate" button, which is disabled by default.
- [ ] **Frontend:** Implement form logic using React Hook Form. (AC: #1, #2, #3)
    - [ ] The "Generate" button should become enabled only when the job advertisement text area is not empty.
    - [ ] On form submission (e.g., a "Save" button or as part of the "Generate" flow), the data should be sent to the `POST /api/v1/job-applications` endpoint.
- [ ] **Testing:** Create Playwright E2E tests for the generation page. (AC: #1, #2)
    - [ ] Write a test to verify that pasting text into the job ad field enables the "Generate" button.
    - [ ] Write a test to verify that the form correctly captures input from both the job ad and instructions fields.

## Dev Notes

- **Architecture:** The input form will be managed using React Hook Form as per the decision in `docs/architecture.md`. API communication should be handled by React Query. The overall page structure should align with the patterns established in the `frontend/` directory.
- **Backend:** The new endpoint `POST /api/v1/job-applications` should follow the conventions outlined in `docs/architecture.md`, including API versioning and response formats. Ensure Row Level Security is enabled on the new `job_applications` table so users can only access their own data.

### Project Structure Notes

- **Frontend:** New components for the generation page should be located in `frontend/app/dashboard/` or a subdirectory if the page becomes complex.
- **Backend:** The new endpoint logic should be added in `backend/app/api/v1/`. A new file, perhaps `job_applications.py`, should be created.
- **Database:** A new table `job_applications` will be required. It should contain columns for `id`, `user_id` (foreign key to `users`), `job_advertisement_text`, `instructions_text`, and timestamps.

### Learnings from Previous Story

*From Story 2.2 (atdd-checklist-story-2.2.md)*
- **Testing:** E2E tests are created in `tests/e2e/` and use a fixture-based setup. Tests rely heavily on `data-testid` attributes for stable element selection.
- **API Mocking:** Playwright's `page.route()` is used to mock API responses during E2E tests, which is a useful pattern for isolating frontend behavior.
- **API Contracts:** Backend endpoints have clear request/response contracts. For the new `POST /api/v1/job-applications` endpoint, a similar clear contract should be defined.
- **Session Management:** Client-side session is managed via React Context after a successful login. This context will be essential for getting the authenticated user's ID when saving the job application.

### References

- [Source: docs/epics.md#Story-3.1]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/architecture.md#Project-Structure]
- [Source: docs/stories/atdd-checklist-story-2.2.md]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-1-input-job-application-and-instructions.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| YYYY-MM-DD | 1.0 | Initial draft creation | Agent |
