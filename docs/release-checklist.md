# Release Checklist

Use this checklist before publishing OpenCampusKB or a derived public repository.

## Automated Checks

```bash
npm run check
npm run seed:example
npm run check:release
npx wrangler deploy --config wrangler.example.jsonc --dry-run
```

## Manual Checks

- Root README explains what the project is and is not.
- The example can run without paid cloud services.
- All example documents are mock, public, and safe.
- `.env.example` contains names only, not real values.
- No API keys, tokens, passwords, or private files are committed.
- License is present.
- Security and privacy guidance is present.
- Adaptation guide is present.
- Deployment guide is present.
- Supabase schema is clearly marked as scaffold/example.
- Production-only details are not copied into the open-source repository.

## Common Release Blockers

- Mojibake or broken encoding in docs or UI strings.
- A Worker syntax error that makes every route fail.
- Real school files or screenshots accidentally included.
- Service-role keys or AI API keys committed.
- Example code requires private services before a contributor can see the product shape.
