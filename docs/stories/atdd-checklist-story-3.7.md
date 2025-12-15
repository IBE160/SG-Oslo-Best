# ATDD Implementation Checklist: Story 3.7 - Delete Job Application

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** delete a job application I no longer need,
**so that** I can keep my workspace clean.

### Acceptance Criteria

-   **AC1:** Given I am on the dashboard, when I see the list of my job applications, then there should be a delete button for each application.
-   **AC2:** When I click the delete button, then a confirmation modal should appear to prevent accidental deletion.
-   **AC3:** When I confirm the deletion, then the job application is permanently removed from the database, and the list on the dashboard is updated.

---

## 2. Test Generation (RED Phase)

The following failing test will be generated to reflect the acceptance criteria.

-   **Test File To Be Created:** `tests/e2e/delete-job-application.spec.ts`

```typescript
// tests/e2e/delete-job-application.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.7: Delete Job Application', () => {
  test('should allow a user to delete a job application', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard');

    // Mock the initial list of job applications
    await page.route('**/api/v1/job-applications', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            items: [
              { id: 'ja1', jobAdvertisementText: 'Job Ad 1', instructionsText: null, status: 'received' },
              { id: 'ja2', jobAdvertisementText: 'Job Ad 2', instructionsText: null, status: 'received' },
            ],
          }),
        });
      }
    });

    // Check that the list is displayed
    await expect(page.locator('[data-testid="job-application-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="job-application-item"]')).toHaveCount(2);

    // Mock the delete response
    await page.route('**/api/v1/job-applications/ja1', (route) => {
        if (route.request().method() === 'DELETE') {
            route.fulfill({
                status: 204,
            });
        }
    });

    // Click the delete button on the first item
    const firstItem = page.locator('[data-testid="job-application-item"]').first();
    await firstItem.locator('[data-testid="delete-button"]').click();

    // Check that the confirmation modal is visible
    await expect(page.locator('[data-testid="confirmation-modal"]')).toBeVisible();
    
    // Click the confirm button
    await page.locator('[data-testid="confirm-delete-button"]').click();
    
    // The list should now have only one item
    await expect(page.locator('[data-testid="job-application-item"]')).toHaveCount(1);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Job Application List | `job-application-list` |
| Individual Job Application Item | `job-application-item` |
| Delete Button | `delete-button` |
| Confirmation Modal | `confirmation-modal` |
| Confirm Delete Button | `confirm-delete-button` |

### API Endpoint Contracts (for Backend)

-   **`GET /api/v1/job-applications`**
    -   **Success Response (200):** `{ "items": [{ "id": "...", "jobAdvertisementText": "...", ... }] }`
-   **`DELETE /api/v1/job-applications/{job_application_id}`**
    -   **Success Response (204):** No content
    -   **Failure Response (404):** `{ "detail": "Job application not found." }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow a user to delete a job application`

-   [x] **Backend:** Create the `GET /api/v1/job-applications` endpoint in FastAPI.
-   [x] **Backend:** Create the `DELETE /api/v1/job-applications/{job_application_id}` endpoint in FastAPI.
-   [x] **Frontend:** Modify the dashboard page to fetch and display the list of job applications.
-   [x] **Frontend (React Query):** Create a `useQuery` hook to fetch the list of job applications.
-   [x] **Frontend (React Query):** Create a `useMutation` hook to handle the deletion of a job application.
-   [x] **Frontend:** Add a "Delete" button to each job application in the list.
-   [x] **Frontend:** Use a confirmation modal (`AlertDialog` from shadcn/ui) to confirm the deletion.
-   [x] **Frontend:** On successful deletion, invalidate the `jobApplications` query to refresh the list.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/delete-job-application.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the delete functionality does not exist.
2.  **GREEN:** Follow the checklist to implement the functionality.
3.  **REFACTOR:** Once the test is passing, review the code for clarity, performance, and adherence to coding standards.
