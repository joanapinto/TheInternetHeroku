import {
  type Locator,
  type Page
} from "@playwright/test";
export class Homepage {
  page: Page;
  readonly heading: Locator;
  readonly availableExamplesHeading: Locator;
  readonly list: Locator;
  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator(".heading");
    this.availableExamplesHeading = page.getByRole('heading', {
      name: 'Available Examples'
    })
    this.list = page.getByRole('listitem');
  }
}