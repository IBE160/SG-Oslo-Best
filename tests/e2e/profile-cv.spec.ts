import { test, expect, type Page, type Route } from '@playwright/test';
import { faker } from '@faker-js/faker';

// Hjelpefunksjon: Mocker innlogging
async function mockAuth(page: Page) {
    await page.route('**/api/v1/auth/login', async (route: Route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: { access_token: 'fake-jwt', refresh_token: 'fake-refresh' } })
        });
    });

    await page.route('**/api/v1/users/me', async (route: Route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: {
                    id: 'user-123',
                    email: 'test@example.com',
                    first_name: 'Test',
                    last_name: 'User',
                    profile_completed: true
                }
            })
        });
    });
}

// Hjelpefunksjon: Mocker eksisterende profil-data
async function mockExistingProfile(page: Page) {
    // Mock GET /profiles/me spesifikt
    await page.route('**/api/v1/profiles/me', async (route: Route) => {
         if (route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        full_name: 'Existing User',
                        date_of_birth: '1990-01-01',
                        gender: 'male',
                        phone_number: '1234567890',
                        address: 'Test Street 1',
                        cv_content: 'Old CV Content'
                    }
                })
            });
         } else {
             await route.continue();
         }
    });

    // Mock generic updates (PATCH/PUT)
    await page.route('**/api/v1/users/me/cv', async (route: Route) => {
        const method = route.request().method();
        if (method === 'PATCH' || method === 'PUT') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, data: {} })
            });
        } else {
            // Hvis GET treffer her ved en feil
             await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    full_name: 'Existing User',
                    date_of_birth: '1990-01-01'
                })
            });
        }
    });
}

test.describe('Profile and CV Update', () => {
    test.beforeEach(async ({ page }) => {
        await mockAuth(page);
        await mockExistingProfile(page); 
        // Gå direkte til edit-siden
        await page.goto('/cv-edit'); 
    });

    test('should show unsaved changes indicator and enable save button on modification', async ({ page }) => {
        // Vent på at data laster
        await expect(page.getByTestId('fullName-input')).toHaveValue('Existing User');

        // Sjekk at knapp er disabled først
        await expect(page.getByTestId('submit-button')).toBeDisabled();
        
        // Endre navn
        await page.getByTestId('fullName-input').fill('New Name');
        
        // Sjekk at knapp blir enabled og unsaved warning vises
        await expect(page.getByTestId('submit-button')).toBeEnabled();
        
        // Sjekk etter tekst for ulagrede endringer
        // Merk: Pass på at teksten 'Unsaved changes' faktisk finnes i frontend-koden din
        await expect(page.getByText(/Unsaved changes|You have unsaved changes/i)).toBeVisible(); 
    });

    test('should show visual feedback on fields during auto-save and manual save', async ({ page }) => {
        await expect(page.getByTestId('fullName-input')).toHaveValue('Existing User');

        // 1. Fyll inn et felt og sjekk for gul "dirty" border
        await page.getByTestId('fullName-input').fill('New Full Name');
        await expect(page.getByTestId('fullName-input')).toHaveCSS('border-color', 'rgb(250, 204, 21)'); // yellow-400

        // 2. Trigger blur for auto-save og sjekk for grønn "saved" border
        await page.getByTestId('fullName-input').blur();
        await expect(page.getByTestId('fullName-input')).toHaveCSS('border-color', 'rgb(74, 222, 128)'); // green-400

        // 3. Fyll inn et annet felt
        await page.getByTestId('address-input').fill('New Address');
        await expect(page.getByTestId('address-input')).toHaveCSS('border-color', 'rgb(250, 204, 21)');

        // 4. Klikk på hovedlagreknappen
        await page.getByTestId('submit-button').click();

        // 5. Sjekk at begge feltene nå har grønn "saved" border
        await expect(page.getByTestId('fullName-input')).toHaveCSS('border-color', 'rgb(74, 222, 128)');
        await expect(page.getByTestId('address-input')).toHaveCSS('border-color', 'rgb(74, 222, 128)');
    });
});
