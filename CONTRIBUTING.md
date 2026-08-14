# Contributing to Retriev

Thank you for your interest in contributing to Retriev.

Retriev is an open-source AI workspace for building and managing AI agents, knowledge bases, conversations, integrations, and AI-powered workflows.

The project is currently under active development, so architecture, APIs, and implementation details may change as the project evolves.

## Before You Start

Before making a contribution:

1. Read the [Code of Conduct](./CODE_OF_CONDUCT.md).
2. Check existing issues and pull requests to avoid duplicating work.
3. For significant features or architectural changes, open an issue first to discuss the proposed approach.
4. Keep changes focused and avoid unrelated modifications.

For security vulnerabilities, do not open a public issue. Follow the process described in [SECURITY.md](./SECURITY.md).

---

## Development Setup

### Prerequisites

Make sure you have:

- Node.js
- Bun
- Docker
- Git
- PostgreSQL

Additional services may be required for specific features.

### Clone the Repository

```bash
git clone https://github.com/<your-username>/retriev.git

cd retriev
```

### Install Dependencies

```bash
bun install
```

### Environment Variables

Copy the example environment files where applicable:

```bash
cp .env.example .env
```

Do not commit secrets, credentials, API keys, or private configuration.

### Start Development

```bash
bun dev
```

Refer to the application-specific documentation if additional services or configuration are required.

---

## Project Structure

Retriev is organized as a monorepo.

```text
retriev/
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared/
│   └── ...
│
├── docs/
├── .github/
├── package.json
├── turbo.json
└── bun.lock
```

### Frontend

The web application is located under:

```text
apps/web/
```

Its source follows a layered and feature-oriented structure:

```text
src/
├── app/
├── assets/
├── components/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
├── stores/
├── styles/
└── utils/
```

Keep application-specific functionality inside the appropriate area rather than placing everything into generic folders.

---

## Naming Conventions

Retriev follows consistent naming conventions across the project.

### Folders

Use lowercase with kebab-case:

```text
user-profile/
auth-routes/
knowledge-base/
```

### Component and Page Files

Use PascalCase:

```text
LoginForm.tsx
DashboardPage.tsx
KnowledgeBaseCard.tsx
```

### Non-component Files

Use camelCase:

```text
authService.ts
apiClient.ts
dateUtils.ts
```

### Components

Use PascalCase:

```ts
function LoginForm() {}
function DashboardCard() {}
```

### Variables

Use camelCase:

```ts
const userProfile = ...
const accessToken = ...
```

### Functions

Use camelCase:

```ts
function getUserProfile() {}
function createAgent() {}
```

Keep naming consistent with the existing codebase.

---

## Branching

Create a separate branch for your work.

Use descriptive branch names:

```text
feature/agent-management
feature/knowledge-base
feature/social-login
fix/auth-session
fix/login-validation
refactor/api-client
docs/contributing-guide
test/auth-service
```

Avoid generic branch names such as:

```text
test
changes
update
new
my-branch
```

---

## Making Changes

Before starting implementation:

1. Understand the existing architecture.
2. Check whether similar functionality already exists.
3. Reuse existing components, utilities, services, and shared contracts where appropriate.
4. Keep the change focused on the intended feature or fix.
5. Avoid introducing unnecessary dependencies.
6. Update documentation when behavior or public interfaces change.

Do not restructure unrelated parts of the project as part of a feature or bug fix.

---

## Shared Contracts

Shared API contracts are maintained under the shared packages.

When an API contract is shared between applications:

- Define the contract in the appropriate shared package.
- Reuse the shared contract from consuming applications.
- Avoid duplicating request and response schemas.
- Keep validation and API types consistent.

Changes to shared contracts should be reviewed carefully because they can affect multiple applications.

---

## Code Quality

Before opening a pull request, run the project's checks:

```bash
bun lint
bun typecheck
bun test
bun build
```

If a command is not yet configured for your local checkout, follow the current project documentation rather than inventing a replacement.

### Keep Changes Small

Prefer:

```text
One feature
    ↓
Focused implementation
    ↓
Tests
    ↓
Documentation
    ↓
Pull request
```

Avoid combining unrelated changes into a single pull request.

For example, a pull request for login validation should not also contain a large unrelated folder restructuring.

---

## Testing

Add or update tests when changing behavior.

Tests should cover important cases such as:

- Successful operations
- Validation failures
- Authentication failures
- Authorization failures
- Error handling
- Edge cases

Do not remove or weaken existing tests simply to make a change pass.

---

## Commit Messages

Use conventional commit-style messages.

Examples:

```text
feat: add agent creation
fix: handle expired sessions
refactor: simplify auth service
docs: update development setup
test: add login validation tests
chore: update dependencies
```

Use the following common prefixes:

| Prefix | Purpose |
|---|---|
| `feat` | New functionality |
| `fix` | Bug fix |
| `refactor` | Code restructuring without behavior change |
| `docs` | Documentation |
| `test` | Tests |
| `chore` | Maintenance |
| `build` | Build system changes |
| `ci` | CI/CD changes |

Keep commit messages short and descriptive.

---

## Pull Requests

Before opening a pull request:

- Make sure your branch is up to date.
- Run the relevant tests and checks.
- Review your own changes.
- Remove debugging code and unnecessary files.
- Update documentation where necessary.
- Make sure secrets or sensitive information are not included.

### Pull Request Title

Use a conventional format:

```text
feat: add agent management
fix: resolve session expiration issue
docs: improve contributing guide
```

### Pull Request Description

Explain:

- What changed.
- Why the change was needed.
- How it was implemented.
- How it was tested.
- Any relevant limitations or follow-up work.

Example:

```md
## Summary

Adds agent creation and basic agent configuration.

## Changes

- Added agent creation flow.
- Added agent configuration form.
- Added API contract.
- Added validation.
- Added tests.

## Testing

- bun lint
- bun typecheck
- bun test
- Manual UI testing
```

---

## Review Process

All contributions are subject to review.

Reviewers may request changes related to:

- Correctness
- Architecture
- Security
- Performance
- Maintainability
- Testing
- Documentation
- Consistency with existing project conventions

Be open to feedback and keep discussions focused on the implementation.

---

## Issues

### Bug Reports

When reporting a bug, include:

- What happened.
- What you expected to happen.
- Steps to reproduce.
- Relevant environment information.
- Logs or screenshots when useful.

Avoid including secrets or private information.

### Feature Requests

For feature requests, explain:

- The problem you are trying to solve.
- Why the feature would be useful.
- Your proposed solution, if you have one.
- Any relevant alternatives.

For large features, discuss the proposal before beginning implementation.

---

## Documentation

Documentation is part of the project.

Update documentation when introducing:

- New public functionality.
- Configuration changes.
- API changes.
- New development workflows.
- Important architectural decisions.

Architecture decisions should be documented where appropriate under:

```text
docs/
```

---

## Security

Security issues should not be reported through public GitHub issues.

Please follow the process described in:

```text
.github/SECURITY.md
```

Never commit:

- API keys
- OAuth secrets
- Database credentials
- Authentication secrets
- Private keys
- User data
- Production credentials

---

## Contributor License

By submitting a contribution to Retriev, you agree that your contribution may be distributed under the project's Apache License 2.0 license.

You retain ownership of your contribution unless otherwise agreed.

---

## License

By contributing to Retriev, you agree that your contributions will be licensed under the [Apache License 2.0](../LICENSE).

---

## Thank You

Every contribution helps improve Retriev.

Whether you are fixing a bug, improving documentation, adding a feature, or reporting a problem, thank you for taking the time to contribute.
