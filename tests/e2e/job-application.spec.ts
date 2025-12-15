import { test, expect } from '../support/fixtures';

test.describe('Story 3.1: Input Job Application and Instructions', () => {
  test('should enable generate button only when job ad is filled', async ({ page }) => {
    // Navigate to the dashboard page where the form is located
    await page.goto('/dashboard');

    const generateButton = page.locator('[data-testid="generate-button"]');
    const jobAdTextarea = page.locator('[data-testid="job-ad-input"]');

    // Initially, the button should be disabled
    await expect(generateButton).toBeDisabled();

    // Type text into the job ad text area
    await jobAdTextarea.fill('Software Engineer position at a leading tech company.');

    // Now, the button should be enabled
    await expect(generateButton).toBeEnabled();

    // Clear the text area
    await jobAdTextarea.fill('');

    // The button should be disabled again
    await expect(generateButton).toBeDisabled();
  });

  test('should capture all inputs for generation', async ({ page }) => {
    await page.goto('/dashboard');

    const jobAdTextarea = page.locator('[data-testid="job-ad-input"]');
    const instructionsInput = page.locator('[data-testid="style-instructions-input"]');
    const generateButton = page.locator('[data-testid="generate-button"]');

    const jobAdText = 'Senior React Developer role.';
    const instructionsText = 'Emphasize my experience with state management.';

    await jobAdTextarea.fill(jobAdText);
    await instructionsInput.fill(instructionsText);

    // Mock the API request to intercept the form submission
    let requestBody: any = null;
    await page.route('**/api/v1/job-applications', async (route) => {
      requestBody = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        body: JSON.stringify({ id: 'mock-id', ...requestBody }),
      });
    });

    // FIX: Bruk Promise.all for å unngå race condition (timeout)
    await Promise.all([
      page.waitForResponse('**/api/v1/job-applications'),
      generateButton.click()
    ]);

    // Verify that the submitted data is correct
    expect(requestBody).not.toBeNull();
    expect(requestBody.jobAdvertisementText).toBe(jobAdText);
    expect(requestBody.instructionsText).toBe(instructionsText);
  });
});
