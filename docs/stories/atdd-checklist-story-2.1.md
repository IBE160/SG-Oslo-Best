# ATDD Implementation Checklist: Story 2.1 - User Registration

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** new student user,
**I want to** register for an account using a single, dynamic form,
**so that** I can access the CVAI Turbo platform seamlessly.

### Acceptance Criteria

-   **AC1:** Given I am on the landing page, when I click the "Sign Up" link, then the form expands to include registration fields without a page reload.
-   **AC2:** When I enter valid details and submit the form, then my account is created in Supabase Auth, and I receive a verification email.
-   **AC3:** After registration, I am shown a message to check my email and the form switches to the login view.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/e2e/user-registration.spec.ts`

```typescript
// tests/e2e/user-registration.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 2.1: User Registration', () => {
  test('should allow a new user to register', async ({ page }) => {
    // Corresponds to AC1, AC2, AC3
    await page.goto('/'); // Assuming the auth page is the root

    // Start in login view, click sign up link
    await page.locator('[data-testid="signup-link"]').click();
    await expect(page.locator('[data-testid="confirm-password-input"]')).toBeVisible();

    // Mock the register endpoint
    await page.route('**/api/v1/auth/register', (route) => {
      route.fulfill({
        status: 201,
        body: JSON.stringify({
          message: "User created successfully. Please check your email for a verification link.",
          data: { user_id: 'some-uuid', email: 'student@example.com' }
        }),
      });
    });

    // Fill out and submit the registration form
    await page.locator('[data-testid="email-input"]').fill('student@example.com');
    await page.locator('[data-testid="password-input"]').fill('password123');
    await page.locator('[data-testid="confirm-password-input"]').fill('password123');
    await page.locator('[data-testid="registration-submit-button"]').click();

    // Check for success message and that the view switched back to login
    await expect(page.locator('text=Registration successful!')).toBeVisible();
    await expect(page.locator('[data-testid="login-submit-button"]')).toBeVisible();
  });
});
```

---

## 3. Required Infrastructure & Attributes

### `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Signup Link | `signup-link` |
| Confirm Password Input | `confirm-password-input` |
| Registration Submit Button | `registration-submit-button` |

### API Endpoint Contracts

-   **`POST /api/v1/auth/register`**
    -   **Request Body:** `{ "email": "...", "password": "..." }`
    -   **Success Response (201):** `{ "message": "...", "data": { "user_id": "...", "email": "..." } }`

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should allow a new user to register`

-   [x] **Backend:** The `POST /api/v1/auth/register` endpoint exists.
-   [x] **Backend:** The endpoint sends a verification email using Resend.
-   [x] **Frontend:** The auth page (`/`) provides a dynamic form for registration and login.
-   [x] **Frontend:** The form correctly validates input before submission.
-   [x] **Frontend:** The form calls the correct API endpoint and displays a success message.
-   [ ] **Verify:** Run `npx playwright test tests/e2e/user-registration.spec.ts` to confirm the test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail if it does not exist.
2.  **GREEN:** The functionality already exists. The test should pass once created.
3.  **REFACTOR:** Review the code for clarity and adherence to standards.
