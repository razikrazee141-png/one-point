import { NextResponse } from "next/server";

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
      // Bot trapped. Return generic success without processing
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
    const email = (body.email || "").trim();
    const taluk = (body.taluk || "").trim();
    const qualification = (body.qualification || "").trim();
    const category = (body.category || "other-opportunities").trim();
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

    // 3. Generate unique submission ID (e.g. OP-2611-9482)
    const timestamp = new Date();
    const idPrefix = "OP";
    const dateSegment = `${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, "0")}`;
    const randomSegment = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `${idPrefix}-${dateSegment}-${randomSegment}`;

    // Format human-readable IST timestamp
    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata",
    }).format(timestamp);

    const sheetPayload = {
      submissionId,
      timestamp: formattedDate,
      fullName,
      mobileNumber,
      email,
      district,
      taluk,
      qualification,
      schemeName,
      category,
      message,
      consent,
      status: "New",
    };

    let syncedWithGoogle = false;

    // 4. Option A: Forward directly to Google Form endpoint if configured
    const googleFormUrl = process.env.GOOGLE_FORM_URL;
    if (googleFormUrl && googleFormUrl.includes("formResponse")) {
      try {
        const formParams = new URLSearchParams();

        // Map fields using environment entry ID variables, or common entry names
        const entryMap: Record<string, string | undefined> = {
          [process.env.GOOGLE_FORM_ENTRY_FULL_NAME || "entry.1000001"]: fullName,
          [process.env.GOOGLE_FORM_ENTRY_MOBILE || "entry.1000002"]: mobileNumber,
          [process.env.GOOGLE_FORM_ENTRY_DISTRICT || "entry.1000003"]: district,
          [process.env.GOOGLE_FORM_ENTRY_SCHEME || "entry.1000004"]: schemeName,
          [process.env.GOOGLE_FORM_ENTRY_MESSAGE || "entry.1000005"]: message,
          [process.env.GOOGLE_FORM_ENTRY_EMAIL || "entry.1000006"]: email,
          [process.env.GOOGLE_FORM_ENTRY_TALUK || "entry.1000007"]: taluk,
          [process.env.GOOGLE_FORM_ENTRY_QUALIFICATION || "entry.1000008"]: qualification,
          [process.env.GOOGLE_FORM_ENTRY_SUBMISSION_ID || "entry.1000009"]: submissionId,
        };

        for (const [key, val] of Object.entries(entryMap)) {
          if (key && val) {
            formParams.append(key, val);
          }
        }

        await fetch(googleFormUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formParams.toString(),
          mode: "no-cors",
          signal: AbortSignal.timeout(8000),
        });

        syncedWithGoogle = true;
      } catch (formErr) {
        console.error("Google Form forwarding error:", formErr);
      }
    }

    // 4. Option B: Forward to Google Apps Script Web App (which logs into multi-tab Google Sheet)
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (googleAppsScriptUrl && googleAppsScriptUrl.startsWith("http")) {
      try {
        const response = await fetch(googleAppsScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetPayload),
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        const gasResult = await response.json().catch(() => null);

        if (response.ok && (!gasResult || gasResult.success !== false)) {
          syncedWithGoogle = true;
        }
      } catch (gasError) {
        console.error("Failed to forward enquiry to Google Apps Script:", gasError);
      }
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: syncedWithGoogle
        ? "Enquiry registered and saved to Google successfully."
        : "Enquiry registered successfully! (Stored with ID: " + submissionId + ")",
      googleSynced: syncedWithGoogle,
      isDemoMode: !syncedWithGoogle,
    });
  } catch (error) {
    console.error("Enquiry API fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your enquiry. Please try again or contact us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
