-- Waitlist table for the early-access form.
-- Run once: Supabase dashboard → SQL Editor → New query → paste → Run.
-- (Or with the Supabase CLI: `supabase db push`.)

create table if not exists public.waitlist (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  -- who
  role             text not null check (role in ('student', 'parent', 'agency')),
  contact          text not null,   -- normalized: @telegram (lowercase), +E164 phone, or lowercase email
  contact_type     text not null check (contact_type in ('telegram', 'phone', 'email')),
  full_name        text,
  org_name         text,            -- agencies only
  students_band    text check (students_band in ('1-10', '11-30', '31-100', '100+')),  -- agencies only
  interests        text[] not null default '{}',   -- hungary, turkiye, korea, germany, unsure

  -- where from
  locale           text not null check (locale in ('uz', 'ru', 'en')),
  source           text,            -- utm_source
  medium           text,            -- utm_medium
  campaign         text,            -- utm_campaign

  -- consent (kept so you can show what the person agreed to, and when)
  consent_at       timestamptz not null,
  consent_version  text not null,

  -- for your own workflow in the Table Editor
  status           text not null default 'new'
                     check (status in ('new', 'contacted', 'invited', 'unsubscribed')),
  notes            text,

  constraint waitlist_contact_len check (char_length(contact) between 3 and 120),
  constraint waitlist_contact_unique unique (contact)
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_role_idx on public.waitlist (role);

-- Lock the table down.
-- Row Level Security is ON and there are NO policies, so the public
-- (publishable / anon) key can neither read nor write this table.
-- Only the server action, which uses the SECRET key, can insert rows
-- (the secret key bypasses RLS). Never expose that key to the browser.
alter table public.waitlist enable row level security;
revoke all on public.waitlist from anon, authenticated;
