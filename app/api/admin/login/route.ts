import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const pw = typeof body.password === "string" ? body.password : "";
  if (!checkPassword(pw)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  await setSession(res);
  return res;
}
