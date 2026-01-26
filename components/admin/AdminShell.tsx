"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/admin/login") return <>{children}</>;
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="min-h-screen flex-1 pl-0 sm:pl-64">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
