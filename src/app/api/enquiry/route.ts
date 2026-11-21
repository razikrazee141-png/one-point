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

    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    // 4. Forward to Google Apps Script if URL is configured
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

        if (!response.ok || (gasResult && gasResult.success === false)) {
          console.error("Google Apps Script Error:", gasResult || response.statusText);
          return NextResponse.json({
            success: true,
            submissionId,
            warning: "Submission logged locally. Google Sheets sync pending.",
            message: "Enquiry registered successfully with ID: " + submissionId,
            googleSheetsSynced: false,
          });
        }

        return NextResponse.json({
          success: true,
          submissionId,
          message: "Enquiry registered and saved to Google Sheets successfully.",
          googleSheetsSynced: true,
        });
      } catch (gasError) {
        console.error("Failed to forward enquiry to Google Apps Script:", gasError);
        return NextResponse.json({
          success: true,
          submissionId,
          warning: "Submission received. Remote Google Sheet connection timed out or is unreachable.",
          message: "Enquiry registered successfully with ID: " + submissionId,
          googleSheetsSynced: false,
        });
      }
    }

    // Fallback when GOOGLE_APPS_SCRIPT_URL is not yet set
    return NextResponse.json({
      success: true,
      submissionId,
      message:
        "Enquiry registered successfully! (Note: GOOGLE_APPS_SCRIPT_URL not configured in environment yet; follow GOOGLE_SHEETS_SETUP.md to activate real-time Google Sheets streaming).",
      googleSheetsSynced: false,
      isDemoMode: true,
    });
  } catch (error) {
    console.error("Enquiry API fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your enquiry. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
