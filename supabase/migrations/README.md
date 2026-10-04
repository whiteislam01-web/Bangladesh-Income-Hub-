# BDIH Database Migrations

This directory contains the database schema migrations for Bangladesh Income Hub (BDIH).

## Migration Files

- `001_initial_bdih_schema.sql`:
  - Core tables: `profiles`, `courses`, `course_modules`, `course_lessons`, `lesson_resources`, `products`, `orders`, `order_items`, `entitlements`, `course_progress`, and `site_settings`.
  - Row Level Security (RLS) policies for user data isolation, role-based admin access, and public read permissions.
  - Storage buckets: `public-assets`, `course-materials` (private), and `digital-downloads` (private).
  - Triggers: `on_auth_user_created` trigger for automated student/admin profile creation upon signup.

## Applying Migrations

### Option A: Via Supabase Dashboard (Recommended for quick deployment)
1. Go to your Supabase project dashboard.
2. Navigate to the **SQL Editor** tab.
3. Click **New Query**, paste the contents of `001_initial_bdih_schema.sql`, and click **Run**.

### Option B: Via Supabase CLI
```bash
# Link to your Supabase project
supabase link --project-ref your-project-id

# Push migrations to the database
supabase db push
```

## Adding New Migrations
When changing the database schema:
1. Create a sequential file: `002_your_change_description.sql`.
2. Ensure all statements are idempotent (`IF NOT EXISTS`, `ON CONFLICT DO NOTHING`).
3. Always update corresponding TypeScript interfaces in `src/types.ts`.
