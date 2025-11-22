import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly sideNav: Locator;
  readonly dashboard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('app-nav-header');
    this.sideNav = this.page.locator('#cdk-drop-list-0');
    this.dashboard = this.page.locator('.companion-bar-content');
  }

  async getSideNavItems() {
    return this.sideNav.locator('.side-nav-item a').allTextContents();
  }

  async getUserName() {
    return this.header.locator('.primary-text').allTextContents();
  }

  async getDashboardRows(): Array<Locator> {
    return this.dashboard.locator('app-carousel-reel').all();
  }

  async getDashboardRowTitles(dashboardRow: Locator) {
    return dashboardRow.locator('.card-title-container').allTextContents()
  }
}
