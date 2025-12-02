# Epic Technical Specification: User Onboarding & Profile Management

Date: 2025-12-02
Author: BIP
Epic ID: 2
Status: Draft

---

## Overview

This document provides the technical specification for Epic 2: User Onboarding & Profile Management. The core objective of this epic is to implement the full user lifecycle, including registration, login, and the management of their profile and CV data. This is a critical epic as it provides the foundation for the application's main value proposition, which relies on having user-specific data. It covers creating the necessary API endpoints, building the frontend forms with complex state management for a "hybrid save" model, and integrating with Supabase for authentication and database storage.

## Objectives and Scope

**In-Scope:**
-   Implementing a dynamic user registration and login form on a single page.
-   Backend endpoints for user registration (`POST /api/v1/auth/register`) and login (`POST /api/v1/auth/login`).
-   Integration with Supabase Auth for user creation and authentication.
-   Integration with the Resend service for sending verification emails.
-   A page for creating and updating a user's profile and CV data.
-   Backend endpoints to create (`POST /api/v1/users/me/cv`) and update (`PATCH /api/v1/users/me/cv`) the user's CV.
-   Implementation of a "Hybrid Save Model" on the frontend, featuring both auto-save on blur and a manual save button.
-   Creation of a reusable "Stateful Textbox" component to provide visual feedback on the save status of form fields.

**Out-of-Scope:**
-   Any cover letter generation functionality.
-   Password reset functionality.
-   Advanced profile features like profile pictures.
-   Management of multiple CV versions.

## System Architecture Alignment

This epic heavily leverages the architecture defined in the `architecture.md` document.
-   **Monorepo:** API endpoint logic will be in the `backend` project, while UI components and pages will be in the `frontend` project. Shared types for API requests/responses will be in `packages/shared-types`.
-   **Authentication:** The `POST /api/v1/auth/register` and `POST /api/v1/auth/login` endpoints directly implement the authentication pattern using Supabase Auth.
-   **Database:** The `users` and `cvs` tables will be created in Supabase, and access will be protected by Row Level Security (RLS) policies.
-   **Frontend Libraries:** `React Hook Form` will be used for all forms, `React Query` will manage API state for login/registration and CV updates, and `React Context` will manage the client-side session state (JWT). Shadcn/UI will provide the base components.

## Detailed Design

### Services and Modules

| Service/Module | Responsibilities | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| **Frontend: Auth Page** | Render the dynamic login/registration form. | User email/password. | API calls to the backend. | Dev |
| **Frontend: CV Page** | Render the form for creating/updating profile and CV. | User profile/CV text. | API calls to the backend. | Dev |
| **Frontend: Stateful Textbox** | Reusable UI component to show save status. | Props: `isDirty`, `isSaved`. | Visual state changes (e.g., border color). | Dev |
| **Backend: Auth Service** | Handle user registration and login logic. | User credentials. | JWT token. | Dev |
| **Backend: User Service** | Handle creation and updates of user profile/CV data. | User ID, profile/CV data. | Saved data confirmation. | Dev |

### Data Models and Contracts

**Supabase Tables:**

`users`
| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | Foreign key to `auth.users(id)` |
| `email` | `text` | Not Null | User's email address |
| `created_at` | `timestamptz` | Default: `now()` | |

`cvs`
| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` | |
| `user_id` | `uuid` | Foreign Key to `users(id)`, On Delete Cascade | |
| `cv_text` | `text` | | The full CV content as plain text. |
| `updated_at` | `timestamptz` | Default: `now()` | |

### APIs and Interfaces

**Authentication API**
-   `POST /api/v1/auth/register`: Creates a new user in Supabase Auth.
    -   Request Body: `{ "email": "...", "password": "..." }`
    -   Response: `{ "data": { "user_id": "...", "email": "..." } }`
-   `POST /api/v1/auth/login`: Authenticates a user and returns a JWT.
    -   Request Body: `{ "email": "...", "password": "..." }`
    -   Response: `{ "data": { "access_token": "...", "refresh_token": "..." } }`

**User & CV API**
-   `POST /api/v1/users/me/cv`: Creates the initial CV for the logged-in user.
    -   Auth: Required (Bearer Token)
    -   Request Body: `{ "cv_text": "..." }`
    -   Response: `{ "data": { "id": "...", "cv_text": "..." } }`
-   `PATCH /api/v1/users/me/cv`: Updates the CV for the logged-in user.
    -   Auth: Required (Bearer Token)
    -   Request Body: `{ "cv_text": "..." }`
    -   Response: `{ "data": { "id": "...", "cv_text": "..." } }`

### Workflows and Sequencing

**User Registration Workflow:**
1.  User fills out registration form on the frontend.
2.  Frontend sends `POST /api/v1/auth/register` request.
3.  Backend calls Supabase Auth to create the user.
4.  Backend calls Resend API to send a verification email.
5.  Backend returns success response.
6.  Frontend redirects user to the CV creation page.

**Hybrid Save Workflow:**
1.  User modifies a field in the CV form.
2.  The field's state becomes "unsaved" (yellow border).
3.  User tabs out of the field (onBlur event).
4.  Frontend triggers a `PATCH /api/v1/users/me/cv` request with the changed field's data.
5.  Backend updates the data in the `cvs` table.
6.  On success, the field's state becomes "saved" (green border).

## Non-Functional Requirements

### Performance

-   The login and registration API calls should respond in under 500ms.
-   The auto-save `PATCH` request should be lightweight and respond quickly to not interfere with the user experience.

### Security

-   All API endpoints that manage user-specific data must be protected and require a valid JWT.
-   Row Level Security (RLS) policies must be enabled on the `users` and `cvs` tables in Supabase to ensure a user can only access their own data.
-   Passwords must not be stored in plain text. This is handled by Supabase Auth.

### Reliability/Availability

-   The authentication service must be highly available. A failure to log in or register is a critical failure for the entire application.

### Observability

-   The backend should log successful registrations and logins.
-   Any errors during the registration or CV saving process should be logged with sufficient detail to diagnose the problem.

## Dependencies and Integrations

| Dependency | Version | Purpose |
| --- | --- | --- |
| React Hook Form| `~7.x` | Managing complex forms and validation on the frontend. |
| React Query | `~5.x` | Handling API data fetching, caching, and state management. |
| React Context | N/A | Managing client-side session state (JWT). |
| Resend | `~3.x` | Sending transactional emails (e.g., email verification). |

## Acceptance Criteria (Authoritative)

1.  A new user can register for an account and receives a verification email.
2.  A registered user can log in and a session is established.
3.  A logged-in user can create and save their CV information.
4.  A logged-in user can update their CV information.
5.  When updating the CV, changes are auto-saved when a user leaves a field.
6.  The "Stateful Textbox" component correctly shows "unsaved" and "saved" states.
7.  An unauthenticated user cannot access the CV creation/update page or its corresponding API endpoints.

## Traceability Mapping

| Acceptance Criterion | Spec Section(s) | Component(s)/API(s) | Test Idea |
| --- | --- | --- | --- |
| 1, 2 | APIs and Interfaces | Auth Page, `POST /register`, `POST /login` | E2E Test: Complete the full registration and login flow. |
| 3, 4 | APIs and Interfaces | CV Page, `POST /users/me/cv`, `PATCH /users/me/cv`| E2E Test: Log in and successfully create and then update a CV. |
| 5, 6 | Workflows | CV Page, Stateful Textbox | Component Test: Test the Stateful Textbox in isolation. E2E Test: Verify visual state changes during CV update. |
| 7 | Security | All CV endpoints | API Test: Attempt to call CV endpoints without a valid JWT and assert a 401/403 error. |

## Risks, Assumptions, Open Questions

| Type | Description | Mitigation / Next Step |
| --- | --- | --- |
| **Risk** | The "Hybrid Save" logic on the frontend could become complex to manage, especially with multiple fields. | Keep the state management simple using React Hook Form's `isDirty` flags and React Query's `isPending` flags. Thoroughly test the component interactions. |
| **Assumption** | The user's CV can be adequately represented as a single block of plain text for the MVP. | This is a core assumption of the PRD. If it proves false, a new epic will be needed for structured CVs. |

## Test Strategy Summary

-   **Unit/Component:** The "Stateful Textbox" component will be unit tested with Jest to ensure it correctly reflects its state props.
-   **API:** Backend API endpoints will be tested to ensure they correctly handle valid and invalid requests, and that authentication is enforced.
-   **E2E:** A full Playwright E2E test will cover the user journey: registration -> login -> create CV -> update CV. This will be the primary validation for the epic.
