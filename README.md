# OpenCampusKB

> **Development status:** OpenCampusKB is still changing quickly. Please do not use it for production yet; download or fork it after the next stabilization pass.
>
> **开发状态：** 项目仍在快速更新中，暂不建议下载或用于生产；建议几天后再查看。

OpenCampusKB is an open-source framework for building reviewed, source-grounded knowledge bases and AI Q&A assistants.

[中文说明 / Chinese README](README_CN.md)

It started from the production experience of **CityUInfo**, a non-official freshman knowledge base and AI assistant for City University of Hong Kong students. The open-source version keeps the product shape, review-first workflow, anonymous usage model, source citation logic, feedback loop, and Cloudflare Pages + Workers deployment notes, while removing private documents, credentials, logs, and school-specific production data.

- Live production reference: [CityUInfo](https://cityuinfo.royilab.com)
- Repository: [RoyNiu06/open-campus-kb](https://github.com/RoyNiu06/open-campus-kb)
- Current example version: `v3.0.1-example`

## Project Overview

OpenCampusKB is designed for teams that need an AI assistant they can actually govern. Instead of letting a model answer from memory, the system is built around reviewed knowledge, source citations, and administrator-controlled ingestion.

Uploaded materials should stay pending until an administrator approves, rejects, edits metadata, disables, archives, or deletes them. This gives the operator real control over what enters the searchable knowledge base.

The user experience can be login-free. A deployment may use anonymous IDs for usage limits, abuse prevention, chat history, and optional analytics. If the product owner clearly discloses the policy and obtains user consent, administrators may review anonymized conversation content to improve answer quality, discover common questions, and update the knowledge base.

The default architecture uses RAG, retrieval-augmented generation. User questions are matched against approved document chunks, then the model answers with citations. The current demo uses mock keyword retrieval so it can run locally without cloud services; production deployments should replace it with embeddings, hybrid retrieval, and a vector database.

Recent CityUInfo versions added a **Course Engine** pattern: before normal RAG, the backend can route highly structured questions to a specialized engine backed by structured records, then combine that result with RAG when useful. Although the name comes from course planning, the same pattern can be expanded to company policies, project runbooks, product catalogs, ticket workflows, research notes, or any domain where structured facts and procedural answers outperform pure document retrieval.

OpenCampusKB is not limited to universities. The same pattern can be adapted for companies, project teams, research groups, clubs, support teams, onboarding portals, internal policy assistants, or any community that wants a reviewed knowledge base with AI access.

The AI layer is provider-agnostic. You can use hosted models through OpenRouter, OpenAI, Anthropic, Gemini, DeepSeek, or another provider. You can also modify the backend to use local models for stronger privacy control, especially for internal or sensitive deployments.

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
- A production-shaped example with a Next `app/` frontend for Cloudflare Pages and a Worker API.
- A Worker API demo with mock `/api/chat`, optional SSE-style streaming, upload, feedback, notification, and document endpoints.
- A Course Engine / RAG / hybrid routing demonstration using mock structured course data.
- Citation chips, relevance-score UI, feedback hooks, and lightweight timing fields.
- A generic campus template under `templates/campus-template`.
- A desensitized `examples/cityuinfo` example with mock seed documents and config.
- Supabase schema scaffolding for reviewed documents, chunks, questions, feedback, and usage logs.
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
npm run app:dev
```

Open:

```text
http://127.0.0.1:3000
```

The Pages-style app serves:

- `/` mock source-grounded Q&A
- `/kb/` reviewed mock knowledge cards
- `/upload/` file, text, and link upload review flow demo
- `/about/` project, architecture, feedback, and safety explanation

For a production-shaped local split, run the Worker API in one terminal:

```bash
npm run dev
```

Then run the Pages frontend in another terminal:

```bash
NEXT_PUBLIC_OPEN_CAMPUS_API_BASE=http://127.0.0.1:8788 npm run app:dev
```

The Worker API provides:

- `/api/chat` mock retrieval answer API
- `/api/upload` mock pending-upload API
- `/api/documents` mock document API
- `/api/feedback` mock feedback API
- `/api/email-notification` mock update notification API
- `/health` health check

The local demo intentionally works without OpenRouter, Supabase, R2, Turnstile, or a login system. Production deployments should replace mock retrieval with a real vector store and reviewed ingestion pipeline.

## Useful Commands

```bash
npm run check          # Worker syntax check
npm run app:dev        # Next app frontend at 127.0.0.1:3000
npm run pages:build    # Static export prepared for Cloudflare Pages
npm run preview        # Worker preview at 127.0.0.1:8788
npm run seed:example   # Parse mock CityUInfo seed documents into JSON
npm run check:release  # Release readiness and secret-pattern check
```

## Repository Layout

```text
open-campus-kb/
  app/                       Next app frontend for Pages-style deployment
  components/                shared frontend components
  lib/                       example data and API client helpers
  worker/                    runnable mock Worker API
  templates/campus-template/ generic starter template
  examples/cityuinfo/        desensitized CityUInfo-style example
  scripts/                   preview, Pages export, seed, and release checks
  supabase/                  schema scaffold
  docs/                      architecture and operator docs
  .env.example               environment variable names only
  wrangler.example.jsonc     Cloudflare Worker example config
```

## Recommended Architecture

For a real deployment, the recommended stack is:

- Frontend: Cloudflare Pages, Vercel, or another static frontend host. The example uses Next `app/` static export.
- Backend API: Cloudflare Workers under `/api/*`.
- Database: Supabase Postgres with `pgvector`, or another Postgres-compatible database.
- File storage: Cloudflare R2 or another object store.
- AI provider: OpenRouter, OpenAI, Anthropic, Gemini, DeepSeek, local models, or another provider.
- Embeddings: a configurable embedding model stored in the vector database.
- Human verification: Cloudflare Turnstile or equivalent for public uploads.

Suggested production flow:

```text
User question
-> anonymous/session usage limit
-> lightweight route/rewrite step
-> Course Engine, RAG, or hybrid retrieval
-> chat model with source-grounded context
-> streamed answer with citations
-> record usage and optional feedback
```

Suggested ingestion flow:

```text
Upload or admin seed document
-> pending review
-> admin approval
-> text extraction
-> metadata header creation
-> chunking or whole-record short text embedding
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
2. Rename the project, domain, tags, and source trust tiers.
3. Replace mock seed documents with reviewed public examples.
4. Configure Supabase, R2, AI provider, local model backend, and Turnstile as needed.
5. Keep private documents, admin credentials, service-role keys, and production logs out of the public repository.

## Prompt: Ask An AI Agent To Start The Demo

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

## Prompt: Adapt OpenCampusKB For Your School, Company, Or Team

```text
I want to adapt OpenCampusKB into a reviewed knowledge base and AI Q&A assistant for my school, company, project team, or community.

Please inspect the repository first, then help me create a deployment-specific version.

Organization information:
- Organization name:
- Project name:
- Domain:
- Languages:
- Main user group:
- Initial tags:
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
11. If structured questions exist, design a Course Engine-like domain engine and decide when to route to it instead of pure RAG.
12. If I choose local models, explain what backend changes are needed and how to keep model endpoints private.
13. If a token is needed, ask me to create a least-privilege token and store it in the deployment platform secret manager. Never hard-code it into frontend code or commit it.

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
