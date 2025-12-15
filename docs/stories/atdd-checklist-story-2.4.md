# ATDD Implementation Checklist: Story 2.4 - Update User Profile & CV with Hybrid Save

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** update my CV information using a form that auto-saves my work,
**so that** I feel confident my changes are securely persisted with minimal effort.

### Acceptance Criteria

-   **AC1:** Given I am on my profile editing page, when I modify a field, then the field's border indicates an "unsaved" state.
-   **AC2:** When I move focus away from the modified field (onBlur), then the change is automatically saved in the background via a PATCH request, and the field's border indicates a "saved" state.
-   **AC3:** A master "Save" button becomes enabled when there are unsaved changes, and clicking it saves all pending changes in a single PATCH request.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/update-profile.spec.ts`

```typescript
// tests/e2e/update-profile.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 2.4: Update User Profile & CV', () => {
  test('should auto-save fields on blur', async ({ page }) => {
    // Corresponds to AC1, AC2
    await page.goto('/dashboard/profile');

    // Mock the initial fetch
    await page.route('**/api/v1/users/me/cv', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            full_name: 'Test User',
            date_of_birth: '2000-01-01',
            gender: 'Test',
            phone_number: '123456789',
            address: 'Test Address',
            cv_content: 'This is a test CV.',
          }),
        });
      }
    });
    
    const fullNameInput = page.locator('input[name="full_name"]');
    
    // Field should have a default border
    await expect(fullNameInput).toHaveClass(/border-gray-300/);

    // Edit the field
    await fullNameInput.fill('Test User Updated');
    
    // Border should become "unsaved"
    await expect(fullNameInput).toHaveClass(/border-yellow-500/);

    // Mock the PATCH request
    await page.route('**/api/v1/users/me/cv', (route) => {
        if (route.request().method() === 'PATCH') {
            route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        }
    });

    // Trigger blur
    await fullNameInput.blur();
    
    // Border should become "saved"
    await expect(fullNameInput).toHaveClass(/border-green-500/);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### API Endpoint Contracts (for Backend)

-   **`PATCH /api/v1/users/me/cv`**
    -   **Request Body:** `Partial<{ "full_name": "...", "cv_content": "..." }>`
    -   **Success Response (200):** `{ "id": "...", ... }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should auto-save fields on blur`

-   [x] **Backend:** The `PATCH /api/v1/users/me/cv` endpoint in FastAPI is verified to handle partial updates.
-   [x] **Frontend:** Created the `StatefulTextbox` component for visual feedback.
-   [x] **Frontend:** Refactored the profile page to use the new component and manage field-level save states.
-   [x] **Frontend:** Implemented `onBlur` handlers to trigger `PATCH` requests for dirty fields.
-   [x] **Frontend:** Implemented a master "Save All Changes" button.
-   [x] **Frontend:** Integrated the `UnsavedChangesContext`.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/update-profile.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail as the update and auto-save logic is not yet implemented on the frontend.
2.  **GREEN:** Follow the checklist to implement the functionality.
3.  **REFACTOR:** Once the test is passing, review the code for clarity, performance, and adherence to coding standards.
