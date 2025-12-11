# ATDD Implementation Checklist: Story 2.2 - User Login & Session Management

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** registered student user,
**I want to** log in to my account from the same page as registration,
**so that** I can access my profile and application features.

### Acceptance Criteria

-   **AC1:** Given I have a verified account and am on the landing page, when I enter my email and password on the login form and submit, then I am successfully authenticated.
-   **AC2:** A secure session is established on the client using the JWT from the backend.
-   **AC3:** I am redirected to my main application page (`/dashboard`) if I have a profile, or to the CV creation page (`/cv-creation`) if I do not.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/user-login.spec.ts`

```typescript
// tests/e2e/user-login.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 2.2: User Login', () => {
  test('should allow a registered user to log in and be redirected', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/');

    // Mock the login endpoint
    await page.route('**/api/v1/auth/login', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: {
            access_token: 'fake-access-token',
            refresh_token: 'fake-refresh-token',
          },
        }),
      });
    });

    // Mock the profile check endpoint (user has no profile)
    await page.route('**/api/v1/users/me/cv', (route) => {
      route.fulfill({
        status: 404,
        body: JSON.stringify({ detail: 'User profile not found.' }),
      });
    });

    // Fill out and submit the login form
    await page.locator('[data-testid="email-input"]').fill('student@example.com');
    await page.locator('[data-testid="password-input"]').fill('password123');
    await page.locator('[data-testid="login-submit-button"]').click();

    // Check for redirection to the CV creation page
    await expect(page).toHaveURL(/.*\/cv-creation/);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Email Input | `email-input` |
| Password Input | `password-input` |
| Login Submit Button | `login-submit-button` |

### API Endpoint Contracts

-   **`POST /api/v1/auth/login`**
    -   **Request Body:** `{ "email": "...", "password": "..." }`
    -   **Success Response (200):** `{ "data": { "access_token": "...", "refresh_token": "..." } }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow a registered user to log in and be redirected`

-   [x] **Backend:** The `POST /api/v1/auth/login` endpoint exists.
-   [x] **Frontend:** The auth page (`/`) provides a form for login.
-   [x] **Frontend:** The `AuthContext` is used to manage the user session.
-   [x] **Frontend:** The form calls the login API and handles the response.
-   [x] **Frontend:** After login, the app checks for a user profile and redirects accordingly.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/user-login.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail if it does not exist.
2.  **GREEN:** The functionality already exists. The test should pass once created.
3.  **REFACTOR:** Review the code for clarity and adherence to standards.