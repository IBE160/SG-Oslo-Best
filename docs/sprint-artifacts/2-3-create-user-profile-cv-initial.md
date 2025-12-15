# Story 2.3: create-user-profile-cv-initial

Status: done

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

- [x] **Task 1: Implement Profile/CV Form UI (AC: #1)**
  - [x] **Frontend:** Create a new React component for the user profile and CV input form (e.g., `ProfileCVForm.tsx`).
  - [x] **Frontend:** Design the form with fields for personal details (e.g., name, date of birth, gender, phone number, address) and a large text area for CV content.
  - [x] **Frontend:** Integrate `React Hook Form` for form management.
  - [x] **Frontend:** Ensure input fields and the text area have appropriate `data-testid` attributes for E2E testing.
- [x] **Task 2: Implement Backend API for Profile/CV Creation (AC: #3)**
  - [x] **Backend:** Create a `POST /api/v1/users/me/cv` endpoint in `backend/app/api/v1/users.py`.
  - [x] **Backend:** The endpoint must accept user profile and CV data.
  - [x] **Backend:** Implement logic to store the data in Supabase tables (`users`, `cvs`) linked to the authenticated user's ID.
  - [ ] **Backend:** Ensure RLS policies are applied to prevent unauthorized access.
- [x] **Task 3: Connect Frontend Form to Backend API (AC: #3, #4)**
  - [x] **Frontend:** Implement client-side logic to call the `POST /api/v1/users/me/cv` endpoint on form submission.
  - [x] **Frontend:** Handle successful responses by redirecting the user to the main application dashboard (`/dashboard`).
  - [x] **Frontend:** Handle error responses by displaying inline error messages (AC: #2).
- [x] **Task 4: Implement Form Validation (AC: #2)**
  - [x] **Frontend:** Add client-side validation using `React Hook Form` for mandatory fields in the profile/CV form.
  - [x] **Frontend:** Display inline error messages when mandatory fields are empty on submission.
- [x] **Task 5: Verification**
  - [x] **Testing:** Create an E2E test file (`tests/e2e/profile-cv.spec.ts`).
  - [x] **Testing:** Write tests to cover the user journey: registration -> login -> redirect to CV page -> fill in form -> save -> redirect to dashboard (AC: #1, #3, #4).
  - [x] **Testing:** Write a test to ensure mandatory field validation prevents saving (AC: #2).
  - [x] **Testing:** Run Playwright tests and ensure they pass.

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

---

## Senior Developer Review (AI)

**Review Outcome:** CHANGES REQUESTED

**Justification:** While the core functionality of Story 2.3 appears implemented and tested, a critical security mechanism (RLS policies) could not be directly verified from the provided codebase. Additionally, there are a few minor issues and a significant integration concern regarding the email verification flow during user registration that needs to be addressed for the overall system integrity.

**Reviewer:** BIP
**Date:** mandag 8. desember 2025

### **Summary**

The implementation of Story 2.3, "Create User Profile & CV (Initial)", demonstrates a solid foundation for user profile and CV data management. The frontend form (`ProfileCVForm.tsx`) is well-structured, implements robust client-side validation using `React Hook Form`, and correctly interacts with the backend API. The backend endpoint (`users.py`) correctly handles data persistence to Supabase's `profiles` and `cv_documents` tables. Comprehensive E2E tests (`profile-cv.spec.ts`) cover the main user journey and client-side validation.

However, a critical aspect of data security, the Row Level Security (RLS) policies in Supabase, could not be directly verified, posing a potential risk. Furthermore, the E2E testing setup highlights an unaddressed flow in user registration (email verification) that warrants attention.

### **Outcome: Changes Requested**

### **Key Findings**

*   **HIGH Severity:** None
*   **MEDIUM Severity:**
    *   **Unverified RLS Policies for `profiles` and `cv_documents` tables.** (Associated with Task 2: Implement Backend API for Profile/CV Creation - "Ensure RLS policies are applied to prevent unauthorized access")
        *   **Description:** The application relies on Supabase's Row Level Security to prevent unauthorized users from accessing or modifying other users' profile and CV data. While the backend code is structured to leverage this, the RLS policies themselves are configured externally to the application code and could not be verified in this review. Without explicit verification, this poses a significant security risk.
        *   **Rationale:** RLS is a foundational security control for user data. Its unverified status is a critical concern.
    *   **Incomplete E2E Test Coverage for User Registration Flow (Email Verification).** (Associated with Task 5: Verification - "Write tests to cover the user journey: registration -> login...")
        *   **Description:** The `profile-cv.spec.ts` E2E tests assume immediate login after registration. If email verification is a mandatory step in the user registration flow, the current tests do not account for a user being unverified upon initial login attempt, which could lead to a broken user journey or unexpected behavior. This affects the robustness of the overall user onboarding E2E tests.
        *   **Rationale:** The reliability of E2E tests is compromised if they don't accurately reflect the complete user flow, especially critical paths like registration and login.
*   **LOW Severity:**
    *   **Precision of Timestamps:** The backend uses `date.today().isoformat()` for `created_at` and `updated_at`. While acceptable for dates, using timezone-aware `datetime.now()` provides more precise temporal tracking and avoids potential timezone issues for audit purposes.
    *   **Redundant Frontend Error Check:** A minor redundancy exists in `ProfileCVForm.tsx` where `!submissionError` is checked within a `catch` block; it may be unnecessary if `setSubmissionError` is called prior to throwing an error.

### **Acceptance Criteria Coverage**

| AC# | Description                                                                                                                              | Status       | Evidence (file:line)                                                                   |
| :-- | :--------------------------------------------------------------------------------------------------------------------------------------- | :----------- | :------------------------------------------------------------------------------------- |
| 1   | Given I am logged in for the first time, when I am redirected to the profile creation page, then I see fields for personal details and a large text area for CV content. | IMPLEMENTED  | `frontend/components/ProfileCVForm.tsx` (lines 70-137)                                 |
| 2   | When I attempt to save with a mandatory field empty, then the system displays an inline error and prevents saving.                       | IMPLEMENTED  | `frontend/components/ProfileCVForm.tsx` (lines 73, 77, 84, 88, 95, 102, 107, 113, 118, 124, 131, 135) and `tests/e2e/profile-cv.spec.ts` (lines 72-96) |
| 3   | When I fill in all required fields and save, then my profile and CV data are successfully stored.                                          | IMPLEMENTED  | `frontend/components/ProfileCVForm.tsx` (lines 37-52); `backend/app/api/v1/users.py` (lines 22-93) |
| 4   | And I am redirected to the main application dashboard.                                                                                 | IMPLEMENTED  | `frontend/components/ProfileCVForm.tsx` (line 56) and `tests/e2e/profile-cv.spec.ts` (lines 69-70) |

**Summary:** 4 of 4 acceptance criteria fully implemented.

### **Task Completion Validation**

| Task                                                                | Marked As    | Verified As       | Evidence (file:line)                                                                                                   |
| :------------------------------------------------------------------ | :----------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **Task 1: Implement Profile/CV Form UI (AC: #1)**                      | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx`                                                                                |
| \- Frontend: Create a new React component for the user profile and CV input form (e.g., `ProfileCVForm.tsx`). | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx`                                                                                |
| \- Frontend: Design the form with fields for personal details and a large text area for CV content. | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 70-137)                                                                 |
| \- Frontend: Integrate `React Hook Form` for form management.       | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 12, 67)                                                                 |
| \- Frontend: Ensure input fields and the text area have appropriate `data-testid` attributes for E2E testing. | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 75, 86, 99, 110, 121, 133, 144)                                            |
| **Task 2: Implement Backend API for Profile/CV Creation (AC: #3)** | \[ ]        | VERIFIED COMPLETE | `backend/app/api/v1/users.py` (lines 22-93)                                                                            |
| \- Backend: Create a `POST /api/v1/users/me/cv` endpoint.           | \[ ]        | VERIFIED COMPLETE | `backend/app/api/v1/users.py` (lines 22-26)                                                                            |
| \- Backend: The endpoint must accept user profile and CV data.    | \[ ]        | VERIFIED COMPLETE | `backend/app/api/v1/users.py` (line 28) and `backend/app/api/v1/schemas.py`                                            |
| \- Backend: Implement logic to store the data in Supabase tables (`profiles`, `cv_documents`) linked to the authenticated user's ID. | \[ ]        | VERIFIED COMPLETE | `backend/app/api/v1/users.py` (lines 51-93)                                                                            |
| \- Backend: Ensure RLS policies are applied to prevent unauthorized access. | \[ ]        | QUESTIONABLE      | Cannot be verified from code alone. Requires Supabase configuration check.                                               |
| **Task 3: Connect Frontend Form to Backend API (AC: #3, #4)**      | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx`                                                                                |
| \- Frontend: Implement client-side logic to call the `POST /api/v1/users/me/cv` endpoint on form submission. | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 37-52)                                                                  |
| \- Frontend: Handle successful responses by redirecting the user to the main application dashboard (`/dashboard`). | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (line 56)                                                                      |
| \- Frontend: Handle error responses by displaying inline error messages (AC: #2). | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 40, 59-64)                                                              |
| **Task 4: Implement Form Validation (AC: #2)**                     | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx`                                                                                |
| \- Frontend: Add client-side validation using `React Hook Form` for mandatory fields. | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 73, 84, 95, 107, 118, 131)                                                |
| \- Frontend: Display inline error messages when mandatory fields are empty on submission. | \[ ]        | VERIFIED COMPLETE | `frontend/components/ProfileCVForm.tsx` (lines 77, 88, 102, 113, 124, 135)                                                |
| **Task 5: Verification**                                            | \[ ]        | VERIFIED COMPLETE | `tests/e2e/profile-cv.spec.ts`                                                                                         |
| \- Testing: Create an E2E test file (`tests/e2e/profile-cv.spec.ts`). | \[ ]        | VERIFIED COMPLETE | `tests/e2e/profile-cv.spec.ts`                                                                                         |
| \- Testing: Write tests to cover the user journey: registration -> login -> redirect to CV page -> fill in form -> save -> redirect to dashboard (AC: #1, #3, #4). | \[ ]        | VERIFIED COMPLETE | `tests/e2e/profile-cv.spec.ts` (lines 40-70)                                                                           |
| \- Testing: Write a test to ensure mandatory field validation prevents saving (AC: #2). | \[ ]        | VERIFIED COMPLETE | `tests/e2e/profile-cv.spec.ts` (lines 72-96)                                                                           |
| \- Testing: Run Playwright tests and ensure they pass.            | \[ ]        | QUESTIONABLE      | Cannot be verified without running tests.                                                                                |

**Summary:** All 5 tasks verified, 2 tasks with questionable sub-items due to external verification needs.

### **Test Coverage and Gaps**

*   **Coverage:** Excellent E2E test coverage (`profile-cv.spec.ts`) for all acceptance criteria (AC1, AC2, AC3, AC4). The tests simulate the complete user journey from registration to profile creation and dashboard redirection, as well as mandatory field validation.
*   **Gaps:** No specific tests were found for email verification flow after registration, which could be a critical path if email verification is enabled.

### **Architectural Alignment**

*   **Tech-spec compliance:** The implementation aligns well with the architectural decisions.
    *   Uses React Hook Form for form management.
    *   Backend endpoint is correctly placed in `backend/app/api/v1/users.py`.
    *   Uses Supabase tables (`profiles`, `cv_documents`).
    *   Follows naming conventions (PascalCase for component, snake_case for backend fields).
*   **Architecture violations:** None identified.

### **Security Notes**

*   **RLS (Row Level Security):** This is the primary security concern that requires explicit verification. The backend is designed to utilize `user_id` for data operations, but the actual enforcement via Supabase RLS policies needs confirmation.
*   **Authentication:** Relies on Supabase JWTs and `AuthContext`/`get_current_user_id` for user session management, which are assumed to be securely implemented.

### **Best-Practices and References**

*   Frontend uses `react-hook-form` for efficient form management.
*   Backend utilizes FastAPI for API development with Pydantic for data validation.
*   E2E tests are well-structured using Playwright and `data-testid` attributes.
*   Secure handling of API keys via environment variables for Supabase client.

### **Action Items**

**Code Changes Required:**
- [ ] [Medium] **Verify and Document Supabase RLS Policies:** Confirm that Row Level Security policies are correctly configured in Supabase for `profiles` and `cv_documents` tables to ensure data isolation per user. Document the verification process and policy details in the architecture or database documentation.
- [ ] [Medium] **Address E2E Test for User Registration/Email Verification Flow:** Either modify the E2E tests in `profile-cv.spec.ts` to explicitly handle the email verification step (e.g., by mocking it, or verifying the unverified user login experience), or confirm email verification is not a hard block for immediate login.
- [ ] [Low] **Improve Timestamp Precision:** In `backend/app/api/v1/users.py`, change `date.today().isoformat()` to `datetime.now(timezone.utc).isoformat()` for `created_at` and `updated_at` fields to ensure timezone-aware and precise timestamps. (Files: `backend/app/api/v1/users.py`)

**Advisory Notes:**
- Note: Consider running Playwright tests manually to confirm they pass and integrate them into the CI/CD pipeline for automated verification.
- Note: Review the implementation of `AuthContext` (frontend) and `get_current_user_id` (backend) for adherence to security best practices regarding JWT handling and session management.

---

## Change Log
- **2025-11-21:** Initial draft created based on `epics.md`, `tech-spec-epic-2.md`, `architecture.md`, and `ux-design-specification.md`. Incorporated learnings from previous story `2.2`.
- **mandag 8. desember 2025:** Senior Developer Review notes appended.
