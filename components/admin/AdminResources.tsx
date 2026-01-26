"use client";

import { useState } from "react";
import type { Department, Resource } from "@/lib/schema";

export default function AdminResources({ initial, departments }: { initial: Resource[]; departments: Department[] }) {
  const [list, setList] = useState(initial);
  const [deptId, setDeptId] = useState(departments[0]?.id ?? 0);
  const [sem, setSem] = useState(1);
  const [type, setType] = useState<"notes" | "papers">("notes");
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<Resource | null>(null);

  async function load() {
    const res = await fetch("/api/admin/resources", { cache: "no-store" });
    if (res.ok) setList(await res.json());
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setSuccess("");
    const res = await fetch("/api/admin/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departmentId: deptId, semester: sem, type, url: url || null, label: label || null }),
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error || "Error"); return; }
    setSuccess("Resource added successfully!");
    setUrl(""); setLabel("");
    load();
  }

  async function update(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr("");
    setSuccess("");
    const res = await fetch(`/api/admin/resources/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departmentId: deptId, semester: sem, type, url: url || null, label: label || null }),
    });
    if (!res.ok) { setErr((await res.json()).error || "Error"); return; }
    setSuccess("Resource updated successfully!");
    setEditing(null); setUrl(""); setLabel("");
    load();
  }

  async function remove(r: Resource) {
    if (!confirm("Delete this resource?")) return;
    setErr("");
    setSuccess("");
    const res = await fetch(`/api/admin/resources/${r.id}`, { method: "DELETE" });
    if (!res.ok) { setErr("Failed to delete resource"); return; }
    setSuccess("Resource deleted successfully!");
    load();
  }

  function startEdit(r: Resource) {
    setEditing(r);
    setDeptId(r.departmentId);
    setSem(r.semester);
    setType(r.type as "notes" | "papers");
    setUrl(r.url || "");
    setLabel(r.label || "");
  }

  const dept = (id: number) => departments.find((d) => d.id === id)?.slug ?? id;

  return (
    <div className="space-y-8">
      <form onSubmit={editing ? update : create} className="flex flex-wrap gap-4 rounded-2xl border bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <select value={deptId} onChange={(e) => setDeptId(Number(e.target.value))} className="rounded-lg border px-3 py-2 dark:bg-slate-700 dark:border-slate-600">
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.slug}</option>
          ))}
        </select>
        <select value={sem} onChange={(e) => setSem(Number(e.target.value))} className="rounded-lg border px-3 py-2 dark:bg-slate-700 dark:border-slate-600">
          {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value as "notes"|"papers")} className="rounded-lg border px-3 py-2 dark:bg-slate-700 dark:border-slate-600">
          <option value="notes">notes</option>
          <option value="papers">papers</option>
        </select>
        <input placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} className="min-w-[200px] rounded-lg border px-3 py-2 dark:bg-slate-700 dark:border-slate-600" />
        <input placeholder="label" value={label} onChange={(e) => setLabel(e.target.value)} className="rounded-lg border px-3 py-2 dark:bg-slate-700 dark:border-slate-600" />
        <button type="submit" className="min-h-[44px] rounded-lg bg-primary px-4 py-2 text-white">{editing ? "Update" : "Add"}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setUrl(""); setLabel(""); }}>Cancel</button>}
      </form>
      {err && <p className="text-red-600">{err}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <ul className="space-y-2">
        {list.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-white py-2 px-4 dark:border-slate-700 dark:bg-slate-800">
            <span className="text-sm">{dept(r.departmentId)} · sem{r.semester} · {r.type} — {r.label || r.url || "—"}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => startEdit(r)} className="min-h-[44px] rounded-lg border px-3 py-1">Edit</button>
              <button type="button" onClick={() => remove(r)} className="min-h-[44px] rounded-lg border border-red-300 px-3 py-1 text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
