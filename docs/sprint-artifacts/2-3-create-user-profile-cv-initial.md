# Story 2.3: create-user-profile-cv-initial

Status: drafted

## Story

As a logged-in student user,
I want to create my initial profile and input my CV information into a single text area,
so that the system has my basic data for cover letter generation.

## Acceptance Criteria

1. Given I am logged in for the first time, when I am redirected to the profile creation page, then I see fields for personal details and a large text area for CV content.
2. When I attempt to save with a mandatory field empty, then the system displays an inline error and prevents saving.
3. When I fill in all required fields and save, then my profile and CV data are successfully stored.
4. And I am redirected to the main application dashboard.

## Tasks / Subtasks

- [ ] **Task 1: Implement Profile/CV Form UI (AC: #1)**
  - [ ] **Frontend:** Create a new React component for the user profile and CV input form (e.g., `ProfileCVForm.tsx`).
  - [ ] **Frontend:** Design the form with fields for personal details (e.g., name, date of birth, gender, phone number, address) and a large text area for CV content.
  - [ ] **Frontend:** Integrate `React Hook Form` for form management.
  - [ ] **Frontend:** Ensure input fields and the text area have appropriate `data-testid` attributes for E2E testing.
- [ ] **Task 2: Implement Backend API for Profile/CV Creation (AC: #3)**
  - [ ] **Backend:** Create a `POST /api/v1/users/me/cv` endpoint in `backend/app/api/v1/users.py`.
  - [ ] **Backend:** The endpoint must accept user profile and CV data.
  - [ ] **Backend:** Implement logic to store the data in Supabase tables (`users`, `cvs`) linked to the authenticated user's ID.
  - [ ] **Backend:** Ensure RLS policies are applied to prevent unauthorized access.
- [ ] **Task 3: Connect Frontend Form to Backend API (AC: #3, #4)**
  - [ ] **Frontend:** Implement client-side logic to call the `POST /api/v1/users/me/cv` endpoint on form submission.
  - [ ] **Frontend:** Handle successful responses by redirecting the user to the main application dashboard (`/dashboard`).
  - [ ] **Frontend:** Handle error responses by displaying inline error messages (AC: #2).
- [ ] **Task 4: Implement Form Validation (AC: #2)**
  - [ ] **Frontend:** Add client-side validation using `React Hook Form` for mandatory fields in the profile/CV form.
  - [ ] **Frontend:** Display inline error messages when mandatory fields are empty on submission.
- [ ] **Task 5: Verification**
  - [ ] **Testing:** Create an E2E test file (`tests/e2e/profile-cv.spec.ts`).
  - [ ] **Testing:** Write tests to cover the user journey: registration -> login -> redirect to CV page -> fill in form -> save -> redirect to dashboard (AC: #1, #3, #4).
  - [ ] **Testing:** Write a test to ensure mandatory field validation prevents saving (AC: #2).
  - [ ] **Testing:** Run Playwright tests and ensure they pass.

## Dev Notes

-   **Relevant architecture patterns and constraints**:
    -   Frontend forms should use React Hook Form for management.
    -   Backend endpoints for creating and updating user CVs will be in `backend/app/api/v1/users.py`.
    -   Supabase tables (`users`, `cvs`) will store the profile and CV data, protected by RLS.
    -   Frontend UI components and pages will be in `frontend` project, with shared types in `packages/shared-types`.
    -   Naming conventions should follow PascalCase for components, kebab-case for files, and lowercase/plural/snake_case for DB tables.

-   **Source tree components to touch**:
    -   `frontend/app/dashboard/page.tsx` (for redirection after save)
    -   `frontend/components/` (for creating form components for profile and CV)
    -   `backend/app/api/v1/users.py` (for the API endpoint)
    -   `backend/app/db/` (for Supabase table definitions and RLS)

-   **Testing standards summary**:
    -   E2E tests using Playwright should cover the user journey of creating and saving CV information.
    -   Backend API endpoints should be tested for valid/invalid requests and authentication enforcement.

### Project Structure Notes

-   Alignment with unified project structure (paths, modules, naming)
    -   New components will be created within `frontend/components/` or within the dashboard feature directory.
    -   Backend API will extend `backend/app/api/v1/`.
    -   Database schema will be defined in `backend/app/db/`.
-   Detected conflicts or variances (with rationale)
    -   None detected at this stage.

### Learnings from Previous Story (2.2)

-   **New Services/Components Created**: `AuthContext` for session management (reusable), new `dashboard` page.
-   **New Files**: `frontend/context/AuthContext.tsx`, `frontend/app/dashboard/page.tsx`, `tests/e2e/login.spec.ts`, `frontend/components/ui/alert-dialog.tsx`.
-   **Modified Files**: `backend/app/api/v1/auth.py`, `frontend/app/layout.tsx`, `frontend/app/(auth)/page.tsx`, `docs/sprint-artifacts/sprint-status.yaml`.
-   **Warnings/Recommendations for Next**:
    -   Consider adding unit tests for `AuthContext`.
    -   Review Supabase Row Level Security (RLS) for user sessions to ensure data isolation. (This is highly relevant for the current story!)

### References

### References
- [Source: `docs/epics.md#story-2.3-create-user-profile--cv-initial`]
- [Source: `docs/sprint-artifacts/tech-spec-epic-2.md#apis-and-interfaces`]
- [Source: `docs/ux-design-specification.md#5.1.2-cv-management`]

## Dev Agent Record

### Context Reference
<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List
- [ ] Implement Profile/CV Form UI
- [ ] Implement Backend API for Profile/CV Creation
- [ ] Connect Frontend Form to Backend API
- [ ] Implement Form Validation
- [ ] Verification through E2E tests

### File List
- `frontend/components/ProfileCVForm.tsx` (Created)
- `backend/app/api/v1/users.py` (Modified)
- `backend/app/db/` (Modified - for new tables/RLS)
- `tests/e2e/profile-cv.spec.ts` (Created)
- `docs/sprint-artifacts/sprint-status.yaml` (Modified)

---

## Change Log
- **{{date}}:** Initial draft created based on `epics.md`, `tech-spec-epic-2.md`, `architecture.md`, and `ux-design-specification.md`. Incorporated learnings from previous story `2.2`.
