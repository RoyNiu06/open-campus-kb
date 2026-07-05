# OpenCampusKB

OpenCampusKB is an open-source framework for building reviewed, source-grounded knowledge bases and AI Q&A assistants.

[中文说明 / Chinese README](README_CN.md)

It started from the production experience of **CityUInfo**, a non-official freshman knowledge base and AI assistant for City University of Hong Kong students. The open-source version keeps the product shape, review-first workflow, anonymous usage model, source citation logic, and deployment notes, while removing private documents, credentials, logs, and school-specific production data.

- Live production reference: [CityUInfo](https://cityuinfo.royilab.com)
- Repository: [RoyNiu06/open-campus-kb](https://github.com/RoyNiu06/open-campus-kb)
- Current example version: `v2.0.0-example`

## Project Overview

OpenCampusKB is designed for teams that need an AI assistant they can actually govern. Instead of letting a model answer from memory, the system is built around reviewed knowledge, source citations, and administrator-controlled ingestion.

The framework supports a review-first knowledge workflow. Uploaded materials should stay pending until an administrator approves, rejects, edits metadata, disables, archives, or deletes them. This gives the operator real control over what enters the searchable knowledge base.

The user experience can be login-free. A deployment may use anonymous IDs for usage limits, abuse prevention, chat history, and optional analytics. If the product owner clearly discloses the policy and obtains user consent, administrators may review anonymized conversation content to improve answer quality, discover common questions, and update the knowledge base.

The default architecture uses RAG, retrieval-augmented generation. User questions are matched against approved document chunks, then the model answers with citations. This reduces hallucination risk and makes answers easier to audit. The current demo uses mock keyword retrieval so it can run locally without cloud services; production deployments should replace it with embeddings and a vector database.

OpenCampusKB is not limited to universities. The same pattern can be adapted for companies, project teams, research groups, clubs, support teams, onboarding portals, internal policy assistants, or any community that wants a reviewed knowledge base with AI access.

The AI layer is provider-agnostic. You can use hosted models through OpenRouter, OpenAI, Anthropic, Gemini, DeepSeek, or another provider. You can also modify the backend to use local models for stronger privacy control, especially for internal or sensitive deployments.

The project is intentionally modular and early-stage. It leaves room for future changes: stronger admin workflows, richer ingestion pipelines, local model support, multi-tenant deployments, enterprise authentication, analytics dashboards, and more specialized frontend experiences.

## Core Principles

- Answers should be grounded in reviewed materials first.
- Sources should be shown whenever possible.
- Unsupported questions should be answered with uncertainty instead of invented details.
- Uploaded materials should not become searchable until reviewed.
- Administrators should have clear control over document status and metadata.
- Anonymous usage should be disclosed, limited, and privacy-conscious.
- Secrets must stay server-side and out of public repositories.
- The framework should stay adaptable across schools, companies, and teams.

## What This Repository Contains

- A runnable local demo with mock documents and source-grounded chat.
- A Cloudflare Worker-style API and frontend demo.
- A generic campus template under `templates/campus-template`.
- A desensitized `examples/cityuinfo` example with mock seed documents.
- Supabase schema scaffolding for reviewed documents, chunks, questions, and feedback.
- Documentation for architecture, deployment, privacy, release policy, and adaptation.
- A release check script that scans required files, Worker syntax, seed parsing, and common secret patterns.

## What This Repository Does Not Contain

- Real university PDFs or private source materials.
- API keys, Supabase service-role keys, Cloudflare tokens, GitHub tokens, or AI provider keys.
- Production admin credentials.
- Private usage logs or personally identifiable user data.
- A fully managed production SaaS deployment.

## Quick Start: Local Demo

Requirements:

- Node.js 22 or newer recommended.
- npm.

Run:

```bash
git clone https://github.com/RoyNiu06/open-campus-kb.git
cd open-campus-kb
npm install
npm run check
npm run preview
```

Open:

```text
http://127.0.0.1:8788
```

The local preview serves:

- `/` mock source-grounded Q&A
- `/kb/` reviewed mock knowledge cards
- `/upload/` upload review flow demo
- `/about/` project and safety explanation
- `/api/chat` mock retrieval answer API
- `/api/upload` mock pending-upload API
- `/api/documents` mock document API
- `/health` health check

The local demo intentionally works without OpenRouter, Supabase, R2, Turnstile, or a login system. Production deployments should replace mock retrieval with a real vector store and reviewed ingestion pipeline.

If you specifically want to test the Worker through Wrangler:

```bash
npm run dev
```

## Useful Commands

```bash
npm run check          # Worker syntax check
npm run preview        # Local Node preview at 127.0.0.1:8788
npm run seed:example   # Parse mock CityUInfo seed documents into JSON
npm run check:release  # Release readiness and secret-pattern check
```

## Repository Layout

```text
open-campus-kb/
  worker/                         runnable mock Worker
  templates/campus-template/       generic starter template
  examples/cityuinfo/              desensitized CityUInfo-style example
  scripts/                         preview, seed, and release checks
  supabase/                        schema scaffold
  docs/                            architecture and operator docs
  .env.example                     environment variable names only
  wrangler.example.jsonc           Cloudflare Worker example config
```

## Recommended Architecture

For a real deployment, the recommended stack is:

- Frontend: Cloudflare Pages, Vercel, or another static frontend host.
- Backend API: Cloudflare Workers.
- Database: Supabase Postgres with `pgvector`, or another Postgres-compatible database.
- File storage: Cloudflare R2 or another object store.
- AI provider: OpenRouter, OpenAI, Anthropic, Gemini, DeepSeek, local models, or another provider.
- Embeddings: a configurable embedding model stored in the vector database.
- Human verification: Cloudflare Turnstile or equivalent for public uploads.

Suggested production flow:

```text
User question
-> anonymous/session usage limit
-> retrieve approved document chunks
-> call chat model with source-grounded context
-> return answer with citations
-> record usage and optional feedback
```

Suggested ingestion flow:

```text
Upload or admin seed document
-> pending review
-> admin approval
-> text extraction
-> chunking
-> embedding
-> vector storage
-> searchable in RAG
```

## Adapt For Your Campus Or Organization

Start with:

- `templates/campus-template`
- `examples/cityuinfo`
- `docs/adaptation-guide.md`
- `.env.example`

Short path:

1. Copy the generic template.
2. Rename the project, domain, categories, and source trust tiers.
3. Replace mock seed documents with reviewed public examples.
4. Configure Supabase, R2, AI provider, local model backend, and Turnstile as needed.
5. Keep private documents, admin credentials, service-role keys, and production logs out of the public repository.

## Prompt: Ask An AI Agent To Start The Demo

You can paste this into Codex, Cursor, Claude Code, or another coding agent:

```text
You are helping me run the OpenCampusKB open-source demo locally.

Repository: https://github.com/RoyNiu06/open-campus-kb

Tasks:
1. Clone the repository.
2. Install dependencies with npm.
3. Run the syntax and release checks.
4. Start the local preview server.
5. Open or print the localhost URL.
6. Verify that /health returns ok and that /api/chat returns an answer with sources.

Constraints:
- Do not ask for production API keys for the local demo.
- Do not create or expose secrets.
- If Wrangler local dev fails, use npm run preview.
- Report the exact commands you ran and the final local URL.
```

Expected command path:

```bash
git clone https://github.com/RoyNiu06/open-campus-kb.git
cd open-campus-kb
npm install
npm run check:release
npm run preview
```

## Prompt: Adapt OpenCampusKB For Your School, Company, Or Team

You can paste this into your AI coding agent after cloning the repository:

```text
I want to adapt OpenCampusKB into a reviewed knowledge base and AI Q&A assistant for my school, company, project team, or community.

Please inspect the repository first, then help me create a deployment-specific version.

Organization information:
- Organization name:
- Project name:
- Domain:
- Languages:
- Main user group:
- Initial categories:
- Source trust tiers:
- Contact email:
- Whether this is official or unofficial:
- Whether anonymous conversation review is allowed after user consent:
- Whether hosted AI models or local models should be used:

Implementation goals:
1. Update the template and example configuration for my organization.
2. Replace mock seed documents with safe public example documents.
3. Keep all secrets out of the repository.
4. Keep uploaded materials pending until admin review.
5. Make AI answers source-grounded and citation-first.
6. Add a clear disclaimer, privacy note, and feedback contact.
7. Support anonymous ID usage limits without requiring login by default.
8. Prepare environment variables using .env.example.
9. If I choose Cloudflare, guide me through Pages, Workers, R2, Turnstile, and optional MCP or Wrangler setup.
10. If I choose Supabase, guide me through creating an organization/project, running migrations, enabling pgvector, and storing service keys only as backend secrets.
11. If I choose local models, explain what backend changes are needed and how to keep model endpoints private.
12. If a token is needed, ask me to create a least-privilege token and store it in the deployment platform secret manager. Never hard-code it into frontend code or commit it.

Before making changes:
- Explain which files you will modify.
- Separate generic framework changes from organization-specific content.
- Avoid adding real private PDFs, screenshots, emails, logs, credentials, or user data.

After making changes:
- Run npm run check:release.
- Start the local preview.
- Verify /health, /api/documents, /api/chat, and the main pages.
- Summarize what still needs real production configuration.
```

## Prompt: Deploy With Cloudflare And Supabase

Use this only when you are ready to connect real services:

```text
Help me deploy OpenCampusKB using Cloudflare and Supabase.

Please proceed carefully and do not expose secrets.

Cloudflare goals:
- Use Pages for the frontend if the project has a static frontend.
- Use Workers for /api/*.
- Use R2 for uploaded files.
- Use Turnstile for public upload protection.
- Use Wrangler or Cloudflare MCP if available.

Supabase goals:
- Create or use a Supabase project.
- Apply the schema under supabase/migrations.
- Enable pgvector.
- Store documents, chunks, questions, feedback, usage logs, and review metadata.
- Keep the service-role key server-side only.

AI goals:
- Configure a chat model and embedding model through backend secrets.
- Add a retrieval step over approved chunks only.
- Make the answer prompt cite sources and say when information is missing.
- If local models are preferred, keep the model endpoint private and call it from the backend only.

Safety requirements:
- Never put API keys in frontend code.
- Never commit .env or .dev.vars.
- Use least-privilege tokens where possible.
- Tell me exactly which secrets I need to create and where to paste them.
- Run a secret scan before any git commit.
```

## Release Readiness

Before publishing your fork:

```bash
npm run check
npm run seed:example
npm run check:release
```

Also review:

- `docs/release-checklist.md`
- `docs/security-and-privacy.md`
- `SECURITY.md`
- `.env.example`

## License

MIT
