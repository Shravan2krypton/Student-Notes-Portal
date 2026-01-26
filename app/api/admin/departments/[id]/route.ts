import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const b = await req.json().catch(() => ({}));
  const upd: Record<string, unknown> = {};
  if (typeof b.slug === "string") upd.slug = b.slug.trim();
  if (typeof b.name === "string") upd.name = b.name.trim();
  if (b.description !== undefined) upd.description = b.description?.trim() || null;
  if (b.accentColor !== undefined) upd.accentColor = b.accentColor?.trim() || null;
  if (b.icon !== undefined) upd.icon = b.icon?.trim() || null;
  const [r] = await db.update(departments).set(upd).where(eq(departments.id, id)).returning();
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(r);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await db.delete(departments).where(eq(departments.id, id));
  return NextResponse.json({ ok: true });
}
