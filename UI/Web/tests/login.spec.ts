import {test, expect} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {User} from "src/app/_models/user";
import {environment} from "src/environments/environment";
import {LoginRoutes, setLoginRoutes, setRoute} from "utils/playwright-utils";
import {UserBuilder} from "../utils/builders/user-builder";

test.describe('Login page', () => {
  let loginRoutes: LoginRoutes;

  test.beforeEach(() => {
    loginRoutes = {
      adminExists: true,
      oidc: {},
      odicAuthenticated: false
    };
  });

  test('redirects to account creation flow if there is no existing admin account', async ({page}) => {
    // Set routes required to load login page
    loginRoutes.adminExists = false;
    setLoginRoutes(page, loginRoutes);

    // Navigate to test page
    await page.goto('/login');
    await page.waitForLoadState();

    // Assert
    await expect(page).toHaveURL('registration/register');
  });

  test('redirects to `/home` if successful', async ({page}) => {
    const user: User = new UserBuilder()
      .setUsername("admin")
      .setEmail("admin@admin.com")
      .addRoles(
        [
          "Admin",
          "Change Password",
          "Change Restriction",
          "Login"
        ])
      .build();

    // Set route required to sucessfully login
    loginRoutes.user = user;
    setLoginRoutes(page, loginRoutes);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, "verySecurePassword;ThisIsJustATribute");
    await page.waitForLoadState();

    // Assert
    await expect(page).toHaveURL('/home');
  });

  test('displays toast error if login unsuccessful', async ({page}) => {
    // Set a failing login response
    await setLoginRoutes(page, loginRoutes);
    // Override 'account/login' route response to return an error
    await setRoute(page, environment.apiUrl + 'account/login', "Your credentials are not correct", {status: 401});

    // Attempt to login
    const loginPage = new LoginPage(page);
    await loginPage.login('aUserForSure', "CamelBatterySomethingSomething");

    // Assert error shown and user is still shown the login page
    // TODO: Move this locator portion to the LoginPage
    await expect(page.getByRole("alert", {name: "Your credentials are not correct"})).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
