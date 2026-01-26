import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departments } from "@/lib/schema";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db.select().from(departments);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const slug = String(b.slug ?? "").trim();
  const name = String(b.name ?? "").trim();
  if (!slug || !name) return NextResponse.json({ error: "slug and name required" }, { status: 400 });
  const [r] = await db.insert(departments).values({
    slug,
    name,
    description: b.description?.trim() || null,
    accentColor: b.accentColor?.trim() || null,
    icon: b.icon?.trim() || null,
  }).returning();
  return NextResponse.json(r);
}
