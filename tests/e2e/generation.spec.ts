import { test, expect } from '../support/fixtures';

test.describe('Story 3.2: Generate Cover Letter', () => {
  // We'll need a fixture to mock an authenticated user session
  // For now, we simulate this by setting up mocks before visiting the page
  test('should disable inputs, show status, and display generated letter', async ({ page }) => {
    // GIVEN: A logged-in user has provided a job ad and is on the main generation page
    await page.goto('/dashboard'); // Assuming this is the main generation page
    const jobAdText = 'Software Engineer position at a great company.';
    const generatedLetter = 'Dear Hiring Manager, I am writing to express my interest...';

    await page.fill('[data-testid="job-ad-input"]', jobAdText);

    // Mock the backend generation endpoint
    await page.route('**/api/v1/generation', (route) => {
      // Add a delay to simulate generation time
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ generated_text: generatedLetter }),
        });
      }, 1000); // 1-second delay
    });

    // WHEN: The user clicks the "Generate" button
    await page.click('[data-testid="generate-button"]');

    // THEN: All input fields are temporarily disabled
    await expect(page.locator('[data-testid="job-ad-input"]')).toBeDisabled();
    await expect(page.locator('[data-testid="style-instructions-input"]')).toBeDisabled();

    // AND: The UI shows the "Generation Status Indicator"
    await expect(page.locator('[data-testid="generation-status-indicator"]')).toBeVisible();

    // AND: When generation is complete, the generated cover letter is displayed
    const outputArea = page.locator('[data-testid="cover-letter-output"]');
    await expect(outputArea).toBeVisible({ timeout: 5000 }); // Wait longer for the delayed response
    await expect(outputArea).toHaveValue(generatedLetter);

    // AND: The status indicator is hidden
    await expect(page.locator('[data-testid="generation-status-indicator"]')).toBeHidden();

    // AND: The input fields are re-enabled
    await expect(page.locator('[data-testid="job-ad-input"]')).toBeEnabled();
  });
});
