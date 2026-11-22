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
let cachedKeyUsed: string | null = null;

export function getSupabaseDiagnostics() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const hasUrl = Boolean(url && url.startsWith("http"));
  const hasAnonKey = Boolean(anonKey && anonKey.length > 20);
  const hasServiceRoleKey = Boolean(serviceRoleKey && serviceRoleKey.length > 20);

  return {
    isConfigured: hasUrl && (hasAnonKey || hasServiceRoleKey),
    hasUrl,
    hasAnonKey,
    hasServiceRoleKey,
    url: url || "",
  };
}

export function getSupabase(preferServiceRole = true): SupabaseClient | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  const key = preferServiceRole && serviceKey ? serviceKey : (anonKey || serviceKey);

  if (!url || !key || !url.startsWith("http")) {
    return null;
  }

  if (cachedClient && cachedKeyUsed === key) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    cachedKeyUsed = key;
    return cachedClient;
  } catch (err) {
    console.warn("[OnePoint Supabase] Initialization error:", err);
    return null;
  }
}
