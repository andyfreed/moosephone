# Moosephone

Moosephone is a Next.js site for configuring a phone plan and completing checkout with Stripe, backed by Supabase.

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Stripe Checkout + webhooks
- Supabase (client + service role access)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

Set these in your deployment environment (Vercel). Do not commit secrets.

- NEXT_PUBLIC_BASE_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint
