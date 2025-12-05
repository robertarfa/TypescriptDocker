drop schema if exists public;
create schema public;
-- drop table public.account;

create table public.account (
    account_id uuid primary key,
    name text,
    email text,
    document text,
    password text
);

create table public.account_asset (
	account_id uuid,
	asset_id text,
	quantity numeric,
	primary key (account_id, asset_id)
);

-- create table public.deposit (
--     deposit_id uuid primary key,
--     account_id uuid references public.account(account_id),
--     asset_id text,
--     quantity numeric
-- );

-- create table public.withdraw (
--     withdraw_id uuid primary key,
--     account_id uuid references public.account(account_id),
--     asset_Id text,
--     quantity numeric
-- );