# Engineering Backlog

This backlog collects cross-cutting or future action items that emerge from reviews and planning.

Routing guidance:

- Use this file for non-urgent optimizations, refactors, or follow-ups that span multiple stories/epics.
- Must-fix items to ship a story belong in that story’s `Tasks / Subtasks`.
- Same-epic improvements may also be captured under the epic Tech Spec `Post-Review Follow-ups` section.

| Date | Story | Epic | Type | Severity | Owner | Status | Notes |
| ---- | ----- | ---- | ---- | -------- | ----- | ------ | ----- |
| 2025-12-05 | 1.1 | 1 | Bug | High | TBD | Open | Create frontend/.env.example (AC #5) |
| 2025-12-05 | 1.1 | 1 | Bug | High | TBD | Open | Create backend/.env.example (AC #5) |
| 2025-12-05 | 1.1 | 1 | TechDebt | Low | TBD | Open | Remove unused 'express' dependency from root package.json |
| 2025-12-05 | 1.1 | 1 | Process | Medium | TBD | Open | Update all completed tasks in story 1.1 markdown |
| 2025-12-05 | 1.1 | 1 | Info | Info | TBD | Open | Provide evidence for Vercel deployment (AC #6, #7) |
| 2025-12-05 | 1.2 | 1 | Bug | Low | TBD | Open | Add explicit null checks for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `frontend/src/lib/supabase-client.ts`. |
| 2025-12-05 | 1.2 | 1 | TechDebt | Low | TBD | Open | Improve error logging for Supabase connection failure in `backend/app/main.py`. |
