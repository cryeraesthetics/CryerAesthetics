-- Cryer Aesthetics — initial schema.
-- Run this once in your Supabase project (SQL Editor -> New query -> paste -> Run),
-- or via `supabase db push` if you use the Supabase CLI. See SETUP.md.

-- ─── profiles ───────────────────────────────────────────────────────────
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  skin_type text,
  concerns text[] not null default '{}',
  custom_concerns text[] not null default '{}',
  notes text not null default '',
  am_time text not null default '07:30',
  pm_time text not null default '21:30',
  remind_am boolean not null default false,
  remind_pm boolean not null default false,
  push_on boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles: owner select" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles: owner upsert" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles: owner update" on public.profiles for update using (auth.uid() = user_id);

-- ─── subscriptions ──────────────────────────────────────────────────────
-- One row per user. Written by the (mock) checkout flow — no real payment
-- processor is connected, so this simply records the plan the UI shows as
-- purchased. See src/screens/Payment.tsx.
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text not null check (plan in ('monthly', 'annual')),
  status text not null default 'active' check (status in ('active', 'canceled')),
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
create policy "subscriptions: owner select" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions: owner upsert" on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "subscriptions: owner update" on public.subscriptions for update using (auth.uid() = user_id);

-- ─── shelf_items ────────────────────────────────────────────────────────
create table if not exists public.shelf_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('preset', 'custom', 'photo')),
  ref_id text,
  name text not null default '',
  active text,
  photo_url text,
  reading boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.shelf_items enable row level security;
create policy "shelf_items: owner all" on public.shelf_items for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── diary_entries ──────────────────────────────────────────────────────
create table if not exists public.diary_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  entry_date text not null,
  note text not null default '',
  symptoms jsonb not null default '{"dryness":0,"redness":0,"breakouts":0,"oiliness":0}',
  photo_url text,
  created_at timestamptz not null default now()
);
alter table public.diary_entries enable row level security;
create policy "diary_entries: owner all" on public.diary_entries for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── reviews ────────────────────────────────────────────────────────────
-- Publicly readable (the Reviews screen has no membership gate); only the
-- signed-in author can write their own row.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null default 'You',
  rating int not null check (rating between 1 and 5),
  tag text not null default 'Member review',
  text text not null default '',
  photo_url text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create policy "reviews: public select" on public.reviews for select using (true);
create policy "reviews: owner insert" on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews: owner delete" on public.reviews for delete using (auth.uid() = user_id);

create table if not exists public.review_helpful_votes (
  review_id uuid not null references public.reviews (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (review_id, user_id)
);
alter table public.review_helpful_votes enable row level security;
create policy "review_helpful_votes: public select" on public.review_helpful_votes for select using (true);
create policy "review_helpful_votes: owner insert" on public.review_helpful_votes for insert with check (auth.uid() = user_id);
create policy "review_helpful_votes: owner delete" on public.review_helpful_votes for delete using (auth.uid() = user_id);

create table if not exists public.review_reports (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);
alter table public.review_reports enable row level security;
create policy "review_reports: owner select" on public.review_reports for select using (auth.uid() = user_id);
create policy "review_reports: owner insert" on public.review_reports for insert with check (auth.uid() = user_id);

-- ─── ask_messages ───────────────────────────────────────────────────────
-- "Ask about your skin" thread history (Annual Pro). The answers themselves
-- are generated by a rule-based mock — see src/lib/askMock.ts — since no
-- LLM API key is configured yet.
create table if not exists public.ask_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  text text not null,
  created_at timestamptz not null default now()
);
alter table public.ask_messages enable row level security;
create policy "ask_messages: owner all" on public.ask_messages for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── contact_messages ───────────────────────────────────────────────────
-- "Email Us" submissions. No email-sending provider is configured yet, so
-- this just durably records the message; check the table in Supabase (or
-- wire up an Edge Function + email provider later) to actually respond.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null default '',
  email text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "contact_messages: anyone insert" on public.contact_messages for insert with check (true);
create policy "contact_messages: owner select" on public.contact_messages for select using (auth.uid() = user_id);

-- ─── storage ────────────────────────────────────────────────────────────
-- One public bucket for user-uploaded photos (diary progress photos, shelf
-- product photos, review photos). Files are keyed by `${auth.uid()}/...` so
-- only the owner can write into their own folder; read is public since
-- review photos need to render for every visitor.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media: public read" on storage.objects for select using (bucket_id = 'media');
create policy "media: owner insert" on storage.objects for insert
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media: owner delete" on storage.objects for delete
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
