import {Page} from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    // Navigate to login page
    await this.page.goto('/login');
    await this.page.waitForLoadState();

    // Fill login form
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);

    // Click Sign in
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }
}
