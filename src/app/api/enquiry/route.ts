import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

interface EnquiryPayload {
  fullName: string;
  mobileNumber: string;
  email?: string;
  district: string;
  taluk?: string;
  qualification?: string;
  institutionName?: string;
  dateOfBirth?: string;
  schemeName: string;
  category?: string;
  message: string;
  consent: boolean;
  formType?: "enquiry" | "student_application" | "service_request";
  preferredContactMethod?: "whatsapp" | "phone" | "email";
  website_honeypot?: string; // Anti-spam trap
}

// In-memory rate limiting map for basic spam protection (by IP / mobile)
const rateLimitMap = new Map<string, { count: number; lastTime: number }>();

function isRateLimited(key: string, limit = 5, windowMs = 60000): boolean {
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
    const schemeName = (body.schemeName || "General Service Assistance").trim();
    const message = (body.message || "").trim();
    const email = (body.email || "").trim() || null;
    const taluk = (body.taluk || "").trim();
    const qualification = (body.qualification || "").trim();
    const institutionName = (body.institutionName || "").trim();
    const dateOfBirth = (body.dateOfBirth || "").trim() || null;
    const category = (body.category || "other-opportunities").trim();
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

    // 3. Generate unique submission tracking ID
    const timestamp = new Date();
    const idPrefix = "OP";
    const dateSegment = `${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, "0")}`;
    const randomSegment = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `${idPrefix}-${dateSegment}-${randomSegment}`;

    let supabaseTargetTable = "onepoint_enquiries";
    let supabaseRecordId: string | null = null;
    let supabaseSynced = false;
    let supabaseNotice: string | null = null;

    // 4. Supabase Database Integration
    const supabase = getSupabase();
    if (supabase) {
      try {
        const isSchemeApplication =
          body.formType === "student_application" ||
          category === "scholarships" ||
          category === "education-loans" ||
          category === "admissions" ||
          (schemeName && schemeName !== "General Service Assistance" && schemeName !== "General Tech Zone / Student Assistance");

        const isServiceRequest =
          body.formType === "service_request" ||
          category === "digital-services" ||
          category === "technology-solutions";

        if (isServiceRequest) {
          supabaseTargetTable = "onepoint_service_requests";
          const { data, error } = await supabase
            .from("onepoint_service_requests")
            .insert({
              full_name: fullName,
              phone_number: mobileNumber,
              email: email,
              service_type: schemeName,
              description: `${message}${district ? ` [District: ${district}${taluk ? `, ${taluk}` : ""}]` : ""}`,
              status: "pending",
            })
            .select("id")
            .single();

          if (error) {
            console.warn("[Supabase] onepoint_service_requests insert:", error.message);
            supabaseNotice = error.message;
          } else if (data) {
            supabaseRecordId = data.id;
            supabaseSynced = true;
          }
        } else if (isSchemeApplication) {
          supabaseTargetTable = "onepoint_student_applications";
          const { data, error } = await supabase
            .from("onepoint_student_applications")
            .insert({
              full_name: fullName,
              phone_number: mobileNumber,
              email: email,
              date_of_birth: dateOfBirth,
              education_level: qualification || null,
              institution_name: institutionName || taluk || null,
              district: district,
              application_type: category,
              scheme_name: schemeName,
              additional_information: message,
              status: "pending",
            })
            .select("id")
            .single();

          if (error) {
            console.warn("[Supabase] onepoint_student_applications insert:", error.message);
            supabaseNotice = error.message;
          } else if (data) {
            supabaseRecordId = data.id;
            supabaseSynced = true;
          }
        } else {
          // General Enquiry -> onepoint_enquiries
          supabaseTargetTable = "onepoint_enquiries";
          const { data, error } = await supabase
            .from("onepoint_enquiries")
            .insert({
              full_name: fullName,
              phone_number: mobileNumber,
              email: email,
              location: `${district}${taluk ? `, ${taluk}` : ""}`,
              service_category: category,
              service_description: `[Scheme: ${schemeName}] ${message}`,
              preferred_contact_method: preferredContactMethod,
              status: "pending",
            })
            .select("id")
            .single();

          if (error) {
            console.warn("[Supabase] onepoint_enquiries insert:", error.message);
            supabaseNotice = error.message;
          } else if (data) {
            supabaseRecordId = data.id;
            supabaseSynced = true;
          }
        }
      } catch (sbErr) {
        console.error("[Supabase] Execution error:", sbErr);
      }
    }

    // 5. Optional Secondary Sync: Google Form
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
        }).catch((err) => console.warn("[Google Form] Background sync notice:", err));
      } catch (gErr) {
        console.warn("[Google Form] Sync error:", gErr);
      }
    }

    // 6. Optional Secondary Sync: Google Apps Script
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (googleAppsScriptUrl && googleAppsScriptUrl.startsWith("http")) {
      try {
        fetch(googleAppsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            timestamp: new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "medium",
              timeZone: "Asia/Kolkata",
            }).format(timestamp),
            fullName,
            mobileNumber,
            email: email || "",
            district,
            taluk,
            qualification,
            schemeName,
            category,
            message,
            consent,
            status: "New",
          }),
          signal: AbortSignal.timeout(6000),
        }).catch((err) => console.warn("[Google Apps Script] Background sync notice:", err));
      } catch (gasErr) {
        console.warn("[Google Apps Script] Sync error:", gasErr);
      }
    }

    return NextResponse.json({
      success: true,
      submissionId,
      supabaseTable: supabaseTargetTable,
      supabaseSynced,
      supabaseRecordId,
      notice: supabaseNotice ? "Database tables pending SQL migration" : undefined,
      message: "Enquiry registered successfully! Your tracking ID is " + submissionId + ".",
    });
  } catch (error) {
    console.error("Enquiry API fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your enquiry. Please try again or chat directly on WhatsApp at 8197803617.",
      },
      { status: 500 }
    );
  }
}
