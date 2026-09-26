import { expect, test } from '../../fixtures/test';

test('loads a page with the selected environment configuration', async ({
  environmentConfig,
  page,
}) => {
  await page.setContent(`
    <main>
      <h1>Quality framework is ready for ${environmentConfig.environment}</h1>
    </main>
  `);

  await expect(
    page.getByRole('heading', {
      name: `Quality framework is ready for ${environmentConfig.environment}`,
    }),
  ).toBeVisible();
});
