# ATDD Implementation Checklist: Story 3.1 - Input Job Application and Instructions

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** input a job advertisement and provide optional instructions,
**so that** I can prepare the context for generating a tailored cover letter.

### Acceptance Criteria

-   **AC1:** Given I am on the main generation page, when I paste a job advertisement into the designated text area, then the "Generate" button becomes enabled.
-   **AC2:** I can optionally write instructions for style and tone in a separate text area.
-   **AC3:** When I click the "Generate" button, the application captures and submits both inputs.

---

## 2. Test Generation (RED Phase)

The following failing test will be generated to reflect the acceptance criteria.

-   **Test File To Be Created:** `tests/e2e/create-job-application.spec.ts`

```typescript
// tests/e2e/create-job-application.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 3.1: Input Job Application and Instructions', () => {
  test('should allow a user to input a job ad and generate an application', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard');

    const jobAdTextarea = page.locator('[data-testid="job-ad-textarea"]');
    const instructionsInput = page.locator('[data-testid="instructions-input"]');
    const generateButton = page.locator('[data-testid="generate-button"]');

    // Button should be disabled initially
    await expect(generateButton).toBeDisabled();

    // Fill in the job ad
    await jobAdTextarea.fill('This is a test job advertisement.');
    await expect(generateButton).toBeEnabled();

    // Fill in optional instructions
    await instructionsInput.fill('Please make it formal.');

    // Mock the API response
    await page.route('**/api/v1/job-applications', (route) => {
      if (route.request().method() === 'POST') {
        const body = route.request().postDataJSON();
        expect(body.jobAdvertisementText).toBe('This is a test job advertisement.');
        expect(body.instructionsText).toBe('Please make it formal.');
        route.fulfill({
          status: 201,
          body: JSON.stringify({
            id: 'ja-new',
            jobAdvertisementText: 'This is a test job advertisement.',
            instructionsText: 'Please make it formal.',
            status: 'received',
          }),
        });
      }
    });

    // Click the generate button
    await generateButton.click();

    // Expect a success toast (or other UI feedback)
    await expect(page.locator('text=Application generated successfully!')).toBeVisible();
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Job Ad Text Area | `job-ad-textarea` |
| Instructions Input | `instructions-input` |
| Generate Button | `generate-button` |

### API Endpoint Contracts (for Backend)

-   **`POST /api/v1/job-applications`**
    -   **Request Body:** `{ "jobAdvertisementText": "...", "instructionsText": "..." }`
    -   **Success Response (201):** `{ "id": "...", "jobAdvertisementText": "...", "instructionsText": "...", "status": "..." }`
    -   **Failure Response (4xx/5xx):** `{ "detail": "..." }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow a user to input a job ad and generate an application`

-   [x] **Backend:** The `POST /api/v1/job-applications` endpoint in FastAPI is already created.
-   [x] **Frontend:** The dashboard page (`/dashboard`) contains the necessary form fields.
-   [x] **Frontend:** The "Generate" button is correctly enabled/disabled based on the job ad input.
-   [x] **Frontend:** The `handleGenerate` function correctly sends the form data to the backend API.
-   [x] **Frontend:** A success toast is displayed upon successful submission.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/create-job-application.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail initially if it doesn't exist.
2.  **GREEN:** The core functionality already exists. The test should pass once created.
3.  **REFACTOR:** Review the existing code for clarity and adherence to standards.
