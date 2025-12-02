# Story 1.2: configure-supabase-integration

Status: drafted

## Story

As a developer,
I want to configure the Supabase project and securely integrate it with both the frontend and backend,
so that the application can utilize Supabase for database and authentication services.

## Acceptance Criteria

1. Given a new Supabase project,
2. When the backend environment is configured,
3. Then it securely stores and uses the Supabase URL and `service_role` key for administrative database access.
4. When the frontend environment is configured,
5. Then it uses the Supabase URL and `anon` key for client-side authentication and data fetching.
6. And the backend can establish a validated connection to the Supabase database.

## Tasks / Subtasks

- [ ] **Task 1: Configure Backend Environment** (AC: #3, #6)
  - [ ] Create a `.env` file in the `backend` directory.
  - [ ] Add `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` to the `.env` file.
  - [ ] Update the backend code to use these environment variables to create a Supabase client.
  - [ ] Add a health check endpoint to the backend that verifies the Supabase connection.
- [ ] **Task 2: Configure Frontend Environment** (AC: #5)
  - [ ] Create a `.env.local` file in the `frontend` directory.
  - [ ] Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the `.env.local` file.
  - [ ] Update the frontend code to use these environment variables to create a Supabase client.
- [ ] **Task 3: Update Documentation**
    - [ ] Update the `README.md` in both `frontend` and `backend` directories to include instructions on setting up the environment variables.

## Dev Notes

- **Relevant architecture patterns and constraints:**
    - Supabase is the designated service for both database and authentication.
    - API keys and secrets must be managed via environment variables and not checked into source control, as per the Security Architecture.
    - The backend will use the `service_role` key for administrative tasks, while the frontend will use the `anon` key for public, user-level interactions.
- **Source tree components to touch:**
    - `backend/app/core/config.py` (or similar for settings management).
    - `backend/app/db/supabase.py` (or similar for client initialization).
    - `backend/main.py` (to add health check).
    - `frontend/lib/supabase.ts` (or similar for client initialization).
    - `frontend/.env.local`, `backend/.env`.
    - `frontend/README.md`, `backend/README.md`.
- **Testing standards summary:**
    - A manual test will be required to confirm that the health check endpoint on the backend returns a successful connection status.
    - A manual test will be required to confirm the frontend can initialize the Supabase client without errors in the browser console.

### Project Structure Notes

- The changes align perfectly with the monorepo structure. Environment files (`.env`, `.env.local`) are correctly placed within their respective `backend` and `frontend` packages and should be added to the root `.gitignore` file.

### Learnings from Previous Story
The previous story (1.1-initialize-project-repositories-structure) was in a `drafted` state and not yet implemented. Therefore, there are no learnings to incorporate from a previous development cycle.

### References

- [Source: docs/architecture.md#Security-Architecture]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Security]
- [Source: docs/epics.md#Story-1.2]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
