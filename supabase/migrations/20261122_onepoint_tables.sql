-- ==============================================================================
-- ONE POINT – ASSURED TECH ZONE: General Enquiry Database Schema
-- Supabase Project: https://vaoezgeqinspwcchkizo.supabase.co (NextGen Organisation)
--
-- INSTRUCTIONS:
-- 1. Open Supabase Dashboard -> SQL Editor (New Query)
-- 2. Paste and run this script.
-- 3. It will safely create the 'onepoint_enquiries' table with RLS enabled.
-- 4. It does NOT touch, modify, or interfere with any existing NextGen tables.
-- ==============================================================================

-- 1. Create onepoint_enquiries table
CREATE TABLE IF NOT EXISTS public.onepoint_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  location TEXT,
  service_category TEXT,
  service_description TEXT,
  preferred_contact_method TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'in_progress', 'resolved', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for fast sorting and searching
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_created_at ON public.onepoint_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_status ON public.onepoint_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_phone ON public.onepoint_enquiries (phone_number);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_category ON public.onepoint_enquiries (service_category);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.onepoint_enquiries ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow public / anonymous visitors to submit enquiries
DROP POLICY IF EXISTS "Allow public insert to onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow public insert to onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

-- 5. Policy: Restrict reading to authenticated admin users (zero anonymous read access)
DROP POLICY IF EXISTS "Allow authenticated select on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow authenticated select on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. Policy: Allow authenticated admin users to update record status
DROP POLICY IF EXISTS "Allow authenticated update on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow authenticated update on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Realtime broadcast hook for instant team notifications
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.onepoint_enquiries;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
