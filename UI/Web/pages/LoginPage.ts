import { Page } from "@playwright/test";
import { SiteTheme } from "src/app/_models/preferences/site-theme";
import { environment } from "src/environments/environment";
import { setRoute } from "utils/playwright-utils";
import * as localeResponse from "tests/data/locale.json"

export class LoginPage {
  private siteTheme: SiteTheme = {
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

  constructor(private page: Page, private isAdminExist: boolean = true) {
    // Set routes required to load login page
    setRoute(this.page, environment.apiUrl + 'admin/exists', isAdminExist);
    setRoute(this.page, environment.apiUrl + 'theme', [this.siteTheme]);
    setRoute(this.page, environment.apiUrl + 'locale', localeResponse);
  }

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
