# ATDD Implementation Checklist: Story 2.1 - User Registration

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Story Summary

**As a** new student user,
**I want to** register for an account using a single, dynamic form,
**so that** I can access the CVAI Turbo platform seamlessly.

### Acceptance Criteria

- **AC1:** Given I am on the landing page, when I click the "Sign Up" link, then the form expands to include registration fields without a page reload.
- **AC2:** Given I am on the registration form, when I enter valid details and submit, then my account is created in Supabase Auth, I receive a verification email, and I am redirected to the CV creation page.

---

## 2. Test Generation (RED Phase)

The following failing tests have been generated to reflect the acceptance criteria. The goal of the development team is to make these tests pass.

-   **Test File Created:** `tests/e2e/registration.spec.ts`

```typescript
// tests/e2e/registration.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 2.1: User Registration', () => {
  test('should expand the registration form on Sign Up click', async ({ page }) => {
    // Corresponds to AC1
    await page.goto('/');
    await page.click('[data-testid="signup-link"]');
    await expect(page.locator('[data-testid="confirm-password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="registration-submit-button"]')).toBeVisible();
  });

  test('should create an account and redirect on valid submission', async ({ page }) => {
    // Corresponds to AC2
    await page.goto('/');
    await page.click('[data-testid="signup-link"]');

    // Mock API endpoints
    await page.route('**/api/v1/auth/register', (route) => {
      return route.fulfill({ status: 201, body: JSON.stringify({ message: 'User created' }) });
    });
     await page.route('**/api/v1/resend/verify-email', (route) => {
        return route.fulfill({ status: 200, body: JSON.stringify({ message: 'Email sent' }) });
    });

    await page.fill('[data-testid="email-input"]', 'new.student@university.com');
    await page.fill('[data-testid="password-input"]', 'ValidPassword123!');
    await page.fill('[data-testid="confirm-password-input"]', 'ValidPassword123!');
    await page.click('[data-testid="registration-submit-button"]');

    await expect(page).toHaveURL(/.*\/cv-creation/);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

To ensure tests are stable and decoupled from CSS or text changes, the following `data-testid` attributes **must** be added to the frontend components.

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| "Sign Up" Link/Button | `signup-link` |
| Email Input Field | `email-input` |
| Password Input Field | `password-input` |
| Confirm Password Input | `confirm-password-input` |
| Registration Submit Button | `registration-submit-button` |

### API Endpoint Contracts (for Backend)

The tests assume the following API endpoints will be created:

-   **`POST /api/v1/auth/register`**
    -   **Request Body:** `{ "email": "...", "password": "..." }`
    -   **Success Response (201):** `{ "message": "User created successfully" }`
    -   **Failure Response (4xx):** `{ "error": "..." }`
-   **`POST /api/v1/resend/verify-email`** (or similar, based on implementation)
    -   **Request Body:** `{ "email": "..." }`
    -   **Success Response (200):** `{ "message": "Email sent" }`

---

## 4. Implementation Checklist (GREEN Phase)

Follow these steps to make the failing tests pass.

### Test 1: `should expand the registration form on Sign Up click`

-   [ ] **Frontend:** Implement the dynamic toggle on the landing page as described in UX Spec 5.1.1.
-   [ ] **Frontend:** Ensure a "Sign Up" element with `data-testid="signup-link"` exists.
-   [ ] **Frontend:** Clicking the "Sign Up" link should reveal the registration-specific fields without a full page reload.
-   [ ] **Frontend:** Add `data-testid="confirm-password-input"` to the confirm password field.
-   [ ] **Frontend:** Add `data-testid="registration-submit-button"` to the submit button in the registration view.
-   [ ] **Verify:** Run `npx playwright test --grep "should expand"` to confirm this test now passes.

### Test 2: `should create an account and redirect on valid submission`

-   [ ] **Backend:** Create the `POST /api/v1/auth/register` endpoint in FastAPI.
-   [ ] **Backend:** This endpoint should call Supabase Auth to create a new user.
-   [ ] **Backend:** After successful user creation, trigger the Resend service to send a verification email.
-   [ ] **Frontend:** Implement the client-side logic in the registration form to call the `/api/v1/auth/register` endpoint on submit.
-   [ ] **Frontend:** Upon receiving a successful (201) response, programmatically redirect the user to the `/cv-creation` page.
-   [ ] **Frontend:** Ensure the form fields have the required `data-testid` attributes listed above.
-   [ ] **Verify:** Run `npx playwright test --grep "should create an account"` to confirm this test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** All tests are currently failing. This is expected.
2.  **GREEN:** Follow the checklist above to implement the code needed to make the tests pass. Run tests after each major step to see progress.
3.  **REFACTOR:** Once all tests for this story are passing, you can refactor your code with confidence, knowing the tests will catch any regressions.
