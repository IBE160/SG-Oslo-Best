import { test, expect } from '../support/fixtures';

test.describe('Story 3.4: Regenerate and Compare Cover Letter Versions', () => {
  test('should create a new version tab on regeneration and allow switching', async ({ page }) => {
    // 1. Setup Data
    const textV1 = 'This is the first version.';
    const textV2 = 'This is the second version.';

    await page.goto('/dashboard');

    // 2. Mock First Generation
    await page.route('**/api/v1/generation', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'v1', generated_text: textV1 }),
      });
    }, { times: 1 });

    // 3. Trigger V1
    await page.fill('[data-testid="job-ad-input"]', 'Job Ad Text');
    await page.click('[data-testid="generate-button"]');
    
    // Verify V1 is visible
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(textV1);
    await expect(page.locator('[data-testid="version-tab-1"]')).toBeVisible();

    // 4. Mock Second Generation
    await page.route('**/api/v1/generation', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'v2', generated_text: textV2 }),
      });
    });

    // 5. Trigger V2 (Regenerate)
    await page.fill('[data-testid="style-instructions-input"]', 'Make it better');
    await page.click('[data-testid="regenerate-button"]');

    // Verify V2 is visible and active
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(textV2);
    await expect(page.locator('[data-testid="version-tab-2"]')).toHaveAttribute('data-state', 'active');

    // 6. SWITCH BACK TO V1
    // Important: We wait for the tab to be clickable before clicking
    const tab1 = page.locator('[data-testid="version-tab-1"]');
    await tab1.waitFor({ state: 'visible' });
    await tab1.click();

    // 7. ROBUST CHECK
    // Instead of checking active state first, we wait for the content to change.
    // Playwright will retry this until it matches or times out.
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(textV1);
    
    // Once content matches, we know the switch happened, so checking the tab state is safe.
    await expect(tab1).toHaveAttribute('data-state', 'active');
  });
});
