# CityUInfo Example

This is a public example configuration for adapting OpenCampusKB to a campus-specific assistant.

It is inspired by the CityUInfo production site, but it intentionally uses mock content only.

## What This Example Shows

- Three-language UI copy: Simplified Chinese, Traditional Chinese, English
- Campus-specific categories
- Source trust tiers
- Reviewed seed documents
- Example homepage empty-chat text
- Disclaimer and privacy copy
- Mock source-grounded Q&A without external model calls
- Upload review flow shape without storing real files
- A Pages-style Next `app/` frontend similar to the current CityUInfo production structure
- A Worker API boundary for `/api/chat`, `/api/upload`, feedback, and email notification mocks

## What This Example Does Not Include

- Real CityU PDFs
- Real CSSAUG documents
- Private emails or screenshots
- Production database rows
- Admin credentials
- API keys

## How To Adapt

1. Copy `campus.config.example.json`.
2. Replace the campus name, domain, categories, and source trust labels.
3. Replace `seed-documents/*.md` with your own reviewed example content.
4. Keep official source links and applicable years in metadata.
5. Deploy with your own Supabase, Cloudflare, and AI provider secrets.

## Local Demo

From the repository root:

```bash
npm install
npm run check
npm run app:dev
```

For a production-shaped split, run `npm run dev` for the Worker API and `NEXT_PUBLIC_OPEN_CAMPUS_API_BASE=http://127.0.0.1:8788 npm run app:dev` for the Pages frontend.

The demo embeds this example data and provides mock API endpoints. It is meant for product shape and onboarding, not answer quality benchmarking.
