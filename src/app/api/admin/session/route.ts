import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSessionToken, getAdminCredentials } from "@/lib/adminAuth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("onepoint_admin_token")?.value;

  const isValid = verifyAdminSessionToken(token);
  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { username } = getAdminCredentials();
  return NextResponse.json({
    authenticated: true,
    user: { username },
  });
}
