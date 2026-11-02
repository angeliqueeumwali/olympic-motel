
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  email text not null,
  check_in date not null,
  check_out date not null,
  guests text not null,
  room_preference text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  constraint valid_booking_dates check (check_out > check_in)
);

alter table public.bookings enable row level security;
