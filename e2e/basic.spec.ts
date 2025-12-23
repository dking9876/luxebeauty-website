import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LuxeBeauty|Beauty/);
});

test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/);
});

test('book now functionality', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Book Now' }).first().click();
    await expect(page).toHaveURL(/.*book-online/);
});
