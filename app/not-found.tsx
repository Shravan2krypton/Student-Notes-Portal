import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">The department or page you’re looking for doesn’t exist.</p>
      <Link href="/" className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
        Go home
      </Link>
    </main>
  );
}
