# Playwright Quality Framework

A production-oriented Quality Engineering portfolio project built with Playwright and TypeScript. The repository demonstrates maintainable test design and engineering discipline rather than collecting framework features without a proven use case.

The current foundation provides strict TypeScript, Playwright, linting, formatting, validated multi-environment configuration, and deterministic setup tests.

## Prerequisites

- Node.js 20 or later
- npm 10 or later

## Local setup

```bash
npm install
npx playwright install chromium
cp .env.example .env
npm run test:smoke
```

On Windows PowerShell, replace the copy command with:

```powershell
Copy-Item .env.example .env
```

`TEST_ENV` defaults to `local`, which supplies safe localhost URLs. The current smoke test is self-contained and does not require an application server.

## Commands

| Command                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `npm run lint`         | Check TypeScript and configuration files with ESLint |
| `npm run format`       | Format supported project files with Prettier         |
| `npm run format:check` | Verify formatting without changing files             |
| `npm run typecheck`    | Validate TypeScript without emitting build output    |
| `npm test`             | Run all Playwright tests                             |
| `npm run test:e2e`     | Run browser tests                                    |
| `npm run test:api`     | Run API tests when that suite is introduced          |
| `npm run test:smoke`   | Run the foundation smoke test                        |
| `npm run test:headed`  | Run browser tests in headed mode                     |
| `npm run test:debug`   | Run browser tests with Playwright Inspector          |
| `npm run test:report`  | Open the latest HTML report                          |

## Project structure

```text
api/          API clients (introduced only when needed)
config/       Runtime environment configuration
data/         Test data
docs/         Architecture and engineering documentation
fixtures/     Shared Playwright fixtures
pages/        Page and component models (introduced only when needed)
tests/api/    API tests
tests/e2e/    Browser end-to-end tests
utils/        Reusable test utilities
```

Empty architectural boundaries are tracked intentionally, but contain no speculative implementations. New abstractions should be added only after a concrete test use case demonstrates the need.

## Environment configuration

Supported environments are `local`, `development`, and `staging`. Select one with `TEST_ENV`:

```bash
TEST_ENV=development APP_BASE_URL=https://app.example.test API_BASE_URL=https://api.example.test npm test
```

PowerShell equivalent:

```powershell
$env:TEST_ENV = 'development'
$env:APP_BASE_URL = 'https://app.example.test'
$env:API_BASE_URL = 'https://api.example.test'
npm test
```

Local has safe URL defaults. Development and staging require both `APP_BASE_URL` and `API_BASE_URL`; missing or invalid values stop execution before tests run. Values already supplied by the shell or CI take precedence over `.env`.

Store local secrets only in the ignored `.env` file. CI will eventually inject secrets from its encrypted secret store; no CI pipeline is part of the current scope. See [Configuration and Environment Strategy](docs/configuration.md) for the complete contract and precedence rules.

## Current scope

The repository does not yet include page objects, custom fixtures, API clients, accessibility or visual testing, Docker, or CI/CD. Those capabilities belong in later milestones when their design can be driven by real scenarios.
