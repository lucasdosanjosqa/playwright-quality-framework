import dotenv from 'dotenv';

import { environmentDefaults, type TestEnvironment } from './environments';
import { environmentSelectionSchema, resolvedEnvironmentSchema } from './schema';

export interface EnvironmentConfig {
  environment: TestEnvironment;
  appBaseURL: string;
  apiBaseURL: string;
  isCI: boolean;
}

export function resolveEnvironment(input: NodeJS.ProcessEnv): Readonly<EnvironmentConfig> {
  const { TEST_ENV } = environmentSelectionSchema.parse(input);
  const defaults = environmentDefaults[TEST_ENV];

  const values = resolvedEnvironmentSchema.parse({
    TEST_ENV,
    APP_BASE_URL: input.APP_BASE_URL ?? defaults.appBaseURL,
    API_BASE_URL: input.API_BASE_URL ?? defaults.apiBaseURL,
    CI: input.CI,
    TEST_USERNAME: input.TEST_USERNAME,
    TEST_PASSWORD: input.TEST_PASSWORD,
  });

  return Object.freeze({
    environment: values.TEST_ENV,
    appBaseURL: values.APP_BASE_URL,
    apiBaseURL: values.API_BASE_URL,
    isCI: values.CI,
  });
}

dotenv.config({ quiet: true });

export const config = resolveEnvironment(process.env);
