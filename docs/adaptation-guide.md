# Adaptation Guide

This guide explains how to turn OpenCampusKB into a campus-specific or organization-specific knowledge assistant.

## 1. Start From The Template

Copy `templates/campus-template` into your own repository or deployment folder.

Rename:

- `project.id`
- `project.name`
- `project.domain`
- `branding`
- `categories`
- `sourceTrustTiers`

Keep the example data small and public. Do not put real private files into an open-source repository.

## 2. Define Trust Tiers

Recommended baseline:

- `institution_official` - official pages, emails, handbooks, notices.
- `recognized_group` - student union, department society, verified community organization.
- `community_notes` - peer summaries and community-maintained FAQ.

Answers should prefer higher-trust sources when multiple sources conflict.

## 3. Define Review Rules

Before a document becomes searchable, review:

- Is the source clear?
- Is the applicable year or date clear?
- Is there private personal information?
- Is the content allowed to be summarized or cited?
- Is the category correct?
- Should the document be approved, rejected, archived, disabled, or deleted?

## 4. Replace Mock Retrieval

The demo Worker uses keyword retrieval so it runs without cloud services.

Production mode should use:

- Text extraction for PDF, DOCX, TXT, Markdown, and HTML.
- Chunking with stable chunk IDs.
- Embeddings stored in a vector database.
- Retrieval scoped to approved and active documents.
- A chat model prompt that treats retrieved chunks as data, not instructions.

## 5. Keep Secrets Out Of The Browser

Only public keys may be exposed to frontend code.

Keep these in server-side secrets:

- AI provider API keys.
- Supabase service-role keys.
- Cloudflare API tokens.
- Admin passwords and session secrets.
- GitHub dispatch tokens.

## 6. Launch Safely

Before public launch:

- Run `npm run check:release`.
- Test upload limits and human verification.
- Test admin review and ingestion retry.
- Test source citations.
- Verify that no real secrets or private files exist in the repo.
- Add a clear disclaimer and feedback contact.
