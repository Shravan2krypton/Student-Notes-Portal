import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resources, departments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = req.nextUrl.searchParams.get("department");
  const base = db
    .select({
      id: resources.id,
      departmentId: resources.departmentId,
      departmentSlug: departments.slug,
      semester: resources.semester,
      type: resources.type,
      url: resources.url,
      label: resources.label,
    })
    .from(resources)
    .innerJoin(departments, eq(resources.departmentId, departments.id));
  const rows = slug ? await base.where(eq(departments.slug, slug)) : await base;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const departmentId = typeof b.departmentId === "number" ? b.departmentId : parseInt(String(b.departmentId), 10);
  const semester = typeof b.semester === "number" ? b.semester : parseInt(String(b.semester), 10);
  const type = String(b.type ?? "notes").trim();
  if (isNaN(departmentId) || isNaN(semester) || !["notes", "papers"].includes(type)) {
    return NextResponse.json({ error: "departmentId, semester (1-8), type (notes|papers) required" }, { status: 400 });
  }
  const [r] = await db.insert(resources).values({
    departmentId,
    semester,
    type,
    url: b.url?.trim() || null,
    label: b.label?.trim() || null,
  }).returning();
  return NextResponse.json(r);
}
