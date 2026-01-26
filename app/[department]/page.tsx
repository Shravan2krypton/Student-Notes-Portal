import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { departments, resources } from "@/lib/schema";
import { eq } from "drizzle-orm";
import ResourceSection from "@/components/ResourceSection";

export const dynamic = "force-dynamic";

const DEFAULT_ICONS: Record<string, string> = { 
  computer: "💻", 
  ec: "📡",
  mechanical: "⚙️",
  civil: "🏗️",
  electrical: "⚡",
  chemical: "🧪",
  it: "💾",
  default: "📂"
};

function getDepartmentIcon(slug: string, icon?: string | null): string {
  if (icon) return icon;
  return DEFAULT_ICONS[slug] || DEFAULT_ICONS.default;
}

type Props = { params: Promise<{ department: string }> };

export default async function DepartmentPage({ params }: Props) {
  const { department: slug } = await params;
  const [dept] = await db.select().from(departments).where(eq(departments.slug, slug));
  if (!dept) notFound();

  const res = await db.select().from(resources).where(eq(resources.departmentId, dept.id));
  const accent = dept.accentColor || "#2563eb";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header
        className="relative mb-10 overflow-hidden rounded-2xl border-b-4 bg-gradient-to-br from-slate-900 to-slate-950 px-4 py-6 text-center shadow-xl sm:px-6 sm:py-8 md:px-8 md:py-10"
        style={{ borderBottomColor: accent }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        
        {/* Back to Home Button */}
        <div className="absolute left-2 top-2 z-10 sm:left-4 sm:top-4 md:left-6 md:top-6">
          <Link
            href="/"
            aria-label="Back to home"
            className="group inline-flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-2 py-1.5 text-xs font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg hover:bg-white/20 active:scale-95 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-2.5 min-h-[44px] min-w-[44px]"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 transition-transform group-hover:-translate-x-1 sm:h-4 sm:w-4 md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        
        <div className="relative">
          <div className="mb-4 flex justify-center">
            <div 
              className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl shadow-lg"
              style={{ backgroundColor: accent, color: 'white' }}
            >
              {getDepartmentIcon(dept.slug, dept.icon)}
            </div>
          </div>
          <h1 className="text-2xl font-extrabold sm:text-3xl" style={{ color: accent, textShadow: `0 0 16px ${accent}` }}>
            {dept.name} Department
          </h1>
          <p className="mt-3 text-slate-200/90">
            Notes and previous year papers — organized semester wise
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {dept.slug === "computer" ? (
              <>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white">💻 Computer Science</span>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white">🧩 Programming</span>
              </>
            ) : (
              <>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white">🛰️ Electronics</span>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white">⚡ Communication</span>
              </>
            )}
          </div>
        </div>
      </header>

      <ResourceSection resources={res} accentColor={accent} />
    </main>
  );
}
