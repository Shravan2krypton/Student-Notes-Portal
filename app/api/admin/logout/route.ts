import { NextResponse } from "next/server";
import { clearSession } from "@/lib/admin-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  await clearSession(res);
  return res;
}
