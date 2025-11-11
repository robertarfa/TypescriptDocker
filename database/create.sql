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