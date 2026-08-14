# Retriev

> An open-source AI workspace for building, managing, and interacting with AI agents, knowledge bases, and AI-powered workflows.

Retriev is an AI workspace designed to bring **AI agents, knowledge bases, conversations, integrations, and usage analytics** into a single platform.

The project is currently under active development and is being built with a focus on clean architecture, modular services, type-safe APIs, and a developer-friendly experience.

## Status

🚧 **Early Development**

Retriev is currently being actively developed. Core architecture and authentication are being implemented first, followed by agents, knowledge bases, conversations, integrations, and AI workflows.

APIs, database schemas, UI, and internal architecture may change before the first stable release.

---

## Features

### Authentication

* Email/password authentication
* Google OAuth
* GitHub OAuth
* Session-based authentication
* Protected routes
* Guest-only authentication routes
* Password reset flow
* Email verification
* Session expiration handling

### AI Agents

* Create and manage specialized AI agents
* Configure system instructions
* Select language models
* Configure model parameters
* Enable tools for agents
* Knowledge-base integration
* Agent conversations

### Knowledge Base

* Upload documents
* Connect external sources
* URL-based sources
* Document processing
* Embedding generation
* Vector search
* RAG-powered retrieval
* Source synchronization and status tracking

### Conversations

* Agent-based conversations
* Conversation history
* AI responses
* Tool execution
* Knowledge-base retrieval
* Context-aware interactions

### Integrations

Retriev is designed to connect AI agents with external services and tools.

Planned integrations include:

* Web search
* External data sources
* Repository synchronization
* Additional third-party tools

### Usage & Analytics

* Token consumption
* Model usage
* API usage
* Latency metrics
* Cost tracking
* Agent usage analytics

---

## Screenshots

### Dashboard

<!-- Add screenshot here -->

### Agents

<!-- Add screenshot here -->

### Knowledge Base

<!-- Add screenshot here -->

### Agent Workspace

<!-- Add screenshot here -->

---

## Architecture

Retriev uses a monorepo architecture with separate applications and shared packages.

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
│
├── .github/
│
├── package.json
├── turbo.json
└── bun.lock
```

The frontend and backend are developed independently while sharing common contracts and types through the shared packages.

### High-level architecture

```text
                         ┌─────────────────┐
                         │   Retriev Web   │
                         │ React + Vite    │
                         └────────┬────────┘
                                  │
                                  │ HTTP API
                                  ▼
                         ┌─────────────────┐
                         │   Retriev API   │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
        ┌───────────┐       ┌───────────┐       ┌────────────┐
        │ PostgreSQL│       │  Vector   │       │ AI / LLM   │
        │           │       │  Database │       │ Providers  │
        └───────────┘       └───────────┘       └────────────┘
```

The architecture will evolve as the project develops.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* shadcn/ui
* Zustand
* TanStack Query
* React Hook Form
* Zod
* Sonner

### Backend

* Node.js
* TypeScript
* Hono
* Better Auth
* Drizzle ORM

### Data

* PostgreSQL
* Pinecone
* Redis

### AI

* Large Language Models
* Embedding models
* Retrieval-Augmented Generation (RAG)
* Tool calling
* AI agents

### Development

* Bun
* Turborepo
* Docker
* GitHub Actions

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* [Bun](https://bun.sh/)
* Node.js
* Docker
* PostgreSQL or access to a PostgreSQL instance

Additional services may be required depending on the features being developed.

### Clone the repository

```bash
git clone https://github.com/<your-username>/retriev.git

cd retriev
```

### Install dependencies

```bash
bun install
```

### Environment variables

Create the required environment files from the provided examples:

```bash
cp .env.example .env
```

Each application may also contain its own environment configuration.

Never commit real secrets or credentials to the repository.

### Run the development environment

```bash
bun dev
```

The exact development commands may change while the project is under active development. Refer to the application-specific documentation when necessary.

---

## Project Structure

```text
apps/
├── web/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── features/
│       ├── hooks/
│       ├── layouts/
│       ├── lib/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── stores/
│       ├── styles/
│       └── utils/
│
└── api/

packages/
├── shared/
│   └── contracts/
└── ...
```

The frontend follows a feature-oriented structure while keeping application-wide infrastructure such as routing, layouts, services, stores, and shared components separated.

---

## Development

Before submitting changes, run the project's checks:

```bash
bun lint
bun typecheck
bun test
bun build
```

The available commands may evolve as the project grows.

### Branch naming

Use descriptive branch names:

```text
feature/agent-management
feature/knowledge-base
fix/auth-session
fix/login-validation
refactor/api-client
docs/setup
```

### Commit messages

Use conventional commit-style messages:

```text
feat: add agent creation
fix: handle expired sessions
refactor: simplify auth routes
docs: update local setup
chore: add Apache 2.0 license
test: add login validation tests
```

---

## Contributing

Contributions are welcome once the project reaches a stable contribution stage.

Before contributing, please read:

* [Contributing Guide](./.github/CONTRIBUTING.md)
* [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
* [Security Policy](./.github/SECURITY.md)

For bugs and feature requests, please use the appropriate GitHub issue template.

---

## Security

Security issues should **not** be reported through public GitHub issues.

Please refer to the [Security Policy](./.github/SECURITY.md) for information about reporting vulnerabilities.

Never commit:

* API keys
* OAuth secrets
* Database credentials
* Authentication secrets
* Private user data
* Production configuration

---

## Roadmap

The project is being developed incrementally.

### Foundation

* [x] Monorepo setup
* [x] Shared contracts
* [x] Frontend architecture
* [x] Backend foundation
* [x] Database foundation
* [x] Authentication foundation
* [x] Initial UI system

### Authentication & Application Shell

* [x] Login
* [x] Registration
* [x] OAuth
* [x] Session handling
* [x] Protected routes
* [x] Guest routes
* [ ] Logout
* [ ] Password reset
* [ ] Email verification
* [ ] Session expiration UX
* [ ] User profile

### AI Agents

* [ ] Agent management
* [ ] Agent configuration
* [ ] Model configuration
* [ ] Tool configuration
* [ ] Agent execution
* [ ] Agent conversations

### Knowledge Base

* [ ] Document upload
* [ ] Source management
* [ ] Document processing
* [ ] Embeddings
* [ ] Vector search
* [ ] RAG pipeline
* [ ] Source synchronization

### Conversations

* [ ] Conversation management
* [ ] Streaming responses
* [ ] Tool execution UI
* [ ] Conversation history
* [ ] Context management

### Platform

* [ ] Integrations
* [ ] Usage analytics
* [ ] Cost tracking
* [ ] Notifications
* [ ] Workspace management
* [ ] Team collaboration

### Stable Release

* [ ] Production hardening
* [ ] Security audit
* [ ] Test coverage
* [ ] Documentation
* [ ] Deployment documentation
* [ ] Stable API contracts
* [ ] `v1.0.0`

---

## Documentation

Project documentation will be maintained under:

```text
docs/
├── architecture/
├── development/
├── api/
└── decisions/
```

Architecture decisions and important technical choices will be documented as the project evolves.

---

## License

Retriev is licensed under the **Apache License 2.0**.

See the [LICENSE](./LICENSE) file for the complete license text.

---

## Disclaimer

Retriev is currently under active development.

Features, APIs, database schemas, configuration, and architecture may change without notice before the first stable release.
