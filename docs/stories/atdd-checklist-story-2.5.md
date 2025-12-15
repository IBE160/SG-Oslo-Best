# ATDD Implementation Checklist: Story 2.5 - Implement Stateful Textbox Component

**Author:** Gemini-Pro
**Date:** 2025-12-11
**Version:** 1.0

---

## 1. Story Summary

**As a** developer,
**I want to** create a "Stateful Textbox" component,
**so that** users receive immediate visual feedback (e.g., colored borders) on the auto-save status of their CV information.

### Acceptance Criteria

-   **AC1:** Given a standard textarea or input field, when it is wrapped in the Stateful Textbox component, then it visually changes its appearance based on its state (default, unsaved, saving, saved).
-   **AC2:** The component should accept a `saveState` prop to control its visual state.
-   **AC3:** The component should correctly reflect the field's state as managed by the parent form.

---

## 2. Test Generation (RED Phase)

-   **Test File To Be Created:** `tests/component/StatefulTextbox.spec.tsx` (or similar, using Storybook/Jest)

```typescript
// tests/component/StatefulTextbox.spec.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatefulTextbox } from '@/components/ui/StatefulTextbox';

describe('StatefulTextbox', () => {
  it('should render with default styles', () => {
    render(<StatefulTextbox saveState="default" data-testid="textbox" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-gray-300');
  });

  it('should render with unsaved styles', () => {
    render(<StatefulTextbox saveState="unsaved" data-testid="textbox" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-yellow-500');
  });

  it('should render with saving styles', () => {
    render(<StatefulTextbox saveState="saving" data-testid="textbox" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-blue-500 animate-pulse');
  });

  it('should render with saved styles', () => {
    render(<StatefulTextbox saveState="saved" data-testid="textbox" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-green-500');
  });
});
```

---

## 3. Required Infrastructure & Attributes

-   A new reusable UI component created at `frontend/components/ui/StatefulTextbox.tsx`.
-   The component should be styled using Tailwind CSS and `clsx` (or `cn`).

---

## 4. Implementation Checklist (GREEN Phase)

### Test: `should render with different styles based on saveState`

-   [x] **Frontend:** Create the `StatefulTextbox.tsx` file.
-   [x] **Frontend:** The component accepts a `saveState` prop of type `'default' | 'unsaved' | 'saving' | 'saved'`.
-   [x] **Frontend:** The component uses `cn` (or `clsx`) to conditionally apply CSS classes based on the `saveState` prop.
-   [x] **Frontend:** The component forwards refs correctly to the underlying `textarea` element.
-   [ ] **Verify:** Create and run the component test to confirm the styles are applied correctly.

---

## 5. Red-Green-Refactor Workflow

1.  **RED:** The test will fail because the component does not exist.
2.  **GREEN:** The component was created to satisfy the requirements of Story 2.4.
3.  **REFACTOR:** Review the component for clarity, reusability, and adherence to project conventions.
