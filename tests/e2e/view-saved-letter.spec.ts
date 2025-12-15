// tests/e2e/view-saved-letter.spec.ts
import { test, expect } from '../support/fixtures';

test.describe('Story 3.6: View Saved Cover Letter', () => {
  test('should display a list of saved cover letters and allow viewing a single letter', async ({ page }) => {
    
    // Mock BEFORE navigation
    await page.route('**/api/v1/cover-letters', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: 'cl1', title: 'Cover Letter for Google', saved_at: '2025-12-10T10:00:00Z', content: 'Dear Google...' },
          { id: 'cl2', title: 'Cover Letter for Facebook', saved_at: '2025-12-11T11:00:00Z', content: 'Dear Facebook...' },
        ]),
      });
    });

    await page.goto('/dashboard/cover-letters');

    // Instead of waiting for response → wait for UI to show list
    await expect(page.locator('[data-testid="cover-letter-list"]')).toBeVisible();

    const items = page.locator('[data-testid="cover-letter-item"]');
    await expect(items).toHaveCount(2);

    const first = items.first();
    await expect(first).toContainText('Cover Letter for Google');
    await expect(first).toContainText(/December 10, 2025/i);

    await first.click();
    
    await expect(page.locator('[data-testid="cover-letter-content"]')).toHaveText('Dear Google...');
  });
});
