# Cryer Aesthetics — setup

This is a React + Vite PWA implementation of the Claude Design prototype in
`project/Cryer Aesthetics App.dc.html` (see `chats/` for the full design
history). It runs without any setup — screens render and local-only state
works — but accounts, membership, and everyone's data need a Supabase
project connected.

## 1. Install and run

```
npm install
npm run dev
```

Open the printed local URL on your phone or in a narrow browser window —
the layout is mobile-first.

## 2. Connect Supabase (real accounts + database)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard: **SQL Editor → New query**, paste the contents
   of `supabase/migrations/0001_init.sql`, and run it. This creates every
   table (profiles, subscriptions, shelf items, diary entries, reviews,
   etc.), row-level-security policies scoped to each signed-in user, and a
   public `media` storage bucket for photos.
3. In **Project Settings → API**, copy the **Project URL** and the
   **anon public** key.
4. Copy `.env.example` to `.env.local` and fill in those two values:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Restart `npm run dev`. Sign-up/sign-in, the skin profile, shelf, diary,
   reviews and subscriptions now persist for real, per account.

By default Supabase requires email confirmation for new sign-ups — you can
turn that off in **Authentication → Providers → Email** while testing.

Without a `.env.local`, the app still runs: auth screens explain the
backend isn't connected yet, and member data just lives in memory for the
session instead of a database.

## 3. What's mocked, and why

A few features in the original design need a paid third-party service the
project doesn't have credentials for yet. They're built with real UI/UX —
forms, state, persistence where it makes sense — but stand in for the real
integration:

| Feature | Where | What's mocked | To make it real |
| --- | --- | --- | --- |
| Subscription checkout | `src/screens/Payment.tsx` | Any filled-in card form "succeeds" and writes a real `subscriptions` row — no card is ever charged. | Add Stripe (or another processor), replace the submit handler with a real charge/subscription call, keep the same DB write on success. |
| "Ask about your skin" | `src/lib/askMock.ts` | Rule-based canned answers keyed off the question and the member's profile, not a model call. Threads still save for real in `ask_messages`. | Swap `mockAskAnswer` for a real Claude API call (see the original prototype's system prompt in `project/Cryer Aesthetics App.dc.html` for the exact instructions to reuse) using a server-side key — never call a model API with a secret key from the browser. |
| Today's UV/humidity/air quality | `src/lib/data.ts` (`ENV`), `src/screens/myskin/TodayTab.tsx` | Fixed sample numbers, shown only after the user grants location permission (which is real). | Call a weather/AQI API with the coordinates from `navigator.geolocation` once permission is granted. |
| Shelf photo label reading | `src/lib/labelMock.ts` | The photo uploads and stores for real; the product name is left blank for the member to type instead of being read automatically. | Send the photo to a vision-capable model or OCR service and prefill the name/active ingredient. |
| Booking / appointment requests | `src/screens/BookNow.tsx` | Links straight out to the real GlossGenius booking site (no email step) — matches the latest design decision, nothing to wire up. | — |
| Email Us | `src/screens/Contact.tsx` | Message is saved for real to `contact_messages` in Supabase; no email is actually sent. | Add a Supabase Edge Function (or other backend) that sends an email via a provider (Postmark, Resend, SES) when a row is inserted. |
| Push notification reminders | `src/screens/myskin/MoreTab.tsx` | Toggle + time pickers save for real to the member's profile; nothing actually fires a notification. | Needs an installed PWA/native shell plus a push provider (Web Push, FCM/APNs). |

Everything else — auth, profiles, subscriptions/membership gating, the
shelf and routine-conflict checker, the skin diary, reviews (ratings,
photos, helpful votes, reports), the skin-type guide, FAQs, tips, books,
and the skin-consultation quiz — is fully wired to the database and not a
mock.

## 4. Project layout

```
src/
  lib/            static content + business logic (routine-check engine, mocks)
  context/        Auth, MemberDataContext (profile/subscription/shelf/diary), Checkout
  components/     shared UI (tab bar, image slots, icons, back link)
  layouts/        tabbed vs. plain page shells
  screens/        one file per screen, matching the design's screen map
  screens/myskin/ the member-only "My Skin" tab and its sub-screens
  quiz/           the standalone skin consultation quiz
supabase/migrations/0001_init.sql   full DB schema + RLS policies
```

## 5. Deploying

`npm run build` outputs a static site in `dist/` — deploy it to any static
host (Vercel, Netlify, Cloudflare Pages, GitHub Pages) with the same two
`VITE_SUPABASE_*` environment variables set at build time. The app is a
PWA (see `public/manifest.webmanifest`) so it's installable to a phone's
home screen once deployed to a real HTTPS domain.
