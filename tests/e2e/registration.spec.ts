import { test, expect } from '../support/fixtures';

test.describe('Story 2.1: User Registration', () => {
  test('should expand the registration form on Sign Up click', async ({ page }) => {
    // GIVEN: User is on the landing page
    await page.goto('/'); // Assuming the login/signup form is on the landing page

    // WHEN: User clicks the "Sign Up" link
    await page.click('[data-testid="signup-link"]');

    // THEN: Registration-specific fields become visible
    await expect(page.locator('[data-testid="confirm-password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="registration-submit-button"]')).toBeVisible();
  });

  test('should create an account and redirect on valid submission', async ({ page }) => {
    // GIVEN: The user is on the registration form
    await page.goto('/');
    await page.click('[data-testid="signup-link"]');

    // Mock the backend registration endpoint to return success
    await page.route('**/api/v1/auth/register', (route) => {
      return route.fulfill({
        status: 201, // Created
        contentType: 'application/json',
        body: JSON.stringify({ message: 'User created successfully' }),
      });
    });

    // Mock the email service call (assuming it's a separate API call)
    await page.route('**/api/v1/resend/verify-email', (route) => {
        return route.fulfill({ status: 200, body: JSON.stringify({ message: 'Email sent' }) });
    });


    // WHEN: The user enters valid details and submits
    await page.fill('[data-testid="email-input"]', 'new.student@university.com');
    await page.fill('[data-testid="password-input"]', 'ValidPassword123!');
    await page.fill('[data-testid="confirm-password-input"]', 'ValidPassword123!');
    await page.click('[data-testid="registration-submit-button"]');

    // THEN: The user is redirected to the CV creation page
    await expect(page).toHaveURL(/.*\/cv-creation/);
  });
});
