# Story 1.1: Initialize Project Repositories & Structure

Status: ready-for-review

## Story

As a developer,
I want to set up a monorepo with initialized frontend and backend projects using specific toolchains,
so that development can begin on a clean, standardized, and well-organized codebase.

## Requirements Context Summary

This story focuses on establishing the foundational project structure as a monorepo, integrating Next.js for the frontend, FastAPI for the backend, and Shadcn/UI for the UI components. The monorepo will utilize NPM/PNPM Workspaces for efficient management and shared TypeScript types.

### Key Requirements

*   **Project Initialization:**
    *   Initialize a Next.js application for the frontend.
    *   Initialize Shadcn/UI within the frontend project.
    *   Establish a FastAPI project structure for the backend.
    *   Create a `packages/shared-types` directory for shared TypeScript interfaces.
*   **Monorepo Structure:**
    *   The overall project will be a monorepo.
    *   NPM/PNPM Workspaces will manage `frontend`, `backend`, and `packages/shared-types`.
    *   The directory structure should align with the defined architectural diagram.

### Relevant Architecture & Standards

*   **Core Technologies:** Next.js (frontend), FastAPI (backend), TypeScript, Python, Shadcn/UI.
*   **Monorepo Tooling:** NPM/PNPM Workspaces.
*   **Initialization Commands:**
    *   `npx create-next-app@latest . --typescript --eslint --app --tailwind --src-dir --import-alias "@/*"`
    *   `npx shadcn-ui@latest init`
    *   Python `venv` and `pip install -r requirements.txt` for backend.
*   **Project Structure Overview:**
    ```
    /
    ├── packages/
    │   └── shared-types/
    ├── frontend/
    ├── backend/
    ├── .gitignore
    ├── package.json
    └── README.md
    ```
*   **Naming Conventions:** Adhere to PascalCase for React components, kebab-case for most frontend files, and snake_case for Python/database elements where applicable in initial setup.
*   **Shared Utilities:** `packages/shared-types/` for type safety between frontend and backend.

## Project Structure Alignment and Lessons Learned

### Learnings from Previous Story

First story in epic - no predecessor context. There are no previous story learnings to incorporate.

### Unified Project Structure Alignment

No `unified-project-structure.md` found. Alignment will be based on the Architecture document and the requirements for this story.

## Acceptance Criteria

*Note: The following are the authoritative Acceptance Criteria for the initial project setup, sourced from the Epic 1 Technical Specification.*

1.  A monorepo exists with `frontend`, `backend`, and `packages/shared-types` directories.
2.  The `frontend` directory contains a functional, default Next.js application.
3.  Shadcn/UI is initialized in the frontend project.
4.  The `backend` directory contains a functional, default FastAPI application.
5.  The frontend and backend applications have separate `.env.example` files documenting the required Supabase environment variables.
6.  A push to the `main` branch successfully triggers a deployment on Vercel.
7.  The deployed Vercel application is accessible via its URL and both the frontend and backend default pages load correctly.

## Tasks / Subtasks

- [ ] **Initialize Monorepo Structure (AC: #1)**
  - [ ] Set up `package.json` at the root to define workspaces for `frontend`, `backend`, and `packages/shared-types`.
  - [ ] Create `frontend/`, `backend/`, and `packages/shared-types/` directories.
- [ ] **Initialize Frontend Project (AC: #2, #3)**
  - [ ] Execute `npx create-next-app@latest frontend --typescript --eslint --app --tailwind --src-dir --import-alias "@/*"`.
  - [ ] Navigate to the `frontend` directory and run `npx shadcn-ui@latest init`.
- [ ] **Initialize Backend Project (AC: #4)**
  - [ ] Create a Python virtual environment in the `backend` directory.
  - [ ] Install FastAPI and Uvicorn.
  - [ ] Create a basic `main.py` with a health check endpoint and a `requirements.txt` file.
- [ ] **Create Shared Types Package (AC: #1)**
  - [ ] Create `packages/shared-types/package.json` and a placeholder `index.ts`.
- [ ] **Configure Environment Variables (AC: #5)**
  - [ ] Create a `.env.example` file in the `frontend` directory with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - [ ] Create a `.env.example` file in the `backend` directory with `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.
- [ ] **Set up Vercel Deployment (AC: #6, #7)**
  - [ ] Configure the Vercel project to correctly build the monorepo, identifying the frontend and backend components.
  - [ ] Add the Supabase environment variables to the Vercel project settings for both Production and Preview deployments.
- [ ] **Verification and Testing (AC: #1, #2, #3, #4, #7)**
  - [ ] [Test] Run `pnpm install` at the root and verify that all workspace dependencies are linked without errors.
  - [ ] [Test] Run the Next.js development server and confirm the default application page loads correctly in a browser.
  - [ ] [Test] Run the FastAPI development server and confirm the health check endpoint is accessible and returns a success status.
  - [ ] [Test] After merging to the `main` branch, verify that the Vercel deployment completes successfully and the live application URL loads the default frontend and is accessible.

## Dev Notes

- Relevant architecture patterns and constraints: Monorepo structure, Next.js, FastAPI, Shadcn/UI for frontend/backend setup. Use PNPM Workspaces.
- Source tree components to touch: Root `package.json`, `frontend/`, `backend/`, `packages/shared-types/` directories.
- Testing standards summary: Not directly applicable for initial setup, but ensure basic project initialization leads to runnable projects.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming): Project structure should align with `architecture.md` diagram and use `packages/shared-types` for shared types.
- Detected conflicts or variances (with rationale): None detected at this initialization stage.

### References

- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Acceptance-Criteria-Authoritative]
- [Source: docs/architecture.md#System-Architecture-Alignment]
- [Source: docs/epics.md#epic-1-foundation--setup]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-1-initialize-project-repositories-structure.context.xml

### Agent Model Used

gemini-1.5-flash

### Debug Log References

### Completion Notes List

### File List


## Change Log

<!-- 
- YYYY-MM-DD: (User) Description of change.
-->


