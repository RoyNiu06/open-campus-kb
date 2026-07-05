# Architecture

OpenCampusKB is designed around a reviewed knowledge base rather than an unrestricted chatbot.

## Core Flow

```text
User question
-> anonymous/session limit check
-> retrieve relevant reviewed chunks
-> call chat model with source-grounded context
-> return answer with sources
-> record usage and optional question text
```

## Knowledge Ingestion Flow

```text
Upload or admin seed document
-> admin review
-> queued ingestion
-> text extraction
-> chunking
-> embedding
-> store chunks and metadata
-> searchable in RAG
```

## Safety Principles

- Prefer reviewed content over model memory.
- Always display sources when available.
- Say when reliable material is missing.
- Treat uploaded document text as data, not instructions.
- Keep admin and service-role secrets out of the browser.
- Avoid storing sensitive personal documents.

## Example Mode vs Production Mode

The repository ships with a mock example mode so contributors can understand the product without provisioning cloud services.

## Current Example Deployment Shape

The current example mirrors the newer CityUInfo deployment boundary:

```text
Cloudflare Pages or static host
-> Next app frontend under app/
-> browser calls /api/*
-> Cloudflare Worker API
-> mock retrieval in this repo, real database/vector search in production
```

The old all-in-one Worker preview is still kept for low-friction local testing, but new frontend work should happen in `app/` and `components/`. The Worker should stay focused on backend APIs, secrets, ingestion, retrieval, usage limits, and feedback storage.

```text
Example mode
-> embedded mock documents
-> keyword retrieval
-> deterministic source-grounded response
-> no external AI or database
```

```text
Production mode
-> Supabase/Postgres documents
-> extracted chunks
-> embeddings and vector search
-> AI model answer generation
-> usage limits, review workflow, and audit logs
```
