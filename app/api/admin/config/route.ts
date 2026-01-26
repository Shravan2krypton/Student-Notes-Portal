import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { config } from "@/lib/schema";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(config);
  const obj = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return NextResponse.json(obj);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const updates = (b.updates && typeof b.updates === "object") ? b.updates : (b.key != null ? { [b.key]: b.value } : {});
  for (const [k, v] of Object.entries(updates)) {
    if (typeof k !== "string" || k.length > 64) continue;
    await db.insert(config).values({ key: k, value: v == null ? null : String(v) })
      .onConflictDoUpdate({ target: config.key, set: { value: v == null ? null : String(v) } });
  }
  const rows = await db.select().from(config);
  return NextResponse.json(Object.fromEntries(rows.map((r) => [r.key, r.value])));
}
