# CVAI Turbo - Epics & Stories

**Author:** BIP
**Date:** 2025-11-21
**Version:** 1.2 (Aligned with UX Spec v1.0)

---

## Epic Summary

This document breaks down the requirements from the PRD into actionable epics and stories for the development team.

*   **Epic 1: Foundation & Setup**
    *   **Value:** Establish the core technical foundation, including project structure, CI/CD pipeline, and essential configurations, to enable all future development.
    *   **Scope:** Set up the frontend (Next.js) and backend (FastAPI) projects, configure the Supabase database and authentication, and establish a basic deployment pipeline on Vercel.

*   **Epic 2: User Onboarding & Profile Management**
    *   **Value:** Allow students to create an account, log in, and manage their personal and CV information, which is the foundation for generating cover letters.
    *   **Scope:** Implement user registration, login, and the UI/API for creating and updating user profiles and CV data.

*   **Epic 3: Core Cover Letter Generation**
    *   **Value:** Deliver the primary value of the application by enabling students to generate a customized cover letter based on their CV and a job description.
    *   **Scope:** Implement the UI for inputting a job ad and instructions, the backend logic to integrate with the Gemini API, and the display of the generated cover letter.

---
<br>

## Epic 1: Foundation & Setup

**Goal:** Establish the core technical foundation, including project structure, CI/CD pipeline, and essential configurations, to enable all future development.

### Stories:

**Story 1.1: Initialize Project Repositories & Structure**
- **As a** developer,
- **I want** to set up a monorepo with initialized frontend and backend projects using specific toolchains,
- **so that** development can begin on a clean, standardized, and well-organized codebase.
- **Technical Notes:**
    - The monorepo will be managed using NPM/PNPM Workspaces as defined in the Architecture Spec.
    - The project structure should follow the diagram outlined in the Architecture Spec.
- **Acceptance Criteria:**
    - Given a new project folder configured with pnpm workspaces,
    - When the initialization script is run,
    - Then a `frontend` folder is created and initialized as a Next.js application using `npx create-next-app@latest`.
    - And Shadcn/UI is initialized within the frontend project using `npx shadcn-ui@latest init`.
    - And a `backend` folder is created and initialized with a standard FastAPI project structure.
    - And a `packages/shared-types` folder is created for shared TypeScript interfaces.

**Story 1.2: Configure Supabase Integration**
- **As a** developer,
- **I want** to configure the Supabase project and securely integrate it with both the frontend and backend,
- **so that** the application can utilize Supabase for database and authentication services.
- **Technical Notes:**
    - Database tables, functions, and Row Level Security (RLS) policies will be defined directly within the Supabase project dashboard or via SQL migrations.
- **Acceptance Criteria:**
    - Given a new Supabase project,
    - When the backend environment is configured,
    - Then it securely stores and uses the Supabase URL and `service_role` key for administrative database access.
    - When the frontend environment is configured,
    - Then it uses the Supabase URL and `anon` key for client-side authentication and data fetching.
    - And the backend can establish a validated connection to the Supabase database.

**Story 1.3: Implement Basic CI/CD Pipeline**
- **As a** developer,
- **I want** a basic CI/CD pipeline that automatically builds and deploys the entire monorepo to Vercel,
- **so that** changes pushed to the main branch are always reflected in a live, integrated environment.
- **Technical Notes:**
    - This pipeline implements the strategy outlined in the Deployment Architecture section of the architecture document.
- **Acceptance Criteria:**
    - Given a Vercel project connected to the Git monorepo,
    - When changes are pushed to the `main` branch,
    - Then the Vercel pipeline automatically builds and deploys the Next.js frontend.
    - And the Vercel pipeline automatically builds and deploys the FastAPI backend as serverless functions.
    - And the deployed application is accessible and functional via a public Vercel URL.

---
<br>

## Epic 2: User Onboarding & Profile Management

**Goal:** Allow students to create an account, log in, and manage their personal and CV information, which is the foundation for generating cover letters.

### Stories:

**Story 2.1: User Registration**
- **As a** new student user,
- **I want** to register for an account using a single, dynamic form,
- **so that** I can access the CVAI Turbo platform seamlessly.
- **Covers:** FR-1.1
- **UX Spec:** Section 5.1.1 "Dynamic Toggle"
- **Complexity:** Slightly Higher
- **Technical Notes:**
    - The frontend form will be managed by React Hook Form.
    - The backend will expose a `POST /api/v1/auth/register` endpoint using FastAPI.
    - User creation will be handled by Supabase Auth.
    - The verification email will be sent via the Resend service.
- **Acceptance Criteria:**
    - Given I am on the landing page,
    - When I click the "Sign Up" link,
    - Then the form expands to include registration fields without a page reload.
    - When I enter valid details and submit the form,
    - Then my account is created in Supabase Auth.
    - And I receive a verification email.
    - And I am redirected to the CV creation page.

**Story 2.2: User Login & Session Management**
- **As a** registered student user,
- **I want** to log in to my account from the same page as registration,
- **so that** I can access my profile and application features.
- **Covers:** FR-1.2
- **UX Spec:** Section 5.1.1 "Dynamic Toggle"
- **Complexity:** Slightly Higher
- **Technical Notes:**
    - The backend will expose a `POST /api/v1/auth/login` endpoint.
    - Supabase Auth will validate credentials and issue a JWT.
    - The JWT and session state will be managed on the frontend using React Context.
- **Acceptance Criteria:**
    - Given I have a verified account and am on the landing page,
    - When I enter my email and password on the login form and submit,
    - Then I am successfully authenticated via Supabase Auth.
    - And a secure session is established on the client.
    - And I am redirected to my main application page.
    - And a pop-up appears asking if I would like to update my CV information.

**Story 2.3: Create User Profile & CV (Initial)**
- **As a** logged-in student user,
- **I want** to create my initial profile and input my CV information into a single text area,
- **so that** the system has my basic data for cover letter generation.
- **Covers:** FR-1.3, FR-1.4, FR-1.5
- **Technical Notes:**
    - The frontend form will be managed using React Hook Form.
    - On submission, data is sent to a `POST /api/v1/users/me/cv` endpoint.
    - The backend service will store the profile and CV data in the corresponding Supabase tables, linked to the authenticated user's ID.
- **Acceptance Criteria:**
    - Given I am logged in for the first time,
    - When I am redirected to the profile creation page,
    - Then I see fields for personal details and a large text area for CV content.
    - When I attempt to save with a mandatory field empty,
    - Then the system displays an inline error and prevents saving.
    - When I fill in all required fields and save,
    - Then my profile and CV data are successfully stored.
    - And I am redirected to the main application dashboard.

**Story 2.4: Update User Profile & CV with Hybrid Save**
- **As a** logged-in student user,
- **I want** to update my CV information using a form that auto-saves my work,
- **so that** I feel confident my changes are securely persisted with minimal effort.
- **Covers:** FR-1.3, FR-1.4
- **UX Spec:** Section 5.1.2 "Hybrid Save Model"
- **Complexity:** Higher
- **Technical Notes:**
    - The form will be managed by React Hook Form.
    - The visual state of each field will be handled by the `Stateful Textbox` component (Story 2.5).
    - Field-level auto-saves (onBlur) will trigger a `PATCH /api/v1/users/me/cv` request with the specific field's data.
    - The overall UI state (e.g., "Unsaved changes...") will be managed via React Context.
- **Acceptance Criteria:**
    - Given I am on my profile editing page,
    - When I modify a field,
    - Then the field's border indicates an "unsaved" state (e.g., turns yellow).
    - And a master "Save" button becomes enabled.
    - When I move focus away from the modified field (onBlur),
    - Then the change is automatically saved in the background via a PATCH request.
    - And the field's border indicates a "saved" state (e.g., turns green).
    - When I click the manual "Save" button,
    - Then all pending changes are sent in a single PATCH request, and all modified fields show a "saved" state.

**New Story 2.5: Implement Stateful Textbox Component**
- **As a** developer,
- **I want** to create a "Stateful Textbox" component,
- **so that** users receive immediate visual feedback (e.g., colored borders) on the auto-save status of their CV information.
- **UX Spec:** Section 6.1.2 "Custom Components"
- **Technical Notes:**
    - This is a reusable UI component to be built with React/TypeScript and styled with Tailwind CSS.
    - It will manage its own visual state (e.g., border color) based on props passed down from the parent form (e.g., `isDirty`, `isSaved`).
- **Acceptance Criteria:**
    - Given a standard textarea or input field,
    - When it is wrapped in the Stateful Textbox component,
    - Then it visually changes its appearance based on its state (default, unsaved, saved).
    - And it correctly reflects the field's state as managed by the parent form (React Hook Form).

---
<br>

## Epic 3: Core Cover Letter Generation

**Goal:** Deliver the primary value of the application by enabling students to generate a customized cover letter based on their CV and a job description.

### Stories:

**Story 3.1: Input Job Application and Instructions**
- **As a** logged-in student user,
- **I want** to input a job advertisement and provide optional instructions,
- **so that** I can prepare the context for generating a tailored cover letter.
- **Covers:** FR-2.1, FR-3.1
- **Technical Notes:**
    - The input form will be managed using React Hook Form.
    - Submitting or saving the job application will interact with a `POST /api/v1/job-applications` endpoint.
- **Acceptance Criteria:**
    - Given I am on the main generation page,
    - When I paste a job advertisement into the designated text area,
    - Then the "Generate" button becomes enabled.
    - And I can (optionally) write instructions for style and tone.
    - Then the application captures all inputs, ready for generation.

**Story 3.2: Generate Cover Letter**
- **As a** logged-in student user,
- **I want** to click a "Generate" button to create a cover letter,
- **so that** I can receive an AI-drafted letter tailored to the job.
- **Covers:** FR-3.2, FR-3.3
- **Technical Notes:**
    - The frontend will send the user's CV data (retrieved from profile), job advertisement, and optional instructions to a `POST /api/v1/generation` endpoint.
    - The backend service will then interact with the Gemini API to generate the cover letter.
    - React Query will be used on the frontend to manage the loading, error, and success states of this API call.
- **Acceptance Criteria:**
    - Given I have provided a job advertisement and clicked "Generate",
    - When the generation process begins,
    - Then all input fields are temporarily disabled.
    - And the UI shows the "Generation Status Indicator" (Story 3.8).
    - And the backend receives the necessary data, integrates with the Gemini API, and returns the generated text.
    - When the generation is complete, the generated cover letter text is returned to the frontend.

**Story 3.3: Display and Review Generated Cover Letter**
- **As a** logged-in student user,
- **I want** the generated cover letter to be displayed clearly on the screen,
- **so that** I can review its content and decide on the next action.
- **Covers:** FR-3.4
- **UX Spec:** Section 5.1.3 "Cover Letter Generation"
- **Technical Notes:**
    - The generated text will be presented in a readable, non-editable area, likely a `Textarea` from Shadcn/UI.
    - React Query will manage the state of the fetched cover letter data.
    - The "Regenerate" and "Save" buttons will be conditionally rendered once the cover letter is successfully displayed.
- **Acceptance Criteria:**
    - Given the cover letter has been generated successfully,
    - When the frontend receives the letter text,
    - Then the text is displayed in a clear, readable format within the output panel.
    - And the "Regenerate" and "Save" buttons become visible and enabled.

**Story 3.4: Regenerate and Compare Cover Letter Versions**
- **As a** logged-in student user,
- **I want** to regenerate a cover letter and easily compare it with previous versions,
- **so that** I can choose the best output.
- **Covers:** FR-3.5
- **UX Spec:** Section 5.1.3, Step 6
- **Complexity:** Significantly Higher
- **Technical Notes:**
    - The frontend will use React Context to manage the state of multiple generated cover letter versions.
    - The tabbed interface for comparing versions will be implemented using Shadcn/UI Tabs.
    - Each "Regenerate" action will trigger a new `POST /api/v1/generation` request.
    - React Query will manage the data fetching and caching for these versions.
- **Acceptance Criteria:**
    - Given a cover letter is displayed,
    - When I modify instructions and click "Regenerate",
    - Then a new version of the cover letter is generated via the API.
    - And the output panel displays the new version as the active tab (e.g., "Version 2").
    - And a tab for the previous version (e.g., "Version 1") is present, allowing for easy switching and comparison.

**Story 3.5: Save Generated Cover Letter**
- **As a** logged-in student user,
- **I want** to save a generated cover letter that I am satisfied with,
- **so that** I can access it later.
- **Covers:** FR-3.6
- **Technical Notes:**
    - The frontend will send a `POST` request to `/api/v1/cover-letters` containing the selected cover letter content, linked to the current job application.
    - The backend will store this data in the Supabase database, associated with the user's ID.
    - A success notification will be displayed using a Shadcn/UI Toast component.
- **Acceptance Criteria:**
    - Given a cover letter is displayed,
    - When I click the "Save" button,
    - Then the button's state changes to "Saved ✓" and becomes disabled.
    - And a toast notification confirms the save action.
    - And the cover letter text is successfully saved to the Supabase database, associated with my user ID and the job application.

**Story 3.6: Update Job Application**
- **As a** logged-in student user,
- **I want** to update the text of a job application I previously created,
- **so that** I can correct mistakes or add new information.
- **Covers:** FR-2.2
- **Technical Notes:**
    - The frontend form for editing will be managed by React Hook Form.
    - Updates will be sent via a `PATCH` request to `/api/v1/job-applications/{job_application_id}`.
    - The backend will update the corresponding job application entry in Supabase.
- **Acceptance Criteria:**
    - Given I have an existing job application,
    - When I navigate to the application's edit page,
    - Then I see the current job advertisement text pre-filled.
    - When I modify the text and save,
    - Then the updated text is persisted in the database.

**Story 3.7: Delete Job Application**
- **As a** logged-in student user,
- **I want** to delete a job application I no longer need,
- **so that** I can keep my workspace clean.
- **Covers:** FR-2.3
- **Technical Notes:**
    - The frontend will issue a `DELETE` request to `/api/v1/job-applications/{job_application_id}`.
    - The backend must ensure that associated cover letters are also deleted (e.g., via database cascading delete or explicit service logic).
    - Frontend implementation should include a confirmation step (e.g., a modal) as per UX Spec Section 7.1.7 "Confirmation Patterns" to prevent accidental deletion.
- **Acceptance Criteria:**
    - Given I have an existing job application,
    - When I choose the delete option and confirm the deletion,
    - Then the job application and all associated saved cover letters are permanently removed from the database.

**New Story 3.8: Implement Generation Status Indicator Component**
- **As a** developer,
- **I want** to create the "Generation Status Indicator" component,
- **so that** users are kept engaged and informed during the AI generation process with a loading spinner and specified text.
- **UX Spec:** Section 6.1.2 "Custom Components"
- **Technical Notes:**
    - This is a reusable UI component to be built with React/TypeScript and styled with Tailwind CSS.
    - Accessibility considerations, as per UX Spec Section 8.2.1, must be included (e.g., `aria-live="polite"` for the content area, visually hidden text for screen readers).
- **Acceptance Criteria:**
    - Given the AI generation process is initiated,
    - When the component is displayed,
    - Then it shows an active loading spinner.
    - And it periodically displays the message "Please give us an A".
    - And user input fields are disabled while it is active.
    - When generation is complete, the component is hidden.

---

## Final Review and Approval

The epic and story breakdown for CVAI Turbo has been completed.

**Summary of Epics:**
- **Epic 1: Foundation & Setup:** Establishes the core technical environment.
- **Epic 2: User Onboarding & Profile Management:** Handles user accounts and personal data.
- **Epic 3: Core Cover Letter Generation:** Delivers the primary AI-powered functionality.

This breakdown ensures that all functional and non-functional requirements from the PRD are covered. The stories are designed to be vertically sliced, sequentially ordered, and small enough for single-session completion by a development agent. The BDD acceptance criteria provide clear and testable definitions for each story.

This document is now ready to serve as the basis for the architecture and implementation phases.