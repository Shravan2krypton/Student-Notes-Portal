"use client";

import { useState, useEffect } from "react";

type Quote = { text: string; by: string };

export default function QuoteCarousel({ quotes }: { quotes: Quote[] }) {
  const [idx, setIdx] = useState(0);
  const list = quotes.length ? quotes : [{ text: "Dream big, work hard, stay humble.", by: "Anonymous" }];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  return (
    <div className="rounded-2xl border border-white/20 bg-white/60 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/60" role="region" aria-label="Inspiration quotes">
      <blockquote className="text-center">
        <p className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">"{list[idx]?.text}"</p>
        <footer className="mt-4 text-lg text-slate-600 dark:text-slate-400">— {list[idx]?.by}</footer>
      </blockquote>
      <div className="mt-8 flex justify-center gap-3" role="tablist" aria-label="Quote navigation">
        {list.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === idx 
                ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500" 
                : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
            }`}
            aria-label={`Go to quote ${i + 1}`}
            aria-selected={i === idx}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}
