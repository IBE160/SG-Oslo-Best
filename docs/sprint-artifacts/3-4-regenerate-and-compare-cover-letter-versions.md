# Story 3.4: Regenerate and Compare Cover Letter Versions

Status: done

## Story

As a logged-in student user,
I want to regenerate a cover letter and easily compare it with previous versions,
so that I can choose the best output.

## Acceptance Criteria

1.  Given a cover letter is displayed, when I modify instructions and click "Regenerate", then a new version of the cover letter is generated via the API.
2.  And the output panel displays the new version as the active tab (e.g., "Version 2").
3.  And a tab for the previous version (e.g., "Version 1") is present, allowing for easy switching and comparison.

## Tasks / Subtasks

- [ ] **Frontend:** Implement logic for regenerating cover letters. (AC: #1)
    - [ ] Integrate `POST /api/v1/generation` request when "Regenerate" is clicked.
    - [ ] Manage loading, error, and success states using React Query.
- [ ] **Frontend:** Implement tabbed interface for version comparison. (AC: #2, #3)
    - [ ] Use Shadcn/UI Tabs component.
    - [ ] Manage state of multiple cover letter versions using React Context.
    - [ ] Display the newly generated version as the active tab.
    - [ ] Display previous versions as inactive tabs.
    - [ ] Implement switching between tabs to view different versions.
    - [ ] Ensure tab interface follows ARIA Tab pattern for accessibility (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`).
- [ ] **Frontend:** Update "Save" button state. (AC: Implicit from UX Spec, Story 5.1.3, Step 6)
    - [ ] Ensure "Save" button is re-enabled when a new version is generated.
- [ ] **Testing:** Add Playwright E2E tests. (AC: #1, #2, #3)
    - [ ] Mock API response for regeneration.
    - [ ] Verify a new version is generated and displayed in a new active tab.
    - [ ] Verify the previous version is accessible via a separate tab.
    - [ ] Verify the "Save" button is enabled for the new version.

## Dev Notes

- **Architecture:** The frontend will use React Context to manage the state of multiple generated cover letter versions. The tabbed interface for comparing versions will be implemented using Shadcn/UI Tabs. Each "Regenerate" action will trigger a new `POST /api/v1/generation` request. React Query will manage the data fetching and caching for these versions. This is aligned with UX Spec Section 5.1.3 and Architecture Spec.
- **Testing Standards:** E2E tests in `tests/e2e/` should use `data-testid` for robust element selection and mock API responses with Playwright's `page.route()`.
- **Accessibility:** The tab interface for cover letter versions must follow the ARIA Tab pattern for accessibility, as per UX Spec Section 8.2.1.

### Project Structure Notes

- Frontend components for the tabbed interface will likely reside in `frontend/app/dashboard/` or `frontend/components/`.
- State management for multiple cover letter versions will be handled in `frontend/context/` or `frontend/lib/`.

### References

- [Source: docs/epics.md#Story-3.4]
- [Source: docs/architecture.md#API-Communication-Frontend]
- [Source: docs/architecture.md#State-Management-Frontend]
- [Source: docs/ux-design-specification.md#Cover-Letter-Generation]
- [Source: docs/ux-design-specification.md#Component-Library]
- [Source: docs/ux-design-specification.md#Accessibility]

### Learnings from Previous Story

*From Story 3.3 (3-3-display-and-review-generated-cover-letter.md)*
- **New Service Created**: A `POST /api/v1/generation` endpoint was established. This story will consume the output of this endpoint.
- **Architectural Change**: The previous story set the pattern for using React Query to manage API call states (loading, error, success). This pattern should be continued for fetching and displaying the generated cover letter.
- **Testing Setup**: E2E tests in `tests/e2e/` use `data-testid` for robust element selection and mock API responses with Playwright's `page.route()`. This pattern should be continued for verifying the display of the cover letter and the buttons.

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-4-regenerate-and-compare-cover-letter-versions.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| 2025-12-15 | 1.0 | Initial draft creation | Agent |