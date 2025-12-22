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
    this.seriesTitle = this.page.locator('.title');
    this.summary = this.page.locator('app-read-more');
    this.subTitle = this.page.locator('.subtitle span');
    this.reviewTab = this.page.getByRole('tab', { name: 'Reviews'});
    this.detailsTab = this.page.getByRole('tab', { name: 'Details'});
    this.booksTab = this.page.getByRole('tab', { name: 'Books'});
  }

  async goToDetailsTab() {
    await this.detailsTab.click();
  }

  async getDetailsTabWriters() {
    return this.page.locator('app-person-badge').all();
  }

  async getBooks() {
    return this.page.locator('div.card.card-item-container').all();
  }

  async getWriters() {
    const metadata = await this.page.locator('app-badge-extender');
    return await metadata.allTextContents();
  }

  async getTitle() {
    const title = await this.seriesTitle.textContent();
    return title.trim();
  }

  async getSubTitle() {
    const subTitle = await this.subTitle.textContent();
    return subTitle.trim();
  }
}
