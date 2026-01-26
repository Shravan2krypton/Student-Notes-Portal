import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resources } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const b = await req.json().catch(() => ({}));
  const upd: Record<string, unknown> = {};
  if (b.departmentId !== undefined) upd.departmentId = typeof b.departmentId === "number" ? b.departmentId : parseInt(String(b.departmentId), 10);
  if (b.semester !== undefined) upd.semester = typeof b.semester === "number" ? b.semester : parseInt(String(b.semester), 10);
  if (b.type !== undefined) upd.type = b.type;
  if (b.url !== undefined) upd.url = b.url?.trim() || null;
  if (b.label !== undefined) upd.label = b.label?.trim() || null;
  const [r] = await db.update(resources).set(upd).where(eq(resources.id, id)).returning();
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(r);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await db.delete(resources).where(eq(resources.id, id));
  return NextResponse.json({ ok: true });
}
