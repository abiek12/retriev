# Implementation plans

## API Architecture

### Goals

1. Keep route modules grouped by business capability.
2. Keep infrastructure providers separate from business modules.
3. Put database access behind repositories.
4. Put business workflows in services.
5. Keep interfaces separate from concrete implementations.
6. Wire dependencies in module files so controllers stay thin.

### Folder layout

```txt
src/
  core/
    repositories/
      base.repository.ts
    services/
      base.service.ts
  modules/
    auth/
    chat/
    documents/
  infrastructure/
    database/
    email/
    embeddings/
    llm/
    prepare/
    tools/
    vector-store/
  config/
  middlewares/
  utils/
```

### Module convention

Each module should use the same local shape when it needs the layer:

```txt
feature.module.ts
feature.route.ts
feature.controller.ts
feature.service.ts
feature.service.interface.ts
feature.repository.ts
feature.repository.interface.ts
feature.types.ts
```

`*.module.ts` owns dependency wiring. Routes call controllers, controllers parse request/response concerns, services hold business logic, and repositories own database persistence. Controllers should depend on service interfaces, while module files choose the concrete implementation.

### Repository convention

Repository contracts use `I<Feature>Repository`. Concrete repositories extend `BaseRepository` from `src/core/repositories` and implement their module interface. Keep reusable shared behavior in the base class, but keep Drizzle-specific queries in concrete repositories so schema joins and filters remain readable.

### Service convention

Service contracts use `I<Feature>Service`. Concrete services extend `BaseService<TRepository>` from `src/core/services` and implement their module interface. A service can depend on its repository interface and any infrastructure provider needed for the workflow, such as LLMs, embeddings, vector stores, tools, or email.

### Migration order

1. Move existing feature code into `src/modules`.
2. Move provider code into `src/infrastructure`.
3. Introduce base repository and service classes.
4. Add repository and service interfaces per module.
5. Add concrete repositories and services per module.
6. Update module files to wire concrete implementations.
7. Add DB-backed repository methods as module behavior expands.

## Stage 1 - Indexing
1. Load the document - pdf, text, docs, etc.
2. Chunk the document.
3. Generate vector embeddings.
4. Store the vector embeddings in vectore databases.

## Stage 2 - Retrieval
1. Setup LLM.
2. Add a retrieval step.
3. Pass input + relevant information from the retrieval data and pass to llm.
4. return the llm response.
