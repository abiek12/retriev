# Security Policy

## Overview

Security is an important part of Retriev.

Retriev is an AI workspace that may process authentication credentials, user data, documents, conversations, API credentials, and information provided to AI services.

If you discover a security vulnerability, please report it responsibly so that it can be investigated and addressed before public disclosure.

## Supported Versions

Retriev is currently under active development.

At this stage, security fixes are generally applied to the latest development version.

| Version | Supported |
|---|---|
| `main` | Yes |
| Older releases | No |

Once stable releases are published, this section will be updated with a formal supported-version policy.

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

Please use GitHub's private vulnerability reporting feature if it is enabled for this repository.

If private vulnerability reporting is not available, contact the project maintainers through the security contact listed in the repository.

When reporting a vulnerability, provide as much of the following information as possible:

- A clear description of the vulnerability.
- The affected component or feature.
- Steps required to reproduce the issue.
- A proof of concept, if available.
- The potential security impact.
- The affected version, commit, or environment.
- Any suggested mitigation or fix.

Please avoid including real credentials, private user data, production secrets, or other sensitive information in the report.

## What to Report

Examples of security issues that should be reported privately include:

- Authentication bypass.
- Authorization bypass or privilege escalation.
- Session or token vulnerabilities.
- Account takeover vulnerabilities.
- Insecure password handling.
- OAuth or social-login vulnerabilities.
- Sensitive information disclosure.
- Insecure direct object references.
- Server-side request forgery (SSRF).
- Remote code execution.
- SQL injection.
- Cross-site scripting (XSS).
- Command injection.
- Path traversal.
- Insecure file upload or processing.
- Exposure of API keys, credentials, or secrets.
- Vulnerabilities involving AI agents, tools, integrations, or external services.
- Vulnerabilities that could expose private documents, conversations, knowledge-base content, or workspace data.

## What Does Not Usually Require a Security Report

The following generally do not need to be reported as security vulnerabilities unless they create a meaningful security impact:

- General bugs without a security impact.
- Feature requests.
- UI or styling issues.
- Performance issues without a security implication.
- Missing functionality.
- Dependency updates without a demonstrated vulnerability.
- Issues that require unrestricted access to an already compromised system.

For ordinary bugs and feature requests, please use GitHub Issues.

## Reporting Guidelines

Please allow maintainers reasonable time to investigate and address a reported vulnerability before making the details public.

Do not:

- Publicly disclose the vulnerability before coordinating with the maintainers.
- Access, modify, delete, or download data that does not belong to you.
- Perform destructive testing.
- Disrupt availability of the service or infrastructure.
- Use social engineering against project contributors or users.
- Attempt to gain persistent access to systems that are not yours.
- Exploit the vulnerability beyond what is reasonably necessary to demonstrate its impact.

Only test systems and accounts that you own or have explicit permission to test.

## Response Process

After receiving a vulnerability report, maintainers will:

1. Acknowledge receipt of the report when reasonably possible.
2. Review and validate the reported vulnerability.
3. Assess its severity and potential impact.
4. Determine the affected versions or components.
5. Develop and test an appropriate fix or mitigation.
6. Release the fix when practical.
7. Coordinate public disclosure when appropriate.

Response times may vary depending on the severity and complexity of the issue.

## Disclosure

Please do not publicly disclose a vulnerability until the maintainers have had a reasonable opportunity to investigate and address it.

When appropriate, the maintainers may publish a security advisory containing:

- A description of the vulnerability.
- Affected versions.
- Fixed versions.
- Severity information.
- Mitigation guidance.
- Credit to the reporter, if the reporter agrees.

Reporters will not be publicly identified without their consent.

## Security Updates

Security fixes may be communicated through:

- GitHub Security Advisories.
- Release notes.
- Changelog entries.
- Relevant project documentation.

Users should keep their Retriev installation and dependencies up to date.

## Secrets and Sensitive Information

Never commit secrets or sensitive information to the repository.

This includes:

- API keys.
- OAuth client secrets.
- Database credentials.
- Authentication secrets.
- Private keys.
- Access tokens.
- Production environment variables.
- User credentials.
- Private documents or data.

If a secret is accidentally committed, removing it from Git history is not sufficient by itself. The exposed credential should be considered compromised and rotated or revoked immediately.

## Third-Party Dependencies

Retriev uses third-party libraries and services.

Security vulnerabilities in dependencies should be reported through the appropriate upstream project when the issue originates there. If the vulnerability results from how Retriev uses a dependency, report it privately to the Retriev maintainers.

## Scope

This policy applies to the Retriev source code and project infrastructure maintained by the Retriev project.

Third-party services, external integrations, or infrastructure outside the project's control may have their own security reporting procedures.

## Safe Harbor

The Retriev project supports good-faith security research.

If you follow this policy, avoid privacy violations, avoid disrupting services, and do not intentionally compromise or access data that does not belong to you, the project will not pursue legal action solely for responsible security research conducted within these guidelines.

This safe-harbor statement does not grant permission to test systems that you do not own or have explicit authorization to test.

## Contact

For security reports, use GitHub's private vulnerability reporting feature when available.

If private vulnerability reporting is unavailable, contact the project maintainers through the security contact published in the repository.

Please do not use public GitHub issues for security vulnerabilities.

---

## License

Retriev is licensed under the [Apache License 2.0](../LICENSE).
