import {Locator, Page } from "@playwright/test";

export class SeriesPage {
  readonly page: Page;
  readonly title: Locator;
  readonly summary: Locator;
  readonly reviewTab: Locator;
  readonly detailsTab: Locator;
  readonly booksTab: Locator;
  readonly relatedTab: Locator;
  readonly storylineTab: Locator;
  readonly editButton: Locator;

  constructor(page: Page){
    this.page = page;
    this.title = this.page.locator('.title span');
    this.summary = this.page.locator('app-read-more');
    this.reviewTab = this.page.getByRole('tab', { name: 'Reviews'});
    this.detailsTab = this.page.getByRole('tab', { name: 'Details'});
    this.booksTab = this.page.getByRole('tab', { name: 'Books'});
    this.relatedTab = this.page.getByRole('tab', { name: 'Related'});
    this.storylineTab = this.page.getByRole('tab', { name: 'Storyline'});
    this.editButton = this.page.locator('#edit-btn--komf');
  }

  async goToRelatedTab() {
    this.relatedTab.click();
  }

  async goToReviewsTab() {
    this.reviewTab.click();
  }

  async goToDetailsTab() {
    this.detailsTab.click();
  }

  async goToStorylineTab() {
    this.storylineTab.click();
  }

  async getBooks() {
    // all() gets all of the locators when called so we have to call for them after page load
    return this.page.locator('div.card.card-item-container').all();
  }
}
