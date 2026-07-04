create extension if not exists vector;

create table if not exists public.ockb_anonymous_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_hash text not null unique,
  ip_hash text,
  user_agent_hash text,
  points integer not null default 30,
  window_started_at timestamptz,
  last_seen_at timestamptz default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.ockb_documents (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  category text not null,
  source_type text not null default 'student_notes',
  source_url text,
  file_url text,
  file_name text,
  status text not null default 'pending',
  official_source boolean not null default false,
  applicable_year text,
  language text default 'mixed',
  summary text,
  uploaded_note text,
  reviewed_by text,
  reviewed_at timestamptz,
  ingestion_status text not null default 'ready',
  ingestion_error text,
  chunk_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ockb_document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.ockb_documents(id) on delete cascade,
  chunk_index integer not null,
  chunk_text text not null,
  embedding vector(4096),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(document_id, chunk_index)
);

create table if not exists public.ockb_questions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.ockb_anonymous_sessions(id) on delete set null,
  question text not null,
  answer text,
  sources jsonb not null default '[]'::jsonb,
  model text,
  embedding_model text,
  input_tokens integer,
  output_tokens integer,
  estimated_cost_cny numeric(10, 6),
  points_used integer not null default 1,
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

create table if not exists public.ockb_feedback (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references public.ockb_questions(id) on delete cascade,
  session_id uuid references public.ockb_anonymous_sessions(id) on delete set null,
  rating text not null,
  comment text,
  created_at timestamptz not null default now()
);

alter table public.ockb_anonymous_sessions enable row level security;
alter table public.ockb_documents enable row level security;
alter table public.ockb_document_chunks enable row level security;
alter table public.ockb_questions enable row level security;
alter table public.ockb_feedback enable row level security;

grant select, insert, update, delete on
  public.ockb_anonymous_sessions,
  public.ockb_documents,
  public.ockb_document_chunks,
  public.ockb_questions,
  public.ockb_feedback
to service_role;

create index if not exists ockb_documents_status_idx on public.ockb_documents(status);
create index if not exists ockb_documents_category_idx on public.ockb_documents(category);
create index if not exists ockb_chunks_document_idx on public.ockb_document_chunks(document_id);
create index if not exists ockb_questions_created_idx on public.ockb_questions(created_at desc);
