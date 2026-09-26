# Configuration and Environment Strategy

## Supported environments

`TEST_ENV` selects one of three environments:

- `local` (default)
- `development`
- `staging`

Local execution has safe defaults for both application and API URLs. Development and staging require explicit URLs so the framework cannot silently target an invented or unintended endpoint.

## Variables

| Variable        | Required            | Purpose                                                        |
| --------------- | ------------------- | -------------------------------------------------------------- |
| `TEST_ENV`      | No                  | Selects the environment; defaults to `local`                   |
| `APP_BASE_URL`  | Development/staging | Application URL used by Playwright                             |
| `API_BASE_URL`  | Development/staging | Base URL reserved for API consumers                            |
| `CI`            | No                  | Accepts `true` or `false`; defaults to `false`                 |
| `TEST_USERNAME` | No                  | Optional credential input; must be paired with `TEST_PASSWORD` |
| `TEST_PASSWORD` | No                  | Optional secret input; must be paired with `TEST_USERNAME`     |

Credential variables are validated but deliberately not exposed by the public configuration object. Authentication architecture will define their final representation when a real consumer exists.

## Resolution and precedence

Configuration is resolved in this order, with later sources taking precedence:

1. shared code defaults;
2. safe defaults for the selected environment;
3. values loaded from the local `.env` file;
4. variables already present in the process, including values injected by CI.

`dotenv` does not override existing process variables. CI-provided values therefore take precedence over `.env` without requiring CI-specific configuration code.

The selected values are validated at startup. Invalid environments, URLs, booleans, incomplete credential pairs, and missing development or staging URLs stop execution before tests run.

## Local usage

Copy `.env.example` to `.env`. The following is enough for local execution:

```dotenv
TEST_ENV=local
```

To target another environment, provide both URLs explicitly:

```dotenv
TEST_ENV=staging
APP_BASE_URL=https://staging-app.example.test
API_BASE_URL=https://staging-api.example.test
```

The domains above are documentation examples only. Replace them with endpoints owned by the target system.

## Secret handling

- `.env` and environment-specific `.env.*` files are ignored by Git.
- `.env.example` contains no usable credentials.
- Secrets must never be printed from configuration or included in reports.
- Local credentials belong only in the developer's untracked `.env` file.
- A future CI pipeline will inject credentials from its encrypted secret store as process environment variables.

Do not store real credentials in source code, committed configuration, workflow files, or documentation.
