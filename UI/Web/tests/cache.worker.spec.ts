import {test, expect} from '@playwright/test';

// Pre-setup required
// 1. Create or seed accounts
// 2. Login
// 3. Create or seed content
test('should be created', async ({page}) => {
  await page.goto('/login' );

  await expect(page.getByLabel('Username')).toBeVisible();
  await page.getByPlaceholder("Username").fill('admin');
  await page.getByPlaceholder("Password").fill('adminadmin');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/home');

  expect(page.workers().length).toBe(1);
});
