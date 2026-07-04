# Security Policy

OpenCampusKB handles knowledge base content, uploads, usage logs, and optional anonymous identifiers. Production deployments should treat it as a security-sensitive application.

## Reporting

Please report suspected vulnerabilities privately to the project maintainer for the repository you are using.

Do not open a public issue containing:

- API keys or tokens.
- Admin credentials.
- Private user data.
- Exploit details that could be immediately abused.

## Supported Scope

This public repository provides framework code, example code, and documentation. Production deployments are responsible for their own:

- secret management
- upload moderation
- rate limiting
- database policies
- file storage policies
- legal and privacy review

## Baseline Requirements

- Keep service-role keys server-side.
- Keep AI provider keys server-side.
- Verify public uploads before storing or ingesting them.
- Treat retrieved document text as untrusted data.
- Avoid storing raw IP addresses unless there is a clear operational need.
