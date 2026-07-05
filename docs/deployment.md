# Deployment Guide

OpenCampusKB can run in two modes.

## Example Mode

Example mode is the default in this repository.

```bash
npm install
npm run check
npm run app:dev
```

The default app demo uses the Next `app/` frontend with embedded mock data and a safe local API fallback. It does not require Supabase, R2, Turnstile, OpenRouter, or authentication.

To mirror the production split locally, run the Worker API in one terminal:

```bash
npm run dev
```

Then point the frontend at that API in another terminal:

```bash
NEXT_PUBLIC_OPEN_CAMPUS_API_BASE=http://127.0.0.1:8788 npm run app:dev
```

To prepare static output for Cloudflare Pages:

```bash
npm run pages:build
```

The legacy all-in-one Worker preview remains available:

```bash
npm run preview
```

## Production Mode

A production deployment usually needs:

- Cloudflare Pages or another static frontend host.
- Cloudflare Workers for API routes.
- Cloudflare R2 or another object store for uploaded files.
- Supabase Postgres with `pgvector` for documents, chunks, questions, and usage logs.
- AI provider API keys for embeddings and chat completion.
- Turnstile or another human verification service for public uploads.

## Suggested Environment Variables

Use `.env.example` as the source of truth for expected secret names. Do not commit `.env` or `.dev.vars`.

Recommended server-side secrets:

- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENROUTER_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `GITHUB_DISPATCH_TOKEN`

Recommended public variables:

- `PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TURNSTILE_SITE_KEY`

## Cloudflare Worker Dry Run

```bash
npx wrangler deploy --config wrangler.example.jsonc --dry-run
```

Dry run should succeed before publishing a release.

## Cloudflare Pages Build

Suggested Pages settings for the example frontend:

- Build command: `npm run pages:build`
- Output directory: `out`
- Public API variable for split deployments: `NEXT_PUBLIC_OPEN_CAMPUS_API_BASE`

For same-domain production, route `/api/*` to the Worker and leave the frontend static on Pages.

## Rollback Strategy

For production sites, keep the previous Worker or Pages deployment available until the new deployment has passed:

- home page check
- knowledge page check
- upload page check
- chat API check
- document download or preview check
- admin review check
