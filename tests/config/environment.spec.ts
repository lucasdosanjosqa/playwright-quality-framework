import { expect, test } from '@playwright/test';

import { resolveEnvironment } from '../../config/environment';

test.describe('environment configuration', () => {
  test('uses safe local defaults', () => {
    const configuration = resolveEnvironment({});

    expect(configuration).toEqual({
      environment: 'local',
      appBaseURL: 'http://127.0.0.1:3000',
      apiBaseURL: 'http://127.0.0.1:3000/api',
      isCI: false,
    });
    expect(Object.isFrozen(configuration)).toBe(true);
  });

  test('allows environment variables to override local defaults', () => {
    const configuration = resolveEnvironment({
      TEST_ENV: 'local',
      APP_BASE_URL: 'https://local-app.example.test',
      API_BASE_URL: 'https://local-api.example.test',
    });

    expect(configuration.appBaseURL).toBe('https://local-app.example.test');
    expect(configuration.apiBaseURL).toBe('https://local-api.example.test');
  });

  for (const environment of ['development', 'staging'] as const) {
    test(`resolves an explicitly configured ${environment} environment`, () => {
      const configuration = resolveEnvironment({
        TEST_ENV: environment,
        APP_BASE_URL: `https://${environment}-app.example.test`,
        API_BASE_URL: `https://${environment}-api.example.test`,
      });

      expect(configuration.environment).toBe(environment);
    });

    test(`fails fast when ${environment} URLs are missing`, () => {
      expect(() => resolveEnvironment({ TEST_ENV: environment })).toThrow();
    });
  }

  test('rejects an unsupported environment', () => {
    expect(() => resolveEnvironment({ TEST_ENV: 'production' })).toThrow();
  });

  for (const key of ['APP_BASE_URL', 'API_BASE_URL'] as const) {
    test(`rejects an invalid ${key}`, () => {
      expect(() =>
        resolveEnvironment({
          APP_BASE_URL: 'https://app.example.test',
          API_BASE_URL: 'https://api.example.test',
          [key]: 'not-a-url',
        }),
      ).toThrow();
    });
  }

  for (const [value, expected] of [
    ['true', true],
    ['TRUE', true],
    ['false', false],
    ['FALSE', false],
  ] as const) {
    test(`parses CI=${value} as ${expected}`, () => {
      expect(resolveEnvironment({ CI: value }).isCI).toBe(expected);
    });
  }

  test('rejects an invalid CI value', () => {
    expect(() => resolveEnvironment({ CI: 'yes' })).toThrow();
  });

  test('validates credential variables without exposing them publicly', () => {
    const configuration = resolveEnvironment({
      TEST_USERNAME: 'portfolio-user',
      TEST_PASSWORD: 'local-secret',
    });

    expect(configuration).not.toHaveProperty('credentials');
    expect(configuration).not.toHaveProperty('TEST_USERNAME');
    expect(configuration).not.toHaveProperty('TEST_PASSWORD');
  });

  test('rejects an incomplete credential pair without exposing its value', () => {
    const secretValue = 'must-not-appear';

    expect(() => resolveEnvironment({ TEST_PASSWORD: secretValue })).toThrow(
      'TEST_USERNAME and TEST_PASSWORD must be provided together.',
    );

    try {
      resolveEnvironment({ TEST_PASSWORD: secretValue });
    } catch (error) {
      expect(String(error)).not.toContain(secretValue);
    }
  });
});
