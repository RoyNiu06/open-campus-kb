# Contributing

Thanks for considering a contribution to OpenCampusKB.

## Good First Contributions

- Improve documentation.
- Add generic tests or release checks.
- Improve accessibility and mobile layout.
- Add provider-agnostic ingestion examples.
- Improve example seed documents without adding real private materials.

## Boundaries

Please do not submit:

- Real student records.
- Private emails, screenshots, or internal documents.
- API keys, tokens, or credentials.
- Campus-specific material that cannot be reused safely.

## Development

```bash
npm install
npm run check
npm run seed:example
npm run check:release
```

Keep changes small and explain whether they affect the generic framework, the CityUInfo example, or documentation only.
