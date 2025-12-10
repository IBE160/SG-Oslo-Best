# Test Design: High-Value Stories

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Executive Summary

This document outlines the comprehensive test design and risk mitigation strategy for the high-value stories identified for the CVAI Turbo application. The design is based on the Acceptance Criteria defined in the `epics.md` and the failing tests generated during the ATDD workflows.

The primary goal is to ensure robust coverage of critical user journeys and to mitigate high-priority risks before they impact the end-user. The strategy employs a multi-layered testing approach, prioritizing fast feedback where possible while ensuring end-to-end confidence.

---

## 2. Risk Assessment Summary

A total of **19 risks** were identified across the 6 high-value stories. Of these, **8 have been classified as high-priority (Score ≥ 6)**, requiring immediate and thorough test mitigation.

### High-Priority Risks:

| Risk ID | Story | Description | Score | Category | Mitigation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **R-2.2.1** | 2.2 | Authentication failure prevents user access. | 9 | SEC, BUS | P0 E2E & API tests. |
| **R-3.2.1** | 3.2 | Backend/Gemini API failure blocks core generation. | 9 | TECH, OPS, BUS | P0 E2E & API tests with robust mocking. |
| **R-2.1.1** | 2.1 | Account creation failure in the database. | 6 | DATA, BUS | P0 E2E & API tests. |
| **R-2.2.2** | 2.2 | Insecure session establishment. | 6 | SEC, TECH | P0 E2E & API tests, code review on token handling. |
| **R-3.2.2** | 3.2 | Low-quality/irrelevant generated text. | 6 | BUS | Manual review, future automated semantic checks. |
| **R-3.4.1** | 3.4 | Regeneration feature fails due to state issues. | 6 | TECH, BUS | P0 E2E tests for complex UI state. |
| **R-3.4.2** | 3.4 | Version comparison tabs fail to render or update. | 6 | TECH, BUS | P0 E2E tests and P1 component tests for the tab UI. |
| **R-3.5.1** | 3.5 | Saved cover letter data is lost or not persisted. | 6 | DATA, BUS | P0 E2E & API tests. |

---

## 3. Test Coverage Strategy

This strategy uses the "Testing Pyramid" principle: comprehensive, fast unit/API tests form the base, while fewer, slower E2E tests validate full user journeys.

### Test Level Breakdown

| Story | E2E (Playwright) | API (Playwright) | Component (Playwright CT) | Unit (Jest) |
| :--- | :--- | :--- | :--- | :--- |
| **2.1: Registration** | ✅ (Happy path) | ✅ (Edge cases: duplicate email, invalid password) | | ✅ (Form validation logic) |
| **2.2: Login** | ✅ (Happy path, pop-up) | ✅ (Edge cases: incorrect password, locked account) | | ✅ (Session context logic) |
| **3.2: Generation** | ✅ (Happy path, status) | ✅ (Edge cases: invalid inputs, API errors) | ✅ (Status Indicator - **Done**) | ✅ (Prompt construction logic) |
| **3.4: Regeneration** | ✅ (Complex state logic) | | ✅ (Tab component in isolation) | ✅ (State management logic) |
| **3.5: Save Letter** | ✅ (Happy path) | ✅ (Edge cases: invalid ID, auth errors) | ✅ (Toast notification) | |
| **3.8: Status Indicator** | | | ✅ (**Done**) | |

### Test Priority and Execution

| Priority | Test Level | When to Run | Purpose |
| :--- | :--- | :--- | :--- |
| **P0 (Critical)** | E2E Happy Paths (All Stories) | On every commit to PRs targeting `main` | Core journey validation. Fast feedback on showstoppers. |
| **P1 (High)** | API & Component Tests | On every PR to `main` (can run in parallel to P0) | Catch logic errors, UI bugs, and contract issues without UI overhead. |
| **P2 (Medium)** | E2E Edge Cases | Nightly build | Full regression on less common user paths. |
| **P3 (Low)** | Performance/Soak Tests | Weekly or On-demand | NFR validation. |

---

## 4. Test Scenario Design

The ATDD workflows have already produced the primary **P0 E2E and Component tests**. The following outlines the additional **P1 API tests** required to supplement the E2E coverage and provide faster, more targeted feedback.

### P1 API Test Scenarios (To Be Created)

**`tests/api/auth.api.spec.ts`**
- `POST /api/v1/auth/register`:
  - `should fail with 409 conflict if email already exists`
  - `should fail with 400 bad request for invalid email format`
  - `should fail with 400 bad request for weak password`
- `POST /api/v1/auth/login`:
  - `should fail with 401 unauthorized for incorrect password`
  - `should fail with 401 unauthorized for non-existent user`

**`tests/api/generation.api.spec.ts`**
- `POST /api/v1/generation`:
  - `should fail with 400 if job ad is empty`
  - `should handle and report a 503 error from the external Gemini API`

**`tests/api/save-letter.api.spec.ts`**
- `POST /api/v1/cover-letters`:
  - `should fail with 401 if user is not authenticated`
  - `should fail with 404 if the job_application_id does not exist`

---

## 5. Data & Infrastructure Summary

-   **Data Factories:** A `user.factory.ts` should be created/used to generate mock user data for API and E2E tests.
-   **Fixtures:** An `auth.fixture.ts` should be created to provide a pre-authenticated `page` object to E2E tests, reducing boilerplate login steps for stories that require a logged-in user.
-   **Mocks:** Tests rely heavily on Playwright's `page.route()` to mock API responses, ensuring tests are fast, reliable, and can run without a live backend.

---

## 6. Quality Gate Criteria

For these high-value stories, the following quality gates must pass before merging to `main`:

-   **100%** of all generated **P0** and **P1** automated tests (E2E, API, Component) must pass.
-   All **High-Priority Risks (Score ≥ 6)** must have a corresponding automated test that directly mitigates the risk.
-   Code coverage for new backend logic should meet or exceed **80%**.

---

## 7. Next Steps

1.  **Review:** Share this test design with the development team for feedback.
2.  **Implement P1 Tests:** Create the additional API tests outlined in Section 4.
3.  **Create Auth Fixture:** Develop the `auth.fixture.ts` to streamline E2E tests.
4.  **Execute:** Begin development, using the ATDD checklists and this test design as the blueprint for quality.
