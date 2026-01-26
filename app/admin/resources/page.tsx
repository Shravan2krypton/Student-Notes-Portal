import { db } from "@/lib/db";
import { departments, resources } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminResources from "@/components/admin/AdminResources";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const ok = await requireAdminApi();
  if (!ok) redirect("/admin/login");
  const [depts, res] = await Promise.all([
    db.select().from(departments),
    db.select().from(resources),
  ]);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Resources</h1>
      <AdminResources initial={res} departments={depts} />
    </div>
  );
}
