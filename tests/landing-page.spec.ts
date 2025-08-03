import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the main heading and branding', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main heading is visible
    await expect(page.locator('h1')).toContainText('Never forget to post to Google again');
    
    // Check if BPA branding is visible
    await expect(page.locator('text=BPA')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check if navigation links are present
    await expect(page.locator('a[href="#features"]')).toBeVisible();
    await expect(page.locator('a[href="#pricing"]')).toBeVisible();
    await expect(page.locator('a[href="#contact"]')).toBeVisible();
    await expect(page.locator('a[href="/auth/signin"]')).toBeVisible();
  });

  test('should display the signup form', async ({ page }) => {
    await page.goto('/');
    
    // Check if signup form elements are visible
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="business name"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
    await expect(page.locator('button:has-text("Join the Waitlist")')).toBeVisible();
  });

  test('should show features section', async ({ page }) => {
    await page.goto('/');
    
    // Check if features are displayed
    await expect(page.locator('text=Why BPA?')).toBeVisible();
    await expect(page.locator('text=Quick Setup')).toBeVisible();
    await expect(page.locator('text=Smart Scheduling')).toBeVisible();
    await expect(page.locator('text=Multi-Location')).toBeVisible();
    await expect(page.locator('text=Save Time')).toBeVisible();
  });

  test('should validate signup form', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit empty form
    await page.click('button:has-text("Join the Waitlist")');
    
    // Should show validation errors
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(page.locator('text=Business name is required')).toBeVisible();
  });

  test('should fill and submit signup form', async ({ page }) => {
    await page.goto('/');
    
    // Fill the form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[placeholder*="business name"]', 'Test Business');
    await page.selectOption('select', 'Restaurant/Food Service');
    
    // Submit the form
    await page.click('button:has-text("Join the Waitlist")');
    
    // Should show success message (assuming the API works)
    await expect(page.locator('text=You\'re on the list!')).toBeVisible({ timeout: 10000 });
  });
});