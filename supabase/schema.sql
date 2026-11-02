-- Run once in the MCAT project's SQL editor. No public/anonymous study-data access.
create table if not exists public.mcat_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null default 1 check (revision > 0),
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.mcat_progress enable row level security;
revoke all on public.mcat_progress from anon, authenticated;
grant select on public.mcat_progress to authenticated;
drop policy if exists own_progress_read on public.mcat_progress;
create policy own_progress_read on public.mcat_progress for select to authenticated
  using ((select auth.uid()) = user_id);

-- Compare-and-swap prevents one device silently overwriting a newer snapshot.
create or replace function public.save_mcat_progress(p_expected_revision bigint, p_payload jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := auth.uid();
  current_revision bigint;
  next_revision bigint;
begin
  if caller is null then raise exception 'Authentication required'; end if;
  if p_expected_revision is null or p_expected_revision < 0
    or p_payload is null or p_payload->>'schema' is distinct from '1'
    or jsonb_typeof(p_payload->'values') is distinct from 'object'
    or octet_length(p_payload::text) > 2000000 then
    raise exception 'Invalid progress snapshot';
  end if;
  if exists (select 1 from jsonb_object_keys(p_payload->'values') as item(key)
    where item.key !~ '^mcat2_[a-z0-9_]+$') then
    raise exception 'Unsupported progress key';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(caller::text,0));
  select revision into current_revision from public.mcat_progress where user_id=caller;
  current_revision := coalesce(current_revision,0);
  if current_revision <> p_expected_revision then
    return jsonb_build_object('conflict',true,'revision',current_revision);
  end if;
  next_revision := current_revision+1;
  insert into public.mcat_progress(user_id,revision,payload,updated_at)
    values(caller,next_revision,p_payload,now())
    on conflict(user_id) do update set revision=excluded.revision,
      payload=excluded.payload,updated_at=excluded.updated_at;
  return jsonb_build_object('conflict',false,'revision',next_revision);
end $$;
revoke all on function public.save_mcat_progress(bigint,jsonb) from public, anon;
grant execute on function public.save_mcat_progress(bigint,jsonb) to authenticated;
