# End-to-End Test Suite for CVAI Turbo

This directory contains the Playwright end-to-end test suite for the CVAI Turbo application. These tests simulate user interactions to ensure the application functions correctly from an end-user perspective.

## 🚀 Setup Instructions

1.  **Node.js Version:** Ensure you are using the Node.js version specified in the `.nvmrc` file (currently `20.11.0`). If you use `nvm` or `nvs`, you can run `nvm use` or `nvs use` in the project root.
2.  **Install Dependencies:** From the project root, install Playwright and other development dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```
    Playwright will automatically install the necessary browser binaries during installation.
3.  **Environment Configuration:**
    *   Copy the `.env.example` file to `.env` in the project root:
        ```bash
        cp .env.example .env
        ```
    *   Edit the newly created `.env` file and update the `BASE_URL`, `API_URL`, and any authentication credentials or API keys as needed for your test environment.
        *   `BASE_URL`: The URL of your running frontend application (e.g., `http://localhost:3000`).
        *   `API_URL`: The URL of your running backend API (e.g., `http://localhost:3001/api`).

## ▶️ Running Tests

All tests are configured via `playwright.config.ts` in the project root.

*   **Run all tests in headless mode (default):**
    ```bash
    npm run test:e2e
    # or
    pnpm test:e2e
    ```
*   **Run tests with UI mode (for debugging):**
    ```bash
    npx playwright test --ui
    ```
    This will open the Playwright UI Test Runner, allowing you to watch tests execute, inspect elements, and debug.
*   **Run tests in headed browser (browser UI visible):**
    ```bash
    npx playwright test --headed
    ```
*   **Run a specific test file:**
    ```bash
    npx playwright test tests/e2e/example.spec.ts
    ```
*   **Generate an HTML report after a run:**
    ```bash
    npx playwright show-report
    ```
    The report will be generated in `test-results/html` and automatically opened in your browser.

## 🏛️ Architecture Overview

This test suite follows best practices for maintainable and scalable end-to-end tests.

*   **Test Files (`tests/e2e/**/*.spec.ts`):** Contains the actual test scenarios, organized by feature or user flow.
*   **Support Utilities (`tests/support/`):
    *   **`fixtures/`:** Houses custom Playwright fixtures, which extend the base `test` object. This is where you can inject reusable setup/teardown logic, such as data factory instantiation or authentication states.
        *   `index.ts`: Defines custom test fixtures and extends Playwright's `test` object.
        *   `factories/`: Contains data factories (e.g., `user-factory.ts`) for generating realistic test data and managing test data lifecycle (e.g., auto-cleanup).
    *   **`helpers/`:** Contains shared utility functions that assist in tests but are not directly part of a page object or fixture (e.g., login helper, date formatters).
    *   **`page-objects/`:** (Optional, but recommended for complex applications) Contains Page Object Models (POMs) for abstracting page interactions. This makes tests more readable and resilient to UI changes.
*   **`playwright.config.ts`:** Global configuration for Playwright, including browser settings, timeouts, reporters, and base URL.

## ✅ Best Practices

*   **Selector Strategy:** Prioritize using `data-testid` attributes for selecting UI elements. This makes tests more robust to cosmetic UI changes. Avoid brittle CSS selectors or XPath where possible.
    ```typescript
    // Good: resilient to UI changes
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    // Bad: easily broken by minor CSS changes
    // await page.fill('.login-form input.email', 'test@example.com');
    ```
*   **Test Isolation & Cleanup:** Ensure each test is independent and cleans up any data or state it creates. Our fixture architecture (`userFactory.cleanup()`) helps with this.
*   **Explicit Assertions:** Make assertions clear and specific, focusing on observable user outcomes.
*   **Meaningful Test Titles:** Write descriptive `test.describe` and `test` blocks that clearly explain what the test is verifying.
*   **Failure Artifacts:** Screenshots and video recordings are configured to be `only-on-failure` or `retain-on-failure` respectively, minimizing storage while maximizing debugging information.

## 🤝 CI Integration

This test suite is designed to run efficiently in Continuous Integration (CI) environments.

*   **`fullyParallel: true`:** Enables parallel test execution for faster CI runs.
*   **`retries: process.env.CI ? 2 : 0`:** Automatically retries flaky tests in CI to improve reliability.
*   **`workers: process.env.CI ? 1 : undefined`:** Controls the number of parallel workers in CI, typically set to `1` per CI job to manage resources.
*   **Reporters:** Configured to generate `html` and `junit` reports, which can be easily integrated with CI dashboards and tools.
*   **`BASE_URL`:** Configured to respect `process.env.BASE_URL`, allowing CI pipelines to specify the URL of the deployed application under test.

## 📚 Knowledge Base References Applied

This setup incorporates insights from the following testing best practices:

*   **Fixture Architecture Pattern:** Utilizing pure functions and `mergeTests` composition for reusable test setup and teardown, including auto-cleanup mechanisms.
*   **Data Factories:** Implementing `faker`-based factories with overrides and auto-cleanup for efficient and realistic test data generation.
*   **Network-First Testing Safeguards:** (Implicitly encouraged by Playwright's network interception capabilities, though not explicitly configured here, it's a recommended next step for advanced use cases).
*   **Playwright Configuration Best Practices:** Adopting standard timeouts, artifact output, parallelization, and project configuration.
*   **Test Quality Principles:** Emphasizing deterministic, isolated tests with explicit assertions and clear reporting.

---

_Generated by Murat (Master Test Architect) on 2025-12-02_
