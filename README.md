# Event CMS Website

Modern event website inspired by tourism/pageant event publishing needs. Built with Next.js App Router, TypeScript, TailwindCSS, shadcn-style UI primitives, and PostgreSQL through Prisma.

## Folder Structure

- `app/`: App Router pages for the public website and admin CMS.
- `components/blocks/`: Public block renderer and reusable block components.
- `components/admin/`: CMS layout and editing forms.
- `components/ui/`: shadcn-style reusable UI primitives.
- `lib/`: Database client, auth helpers, CMS queries, server actions, and shared utilities.
- `prisma/`: PostgreSQL schema and seed script.
- `scripts/`: Seed content used to initialize editable CMS records.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a PostgreSQL database.
3. Set `ADMIN_PASSWORD`.
4. Optional local PostgreSQL:

```bash
docker compose up -d
```

5. Install dependencies:

```bash
npm install
```

6. Push schema and seed content:

```bash
npm run db:push
npm run db:seed
```

7. Start the app:

```bash
npm run dev
```

Public site: `http://localhost:3000`

Admin CMS: `http://localhost:3000/admin`

## Vercel Deployment

Set these environment variables in Vercel:

- `DATABASE_URL`
- `DIRECT_URL`
- `AUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`

Build command:

```bash
npm run build
```

Before production traffic, apply the database migration and create the admin account:

```bash
npx prisma migrate deploy
npm run db:seed
```

SEO routes included:

- `/robots.txt`
- `/sitemap.xml`

## CMS Model

Pages and posts store `blocks` as JSON. The renderer supports:

- `hero`
- `richText`
- `featureGrid`
- `stats`
- `schedule`
- `gallery`
- `sponsors`
- `cta`
- `newsList`
- `registration`

This keeps public content editable from the admin while React components stay reusable and typed.
