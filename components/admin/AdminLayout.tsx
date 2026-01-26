"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const path = usePathname();
  
  // Don't show sidebar on login page
  if (path === "/admin/login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex min-h-[80vh] items-center justify-center px-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <AdminSidebar />
      <main className="min-h-screen flex-1 pl-0 sm:pl-64">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
