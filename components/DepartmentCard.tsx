import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  description: string | null;
  icon: string;
  accentColor?: string | null;
};

export default function DepartmentCard({ slug, name, description, icon, accentColor }: Props) {
  const color = accentColor || "#2563eb";
  
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-800">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-slate-900 dark:text-white text-lg">{name}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{description || ""}</div>
          </div>
        </div>
        <Link
          href={`/${slug}`}
          className="shrink-0 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          View notes
        </Link>
      </div>
    </div>
  );
}
