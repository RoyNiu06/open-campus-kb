# Architecture

OpenCampusKB is designed around a reviewed knowledge base rather than an unrestricted chatbot.

## Core Flow

```text
User question
-> anonymous/session limit check
-> lightweight route/rewrite step
-> Course Engine, RAG, or hybrid retrieval
-> call chat model with source-grounded context
-> stream or return answer
-> return answer with sources
-> record usage and optional question text
```

## Knowledge Ingestion Flow

```text
Upload or admin seed document
-> admin review
-> queued ingestion
-> text extraction
-> metadata header construction
-> chunking
-> embedding
-> store chunks and metadata
-> searchable in RAG
```

Short text and link submissions can be embedded as whole records after review. Long files should be chunked with title, tags, source type, publication month, source URL, and concise admin/uploader notes included in the embedding input.

## Route Layer

The production CityUInfo system introduced a route layer before retrieval. The open-source example keeps this as a mock pattern:

```text
Question
-> route/rewrite
-> structured domain engine for precise structured questions
-> RAG for general document questions
-> hybrid when both structured facts and document evidence are useful
```

The CityUInfo example calls this structured path `Course Engine` because it handles programme and course data. In other deployments, the same idea can become a policy engine, product catalog engine, runbook engine, customer-support workflow engine, or any other domain engine that benefits from structured records.

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
-> optional structured domain engine
-> optional hybrid retrieval and reranking
-> AI model answer generation
-> usage limits, review workflow, and audit logs
```
