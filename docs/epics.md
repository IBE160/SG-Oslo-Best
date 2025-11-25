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
- **I want** to have separate, initialized frontend and backend project structures within a single monorepo,
- **so that** I can begin development with a clean, organized codebase.
- **Acceptance Criteria:**
    - Given a new project folder,
    - When the initialization script is run,
    - Then a `frontend` folder with a new Next.js app is created.
    - And a `backend` folder with a new FastAPI app is created.
    - And both projects are committed to the Git repository.

**Story 1.2: Configure Supabase Integration**
- **As a** developer,
- **I want** to configure the Supabase project and integrate it with the backend,
- **so that** the application can interact with the database and authentication services.
- **Acceptance Criteria:**
    - Given a new Supabase project,
    - When the backend is configured with the Supabase URL and service key,
    - Then the backend can successfully connect to the Supabase database.
    - And the frontend is configured with the Supabase URL and anon key for client-side auth.

**Story 1.3: Implement Basic CI/CD Pipeline**
- **As a** developer,
- **I want** a basic CI/CD pipeline that automatically deploys the frontend and backend to Vercel,
- **so that** changes pushed to the main branch are always reflected in a live environment.
- **Acceptance Criteria:**
    - Given a Vercel project connected to the Git repository,
    - When changes are pushed to the `main` branch,
    - Then the Vercel pipeline automatically builds and deploys the Next.js frontend.
    - And the Vercel pipeline automatically builds and deploys the FastAPI backend.
    - And the deployed application is accessible via a Vercel URL.

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
- **Acceptance Criteria:**
    - Given I have a verified account and am on the landing page,
    - When I enter my email and password on the login form,
    - Then I am successfully authenticated via Supabase Auth.
    - And a secure session is established.
    - And I am redirected to my home page, seeing a pop-up to update my CV.

**Story 2.3: Create User Profile & CV (Initial)**
- **As a** logged-in student user,
- **I want** to create my initial profile and input my CV information into a single text area,
- **so that** the system has my basic data for cover letter generation.
- **Covers:** FR-1.3, FR-1.4, FR-1.5
- **Acceptance Criteria:**
    - Given I am logged in and have not yet created a profile,
    - When I navigate to the profile creation page,
    - Then I see fields for personal details and a large text area for CV content.
    - And the system indicates which fields are mandatory.
    - When I attempt to save with a mandatory field empty,
    - Then the system displays an error and prevents saving.
    - When I fill in all required fields and save,
    - Then my profile and CV data are stored in Supabase, linked to my user ID.
    - And I am redirected to the home page.

**Story 2.4: Update User Profile & CV with Hybrid Save**
- **As a** logged-in student user,
- **I want** to update my CV information using a form that auto-saves my work,
- **so that** I feel confident my changes are securely persisted with minimal effort.
- **Covers:** FR-1.3, FR-1.4
- **UX Spec:** Section 5.1.2 "Hybrid Save Model"
- **Complexity:** Higher
- **Acceptance Criteria:**
    - Given I am on my profile editing page,
    - When I modify a field,
    - Then the field's border indicates an "unsaved" state (e.g., turns yellow).
    - And a master "Save" button becomes enabled.
    - When I move focus away from the modified field (onBlur),
    - Then the change is automatically saved in the background.
    - And the field's border indicates a "saved" state (e.g., turns green).
    - When I click the manual "Save" button,
    - Then all pending changes are saved, and all modified fields show a "saved" state.

**New Story 2.5: Implement Stateful Textbox Component**
- **As a** developer,
- **I want** to create a "Stateful Textbox" component,
- **so that** users receive immediate visual feedback (e.g., colored borders) on the auto-save status of their CV information.
- **UX Spec:** Section 6.1.2 "Custom Components"
- **Acceptance Criteria:**
    - Given a standard textarea or input field,
    - When it is wrapped in the Stateful Textbox component,
    - Then it visually changes its appearance based on its state (default, unsaved, saved).
    - And it correctly communicates its state to the parent form for the Hybrid Save Model.

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
- **Acceptance Criteria:**
    - Given I have provided a job advertisement,
    - When I click the "Generate" button,
    - Then the UI shows the "Generation Status Indicator".
    - And the backend receives my CV data, the job ad, and any instructions.
    - And the backend sends a structured prompt to the Gemini API.
    - And the generated cover letter text is returned to the frontend.

**Story 3.3: Display and Review Generated Cover Letter**
- **As a** logged-in student user,
- **I want** the generated cover letter to be displayed clearly on the screen,
- **so that** I can review its content and decide on the next action.
- **Covers:** FR-3.4
- **UX Spec:** Section 5.1.3 "Cover Letter Generation"
- **Acceptance Criteria:**
    - Given the cover letter has been generated successfully,
    - When the frontend receives the letter text,
    - Then the text is displayed in a clear, readable format in the output panel.
    - And I can see options to "Regenerate" and "Save" the letter.

**Story 3.4: Regenerate and Compare Cover Letter Versions**
- **As a** logged-in student user,
- **I want** to regenerate a cover letter and easily compare it with previous versions,
- **so that** I can choose the best output.
- **Covers:** FR-3.5
- **UX Spec:** Section 5.1.3, Step 6
- **Complexity:** Significantly Higher
- **Acceptance Criteria:**
    - Given a cover letter is displayed,
    - When I modify instructions and click "Regenerate",
    - Then a new version of the cover letter is generated.
    - And the output panel displays the new version ("Version 2") in an active tab.
    - And a "Version 1" tab is present, allowing me to switch back and view the original.

**Story 3.5: Save Generated Cover Letter**
- **As a** logged-in student user,
- **I want** to save a generated cover letter that I am satisfied with,
- **so that** I can access it later.
- **Covers:** FR-3.6
- **Acceptance Criteria:**
    - Given a cover letter is displayed,
    - When I click the "Save" button,
    - Then the button's state changes to "Saved ✓" and becomes disabled.
    - And a toast notification confirms the save action.
    - And the cover letter text is saved to the Supabase database, associated with my user ID.

**Story 3.6: Update Job Application**
- **As a** logged-in student user,
- **I want** to update the text of a job application I previously created,
- **so that** I can correct mistakes or add new information.
- **Covers:** FR-2.2
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
- **Acceptance Criteria:**
    - Given I have an existing job application,
    - When I choose the delete option and confirm the deletion,
    - Then the job application and any associated saved cover letters are removed from the database.

**New Story 3.8: Implement Generation Status Indicator Component**
- **As a** developer,
- **I want** to create the "Generation Status Indicator" component,
- **so that** users are kept engaged and informed during the AI generation process with a loading spinner and specified text.
- **UX Spec:** Section 6.1.2 "Custom Components"
- **Acceptance Criteria:**
    - Given the AI generation process is initiated,
    - When the component is displayed,
    - Then it shows a loading spinner.
    - And it periodically displays the message "Please give us an A".
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