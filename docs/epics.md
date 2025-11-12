# CVAI Turbo - Epics & Stories

**Author:** BIP
**Date:** 2025-11-12
**Version:** 1.0

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
- **I want** to register for an account with my email and password,
- **so that** I can access the CVAI Turbo platform.
- **Covers:** FR-1.1
- **Acceptance Criteria:**
    - Given I am on the registration page,
    - When I enter a valid email and password and submit the form,
    - Then my account is created in Supabase Auth.
    - And I receive a verification email.
    - And I am redirected to a login or verification pending page.

**Story 2.2: User Login & Session Management**
- **As a** registered student user,
- **I want** to log in to my account,
- **so that** I can access my profile and application features.
- **Covers:** FR-1.2
- **Acceptance Criteria:**
    - Given I have a verified account,
    - When I enter my email and password on the login page,
    - Then I am successfully authenticated via Supabase Auth.
    - And a secure session is established.
    - And I am redirected to my home page.

**Story 2.3: Create User Profile & CV (Initial)**
- **As a** logged-in student user,
- **I want** to create my initial profile and input my CV information into a single text area,
- **so that** the system has my basic data for cover letter generation.
- **Covers:** FR-1.3, FR-1.4, FR-1.5
- **Acceptance Criteria:**
    - Given I am logged in and have not yet created a profile,
    - When I navigate to the profile creation page,
    - Then I see fields for personal details (name, DOB, gender, phone, address) and a large text area for CV content.
    - When I fill in the required fields and save,
    - Then my profile and CV data are stored in Supabase, linked to my user ID.
    - And I am redirected to the home page.

**Story 2.4: Update User Profile & CV**
- **As a** logged-in student user,
- **I want** to update my personal profile and CV information,
- **so that** my cover letters are generated with the most current details.
- **Covers:** FR-1.3, FR-1.4
- **Acceptance Criteria:**
    - Given I am logged in and have an existing profile,
    - When I navigate to my profile editing page,
    - Then I see my current profile and CV information pre-filled.
    - When I modify any field and save,
    - Then the updated information is persisted in Supabase.

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
    - Given I am on the "New Job Application" page,
    - When I paste a job advertisement into the designated text area,
    - And I (optionally) write instructions for style and tone,
    - Then the application captures both inputs, ready for generation.

**Story 3.2: Generate Cover Letter**
- **As a** logged-in student user,
- **I want** to click a "Generate" button to create a cover letter,
- **so that** I can receive an AI-drafted letter tailored to the job.
- **Covers:** FR-3.2, FR-3.3
- **Acceptance Criteria:**
    - Given I have provided a job advertisement,
    - When I click the "Generate" button,
    - Then the backend receives my CV data, the job ad, and my instructions.
    - And the backend sends a structured prompt to the Gemini API.
    - And the generated cover letter text is returned to the frontend.

**Story 3.3: Display and Review Generated Cover Letter**
- **As a** logged-in student user,
- **I want** the generated cover letter to be displayed clearly on the screen,
- **so that** I can review its content and decide on the next action.
- **Covers:** FR-3.4
- **Acceptance Criteria:**
    - Given the cover letter has been generated successfully,
    - When the frontend receives the letter text,
    - Then the text is displayed in a clear, readable format.
    - And I can see options to "Regenerate" or "Save" the letter.

**Story 3.4: Regenerate Cover Letter**
- **As a** logged-in student user,
- **I want** to be able to regenerate a cover letter if I'm not satisfied,
- **so that** I can get a different version or provide new instructions.
- **Covers:** FR-3.5
- **Acceptance Criteria:**
    - Given a cover letter is displayed,
    - When I click the "Regenerate" button,
    - Then I am taken back to the input screen with the previous job ad and instructions pre-filled.
    - And I can modify the instructions before generating a new letter.

**Story 3.5: Save Generated Cover Letter**
- **As a** logged-in student user,
- **I want** to save a generated cover letter that I am satisfied with,
- **so that** I can access it later.
- **Covers:** FR-3.6
- **Acceptance Criteria:**
    - Given a cover letter is displayed,
    - When I click the "Save" button,
    - Then the cover letter text is saved to the Supabase database, associated with my user ID and the job application.
    - And I receive a confirmation that the letter has been saved.

---

## Final Review and Approval

The epic and story breakdown for CVAI Turbo has been completed.

**Summary of Epics:**
- **Epic 1: Foundation & Setup:** Establishes the core technical environment.
- **Epic 2: User Onboarding & Profile Management:** Handles user accounts and personal data.
- **Epic 3: Core Cover Letter Generation:** Delivers the primary AI-powered functionality.

This breakdown ensures that all functional and non-functional requirements from the PRD are covered. The stories are designed to be vertically sliced, sequentially ordered, and small enough for single-session completion by a development agent. The BDD acceptance criteria provide clear and testable definitions for each story.

This document is now ready to serve as the basis for the architecture and implementation phases.
