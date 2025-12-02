# ATDD Implementation Checklist: Story 3.5 - Save Generated Cover Letter

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** save a generated cover letter that I am satisfied with,
**so that** I can access it later.

### Acceptance Criteria

-   **AC1:** Given a cover letter is displayed, when I click the "Save" button, then the button's state changes to "Saved ✓" and becomes disabled.
-   **AC2:** And a toast notification confirms the save action.
-   **AC3:** And the cover letter text is successfully saved to the Supabase database, associated with my user ID and the job application.

---

## 2. Test Generation (RED Phase)

The following failing test has been generated to reflect the acceptance criteria.

-   **Test File Created:** `tests/e2e/save-letter.spec.ts`

```typescript
// tests/e2e/save-letter.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.5: Save Generated Cover Letter', () => {
  test('should save the letter, disable the button, and show a notification', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard');
    const generatedLetter = 'This is a masterpiece worth saving.';

    // Mock generation and save endpoints
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ generated_text: generatedLetter }) });
    });
    await page.route('**/api/v1/cover-letters', (route) => {
      route.fulfill({ status: 201, body: JSON.stringify({ message: 'Cover letter saved' }) });
    });

    await page.click('[data-testid="generate-button"]');
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(generatedLetter);

    const saveButton = page.locator('[data-testid="save-letter-button"]');
    await saveButton.click();

    await expect(saveButton).toBeDisabled();
    await expect(saveButton).toHaveText('Saved ✓');
    await expect(page.locator('[data-testid="toast-notification"]')).toBeVisible();
    await expect(page.locator('[data-testid="toast-notification"]')).toContainText(/saved/i);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| "Save" Button | `save-letter-button` |
| Toast Notification | `toast-notification` |

### API Endpoint Contracts (for Backend)

-   **`POST /api/v1/cover-letters`**
    -   **Request Body:** `{ "content": "...", "job_application_id": "..." }`
    -   **Success Response (201):** `{ "message": "Cover letter saved", "id": "..." }`
    -   **Failure Response (4xx/5xx):** `{ "error": "..." }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should save the letter, disable the button, and show a notification`

-   [ ] **Frontend:** After a letter is generated, display a "Save" button with `data-testid="save-letter-button"`.
-   [ ] **Backend:** Create the `POST /api/v1/cover-letters` endpoint in FastAPI.
-   [ ] **Backend:** This endpoint should accept the cover letter content and the associated `job_application_id`. It must be protected, ensuring the authenticated user owns the job application. It should then store the cover letter in the Supabase database.
-   [ ] **Frontend (React Query):** Create a `useMutation` hook for the "Save" action, which calls the `/api/v1/cover-letters` endpoint.
-   [ ] **Frontend:** On `onSuccess` of the mutation:
    -   Change the button text to "Saved ✓" and disable it.
    -   Trigger a toast notification component (with `data-testid="toast-notification"`) to show a success message.
-   [ ] **Frontend:** On `onError` of the mutation, trigger a toast notification with an error message.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/save-letter.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test is currently failing. This is expected.
2.  **GREEN:** Follow the checklist to implement the save functionality.
3.  **REFACTOR:** Once passing, review the API endpoint and frontend state logic.
