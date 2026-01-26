"use client";

import { useState, useEffect } from "react";

const KEYS = ["whatsapp_number", "whatsapp_message", "contact_page_message", "quotes"];

export default function AdminConfig() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((o) => setValues(o))
      .catch(() => setErr("Failed to load"));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setSaved(false);
    const res = await fetch("/api/admin/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates: values }),
    });
    if (!res.ok) { setErr((await res.json()).error || "Error"); return; }
    setSaved(true);
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {KEYS.map((k) => (
        <div key={k}>
          <label className="mb-1 block font-medium">{k}</label>
          <textarea
            value={values[k] ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
            rows={k === "quotes" ? 8 : 2}
            className="w-full rounded-lg border px-3 py-2 font-mono text-sm dark:bg-slate-700 dark:border-slate-600"
          />
        </div>
      ))}
      {err && <p className="text-red-600">{err}</p>}
      {saved && <p className="text-green-600">Saved.</p>}
      <button type="submit" className="min-h-[44px] rounded-lg bg-primary px-6 py-2 text-white">Save</button>
    </form>
  );
}
