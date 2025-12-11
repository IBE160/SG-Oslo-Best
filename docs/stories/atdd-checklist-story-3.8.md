# ATDD Implementation Checklist: Story 3.8 - Implement Generation Status Indicator Component

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** developer,
**I want to** create the "Generation Status Indicator" component,
**so that** users are kept engaged and informed during the AI generation process with a loading spinner and specified text.

### Acceptance Criteria

-   **AC1:** Given the AI generation process is initiated, when the component is displayed, then it shows an active loading spinner.
-   **AC2:** It periodically displays the message "Please give us an A" and other engaging messages.
-   **AC3:** User input fields are disabled while it is active.
-   **AC4:** When generation is complete, the component is hidden.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/generation-indicator.spec.ts`

```typescript
// tests/e2e/generation-indicator.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.8: Generation Status Indicator', () => {
  test('should display during generation and hide after', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3, AC4
    await page.goto('/dashboard');

    // Mock a delayed generation process
    await page.route('**/api/v1/generation', (route) => {
      setTimeout(() => {
        route.fulfill({ status: 200, body: JSON.stringify({ generated_text: 'Done.' }) });
      }, 3000); // 3-second delay
    });

    await page.locator('[data-testid="job-ad-textarea"]').fill('Job ad');
    await page.locator('[data-testid="generate-button"]').click();

    // Check that the indicator is visible
    const indicator = page.locator('[data-testid="generation-status-indicator"]');
    await expect(indicator).toBeVisible();
    await expect(page.locator('[data-testid="job-ad-textarea"]')).toBeDisabled();
    
    // Check for one of the messages
    await expect(indicator).toContainText(/Please give us an A|Analyzing.../);
    
    // Wait for generation to complete
    await expect(indicator).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-testid="job-ad-textarea"]')).toBeEnabled();
  });
});
```

---

## 3. Required Infrastructure & Attributes

### `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Generation Status Indicator | `generation-status-indicator` |

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should display during generation and hide after`

-   [x] **Frontend:** Created the `GenerationStatusIndicator.tsx` component.
-   [x] **Frontend:** The component displays a loading spinner and cycles through predefined messages.
-   [x] **Frontend:** Integrated the component into the dashboard page.
-   [x] **Frontend:** The component is conditionally rendered based on the `isLoading` state.
-   [x] **Frontend:** The form fields are disabled while the indicator is active.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/generation-indicator.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the indicator is not yet integrated.
2.  **GREEN:** Follow the checklist to implement the functionality.
3.  **REFACTOR:** Review the code for clarity and adherence to standards.