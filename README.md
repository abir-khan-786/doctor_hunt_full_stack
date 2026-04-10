## Doctor Hunt – MVP

Doctor Hunt is a small **doctor-appointment MVP** built with **Next.js App Router**, **PostgreSQL**, and **Better Auth**.  
Patients can discover doctors, book visits, manage their profile, and leave reviews. Admins get a simple panel to manage doctors, users, reviews, and appointment status.

---

### Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI**: React 19, Tailwind CSS, Framer Motion (animations, hero + sections + review slider)
- **Auth**: Better Auth (email/password, sessions, role-based `user/admin`)
- **DB**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind (custom brand palette), responsive layout

---

### Main features

- **Marketing / home**
  - Hero section with key stats
  - How it works + feature highlights
  - Doctors grid (from DB)
  - Animated **reviews carousel** (from DB)
  - CTA section

- **Patients**
  - **Sign up / Sign in** (Better Auth)
  - **Book appointment** (`/appointments`):
    - pick doctor, time, reason
    - stored as `pending` until admin updates
  - **Dashboard** (`/dashboard`):
    - see all own appointments + status
    - quick link to admin (if role is `admin`)
  - **Profile** (`/dashboard/profile`):
    - update display name + optional photo URL (Better Auth `updateUser`)
  - **Reviews** (`/dashboard/review`):
    - submit rating + comment, optionally link to a doctor
    - see own reviews

- **Admin panel** (role = `admin` only)
  - **Overview** (`/admin`): counts (doctors, appointments, users, pending)
  - **Appointments** (`/admin/appointments`): update status (`pending/confirmed/cancelled`)
  - **Doctors** (`/admin/doctors`): create / edit / delete doctors
  - **Reviews** (`/admin/reviews`): delete reviews
  - **Users** (`/admin/users`): change `user/admin` roles

---

### Getting started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Configure environment

Create `.env` (you can start from `.env.example`):

```bash
cp .env.example .env
```

Set at least:

- `DATABASE_URL` – PostgreSQL connection string (local DB or Neon/etc.)
- `BETTER_AUTH_SECRET` – long random string (≥32 chars)
- `BETTER_AUTH_URL` – e.g. `http://localhost:3000`

Optional but recommended:

- `NEXT_PUBLIC_APP_URL` – same origin the browser uses (defaults to same-origin `/api/auth`)
- `ADMIN_EMAIL` – email that should be promoted to admin (see seeding below)

#### 3. Sync database + seed

Apply Prisma schema:

```bash
npm run db:push
```

Seed initial data (doctors + reviews, and optionally promote an admin):

```bash
npm run db:seed
```

If you set `ADMIN_EMAIL` and **already created a user with that email**, the seed script will promote that user to `admin`.

#### 4. Run dev server

```bash
npm run dev
```

Then open `http://localhost:3000`.

---

### Key routes

- Public:
  - `/` – Home (sections + animated reviews)
  - `/sign-in`, `/sign-up`

- Authenticated user:
  - `/appointments` – book visits
  - `/dashboard` – user dashboard
  - `/dashboard/profile` – profile update
  - `/dashboard/review` – submit + list own reviews

- Admin (role = `admin` only):
  - `/admin` – overview
  - `/admin/appointments`
  - `/admin/doctors`
  - `/admin/doctors/[id]`
  - `/admin/reviews`
  - `/admin/users`

---

### Notes

- This is an **MVP**: no email sending, payments, or complex scheduling logic are implemented yet.
- All appointments, users, and reviews live in PostgreSQL via Prisma models (`prisma/schema.prisma`).
- Better Auth is configured in `src/lib/auth.ts`, and the client in `src/lib/auth-client.ts`.

