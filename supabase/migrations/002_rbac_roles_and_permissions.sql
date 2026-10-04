-- ============================================================
-- BDIH — RBAC Granular Roles & Permissions Security Migration
-- ============================================================

-- 1. Roles Definition
CREATE TABLE IF NOT EXISTS public.roles (
  name TEXT PRIMARY KEY,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.roles (name, description) VALUES
  ('OWNER', 'Full sovereign platform control'),
  ('ADMIN', 'Administrative operations across learning, commerce, and settings'),
  ('EDITOR', 'Content-related operations: courses, products, blog, media'),
  ('SUPPORT', 'Customer and order management and transaction verification'),
  ('CUSTOMER', 'Student and customer access to purchased digital assets')
ON CONFLICT (name) DO NOTHING;

-- 2. Granular Permissions Definition
CREATE TABLE IF NOT EXISTS public.permissions (
  name TEXT PRIMARY KEY,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.permissions (name, description) VALUES
  ('manage_users', 'Create, update, and manage student and staff roles'),
  ('manage_courses', 'Create, publish, and modify courses, modules, and lessons'),
  ('manage_products', 'Manage indicators, software, templates, and digital products'),
  ('manage_orders', 'View and modify student orders'),
  ('manage_payments', 'Verify payment proofs and approve/reject transactions'),
  ('manage_blog', 'Create, edit, and delete educational blog posts'),
  ('manage_media', 'Upload and manage course videos and downloadable files'),
  ('manage_reviews', 'Moderate and publish student reviews and testimonials'),
  ('manage_settings', 'Modify site settings, wallet addresses, and exchange rates'),
  ('manage_coupons', 'Configure discounts and promo vouchers'),
  ('view_analytics', 'Access revenue, enrollment, and platform metrics'),
  ('manage_homepage', 'Edit homepage hero banners and featured showcases'),
  ('manage_navigation', 'Configure header and footer links'),
  ('manage_site_content', 'Manage translation keys, legal terms, and FAQs')
ON CONFLICT (name) DO NOTHING;

-- 3. Role-Permissions Mapping
CREATE TABLE IF NOT EXISTS public.role_permissions (
  role_name TEXT REFERENCES public.roles(name) ON DELETE CASCADE,
  permission_name TEXT REFERENCES public.permissions(name) ON DELETE CASCADE,
  PRIMARY KEY (role_name, permission_name)
);

-- Seed Role Permissions:
-- OWNER: all permissions
INSERT INTO public.role_permissions (role_name, permission_name)
SELECT 'OWNER', name FROM public.permissions
ON CONFLICT DO NOTHING;

-- ADMIN: administrative permissions
INSERT INTO public.role_permissions (role_name, permission_name)
SELECT 'ADMIN', name FROM public.permissions
WHERE name IN (
  'manage_courses', 'manage_products', 'manage_orders', 'manage_payments',
  'manage_blog', 'manage_media', 'manage_reviews', 'manage_settings',
  'manage_coupons', 'view_analytics', 'manage_homepage', 'manage_navigation',
  'manage_site_content'
)
ON CONFLICT DO NOTHING;

-- EDITOR: content permissions
INSERT INTO public.role_permissions (role_name, permission_name)
SELECT 'EDITOR', name FROM public.permissions
WHERE name IN (
  'manage_courses', 'manage_products', 'manage_blog', 'manage_media',
  'manage_homepage', 'manage_site_content'
)
ON CONFLICT DO NOTHING;

-- SUPPORT: customer, orders, and payment permissions
INSERT INTO public.role_permissions (role_name, permission_name)
SELECT 'SUPPORT', name FROM public.permissions
WHERE name IN (
  'manage_orders', 'manage_payments', 'manage_reviews', 'view_analytics'
)
ON CONFLICT DO NOTHING;

-- 4. User-Roles Mapping (Authoritative Server-Side Assignment)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_name TEXT REFERENCES public.roles(name) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_role UNIQUE (user_id, role_name)
);

-- 5. Helper Functions for Authoritative Server-Side & RLS Evaluation
CREATE OR REPLACE FUNCTION public.get_user_role(target_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  highest_role TEXT;
BEGIN
  -- Check user_roles table with strict hierarchy priority
  SELECT role_name INTO highest_role
  FROM public.user_roles
  WHERE user_id = target_user_id
  ORDER BY 
    CASE role_name
      WHEN 'OWNER' THEN 1
      WHEN 'ADMIN' THEN 2
      WHEN 'EDITOR' THEN 3
      WHEN 'SUPPORT' THEN 4
      ELSE 5
    END ASC
  LIMIT 1;

  IF highest_role IS NOT NULL THEN
    RETURN highest_role;
  END IF;

  -- Fallback to profiles table role
  SELECT 
    CASE UPPER(role)
      WHEN 'SUPER_ADMIN' THEN 'OWNER'
      WHEN 'OWNER' THEN 'OWNER'
      WHEN 'ADMIN' THEN 'ADMIN'
      WHEN 'INSTRUCTOR' THEN 'EDITOR'
      WHEN 'EDITOR' THEN 'EDITOR'
      WHEN 'SUPPORT' THEN 'SUPPORT'
      ELSE 'CUSTOMER'
    END INTO highest_role
  FROM public.profiles
  WHERE id = target_user_id;

  RETURN COALESCE(highest_role, 'CUSTOMER');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check granular permission for a user
CREATE OR REPLACE FUNCTION public.has_permission(target_user_id UUID, required_perm TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_role_val TEXT;
  perm_exists BOOLEAN;
BEGIN
  user_role_val := public.get_user_role(target_user_id);

  IF user_role_val = 'OWNER' THEN
    RETURN TRUE;
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.role_permissions
    WHERE role_name = user_role_val AND permission_name = required_perm
  ) INTO perm_exists;

  RETURN perm_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Enable RLS on RBAC Tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view roles" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Anyone can view permissions" ON public.permissions FOR SELECT USING (true);
CREATE POLICY "Anyone can view role_permissions" ON public.role_permissions FOR SELECT USING (true);

-- User roles: users can view their own role; only OWNER or ADMIN can modify
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (
    user_id = auth.uid() OR 
    public.has_permission(auth.uid(), 'manage_users')
  );

CREATE POLICY "Only authorized staff can assign roles" ON public.user_roles
  FOR ALL USING (
    public.has_permission(auth.uid(), 'manage_users')
  );

-- 7. Update New User Trigger to Default to CUSTOMER and assign default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  initial_role TEXT;
BEGIN
  -- Determine role based on configured owner/admin email
  IF LOWER(new.email) = 'owner@bdih.com' THEN
    initial_role := 'OWNER';
  ELSIF LOWER(new.email) = 'admin@bdih.com' THEN
    initial_role := 'ADMIN';
  ELSE
    initial_role := 'CUSTOMER';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    initial_role
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();

  INSERT INTO public.user_roles (user_id, role_name)
  VALUES (new.id, initial_role)
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
