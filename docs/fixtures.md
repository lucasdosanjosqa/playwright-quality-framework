# Custom Playwright Fixtures

## Purpose

The framework exposes a single Playwright extension point from `fixtures/test.ts`. End-to-end tests import `test` and `expect` from this module instead of importing them directly from `@playwright/test`.

```ts
import { expect, test } from '../../fixtures/test';
```

This keeps framework-owned dependencies explicit and gives future fixtures one composition root without creating multiple inheritance layers.

## Current fixture

`environmentConfig` provides the validated, immutable configuration created during startup:

```ts
test('uses configuration', async ({ environmentConfig, page }) => {
  await page.goto(environmentConfig.appBaseURL);
});
```

The fixture has worker scope because the configuration is immutable and shared by every test executed in the worker. It is declared as a value fixture because it requires no setup or teardown lifecycle.

## Boundaries

- Native fixtures such as `page`, `context`, and `request` remain unchanged.
- Configuration resolver tests continue to use the native Playwright test export because they test configuration in isolation.
- Authentication, page models, and API clients will receive their own fixtures only when their milestones establish concrete consumers and lifecycle requirements.
- Tests must not mutate `environmentConfig` or read `process.env` directly.
