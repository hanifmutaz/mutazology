-- ============================================================================
-- MUTAZOLOGY — PostgreSQL schema for Supabase
-- the study of a mind in progress.
-- ----------------------------------------------------------------------------
-- Run in the Supabase SQL editor, or place in supabase/migrations/ and
-- `supabase db push`. Then run seed.sql. Finally insert your admin uid into
-- app_admins (see README).
-- ============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;   -- fast fuzzy / ILIKE search

-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------
create type content_status as enum ('draft','published','archived','scheduled');
create type content_kind   as enum ('thought','reflection','observation','principle');

-- ---------------------------------------------------------------------------
-- LOOKUP TABLES
-- ---------------------------------------------------------------------------
create table categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  slug        text not null unique,
  description text,
  sort_order  int  default 0,
  created_at  timestamptz default now()
);

create table moods (
  id     uuid primary key default uuid_generate_v4(),
  name   text not null unique,
  slug   text not null unique,
  color  text not null default '#6b6862'
);

create table tags (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- CONTENT TABLES (one per kind + a unifying view)
-- ---------------------------------------------------------------------------
create table thoughts (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  title        text not null,
  body         text not null,
  category_id  uuid references categories(id) on delete set null,
  mood_id      uuid references moods(id)      on delete set null,
  status       content_status not null default 'draft',
  featured     boolean not null default false,
  views        bigint  not null default 0,
  metadata     jsonb   not null default '{}'::jsonb,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table reflections (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  title        text not null,
  subtitle     text,
  cover_image  text,
  body         text not null,
  reading_time int,
  category_id  uuid references categories(id) on delete set null,
  mood_id      uuid references moods(id)      on delete set null,
  status       content_status not null default 'draft',
  featured     boolean not null default false,
  views        bigint  not null default 0,
  metadata     jsonb   not null default '{}'::jsonb,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table observations (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  body         text not null,
  category_id  uuid references categories(id) on delete set null,
  mood_id      uuid references moods(id)      on delete set null,
  status       content_status not null default 'draft',
  featured     boolean not null default false,
  views        bigint  not null default 0,
  published_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table principles (
  id           uuid primary key default uuid_generate_v4(),
  number       int  not null unique,
  slug         text not null unique,
  title        text not null,
  statement    text not null,
  explanation  text,
  category_id  uuid references categories(id) on delete set null,
  status       content_status not null default 'published',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- POLYMORPHIC TAGGING
-- ---------------------------------------------------------------------------
create table content_tags (
  content_kind content_kind not null,
  content_id   uuid not null,
  tag_id       uuid not null references tags(id) on delete cascade,
  primary key (content_kind, content_id, tag_id)
);
create index idx_content_tags_tag on content_tags(tag_id);

-- ---------------------------------------------------------------------------
-- RELATED CONTENT / EVOLUTION
-- ---------------------------------------------------------------------------
create table related_content (
  id         uuid primary key default uuid_generate_v4(),
  from_kind  content_kind not null,
  from_id    uuid not null,
  to_kind    content_kind not null,
  to_id      uuid not null,
  relation   text not null default 'evolves_into',
  step_order int  default 0,
  note       text,
  created_at timestamptz default now()
);
create index idx_related_from on related_content(from_kind, from_id);

-- ---------------------------------------------------------------------------
-- VIEWS + MEDIA
-- ---------------------------------------------------------------------------
create table views (
  id           bigint generated always as identity primary key,
  content_kind content_kind not null,
  content_id   uuid not null,
  session_hash text,
  referrer     text,
  created_at   timestamptz default now()
);
create index idx_views_content on views(content_kind, content_id);
create index idx_views_created on views(created_at);

create table media (
  id         uuid primary key default uuid_generate_v4(),
  path       text not null,
  alt        text,
  width      int,
  height     int,
  mime       text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------------
create index idx_thoughts_status    on thoughts(status, published_at desc);
create index idx_thoughts_featured  on thoughts(featured) where featured;
create index idx_thoughts_cat       on thoughts(category_id);
create index idx_thoughts_mood      on thoughts(mood_id);
create index idx_thoughts_trgm      on thoughts using gin (title gin_trgm_ops, body gin_trgm_ops);
create index idx_reflections_status on reflections(status, published_at desc);
create index idx_reflections_trgm   on reflections using gin (title gin_trgm_ops, body gin_trgm_ops);
create index idx_observations_status on observations(status, published_at desc);
create index idx_principles_number   on principles(number);

-- ---------------------------------------------------------------------------
-- UNIFIED SEARCH / TIMELINE VIEW
-- ---------------------------------------------------------------------------
create or replace view content_index as
  select 'thought'::content_kind kind, id, slug, title,
         left(body,200) excerpt, category_id, mood_id, status,
         coalesce(published_at, created_at) at_date, views
    from thoughts
  union all
  select 'reflection', id, slug, title, coalesce(subtitle, left(body,200)),
         category_id, mood_id, status, coalesce(published_at, created_at), views
    from reflections
  union all
  select 'observation', id, slug, left(body,60), left(body,200),
         category_id, mood_id, status, coalesce(published_at, created_at), views
    from observations
  union all
  select 'principle', id, slug, title, statement,
         category_id, null, status, created_at, 0
    from principles;

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger t_thoughts    before update on thoughts    for each row execute function touch_updated_at();
create trigger t_reflections before update on reflections for each row execute function touch_updated_at();
create trigger t_principles  before update on principles  for each row execute function touch_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
create table app_admins ( user_id uuid primary key );  -- insert your admin uid

alter table thoughts     enable row level security;
alter table reflections  enable row level security;
alter table observations enable row level security;
alter table principles   enable row level security;
alter table categories   enable row level security;
alter table moods        enable row level security;
alter table tags         enable row level security;
alter table content_tags enable row level security;
alter table related_content enable row level security;
alter table media        enable row level security;
alter table views        enable row level security;

create or replace function is_admin() returns boolean as $$
  select exists(select 1 from app_admins where user_id = auth.uid());
$$ language sql security definer stable;

-- public read of published content
create policy pub_read_thoughts    on thoughts    for select using (status='published' or is_admin());
create policy pub_read_reflections on reflections for select using (status='published' or is_admin());
create policy pub_read_observations on observations for select using (status='published' or is_admin());
create policy pub_read_principles  on principles  for select using (status='published' or is_admin());
create policy pub_read_cats  on categories  for select using (true);
create policy pub_read_moods on moods       for select using (true);
create policy pub_read_tags  on tags        for select using (true);
create policy pub_read_ctags on content_tags for select using (true);
create policy pub_read_rel   on related_content for select using (true);
create policy pub_read_media on media       for select using (true);

-- admin write everything
create policy admin_thoughts    on thoughts    for all using (is_admin()) with check (is_admin());
create policy admin_reflections on reflections for all using (is_admin()) with check (is_admin());
create policy admin_observations on observations for all using (is_admin()) with check (is_admin());
create policy admin_principles  on principles  for all using (is_admin()) with check (is_admin());
create policy admin_cats  on categories  for all using (is_admin()) with check (is_admin());
create policy admin_moods on moods       for all using (is_admin()) with check (is_admin());
create policy admin_tags  on tags        for all using (is_admin()) with check (is_admin());
create policy admin_ctags on content_tags for all using (is_admin()) with check (is_admin());
create policy admin_rel   on related_content for all using (is_admin()) with check (is_admin());
create policy admin_media on media       for all using (is_admin()) with check (is_admin());

-- views: anyone may insert one row; only admin reads raw analytics
create policy insert_view on views for insert with check (true);
create policy admin_read_views on views for select using (is_admin());
