import { test, expect } from '../support/fixtures';

test.describe('Story 2.2: User Login & Session Management', () => {
  test('should log in a verified user and redirect to dashboard', async ({ page }) => {
    // GIVEN: A verified user exists and the user is on the login form
    const userEmail = 'verified.user@university.com';
    const userPassword = 'StrongPassword123!';
    await page.goto('/'); // Assuming login form is on the landing page

    // Mock the backend login endpoint to return success with a JWT
    await page.route('**/api/v1/auth/login', (route) => {
      // Check if the request body matches our user
      const body = route.request().postDataJSON();
      if (body.email === userEmail && body.password === userPassword) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: 'fake-jwt-for-testing',
            token_type: 'bearer',
          }),
        });
      }
      // Fail the request for any other credentials
      return route.fulfill({ status: 401, body: JSON.stringify({ detail: 'Incorrect email or password' }) });
    });

    // WHEN: The user enters their valid credentials and submits
    await page.fill('[data-testid="email-input"]', userEmail);
    await page.fill('[data-testid="password-input"]', userPassword);
    await page.click('[data-testid="login-submit-button"]');

    // THEN: The user is redirected to their main application page (dashboard)
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should show a pop-up asking to update CV information after login', async ({ page }) => {
    // GIVEN: A user has just successfully logged in
    const userEmail = 'verified.user@university.com';
    const userPassword = 'StrongPassword123!';
    await page.goto('/');

    await page.route('**/api/v1/auth/login', (route) => {
      return route.fulfill({
        status: 200,
        body: JSON.stringify({ access_token: 'fake-jwt-for-testing' }),
      });
    });

    await page.fill('[data-testid="email-input"]', userEmail);
    await page.fill('[data-testid="password-input"]', userPassword);
    await page.click('[data-testid="login-submit-button"]');
    await page.waitForURL(/.*\/dashboard/);

    // WHEN: The dashboard page loads
    // THEN: A pop-up appears asking if they would like to update their CV information
    const popup = page.locator('[data-testid="update-cv-popup"]');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText(/update your CV information/i);
  });
});
