# Worker

This folder contains the generic Cloudflare Worker runtime for OpenCampusKB.

The CityUInfo production Worker is intentionally not copied here verbatim. The production file includes site-specific copy, operational shortcuts, and historical compatibility patches. Generic behavior should be extracted into this folder gradually.

The current example Worker exposes:

- `/health`
- `/api/config`
- `/api/documents`
- `/api/chat`
- Browser UI routes for ask, knowledge base, upload demo, and about

The mock chat endpoint performs simple keyword retrieval over embedded example documents and returns source citations. This keeps the open-source example usable without requiring an AI key.

Production deployments should replace the mock retrieval layer with:

- reviewed document storage
- text extraction and chunking
- embeddings
- vector search
- model answer generation
- rate limits and usage logging
