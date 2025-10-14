import {test, expect} from '@playwright/test';
import {LoginPage} from "pages/LoginPage";
import {AgeRating} from "src/app/_models/metadata/age-rating";
import {AgeRestriction} from "src/app/_models/metadata/age-restriction";
import {PageLayoutMode} from "src/app/_models/page-layout-mode";
import {Preferences } from "src/app/_models/preferences/preferences";
import {SiteTheme} from "src/app/_models/preferences/site-theme";
import {User} from "src/app/_models/user";
import {environment} from "src/environments/environment";
import {setRoute} from "utils/playwright-utils";
import TestUserBuilder from "utils/test-user-builder"

test.describe('Login functionality', () => {
  test('redirects to account creation flow if there is no existing admin account', async ({page}) => {
    // Set routes required to load login page
    await setRoute(page, environment.apiUrl + 'admin/exists', false);

    // Navigate to test page
    await page.goto('/login');
    await page.waitForLoadState();

    // Assert
    await expect(page).toHaveURL('registration/register');
  });

  test('redirects to `/home` if successful', async ({page}) => {
  const siteTheme: SiteTheme = {
      id:1,
      name: "Dark",
      normalizedName: "dark",
      fileName: "dark.scss",
      isDefault: true,
      provider: 1,
      previewUrls: [""],
      description:"Default theme shipped with Kavita",
      author: "",
      compatibleVersion: null,
      selector: "bg-dark",
      filePath: "assets/css/dark.scss",
    } as SiteTheme;

    const prefs = {
      theme: siteTheme,
      globalPageLayoutMode: PageLayoutMode.List,
      blurUnreadSummaries: false,
      promptForDownloadSize: false,
      noTransitions: false,
      collapseSeriesRelationships: false,
      shareReviews: false,
      locale: "en",
      aniListScrobblingEnabled: false,
      wantToReadSync: false
    } as Preferences;

    const ageRestriction = {
      ageRating: AgeRating.NotApplicable,
      includeUnknowns: false,
    } as AgeRestriction;

    const user: User = new TestUserBuilder()
      .withUsername("admin")
      .withEmail("admin@admin.com")
      .withRoles(
        [
          "Admin",
          "Change Password",
          "Change Restriction",
          "Login"
        ])
      .withPreferences(prefs)
      .withAgeRestriction(ageRestriction)
      .build();

    // Set route required to sucessfully login
    await setRoute(page, environment.apiUrl + 'account/login', user);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, "verySecurePassword;ThisIsJustATribute");
    await page.waitForLoadState();

    // Assert
    await expect(page).toHaveURL('/home');
  });

  test('displays toast error if login unsuccessful', async ({page}) => {
    // Set a failing login response
    await setRoute(page, environment.apiUrl + 'account/login', "Your credentials are not correct", {status: 401});

    // Attempt to login
    const loginPage = new LoginPage(page);
    await loginPage.login('aUserForSure', "CamelBatterySomethingSomething");

    // Assert error shown and user is still shown the login page
    await expect(page.getByRole("alert", { name: "Your credentials are not correct"})).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
