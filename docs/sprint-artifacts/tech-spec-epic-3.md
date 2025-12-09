# Epic Technical Specification: Core Cover Letter Generation

Date: 2025-12-02
Author: BIP
Epic ID: 3
Status: Draft

---

## Overview

This document provides the technical specification for Epic 3: Core Cover Letter Generation. This epic is the centerpiece of the CVAI Turbo application, delivering the primary value to the user. It encompasses the entire workflow for a logged-in user to input a job application, provide instructions, generate a cover letter using the Gemini API, and then review, regenerate, and save the output. This involves significant frontend work to manage the UI state and backend work to orchestrate the AI integration.

## Objectives and Scope

**In-Scope:**
-   A UI for inputting a job advertisement and optional generation instructions.
-   A backend endpoint (`POST /api/v1/generation`) that takes the user's CV, the job ad, and instructions to generate a cover letter.
-   Integration with the Gemini API for the core text generation.
-   A UI to display the generated cover letter.
-   A "Regenerate" feature that allows users to get a new version of the cover letter, with a tabbed interface to compare versions.
-   A "Save" feature that persists a chosen cover letter to the database.
-   Backend endpoints to manage job applications (`POST`, `PATCH`, `DELETE /api/v1/job-applications`) and saved cover letters (`POST /api/v1/cover-letters`).
-   A reusable "Generation Status Indicator" component to provide user feedback during AI generation.

**Out-of-Scope:**
-   In-app editing of the generated cover letter.
-   Downloading the cover letter in different formats (e.g., PDF, DOCX).
-   Any functionality not directly related to the generation and management of a single job application's cover letters.

## System Architecture Alignment

This epic is a prime example of the application's decoupled architecture in action.
-   **Frontend/Backend Separation:** The `frontend` will manage the entire user-facing experience, including the complex state for version comparison, while the `backend` handles the "heavy lifting" of integrating with the Gemini API.
-   **API Communication:** The frontend will use `React Query` to make asynchronous calls to the backend's `/api/v1/generation` and other related endpoints, managing loading, success, and error states gracefully.
-   **State Management:** `React Context` will be crucial on the frontend for managing the state of multiple regenerated cover letter versions in the tabbed comparison UI.
-   **Database:** New tables for `job_applications` and `cover_letters` will be added to the Supabase database, with Row Level Security (RLS) policies to protect user data.

## Detailed Design

### Services and Modules

| Service/Module | Responsibilities | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| **Frontend: Generation Page** | Render the main UI for job ad input, instructions, generation, and displaying results. | Job ad, instructions. | API calls to the backend. | Dev |
| **Frontend: Generation Status Indicator** | Reusable UI component to show a loading state during AI generation. | `isActive` prop. | Loading spinner and text. | Dev |
| **Backend: Generation Service** | Orchestrate the cover letter generation process. | User CV, job ad, instructions. | Generated text from Gemini API. | Dev |
| **Backend: Job Application Service** | CRUD operations for job applications. | Job application data. | Database records. | Dev |
| **Backend: Cover Letter Service** | Save generated cover letters. | Cover letter text. | Database records. | Dev |

### Data Models and Contracts

**Supabase Tables:**

`job_applications`
| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key | |
| `user_id` | `uuid` | Foreign Key to `users(id)`, On Delete Cascade | |
| `job_ad_text` | `text` | | The full job ad content. |
| `created_at` | `timestamptz` | | |

`cover_letters`
| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | Primary Key | |
| `job_application_id` | `uuid` | Foreign Key to `job_applications(id)`, On Delete Cascade | |
| `user_id` | `uuid` | Foreign Key to `users(id)` | Denormalized for easier RLS policies. |
| `letter_text` | `text` | | The generated cover letter content. |
| `version` | `integer` | | The version number of the letter for a given job app. |
| `created_at` | `timestamptz` | | |

### APIs and Interfaces

**Generation API**
-   `POST /api/v1/generation`: Kicks off the cover letter generation.
    -   Auth: Required (Bearer Token)
    -   Request Body: `{ "job_application_id": "...", "instructions": "..." }`
    -   Response: `{ "data": { "generated_text": "..." } }`

**Job Application API**
-   `POST /api/v1/job-applications`: Creates a new job application.
    -   Auth: Required
    -   Request Body: `{ "job_ad_text": "..." }`
    -   Response: `{ "data": { "id": "..." } }`
-   `PATCH /api/v1/job-applications/{job_application_id}`: Updates a job application.
    -   Auth: Required
    -   Request Body: `{ "job_ad_text": "..." }`
    -   Response: `{ "data": { "id": "..." } }`
-   `DELETE /api/v1/job-applications/{job_application_id}`: Deletes a job application.
    -   Auth: Required
    -   Response: `204 No Content`

**Cover Letter API**
-   `POST /api/v1/cover-letters`: Saves a generated cover letter.
    -   Auth: Required
    -   Request Body: `{ "job_application_id": "...", "letter_text": "...", "version": 1 }`
    -   Response: `{ "data": { "id": "..." } }`

### Workflows and Sequencing

**Cover Letter Generation Workflow:**
1.  User fills in the job ad on the frontend and clicks "Generate".
2.  Frontend first makes a `POST /api/v1/job-applications` call to save the job ad and get an ID.
3.  Frontend then makes a `POST /api/v1/generation` call with the new `job_application_id`.
4.  While waiting, the frontend displays the "Generation Status Indicator".
5.  The backend retrieves the user's CV, calls the Gemini API with all the context.
6.  The backend returns the generated text.
7.  The frontend displays the text in the output panel.

## Non-Functional Requirements

### Performance

-   The AI generation process is the most performance-critical part. While the generation itself may take several seconds, the backend should stream the response back to the frontend if possible, or at least return the full response as quickly as possible after the AI service is done. The frontend must provide clear loading indicators during this time.

### Security

-   The Gemini API key must be stored securely on the backend and never exposed to the client.
-   All endpoints in this epic must be protected and require a valid JWT.
-   RLS policies must prevent a user from accessing or managing job applications or cover letters that do not belong to them. The `DELETE` endpoint must be particularly secure to prevent a user from deleting another user's data.

### Reliability/Availability

-   The integration with the Gemini API should be resilient to errors. If the API fails, the backend should catch the error and return a user-friendly error message to the frontend.

### Observability

-   Log the start and end of each generation request, including the time taken.
-   Log any errors received from the Gemini API.

## Dependencies and Integrations

| Dependency | Version | Purpose |
| --- | --- | --- |
| Gemini API | N/A | The core Large Language Model for text generation. |
| React Query | `~5.x` | To manage the complex state of the generation API call (loading, error, success, data). |
| React Context | N/A | To manage the state of multiple cover letter versions for the comparison UI. |

## Acceptance Criteria (Authoritative)

1.  A logged-in user can input a job ad, click "Generate", and see a generated cover letter.
2.  The "Generation Status Indicator" is displayed while the AI is working.
3.  The user can click "Regenerate" to get a new version, and compare the new and old versions in a tabbed UI.
4.  The user can click "Save" to persist their chosen cover letter.
5.  A user can delete a job application, which also deletes all associated saved cover letters.
6.  An unauthenticated user cannot access any of the generation or data management APIs.

## Traceability Mapping

| Acceptance Criterion | Spec Section(s) | Component(s)/API(s) | Test Idea |
| --- | --- | --- | --- |
| 1, 2 | APIs and Interfaces | Generation Page, `POST /generation` | E2E Test: Log in, paste a job ad, click generate, and verify text appears. |
| 3 | Workflows | Generation Page, `POST /generation` | E2E Test: After generating, click regenerate and verify a new tab appears with new content. |
| 4 | APIs and Interfaces | `POST /cover-letters` | E2E Test: Generate a letter and click save. Verify a success toast appears. |
| 5 | APIs and Interfaces | `DELETE /job-applications`| E2E Test: Create a job application, then delete it and confirm it is gone. |
| 6 | Security | All APIs in epic | API Test: Attempt to call endpoints without a JWT and assert a 401/403 error. |

## Risks, Assumptions, Open Questions

| Type | Description | Mitigation / Next Step |
| --- | --- | --- |
| **Risk** | The Gemini API may be slow or return unexpected/low-quality results. | Implement robust error handling and loading states. The prompt sent to the Gemini API must be carefully engineered and tested to maximize quality. |
| **Risk** | Managing the state for the version comparison UI could be complex. | Use React Context to create a dedicated provider for this state, encapsulating the logic and making it easier to manage and test. |
| **Assumption**| The cost of the Gemini API will be within the project's budget for development and testing. | Monitor API usage. |

## Test Strategy Summary

-   **Component:** The "Generation Status Indicator" will be tested in isolation to ensure it displays correctly based on its props.
-   **API:** All new backend endpoints will be tested. The most critical test will be for the `DELETE` endpoint to ensure it correctly cascades deletes and respects RLS.
-   **Integration:** An integration test on the backend will mock the Gemini API call to ensure the `Generation Service` correctly handles success and error responses from the external service.
-   **E2E:** A full Playwright E2E test will cover the entire flow: create job ad -> generate -> regenerate -> save -> delete. This is the ultimate validation of the epic's functionality.
