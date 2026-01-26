"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
  ] as const;

  function linkClass(href: string) {
    const active = pathname === href;
    return [
      "min-h-[44px] rounded-lg px-4 py-2.5 font-semibold transition",
      active
        ? "bg-primary text-white shadow-sm"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    ].join(" ");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm dark:border-slate-800/80 dark:bg-slate-900/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105" aria-label="Student Notes Portal - Home">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-highlight font-bold text-white shadow-lg transition-all hover:shadow-xl" aria-hidden="true">
            SN
          </div>
          <span className="text-xl font-bold text-primary">Student Notes Portal</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <div className="hidden gap-2 sm:flex" role="navigation" aria-label="Main navigation">
            {nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={linkClass(item.href)}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-gradient-to-r from-primary to-accent px-3 py-2 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="min-h-[44px] min-w-[44px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800 sm:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 sm:hidden" role="navigation" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
                onClick={() => setOpen(false)}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
