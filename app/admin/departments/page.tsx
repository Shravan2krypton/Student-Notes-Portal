import { db } from "@/lib/db";
import { departments } from "@/lib/schema";
import { requireAdminApi } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminDepartments from "@/components/admin/AdminDepartments";

export const dynamic = "force-dynamic";

export default async function AdminDepartmentsPage() {
  const ok = await requireAdminApi();
  if (!ok) redirect("/admin/login");
  const list = await db.select().from(departments);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Departments</h1>
      <AdminDepartments initial={list} />
    </div>
  );
}
