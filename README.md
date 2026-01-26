# Student Notes Portal

A platform built by seniors to help juniors access **Notes**, **Previous Year Question Papers (PYQs)**, and academic resources across engineering departments.

## Stack

- **Next.js 14** (App Router) — React, SSR, API routes
- **Neon** — Serverless PostgreSQL
- **Drizzle** — ORM and migrations
- **Tailwind CSS** — Styling, dark mode
- **Vercel** — Hosting

## Features

- Home: hero, department grid, quote carousel
- Departments: Computer, EC — notes and PYQs per semester (from DB)
- About, Contact (WhatsApp from config), Feedback (saved to DB)
- **Admin panel** (`/admin`): password‑protected; CRUD departments, resources, config; view/delete feedback

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env.local` and set:

- `DATABASE_URL` — Neon PostgreSQL connection string (pooled for serverless)
- `ADMIN_PASSWORD` — Password for `/admin` login

### 3. Database

**Option A — Drizzle (recommended)**  
Push schema to Neon:

```bash
npx drizzle-kit push
```

**Option B — If `drizzle-kit push` fails (e.g. EPERM)**  
Create tables manually:

1. Open [Neon Console](https://console.neon.tech) → your project → **SQL Editor**
2. Paste and run the contents of `scripts/schema.sql`
3. Or run: `npm run db:setup` (uses `scripts/db-setup.ts`)

**Seed (departments, resources, config, quotes):**

```bash
npm run db:seed
```

`db:seed` reads from `.env.local`. It clears and repopulates `departments`, `resources`, and the listed `config` keys.

### 4. Run

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (use `ADMIN_PASSWORD`)

## Deploy (Vercel)

1. **Neon**
   - Create a project at [neon.tech](https://neon.tech), copy the **pooled** `DATABASE_URL`.

2. **Vercel**
   - Import the repo and deploy.
   - In **Settings → Environment variables** add:
     - `DATABASE_URL` = Neon pooled connection string  
     - `ADMIN_PASSWORD` = a strong random string

3. **Database (first time)**
   - After the first deploy, run locally (with production `DATABASE_URL` in `.env.local` or in a one‑off script):
     - `npx drizzle-kit push`
     - `npm run db:seed`

   Alternatively use [Neon’s SQL editor](https://console.neon.tech) or Drizzle Studio (`npx drizzle-kit studio`) to apply schema and seed.

4. **Smoke‑test**
   - Home, About, Contact, `/computer`, `/ec`, Feedback form.
   - `/admin` login and: Dashboard, Departments, Resources, Config, Feedback.

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server               |
| `npm run build`| Production build               |
| `npm run start`| Start production server        |
| `npm run db:seed`   | Seed DB (see above)       |
| `npm run db:setup`  | Create tables via SQL (if `drizzle-kit push` fails) |
| `npx drizzle-kit push` | Push schema to DB       |
| `npx drizzle-kit studio` | Open Drizzle Studio  |

## Project layout

- `app/` — Pages and API routes (App Router)
- `app/admin/` — Admin UI (departments, resources, config, feedback)
- `app/api/` — `feedback` (public), `admin/*` (auth required)
- `components/` — Header, Footer, cards, forms, admin
- `lib/` — `db`, `schema`, `admin-auth`, `seed`

---

*Together, we rise.*
