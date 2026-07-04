# Campus Template

Copy this folder when starting a new OpenCampusKB deployment.

## Files

- `campus.config.json` - public project identity, locales, categories, trust tiers, and usage defaults.
- `site-settings.example.json` - editable frontend content that can later move into an admin settings table.
- `seed-documents/` - small reviewed markdown examples for initial testing.

## Adaptation Checklist

1. Rename the project and domain.
2. Replace all categories with your own campus or organization taxonomy.
3. Decide source trust tiers before accepting user uploads.
4. Replace seed documents with reviewed public examples.
5. Keep real PDFs, screenshots, emails, private logs, and credentials out of the open repository.
6. Store deployment secrets in Cloudflare, Supabase, or your hosting provider secret manager.

## Production Notes

The template is intentionally small. A real deployment should add:

- File storage such as Cloudflare R2.
- Database storage such as Supabase Postgres with pgvector.
- Upload review workflow and human verification.
- RAG ingestion queue with retry and idempotency.
- Rate limits and anonymous usage accounting.
- Admin-only operations for archive, disable, delete, and re-ingest.
