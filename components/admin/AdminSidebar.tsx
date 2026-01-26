"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  async function handle() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      // Handle error silently or show toast
      setLoading(false);
    }
  }
  
  return (
    <button
      type="button"
      onClick={handle}
      disabled={loading}
      className="mt-4 min-h-[44px] w-full rounded-xl px-4 py-3 text-left font-medium text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Logging out...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
          </svg>
          Logout
        </span>
      )}
    </button>
  );
}

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/departments", label: "Departments", icon: "🏢" },
  { href: "/admin/resources", label: "Resources", icon: "📚" },
  { href: "/admin/config", label: "Config", icon: "⚙️" },
  { href: "/admin/feedback", label: "Feedback", icon: "💬" },
];

export default function AdminSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed left-4 top-4 z-50 min-h-[44px] min-w-[44px] rounded-xl border border-slate-300/80 bg-white p-2 shadow-lg transition-all hover:shadow-xl dark:border-slate-600/80 dark:bg-slate-800 sm:hidden"
        aria-label="Menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200/80 bg-gradient-to-b from-slate-50 to-slate-100 pt-16 shadow-xl dark:border-slate-700/80 dark:from-slate-900 dark:to-slate-800 sm:pt-4 ${
          open ? "block" : "hidden sm:block"
        }`}
      >
        <div className="border-b border-slate-200/80 p-4 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-md">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">Admin Panel</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Student Notes Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1 p-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 min-h-[44px] rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                path === l.href
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-700/80"
              }`}
            >
              <span className="text-lg">{l.icon}</span>
              <span>{l.label}</span>
              {path === l.href && (
                <div className="ml-auto h-2 w-2 rounded-full bg-white opacity-50"></div>
              )}
            </Link>
          ))}
          <LogoutButton />
        </nav>
      </aside>
      
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
