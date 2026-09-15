-- Adds Stripe correlation columns to subscriptions so the webhook can find
-- and update the right row for renewals, plan changes, and cancellations.
alter table public.subscriptions
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text;

create unique index if not exists subscriptions_stripe_subscription_id_key
  on public.subscriptions (stripe_subscription_id)
  where stripe_subscription_id is not null;
