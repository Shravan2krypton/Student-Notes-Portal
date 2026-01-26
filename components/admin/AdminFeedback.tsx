"use client";

import { useState, useEffect } from "react";

type Item = { id: number; message: string; contact: string | null; createdAt: string };

export default function AdminFeedback() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function load(p = 1) {
    setLoading(true);
    const res = await fetch(`/api/admin/feedback?page=${p}&limit=20`);
    const data = await res.json();
    if (res.ok) setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => { load(page); }, [page]);

  async function remove(id: number) {
    if (!confirm("Delete this feedback?")) return;
    await fetch(`/api/admin/feedback/${id}`, { method: "DELETE" });
    load(page);
  }

  return (
    <div className="space-y-4">
      {loading && <p>Loading…</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 dark:border-slate-600">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              <th className="border border-slate-300 p-2 text-left dark:border-slate-600">Date</th>
              <th className="border border-slate-300 p-2 text-left dark:border-slate-600">Message</th>
              <th className="border border-slate-300 p-2 text-left dark:border-slate-600">Contact</th>
              <th className="border border-slate-300 p-2 dark:border-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td className="border border-slate-300 p-2 text-sm dark:border-slate-600">{new Date(i.createdAt).toLocaleString()}</td>
                <td className="max-w-md border border-slate-300 p-2 truncate dark:border-slate-600">{i.message}</td>
                <td className="border border-slate-300 p-2 dark:border-slate-600">{i.contact || "—"}</td>
                <td className="border border-slate-300 p-2 dark:border-slate-600">
                  <button type="button" onClick={() => remove(i.id)} className="min-h-[44px] min-w-[44px] rounded px-2 text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="min-h-[44px] rounded-lg border px-4 py-2 disabled:opacity-50">Prev</button>
        <button type="button" onClick={() => setPage((p) => p + 1)} className="min-h-[44px] rounded-lg border px-4 py-2">Next</button>
      </div>
    </div>
  );
}
