import { expect, test as base } from '@playwright/test';

import { config, type EnvironmentConfig } from '../config/environment';

interface FrameworkWorkerFixtures {
  environmentConfig: Readonly<EnvironmentConfig>;
}

export const test = base.extend<object, FrameworkWorkerFixtures>({
  environmentConfig: [config, { scope: 'worker' }],
});

export { expect };
