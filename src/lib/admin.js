import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "portfolio_admin_session";

function getSessionToken() {
  const pin = process.env.ADMIN_PIN;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!pin || !sessionSecret) {
    throw new Error(
      "ADMIN_PIN dan ADMIN_SESSION_SECRET belum dikonfigurasi di environment server.",
    );
  }

  return createHash("sha256")
    .update(`${sessionSecret}:${pin}`)
    .digest("hex");
}

export function isValidAdminPin(pin) {
  const configuredPin = process.env.ADMIN_PIN;

  if (!configuredPin || !pin) {
    return false;
  }

  const received = Buffer.from(pin);
  const expected = Buffer.from(configuredPin);

  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  const received = Buffer.from(token);
  const expected = Buffer.from(getSessionToken());

  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

export async function setAdminSession() {
  (await cookies()).set(SESSION_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Akses admin ditolak.");
  }
}
