// tests/e2e/login.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Story 2.2: User Login & Session Management', () => {
  test('should log in a verified user and redirect to dashboard', async ({ page, context }) => {
    // Corresponds to AC1
    await page.goto('/');
    
    // Mock successful login
    await context.route('**/api/v1/auth/login', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            access_token: 'fake-jwt-for-testing',
            refresh_token: 'fake-refresh-token'
          }
        }),
      });
    });

    await page.fill('[data-testid="email-input"]', 'verified.user@university.com');
    await page.fill('[data-testid="password-input"]', 'StrongPassword123!');
    await page.click('[data-testid="login-submit-button"]');
    
    // Wait for network to be idle and then for the dashboard header to appear
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/.*\/dashboard/);
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should show a pop-up asking to update CV information after login', async ({ page, context }) => {
    // Corresponds to AC2
    await page.goto('/');
    
    await context.route('**/api/v1/auth/login', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            access_token: 'fake-jwt-for-testing',
            refresh_token: 'fake-refresh-token'
          }
        }),
      });
    });

    await page.fill('[data-testid="email-input"]', 'verified.user@university.com');
    await page.fill('[data-testid="password-input"]', 'StrongPassword123!');
    await page.click('[data-testid="login-submit-button"]');
    
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/.*\/dashboard/);
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();

    const popup = page.locator('[data-testid="update-cv-popup"]');
    await expect(popup).toBeVisible();
    await expect(popup).toContainText(/update your CV information/i);
  });
});