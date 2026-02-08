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

Create a `.env.local` with:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint
