import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSessionToken } from "@/lib/adminAuth";
import { getSupabase } from "@/lib/supabase";

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

// 1. GET: Fetch all enquiries for authenticated admin
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("onepoint_admin_token")?.value;

  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Database service unavailable." },
      { status: 503 }
    );
  }

  try {
    // Fetch inquiries from Supabase
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Admin API] Failed to fetch inquiries:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const formattedEnquiries = (data || []).map((item) => {
      const parsed = parseDetailsFromMessage(item.message);
      const isOnePoint =
        item.id.startsWith("NXG-OP-") ||
        item.id.startsWith("OP-") ||
        (item.subject && item.subject.toLowerCase().includes("onepoint"));

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

    return NextResponse.json({
      success: true,
      enquiries: formattedEnquiries,
      count: formattedEnquiries.length,
    });
  } catch (err) {
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

  const supabase = getSupabase();
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

    // Optional update note append to message if provided
    let updatePayload: Record<string, any> = { status };
    if (note && note.trim()) {
      const nowStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const adminNoteTag = `\n[Admin Note (${nowStr})]: ${note.trim()}`;
      
      // Fetch current message
      const { data: curr } = await supabase.from("inquiries").select("message").eq("id", id).single();
      if (curr?.message) {
        updatePayload.message = curr.message + adminNoteTag;
      }
    }

    // 1. Update in NextGen inquiries table
    const { error: inqErr } = await supabase
      .from("inquiries")
      .update(updatePayload)
      .eq("id", id);

    if (inqErr) {
      console.warn("[Admin API] Failed to update inquiries table:", inqErr.message);
    }

    // 2. Also try updating onepoint_enquiries if phone matches
    if (phone) {
      try {
        await supabase
          .from("onepoint_enquiries")
          .update({ status: status === "new" ? "pending" : status })
          .eq("phone_number", phone);
      } catch (_) {}
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
