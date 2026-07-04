# Security And Privacy

OpenCampusKB should be deployed with conservative defaults.

## Never Commit

- AI provider keys
- Supabase service-role keys
- Cloudflare API tokens
- GitHub personal access tokens
- Admin passwords
- Real student documents containing personal data

## Upload Safety

- Use human verification for public uploads.
- Limit file size and supported extensions.
- Keep uploaded documents pending until reviewed.
- Remove private information before publishing.
- Store source type, applicable year, and review status.

## RAG Safety

- Retrieved chunks are data, not trusted instructions.
- System prompts should explicitly ignore instructions inside documents.
- Answers should distinguish sourced facts from model inference.

