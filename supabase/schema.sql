-- Moosephone database schema
-- Run this in the Supabase SQL editor to set up your tables

-- Orders table
create table orders (
  id uuid primary key default gen_random_uuid(),
  model text not null,
  quantity integer not null check (quantity > 0 and quantity <= 50),
  extensions jsonb not null default '[]',
  price_per_phone numeric(10,2) not null,
  total_price numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'provisioning', 'shipped', 'active')),
  stripe_session_id text unique,
  stripe_subscription_id text unique,
  customer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Phones inventory table
create table phones (
  id uuid primary key default gen_random_uuid(),
  mac_address text not null unique,
  model text not null,
  order_id uuid references orders(id) on delete set null,
  assigned_to text,
  assigned_extension text,
  status text not null default 'available' check (status in ('available', 'assigned', 'active')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

create trigger phones_updated_at
  before update on phones
  for each row execute function update_updated_at();

-- Indexes
create index idx_orders_status on orders(status);
create index idx_orders_stripe_session on orders(stripe_session_id);
create index idx_phones_status on phones(status);
create index idx_phones_mac on phones(mac_address);
create index idx_phones_order on phones(order_id);

-- Row Level Security
alter table orders enable row level security;
alter table phones enable row level security;

-- Service role can do everything (used by API routes)
create policy "Service role full access on orders"
  on orders for all
  using (true)
  with check (true);

create policy "Service role full access on phones"
  on phones for all
  using (true)
  with check (true);
