"use client";

import { useState } from "react";
import type { Department } from "@/lib/schema";

export default function AdminDepartments({ initial }: { initial: Department[] }) {
  const [list, setList] = useState(initial);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [accent, setAccent] = useState("");
  const [icon, setIcon] = useState("");
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState<Department | null>(null);

  async function load() {
    const res = await fetch("/api/admin/departments", { cache: "no-store" });
    if (res.ok) setList(await res.json());
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/admin/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name, description: desc || null, accentColor: accent || null, icon: icon || null }),
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error || "Error"); return; }
    setSlug(""); setName(""); setDesc(""); setAccent(""); setIcon("");
    load();
  }

  async function update(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setErr("");
    const res = await fetch(`/api/admin/departments/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name, description: desc || null, accentColor: accent || null, icon: icon || null }),
    });
    if (!res.ok) { setErr((await res.json()).error || "Error"); return; }
    setEditing(null); setSlug(""); setName(""); setDesc(""); setAccent(""); setIcon("");
    load();
  }

  async function remove(d: Department) {
    if (!confirm(`Delete ${d.name}?`)) return;
    await fetch(`/api/admin/departments/${d.id}`, { method: "DELETE" });
    load();
  }

  function startEdit(d: Department) {
    setEditing(d);
    setSlug(d.slug);
    setName(d.name);
    setDesc(d.description || "");
    setAccent(d.accentColor || "");
    setIcon(d.icon || "");
  }

  return (
    <div className="space-y-8">
      <form onSubmit={editing ? update : create} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-700/80 dark:bg-slate-800">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {editing ? "Edit Department" : "Add New Department"}
          </h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              placeholder="e.g., computer"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
            />
          </div>
          
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Department Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Computer Science"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
            />
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Brief description of the department"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
            />
          </div>
          
          <div>
            <label htmlFor="accent" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Accent Color
            </label>
            <input
              id="accent"
              type="text"
              placeholder="#2563eb"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="icon" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Icon (emoji)
          </label>
          <input
            id="icon"
            type="text"
            placeholder="📚 (optional)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Leave empty to use default icon</p>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="min-h-[44px] rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            {editing ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7l-7-4z" />
                </svg>
                Update Department
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8 0v.01M3 12h18" />
                </svg>
                Add Department
              </span>
            )}
          </button>
          
          {editing && (
            <button
              type="button"
              onClick={() => { setEditing(null); setSlug(""); setName(""); setDesc(""); setAccent(""); setIcon(""); }}
              className="min-h-[44px] rounded-xl border border-slate-300/80 bg-white px-6 py-3 font-medium text-slate-700 shadow-md transition-all hover:bg-slate-50 dark:border-slate-600/80 dark:bg-slate-800 dark:text-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      {err && (
        <div className="rounded-xl border border-error-200/80 bg-error-50 p-4 dark:border-error-800/80 dark:bg-error-900/30">
          <p className="text-error-800 dark:text-error-200 flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {err}
          </p>
        </div>
      )}
      
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-700/80 dark:bg-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Existing Departments</h3>
        <ul className="space-y-3">
          {list.map((d) => (
            <li
              key={d.id}
              className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30 dark:border-slate-700/80 dark:bg-slate-800 dark:hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md"
                  style={{ backgroundColor: d.accentColor || "#2563eb" }}
                >
                  <span className="text-lg font-bold">
                    {d.slug === "computer" ? "CS" : d.slug.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{d.name}</div>
                  {d.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{d.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(d)}
                  className="min-h-[44px] rounded-lg border border-slate-300/80 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-600/80 dark:bg-slate-800 dark:text-slate-300"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2H5a2 2 0 002-2V5a2 2 0 012-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 7H4l7 7 7-7" />
                  </svg>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(d)}
                  className="min-h-[44px] rounded-xl border border-error-300/80 bg-white px-4 py-2 font-medium text-error-600 shadow-sm transition-all hover:bg-error-50 dark:border-error-600/80 dark:bg-slate-800 dark:text-error-400"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 7.868A3.125 3.125 0 005.364 0H5a3.125 3.125 0 00-3.125 3.125v-8.75z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6 6 12l12 12" />
                  </svg>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
