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
    let items = await this.sideNav.locator('.side-nav-item').allTextContents();
    return items.map((item) => item.trim());
  }

  async getUsername() {
    let usernameArray = await this.header.locator('.primary-text').allTextContents();
    return usernameArray[0];
  }

  async getDashboardRows(): Array<Locator> {
    return await this.dashboard.locator('app-carousel-reel').all();
  }

  async getDashboardRowTitles(dashboardRows: Array<Locator>) {
    let dashboardRowTitles = await Promise.all(dashboardRows.map(async (row) =>
      await row.locator('.section-title').allTextContents()));
    return dashboardRowTitles.map((arr) => arr[0]);
  }
}
