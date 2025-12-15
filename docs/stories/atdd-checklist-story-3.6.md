# ATDD Implementation Checklist: Story 3.6 - Update Job Application

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** update the text of a job application I previously created,
**so that** I can correct mistakes or add new information.

### Acceptance Criteria

-   **AC1:** Given I have an existing job application, when I navigate to the application's edit page, then I see the current job advertisement text pre-filled.
-   **AC2:** When I modify the text and save, then the updated text is persisted in the database.
-   **AC3:** After a successful save, I am redirected back to the main dashboard.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/update-job-application.spec.ts`

```typescript
// tests/e2e/update-job-application.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.6: Update Job Application', () => {
  test('should allow a user to edit and save a job application', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard');

    // Mock the initial list
    await page.route('**/api/v1/job-applications', (route) => {
        route.fulfill({ status: 200, body: JSON.stringify({ items: [{ id: 'ja1', jobAdvertisementText: 'Old text' }] }) });
    });

    // Click the edit button
    await page.locator('text=Edit').click();
    await expect(page).toHaveURL(/.*\/job-applications\/ja1\/edit/);

    // Mock the fetch for the edit page
    await page.route('**/api/v1/job-applications/ja1', (route) => {
        route.fulfill({ status: 200, body: JSON.stringify({ id: 'ja1', jobAdvertisementText: 'Old text' }) });
    });
    
    // Check that the old text is pre-filled
    await expect(page.locator('textarea[name="jobAdvertisementText"]')).toHaveValue('Old text');

    // Mock the PATCH request
    await page.route('**/api/v1/job-applications/ja1', (route) => {
        if (route.request().method() === 'PATCH') {
            route.fulfill({ status: 200, body: JSON.stringify({ id: 'ja1', jobAdvertisementText: 'New text' }) });
        }
    });
    
    // Update the text and save
    await page.locator('textarea[name="jobAdvertisementText"]').fill('New text');
    await page.locator('button[type="submit"]').click();
    
    // Should be redirected back to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### API Endpoint Contracts

-   **`GET /api/v1/job-applications/{id}`**
-   **`PATCH /api/v1/job-applications/{id}`**

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow a user to edit and save a job application`

-   [x] **Backend:** Created the `PATCH /api/v1/job-applications/{id}` endpoint.
-   [x] **Backend:** Created the `GET /api/v1/job-applications/{id}` endpoint.
-   [x] **Frontend:** Created the edit page at `/dashboard/job-applications/[id]/edit`.
-   [x] **Frontend:** The edit page fetches and pre-fills the form with existing data.
-   [x] **Frontend:** The form calls the `PATCH` endpoint on submission.
-   [x] **Frontend:** Added an "Edit" button to the job application list on the dashboard.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/update-job-application.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the edit functionality does not exist.
2.  **GREEN:** Follow the checklist to implement the functionality.
3.  **REFACTOR:** Review the code for clarity and adherence to standards.