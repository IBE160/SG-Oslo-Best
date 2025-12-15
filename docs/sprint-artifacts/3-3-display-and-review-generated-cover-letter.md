# Story 3.3: Display and Review Generated Cover Letter

Status: done

## Story

As a logged-in student user,
I want the generated cover letter to be displayed clearly on the screen,
so that I can review its content and decide on the next action.

## Acceptance Criteria

1.  Given the cover letter has been generated successfully, when the frontend receives the letter text, then the text is displayed in a clear, readable format within the output panel.
2.  And the "Regenerate" and "Save" buttons become visible and enabled.

## Tasks / Subtasks

- [ ] **Frontend:** Implement display of generated cover letter. (AC: #1)
    - [ ] Use a readable, non-editable component (e.g., Shadcn/UI `Textarea` or `div`).
    - [ ] Ensure proper styling for clear readability.
- [ ] **Frontend:** Conditionally render "Regenerate" and "Save" buttons. (AC: #2)
    - [ ] Buttons should only be visible and enabled after successful cover letter generation.
- [ ] **Testing:** Add Playwright E2E tests for displaying the cover letter and buttons. (AC: #1, #2)
    - [ ] Mock API response for generation and verify the generated text is visible.
    - [ ] Verify "Regenerate" and "Save" buttons are visible and enabled.

## Dev Notes

- **Architecture:** The generated text will be presented in a readable, non-editable area, likely a `Textarea` from Shadcn/UI. React Query will manage the state of the fetched cover letter data. The "Regenerate" and "Save" buttons will be conditionally rendered once the cover letter is successfully displayed. This is aligned with UX Spec Section 5.1.3 "Cover Letter Generation".

### Project Structure Notes

- **Frontend:** The display component will reside in `frontend/app/dashboard/`.

### References

- [Source: docs/epics.md#Story-3.3]
- [Source: docs/architecture.md#API-Communication-Frontend]
- [Source: docs/architecture.md#API-Contracts]
- [Source: docs/ux-design-specification.md#Cover-Letter-Generation]

### Learnings from Previous Story

*From Story 3.2 (3-2-generate-cover-letter.md)*
- **New Service Created**: A `POST /api/v1/generation` endpoint was established. This story will consume the output of this endpoint.
- **Architectural Change**: The previous story set the pattern for using React Query to manage API call states (loading, error, success). This pattern should be continued for fetching and displaying the generated cover letter.
- **Testing Setup**: E2E tests in `tests/e2e/` use `data-testid` for robust element selection and mock API responses with Playwright's `page.route()`. This pattern should be continued for verifying the display of the cover letter and the buttons.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-3-display-and-review-generated-cover-letter.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| YYYY-MM-DD | 1.0 | Initial draft creation | Agent |
