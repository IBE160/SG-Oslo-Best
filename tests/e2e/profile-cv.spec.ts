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

    // Verification step is now included in the helper
    await expect(page.getByText('Registration successful! Please check your email to verify your account and then log in.')).toBeVisible();
    await expect(page.getByTestId('login-submit-button')).toBeVisible(); // Login form should be visible

    return { email, password };
}

// Helper function to log in an existing user
async function loginUser(page, email, password) {
    await page.goto("/"); // Ensure we are on the main auth page
    // Ensure login view is active
    if (!await page.getByRole('heading', { name: 'Login' }).isVisible()) {
        await page.getByTestId('login-link').click(); // Switch to login form if not already
    }

    await page.getByTestId('email-input').fill(email);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-submit-button').click();

    // Expect redirection to dashboard or /cv-creation if first time
}

// Helper function to create initial profile and CV
async function createProfileAndCv(page) {
    await expect(page).toHaveURL(/.*cv-creation/);
    await expect(page.getByRole('heading', { name: 'Create Your Profile and CV' })).toBeVisible();

    const fullName = faker.person.fullName();
    const dateOfBirth = '2000-01-01';
    const gender = 'female';
    const phoneNumber = faker.phone.number('##########');
    const address = faker.location.streetAddress(true);
    const cvContent = faker.lorem.paragraphs(3);

    await page.getByTestId('fullName-input').fill(fullName);
    await page.getByTestId('dateOfBirth-input').fill(dateOfBirth);
    await page.getByTestId('gender-select').selectOption(gender);
    await page.getByTestId('phoneNumber-input').fill(phoneNumber);
    await page.getByTestId('address-input').fill(address);
    await page.getByTestId('cvContent-textarea').fill(cvContent);

    await page.getByTestId('submit-button').click();

    await expect(page).toHaveURL(/.*dashboard/); // Expect redirection to dashboard
    await expect(page.getByRole('heading', { name: 'Welcome to your Dashboard' })).toBeVisible();

    return { fullName, dateOfBirth, gender, phoneNumber, address, cvContent };
}


test.describe('Profile and CV Creation', () => {

    test('should allow a new user to create profile and CV, then redirect to dashboard', async ({ page }) => {
        const { email, password } = await registerUserOnly(page);
        await loginUser(page, email, password);
        await createProfileAndCv(page);
    });

    test('should display validation errors for mandatory fields during creation', async ({ page }) => {
        const { email, password } = await registerUserOnly(page);
        await loginUser(page, email, password);

        await expect(page).toHaveURL(/.*cv-creation/);
        await expect(page.getByRole('heading', { name: 'Create Your Profile and CV' })).toBeVisible();

        await page.getByTestId('submit-button').click(); // Attempt to submit without filling any fields

        await expect(page.getByText('Full Name is required')).toBeVisible();
        await expect(page.getByText('Date of Birth is required')).toBeVisible();
        await expect(page.getByText('Gender is required')).toBeVisible();
        await expect(page.getByText('Phone Number is required')).toBeVisible();
        await expect(page.getByText('Address is required')).toBeVisible();
        await expect(page.getByText('CV Content is required')).toBeVisible();

        await expect(page).toHaveURL(/.*cv-creation/); // Ensure no redirection occurred
    });
});

test.describe('Profile and CV Update', () => {
    test.beforeEach(async ({ page }) => {
        // Register and create profile for a new user before each update test
        const { email, password } = await registerUserOnly(page);
        await loginUser(page, email, password);
        await createProfileAndCv(page);
        // Navigate to the edit profile page
        // Assuming there's a link or direct URL to the profile editing page
        await page.goto('/dashboard/profile'); // Replace with actual profile edit URL
        await expect(page.getByRole('heading', { name: 'Edit Your Profile and CV' })).toBeVisible();
    });

    test('should show unsaved changes indicator and enable save button on modification', async ({ page }) => {
        await expect(page.getByTestId('submit-button')).toBeDisabled();
        await expect(page.getByText('Unsaved changes...')).not.toBeVisible();

        await page.getByTestId('fullName-input').fill(faker.person.fullName());
        
        await expect(page.getByTestId('submit-button')).toBeEnabled();
        await expect(page.getByText('Unsaved changes...')).toBeVisible();
    });

    test('should auto-save changes on blur', async ({ page }) => {
        const initialFullName = await page.getByTestId('fullName-input').inputValue();
        const newFullName = faker.person.fullName();
        await page.getByTestId('fullName-input').fill(newFullName);
        await expect(page.getByTestId('submit-button')).toBeEnabled();
        await expect(page.getByText('Unsaved changes...')).toBeVisible();

        // Trigger onBlur by clicking outside or tabbing out
        await page.getByRole('heading', { name: 'Edit Your Profile and CV' }).click(); // Click outside the input

        await expect(page.getByTestId('submit-button')).toBeDisabled();
        await expect(page.getByText('Unsaved changes...')).not.toBeVisible();

        // Verify data persisted by reloading the page and checking the value
        await page.reload();
        await expect(page.getByTestId('fullName-input')).toHaveValue(newFullName);
    });

    test('should manually save all pending changes', async ({ page }) => {
        const newFullName = faker.person.fullName();
        const newCvContent = faker.lorem.paragraphs(2);

        await page.getByTestId('fullName-input').fill(newFullName);
        await page.getByTestId('cvContent-textarea').fill(newCvContent);

        await expect(page.getByTestId('submit-button')).toBeEnabled();
        await expect(page.getByText('Unsaved changes...')).toBeVisible();

        await page.getByTestId('submit-button').click(); // Manual save

        await expect(page.getByTestId('submit-button')).toBeDisabled();
        await expect(page.getByText('Unsaved changes...')).not.toBeVisible();

        // Verify data persisted by reloading the page and checking values
        await page.reload();
        await expect(page.getByTestId('fullName-input')).toHaveValue(newFullName);
        await expect(page.getByTestId('cvContent-textarea')).toHaveValue(newCvContent);
    });

    test('should display validation errors for mandatory fields during update', async ({ page }) => {
        await page.getByTestId('fullName-input').fill(''); // Clear a required field
        await page.getByTestId('fullName-input').blur(); // Trigger validation on blur

        await expect(page.getByText('Full Name is required')).toBeVisible();
        await expect(page.getByTestId('submit-button')).toBeDisabled(); // Should remain disabled due to validation errors
        
        // Also test with manual save attempt
        await page.getByTestId('cvContent-textarea').fill('');
        await page.getByTestId('submit-button').click(); // Click save, but expect it to be disabled or show errors
        await expect(page.getByText('CV Content is required')).toBeVisible();
        await expect(page.getByTestId('submit-button')).toBeDisabled(); // Still disabled
    });

    test('should show confirmation modal when navigating away with unsaved changes', async ({ page }) => {
        await page.getByTestId('fullName-input').fill(faker.person.fullName());
        await expect(page.getByText('Unsaved changes...')).toBeVisible();

        // Attempt to navigate away
        await page.goto('/dashboard'); // Assuming /dashboard is a different page

        await expect(page.getByRole('dialog', { name: 'You have unsaved changes' })).toBeVisible();
        await expect(page.getByText('Are you sure you want to leave this page? Your changes will be lost unless you save them.')).toBeVisible();

        // Test "Cancel" button - should stay on page
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page).toHaveURL(/.*dashboard\/profile/); // Should still be on profile edit page
        await expect(page.getByRole('dialog', { name: 'You have unsaved changes' })).not.toBeVisible();

        // Attempt to navigate away again and select "Discard Changes"
        await page.goto('/dashboard');
        await expect(page.getByRole('dialog', { name: 'You have unsaved changes' })).toBeVisible();
        await page.getByRole('button', { name: 'Discard Changes' }).click();
        await expect(page).toHaveURL(/.*dashboard/); // Should navigate to dashboard
        await expect(page.getByText('Unsaved changes...')).not.toBeVisible(); // Should no longer have unsaved changes

        // Re-navigate to profile, make changes, attempt to navigate and "Save & Leave"
        await page.goto('/dashboard/profile');
        await expect(page.getByRole('heading', { name: 'Edit Your Profile and CV' })).toBeVisible();
        const newFullName = faker.person.fullName();
        await page.getByTestId('fullName-input').fill(newFullName);
        await page.goto('/dashboard');
        await expect(page.getByRole('dialog', { name: 'You have unsaved changes' })).toBeVisible();
        await page.getByRole('button', { name: 'Save & Leave' }).click();
        
        // Need to wait for mutation to complete and redirection
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.getByText('Unsaved changes...')).not.toBeVisible();
        
        // Verify saved changes
        await page.goto('/dashboard/profile');
        await expect(page.getByTestId('fullName-input')).toHaveValue(newFullName);
    });
});
