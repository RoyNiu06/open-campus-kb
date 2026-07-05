# Production Sync Log

This file remembers CityUInfo production changes that may later be extracted into OpenCampusKB.

The production site can move faster than the open-source framework. Record small production changes here, then batch them into a future OpenCampusKB release when they are stable and generic.

## 2026-07-05 v2.4.0 Example Sync

- Synced the open-source CityUInfo example toward the current production architecture: Next `app/` frontend on Pages plus Worker `/api/*`.
- Added generic UI examples for citation numbering, relevance score chips, reactions, feedback entry points, update notification email binding, and file/text/link uploads.
- Kept production-only data, real PDFs, admin credentials, logs, and service secrets out of the open-source repo.

## 2026-07-04 v2 Shape

- CityUInfo production moved to a Pages frontend with Worker `/api/*` backend.
- Added an email update notification subscription flow.
- Kept Worker legacy frontend as rollback path.
- OpenCampusKB example updated to a runnable v2-shaped mock Worker without production data.

## Baseline

- Open-source scaffold created from CityUInfo production baseline `v1.3.1`.
- Production repository latest referenced commits at scaffold time:
  - `af104bb` Add configurable empty chat text
  - `3eb5632` Paginate daily usage rows
  - `b892c72` Trim about page update log
  - `c19407d` Improve daily usage row view
  - `71c0c17` Add admin ingestion retry override
  - `c9fcc60` Fix R2 document ingestion

## Pending Generic Extraction

- Configurable homepage empty-chat text per locale.
- Daily usage snapshot rows rendered as paginated tables sorted by request count.
- R2-first file download for ingestion with Supabase fallback.
- Admin ingestion retry override for stuck processing tasks.
- Ingestion failure state recovery when file download fails.
- Recent two-release display on public About page, with full changelog stored in repository docs.

## Sync Rule

Do not sync every production commit. Use this rule:

- Bug fixes in generic infrastructure: consider extracting soon.
- CityU-only text, categories, CSSAUG labels, real files, and operational content: keep production-only.
- UI polish: batch into an open-source release only if it improves the reusable framework.
