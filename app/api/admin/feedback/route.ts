import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { feedback } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") ?? "20", 10)));
  const offset = (page - 1) * limit;
  const rows = await db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(limit).offset(offset);
  return NextResponse.json({ items: rows });
}
