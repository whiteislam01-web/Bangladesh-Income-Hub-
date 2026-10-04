# BDIH (Bangladesh Income Hub) — Supabase Configuration & Migration Guide

This document provides complete instructions for configuring, operating, rotating keys, and migrating the Supabase infrastructure for **BDIH (Bangladesh Income Hub)**.

---

## 1. Architecture Overview

BDIH uses a dual-layer security architecture:

1. **Client-Side (Browser)**:
   - Uses **ONLY** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (the publishable key).
   - Handled exclusively through the centralized infrastructure layer in `src/lib/supabase/`.
   - All client queries are strictly governed by **Row Level Security (RLS)** in PostgreSQL.
   - **NEVER** has access to service role keys or database credentials.

2. **Server-Side (`server.ts`)**:
   - Uses `SUPABASE_SERVICE_ROLE_KEY` (secret, privileged).
   - Executes privileged operations: order verification, automated entitlement issuance, and time-limited signed URLs for private storage buckets.
   - Kept strictly server-side; never bundled or exposed in client builds.

3. **Graceful Offline / Development Fallback**:
   - If Supabase environment variables are missing or set to placeholders, the client operates in local storage fallback mode with full mock and demo testing support.
   - Startup validation (`validateClientSupabaseConfig`) provides clear diagnostic messages without crashing the application.

---

## 2. Environment Variables Specification

| Variable Name | Scope | Sensitivity | Description |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Client + Server | Public | Your Supabase project URL (e.g. `https://xyzcompany.supabase.co`). |
| `VITE_SUPABASE_ANON_KEY` | Client + Server | Public | Supabase Anon/Publishable API key. Safe for browser usage. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | **CRITICAL SECRET** | Supabase Service Role key. Bypasses RLS for trusted server actions. **NEVER prefix with `VITE_`**. |
| `PORT` | Server Only | Public | Web server port (defaults to `3000`). |
| `NODE_ENV` | Server Only | Public | `development` or `production`. |
| `APP_URL` | Client + Server | Public | Base application URL for Google OAuth redirect callback. |

---

## 3. Local Development Configuration Instructions

Follow these steps to set up your local development environment:

### Step 1: Create your local `.env` file
Copy the `.env.example` template:
```bash
cp .env.example .env
```

### Step 2: Populate your Supabase project credentials in `.env`
Log in to your [Supabase Dashboard](https://supabase.com/dashboard):
1. Navigate to **Project Settings** → **API**.
2. Copy the **Project URL** and paste it into `VITE_SUPABASE_URL`.
3. Copy the **`anon` `public` key** and paste it into `VITE_SUPABASE_ANON_KEY`.
4. Copy the **`service_role` `secret` key** and paste it into `SUPABASE_SERVICE_ROLE_KEY`.

### Step 3: Run Database Migrations
1. Open your Supabase Dashboard → **SQL Editor**.
2. Open the file `supabase/migrations/001_initial_bdih_schema.sql` from this repository.
3. Paste the contents into the SQL Editor and click **Run**.
4. Verify that the following tables appear under **Table Editor**:
   - `profiles`
   - `courses`
   - `course_modules`
   - `course_lessons`
   - `lesson_resources`
   - `products`
   - `orders`
   - `order_items`
   - `entitlements`
   - `course_progress`
   - `site_settings`
5. Verify that the following storage buckets appear under **Storage**:
   - `public-assets` (Public)
   - `course-materials` (Private)
   - `digital-downloads` (Private)

### Step 4: Configure Google OAuth (Optional / Production)
In Supabase Dashboard → **Authentication** → **Providers** → **Google**:
- Enable Google provider.
- Paste your Google OAuth Client ID and Secret.
- Add your development URL (`http://localhost:3000` or Cloud Run URL) to **URL Configuration** → **Redirect URLs**.

### Step 5: Start the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000` with automated diagnostic logging:
```
 BDIH System Architecture — Supabase Diagnostic Boot
- Supabase Project URL:       ✅ Configured
- Client Publishable Key:     ✅ Configured
- Server Service Role Key:    ✅ Configured (Secret Safe)
```

---

## 4. Production Environment Variable Documentation

When deploying to production (Cloud Run, Vercel, Docker, etc.):

1. **Inject Environment Variables**:
   In your hosting provider's Secrets / Environment Variables panel, inject:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NODE_ENV=production`
   - `PORT=3000`
   - `APP_URL=https://your-domain.com`

2. **Build and Start**:
   ```bash
   npm run build
   npm run start
   ```

---

## 5. Future Migration & Key Rotation Guide

### How to Rotate the Supabase API Keys:
1. In Supabase Dashboard → **Project Settings** → **API**, generate new keys.
2. Update the environment variables in production:
   - Replace `VITE_SUPABASE_ANON_KEY` with the new anon key.
   - Replace `SUPABASE_SERVICE_ROLE_KEY` with the new service role key.
3. Redeploy or restart your container/server. No code changes are required.

### How to Migrate to a New Supabase Project or PostgreSQL Host:
1. Export the database schema and data from your existing database:
   ```bash
   supabase db dump -f bdih_backup.sql
   ```
2. Provision your new Supabase project or PostgreSQL database.
3. Execute `supabase/migrations/001_initial_bdih_schema.sql` (or `bdih_backup.sql`) on the new instance.
4. Update `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to the new project's credentials.
5. Restart your application.
The application will immediately connect to the new database with zero code modifications.
