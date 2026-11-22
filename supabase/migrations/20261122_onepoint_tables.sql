-- ==============================================================================
-- ONE POINT – ASSURED TECH ZONE: Complete Supabase Database Schema
-- Supabase Project: https://vaoezgeqinspwcchkizo.supabase.co (NextGen Organisation)
--
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/vaoezgeqinspwcchkizo
-- 2. Click "SQL Editor" in the left sidebar -> "New query".
-- 3. Paste this entire script and click "Run".
-- 4. It safely creates/updates both tables ('onepoint_enquiries' and 'inquiries')
--    and sets up permissive RLS policies so Next.js server APIs can read,
--    insert, and update enquiries seamlessly.
-- ==============================================================================

-- ==============================================================================
-- 1. Primary Table: onepoint_enquiries
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.onepoint_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  location TEXT,
  service_category TEXT,
  service_description TEXT,
  preferred_contact_method TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_created_at ON public.onepoint_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_status ON public.onepoint_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_phone ON public.onepoint_enquiries (phone_number);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_category ON public.onepoint_enquiries (service_category);

-- Enable Row Level Security (RLS)
ALTER TABLE public.onepoint_enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from public forms & server APIs
DROP POLICY IF EXISTS "Allow public insert to onepoint_enquiries" ON public.onepoint_enquiries;
DROP POLICY IF EXISTS "Allow insert to onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow insert to onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR INSERT
  TO public, anon, authenticated, service_role
  WITH CHECK (true);

-- Policy: Allow server API to select enquiries
DROP POLICY IF EXISTS "Allow authenticated select on onepoint_enquiries" ON public.onepoint_enquiries;
DROP POLICY IF EXISTS "Allow select on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow select on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR SELECT
  TO public, anon, authenticated, service_role
  USING (true);

-- Policy: Allow server API to update enquiries
DROP POLICY IF EXISTS "Allow authenticated update on onepoint_enquiries" ON public.onepoint_enquiries;
DROP POLICY IF EXISTS "Allow update on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow update on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR UPDATE
  TO public, anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow server API to delete if needed
DROP POLICY IF EXISTS "Allow delete on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow delete on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR DELETE
  TO public, anon, authenticated, service_role
  USING (true);

-- ==============================================================================
-- 2. Secondary / NextGen Unified Table: inquiries
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON public.inquiries (phone);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow insert to inquiries" ON public.inquiries;
CREATE POLICY "Allow insert to inquiries"
  ON public.inquiries
  FOR INSERT
  TO public, anon, authenticated, service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select on inquiries" ON public.inquiries;
CREATE POLICY "Allow select on inquiries"
  ON public.inquiries
  FOR SELECT
  TO public, anon, authenticated, service_role
  USING (true);

DROP POLICY IF EXISTS "Allow update on inquiries" ON public.inquiries;
CREATE POLICY "Allow update on inquiries"
  ON public.inquiries
  FOR UPDATE
  TO public, anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 3. Realtime broadcast hook
-- ==============================================================================
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.onepoint_enquiries;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
