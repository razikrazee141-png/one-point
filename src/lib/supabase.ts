import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface OnepointEnquiry {
  id?: string;
  full_name: string;
  phone_number: string;
  email?: string | null;
  location?: string | null;
  service_category?: string | null;
  service_description?: string | null;
  preferred_contact_method?: string | null;
  status?: "pending" | "reviewed" | "in_progress" | "resolved" | "cancelled";
  created_at?: string;
}

export interface OnepointStudentApplication {
  id?: string;
  full_name: string;
  phone_number: string;
  email?: string | null;
  date_of_birth?: string | null;
  education_level?: string | null;
  institution_name?: string | null;
  district?: string | null;
  application_type?: string | null;
  scheme_name?: string | null;
  additional_information?: string | null;
  status?: "pending" | "under_review" | "verified" | "submitted_to_portal" | "approved" | "rejected";
  created_at?: string;
}

export interface OnepointServiceRequest {
  id?: string;
  full_name: string;
  phone_number: string;
  email?: string | null;
  service_type?: string | null;
  description?: string | null;
  status?: "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
  created_at?: string;
}

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (url && key && url.startsWith("http")) {
    try {
      cachedClient = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
      return cachedClient;
    } catch (err) {
      console.warn("[OnePoint Supabase] Initialization error:", err);
    }
  }

  return null;
}
