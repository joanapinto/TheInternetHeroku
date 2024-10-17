import {
  test,
  expect
} from '../fixtures/page-setup';

test.beforeEach(async ({
  page
}) => {
  await page.goto('/');
  console.log('Successfully got into ' + page.url())
});

test('Check title and homepage copy', async ({
  page,
  homepage
}) => {
  await expect(page).toHaveTitle(/The Internet/);
  await expect(homepage.heading).toBeVisible();
  await expect(homepage.availableExamplesHeading).toBeVisible();
  console.log('Webpage title and copy are shown correctly')
});

test('Check, save all available examples and verify redirection', async ({
  page,
  homepage
}) => {
  const availableExamples = [];

  for (const row of await homepage.list.all()) {
    const availableExample = await row.textContent();
    availableExamples.push(availableExample);
  }
  // Log the array to ensure it's correctly populated
  console.log('Available Examples:', availableExamples);

  // Check if availableExamples is an array
  if (Array.isArray(availableExamples)) {
    // Count the number of available examples
    const countOfExamples = availableExamples.length;

    // Log the count
    console.log(`Number of available examples: ${countOfExamples}`);

    // Select a random index
    const randomIndex = Math.floor(Math.random() * countOfExamples);

    // Log the selected random index and example name
    const randomExample = availableExamples[randomIndex];
    console.log(`Selected Example: ${randomExample}`);

    // Locate the <li> element based on the random example text
    const listItem = await page.getByText(randomExample);

    // Find the href of the anchor (<a>) element inside the <li>
    const href = await listItem.getAttribute('href');

    // Use the example text to find and click the corresponding element
    await page.getByText(randomExample).click();

    // Ensure href is valid (relative or absolute)
    if (href) {
      // Click the item
      await listItem.click();

      // Wait for the navigation
      await page.waitForLoadState('domcontentloaded');

      // Get the current page URL
      const currentURL = page.url();
      console.log(`Current URL after click: ${currentURL}`);

      // Check that the current URL matches the expected href
      if (currentURL.includes(href)) {
        console.log(`Redirection successful! Navigated to: ${currentURL}`);
      } else {
        console.error(`Redirection failed! Expected to go to: ${href} but went to: ${currentURL}`);
      }
    } else {
      console.error('No href attribute found for the selected example');
    }
  } else {
    console.error('availableExamples is not an array');
  }
});