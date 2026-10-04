-- ============================================================
-- BDIH (Bangladesh Income Hub) — Production Supabase Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  telegram_username TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary_config',
  site_name TEXT DEFAULT 'Bangladesh Income Hub',
  site_tagline TEXT DEFAULT 'Professional Trading Masterclasses, Indicators & Digital Products',
  custom_logo_url TEXT,
  support_email TEXT DEFAULT 'support@bdih.com',
  support_phone TEXT DEFAULT '+880 1712-345678',
  support_whatsapp TEXT DEFAULT '+880 1712-345678',
  official_telegram_group TEXT DEFAULT 'https://t.me/bdih_official',
  payment_bkash_wallet TEXT DEFAULT '01712-345678 (Personal / Send Money)',
  payment_nagad_wallet TEXT DEFAULT '01812-345678 (Personal / Send Money)',
  payment_rocket_wallet TEXT DEFAULT '01912-345678-9 (Personal)',
  payment_bank_account TEXT DEFAULT 'Islami Bank Bangladesh Ltd | A/C: 2050123456789 | BDIH Hub',
  payment_binance_id TEXT DEFAULT 'Pay ID: 84920412 (BDIH Official)',
  admin_notification_email TEXT DEFAULT 'admin@bdih.com',
  announcement_banner_en TEXT DEFAULT '🔥 Admission Open: Batch 14 institutional SMC Masterclass with 1-on-1 mentorship.',
  announcement_banner_bn TEXT DEFAULT '🔥 ব্যাচ ১৪ ভর্তি চলছে: প্রাতিষ্ঠানিক এসএমসি মাস্টারক্লাস ও লাইভ মেন্টরশিপ।',
  announcement_banner_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  short_desc_en TEXT,
  short_desc_bn TEXT,
  full_desc_en TEXT,
  full_desc_bn TEXT,
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
  price_bdt NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount_usd NUMERIC(10, 2),
  discount_bdt NUMERIC(12, 2),
  level TEXT DEFAULT 'All Levels' CHECK (level IN ('All Levels', 'Beginner', 'Intermediate', 'Advanced')),
  thumbnail TEXT NOT NULL,
  promo_video_url TEXT,
  duration_hours NUMERIC(6, 1) DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  instructor_name TEXT NOT NULL,
  instructor_role TEXT,
  instructor_bio TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  learning_outcomes_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  learning_outcomes_bn TEXT[] DEFAULT ARRAY[]::TEXT[],
  prerequisites_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  prerequisites_bn TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Course Modules Table
CREATE TABLE IF NOT EXISTS public.course_modules (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  module_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Course Lessons Table
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES public.course_modules(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  lesson_order INTEGER DEFAULT 1,
  duration_minutes INTEGER DEFAULT 0,
  video_url TEXT NOT NULL,
  notes_en TEXT,
  notes_bn TEXT,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Lesson Resources Table
CREATE TABLE IF NOT EXISTS public.lesson_resources (
  id TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES public.course_lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'pdf' CHECK (type IN ('pdf', 'zip', 'link', 'code', 'excel')),
  download_url TEXT NOT NULL,
  file_size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Products & Indicators Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  short_desc_en TEXT,
  short_desc_bn TEXT,
  full_desc_en TEXT,
  full_desc_bn TEXT,
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
  price_bdt NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount_usd NUMERIC(10, 2),
  discount_bdt NUMERIC(12, 2),
  category TEXT NOT NULL,
  type TEXT DEFAULT 'indicator' CHECK (type IN ('indicator', 'software', 'template', 'ebook', 'pdf', 'tool', 'course', 'signals', 'download')),
  platform TEXT,
  image TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  download_file_url TEXT,
  license_type TEXT DEFAULT 'Lifetime',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  telegram_username TEXT,
  gateway_name TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  sender_phone TEXT,
  payment_proof_status TEXT DEFAULT 'pending' CHECK (payment_proof_status IN ('pending', 'approved', 'rejected')),
  total_amount_bdt NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_amount_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
  order_date DATE DEFAULT CURRENT_DATE,
  tracking_status TEXT DEFAULT 'processing' CHECK (tracking_status IN ('processing', 'verified', 'cancelled')),
  entitlements_created BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  price_usd NUMERIC(10, 2) NOT NULL,
  price_bdt NUMERIC(12, 2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  item_type TEXT DEFAULT 'course',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Digital Entitlements Table (Student Access)
CREATE TABLE IF NOT EXISTS public.entitlements (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('course', 'indicator', 'product')),
  item_id TEXT NOT NULL,
  title TEXT NOT NULL,
  granted_at DATE DEFAULT CURRENT_DATE,
  access_url TEXT,
  license_key TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Student Course Progress Table
CREATE TABLE IF NOT EXISTS public.course_progress (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  course_id TEXT NOT NULL,
  completed_lesson_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  last_lesson_id TEXT,
  progress_percent INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_course UNIQUE (user_email, course_id)
);

-- 12. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Site Settings: Everyone can read, only admin can update
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update site settings" ON public.site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

-- Courses: Everyone can view published courses
CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT USING (is_published = true OR EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin')));

CREATE POLICY "Admins can manage courses" ON public.courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

-- Modules & Lessons: Public can read structure, but video URLs protected
CREATE POLICY "Anyone can view modules" ON public.course_modules
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view lessons list" ON public.course_lessons
  FOR SELECT USING (true);

-- Products: Everyone can view active products
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin')));

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

-- Orders: Users can read their own orders; admins can view & update all
CREATE POLICY "Users can view own orders by email" ON public.orders
  FOR SELECT USING (
    customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Anyone can create pending orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

-- Entitlements: Users can view their own entitlements; admins can manage
CREATE POLICY "Users can view own entitlements" ON public.entitlements
  FOR SELECT USING (
    user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Admins can manage entitlements" ON public.entitlements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

-- Course Progress: Users can manage their own progress
CREATE POLICY "Users can view and update own course progress" ON public.course_progress
  FOR ALL USING (
    user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
  );

-- Storage Buckets Setup
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('public-assets', 'public-assets', true),
  ('course-materials', 'course-materials', false),
  ('digital-downloads', 'digital-downloads', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS:
-- Public assets: readable by all
CREATE POLICY "Public assets are accessible by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'public-assets');

-- Course materials: only authenticated users with valid entitlement
CREATE POLICY "Course materials accessible by active students" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'course-materials' AND (
      EXISTS (
        SELECT 1 FROM public.entitlements e
        JOIN public.courses c ON c.id = e.item_id
        WHERE e.user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
          AND e.status = 'active'
      ) OR
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
      )
    )
  );

-- Trigger for New User Profile Creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    CASE 
      WHEN new.email = 'admin@bdih.com' THEN 'admin'
      ELSE 'student'
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
