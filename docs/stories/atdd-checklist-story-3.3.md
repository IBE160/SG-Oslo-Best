# ATDD Implementation Checklist: Story 3.3 - Display and Review Generated Cover Letter

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want** the generated cover letter to be displayed clearly on the screen,
**so that** I can review its content and decide on the next action.

### Acceptance Criteria

-   **AC1:** Given the cover letter has been generated successfully, when the frontend receives the letter text, then the text is displayed in a clear, readable format within the output panel.
-   **AC2:** The "Regenerate" and "Save" buttons become visible and enabled after the cover letter is displayed.
-   **AC3:** Clicking the "Save" button successfully saves the cover letter to the database.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/display-cover-letter.spec.ts`

```typescript
// tests/e2e/display-cover-letter.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.3: Display and Review Generated Cover Letter', () => {
  test('should display the generated letter and allow saving', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard');
    
    // Mock the generation process
    await page.route('**/api/v1/job-applications', (route) => {
        route.fulfill({ status: 201, body: JSON.stringify({ id: 'ja1' }) });
    });
    await page.route('**/api/v1/generation', (route) => {
        route.fulfill({ status: 200, body: JSON.stringify({ generated_text: 'Your generated cover letter.' }) });
    });

    await page.locator('[data-testid="job-ad-textarea"]').fill('Job ad');
    await page.locator('[data-testid="generate-button"]').click();

    // Check that the letter is displayed
    await expect(page.locator('[data-testid="generated-cover-letter"]')).toBeVisible();
    await expect(page.locator('[data-testid="generated-cover-letter"]')).toHaveText('Your generated cover letter.');

    // Check that the buttons are visible
    await expect(page.locator('[data-testid="regenerate-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="save-button"]')).toBeVisible();

    // Mock the save request
    await page.route('**/api/v1/cover-letters', (route) => {
        if (route.request().method() === 'POST') {
            const body = route.request().postDataJSON();
            expect(body.content).toBe('Your generated cover letter.');
            expect(body.job_application_id).toBe('ja1');
            route.fulfill({ status: 200, body: JSON.stringify({ message: 'Cover letter saved' }) });
        }
    });

    // Click save and check for toast
    await page.locator('[data-testid="save-button"]').click();
    await expect(page.locator('text=Cover letter saved!')).toBeVisible();
  });
});
```

---

## 3. Required Infrastructure & Attributes

### `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Generated Cover Letter Display | `generated-cover-letter` |
| Regenerate Button | `regenerate-button` |
| Save Button | `save-button` |

### API Endpoint Contracts

-   **`POST /api/v1/cover-letters`**
    -   **Request Body:** `{ "content": "...", "job_application_id": "..." }`
    -   **Success Response (200):** `{ "message": "...", "id": "..." }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should display the generated letter and allow saving`

-   [x] **Backend:** Verified the `POST /api/v1/generation` endpoint.
-   [x] **Backend:** Verified the `POST /api/v1/cover-letters` endpoint.
-   [x] **Frontend:** Added state to the dashboard page to hold the generated letter and job application ID.
-   [x] **Frontend:** Implemented a display area for the generated letter that appears after generation.
-   [x] **Frontend:** Added "Save" and "Regenerate" buttons.
-   [x] **Frontend:** Implemented a `useMutation` hook to save the cover letter.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/display-cover-letter.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the display logic does not exist.
2.  **GREEN:** Follow the checklist to implement the functionality.
3.  **REFACTOR:** Review the code for clarity and adherence to standards.
