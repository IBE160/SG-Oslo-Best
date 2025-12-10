# ATDD Implementation Checklist: Story 2.2 - User Login & Session Management

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Story Summary

**As a** registered student user,
**I want to** log in to my account from the same page as registration,
**so that** I can access my profile and application features.

### Acceptance Criteria

-   **AC1:** Given I have a verified account and am on the landing page, when I enter my email and password on the login form and submit, then I am successfully authenticated via Supabase Auth, a secure session is established on the client, and I am redirected to my main application page.
-   **AC2:** And a pop-up appears asking if I would like to update my CV information.

---

## 2. Test Generation (RED Phase)

The following failing tests have been generated to reflect the acceptance criteria. The goal of the development team is to make these tests pass.

-   **Test File Created:** `tests/e2e/login.spec.ts`

```typescript
// tests/e2e/login.spec.ts

import { test, expect } from '../support/fixtures';

test.describe('Story 2.2: User Login & Session Management', () => {
  test('should log in a verified user and redirect to dashboard', async ({ page }) => {
    // Corresponds to AC1
    await page.goto('/');
    await page.route('**/api/v1/auth/login', (route) => {
      // Mock successful login
      return route.fulfill({
        status: 200,
        body: JSON.stringify({ access_token: 'fake-jwt-for-testing' }),
      });
    });
    await page.fill('[data-testid="email-input"]', 'verified.user@university.com');
    await page.fill('[data-testid="password-input"]', 'StrongPassword123!');
    await page.click('[data-testid="login-submit-button"]');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should show a pop-up asking to update CV information after login', async ({ page }) => {
    // Corresponds to AC2
    await page.goto('/');
    await page.route('**/api/v1/auth/login', (route) => {
      return route.fulfill({ status: 200, body: JSON.stringify({ access_token: 'fake-jwt-for-testing' }) });
    });
    await page.fill('[data-testid="email-input"]', 'verified.user@university.com');
    await page.fill('[data-testid="password-input"]', 'StrongPassword123!');
    await page.click('[data-testid="login-submit-button"]');
    await page.waitForURL(/.*\/dashboard/);

    const popup = page.locator('[data-testid="update-cv-popup"]');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText(/update your CV information/i);
  });
});
```

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

The following `data-testid` attributes **must** be added to the frontend components for test stability.

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Email Input Field | `email-input` |
| Password Input Field | `password-input` |
| Login Submit Button | `login-submit-button` |
| "Update CV" Pop-up/Modal | `update-cv-popup` |

### API Endpoint Contracts (for Backend)

The tests assume the following API endpoint will be created:

-   **`POST /api/v1/auth/login`**
    -   **Request Body:** `{ "email": "...", "password": "..." }`
    -   **Success Response (200):** `{ "access_token": "...", "token_type": "bearer" }`
    -   **Failure Response (401):** `{ "detail": "Incorrect email or password" }`

---

## 4. Implementation Checklist (GREEN Phase)

Follow these steps to make the failing tests pass.

### Test 1: `should log in a verified user and redirect to dashboard`

-   [ ] **Backend:** Create the `POST /api/v1/auth/login` endpoint in FastAPI.
-   [ ] **Backend:** The endpoint should validate credentials against the Supabase Auth service.
-   [ ] **Backend:** On successful validation, it should return the JWT provided by Supabase.
-   [ ] **Frontend:** Implement the client-side logic in the login form to call the `/api/v1/auth/login` endpoint on submit.
-   [ ] **Frontend:** Ensure the form fields have the `data-testid` attributes for email, password, and the submit button.
-   [ ] **Frontend:** Upon receiving a successful (200) response with a token, establish a client-side session (e.g., store the token in a secure way, update React Context state).
-   [ ] **Frontend:** Programmatically redirect the user to the `/dashboard` page after the session is established.
-   [ ] **Verify:** Run `npx playwright test --grep "should log in"` to confirm this test now passes.

### Test 2: `should show a pop-up asking to update CV information after login`

-   [ ] **Frontend:** On the `/dashboard` page, implement logic to check if the user is a new or returning user (this could be based on a flag from the login API response, or another API call).
-   [ ] **Frontend:** If the condition to show the pop-up is met, render a modal or pop-up component.
-   [ ] **Frontend:** Ensure the pop-up component has the `data-testid="update-cv-popup"` attribute.
-   [ ] **Frontend:** The pop-up should contain the text "update your CV information".
-   [ ] **Verify:** Run `npx playwright test --grep "should show a pop-up"` to confirm this test now passes.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** All tests are currently failing. This is expected.
2.  **GREEN:** Follow the checklist above to implement the code needed to make the tests pass. Run tests after each major step to see progress.
3.  **REFACTOR:** Once all tests for this story are passing, you can refactor your code with confidence, knowing the tests will catch any regressions.
