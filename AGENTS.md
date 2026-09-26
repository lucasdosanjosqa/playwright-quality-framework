# Project Instructions

## Purpose

This repository is a production-grade Quality Engineering portfolio project.

The goal is to demonstrate Senior QA Automation / SDET engineering practices,
not merely Playwright syntax.

## Engineering Principles

- TypeScript strict mode.
- Prefer simple, maintainable abstractions.
- Avoid unnecessary abstractions.
- Avoid duplicated code.
- Tests must be deterministic and independent.
- Never use arbitrary hard waits.
- Prefer resilient user-facing locators.
- Use data-testid only when appropriate.
- Separate test intent from implementation details.
- Keep tests readable.
- Follow Playwright best practices.
- Treat flaky tests as defects.

## Architecture

Maintain clear separation between:

- tests
- fixtures
- pages/components
- API clients
- test data
- utilities
- configuration

Do not create abstractions without a demonstrated use case.

## Quality

Before considering a task complete:

1. Run lint.
2. Run TypeScript validation.
3. Run relevant tests.
4. Check for duplicated or unnecessary code.
5. Update documentation when architecture changes.

## Portfolio Requirements

This repository will be reviewed by international engineering teams.

Therefore:

- Code must be written in English.
- Documentation must be written in English.
- Commits should use clear English messages.
- Architectural decisions should be documented.
- README examples must remain executable.
- Do not fabricate performance or reliability metrics.

## Working Style

Before implementing significant changes:

1. Inspect the existing repository.
2. Explain the proposed approach.
3. Identify affected files.
4. Implement incrementally.
5. Validate the result.
6. Summarize what changed and remaining limitations.

Do not implement unrelated improvements unless explicitly requested.
