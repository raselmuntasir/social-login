create table if not exists settings (
  id bigint primary key generated always as identity,
  key text unique not null,
  value text not null,
  updated_at timestamp with time zone default now()
);

insert into settings (key, value) values 
('steadfast_api_key', '1m9mwrrwsjbrg0w'),
('steadfast_secret_key', 'y196ftazvk9s3')
on conflict (key) do nothing;
