export default function LoadingDepartment() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="mt-6 h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="space-y-8">
        {[1, 2, 3].map((k) => (
          <section
            key={k}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mx-auto h-6 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mx-auto mt-4 h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

