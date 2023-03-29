import { test } from '@playwright/test';

test('Add and delete todo', async ({ page }) => {
  // test-data
  const title = 'Buy Groceries';
  const description = 'Go to the supermarket and buy all groceries for the week.';
  const priority = 'high';

  // Navigate to the homepage
  await page.goto('http://localhost:5173/');

  // CLick the "Add new" button
  await page.getByRole('button', { name: 'Add new' }).click();
  await page.getByRole('combobox').press('Tab');

  // Fill the title field with 'title'
  await page.getByPlaceholder('Name for this todo...').fill(title);
  await page.getByPlaceholder('Name for this todo...').press('Tab');

  // Fill the description field with 'description'
  await page.getByPlaceholder('Description for this todo...').fill(description);
  await page.getByPlaceholder('Description for this todo...').press('Tab');

  // Fill the combobox field with 'description'
  await page.getByRole('combobox').press('Enter');
  await page.getByRole('combobox').press('Enter');
  await page.getByRole('combobox').selectOption(priority);
  await page.getByRole('combobox').press('Tab');

  // CLick the "Add new" button
  await page.getByRole('button', { name: 'Add', exact: true }).press('Enter');

  // Make sure stuff is found
  await page.getByText(title).click();
  await page.getByText(description).click();
  await page.getByText(priority).click();

  // Delete todo
  await page.locator('#ticket-0 svg').nth(2).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#ticket-0 svg').nth(2).click();
});
