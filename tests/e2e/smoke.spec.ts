import { expect, test } from '@playwright/test';

test('loads a page and exposes accessible content', async ({ page }) => {
  await page.setContent(`
    <main>
      <h1>Quality framework is ready</h1>
    </main>
  `);

  await expect(page.getByRole('heading', { name: 'Quality framework is ready' })).toBeVisible();
});
