"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validation
    if (message.trim().length < 10) {
      setError("Message must be at least 10 characters long.");
      setStatus("error");
      return;
    }
    
    if (message.trim().length > 2000) {
      setError("Message must be less than 2000 characters.");
      setStatus("error");
      return;
    }
    
    if (contact && !isValidContact(contact)) {
      setError("Please enter a valid email address or phone number.");
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    setError("");
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), contact: contact?.trim() || undefined }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error: ${res.status}`);
      }
      
      setStatus("success");
      setMessage("");
      setContact("");
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "Network error. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setStatus("error");
    }
  }

  function isValidContact(contact: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = contact.replace(/\s/g, '');
    return emailRegex.test(contact) || phoneRegex.test(cleanPhone);
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success-200 bg-gradient-to-br from-success-50 to-emerald-50 p-8 text-center shadow-lg dark:border-success-800 dark:from-slate-800 dark:to-slate-700">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success-500 to-emerald-600 text-white shadow-lg">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-success-800 dark:text-success-200">Thank You!</h3>
        <p className="mb-6 text-success-700 dark:text-success-300">
  {"We've received your feedback and appreciate your input."}
</p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-success-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label htmlFor="message" className="mb-3 block font-semibold text-slate-900 dark:text-white text-lg">
          Message <span className="text-error-500">*</span>
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          rows={6}
          className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
          placeholder="Share your thoughts, suggestions, or report issues..."
        />
        <p className="mt-2 text-sm text-slate-500">{message.length}/2000 characters</p>
      </div>
      
      <div>
        <label htmlFor="contact" className="mb-3 block font-semibold text-slate-900 dark:text-white text-lg">
          Email or Phone <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <input
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          maxLength={256}
          className="w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:border-slate-600/80 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
          placeholder="name@example.com or +91..."
        />
        <p className="mt-2 text-sm text-slate-500">
          {"Only if you'd like us to follow up with you"}
        </p>

      </div>
      
      {error && (
        <div className="rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-900/30">
          <p className="text-error-800 dark:text-error-200 flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}
      
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Submit Feedback
          </span>
        )}
      </button>
    </form>
  );
}
