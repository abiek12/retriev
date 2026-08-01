# Retriev

> Multi-tenant AI Agent Platform

## Vision

Retriev is a multi-tenant AI platform that enables users to build, configure, and deploy their own AI assistants without writing AI infrastructure from scratch.

Each user can create one or more AI agents, configure system prompts, attach knowledge bases, enable external tools (web search, MCP servers, etc.), and chat with their agents through a modern web interface.

The long-term goal is to become an AI Agent Platform where every assistant can be customized through prompts, RAG, tools, MCP servers, and future agentic frameworks such as LangGraph.

---

# Current Status

The AI foundation is already implemented.

Completed:

- LLM abstraction layer
- Provider abstraction
- Groq integration
- Tool calling
- Web Search Tool
- RAG Search Tool
- Pinecone Vector Search
- Document indexing
- Prompt management
- Multi-tool execution loop
- Retry mechanism
- Tool loop prevention
- Global exception handling
- Logging
- Response wrapper
- Basic Chat API

The remaining work is primarily backend platform features, authentication, frontend, deployment, and production readiness.

---

# Architecture

Monorepo

- Bun
- Turborepo

Repository Structure

```
apps/
    api/
    web/

packages/
    database/
    shared/
    types/
    utils/
    ui/
    eslint-config/
    typescript-config/
```

---

# Tech Stack

## Backend

- Bun
- Hono
- TypeScript

## Database

- PostgreSQL (Supabase)
- Drizzle ORM

## Authentication

Preferred:

- Better Auth

Reason:

- Open source
- Database ownership
- Works well with Drizzle
- Session based
- OAuth support

---

## AI

LLM Providers

- Groq
- (Future)
  - OpenAI
  - Anthropic
  - Gemini
  - OpenRouter

Vector Database

- Pinecone

Embeddings

- OpenAI Embeddings (currently)

Future

- Voyage
- BAAI
- Nomic

---

## Frontend

- React
- Vite
- TypeScript
- TailwindCSS
- Shadcn UI

---

## Deployment

Frontend

- Vercel

Backend

Initially

- Vercel

Alternative

- Railway
- Render
- Fly.io

Database

- Supabase

---

# AI Features

Implemented

✅ Chat Completion

✅ Tool Calling

✅ RAG Search

✅ Web Search

✅ Prompt System

✅ Provider Abstraction

✅ Retry Logic

✅ Tool Loop Detection

Future

- Streaming
- Conversation Memory
- LangChain
- LangGraph
- MCP Tool Support
- Multi-agent workflows

---

# Multi Tenant

Every user owns:

- Account
- API Keys
- AI Agents
- Knowledge Base
- Conversations
- Documents
- Usage
- MCP Servers

Users must never access another tenant's resources.

---

# Authentication

Using Better Auth

Features

- Email Login
- Google Login
- GitHub Login
- Session Management
- Password Reset
- Protected APIs

---

# Knowledge Base

Users should NOT upload files directly to Retriev.

Preferred workflow

User uploads file to

- Cloudflare R2
- S3
- Supabase Storage

OR

provides a public file URL.

Retriev then

- downloads
- extracts text
- chunks
- embeds
- indexes into Pinecone

This avoids storing large files on the application server.

---

# AI Agent

Each user can create multiple AI Agents.

Configuration

- Name
- Description
- Avatar
- Model
- Temperature
- System Prompt
- Tools
- Documents
- Knowledge Base
- MCP Servers
- Visibility
- Default Settings

---

# Supported Tools

Current

- Web Search
- RAG Search

Future

- MCP Servers
- Database Queries
- Calculator
- Email
- Calendar
- GitHub
- Slack
- Notion

---

# Conversations

Each conversation stores

- User Message
- Assistant Message
- Tool Calls
- Metadata
- Usage
- Tokens
- Time

Future

- Conversation Rename
- Search
- Archive
- Export

---

# Usage Tracking

Per User

Track

- Prompt Tokens
- Completion Tokens
- Total Tokens
- Request Count
- Tool Calls
- Model Usage
- Cost Estimation

Dashboard

- Daily Usage
- Monthly Usage
- Agent Usage
- Token Graph
- Cost Graph

---

# Admin Dashboard

Admin Features

- User Management
- Agent Management
- Usage Analytics
- System Metrics
- Health Checks
- Provider Status
- Error Monitoring

---

# Future MCP Support

Each user should be able to register MCP Servers.

Configuration

- Name
- URL
- Authentication
- Enabled Tools

These MCP servers become callable tools for that user's AI agents.

This is considered the flagship feature of Retriev.

---

# Coding Principles

- SOLID
- Design Patterns if needed
- Modular Design
- Feature-based Modules
- Dependency Injection
- Strong Typing
- DTO Validation
- Generic API Responses
- Global Error Handling
- Structured Logging
- Workspace Packages

---

# API Standards

Response

Success

```ts
{
    success: true,
    data: T
}
```

Error

```ts
{
    success: false,
    error: {
        code: string,
        message: string
    }
}
```

---

# Development Workflow

We follow Agile.

Each sprint must produce a working increment.

No unfinished features merged.

Definition of Done

- Code
- Validation
- Error Handling
- Logging
- Documentation
- Tested

---

# Sprint Plan

## Sprint 0

Project Foundation

Status:

In Progress

Tasks

- Project architecture
- Turborepo setup
- Package organization
- Database package
- Shared package
- Supabase
- Drizzle
- Database design
- Db schema
- Better Auth integration
- Environment management
- Logging
- GitHub release strategy

---

## Sprint 1

Authentication

Tasks

- Better Auth
- User CRUD
- OAuth
- Sessions
- Protected APIs

---

## Sprint 2

Agent Management

Tasks

- Agent CRUD
- System Prompt
- Model Selection
- Temperature
- Tool Selection
- Knowledge Base Configuration

---

## Sprint 3

Knowledge Base

Tasks

- File ingestion
- URL ingestion
- Chunking
- Embeddings
- Pinecone indexing
- Re-indexing
- Delete vectors

---

## Sprint 4

Conversation System

Tasks

- Chat
- Streaming
- History
- Conversation CRUD
- Usage Recording

---

## Sprint 5

Frontend

Tasks

- Authentication
- Dashboard
- Agent Builder
- Chat UI
- Knowledge Base UI
- Settings
- Usage Dashboard

---

## Sprint 6

Admin Dashboard

Tasks

- Admin APIs
- Metrics
- Monitoring
- User Management

---

## Sprint 7

MCP

Tasks

- MCP CRUD
- Tool Discovery
- Tool Execution
- Agent Integration

---

## Sprint 8

Production

Tasks

- Testing
- Bug Fixes
- Performance
- Monitoring
- Deployment
- Documentation

---

## Sprint 9

Agentic Frameworks

Evaluate migration to

- LangChain
- LangGraph

Only migrate if they provide clear architectural benefits.

The existing custom implementation should remain the reference implementation.

---

# Current Engineering Decisions

✅ Bun is the default runtime and package manager.

✅ Turborepo monorepo.

✅ Hono backend.

✅ React + Vite frontend.

✅ PostgreSQL via Supabase.

✅ Drizzle ORM.

✅ Better Auth.

✅ Pinecone vector database.

✅ Workspace packages for reusable modules.

✅ Generic API response wrapper.

✅ Structured logging using Pino.

✅ AI-first architecture with provider abstraction.

✅ Multi-tenant by design.

---

# Long-term Goal

Retriev should evolve into a production-grade AI Agent Platform where users can create intelligent assistants by combining:

- Large Language Models
- Retrieval-Augmented Generation (RAG)
- Tool Calling
- MCP Servers
- Custom Prompts
- External APIs
- Agentic Workflows

while abstracting away the complexity of AI infrastructure behind a clean, scalable developer and user experience.
