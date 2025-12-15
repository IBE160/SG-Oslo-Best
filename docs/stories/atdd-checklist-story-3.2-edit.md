# ATDD Implementation Checklist: Story 3.2 - Edit and Customize Cover Letter

**Author:** [Your Name/Team Name]
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** edit the text of a generated cover letter,
**so that** I can make final corrections and personalizations before saving.

### Acceptance Criteria

-   **AC1:** Given a generated cover letter is displayed, an "Edit" button is visible.
-   **AC2:** When I click the "Edit" button, the cover letter display transforms into an editable text area, and the "Edit" button is replaced by a "Save Changes" button.
-   **AC3:** Given I am in editing mode, when I modify the text and click "Save Changes", then the updated content is saved and the display returns to a read-only view.
-   **AC4:** And a toast notification confirms that the changes have been saved.

---

## 2. Test Generation (RED Phase)

The following failing test will be generated to reflect the acceptance criteria.

-   **Test File To Be Created:** `tests/e2e/edit-letter.spec.ts`

```typescript
// tests/e2e/edit-letter.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.2: Edit and Customize Cover Letter', () => {
  test('should allow editing and saving a generated cover letter', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3, AC4
    const originalLetter = 'This is the original generated letter.';
    const editedLetter = 'This is the edited and improved letter.';

    // Setup: Mock initial generation and the update API endpoint
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ generated_text: originalLetter, id: 'cl_123' }) });
    });
    await page.route('**/api/v1/cover-letters/cl_123', (route) => {
      expect(route.request().method()).toBe('PATCH');
      expect(route.request().postDataJSON()).toHaveProperty('content', editedLetter);
      route.fulfill({ status: 200, body: JSON.stringify({ message: 'Cover letter updated' }) });
    });

    // Go to the page and generate the initial letter
    await page.goto('/dashboard');
    await page.click('[data-testid="generate-button"]');
    await expect(page.locator('[data-testid="cover-letter-display"]')).toHaveText(originalLetter);

    // Click edit and modify the text
    await page.click('[data-testid="edit-letter-button"]');
    const editor = page.locator('[data-testid="cover-letter-editor"]');
    await expect(editor).toBeVisible();
    await editor.fill(editedLetter);

    // Save the changes
    await page.click('[data-testid="save-changes-button"]');

    // Assert that the view has updated and a notification is shown
    await expect(page.locator('[data-testid="cover-letter-display"]')).toHaveText(editedLetter);
    await expect(page.locator('[data-testid="cover-letter-editor"]')).toBeHidden();
    await expect(page.locator('[data-testid="toast-notification"]')).toContainText(/changes saved/i);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Read-only cover letter display | `cover-letter-display` |
| "Edit" Button | `edit-letter-button` |
| Editable text area for the letter | `cover-letter-editor` |
| "Save Changes" Button | `save-changes-button` |
| Toast Notification | `toast-notification` |

### API Endpoint Contracts (for Backend)

-   **`PATCH /api/v1/cover-letters/{letter_id}`**
    -   **Request Body:** `{ "content": "..." }`
    -   **Success Response (200):** `{ "message": "Cover letter updated", "id": "..." }`
    -   **Failure Response (4xx/5xx):** `{ "error": "..." }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow editing and saving a generated cover letter`

-   [ ] **Frontend:** After a letter is generated, display an "Edit" button with `data-testid="edit-letter-button"`.
-   [ ] **Frontend:** Manage an `isEditing` boolean state to toggle between the read-only view and the editor view.
-   [ ] **Frontend:** When in edit mode, render a form with a textarea. **This form will be managed by React Hook Form** to handle the state of the cover letter content.
-   [ ] **Backend:** Create the `PATCH /api/v1/cover-letters/{letter_id}` endpoint in FastAPI to handle updates.
-   [ ] **Frontend (React Query):** Create a `useMutation` hook to call the `PATCH` endpoint with the updated content.
-   [ ] **Frontend:** On successful mutation:
    -   Toggle `isEditing` state back to `false`.
    -   Update the local state to display the new content.
    -   Trigger a toast notification confirming the save.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/edit-letter.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the edit functionality does not exist.
2.  **GREEN:** Follow the checklist to implement the editing feature.
3.  **REFACTOR:** Once passing, review the state management and form handling for clarity and performance.
