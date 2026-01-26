import { requireAdminApi } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminFeedback from "@/components/admin/AdminFeedback";

export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage() {
  const ok = await requireAdminApi();
  if (!ok) redirect("/admin/login");
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Feedback</h1>
      <AdminFeedback />
    </div>
  );
}
