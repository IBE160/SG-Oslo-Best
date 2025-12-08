// tests/e2e/profile-cv.spec.ts

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// Helper function to register a new user
async function registerUserOnly(page) {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.goto('/');
    await page.getByTestId('signup-link').click(); // Switch to registration form

    await page.getByTestId('email-input').fill(email);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('confirm-password-input').fill(password);
    await page.getByTestId('registration-submit-button').click();

    return { email, password };
}

// Helper function to log in an existing user
async function loginUser(page, email, password) {
    await expect(page).toHaveURL("/"); // Ensure we are on the main auth page
    // Ensure login view is active
    if (!await page.getByRole('heading', { name: 'Login' }).isVisible()) {
        await page.getByTestId('login-link').click(); // Switch to login form if not already
    }

    await page.getByTestId('email-input').fill(email);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-submit-button').click();

    // Expect redirection to dashboard or /cv-creation if first time
    // For this story, we expect redirection to /cv-creation if profile not created
}

test.describe('Profile and CV Creation', () => {

    test('should allow a new user to create profile and CV, then redirect to dashboard', async ({ page }) => {
        // Register a new user
        const { email, password } = await registerUserOnly(page);
        // Verify registration success UI
        await expect(page.getByText('Registration successful! Please check your email to verify your account and then log in.')).toBeVisible();
        await expect(page.getByTestId('login-submit-button')).toBeVisible(); // Login form should be visible

        // Log in the newly registered user
        await loginUser(page, email, password);

        // Expect redirection to /cv-creation page after first-time login
        await expect(page).toHaveURL(/.*cv-creation/);
        await expect(page.getByRole('heading', { name: 'Create Your Profile and CV' })).toBeVisible();

        // Fill in personal details
        await page.getByTestId('fullName-input').fill(faker.person.fullName());
        await page.getByTestId('dateOfBirth-input').fill('2000-01-01');
        await page.getByTestId('gender-select').selectOption('female');
        await page.getByTestId('phoneNumber-input').fill(faker.phone.number('##########'));
        await page.getByTestId('address-input').fill(faker.location.streetAddress(true));

        // Fill in CV content
        await page.getByTestId('cvContent-textarea').fill(faker.lorem.paragraphs(3));

        // Submit the form
        await page.getByTestId('submit-button').click();

        // Expect redirection to dashboard
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.getByRole('heading', { name: 'Welcome to your Dashboard' })).toBeVisible();
    });

    test('should display validation errors for mandatory fields', async ({ page }) => {
        // Register a new user
        const { email, password } = await registerUserOnly(page);
        // Verify registration success UI
        await expect(page.getByText('Registration successful! Please check your email to verify your account and then log in.')).toBeVisible();
        await expect(page.getByTestId('login-submit-button')).toBeVisible(); // Login form should be visible

        // Log in the newly registered user
        await loginUser(page, email, password);

        // Expect redirection to /cv-creation page after first-time login
        await expect(page).toHaveURL(/.*cv-creation/);
        await expect(page.getByRole('heading', { name: 'Create Your Profile and CV' })).toBeVisible();

        // Attempt to submit without filling any fields
        await page.getByTestId('submit-button').click();

        // Expect to see validation errors for all required fields
        await expect(page.getByText('Full Name is required')).toBeVisible();
        await expect(page.getByText('Date of Birth is required')).toBeVisible();
        await expect(page.getByText('Gender is required')).toBeVisible();
        await expect(page.getByText('Phone Number is required')).toBeVisible();
        await expect(page.getByText('Address is required')).toBeVisible();
        await expect(page.getByText('CV Content is required')).toBeVisible();

        // Ensure no redirection occurred, still on /cv-creation
        await expect(page).toHaveURL(/.*cv-creation/); 
    });
});
