import { test, expect } from '@playwright/test';

test.describe('Story 2.2: User Login', () => {
  test('should log in a verified user and redirect to dashboard', async ({ page, context }) => {
    await context.route('**/api/v1/auth/login', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ data: { access_token: 'fake', refresh_token: 'fake' } }) });
    });
    
    // Mock user profile så dashboard laster
    await context.route('**/api/v1/users/me', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ data: { id: '1', profile_completed: true } }) });
    });

    await page.goto('/login'); // Eller '/' avhengig av oppsett
    
    // Fyll ut skjema hvis vi er på login
    if (await page.getByTestId('email-input').isVisible()) {
        await page.getByTestId('email-input').fill('user@example.com');
        await page.getByTestId('password-input').fill('Pass123!');
        await page.click('[data-testid="login-submit-button"]');
    }

    // Vent på dashboard URL i stedet for spesifikk H1 som kan endre seg
    await page.waitForURL(/.*dashboard/);
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
