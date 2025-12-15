# ATDD Implementation Checklist: Story 2.3 - Create User Profile & CV (Initial)

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** logged-in student user,
**I want to** create my initial profile and input my CV information into a single text area,
**so that** the system has my basic data for cover letter generation.

### Acceptance Criteria

-   **AC1:** Given I am logged in for the first time, when I am redirected to the profile creation page, then I see fields for personal details and a large text area for CV content.
-   **AC2:** When I attempt to save with a mandatory field empty, then the system displays an inline error and prevents saving.
-   **AC3:** When I fill in all required fields and save, then my profile and CV data are successfully stored, and I am redirected to the main application dashboard.

---

## 2. Test Generation (RED Phase)

The following failing test will be generated to reflect the acceptance criteria.

-   **Test File To Be Created:** `tests/e2e/create-profile.spec.ts`

```typescript
// tests/e2e/create-profile.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 2.3: Create User Profile & CV', () => {
  test('should allow a user to create their profile and CV', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/dashboard/profile');

    // Mock the initial fetch to return no profile
    await page.route('**/api/v1/users/me/cv', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 404,
          body: JSON.stringify({ detail: "User profile not found." }),
        });
      }
    });

    // Check that the form is visible
    await expect(page.locator('text=Create Your Profile and CV')).toBeVisible();

    // Try to submit without filling the form
    await page.locator('button[type="submit"]').click();

    // Check for validation errors
    await expect(page.locator('text=Full name is required')).toBeVisible();
    
    // Fill the form
    await page.locator('input[name="full_name"]').fill('Test User');
    await page.locator('input[name="date_of_birth"]').fill('2000-01-01');
    await page.locator('input[name="gender"]').fill('Test');
    await page.locator('input[name="phone_number"]').fill('123456789');
    await page.locator('input[name="address"]').fill('Test Address');
    await page.locator('textarea[name="cv_content"]').fill('This is a test CV.');
    
    // Mock the POST request
    await page.route('**/api/v1/users/me/cv', (route) => {
        if (route.request().method() === 'POST') {
            route.fulfill({
                status: 201,
                body: JSON.stringify({ id: 'some-uuid' }),
            });
        }
    });
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Should be redirected to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### API Endpoint Contracts (for Backend)

-   **`POST /api/v1/users/me/cv`**
    -   **Request Body:** `{ "full_name": "...", "date_of_birth": "...", "gender": "...", "phone_number": "...", "address": "...", "cv_content": "..." }`
    -   **Success Response (201):** `{ "id": "...", ... }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow a user to create their profile and CV`

-   [x] **Backend:** The `POST /api/v1/users/me/cv` endpoint in FastAPI is already created.
-   [x] **Frontend:** Create the profile page at `/dashboard/profile`.
-   [x] **Frontend (React Query):** Use `useQuery` to fetch existing profile data.
-   [x] **Frontend (React Hook Form):** Use `react-hook-form` with `zod` for form management and validation.
-   [x] **Frontend (React Query):** Use `useMutation` to handle the profile creation.
-   [x] **Frontend:** Redirect to the dashboard on successful creation.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/create-profile.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the frontend page does not exist.
2.  **GREEN:** Follow the checklist to implement the functionality.
3.  **REFACTOR:** Once the test is passing, review the code for clarity, performance, and adherence to coding standards.
