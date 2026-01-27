import { db } from "@/lib/db";
import { departments, config } from "@/lib/schema";
import { eq } from "drizzle-orm";
import DepartmentCard from "@/components/DepartmentCard";
import QuoteCarousel from "@/components/QuoteCarousel";
import Link from "next/link";

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

function getDepartmentIcon(slug: string, icon?: string): string {
  if (icon) return icon;
  return DEFAULT_ICONS[slug] || DEFAULT_ICONS.default;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const [deptRows, quotesRow] = await Promise.all([
    db.select().from(departments),
    db.select().from(config).where(eq(config.key, "quotes")).then((r) => r[0]),
  ]);

  const quotes: { text: string; by: string }[] = (() => {
    try {
      return quotesRow?.value ? JSON.parse(quotesRow.value) : [];
    } catch {
      return [];
    }
  })();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero */}
      <section className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 via-green-100/60 to-amber-100/60 p-8 shadow-2xl dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800/60 sm:p-12 md:p-16">
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Empowering Students, One Note at a Time
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 sm:text-xl">
  {"Success doesn't come from what you do occasionally; it comes from what you do consistently."} Find
  curated notes, PYQs, and uploads from seniors — all in one place.
</p>

            <div className="flex flex-col gap-4 sm:flex-row">
              {deptRows.slice(0, 2).map((dept) => (
                <Link
                  key={dept.id}
                  href={`/${dept.slug}`}
                  className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
                    deptRows.indexOf(dept) === 0 
                      ? 'bg-primary text-white' 
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary'
                  }`}
                >
                  Explore {dept.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 p-6 dark:border-slate-600 dark:bg-slate-800/60">
            <div className="flex gap-4 text-4xl">📚 ✨ 🧠</div>
            <p className="mt-4 text-center font-medium text-slate-700 dark:text-slate-300">
              Study smarter — your seniors have your back.
            </p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Explore Departments</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Choose your branch to access curated notes, PYQs, and study materials from seniors
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {deptRows.map((d) => (
            <DepartmentCard
              key={d.id}
              slug={d.slug}
              name={d.name}
              description={d.description}
              icon={getDepartmentIcon(d.slug, d.icon || undefined)}
              accentColor={d.accentColor}
            />
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section className="rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 p-8 shadow-xl dark:from-slate-800 dark:to-slate-900">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Stay Inspired</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Daily motivation to keep you going on your academic journey
          </p>
        </div>
        <QuoteCarousel quotes={quotes} />
      </section>
    </main>
  );
}
