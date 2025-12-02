# Story 1.1: Initialize Project Repositories & Structure

Status: drafted

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

1.  Given a new project folder configured with pnpm workspaces,
2.  When the initialization script is run,
3.  Then a `frontend` folder is created and initialized as a Next.js application using `npx create-next-app@latest`.
4.  And Shadcn/UI is initialized within the frontend project using `npx shadcn-ui@latest init`.
5.  And a `backend` folder is created and initialized with a standard FastAPI project structure.
6.  And a `packages/shared-types` folder is created for shared TypeScript interfaces.

## Tasks / Subtasks

- [ ] **Initialize Monorepo with PNPM Workspaces**
  - [ ] Set up `package.json` at root to define workspaces for `frontend`, `backend`, and `packages/shared-types`.
  - [ ] Create `frontend/`, `backend/`, and `packages/shared-types/` directories.
- [ ] **Initialize Frontend Project (Next.js)**
  - [ ] Execute `npx create-next-app@latest frontend --typescript --eslint --app --tailwind --src-dir --import-alias "@/*"` within the `frontend` directory.
  - [ ] Verify Next.js application is runnable.
- [ ] **Initialize Shadcn/UI**
  - [ ] Navigate to the `frontend` directory.
  - [ ] Run `npx shadcn-ui@latest init` and configure with Tailwind CSS, global CSS, etc.
  - [ ] Verify Shadcn/UI components can be added.
- [ ] **Initialize Backend Project (FastAPI)**
  - [ ] Create a Python virtual environment in the `backend` directory: `python -m venv .venv`.
  - [ ] Activate the virtual environment.
  - [ ] Install FastAPI and Uvicorn: `pip install fastapi uvicorn`.
  - [ ] Create a basic `main.py` and `requirements.txt`.
  - [ ] Verify FastAPI application is runnable.
- [ ] **Create Shared Types Package**
  - [ ] Create `packages/shared-types/package.json` and `packages/shared-types/index.ts`.
  - [ ] Add basic TypeScript interfaces (e.g., for API contract example).
  - [ ] Configure `tsconfig.json` in `frontend` to reference `packages/shared-types`.
- [ ] **Basic Verification**
  - [ ] Ensure all project structures match the Architecture Spec's diagram.
  - [ ] Run `pnpm install` at the root to ensure all workspace dependencies are linked correctly.

## Dev Notes

- Relevant architecture patterns and constraints: Monorepo structure, Next.js, FastAPI, Shadcn/UI for frontend/backend setup. Use PNPM Workspaces.
- Source tree components to touch: Root `package.json`, `frontend/`, `backend/`, `packages/shared-types/` directories.
- Testing standards summary: Not directly applicable for initial setup, but ensure basic project initialization leads to runnable projects.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming): Project structure should align with `architecture.md` diagram and use `packages/shared-types` for shared types.
- Detected conflicts or variances (with rationale): None detected at this initialization stage.

### References

- [Source: docs/architecture.md]
- [Source: docs/epics.md]
- [Source: .bmad/bmm/workflows/4-implementation/create-story/workflow.yaml]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

gemini-1.5-flash

### Debug Log References

### Completion Notes List

### File List

## Change Log
- tirsdag 2. desember 2025: Story drafted by BIP.

## Dev Notes

- Relevant architecture patterns and constraints: Monorepo structure, Next.js, FastAPI, Shadcn/UI for frontend/backend setup. Use PNPM Workspaces.
- Source tree components to touch: Root `package.json`, `frontend/`, `backend/`, `packages/shared-types/` directories.
- Testing standards summary: Not directly applicable for initial setup, but ensure basic project initialization leads to runnable projects.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming): Project structure should align with `architecture.md` diagram and use `packages/shared-types` for shared types.
- Detected conflicts or variances (with rationale): None detected at this initialization stage.

### References

- [Source: docs/architecture.md]
- [Source: docs/epics.md]
- [Source: .bmad/bmm/workflows/4-implementation/create-story/workflow.yaml]
