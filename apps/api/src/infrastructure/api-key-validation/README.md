# API-key validation

The API-key service awaits `IApiKeyValidator.validate(apiKey)` before creating or
rotating a key. `ApiKeyValidatorFactory` selects an adapter using the provider.
Rotation uses the provider stored on the record owned by the current user.

These authenticated read requests check whether the provider accepts the token.
They do not perform inference or validate the configured model, text/embedding
capability, available credits, or future availability.

| Provider   | Request                                                                  | Authentication                               | Official documentation                                                                           |
| ---------- | ------------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| OpenAI     | `GET https://api.openai.com/v1/models`                                   | Bearer token                                 | [List models](https://developers.openai.com/api/reference/resources/models/methods/list)         |
| Anthropic  | `GET https://api.anthropic.com/v1/models?limit=1`                        | `x-api-key`, `anthropic-version: 2023-06-01` | [List models](https://platform.claude.com/docs/en/api/models/list)                               |
| Gemini     | `GET https://generativelanguage.googleapis.com/v1beta/models?pageSize=1` | `x-goog-api-key`                             | [Models](https://ai.google.dev/api/models), [authentication](https://ai.google.dev/api)          |
| Groq       | `GET https://api.groq.com/openai/v1/models`                              | Bearer token                                 | [Supported models](https://console.groq.com/docs/models)                                         |
| OpenRouter | `GET https://openrouter.ai/api/v1/key`                                   | Bearer token                                 | [Get current API key](https://openrouter.ai/docs/api/api-reference/api-keys/get-current-api-key) |

Each request has an eight-second timeout and no automatic retries. Credentials
are sent only in headers to fixed provider URLs; redirects are rejected. Provider
response bodies and network errors are not returned to the caller or logged.

- A successful response allows encryption and persistence.
- Rejected credentials return HTTP 422. Gemini's structured `API_KEY_INVALID`
  and `API_KEY_EXPIRED` errors are recognized, including HTTP 400 responses.
- Permission or account/network restrictions return HTTP 422 with a separate
  access-denied message. A restricted key may be valid but cannot be verified
  through this endpoint. For example, OpenAI keys need permission to list models.
- Timeouts, network failures, rate limits, billing errors, and provider failures
  return HTTP 503, asking the caller to retry. They are not treated as invalid keys.

No key is saved when validation fails. A failed rotation leaves the previous key
in place. Successful responses keep the existing `{ id }` contract; no schema
migration or separate validation endpoint is required.

Run `bun run test` from the repository root or `apps/api`. Tests use mocked HTTP
responses and an in-memory repository; they do not contact providers or require
real API keys.
