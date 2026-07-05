# OpenCampusKB

OpenCampusKB is an open-source framework for building reviewed, source-grounded knowledge bases and AI Q&A assistants for campus communities.

The first example is a desensitized `CityUInfo`-style freshman knowledge base. The framework is intentionally generic enough for other universities, departments, student groups, and internal organizations that need a reviewed knowledge base with citations.

## Current Version

`v2.0.0-example`

This example follows the CityUInfo v2 architecture shape: a Pages-style frontend assumption, Worker APIs, reviewed knowledge base flow, and rollback-friendly deployment. It is not a production data export.

## What This Repository Contains

- A runnable Cloudflare Worker demo with mock documents and source-grounded chat.
- A generic campus template under `templates/campus-template`.
- A desensitized `examples/cityuinfo` configuration and mock seed documents.
- Supabase schema scaffolding for reviewed documents, chunks, questions, and feedback.
- Public documentation for architecture, release policy, deployment, privacy, and adaptation.
- A production-to-open-source sync log so small production changes are not forgotten.

## What This Repository Does Not Contain

- Real university PDFs or private source materials.
- API keys, service-role keys, Cloudflare tokens, GitHub tokens, or AI provider keys.
- Production admin credentials.
- Private usage logs or personally identifiable user data.

## Recommended Project Relationship

```text
open-campus-kb
- Open-source framework
- Generic code, docs, schema, and examples
- Stable public releases

examples/cityuinfo
- Mock CityUInfo configuration
- Fake seed documents
- Demonstrates how another campus can adapt the framework

Production site
- Real deployment
- Real reviewed materials and operations
- Fast iteration and bug fixes
```

## Repository Layout

```text
open-campus-kb/
  worker/                         runnable mock Worker
  templates/campus-template/       generic starter template
  examples/cityuinfo/              desensitized example
  scripts/                         seed and release checks
  supabase/                        schema scaffold
  docs/                            architecture and operator docs
  .env.example
  wrangler.example.jsonc
```

## Run The Example

```bash
npm install
npm run check
npm run preview
```

Then open `http://127.0.0.1:8788`. The default Worker serves:

- `/` source-grounded mock Q&A
- `/kb/` reviewed mock knowledge cards
- `/upload/` upload review flow demo
- `/about/` project and safety explanation
- `/api/chat` mock retrieval answer API
- `/api/upload` mock pending-upload API
- `/api/documents` mock document API
- `/health` health check

The example intentionally works without OpenRouter, Supabase, R2, Turnstile, or a login system. Production deployments should replace the mock retrieval with a real vector store and reviewed ingestion pipeline.

If you specifically want to test Cloudflare Wrangler locally, use:

```bash
npm run dev
```

## Generate Seed JSON

```bash
npm run seed:example
```

This reads `examples/cityuinfo/seed-documents/*.md` and prints JSON that can be adapted into a real seed/import process.

## Release Readiness Check

```bash
npm run check:release
```

The release check verifies required files, Worker syntax, example seed parsing, and common secret patterns. It is a guardrail, not a substitute for manual review.

## Adapt For Your Campus

Start with `docs/adaptation-guide.md` and `templates/campus-template`.

The short path is:

1. Copy the generic template.
2. Rename the project, domain, categories, and trust tiers.
3. Replace mock seed documents with reviewed public examples.
4. Configure Supabase, R2, AI provider, and Turnstile in your own deployment environment.
5. Keep private documents, admin credentials, and production logs out of the public repository.

## Status

This is a runnable local example plus schema and documentation scaffold. Production CityUInfo remains a fast-moving reference implementation; OpenCampusKB should receive stable, generalized features only.
