# ATDD Implementation Checklist: Story 3.4 - Regenerate and Compare Cover Letter Versions

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** regenerate a cover letter and easily compare it with previous versions,
**so that** I can choose the best output.

### Acceptance Criteria

-   **AC1:** Given a cover letter is displayed, when I modify instructions and click "Regenerate", then a new version of the cover letter is generated via the API.
-   **AC2:** And the output panel displays the new version as the active tab (e.g., "Version 2").
-   **AC3:** And a tab for the previous version (e.g., "Version 1") is present, allowing for easy switching and comparison.

---

## 2. Test Generation (RED Phase)

The following failing test has been generated. This is a complex UI interaction, and the test reflects that by mocking the API multiple times to simulate the regeneration flow.

-   **Test File Created:** `tests/e2e/regeneration.spec.ts`

```typescript
// tests/e2e/regeneration.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.4: Regenerate and Compare Cover Letter Versions', () => {
  test('should create a new version tab on regeneration and allow switching', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard');
    const firstGeneratedLetter = 'This is the first version of the cover letter.';
    const secondGeneratedLetter = 'This is the improved second version.';

    // Mock first generation
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ generated_text: firstGeneratedLetter }) });
    }, { times: 1 });
    await page.click('[data-testid="generate-button"]');
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(firstGeneratedLetter);

    // Mock second generation
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ generated_text: secondGeneratedLetter }) });
    });
    await page.click('[data-testid="regenerate-button"]');

    // Assert new version is active
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(secondGeneratedLetter);
    await expect(page.locator('[data-testid="version-tab-2"]')).toHaveAttribute('data-state', 'active');
    
    // Assert old version is present and can be switched to
    await expect(page.locator('[data-testid="version-tab-1"]')).toBeVisible();
    await page.click('[data-testid="version-tab-1"]');
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(firstGeneratedLetter);
    await expect(page.locator('[data-testid="version-tab-1"]')).toHaveAttribute('data-state', 'active');
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

This feature requires a tabbed interface. The tests will rely on these attributes to identify and interact with the version tabs.

| Element Description | `data-testid` Attribute | Notes |
| ------------------- | ----------------------- | ----- |
| "Regenerate" Button | `regenerate-button` | Becomes visible after first generation. |
| Tab for Version 1 | `version-tab-1` | |
| Tab for Version 2 | `version-tab-2` | |
| (and so on for n) | `version-tab-n` | |
| The active tab should have `data-state="active"` | (attribute on tab) | This is a common pattern in Shadcn/UI Tabs. |

### API Endpoint Contracts (for Backend)

This story reuses the existing generation endpoint. No new backend endpoints are required.

-   **`POST /api/v1/generation`** (Reused)

---

## 4. Implementation Checklist (GREEN Phase)

This story is primarily a frontend challenge involving state management.

### Test: `should create a new version tab on regeneration and allow switching`

-   [ ] **Frontend (State Management):** Use a state management solution (e.g., React Context as per `architecture.md`) to hold an array of generated cover letter versions.
    -   Example state shape: `[{id: 1, content: '...'}, {id: 2, content: '...'}]`
-   [ ] **Frontend (UI):** After the first successful generation (Story 3.2), render a "Regenerate" button with `data-testid="regenerate-button"`.
-   [ ] **Frontend (React Query):** The "Regenerate" button should trigger the same `useMutation` hook used for the initial generation.
-   [ ] **Frontend (State Management):** On successful regeneration, instead of replacing the old version, append the new version to the array in your state.
-   [ ] **Frontend (UI - Tabs):**
    -   Render a tabbed interface (e.g., Shadcn/UI Tabs).
    -   Map over the array of versions in your state to create the tabs.
    -   Assign `data-testid="version-tab-{index + 1}"` to each tab trigger.
    -   The content of the active tab should display the corresponding version's text in the `[data-testid="cover-letter-output"]` element.
    -   Ensure the newly generated version becomes the active tab by default.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/regeneration.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test is currently failing.
2.  **GREEN:** Implement the client-side state management and UI logic to handle multiple versions.
3.  **REFACTOR:** Once passing, review the state management logic for efficiency and clarity.
