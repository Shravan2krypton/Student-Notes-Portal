import Link from "next/link";

const CARDS = [
  { href: "/admin/departments", label: "Departments", desc: "Add or edit departments", icon: "🏢" },
  { href: "/admin/resources", label: "Resources", desc: "Manage notes and papers links", icon: "📚" },
  { href: "/admin/config", label: "Config", desc: "WhatsApp, contact, quotes", icon: "⚙️" },
  { href: "/admin/feedback", label: "Feedback", desc: "View and manage feedback", icon: "💬" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your Student Notes Portal</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group block rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 dark:border-slate-700/80 dark:bg-slate-800 dark:hover:border-primary/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-md transition-transform group-hover:scale-110">
                <span className="text-xl">{c.icon}</span>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white text-lg">{c.label}</h2>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{c.desc}</p>
            <div className="mt-4 flex items-center text-primary group-hover:text-accent transition-colors">
              <span className="text-sm font-medium">Manage</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 rounded-xl border border-slate-200/80 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Quick Stats</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Monitor your portal performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
