import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

const COOKIE = "admin_session";
const PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function getSession(): Promise<boolean> {
  const c = await cookies();
  const v = c.get(COOKIE)?.value;
  return v === "1";
}

export function checkPassword(pw: string): boolean {
  return !!PASSWORD && pw === PASSWORD;
}

const OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export function setSession(res: NextResponse): NextResponse {
  res.cookies.set(COOKIE, "1", OPTS);
  return res;
}

export function clearSession(res: NextResponse): NextResponse {
  res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export async function requireAdminApi(): Promise<boolean> {
  return getSession();
}
