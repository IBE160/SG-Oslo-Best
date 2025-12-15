# Story 3.5: Save Generated Cover Letter

Status: done

## Story

As a logged-in student user,
I want to save a generated cover letter that I am satisfied with,
so that I can access it later.

## Acceptance Criteria

1.  Given a cover letter is displayed, when I click the "Save" button, then the button's state changes to "Saved ✓" and becomes disabled.
2.  And a toast notification confirms the save action.
3.  And the cover letter text is successfully saved to the Supabase database, associated with my user ID and the job application.

## Tasks / Subtasks

- [ ] **Frontend:** Implement save functionality for the cover letter. (AC: #1, #2, #3)
    - [ ] Integrate `POST /api/v1/cover-letters` request when "Save" button is clicked.
    - [ ] Manage loading, error, and success states using React Query.
    - [ ] Update the UI of the "Save" button to "Saved ✓" and disable it on successful save.
    - [ ] Display a Shadcn/UI Toast notification to confirm the save action.
- [ ] **Backend:** Implement API endpoint for saving cover letters. (AC: #3)
    - [ ] Create `POST /api/v1/cover-letters` endpoint.
    - [ ] Implement logic to store the cover letter content in Supabase, linked to the user and job application.
    - [ ] Ensure proper authentication and authorization (RLS) for the save operation.
- [ ] **Testing:** Add Playwright E2E tests. (AC: #1, #2, #3)
    - [ ] Mock the API response for saving a cover letter.
    - [ ] Verify that clicking "Save" changes the button state and displays a toast notification.
    - [ ] Verify that a successful save operation is recorded in the mocked backend.

## Dev Notes

- **Architecture:** The frontend will use React Query for API calls and state management of the save operation. A `POST /api/v1/cover-letters` endpoint will be used on the backend. Supabase will store the data. A Shadcn/UI Toast component will be used for notifications. This is aligned with UX Spec Section 5.1.3 and Architecture Spec.
- **Testing Standards:** E2E tests in `tests/e2e/` should use `data-testid` for robust element selection and mock API responses with Playwright's `page.route()`.
- **Accessibility:** Ensure the Shadcn/UI Toast component used for notifications is accessible, adhering to WCAG 2.1 Level A guidelines (e.g., proper ARIA attributes if custom toast is implemented).

### Project Structure Notes

- Frontend components for the save button and toast notification will likely reside in `frontend/app/dashboard/` or `frontend/components/`.
- Backend API endpoint for cover letter saving will be in `backend/app/api/v1/generation.py` (or potentially a new `cover_letters.py`).
- Backend service logic for database interaction will be in `backend/app/services/`.

### References

- [Source: docs/epics.md#Story-3.5]
- [Source: docs/architecture.md#API-Communication-Frontend]
- [Source: docs/architecture.md#Error-Handling-Strategy]
- [Source: docs/architecture.md#Data-Architecture]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/ux-design-specification.md#Cover-Letter-Generation]
- [Source: docs/ux-design-specification.md#Component-Library]
- [Source: docs/ux-design-specification.md#Feedback-Patterns]
- [Source: docs/PRD.md#FR-3.6-MVP]

### Learnings from Previous Story

*From Story 3.4 (3-4-regenerate-and-compare-cover-letter-versions.md)*
- **API Interaction Pattern**: Continue using React Query for managing API call states (loading, error, success) for the save operation, similar to how it was used for regeneration.
- **UI Components**: Leverage Shadcn/UI components where appropriate for consistent UI, especially for buttons and notifications.
- **Testing Approach**: Continue the established E2E testing pattern using `data-testid` for element selection and `Playwright` for mocking API responses, extending it to cover the save functionality.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-5-save-generated-cover-letter.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| 2025-12-15 | 1.0 | Initial draft creation | Agent |