import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

interface EnquiryPayload {
  fullName: string;
  mobileNumber: string;
  email?: string;
  district: string;
  taluk?: string;
  qualification?: string;
  schemeName: string;
  category?: string;
  message: string;
  consent: boolean;
  preferredContactMethod?: "whatsapp" | "phone";
  website_honeypot?: string; // Anti-spam trap
}

// In-memory rate limiting map for basic spam protection (by IP / mobile)
const rateLimitMap = new Map<string, { count: number; lastTime: number }>();

function isRateLimited(key: string, limit = 6, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry) {
    rateLimitMap.set(key, { count: 1, lastTime: now });
    return false;
  }

  if (now - entry.lastTime > windowMs) {
    rateLimitMap.set(key, { count: 1, lastTime: now });
    return false;
  }

  if (entry.count >= limit) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many enquiries submitted recently. Please wait a minute and try again.",
        },
        { status: 429 }
      );
    }

    const body: EnquiryPayload = await request.json();

    // 1. Anti-spam honeypot check
    if (body.website_honeypot && body.website_honeypot.trim() !== "") {
      return NextResponse.json({
        success: true,
        submissionId: "OP-VERIFIED-SPAMTRAP",
        message: "Enquiry received.",
      });
    }

    // 2. Server-side validation
    const fullName = (body.fullName || "").trim();
    const mobileNumber = (body.mobileNumber || "").replace(/[^0-9]/g, "");
    const district = (body.district || "").trim();
    const schemeName = (body.schemeName || "General Service Enquiry").trim();
    const message = (body.message || "").trim();
    const email = (body.email || "").trim() || null;
    const taluk = (body.taluk || "").trim();
    const qualification = (body.qualification || "").trim();
    const category = (body.category || "General Assistance").trim();
    const preferredContactMethod = body.preferredContactMethod || "whatsapp";
    const consent = Boolean(body.consent);

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your valid full name." },
        { status: 400 }
      );
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!district) {
      return NextResponse.json(
        { success: false, error: "Please select your district." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a brief enquiry message (minimum 5 characters)." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: "Consent checkbox must be accepted to proceed." },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address or leave it blank." },
        { status: 400 }
      );
    }

    // 3. Generate unique submission tracking ID (e.g. OP-2611-9482)
    const timestamp = new Date();
    const idPrefix = "OP";
    const dateSegment = `${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, "0")}`;
    const randomSegment = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `${idPrefix}-${dateSegment}-${randomSegment}`;
    const enquiryUuid = crypto.randomUUID();
    const nxgTrackingId = `NXG-${submissionId}`;

    let supabaseSynced = false;
    let supabaseRecordId: string | null = enquiryUuid;

    // 4. Record into Supabase (both onepoint_enquiries and NextGen inquiries)
    const supabase = getSupabase(true);
    if (supabase) {
      try {
        const fullLocation = district + (taluk ? `, ${taluk}` : "");
        const detailedDescription = [
          schemeName && schemeName !== "General Service Enquiry" ? `[Scheme: ${schemeName}]` : null,
          qualification ? `[Education: ${qualification}]` : null,
          message,
        ]
          .filter(Boolean)
          .join(" ");

        // 4A. Primary: onepoint_enquiries table (No .select() to comply with RLS on anonymous insert)
        const { error: opError, status: opStatus } = await supabase
          .from("onepoint_enquiries")
          .insert({
            id: enquiryUuid,
            full_name: fullName,
            phone_number: mobileNumber,
            email: email,
            location: fullLocation,
            service_category: category,
            service_description: detailedDescription,
            preferred_contact_method: preferredContactMethod,
            status: "pending",
          });

        if (opError) {
          console.warn("[Supabase] onepoint_enquiries insert notice:", opError.message);
        } else if (opStatus === 201 || opStatus === 200 || !opError) {
          supabaseSynced = true;
          console.log("[Supabase] Inserted into onepoint_enquiries successfully, id:", enquiryUuid);
        }

        // 4B. Dual Sync: NextGen inquiries table (so existing NextGen team dashboard sees it)
        const userAgent = request.headers.get("user-agent") || "OnePoint Website";
        const { error: nxgError, status: nxgStatus } = await supabase
          .from("inquiries")
          .insert({
            id: nxgTrackingId,
            name: fullName,
            email: email || `${mobileNumber}@onepoint.nextgen.org`,
            phone: mobileNumber,
            subject: `OnePoint: ${category} - ${schemeName}`,
            message: `${detailedDescription} [District: ${fullLocation}] [Contact: ${preferredContactMethod}]`,
            ip: ip !== "anonymous" ? ip : "web",
            user_agent: userAgent,
            status: "new",
          });

        if (nxgError) {
          console.warn("[Supabase] NextGen inquiries table sync notice:", nxgError.message);
        } else if (nxgStatus === 201 || nxgStatus === 200 || !nxgError) {
          supabaseSynced = true;
          console.log("[Supabase] Inserted into inquiries successfully, id:", nxgTrackingId);
        }
      } catch (sbErr) {
        console.warn("[Supabase] Insert error caught safely:", sbErr);
      }
    }

    // 5. Optional Secondary Sync: Google Form / Google Apps Script if URLs are provided
    const googleFormUrl = process.env.GOOGLE_FORM_URL;
    if (googleFormUrl && googleFormUrl.includes("formResponse")) {
      try {
        const formParams = new URLSearchParams();
        const entryMap: Record<string, string | undefined> = {
          [process.env.GOOGLE_FORM_ENTRY_FULL_NAME || "entry.1000001"]: fullName,
          [process.env.GOOGLE_FORM_ENTRY_MOBILE || "entry.1000002"]: mobileNumber,
          [process.env.GOOGLE_FORM_ENTRY_DISTRICT || "entry.1000003"]: district,
          [process.env.GOOGLE_FORM_ENTRY_SCHEME || "entry.1000004"]: schemeName,
          [process.env.GOOGLE_FORM_ENTRY_MESSAGE || "entry.1000005"]: message,
          [process.env.GOOGLE_FORM_ENTRY_EMAIL || "entry.1000006"]: email || "",
          [process.env.GOOGLE_FORM_ENTRY_TALUK || "entry.1000007"]: taluk,
          [process.env.GOOGLE_FORM_ENTRY_QUALIFICATION || "entry.1000008"]: qualification,
          [process.env.GOOGLE_FORM_ENTRY_SUBMISSION_ID || "entry.1000009"]: submissionId,
        };

        for (const [key, val] of Object.entries(entryMap)) {
          if (key && val) formParams.append(key, val);
        }

        fetch(googleFormUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formParams.toString(),
          mode: "no-cors",
          signal: AbortSignal.timeout(6000),
        }).catch(() => {});
      } catch (_) {}
    }

    return NextResponse.json({
      success: true,
      submissionId,
      supabaseSynced,
      supabaseRecordId,
      message:
        "Thank you! Your enquiry has been registered with ID " +
        submissionId +
        ". Our One Point team will reach out to you shortly.",
    });
  } catch (error) {
    console.error("Enquiry API fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while submitting your enquiry. Please try again or connect directly with our official WhatsApp support channel.",
      },
      { status: 500 }
    );
  }
}
