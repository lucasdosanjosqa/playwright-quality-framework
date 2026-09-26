# Foundation Architecture

## Context

The first milestone needs an executable Playwright and TypeScript foundation without committing the project to abstractions before real test scenarios exist.

## Decisions

- Browser and API tests are separated under `tests/e2e` and `tests/api` so each suite can be selected independently.
- Supporting code has explicit boundaries for fixtures, page models, API clients, test data, utilities, and runtime configuration.
- Empty boundaries are tracked without sample implementations. Page objects, clients, and shared fixtures will be introduced only when duplication or a concrete scenario justifies them.
- Runtime configuration is resolved and validated independently from Playwright configuration. Safe local defaults are versioned, while development and staging endpoints must be supplied explicitly.
- Local configuration is loaded from an ignored `.env` file. Existing process variables take precedence, allowing a future CI provider to inject configuration and secrets without CI-specific application code.
- End-to-end tests use one framework-owned Playwright extension point. The immutable environment configuration is a worker-scoped value fixture; fixtures for authentication, pages, and API clients remain deferred until they have concrete lifecycle requirements.
- The foundation smoke test renders in-memory HTML, keeping setup validation independent of networks and external applications.
- Chromium is the only initial browser project to keep the foundation small. Cross-browser coverage should be added when application scenarios and support requirements are defined.

## Current boundaries

This milestone intentionally excludes product-specific tests, custom abstractions, accessibility and visual testing, containers, and delivery pipelines.
