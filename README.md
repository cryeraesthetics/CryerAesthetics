# Cryer Aesthetics

A membership-based skin care companion app: personalized skin type
regimens, a guided skin analysis, motivational tips, curated GreenEnvee
product recommendations, reviews, booking, and a monthly subscription for
full access.

## Tech stack

- **Next.js (App Router) + TypeScript + Tailwind CSS v4**
- **Prisma + SQLite** for data (users, subscriptions, quiz results, reviews, contact messages)
- **Auth.js (NextAuth v5)** — email/password credentials auth
- **Stripe** — subscription checkout, billing portal, and webhooks (test mode by default)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file and fill in the values:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL` — defaults to a local SQLite file, no setup needed.
   - `AUTH_SECRET` — generate one with `npx auth secret`.
   - `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID` / `STRIPE_WEBHOOK_SECRET` — from your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) in **test mode**. Create a recurring monthly Price for your membership product and use its ID for `STRIPE_PRICE_ID`.
   - `NEXT_PUBLIC_BOOKING_URL` — optional link to an external scheduling tool (e.g. Calendly) shown on the Book Now page.
   - `NEXT_PUBLIC_BOOK_LINK` — link to your book (Amazon, publisher page, etc.), shown on the "The Book" page.

3. Set up the database:

   ```bash
   npx prisma db push
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000.

5. To test the full subscription flow locally, forward Stripe webhooks with
   the [Stripe CLI](https://stripe.com/docs/stripe-cli):

   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

   Copy the printed webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## How membership gating works

- Marketing pages (home, about, contact, book now, subscribe, my book,
  skin type overviews, FAQs) are public.
- Full regimens, do's/don'ts, GreenEnvee product picks, and posting
  reviews require an **active subscription** — these sections show a
  blurred preview with a "Join Cryer Aesthetics" call to action for
  non-members (see `components/PaywallGate.tsx`).
- `/account` requires being logged in (enforced in `middleware.ts`).
- Subscription status is synced from Stripe via the webhook at
  `/api/stripe/webhook` and stored on the `User` model.

## Content you'll likely want to customize

- `data/skinTypes.ts` — regimens, do's/don'ts, FAQs, and GreenEnvee product
  categories per skin type.
- `data/tips.ts` — motivational tips and quotes.
- `app/about/page.tsx` — your bio and story.
- `public/images/skin-types/*.svg` — placeholder illustrations; swap in
  real photography whenever you're ready.
- GreenEnvee links currently point to `https://greenenvee.com` — update
  `components/ProductRecs.tsx` if you get specific product URLs or an
  affiliate feed from them.

## Payments & security notes

- Card data is never touched by this app — Stripe Checkout and the Stripe
  Billing Portal handle all payment collection and storage (PCI
  compliant out of the box).
- Passwords are hashed with bcrypt before storage.
- Stripe webhook requests are verified against `STRIPE_WEBHOOK_SECRET`
  before being trusted.
