# Story 2.5: Implement Stateful Textbox Component

Status: done

## Story

As a developer,
I want to create a "Stateful Textbox" component,
so that users receive immediate visual feedback (e.g., colored borders) on the auto-save status of their CV information.

## Acceptance Criteria

1.  Given a standard textarea or input field, when it is wrapped in the Stateful Textbox component, then it visually changes its appearance based on its state (default, unsaved, saved).
2.  The component must accept props to control its visual state (e.g., `isDirty`, `isSaved`, `isSaving`).
3.  The border color of the component must be neutral by default.
4.  The border color must turn yellow when the state is "unsaved" (`isDirty`).
5.  The border color must turn green when the state is "saved" (`isSaved`).
6.  The component correctly reflects the field's state as managed by the parent form (React Hook Form).

## Tasks / Subtasks

-   [x] **Task 1: Create the StatefulTextbox Component** (AC: #1, #2, #3, #4, #5)
    -   [x] **Frontend:** Create a new reusable component file at `frontend/components/ui/StatefulTextbox.tsx`.
    -   [x] **Frontend:** Implement the component to wrap a standard Shadcn/UI `Input` or `Textarea`.
    -   [x] **Frontend:** Use Tailwind CSS classes to dynamically change the border color based on the props (`isDirty`, `isSaved`).
    -   [x] **Frontend:** Ensure the component forwards all standard input props (like `onChange`, `onBlur`, `value`, `name`) to the underlying input element.

-   [x] **Task 2: Create a Storybook Story for the Component** (AC: #1, #6)
    -   [x] **Frontend:** Create a new Storybook file `frontend/components/ui/StatefulTextbox.stories.tsx`.
    -   [x] **Frontend:** Create stories to demonstrate the component in its various states (default, unsaved, saved).
    -   [x] **Frontend:** Create a story demonstrating the integration with `React Hook Form` to show how its state can be driven by the form's state.

-   [ ] **Task 3: Verification**
    -   [ ] **Testing:** Write unit tests for the `StatefulTextbox` component to verify that the correct classes are applied for each state.
    -   [ ] **Testing:** Manually verify the Storybook stories to ensure the component behaves as expected visually and with `React Hook Form`.

## Dev Notes

### Learnings from Previous Story

This component is a **critical blocker** for Story 2.4 ("Update User Profile & CV with Hybrid Save"). The Senior Developer Review for Story 2.4 explicitly identified the lack of this component as a high-severity issue preventing the implementation of the core "hybrid save" functionality. The primary purpose of this story is to deliver this component so that Story 2.4 can be unblocked and completed.

The following unresolved **High Severity** action items from the previous story's review must be considered during the implementation of this component:
-   **[High] Implement Auto-Save on Blur (AC3, AC4):** The parent form's `handleBlur` will trigger auto-save logic. This component must support the visual feedback for this.
-   **[High] Integrate StatefulTextbox Component (AC1, AC4):** This story is the implementation of this action item.
-   **[High] Update E2E Tests for StatefulTextbox Visuals (AC1, AC4):** The Storybook stories and unit tests created here should serve as a reference for the E2E tests that will be updated in Story 2.4.

-   **Styling:** Utilize Tailwind CSS and the color palette from the design system ("The Innovator" theme). The yellow for "unsaved" and green for "saved" should align with the project's color variables.
-   **Integration:** This component is designed to be controlled by a parent form, specifically using `React Hook Form`. The state (`isDirty`, etc.) will be passed down as props from the form.

### Project Structure Notes

-   The new component should be placed in `frontend/components/ui/` to align with the Shadcn/UI structure for reusable UI primitives.

### References

-   [Source: `docs/architecture.md#project-structure`]
-   [Source: `docs/epics.md#new-story-2.5-implement-stateful-textbox-component`]
-   [Source: `docs/ux-design-specification.md#6.1.2-custom-components`]
-   [Source: `docs/sprint-artifacts/2-4-update-user-profile-cv-with-hybrid-save.md#senior-developer-review-ai`]

## Dev Agent Record

### Context Reference
- [Context: docs/sprint-artifacts/2-5-implement-stateful-textbox-component.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
- `frontend/components/ui/StatefulTextbox.tsx`
- `frontend/components/ui/textarea.tsx`
- `frontend/components/ui/StatefulTextbox.stories.tsx`

## Change Log
| Date | Version | Changes | Author |
|---|---|---|---|
| tirsdag 9. desember 2025 | 1.0 | Initial draft creation | BIP |
