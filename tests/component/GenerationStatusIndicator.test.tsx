import { test, expect } from '@playwright/experimental-ct-react';
import { GenerationStatusIndicator } from '../../components/GenerationStatusIndicator'; // Adjust path as needed

test.use({ viewport: { width: 500, height: 500 } });

test.describe('Story 3.8: Generation Status Indicator Component', () => {
  test('should display spinner and message when active', async ({ mount }) => {
    // GIVEN: The component is mounted with the 'active' prop set to true
    const component = await mount(<GenerationStatusIndicator active={true} />);

    // THEN: It should be visible
    await expect(component).toBeVisible();

    // AND: It should contain a loading spinner
    await expect(component.locator('[data-testid="loading-spinner"]')).toBeVisible();

    // AND: It should contain the specified text
    await expect(component).toContainText('Please give us an A');
  });

  test('should be hidden when not active', async ({ mount }) => {
    // GIVEN: The component is mounted with the 'active' prop set to false
    const component = await mount(<GenerationStatusIndicator active={false} />);

    // THEN: It should not be visible
    await expect(component).toBeHidden();
  });
});
