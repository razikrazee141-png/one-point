-- ==============================================================================
-- NextGen Organisation - OnePoint Assured Tech Zone Tables Migration
-- Reusing existing Supabase project: https://vaoezgeqinspwcchkizo.supabase.co
--
-- INSTRUCTIONS:
-- 1. Open Supabase Dashboard -> SQL Editor (New Query)
-- 2. Paste and run this script.
-- 3. This script is non-destructive: it will NOT alter, touch, or interfere
--    with any existing NextGen tables (e.g. public.inquiries) or data.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TABLE: onepoint_enquiries
-- General enquiries from Contact Page and Quick Enquiries
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.onepoint_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  location TEXT,
  service_category TEXT,
  service_description TEXT,
  preferred_contact_method TEXT DEFAULT 'phone',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'in_progress', 'resolved', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance and admin dashboard filtering
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_created_at ON public.onepoint_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_status ON public.onepoint_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_phone ON public.onepoint_enquiries (phone_number);
CREATE INDEX IF NOT EXISTS idx_onepoint_enquiries_category ON public.onepoint_enquiries (service_category);

-- Enable Row Level Security (RLS)
ALTER TABLE public.onepoint_enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public / anonymous visitors to submit enquiries
DROP POLICY IF EXISTS "Allow public insert to onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow public insert to onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

-- Policy: Restrict reading to authenticated admin users (zero anonymous read access)
DROP POLICY IF EXISTS "Allow authenticated select on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow authenticated select on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated admin users to update status/records
DROP POLICY IF EXISTS "Allow authenticated update on onepoint_enquiries" ON public.onepoint_enquiries;
CREATE POLICY "Allow authenticated update on onepoint_enquiries"
  ON public.onepoint_enquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------------------------
-- 2. TABLE: onepoint_student_applications
-- Scheme-specific student applications & eligibility assistance requests
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.onepoint_student_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  date_of_birth DATE,
  education_level TEXT,
  institution_name TEXT,
  district TEXT,
  application_type TEXT,
  scheme_name TEXT,
  additional_information TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'verified', 'submitted_to_portal', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for quick lookup and reporting
CREATE INDEX IF NOT EXISTS idx_onepoint_student_apps_created_at ON public.onepoint_student_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_onepoint_student_apps_status ON public.onepoint_student_applications (status);
CREATE INDEX IF NOT EXISTS idx_onepoint_student_apps_district ON public.onepoint_student_applications (district);
CREATE INDEX IF NOT EXISTS idx_onepoint_student_apps_scheme ON public.onepoint_student_applications (scheme_name);
CREATE INDEX IF NOT EXISTS idx_onepoint_student_apps_phone ON public.onepoint_student_applications (phone_number);

-- Enable Row Level Security (RLS)
ALTER TABLE public.onepoint_student_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public / anonymous visitors to submit student applications
DROP POLICY IF EXISTS "Allow public insert to onepoint_student_applications" ON public.onepoint_student_applications;
CREATE POLICY "Allow public insert to onepoint_student_applications"
  ON public.onepoint_student_applications
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

-- Policy: Restrict reading to authenticated admin users (zero anonymous read access)
DROP POLICY IF EXISTS "Allow authenticated select on onepoint_student_applications" ON public.onepoint_student_applications;
CREATE POLICY "Allow authenticated select on onepoint_student_applications"
  ON public.onepoint_student_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated admin users to update application statuses
DROP POLICY IF EXISTS "Allow authenticated update on onepoint_student_applications" ON public.onepoint_student_applications;
CREATE POLICY "Allow authenticated update on onepoint_student_applications"
  ON public.onepoint_student_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------------------------
-- 3. TABLE: onepoint_service_requests
-- Service requests for Digital Services, Technology Solutions, Documentation
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.onepoint_service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  service_type TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for tracking
CREATE INDEX IF NOT EXISTS idx_onepoint_service_req_created_at ON public.onepoint_service_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_onepoint_service_req_status ON public.onepoint_service_requests (status);
CREATE INDEX IF NOT EXISTS idx_onepoint_service_req_type ON public.onepoint_service_requests (service_type);
CREATE INDEX IF NOT EXISTS idx_onepoint_service_req_phone ON public.onepoint_service_requests (phone_number);

-- Enable Row Level Security (RLS)
ALTER TABLE public.onepoint_service_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public / anonymous visitors to submit service requests
DROP POLICY IF EXISTS "Allow public insert to onepoint_service_requests" ON public.onepoint_service_requests;
CREATE POLICY "Allow public insert to onepoint_service_requests"
  ON public.onepoint_service_requests
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

-- Policy: Restrict reading to authenticated admin users (zero anonymous read access)
DROP POLICY IF EXISTS "Allow authenticated select on onepoint_service_requests" ON public.onepoint_service_requests;
CREATE POLICY "Allow authenticated select on onepoint_service_requests"
  ON public.onepoint_service_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated admin users to update status
DROP POLICY IF EXISTS "Allow authenticated update on onepoint_service_requests" ON public.onepoint_service_requests;
CREATE POLICY "Allow authenticated update on onepoint_service_requests"
  ON public.onepoint_service_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ------------------------------------------------------------------------------
-- Optional: Enable Realtime broadcast on new tables (for live Admin Dashboard)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.onepoint_enquiries;
  ALTER PUBLICATION supabase_realtime ADD TABLE public.onepoint_student_applications;
  ALTER PUBLICATION supabase_realtime ADD TABLE public.onepoint_service_requests;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
