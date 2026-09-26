export const supportedEnvironments = ['local', 'development', 'staging'] as const;

export type TestEnvironment = (typeof supportedEnvironments)[number];

interface EnvironmentDefaults {
  appBaseURL?: string;
  apiBaseURL?: string;
}

export const environmentDefaults: Readonly<Record<TestEnvironment, EnvironmentDefaults>> = {
  local: {
    appBaseURL: 'http://127.0.0.1:3000',
    apiBaseURL: 'http://127.0.0.1:3000/api',
  },
  development: {},
  staging: {},
};
