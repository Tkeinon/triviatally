import { test, expect } from '@playwright/test';

test('should allow a user to sign up and then redirect to login', async ({ page }) => {
  page.on('console', msg => console.log(msg.type(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText));

  // Navigate to the registration page
  await page.goto('/auth/register');

  // Fill out the registration form
  await page.fill('input[id="name"]', 'Test User');
  const uniqueEmail = `testuser-${Date.now()}@example.com`;
  await page.fill('input[id="email"]', uniqueEmail);
  await page.fill('input[id="password"]', 'password1234');

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for navigation and assert the new URL
  await page.waitForURL('/auth/login');
  await expect(page).toHaveURL('/auth/login');
});
