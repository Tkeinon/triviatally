import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Create a user before each test
  await page.request.post('/api/auth/signup', {
    data: {
      email: 'testuser@example.com',
      name: 'Test User',
      password: 'password123',
    },
  });
});

test('should redirect to dashboard after login', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.locator('[data-testid="submit-button"]').click();
});
