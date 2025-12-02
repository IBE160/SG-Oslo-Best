import { test, expect } from '../support/fixtures';

test.describe('Story 3.4: Regenerate and Compare Cover Letter Versions', () => {
  test('should create a new version tab on regeneration and allow switching', async ({ page }) => {
    // GIVEN: A cover letter has been generated
    await page.goto('/dashboard');
    const firstGeneratedLetter = 'This is the first version of the cover letter.';
    const secondGeneratedLetter = 'This is the improved second version.';

    // Mock the first generation call
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ generated_text: firstGeneratedLetter }),
      });
      // Fulfill only once to allow for the second call to be different
      route.continue();
    }, { times: 1 });

    await page.fill('[data-testid="job-ad-input"]', 'Initial job ad.');
    await page.click('[data-testid="generate-button"]');

    // Wait for the first letter to be displayed
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(firstGeneratedLetter);
    await expect(page.locator('[data-testid="version-tab-1"]')).toBeVisible();

    // Mock the second generation call
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ generated_text: secondGeneratedLetter }),
      });
    });

    // WHEN: The user modifies instructions and clicks "Regenerate"
    await page.fill('[data-testid="style-instructions-input"]', 'Make it more professional.');
    await page.click('[data-testid="regenerate-button"]');

    // THEN: The output panel displays the new version as the active tab
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(secondGeneratedLetter);
    await expect(page.locator('[data-testid="version-tab-2"]')).toHaveAttribute('data-state', 'active');

    // AND: A tab for the previous version is present
    await expect(page.locator('[data-testid="version-tab-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="version-tab-1"]')).not.toHaveAttribute('data-state', 'active');


    // AND: The user can switch back to the first version
    await page.click('[data-testid="version-tab-1"]');
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(firstGeneratedLetter);
    await expect(page.locator('[data-testid="version-tab-1"]')).toHaveAttribute('data-state', 'active');
  });
});
