# Cryer Aesthetics

A skincare consultation and membership app for Cryer Aesthetics — a skin quiz, a full skin-type guide, and a members-only skin profile with routine tracking, a progress diary, and more.

**Live app:** https://stately-otter-189628.netlify.app

## What's in the app

- **Skin consultation quiz** — a 2-minute quiz that recommends a starting treatment and products
- **Skin Guide** — AM/PM regimens, do's & don'ts, and FAQs for all 5 skin types (members)
- **FAQ** — answers about the app, membership, and appointments
- **Client Reviews** — star ratings, photos, verified-subscriber badges, sorting and reporting
- **My Skin** (members) — skin profile, today's UV/humidity/air quality, a product shelf with an automatic routine-conflict checker, an "Ask about your skin" tool, a progress diary, layering guide, application guides, and seasonal kits
- **Membership** — Monthly Basic ($7.99/mo) and Annual Pro ($59.99/yr) plans
- **Book Now**, **About**, **Email Us**, and **My Books** sections

Real accounts and data are powered by [Supabase](https://supabase.com) — signing up, subscribing, and everything in My Skin persists for real, per account.

## Tech stack

- React + TypeScript + Vite
- React Router
- Supabase (auth, database, storage)
- Deployed on Netlify

## Getting started (for development)

```
npm install
npm run dev
```

To connect your own Supabase project (needed for accounts/membership to work), see **[SETUP.md](./SETUP.md)** — it walks through creating a Supabase project, running the database migration in `supabase/migrations/`, and setting the two environment variables the app needs.

## What's mocked right now

A few features stand in for real third-party integrations that aren't connected yet (subscription payments, the "Ask about your skin" answers, live weather data, and reading product labels from photos). Each one is explained — including exactly what a real integration would need — in the table in **SETUP.md**.

## Deploying

`npm run build` produces a static site in `dist/`, deployable to Netlify, Vercel, or any static host, with the same two Supabase environment variables set at build time.
