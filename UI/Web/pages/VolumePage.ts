import {Page, Locator} from "@playwright/test";

export class VolumePage {
  readonly page: Page;
  readonly seriesTitle: Locator;
  readonly subTitle: Locator;
  readonly summary: Locator;
  readonly relatedTab: Locator;
  readonly editButton: Locator;
  readonly detailsTab: Locator;
  readonly booksTab: Locator;
  readonly reviewTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.seriesTitle = this.page.locator('.title span');
    this.reviewTab = this.page.getByRole('tab', { name: 'Reviews'});
    this.detailsTab = this.page.getByRole('tab', { name: 'Details'});
    this.booksTab = this.page.getByRole('tab', { name: 'Books'});
  }
}
