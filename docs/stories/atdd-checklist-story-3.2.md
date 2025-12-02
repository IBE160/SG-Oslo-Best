# ATDD Implementation Checklist: Story 3.2 - Generate Cover Letter

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** click a "Generate" button to create a cover letter,
**so that** I can receive an AI-drafted letter tailored to the job.

### Acceptance Criteria

-   **AC1:** Given I have provided a job advertisement and clicked "Generate", when the generation process begins, then all input fields are temporarily disabled.
-   **AC2:** And the UI shows the "Generation Status Indicator" (Story 3.8).
-   **AC3:** And the backend receives the necessary data, integrates with the Gemini API, and returns the generated text.
-   **AC4:** When the generation is complete, the generated cover letter text is returned to the frontend.

---

## 2. Test Generation (RED Phase)

The following failing test has been generated to reflect the acceptance criteria. The goal of the development team is to make this test pass.

-   **Test File Created:** `tests/e2e/generation.spec.ts`

```typescript
// tests/e2e/generation.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.2: Generate Cover Letter', () => {
  test('should disable inputs, show status, and display generated letter', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3, AC4
    await page.goto('/dashboard');
    const jobAdText = 'Software Engineer position at a great company.';
    const generatedLetter = 'Dear Hiring Manager, I am writing to express my interest...';
    await page.fill('[data-testid="job-ad-input"]', jobAdText);

    await page.route('**/api/v1/generation', (route) => {
      setTimeout(() => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ generated_text: generatedLetter }),
        });
      }, 1000);
    });

    await page.click('[data-testid="generate-button"]');

    await expect(page.locator('[data-testid="job-ad-input"]')).toBeDisabled();
    await expect(page.locator('[data-testid="style-instructions-input"]')).toBeDisabled();
    await expect(page.locator('[data-testid="generation-status-indicator"]')).toBeVisible();

    const outputArea = page.locator('[data-testid="cover-letter-output"]');
    await expect(outputArea).toBeVisible({ timeout: 5000 });
    await expect(outputArea).toHaveValue(generatedLetter);
    await expect(page.locator('[data-testid="generation-status-indicator"]')).toBeHidden();
    await expect(page.locator('[data-testid="job-ad-input"]')).toBeEnabled();
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Job Ad Input Text Area | `job-ad-input` |
| Style/Tone Instructions Input | `style-instructions-input` |
| "Generate" Button | `generate-button` |
| Generation Status Indicator | `generation-status-indicator` |
| Cover Letter Output Area | `cover-letter-output` |

### API Endpoint Contracts (for Backend)

-   **`POST /api/v1/generation`**
    -   **Request Body:** `{ "job_ad": "...", "instructions": "...", "user_cv": "..." }`
    -   **Success Response (200):** `{ "generated_text": "..." }`
    -   **Failure Response (5xx):** `{ "error": "Generation failed" }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should disable inputs, show status, and display generated letter`

-   [ ] **Frontend (Story 3.1):** Implement the input form with a text area for the job ad (`data-testid="job-ad-input"`), an optional input for instructions (`data-testid="style-instructions-input"`), and a submit button (`data-testid="generate-button"`).
-   [ ] **Frontend (React Query):** Set up a `useMutation` hook from React Query to handle the API call to `POST /api/v1/generation`.
-   [ ] **Frontend:** When the mutation is `isLoading` (i.e., generation is in progress):
    -   Disable the input fields (`job-ad-input`, `style-instructions-input`).
    -   Render the "Generation Status Indicator" component (`data-testid="generation-status-indicator"`) (from Story 3.8).
-   [ ] **Backend:** Create the `POST /api/v1/generation` endpoint in FastAPI.
-   [ ] **Backend:** The service for this endpoint must:
    -   Accept the job ad, instructions, and user CV in the request.
    -   Construct a prompt for the Gemini API.
    -   Make a call to the Gemini API and await the response.
    -   Return the generated text in the specified JSON format.
-   [ ] **Frontend:** When the `useMutation` hook `isSuccess`:
    -   Hide the "Generation Status Indicator".
    -   Re-enable the input fields.
    -   Display the `generated_text` from the API response in a component with `data-testid="cover-letter-output"`.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/generation.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test is currently failing. This is expected.
2.  **GREEN:** Follow the checklist above to implement the code needed to make the test pass.
3.  **REFACTOR:** Once the test is passing, refactor with confidence.
