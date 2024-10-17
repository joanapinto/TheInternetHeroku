import { test as base } from '@playwright/test';

import { Homepage } from '../page-objects/homepage';

export { expect } from '@playwright/test';

// Declare the types of your fixtures.
interface MyFixtures {
    homepage: Homepage;
}

// Extend base test by providing the necessary page objects.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const test = base.extend<MyFixtures>({
    homepage: async ({ page }, use) => {
    // Set up the fixture.
    const homepage = new Homepage(page);

    // Use the fixture value in the test.
    await use(homepage);
  }
});

export { test };
