import { test, expect } from "@playwright/test";

test.describe("User Registration", () => {
  test("should expand the form for registration", async ({ page }) => {
    await page.goto("/");

    // Initially, the confirm password input should not be visible
    await expect(page.getByTestId("confirm-password-input")).toBeHidden();

    // Click the sign up link
    await page.getByTestId("signup-link").click();

    // Now, the confirm password input should be visible
    await expect(page.getByTestId("confirm-password-input")).toBeVisible();
  });

  test("should create an account and redirect to cv-creation", async ({ page }) => {
    await page.goto("/");

    // Go to the sign up view
    await page.getByTestId("signup-link").click();

    // Mock the API response
    await page.route("/api/v1/auth/register", async (route) => {
      const json = {
        data: {
          user_id: "some-fake-uuid",
          email: "student@example.com",
        },
      };
      await route.fulfill({ json, status: 201 });
    });

    // Fill out the form
    const email = `testuser-${Date.now()}@example.com`;
    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill("password123");
    await page.getByTestId("confirm-password-input").fill("password123");

    // Submit the form
    await page.getByTestId("registration-submit-button").click();

    // Expect to be redirected to the CV creation page
    await expect(page).toHaveURL("/cv-creation");
    await expect(page.getByText("CV Creation Page")).toBeVisible();
  });
});