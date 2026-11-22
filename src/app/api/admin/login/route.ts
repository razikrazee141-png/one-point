import { NextResponse } from "next/server";
import { getAdminCredentials, createAdminSessionToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = (body.username || "").trim();
    const password = (body.password || "").trim();

    const { username: validUsername, password: validPassword } = getAdminCredentials();

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid username or passcode. Please check your credentials." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(username);

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      user: { username },
    });

    response.cookies.set({
      name: "onepoint_admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication system error occurred." },
      { status: 500 }
    );
  }
}
