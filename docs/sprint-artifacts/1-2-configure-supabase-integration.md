# Story 1.2: Configure Supabase Integration

Status: ready-for-dev

## Story

As a developer,
I want to configure the Supabase project and securely integrate it with both the frontend and backend,
so that the application can utilize Supabase for database and authentication services.

## Requirements Context Summary

This story establishes the critical link between the application and the Supabase backend for database and authentication services. The primary goal is to configure the project environments securely, ensuring both the Next.js frontend and the FastAPI backend can communicate with Supabase using the correct credentials.

### Key Requirements

- **Backend Integration:** The FastAPI backend must be configured with the Supabase URL and the administrative `service_role` key to perform elevated actions. This connection needs to be validated.
- **Frontend Integration:** The Next.js frontend must be configured with the Supabase URL and the public `anon` key, enabling client-side user authentication and data access.
- **Secure Configuration:** All keys and secrets must be managed via environment variables, with `.env.example` files documenting the required variables, as established in Story 1.1 and the project's Architecture Specification.

### Relevant Architecture & Standards

- **Source of Truth:** `docs/architecture.md`, `docs/epics.md`.
- **Authentication:** The project uses Supabase Auth for JWT-based session management.
- **Security:** API keys and secrets must be stored in environment variables and not committed to source control. The backend will use the `service_role` key, while the frontend uses the `anon` key.
- **Development Environment:** The `frontend/.env.example` and `backend/.env.example` files created in Story 1.1 define the exact variable names to be used (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`).

## Acceptance Criteria

1.  Given a new Supabase project has been created, when the backend application starts, then it successfully initializes a connection to Supabase using the `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` environment variables.
2.  Given the same Supabase project, when the frontend application loads, then it successfully initializes a client connection to Supabase using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables.
3.  The backend's Supabase connection is validated on application startup (e.g., via a test query or health check).
4.  The `supabase-js` library is added as a dependency to the `frontend` package and `supabase` for python is added to the `backend` package.
5.  A basic Supabase client is implemented in both the `frontend` (`/lib`) and `backend` (`/app/db`) to provide a reusable, centralized connection.

## Tasks / Subtasks

- [ ] **Configure Backend (AC: #1, #3, #4)**
  - [ ] Add `supabase` to `backend/requirements.txt`.
  - [ ] Create `backend/app/db/supabase_client.py` to initialize and export the Supabase client using environment variables.
  - [ ] Implement a startup event in `backend/app/main.py` that uses the client to perform a test query to confirm a valid connection.
- [ ] **Configure Frontend (AC: #2, #4, #5)**
  - [ ] Run `pnpm --filter frontend add @supabase/supabase-js` to add the dependency.
  - [ ] Create `frontend/src/lib/supabase-client.ts` to initialize and export a singleton Supabase client using public environment variables.
- [ ] **Documentation & Verification (AC: #1, #2, #3, #4, #5)**
  - [ ] Verify that the `.env.example` files in both `frontend` and `backend` are clear about the required Supabase variables.
  - [ ] [Test] After creating `.env` files locally with real Supabase credentials, run both the frontend and backend development servers and confirm no connection errors appear.
  - [ ] [Test] Check the backend server logs for the "Supabase connection successful" message from the startup event.
  - [ ] [Test] Verify the `supabase-js` dependency is present in `frontend/package.json` and `supabase` is in `backend/requirements.txt`.
  - [ ] [Test] Manually inspect the code to confirm that reusable Supabase clients have been created in `frontend/src/lib/supabase-client.ts` and `backend/app/db/supabase_client.py`.

## Dev Notes

### Tech Spec Alignment Note
- **Finding**: A validation check found a discrepancy between this story's Acceptance Criteria and the authoritative ACs in the Epic 1 Tech Spec. The tech spec's ACs are high-level and cover the entire epic, while this story's ACs are more granular and specific to Supabase integration.
- **Resolution**: We will proceed with the more detailed ACs in this story as they are well-defined and actionable. A task should be created to update the Epic 1 Tech Spec to either include these more granular ACs or explicitly delegate them to this story, improving traceability.

### Project Structure and Learnings

#### Learnings from Previous Story (1.1)
- **Previous Story:** [Source: docs/sprint-artifacts/1-1-initialize-project-repositories-structure.md]
- **Status:** done
- **Key Learnings:**
  - The monorepo structure with `frontend`, `backend`, and `packages/shared-types` is confirmed and in place.
  - `.env.example` files were added to both `frontend` and `backend` during the review of story 1.1, establishing the contract for environment variables needed for this story.
  - An architectural mismatch (an `express` dependency) was caught and corrected, reinforcing the importance of adhering to the defined FastAPI backend.
  - **Risk:** The Vercel deployment and end-to-end functionality (AC #6, #7) of the initial setup could not be verified by the reviewing agent. This story's implementation should proceed but be aware that full deployment validation is pending.

#### Unified Project Structure Alignment
- **`frontend/`**: This story will likely introduce a Supabase client utility in `frontend/lib/supabase-client.ts` to centralize the Supabase connection.
- **`backend/`**: A similar Supabase client will be needed here, likely in `backend/app/db/supabase_client.py`.
- **Environment:** This story is entirely dependent on the correct population of `.env` files in both the `frontend` and `backend` directories, based on the `.env.example` files created in the previous story.
- **No conflicts** are detected. This story builds directly upon the validated structure from Story 1.1.

### Relevant architecture patterns and constraints
This story implements the core connection to Supabase, a foundational piece of the architecture. It requires strict adherence to the security pattern of using environment variables for secrets (`.env` files locally, Vercel secrets in production). The backend uses the `service_role` key for admin access, while the frontend is restricted to the `anon` key.

### Source tree components to touch
- `backend/requirements.txt`: To add the `supabase` dependency.
- `backend/app/main.py`: To add the startup event for connection validation.
- `backend/app/db/supabase_client.py`: New file for the Python client.
- `frontend/package.json`: To add the `@supabase/supabase-js` dependency.
- `frontend/src/lib/supabase-client.ts`: New file for the TypeScript client.

### Testing standards summary
No automated tests are required for this story. However, manual verification is critical to confirm each Acceptance Criterion is met.
- **AC #1, #2, #3**: Verified by running the dev servers with populated `.env` files and checking for connection success messages in the backend logs and no errors in the frontend console.
- **AC #4**: Verified by checking `frontend/package.json` and `backend/requirements.txt` to confirm the dependencies were added.
- **AC #5**: Verified by code inspection of the new client files (`frontend/src/lib/supabase-client.ts` and `backend/app/db/supabase_client.py`).

### References

- [Source: docs/architecture.md#Security-Architecture]
- [Source: docs/architecture.md#Development-Environment]
- [Source: docs/epics.md#Story-1.2]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md]

## Dev Agent Record

### Context Reference
- docs/sprint-artifacts/1-2-configure-supabase-integration.context.xml

### Agent Model Used
<!-- gemini-1.5-pro-001 -->

### Debug Log References

### Completion Notes List

### File List

## Change Log

- 2025-12-05: (BIP) Story drafted by Scrum Master agent.
