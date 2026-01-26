import { requireAdminApi } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminConfig from "@/components/admin/AdminConfig";

export const dynamic = "force-dynamic";

export default async function AdminConfigPage() {
  const ok = await requireAdminApi();
  if (!ok) redirect("/admin/login");
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Config</h1>
      <AdminConfig />
    </div>
  );
}
