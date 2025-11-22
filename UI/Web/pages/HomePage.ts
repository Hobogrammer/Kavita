import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly sideNav: Locator;
  readonly dashboard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('app-nav-header');
    this.sideNav = this.page.locator('.cdk-drop-list-0');
    this.dashboard = this.page.locator('.companion-bar-content');
  }

  async getSideNavItems() {

  }
}
