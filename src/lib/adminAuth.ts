import crypto from "crypto";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "onepoint@2026";
const DEFAULT_SECRET = "onepoint_secure_token_secret_nextgen_2026";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_USERNAME,
    password: process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD,
    secret: process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET,
  };
}

export function createAdminSessionToken(username: string): string {
  const { secret } = getAdminCredentials();
  const payload = {
    u: username,
    t: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token || !token.includes(".")) return false;

  try {
    const { secret, username: expectedUser } = getAdminCredentials();
    const [payloadB64, signature] = token.split(".");

    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(payloadB64)
      .digest("base64url");

    if (signature !== expectedSig) return false;

    const payloadStr = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadStr);

    if (!payload.exp || Date.now() > payload.exp) {
      return false;
    }

    if (payload.u !== expectedUser) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
