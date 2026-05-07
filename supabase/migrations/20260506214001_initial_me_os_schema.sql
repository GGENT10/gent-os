create extension if not exists pgcrypto with schema extensions;

create schema if not exists app_private;

create type public.goal_status as enum ('active', 'paused', 'completed', 'archived');
create type public.milestone_status as enum ('planned', 'active', 'done', 'skipped');
create type public.ai_message_role as enum ('system', 'user', 'assistant', 'tool');
create type public.ai_tool_call_status as enum ('pending', 'running', 'succeeded', 'failed', 'cancelled');

create or replace function app_private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  status public.goal_status not null default 'active',
  horizon text,
  progress integer not null default 0 check (progress between 0 and 100),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);

create table public.goal_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid not null references public.goals(id) on delete cascade,
  key text not null,
  title text not null,
  kind text not null,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (goal_id, key)
);

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid not null references public.goals(id) on delete cascade,
  title text not null,
  status public.milestone_status not null default 'planned',
  due_at timestamptz,
  completed_at timestamptz,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.goal_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid not null references public.goals(id) on delete cascade,
  milestone_id uuid references public.milestones(id) on delete set null,
  happened_at timestamptz not null default now(),
  kind text not null,
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  entry_date timestamptz not null default now(),
  title text,
  body text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journal_goals (
  journal_entry_id uuid not null references public.journal_entries(id) on delete cascade,
  goal_id uuid not null references public.goals(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (journal_entry_id, goal_id)
);

create table public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'Untitled conversation',
  is_pinned boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role public.ai_message_role not null,
  content text,
  parts jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_tool_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  conversation_id uuid references public.ai_conversations(id) on delete cascade,
  message_id uuid references public.ai_messages(id) on delete set null,
  tool_call_id text not null unique,
  tool_name text not null,
  status public.ai_tool_call_status not null default 'pending',
  input jsonb not null,
  output jsonb,
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.app_audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor text not null,
  action text not null,
  subject_table text,
  subject_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index goals_user_status_idx on public.goals(user_id, status);
create index goal_modules_user_goal_idx on public.goal_modules(user_id, goal_id);
create index milestones_user_goal_idx on public.milestones(user_id, goal_id);
create index milestones_user_status_idx on public.milestones(user_id, status);
create index goal_events_user_happened_idx on public.goal_events(user_id, happened_at desc);
create index goal_events_goal_happened_idx on public.goal_events(goal_id, happened_at desc);
create index journal_entries_user_date_idx on public.journal_entries(user_id, entry_date desc);
create index journal_entries_goal_idx on public.journal_entries(goal_id);
create index journal_goals_user_idx on public.journal_goals(user_id);
create index ai_conversations_user_updated_idx on public.ai_conversations(user_id, updated_at desc);
create index ai_messages_conversation_created_idx on public.ai_messages(conversation_id, created_at);
create index ai_messages_user_created_idx on public.ai_messages(user_id, created_at desc);
create index ai_tool_calls_user_status_idx on public.ai_tool_calls(user_id, status);
create index app_audit_events_user_created_idx on public.app_audit_events(user_id, created_at desc);

create or replace function app_private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function app_private.handle_new_user();

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'goals',
    'goal_modules',
    'milestones',
    'goal_events',
    'journal_entries',
    'journal_goals',
    'ai_conversations',
    'ai_messages',
    'ai_tool_calls',
    'app_audit_events'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end;
$$;

create policy "profiles_select_own" on public.profiles
  for select using ((select auth.uid()) = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles
  for update using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "goals_owner_all" on public.goals
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "goal_modules_owner_all" on public.goal_modules
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "milestones_owner_all" on public.milestones
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "goal_events_owner_all" on public.goal_events
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "journal_entries_owner_all" on public.journal_entries
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "journal_goals_owner_all" on public.journal_goals
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "ai_conversations_owner_all" on public.ai_conversations
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "ai_messages_owner_all" on public.ai_messages
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "ai_tool_calls_owner_all" on public.ai_tool_calls
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "app_audit_events_owner_all" on public.app_audit_events
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function app_private.set_updated_at();
create trigger goals_set_updated_at before update on public.goals
  for each row execute function app_private.set_updated_at();
create trigger goal_modules_set_updated_at before update on public.goal_modules
  for each row execute function app_private.set_updated_at();
create trigger milestones_set_updated_at before update on public.milestones
  for each row execute function app_private.set_updated_at();
create trigger goal_events_set_updated_at before update on public.goal_events
  for each row execute function app_private.set_updated_at();
create trigger journal_entries_set_updated_at before update on public.journal_entries
  for each row execute function app_private.set_updated_at();
create trigger ai_conversations_set_updated_at before update on public.ai_conversations
  for each row execute function app_private.set_updated_at();
create trigger ai_messages_set_updated_at before update on public.ai_messages
  for each row execute function app_private.set_updated_at();
create trigger ai_tool_calls_set_updated_at before update on public.ai_tool_calls
  for each row execute function app_private.set_updated_at();

grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
