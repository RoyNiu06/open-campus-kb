# Supabase

This folder contains generic database schema, migrations, and RLS notes.

`migrations/0001_open_campus_kb_schema.sql` creates:

- anonymous sessions
- reviewed documents
- document chunks with embeddings
- questions
- feedback
- core indexes and service-role grants

The schema uses the `ockb_` prefix so it can coexist with other public tables in a shared Supabase project during experiments.

The example Worker does not require Supabase to run locally. Use the migration when you are ready to wire a real backend.

Do not commit project-specific service keys or production data.
