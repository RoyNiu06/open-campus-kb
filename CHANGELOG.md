# Changelog

## v3.0.1-example - 2026-07-06

- Synced the CityUInfo example toward the current v3 architecture: Pages `app/` frontend plus Worker API.
- Added a mock Course Engine / RAG / hybrid routing shape for structured domain questions.
- Added mock streaming-compatible chat API fields, engine mode flags, relevance scores, citations, and lightweight timing fields.
- Updated the CityUInfo example config, generic template, and README docs to cover file/text/link/batch uploads, feedback, email notification, tags, and source trust tiers.
- Recorded that Cloudflare `@cf/baai/bge-m3` was evaluated as an embedding option, but the example keeps the current configurable embedding-provider pattern rather than migrating by default.
- Rewrote garbled Chinese documentation and example copy as clean UTF-8.

## v2.4.0-example - 2026-07-05

- Added a Next `app/` frontend example aligned with the current Pages + Workers production shape.
- Kept the Worker as a mock API layer for chat, uploads, feedback, email notification, documents, and status.
- Added file/text/link upload UI modes, citation numbers, relevance score chips, and lightweight reaction controls to the example.
- Updated documentation to distinguish the Pages frontend from the legacy all-in-one Worker preview.

## v2.0.0-example - 2026-07-04

- Added runnable mock Cloudflare Worker example.
- Added desensitized CityUInfo-style example configuration and seed documents.
- Added generic campus template.
- Added Supabase schema scaffold for reviewed documents, chunks, questions, and feedback.
- Added release, deployment, adaptation, security, and privacy documentation.
- Added release check script for syntax, required files, seed parsing, and common secret patterns.

## v1.3.x production reference

- CityUInfo production changes are recorded in `docs/production-sync-log.md`.
- Production-only data and operational secrets are intentionally excluded from this repository.
