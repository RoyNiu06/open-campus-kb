# Changelog

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
