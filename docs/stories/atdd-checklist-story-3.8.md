# ATDD Implementation Checklist: Story 3.8 - Generation Status Indicator Component

**Author:** Murat (Master Test Architect)
**Date:** 2025-12-02
**Version:** 1.0

---

## 1. Story Summary

**As a** developer,
**I want to** create the "Generation Status Indicator" component,
**so that** users are kept engaged and informed during the AI generation process with a loading spinner and specified text.

### Acceptance Criteria

-   **AC1:** Given the AI generation process is initiated, when the component is displayed, then it shows an active loading spinner.
-   **AC2:** And it periodically displays the message "Please give us an A".
-   **AC3:** And user input fields are disabled while it is active.
-   **AC4:** When generation is complete, the component is hidden.

---

## 2. Test Generation (RED Phase)

The following failing **component tests** have been generated. Component tests are used here to test the UI component in isolation, which is faster and more reliable for this purpose than a full E2E test.

-   **Test File Created:** `tests/component/GenerationStatusIndicator.test.tsx`

```typescript
// tests/component/GenerationStatusIndicator.test.tsx

import { test, expect } from '@playwright/experimental-ct-react';
import { GenerationStatusIndicator } from '../../components/GenerationStatusIndicator'; // Adjust path

test.use({ viewport: { width: 500, height: 500 } });

test.describe('Story 3.8: Generation Status Indicator Component', () => {
  test('should display spinner and message when active', async ({ mount }) => {
    // Corresponds to AC1, AC2
    const component = await mount(<GenerationStatusIndicator active={true} />);
    await expect(component).toBeVisible();
    await expect(component.locator('[data-testid="loading-spinner"]')).toBeVisible();
    await expect(component).toContainText('Please give us an A');
  });

  test('should be hidden when not active', async ({ mount }) => {
    // Corresponds to AC4
    const component = await mount(<GenerationStatusIndicator active={false} />);
    await expect(component).toBeHidden();
  });
});
```
*(Note: AC3, disabling inputs, is a responsibility of the parent component and is tested in the E2E test for Story 3.2)*

---

## 3. Required Infrastructure & Attributes

### Required `data-testid` Attributes

| Element Description | `data-testid` Attribute |
| ------------------- | ----------------------- |
| Loading Spinner Element | `loading-spinner` |

### Component Props

The component should accept the following props:

| Prop Name | Type | Description |
| --------- | ---- | ----------- |
| `active` | boolean | Controls the visibility of the component. |

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should display spinner and message when active` & `should be hidden when not active`

-   [ ] **Frontend:** Create a new React component file, e.g., `components/GenerationStatusIndicator.tsx`.
-   [ ] **Frontend:** The component should accept a boolean prop `active`.
-   [ ] **Frontend:** If `active` is `false`, the component should render `null` (or nothing).
-   [ ] **Frontend:** If `active` is `true`, the component should render:
    -   A container element (e.g., a `div`).
    -   A loading spinner element. You can use an SVG or a component from a library like `lucide-react`. Give this element `data-testid="loading-spinner"`.
    -   The text "Please give us an A".
-   [ ] **Frontend (Styling):** Use Tailwind CSS to style the component as an overlay (e.g., fixed position, centered) with a semi-transparent background to cover the UI beneath it.
-   [ ] **Verify:** Run `npx playwright test -c playwright-ct.config.ts` (or your component test command) to confirm the tests now pass.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The component tests are currently failing because the component does not exist.
2.  **GREEN:** Follow the checklist to create the component and make the tests pass.
3.  **REFACTOR:** Once passing, improve the component's styling or accessibility.
