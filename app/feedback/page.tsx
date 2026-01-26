import FeedbackForm from "@/components/FeedbackForm";
import Link from "next/link";

export const metadata = {
  title: "Feedback - Student Notes Portal",
  description: "Share your feedback or suggestions.",
};

export default function FeedbackPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-white">Feedback</span>
      </nav>
      
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Share Your Feedback</h1>
        <p className="mx-auto max-w-lg text-lg text-slate-600 dark:text-slate-400">
          Your thoughts help us improve. Share suggestions, report issues, or let us know what you love about the portal.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-700/80 dark:bg-slate-800">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-slate-800 dark:to-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">We Value Your Input</h2>
              <p className="text-slate-600 dark:text-slate-400">Every feedback helps us serve you better</p>
            </div>
          </div>
        </div>

        <FeedbackForm />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-green-50 to-emerald-50 p-4 text-center dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-700">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Quick Response</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">We review all feedback</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 text-center dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-700">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Private & Secure</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Your data is protected</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-purple-50 to-pink-50 p-4 text-center dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-700">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Action Oriented</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">We implement improvements</p>
        </div>
      </div>
    </main>
  );
}
