import { z } from 'zod';

import { supportedEnvironments } from './environments';

const booleanString = z
  .preprocess(
    (value) => (typeof value === 'string' ? value.trim().toLowerCase() : value),
    z.enum(['true', 'false']).default('false'),
  )
  .transform((value) => value === 'true');

export const environmentSelectionSchema = z.object({
  TEST_ENV: z.enum(supportedEnvironments).default('local'),
});

export const resolvedEnvironmentSchema = z
  .object({
    TEST_ENV: z.enum(supportedEnvironments),
    APP_BASE_URL: z.url(),
    API_BASE_URL: z.url(),
    CI: booleanString,
    TEST_USERNAME: z.string().trim().min(1).optional(),
    TEST_PASSWORD: z.string().trim().min(1).optional(),
  })
  .superRefine((values, context) => {
    const hasUsername = values.TEST_USERNAME !== undefined;
    const hasPassword = values.TEST_PASSWORD !== undefined;

    if (hasUsername !== hasPassword) {
      context.addIssue({
        code: 'custom',
        message: 'TEST_USERNAME and TEST_PASSWORD must be provided together.',
        path: ['TEST_USERNAME'],
      });
    }
  });
