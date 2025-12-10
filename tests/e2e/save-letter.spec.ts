import { test, expect } from '../support/fixtures';

test.describe('Story 3.5: Save Generated Cover Letter', () => {
  test('should save the letter, disable the button, and show a notification', async ({ page }) => {
    // GIVEN: A cover letter is displayed after generation
    await page.goto('/dashboard');
    const generatedLetter = 'This is a masterpiece worth saving.';

    // Mock the generation call
    await page.route('**/api/v1/generation', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ generated_text: generatedLetter }) });
    });
    await page.click('[data-testid="generate-button"]');
    await expect(page.locator('[data-testid="cover-letter-output"]')).toHaveValue(generatedLetter);

    // Ensure the save button is initially enabled
    const saveButton = page.locator('[data-testid="save-letter-button"]');
    await expect(saveButton).toBeEnabled();

    // Mock the save endpoint
    await page.route('**/api/v1/cover-letters', (route) => {
      // We can assert the request payload here if needed
      // const body = route.request().postDataJSON();
      // expect(body.content).toBe(generatedLetter);
      route.fulfill({ status: 201, body: JSON.stringify({ message: 'Cover letter saved' }) });
    });

    // WHEN: The user clicks the "Save" button
    await saveButton.click();

    // THEN: The button's state changes to "Saved ✓" and becomes disabled
    await expect(saveButton).toBeDisabled();
    await expect(saveButton).toHaveText('Saved ✓');

    // AND: A toast notification confirms the save action
    const toast = page.locator('[data-testid="toast-notification"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/saved/i);
  });
});
