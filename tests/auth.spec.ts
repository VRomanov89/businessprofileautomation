import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display signin page', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check if signin page elements are visible
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page.locator('text=BPA')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
  });

  test('should redirect to signin when accessing dashboard without auth', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to signin page
    await expect(page).toHaveURL(/.*auth\/signin/);
  });

  test('should have back to home link on signin page', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check if back to home link works
    await expect(page.locator('a:has-text("← Back to Home")')).toBeVisible();
    
    await page.click('a:has-text("← Back to Home")');
    await expect(page).toHaveURL('/');
  });

  test('should display security information', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check if security info is displayed
    await expect(page.locator('text=Secure Authentication')).toBeVisible();
    await expect(page.locator('text=Terms of Service')).toBeVisible();
    await expect(page.locator('text=Privacy Policy')).toBeVisible();
  });
});