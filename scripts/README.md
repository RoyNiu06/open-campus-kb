# Scripts

This folder contains ingestion, maintenance, and release helper scripts.

## Available Scripts

```bash
npm run seed:example
npm run check:release
npm run preview
```

## `seed-example-documents.mjs`

Parses `examples/cityuinfo/seed-documents/*.md` front matter and prints a JSON document array. This is a safe example importer, not a production ingestion pipeline.

## `check-release.mjs`

Runs a lightweight release readiness check:

- required public files exist
- example JSON files parse
- Worker syntax is valid
- seed script returns documents
- common secret patterns are not present

## `serve-local.mjs`

Starts a small Node.js preview server at `http://127.0.0.1:8788`. It calls the same Worker `fetch` handler but does not require Wrangler, Cloudflare credentials, or local R2 emulation.

## Planned Production Scripts

- Parse reviewed PDF, DOC, DOCX, TXT, and Markdown files.
- Extract text and OCR image-based PDFs when needed.
- Chunk documents for retrieval.
- Generate embeddings with a configurable provider.
- Store chunks and metadata in the database.
- Mark ingestion states as queued, processing, ready, or failed.

Production-proven behavior should be generalized from CityUInfo before being added here.
