import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSessionToken } from "@/lib/adminAuth";
import { getSupabase, getSupabaseDiagnostics } from "@/lib/supabase";

function parseDetailsFromMessage(message: string = "") {
  let scheme = "";
  let education = "";
  let district = "";
  let contactPref = "whatsapp";
  let cleanMessage = message;

  const schemeMatch = message.match(/\[Scheme:\s*([^\]]+)\]/i);
  if (schemeMatch) {
    scheme = schemeMatch[1].trim();
  }

  const eduMatch = message.match(/\[Education:\s*([^\]]+)\]/i);
  if (eduMatch) {
    education = eduMatch[1].trim();
  }

  const distMatch = message.match(/\[District:\s*([^\]]+)\]/i) || message.match(/\[Location:\s*([^\]]+)\]/i);
  if (distMatch) {
    district = distMatch[1].trim();
  }

  const contactMatch = message.match(/\[Contact:\s*([^\]]+)\]/i);
  if (contactMatch) {
    contactPref = contactMatch[1].trim();
  }

  // Strip brackets from clean message
  cleanMessage = message
    .replace(/\[Scheme:[^\]]*\]/gi, "")
    .replace(/\[Education:[^\]]*\]/gi, "")
    .replace(/\[District:[^\]]*\]/gi, "")
    .replace(/\[Location:[^\]]*\]/gi, "")
    .replace(/\[Contact:[^\]]*\]/gi, "")
    .trim();

  return { scheme, education, district, contactPref, cleanMessage };
}

function checkIsOnePoint(item: any): boolean {
  const id = (item.id || "").toLowerCase();
  const subject = (item.subject || "").toLowerCase();
  const message = (item.message || "").toLowerCase();
  const email = (item.email || "").toLowerCase();

  return (
    id.startsWith("nxg-op-") ||
    id.startsWith("op-") ||
    subject.includes("onepoint") ||
    subject.includes("one point") ||
    email.includes("onepoint.nextgen.org") ||
    message.includes("onepoint") ||
    message.includes("one point") ||
    message.includes("[scheme:")
  );
}

// 1. GET: Fetch all enquiries for authenticated admin
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") || "onepoint"; // "onepoint" by default
  const cookieStore = await cookies();
  const token = cookieStore.get("onepoint_admin_token")?.value;

  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  const supabase = getSupabase(true);
  if (!supabase) {
    const diag = getSupabaseDiagnostics();
    const missingVars: string[] = [];
    if (!diag.hasUrl) missingVars.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!diag.hasAnonKey && !diag.hasServiceRoleKey) missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");

    return NextResponse.json(
      {
        success: false,
        isConfigError: true,
        missingVars,
        error: `Supabase database is not configured on your hosting provider (Vercel). Missing Environment Variables: ${missingVars.join(
          ", "
        )}. Please configure them in your Vercel Project Settings -> Environment Variables and redeploy.`,
      },
      { status: 503 }
    );
  }

  try {
    let rawOnepointList: any[] = [];
    let opFetchError: string | null = null;

    // 1. Fetch from primary table: onepoint_enquiries
    try {
      const { data, error } = await supabase
        .from("onepoint_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        opFetchError = error.message;
        console.warn("[Admin API] Notice fetching onepoint_enquiries:", error.message);
      } else if (Array.isArray(data)) {
        rawOnepointList = data;
      }
    } catch (err: any) {
      opFetchError = err?.message || "Error fetching onepoint_enquiries";
    }

    // 2. Fetch from secondary/NextGen inquiries table
    let rawInquiriesList: any[] = [];
    let inqFetchError: string | null = null;

    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        inqFetchError = error.message;
        console.warn("[Admin API] Notice fetching inquiries:", error.message);
      } else if (Array.isArray(data)) {
        rawInquiriesList = data;
      }
    } catch (err: any) {
      inqFetchError = err?.message || "Error fetching inquiries";
    }

    // If both failed with errors and both lists are empty, return error
    if (rawOnepointList.length === 0 && rawInquiriesList.length === 0 && opFetchError && inqFetchError) {
      const isTableMissing =
        opFetchError.includes("does not exist") ||
        inqFetchError.includes("does not exist") ||
        opFetchError.includes("relation");

      return NextResponse.json(
        {
          success: false,
          isTableError: isTableMissing,
          error: `Database query failed. ${opFetchError}. Please ensure database tables and RLS policies are applied in Supabase.`,
        },
        { status: 500 }
      );
    }

    // Format records from onepoint_enquiries
    const formattedFromOnepoint = rawOnepointList.map((item) => {
      const parsed = parseDetailsFromMessage(item.service_description || "");
      return {
        id: item.id || `OP-${item.phone_number}`,
        created_at: item.created_at || new Date().toISOString(),
        name: item.full_name || "Applicant",
        phone: item.phone_number || "",
        email: item.email || "",
        subject: item.service_category ? `OnePoint: ${item.service_category}` : "General Service Enquiry",
        rawMessage: item.service_description || "",
        cleanMessage: parsed.cleanMessage || item.service_description || "No message content",
        scheme: parsed.scheme || item.service_category || "General",
        education: parsed.education,
        district: item.location || parsed.district,
        preferredContact: item.preferred_contact_method || parsed.contactPref || "whatsapp",
        status: item.status || "pending",
        ip: "web",
        isOnePoint: true,
      };
    });

    // Format records from inquiries
    const formattedFromInquiries = rawInquiriesList.map((item) => {
      const parsed = parseDetailsFromMessage(item.message || "");
      const isOnePoint = checkIsOnePoint(item);

      return {
        id: item.id,
        created_at: item.created_at,
        name: item.name || "Anonymous Applicant",
        phone: item.phone || "",
        email: item.email || "",
        subject: item.subject || "General Enquiry",
        rawMessage: item.message || "",
        cleanMessage: parsed.cleanMessage || item.message || "No message content",
        scheme: parsed.scheme || (item.subject ? item.subject.replace(/^OnePoint:\s*/i, "") : "General"),
        education: parsed.education,
        district: parsed.district,
        preferredContact: parsed.contactPref,
        status: item.status || "new",
        ip: item.ip,
        isOnePoint,
      };
    });

    // If scope is "onepoint" (default), only include inquiries that belong to OnePoint
    const inquiriesToMerge =
      scope === "all"
        ? formattedFromInquiries
        : formattedFromInquiries.filter((inq) => inq.isOnePoint);

    // Merge and deduplicate by phone number + approximate timestamp or ID
    const combined = [...formattedFromOnepoint];
    for (const inq of inquiriesToMerge) {
      const cleanPhone = (inq.phone || "").replace(/[^0-9]/g, "").slice(-10);
      const isDuplicate = combined.some((op) => {
        if (op.id === inq.id) return true;
        const opPhone = (op.phone || "").replace(/[^0-9]/g, "").slice(-10);
        if (cleanPhone && opPhone && cleanPhone === opPhone) {
          const diffMs = Math.abs(
            new Date(op.created_at).getTime() - new Date(inq.created_at).getTime()
          );
          return diffMs < 10 * 60 * 1000; // Within 10 minutes
        }
        return false;
      });

      if (!isDuplicate) {
        combined.push(inq);
      }
    }

    // Sort by created_at descending
    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      success: true,
      enquiries: combined,
      count: combined.length,
    });
  } catch (err: any) {
    console.error("[Admin API] Unexpected error in GET enquiries:", err);
    return NextResponse.json(
      { success: false, error: "Server encountered an error while fetching enquiries." },
      { status: 500 }
    );
  }
}

// 2. PATCH: Update status and response notes
export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("onepoint_admin_token")?.value;

  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  const supabase = getSupabase(true);
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Database service unavailable." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { id, status, note, phone } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: id and status." },
        { status: 400 }
      );
    }

    // 1. Prepare mapped status for onepoint_enquiries
    let opStatus = "reviewed";
    if (status === "new" || status === "pending") {
      opStatus = "pending";
    } else if (status === "resolved") {
      opStatus = "resolved";
    } else if (status === "cancelled") {
      opStatus = "cancelled";
    } else if (status === "in_progress") {
      opStatus = "in_progress";
    } else if (status === "viewed" || status === "responded" || status === "contacted") {
      opStatus = "reviewed";
    }

    // Update onepoint_enquiries by UUID id
    try {
      const opUpdatePayload: Record<string, any> = { status: opStatus };
      if (note && note.trim()) {
        const nowStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const { data: currOp } = await supabase
          .from("onepoint_enquiries")
          .select("service_description")
          .eq("id", id)
          .maybeSingle();

        if (currOp?.service_description) {
          opUpdatePayload.service_description =
            currOp.service_description + `\n[Admin Note (${nowStr})]: ${note.trim()}`;
        }
      }

      await supabase
        .from("onepoint_enquiries")
        .update(opUpdatePayload)
        .eq("id", id);

      if (phone) {
        const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
        await supabase
          .from("onepoint_enquiries")
          .update({ status: opStatus })
          .ilike("phone_number", `%${cleanPhone}%`);
      }
    } catch (e) {
      console.warn("[Admin API] Notice updating onepoint_enquiries:", e);
    }

    // 2. Also update NextGen inquiries table
    try {
      let inqUpdatePayload: Record<string, any> = { status };
      if (note && note.trim()) {
        const nowStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const adminNoteTag = `\n[Admin Note (${nowStr})]: ${note.trim()}`;
        const { data: currInq } = await supabase
          .from("inquiries")
          .select("message")
          .eq("id", id)
          .maybeSingle();

        if (currInq?.message) {
          inqUpdatePayload.message = currInq.message + adminNoteTag;
        }
      }

      await supabase
        .from("inquiries")
        .update(inqUpdatePayload)
        .eq("id", id);
    } catch (e) {
      console.warn("[Admin API] Notice updating inquiries:", e);
    }

    return NextResponse.json({
      success: true,
      message: `Enquiry status updated to '${status}'.`,
    });
  } catch (err) {
    console.error("[Admin API] Unexpected error in PATCH enquiries:", err);
    return NextResponse.json(
      { success: false, error: "Server encountered an error while updating enquiry." },
      { status: 500 }
    );
  }
}
