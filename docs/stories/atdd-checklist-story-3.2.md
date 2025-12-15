# ATDD Implementation Checklist: Story 3.2 - Generate Cover Letter

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** click a "Generate" button to create a cover letter,
**so that** I can receive an AI-drafted letter tailored to the job.

### Acceptance Criteria

-   **AC1:** Given I have provided a job advertisement and clicked "Generate", when the generation process begins, then all input fields are temporarily disabled.
-   **AC2:** The UI shows the "Generation Status Indicator" (Story 3.8).
-   **AC3:** The backend receives the necessary data, integrates with the Gemini API, and returns the generated text.
-   **AC4:** When the generation is complete, the generated cover letter text is returned to the frontend.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/generate-cover-letter.spec.ts`

```typescript
// tests/e2e/generate-cover-letter.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.2: Generate Cover Letter', () => {
  test('should generate a cover letter from a job ad', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3, AC4
    await page.goto('/dashboard');

    // Mock the generation endpoint
    await page.route('**/api/v1/generation', (route) => {
      const requestBody = route.request().postDataJSON();
      expect(requestBody.job_ad).toBe('A cool new job');
      route.fulfill({
        status: 200,
        body: JSON.stringify({ generated_text: 'This is a generated cover letter.' }),
      });
    });

    // Fill in the form and click generate
    await page.locator('[data-testid="job-ad-textarea"]').fill('A cool new job');
    await page.locator('[data-testid="generate-button"]').click();

    // Check that the loading indicator appears
    await expect(page.locator('[data-testid="generation-status-indicator"]')).toBeVisible();
    
    // Check that the generated letter is displayed
    await expect(page.locator('[data-testid="generated-cover-letter"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-testid="generated-cover-letter"]')).toHaveText('This is a generated cover letter.');
  });
});
```

---

## 3. Required Infrastructure & Attributes

### API Endpoint Contracts

-   **`POST /api/v1/generation`**
    -   **Request Body:** `{ "job_ad": "...", "instructions": "...", "user_cv": "..." }`
    -   **Success Response (200):** `{ "generated_text": "..." }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should generate a cover letter from a job ad`

-   [x] **Backend:** Installed `google-generativeai` package.
-   [x] **Backend:** Configured the Gemini API key in the application settings.
-   [x] **Backend:** Replaced the mock generation logic with a real call to the Gemini API.
-   [x] **Frontend:** The dashboard page already calls the generation endpoint.
-   [x] **Frontend:** The `GenerationStatusIndicator` is already integrated.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/generate-cover-letter.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test would fail against the old mock implementation.
2.  **GREEN:** Follow the checklist to implement the real generation logic.
3.  **REFACTOR:** Review the code for clarity, prompt engineering, and error handling.