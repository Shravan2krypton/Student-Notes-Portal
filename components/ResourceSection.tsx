type Resource = { id: number; semester: number; type: string; url: string | null; label: string | null };
type Props = { resources: Resource[]; accentColor: string };

const ORD: Record<number, string> = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", 6: "6th", 7: "7th", 8: "8th" };

export default function ResourceSection({ resources, accentColor }: Props) {
  const bySem = resources.reduce<Record<number, Resource[]>>((acc, r) => {
    (acc[r.semester] ??= []).push(r);
    return acc;
  }, {});
  const sems = Object.keys(bySem)
    .map(Number)
    .sort((a, b) => a - b);

  if (!sems.length) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resources coming soon</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Notes and PYQs will appear here once they’re uploaded.
        </p>
        <div className="mt-5 flex justify-center">
          <span
            className="min-h-[48px] rounded-xl px-6 py-3 font-semibold text-white"
            style={{ backgroundColor: accentColor || "#2563eb" }}
          >
            Check back later
          </span>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
      {sems.map((sem) => {
        const list = bySem[sem] ?? [];
        const notes = list.find((r) => r.type === "notes");
        const papers = list.find((r) => r.type === "papers");
        const ord = ORD[sem] ?? `${sem}th`;
        return (
          <section
            key={sem}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-4">
              <div 
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md"
                style={{ backgroundColor: accentColor || "#2563eb" }}
              >
                {sem}
              </div>
            </div>
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{ord} Semester</h2>
            <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
              Study materials and previous year papers
            </p>
            <div className="space-y-3">
              {notes && (
                notes.url ? (
                  <a
                    href={notes.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{ backgroundColor: accentColor || "#2563eb" }}
                  >
                    <span aria-hidden className="text-lg">📄</span>
                    {notes.label ?? `${ord} Sem Notes`}
                  </a>
                ) : (
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-3 font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                    <span aria-hidden className="text-lg">📄</span>
                    {notes.label ?? "Notes Coming Soon"}
                  </div>
                )
              )}
              {papers && (
                papers.url ? (
                  <a
                    href={papers.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{ backgroundColor: accentColor || "#2563eb", opacity: 0.9 }}
                  >
                    <span aria-hidden className="text-lg">📝</span>
                    {papers.label ?? `${ord} Sem Papers`}
                  </a>
                ) : (
                  <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-3 font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                    <span aria-hidden className="text-lg">📝</span>
                    {papers.label ?? "Papers Coming Soon"}
                  </div>
                )
              )}
              {!notes && !papers && (
                <div className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-slate-500 dark:border-slate-600 dark:text-slate-400">
                  <span aria-hidden className="text-lg">📚</span>
                  No resources yet
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
